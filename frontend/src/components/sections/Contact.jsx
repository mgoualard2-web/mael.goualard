import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Send, ArrowUpRight } from "lucide-react";
import { profile } from "../../mock";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useToast } from "../../hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Champs manquants",
        description: "Merci de remplir votre nom, votre e-mail et votre message.",
      });
      return;
    }
    setSending(true);
    // Frontend-only: persist locally as a teaser for full-stack flow
    const stored = JSON.parse(localStorage.getItem("mg_messages") || "[]");
    stored.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem("mg_messages", JSON.stringify(stored));
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Message envoyé",
        description: "Merci ! Je reviens vers vous très rapidement.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 700);
  };

  const channels = [
    { icon: Mail, label: "E-mail", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Téléphone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: Linkedin, label: "LinkedIn", value: profile.linkedin, href: `https://${profile.linkedin}` },
    { icon: MapPin, label: "Localisation", value: profile.city, href: "#" },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-[#0F1B2D] text-[#FAF7F2] overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#C8862B]/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8862B] mb-4">
            05 — Contact
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            Discutons de votre
            <br />
            <span className="italic font-normal text-[#E8A95C]">prochaine opportunité</span>.
          </h2>
          <p className="mt-6 text-[#FAF7F2]/70 text-base lg:text-lg leading-relaxed max-w-md">
            Stage, alternance, projet étudiant ou simple échange ? J'ai hâte de
            vous lire.
          </p>

          <div className="mt-10 space-y-4">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 py-3 border-b border-white/10 hover:border-[#C8862B] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 grid place-items-center group-hover:bg-[#C8862B] transition-colors">
                  <c.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2]/55">
                    {c.label}
                  </div>
                  <div className="text-sm font-medium text-[#FAF7F2]">{c.value}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#FAF7F2]/40 group-hover:text-[#C8862B] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 reveal">
          <form
            onSubmit={onSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-10 backdrop-blur-sm"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name" className="text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2]/60">
                  Votre nom
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Prénom Nom"
                  className="mt-2 bg-transparent border-white/15 text-[#FAF7F2] placeholder:text-[#FAF7F2]/40 focus-visible:ring-[#C8862B] h-11"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2]/60">
                  E-mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="vous@exemple.com"
                  className="mt-2 bg-transparent border-white/15 text-[#FAF7F2] placeholder:text-[#FAF7F2]/40 focus-visible:ring-[#C8862B] h-11"
                />
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="subject" className="text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2]/60">
                Sujet
              </Label>
              <Input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={onChange}
                placeholder="Stage, alternance, collaboration..."
                className="mt-2 bg-transparent border-white/15 text-[#FAF7F2] placeholder:text-[#FAF7F2]/40 focus-visible:ring-[#C8862B] h-11"
              />
            </div>

            <div className="mt-5">
              <Label htmlFor="message" className="text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2]/60">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                placeholder="Parlez-moi de votre projet ou opportunité..."
                className="mt-2 bg-transparent border-white/15 text-[#FAF7F2] placeholder:text-[#FAF7F2]/40 focus-visible:ring-[#C8862B] resize-none"
              />
            </div>

            <div className="mt-7 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-[#FAF7F2]/50">
                Vos données restent confidentielles.
              </p>
              <Button
                type="submit"
                disabled={sending}
                className="bg-[#C8862B] hover:bg-[#E8A95C] text-[#0F1B2D] rounded-full h-12 px-7 font-medium transition-colors"
              >
                {sending ? "Envoi..." : (
                  <>
                    Envoyer le message <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
