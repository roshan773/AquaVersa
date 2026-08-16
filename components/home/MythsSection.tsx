'use client';

import { useState } from 'react';
import { Lightbulb, Info, RotateCcw } from 'lucide-react';

interface MythItem {
  myth: string;
  truth: string;
  why: string;
}

const myths: MythItem[] = [
  {
    myth: "Small tanks are easier for beginners.",
    truth: "False. Smaller aquariums can be less forgiving because water conditions can change more quickly.",
    why: "Larger aquariums generally provide more water volume and can be more stable, but proper cycling, filtration, stocking, and maintenance are still essential."
  },
  {
    myth: "You can stock '1 inch of fish per gallon' of water.",
    truth: "False. The 1-inch-per-gallon rule is an unreliable stocking rule.",
    why: "Fish differ greatly in adult size, body mass, behavior, activity level, and bioload. Stocking should consider adult size, species requirements, tank dimensions, filtration, and maintenance."
  },
  {
    myth: "Fish only grow to the size of their tank.",
    truth: "False. Fish do not simply stop growing harmlessly to match their aquarium.",
    why: "Inadequate space, chronic poor water quality, poor nutrition, stress, and other conditions can impair normal growth and welfare."
  },
  {
    myth: "Bettas naturally live in tiny mud puddles.",
    truth: "False. Bettas are adapted to shallow, vegetated freshwater habitats.",
    why: "Their ability to survive in shallow or temporary environments does not mean they thrive in tiny bowls or poorly maintained containers. Appropriate space, stable temperature, water quality, and enrichment are important."
  },
  {
    myth: "Plecos clean the tank for you.",
    truth: "False. Plecos are not a replacement for aquarium maintenance.",
    why: "Some plecos consume algae or other foods, but they also produce waste and many species grow large. Always identify the species before choosing a tank size."
  },
  {
    myth: "Water conditioner cycles your tank instantly.",
    truth: "False. Water conditioner does not establish the biological nitrogen cycle.",
    why: "Conditioner treats substances such as chlorine or chloramine according to the product's formulation. Establishing a biological cycle requires beneficial microorganisms and should be confirmed through appropriate water testing."
  }
];

export default function MythsSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (idx: number) => {
    setActiveCard((current) => (current === idx ? null : idx));
  };

  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold mb-4 border border-cyan-500/20">
            <Lightbulb className="w-4 h-4" />
            Fact Check
          </div>

          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-foreground">
            Busting Aquarium Myths
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The pet store might have given you bad advice. Let's clear up some of the most common misconceptions with scientific facts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myths.map((item, idx) => {
            const isFlipped = activeCard === idx;

            return (
              <div
                key={idx}
                className="group relative h-72 [perspective:1000px] cursor-pointer"
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
                  <div className="absolute w-full h-full rounded-3xl bg-card border border-border p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden] shadow-sm">
                    <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4">
                      <span className="font-bold text-lg text-red-500">
                        ?
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2">
                      Common Myth
                    </span>

                    <h3 className="text-lg font-bold text-foreground leading-snug px-2">
                      "{item.myth}"
                    </h3>

                    <p className="text-[10px] text-muted-foreground mt-6 uppercase tracking-wider font-semibold md:group-hover:text-cyan-400 transition-colors">
                      Tap to reveal
                    </p>
                  </div>

                  {/* BACK */}
                  <div
                    className="
                      absolute w-full h-full
                      rounded-3xl
                      bg-slate-900
                      border border-cyan-500/40
                      p-6
                      flex flex-col justify-center text-left
                      [backface-visibility:hidden]
                      [transform:rotateY(180deg)]
                      shadow-xl
                      overflow-y-auto
                    "
                  >
                    <div className="flex items-center gap-2 mb-3 text-cyan-400 font-bold uppercase tracking-wider text-xs">
                      <Info className="w-4 h-4 shrink-0 text-cyan-400" />
                      Truth Check
                    </div>

                    <div className="text-white font-extrabold text-sm leading-snug mb-3">
                      {item.truth}
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed border-t border-slate-800 pt-3">
                      <strong className="text-cyan-400 font-bold">
                        Why:{' '}
                      </strong>
                      {item.why}
                    </p>

                    <div className="flex items-center gap-1.5 mt-4 text-[10px] text-slate-400 uppercase tracking-wider">
                      <RotateCcw className="w-3 h-3" />
                      Tap to flip back
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