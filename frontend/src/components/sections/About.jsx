import React from "react";
import { profile } from "../../mock";
import { Quote } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#0F1B2D] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 reveal">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10">
            <img
              src={profile.images.about}
              alt="Mael en action"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#C8862B]">
                Mon parcours
              </div>
              <div className="font-display text-2xl mt-1">
                Apprendre. Créer. Convaincre.
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 reveal">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8862B] mb-4">
            01 — À propos
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            Un étudiant <span className="italic font-normal text-[#E8A95C]">curieux</span>,
            <br />
            animé par le goût du défi.
          </h2>

          <div className="mt-8 space-y-5 text-base lg:text-lg text-[#FAF7F2]/75 leading-relaxed max-w-2xl">
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 max-w-xl border-l-2 border-[#C8862B] pl-5">
            <Quote className="w-5 h-5 text-[#C8862B] flex-shrink-0 mt-1" />
            <p className="font-display italic text-lg lg:text-xl text-[#FAF7F2]/90">
              « Vendre, c'est avant tout écouter pour mieux servir. »
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {["Rigoureux", "À l'écoute", "Déterminé", "Créatif", "Engagé"].map(
              (trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 rounded-full text-sm border border-white/15 text-white/80 hover:border-[#C8862B] hover:text-[#C8862B] transition-colors"
                >
                  {trait}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
