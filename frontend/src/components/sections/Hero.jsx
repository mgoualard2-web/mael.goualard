import React from "react";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { profile, stats } from "../../mock";

const Hero = () => {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 grain pointer-events-none" />
      {/* Decorative amber blob */}
      <div className="absolute -top-32 -right-20 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#E8A95C]/30 to-[#C8862B]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0F1B2D]/15 bg-white/60 backdrop-blur-sm text-xs font-medium tracking-wide text-[#0F1B2D]/70 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#C8862B]" />
            Disponible pour stages & alternances
          </div>

          <h1 className="font-display font-semibold tracking-tight text-[#0F1B2D] leading-[0.95] text-[clamp(2.6rem,7vw,5.5rem)]">
            {profile.firstName}
            <br />
            <span className="italic font-normal">{profile.lastName}.</span>
          </h1>

          <p className="mt-6 text-lg lg:text-xl text-[#0F1B2D]/70 max-w-xl leading-relaxed">
            {profile.tagline}
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-[#0F1B2D]/60">
            <MapPin className="w-4 h-4" />
            <span>{profile.city}</span>
            <span className="w-1 h-1 rounded-full bg-[#0F1B2D]/30" />
            <span>{profile.role}</span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="bg-[#0F1B2D] hover:bg-[#C8862B] text-[#FAF7F2] rounded-full h-12 px-7 text-sm font-medium transition-colors"
            >
              <a href="#about">Découvrir mon profil</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full h-12 px-7 text-sm border-[#0F1B2D]/20 text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-[#FAF7F2] hover:border-[#0F1B2D] transition-colors"
            >
              <a href="#contact">
                <span>Prendre contact</span>
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-[#C8862B] pl-4">
                <div className="font-display text-2xl lg:text-3xl font-semibold text-[#0F1B2D]">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-[#0F1B2D]/55 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#C8862B]/30 to-transparent rotate-2" />
            <div className="relative h-full w-full rounded-[1.6rem] overflow-hidden shadow-2xl ring-1 ring-[#0F1B2D]/10">
              <img
                src={profile.images.hero}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating tag */}
            <div className="absolute -bottom-5 -left-5 lg:-left-10 bg-[#0F1B2D] text-[#FAF7F2] rounded-2xl px-5 py-4 shadow-xl max-w-[220px]">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#C8862B] mb-1">
                Aspiration
              </div>
              <div className="font-display text-lg leading-snug">
                Devenir un commercial qui fait la différence.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16">
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#0F1B2D]/55 hover:text-[#C8862B] transition-colors"
        >
          <ArrowDown className="w-3.5 h-3.5" /> Faire défiler
        </a>
      </div>
    </section>
  );
};

export default Hero;
