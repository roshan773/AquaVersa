'use client';
import { Lightbulb, Info } from 'lucide-react';

interface MythItem {
  myth: string;
  truth: string;
  why: string;
}

const myths: MythItem[] = [
  {
    myth: "Small tanks are easier for beginners.",
    truth: "False. Small volumes of water crash and pollute rapidly.",
    why: "Larger volumes of water dilute chemical waste (like Ammonia) much better. A 20-gallon tank is far more forgiving of feeding mistakes than a delicate 5-gallon nano tank."
  },
  {
    myth: "You can stock '1 inch of fish per gallon' of water.",
    truth: "False. This rule is outdated and highly dangerous.",
    why: "A single 10-inch Oscar produces vastly more waste (bioload) and needs far more swimming room than ten 1-inch Tetras. Stocking must focus on adult fish size, bioload, and swimming room."
  },
  {
    myth: "Fish only grow to the size of their tank.",
    truth: "False. Stunting is a deformity caused by toxic water.",
    why: "In a cramped tank, poor water quality stunts skeletal growth, but their internal organs continue growing, compressing until they suffer organ failure and a painful early death."
  },
  {
    myth: "Bettas naturally live in tiny mud puddles.",
    truth: "False. Bettas live in expansive, shallow rice paddies.",
    why: "Rice paddies stretch for miles and have continuous water flow. In a tiny bowl, Ammonia climbs to toxic levels in days. Bettas need a minimum of 5 (ideally 10) gallons, heated and filtered."
  },
  {
    myth: "Plecos (Sucker fish) clean the tank for you.",
    truth: "False. Plecos produce a massive, heavy bioload.",
    why: "While they eat some algae, Plecos eat constantly and create long strings of waste, raising nitrates. They also grow up to 15-24 inches. You are the only true cleaning crew of your tank."
  },
  {
    myth: "Water conditioner cycles your tank instantly.",
    truth: "False. Conditioner only dechlorinates tap water.",
    why: "Establishing the nitrogen cycle takes 4-6 weeks to breed beneficial nitrifying bacteria. Conditioner merely neutralizes toxic chlorine to prevent gill chemical burns."
  }
];

export default function MythsSection() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold mb-4 border border-cyan-500/20">
            <Lightbulb className="w-4 h-4" /> Fact Check
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-foreground">
            Busting Aquarium Myths
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The pet store might have given you bad advice. Let's clear up some of the most common misconceptions with scientific facts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myths.map((item, idx) => (
            <div key={idx} className="group relative h-72 [perspective:1000px]">
              <div className="absolute w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front (Myth) */}
                <div className="absolute w-full h-full rounded-3xl bg-card border border-border p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden] shadow-sm group-hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="font-bold text-lg text-red-500">?</span>
                  </div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2 block">Common Myth</span>
                  <h3 className="text-lg font-bold text-foreground leading-snug px-2">"{item.myth}"</h3>
                  <p className="text-[10px] text-muted-foreground mt-6 uppercase tracking-wider font-semibold group-hover:text-cyan-400 transition-colors">Hover for the truth</p>
                </div>
                
                {/* Back (Reality) */}
                <div className="absolute w-full h-full rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 flex flex-col justify-center text-left [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xl overflow-y-auto">
                  <div className="flex items-center gap-2 mb-3 text-cyan-400 font-bold uppercase tracking-wider text-xs">
                    <Info className="w-4 h-4 shrink-0 text-cyan-400" /> Truth Check
                  </div>
                  <div className="text-white font-extrabold text-sm leading-snug mb-3">
                    {item.truth}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed border-t border-slate-800 pt-3">
                    <strong className="text-cyan-400 font-bold">Why: </strong> 
                    {item.why}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
