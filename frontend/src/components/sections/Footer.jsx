import React from "react";
import { profile, navigation } from "../../mock";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#0F1B2D]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="font-display text-3xl lg:text-4xl font-semibold tracking-tight text-[#0F1B2D] leading-tight">
              {profile.firstName} {profile.lastName}.
            </div>
            <p className="mt-3 text-[#0F1B2D]/60 max-w-sm text-sm leading-relaxed">
              {profile.role} à {profile.city}. {profile.ambition} avec passion
              et engagement.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#0F1B2D]/55 mb-4">
              Navigation
            </div>
            <ul className="grid grid-cols-2 gap-y-2">
              {navigation.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-[#0F1B2D]/75 hover:text-[#C8862B] transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#0F1B2D]/55 mb-4">
              Direct
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="block text-sm text-[#0F1B2D] hover:text-[#C8862B] transition-colors"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-[#0F1B2D]/75 hover:text-[#C8862B] transition-colors mt-1"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#0F1B2D]/10 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-[#0F1B2D]/55">
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. Tous droits réservés.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#0F1B2D]/65 hover:text-[#C8862B] transition-colors"
          >
            Retour en haut <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
