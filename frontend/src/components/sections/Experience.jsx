import React from "react";
import { experiences } from "../../mock";
import { Briefcase } from "lucide-react";

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 lg:py-32 bg-white border-y border-[#0F1B2D]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7 reveal">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C8862B] mb-4">
              03 — Expérience
            </div>
            <h2 className="font-display text-4xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-[#0F1B2D]">
              Un parcours qui se <span className="italic font-normal">construit</span>.
            </h2>
          </div>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 lg:left-1/2 top-2 bottom-2 w-px bg-[#0F1B2D]/10" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={`${exp.role}-${idx}`}
                  className={`relative grid lg:grid-cols-2 gap-6 lg:gap-12 reveal`}
                >
                  {/* Dot */}
                  <div className="absolute left-3 lg:left-1/2 top-3 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C8862B] ring-4 ring-[#FAF7F2] z-10" />

                  {isLeft ? (
                    <>
                      <div className="pl-10 lg:pl-0 lg:pr-10 lg:text-right">
                        <ExperienceCard exp={exp} alignRight />
                      </div>
                      <div className="hidden lg:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden lg:block" />
                      <div className="pl-10 lg:pl-10">
                        <ExperienceCard exp={exp} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ exp, alignRight = false }) => (
  <div
    className={`group bg-[#FAF7F2] border border-[#0F1B2D]/10 rounded-2xl p-7 hover:border-[#C8862B] hover:shadow-lg transition-all ${
      alignRight ? "lg:ml-auto" : ""
    }`}
    style={{ maxWidth: "560px" }}
  >
    <div className={`flex items-center gap-3 mb-3 ${alignRight ? "lg:justify-end" : ""}`}>
      <span className="text-xs uppercase tracking-[0.2em] text-[#C8862B] font-medium">
        {exp.period}
      </span>
      <Briefcase className="w-3.5 h-3.5 text-[#C8862B]" />
    </div>
    <h3 className="font-display text-xl lg:text-2xl font-semibold text-[#0F1B2D] mb-1">
      {exp.role}
    </h3>
    <div className="text-sm font-medium text-[#0F1B2D]/65 mb-4">{exp.company}</div>
    <p className="text-sm text-[#0F1B2D]/70 leading-relaxed mb-5">{exp.description}</p>
    <div className={`flex flex-wrap gap-2 ${alignRight ? "lg:justify-end" : ""}`}>
      {exp.tags.map((tag) => (
        <span
          key={tag}
          className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-[#0F1B2D]/5 text-[#0F1B2D]/70"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default Experience;
