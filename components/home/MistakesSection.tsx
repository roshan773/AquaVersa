'use client';
import { useState } from 'react';
import { AlertTriangle, ChevronDown } from 'lucide-react';

const mistakes = [
  {
    title: "Skipping the Nitrogen Cycle",
    desc: "Tanks need 3-6 weeks to grow beneficial bacteria before adding fish. Adding fish to tap water on day one usually results in 'New Tank Syndrome' and dead fish."
  },
  {
    title: "Overstocking or '1 Inch Per Gallon' Myth",
    desc: "The 1 inch per gallon rule is outdated. You must account for bioload (how much waste they produce), swimming space, and adult size. A 10-inch fish cannot live in a 10-gallon tank."
  },
  {
    title: "Washing Filter Media in Tap Water",
    desc: "Chlorine kills the beneficial bacteria keeping your fish alive. Always rinse your filter sponges in a bucket of old tank water during your water change."
  },
  {
    title: "Overfeeding",
    desc: "Fish only need an amount of food the size of their eyeball, once or twice a day. Uneaten food rots and produces toxic ammonia."
  },
  {
    title: "Doing 100% Water Changes",
    desc: "Never drain the entire tank and scrub everything. This destroys the established ecosystem. Instead, change 20-30% of the water weekly."
  }
];

export default function MistakesSection() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-destructive/5 border border-destructive/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <AlertTriangle className="w-64 h-64 text-destructive" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/20 text-destructive text-sm font-semibold mb-6">
              <AlertTriangle className="w-4 h-4" /> Read Before You Buy
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-8 text-foreground">
              Top 5 Beginner Mistakes
            </h2>
            
            <div className="space-y-4">
              {mistakes.map((mistake, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-2xl transition-colors ${
                    openIdx === idx ? 'bg-background border-destructive/30 shadow-sm' : 'bg-card border-border hover:border-destructive/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-bold text-lg text-foreground flex items-center gap-3">
                      <span className="text-destructive text-sm bg-destructive/10 px-2.5 py-0.5 rounded-full">{idx + 1}</span>
                      {mistake.title}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {openIdx === idx && (
                    <div className="px-5 pb-5 pt-0 text-muted-foreground border-t border-border mt-2">
                      <p className="pt-4 leading-relaxed">{mistake.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
