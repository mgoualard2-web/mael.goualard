from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Notification email target (Mael)
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', 'mael.goualard@etu.iut-tlse3.fr')
FORMSUBMIT_URL = f"https://formsubmit.co/ajax/{NOTIFY_EMAIL}"

# Create the main app
app = FastAPI(title="Mael Goualard Portfolio API")

# Router with /api prefix
api_router = APIRouter(prefix="/api")


# ===== Models =====
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: Optional[str] = Field(default="", max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    emailNotified: bool = False


class ContactResponse(BaseModel):
    id: str
    success: bool
    message: str


# Legacy status check models (kept for compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class StatusCheckCreate(BaseModel):
    client_name: str


# ===== Helpers =====
def _send_formsubmit_notification(payload: dict) -> bool:
    """Send a notification email via FormSubmit.co (sync, no API key required).

    Returns True on success, False on any failure. Best-effort: never raises.
    """
    try:
        body = {
            "name": payload.get("name", ""),
            "email": payload.get("email", ""),
            "_subject": f"[Portfolio] Nouveau message — {payload.get('subject') or 'Sans sujet'}",
            "_template": "table",
            "_captcha": "false",
            "subject": payload.get("subject", ""),
            "message": payload.get("message", ""),
        }
        resp = requests.post(
            FORMSUBMIT_URL,
            json=body,
            headers={"Content-Type": "application/json", "Accept": "application/json"},
            timeout=10,
        )
        if resp.status_code in (200, 201):
            data = resp.json() if resp.headers.get("content-type", "").startswith("application/json") else {}
            return bool(data.get("success") in (True, "true")) or resp.status_code == 200
        return False
    except Exception as exc:
        logging.warning("FormSubmit notification failed: %s", exc)
        return False


# ===== Routes =====
@api_router.get("/")
async def root():
    return {"message": "Portfolio Mael Goualard — API en ligne"}


@api_router.post("/contact", response_model=ContactResponse)
async def create_contact(payload: ContactCreate):
    """Receive a contact form submission, persist it and forward to FormSubmit."""
    msg = ContactMessage(
        name=payload.name.strip(),
        email=payload.email,
        subject=(payload.subject or "").strip(),
        message=payload.message.strip(),
    )

    # Save to MongoDB
    doc = msg.model_dump()
    # Convert datetime to ISO string for storage friendliness
    doc["createdAt"] = msg.createdAt
    try:
        await db.contact_messages.insert_one(doc)
    except Exception as exc:
        logging.exception("Mongo insert failed: %s", exc)
        raise HTTPException(status_code=500, detail="Erreur lors de l'enregistrement du message.")

    # Best-effort: send email notification (non-blocking via thread executor)
    loop = asyncio.get_running_loop()
    try:
        notified = await loop.run_in_executor(
            None,
            _send_formsubmit_notification,
            {
                "name": msg.name,
                "email": str(msg.email),
                "subject": msg.subject or "",
                "message": msg.message,
            },
        )
        if notified:
            await db.contact_messages.update_one(
                {"id": msg.id}, {"$set": {"emailNotified": True}}
            )
    except Exception as exc:
        logging.warning("Notification dispatch error: %s", exc)

    return ContactResponse(id=msg.id, success=True, message="Message bien reçu, merci !")


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    """List the last 100 contact messages (newest first)."""
    cursor = db.contact_messages.find().sort("createdAt", -1).limit(100)
    docs = await cursor.to_list(100)
    items = []
    for d in docs:
        d.pop("_id", None)
        items.append(ContactMessage(**d))
    return items


# Legacy status routes (kept for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**{k: v for k, v in d.items() if k != "_id"}) for d in docs]


# Mount router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
