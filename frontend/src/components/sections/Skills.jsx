import React from "react";
import {
  Handshake,
  Users,
  Target,
  TrendingUp,
  MessageCircle,
  Users2,
  ArrowUpRight,
} from "lucide-react";
import { skills } from "../../mock";

const iconMap = {
  Handshake,
  Users,
  Target,
  TrendingUp,
  MessageCircle,
  Users2,
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:items-end mb-14">
          <div className="lg:col-span-7 reveal">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C8862B] mb-4">
              02 — Compétences
            </div>
            <h2 className="font-display text-4xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-[#0F1B2D]">
              Les outils de mon <span className="italic font-normal">métier</span>.
            </h2>
          </div>
          <div className="lg:col-span-5 reveal">
            <p className="text-[#0F1B2D]/65 text-base lg:text-lg leading-relaxed">
              Ma formation mêle théorie et pratique pour un apprentissage
              enrichissant. Voici les soft et hard skills que je développe au
              quotidien.
            </p>
            <p className="text-[#0F1B2D]/65 text-base lg:text-lg leading-relaxed mt-4">
              Ce cursus m'a aidé à lier outils techniques et contact humain
              pour transformer mes cours en expériences concrètes sur le
              terrain.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, idx) => {
            const Icon = iconMap[skill.icon];
            return (
              <div
                key={skill.title}
                className="group relative bg-white border border-[#0F1B2D]/10 rounded-2xl p-7 hover:border-[#C8862B] hover:shadow-xl transition-all duration-300 reveal"
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0F1B2D] text-[#FAF7F2] grid place-items-center group-hover:bg-[#C8862B] transition-colors">
                    {Icon && <Icon className="w-5 h-5" />}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#0F1B2D]/30 group-hover:text-[#C8862B] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="font-display text-xl font-semibold text-[#0F1B2D] mb-2">
                  {skill.title}
                </h3>
                <p className="text-sm text-[#0F1B2D]/65 leading-relaxed mb-5">
                  {skill.description}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between text-xs text-[#0F1B2D]/55 mb-2">
                    <span className="uppercase tracking-[0.18em]">Maîtrise</span>
                    <span className="font-medium text-[#0F1B2D]">{skill.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-[#0F1B2D]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0F1B2D] to-[#C8862B] rounded-full transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
