# API Contracts — Portfolio Mael Goualard

## Vue d'ensemble
Le portfolio est principalement statique. Le seul flow nécessitant un backend est le **formulaire de contact**.

---

## 1. Données mockées dans `frontend/src/mock.js`
Toutes les données suivantes restent côté frontend (aucun backend nécessaire) :
- `profile` — identité, bio, contacts, CV URL, images
- `stats` — chiffres clés du Hero
- `skills` — 5 cartes compétences
- `languages` — Français/Anglais B2/Espagnol B2
- `experiences` — 3 expériences pro avec photos & appréciation
- `passions` — 5 passions
- `navigation` — menu

Ces données sont **statiques** et ne nécessitent aucune persistance backend.

---

## 2. API Backend à implémenter

### 2.1 POST `/api/contact`
**Objectif** : recevoir un message du formulaire, le stocker en MongoDB et envoyer un email à Mael via FormSubmit.co.

**Request body (JSON)** :
```json
{
  "name": "string (required, 1-100)",
  "email": "string (required, valid email)",
  "subject": "string (optional, 0-200)",
  "message": "string (required, 1-5000)"
}
```

**Process** :
1. Validation Pydantic (champs requis, formats)
2. Insertion dans MongoDB collection `contact_messages` avec un UUID, le timestamp UTC, et un statut.
3. Forwarding asynchrone vers `https://formsubmit.co/ajax/mael.goualard@etu.iut-tlse3.fr` pour notification email.
4. Le statut FormSubmit est tracé mais **n'échoue pas** la requête principale (best-effort).

**Response 200** :
```json
{
  "id": "uuid",
  "success": true,
  "message": "Message bien reçu, merci !"
}
```

**Response 422** : erreur de validation Pydantic.

---

### 2.2 GET `/api/contact` (admin/debug)
**Objectif** : lister les messages stockés (utile pour Mael pour vérifier).
Retourne la liste des 100 derniers messages, triés par date desc.

**Response 200** :
```json
[
  {
    "id": "uuid",
    "name": "...",
    "email": "...",
    "subject": "...",
    "message": "...",
    "createdAt": "ISO datetime",
    "emailNotified": true
  }
]
```

---

## 3. Modèle MongoDB

Collection : `contact_messages`
```python
ContactMessage:
  id: str (uuid4, default)
  name: str
  email: EmailStr
  subject: Optional[str]
  message: str
  createdAt: datetime (utcnow)
  emailNotified: bool (default False)
```

---

## 4. Intégration Frontend → Backend

Fichier impacté : `frontend/src/components/sections/Contact.jsx`

**Avant** : `localStorage.setItem("mg_messages", ...)` (mock)

**Après** : `axios.post(${REACT_APP_BACKEND_URL}/api/contact, formData)` avec gestion d'erreur (toast).

URL backend : `process.env.REACT_APP_BACKEND_URL` (jamais hardcodée).

---

## 5. Service externe — FormSubmit.co

- Endpoint : `https://formsubmit.co/ajax/{email}`
- Méthode : POST JSON
- Aucune clé API requise
- À la **première soumission**, FormSubmit envoie un mail de confirmation à Mael — il devra cliquer sur le lien pour activer la livraison des futurs messages.
- Headers : `Content-Type: application/json`, `Accept: application/json`

---

## 6. Tests à effectuer (deep_testing_backend_v2)
1. POST /api/contact avec payload valide → 200 + message en DB
2. POST /api/contact avec email invalide → 422
3. POST /api/contact avec champs manquants → 422
4. GET /api/contact → liste retournée correctement
5. Vérifier que MongoDB contient l'entrée après POST
