'use client';

import { useState } from 'react';
import { Lightbulb, Info, RotateCcw, HelpCircle, CheckCircle2 } from 'lucide-react';

interface MythItem {
  myth: string;
  truth: string;
  why: string;
}

const myths: MythItem[] = [
  {
    myth: "Small bowls or 1-gallon nano tanks are easiest for beginners.",
    truth: "False. Small water volumes magnify chemical spikes and temperature swings.",
    why: "Larger aquariums (20–40 gallons) dilute waste compounds and provide thermal stability, giving beginners a much wider safety margin."
  },
  {
    myth: "You can reliably stock '1 inch of fish per gallon' of water.",
    truth: "False. The 1-inch-per-gallon rule ignores body mass and bioload.",
    why: "A 10-inch Oscar produces fifty times the waste and oxygen demand of ten 1-inch Neon Tetras. Stocking must consider adult biomass, swimming layers, and filtration turnover."
  },
  {
    myth: "Fish will only grow to the size of their glass tank.",
    truth: "False. Fish do not harmlessly stop growing to fit small aquariums.",
    why: "Severe spatial confinement and poor water quality cause stunted skeletal growth while internal organs continue growing, resulting in premature organ failure."
  },
  {
    myth: "Bettas naturally thrive in tiny, stagnant mud puddles.",
    truth: "False. Bettas inhabit vast, shallow rice paddies with massive water volume.",
    why: "Their labyrinth organ allows survival during temporary dry seasons, but optimal health requires a minimum of 5 gallons with gentle filtration and a heater at 78°F."
  },
  {
    myth: "Common Plecos will clean all algae and keep the tank clean.",
    truth: "False. Common Plecos grow up to 18–24 inches and produce massive bioload.",
    why: "As plecos mature, their diet shifts to omnivorous grazing. Their high waste production easily overloads standard biological filtration."
  },
  {
    myth: "Adding bottled water conditioner instantly cycles your aquarium.",
    truth: "False. Conditioner only neutralizes tap chlorine and heavy metals.",
    why: "Establishing the nitrifying bacterial colonies (Nitrosomonas and Nitrospira) requires 3 to 6 weeks of dosed ammonia cycling before introducing fish safely."
  }
];

export default function MythsSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (idx: number) => {
    setActiveCard((current) => (current === idx ? null : idx));
  };

  return (
    <section className="py-24 bg-[#f7f7ff] border-t-2 border-[#cfcaf5] text-left marine-pattern-light">
      <div className="site-container">

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Lightbulb className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Scientific Fact Check</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#27187e] tracking-tight">
            Busting Common Aquarium Myths
          </h2>

          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl mt-3 leading-relaxed">
            Pet stores often pass down outdated misconceptions. Tap any card below to review peer-reviewed biological realities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 font-readable">
          {myths.map((item, idx) => {
            const isFlipped = activeCard === idx;

            return (
              <div
                key={idx}
                className="group relative h-80 [perspective:1000px] cursor-pointer"
                onClick={() => handleCardClick(idx)}
                role="button"
                tabIndex={0}
                aria-label={`View truth about: ${item.myth}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(idx);
                  }
                }}
              >
                <div
                  className={`
                    absolute w-full h-full
                    transition-transform duration-500
                    [transform-style:preserve-3d]
                    ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
                    md:group-hover:[transform:rotateY(180deg)]
                  `}
                >

                  {/* FRONT */}
                  <div className="absolute w-full h-full rounded-3xl bg-[#ffffff] border-2 border-[#cfcaf5] p-6 flex flex-col justify-between text-left [backface-visibility:hidden] shadow-sm">
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#edeafc]">
                        <span className="text-xs uppercase font-bold text-[#27187e] px-2.5 py-1 rounded-md bg-[#edeafc] border border-[#cfcaf5] tracking-wider">
                          Myth vs Reality
                        </span>
                        <HelpCircle className="w-5 h-5 text-[#27187e]/60" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display text-[#27187e] leading-snug">
                        "{item.myth}"
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-[#edeafc] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#27187e] uppercase tracking-wider">
                      <span>Tap to reveal scientific truth</span>
                      <RotateCcw className="w-4 h-4 text-[#27187e]" />
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="
                      absolute w-full h-full
                      rounded-3xl
                      bg-[#27187e]
                      border-2 border-[#1b1059]
                      p-6
                      flex flex-col justify-between text-left
                      [backface-visibility:hidden]
                      [transform:rotateY(180deg)]
                      shadow-xl
                      text-[#f7f7ff]
                    "
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-[#cfcaf5] font-bold uppercase tracking-wider text-xs">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#f7f7ff]" />
                        <span>Verified Biological Fact</span>
                      </div>

                      <div className="text-[#f7f7ff] font-bold text-sm sm:text-base leading-snug mb-3">
                        {item.truth}
                      </div>

                      <p className="text-[#edeafc] text-xs sm:text-sm leading-relaxed border-t border-[#3b28ab] pt-3">
                        <strong className="text-[#f7f7ff] font-bold">Why: </strong>
                        {item.why}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-2 text-xs text-[#cfcaf5] uppercase tracking-wider font-semibold">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Tap to flip back</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}