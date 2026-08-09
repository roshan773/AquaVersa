'use client';
import { Lightbulb, Info } from 'lucide-react';

const myths = [
  {
    myth: "Small tanks are easier for beginners.",
    reality: "False. Small volumes of water pollute very quickly. A 20-gallon tank is much more forgiving than a 5-gallon tank when mistakes happen."
  },
  {
    myth: "Fish grow to the size of their tank.",
    reality: "False. Their bodies may become stunted due to poor water quality, but their internal organs keep growing, leading to a painful early death."
  },
  {
    myth: "Bettas naturally live in tiny puddles.",
    reality: "False. They live in massive, shallow rice paddies stretching for miles. They require at least 5 gallons, heated and filtered water."
  },
  {
    myth: "Plecos (Sucker fish) clean the tank.",
    reality: "False. While they eat some algae, they produce massive amounts of waste, adding to your maintenance. You are the only tank cleaner."
  }
];

export default function MythsSection() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold mb-4">
            <Lightbulb className="w-4 h-4" /> Fact Check
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-foreground">
            Busting Aquarium Myths
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The pet store might have given you bad advice. Let's clear up some of the most common misconceptions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {myths.map((item, idx) => (
            <div key={idx} className="group relative h-64 [perspective:1000px]">
              <div className="absolute w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front (Myth) */}
                <div className="absolute w-full h-full rounded-3xl bg-card border border-border p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden] shadow-sm group-hover:shadow-xl">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <span className="font-bold text-lg text-foreground">?</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">"{item.myth}"</h3>
                  <p className="text-xs text-muted-foreground mt-4 uppercase tracking-widest font-semibold">Hover for truth</p>
                </div>
                
                {/* Back (Reality) */}
                <div className="absolute w-full h-full rounded-3xl bg-purple-600 border border-purple-500 p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xl">
                  <Info className="w-8 h-8 text-white/50 mb-3" />
                  <p className="text-white font-medium text-sm leading-relaxed">{item.reality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
