import React from "react";
import { passions } from "../../mock";
import { Heart } from "lucide-react";

const Passions = () => {
  return (
    <section id="passions" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:items-end mb-14">
          <div className="lg:col-span-7 reveal">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C8862B] mb-4 flex items-center gap-2">
              04 — Passions <Heart className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-display text-4xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-[#0F1B2D]">
              Ce qui me fait <span className="italic font-normal">vibrer</span>.
            </h2>
          </div>
          <div className="lg:col-span-5 reveal">
            <p className="text-[#0F1B2D]/65 text-base lg:text-lg leading-relaxed">
              En dehors des amphis, je cultive des passions qui forgent ma
              personnalité et nourrissent mon énergie au quotidien.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {passions.map((p, idx) => (
            <article
              key={p.title}
              className="group relative rounded-2xl overflow-hidden bg-[#0F1B2D] aspect-[3/4] reveal"
              style={{ transitionDelay: `${idx * 70}ms` }}
            >
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                style={{
                  objectPosition: p.objectPosition || "center",
                  filter: p.boostQuality
                    ? "contrast(1.12) saturate(1.18) brightness(1.04)"
                    : undefined
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D] via-[#0F1B2D]/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[#FAF7F2]">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#C8862B] mb-2">
                  Passion 0{idx + 1}
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2 leading-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-[#FAF7F2]/75 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-32 transition-all duration-500">
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Passions;
