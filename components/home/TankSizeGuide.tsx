'use client';
import { useState } from 'react';
import { Ruler, Maximize, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const tankData = [
  {
    size: '5 Gallon',
    dimensions: '16" x 8" x 10"',
    weight: '~60 lbs filled',
    bestFor: 'A single Betta fish OR shrimp only.',
    warning: 'Parameters fluctuate rapidly. Not recommended for beginners.'
  },
  {
    size: '10 Gallon',
    dimensions: '20" x 10" x 12"',
    weight: '~111 lbs filled',
    bestFor: 'Betta + snail OR a small school (6) of nano fish (e.g. Ember Tetras).',
    warning: 'Still prone to swings. Requires weekly maintenance.'
  },
  {
    size: '20 Gallon Long',
    dimensions: '30" x 12" x 12"',
    weight: '~225 lbs filled',
    bestFor: 'The absolute best beginner tank. Great footprint for schooling fish and bottom dwellers like Corydoras.',
    warning: 'Needs a dedicated sturdy stand.'
  },
  {
    size: '55 Gallon',
    dimensions: '48" x 13" x 21"',
    weight: '~600 lbs filled',
    bestFor: 'Larger community setups, medium cichlids, or heavily planted scapes.',
    warning: 'Very heavy. Ensure floor can support it. Deep tank means harder to reach bottom for planting.'
  }
];

export default function TankSizeGuide() {
  const [selectedIdx, setSelectedIdx] = useState(2); // Default to 20G Long
  const selected = tankData[selectedIdx];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold mb-4">
            <Ruler className="w-4 h-4" /> Size Matters
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-foreground">
            The Right Tank Size
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bigger is actually better for beginners. Larger volumes of water dilute toxic ammonia spikes much faster than small tanks.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Selector */}
          <div className="w-full lg:w-1/3 space-y-4">
            {tankData.map((tank, idx) => (
              <button
                key={tank.size}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all ${
                  selectedIdx === idx 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md transform scale-105' 
                    : 'border-border bg-card hover:border-indigo-300'
                }`}
              >
                <h3 className={`text-xl font-bold ${selectedIdx === idx ? 'text-indigo-700 dark:text-indigo-300' : 'text-foreground'}`}>
                  {tank.size}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{tank.dimensions}</p>
              </button>
            ))}
          </div>

          {/* Details */}
          <div className="w-full lg:w-2/3">
            <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-xl h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Maximize className="w-48 h-48 text-indigo-500" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-2xl">
                    {selected.size.split(' ')[0]}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-foreground">{selected.size}</h3>
                    <p className="text-muted-foreground">{selected.weight}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-muted p-6 rounded-2xl">
                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                       Best For
                    </h4>
                    <p className="text-muted-foreground">{selected.bestFor}</p>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 p-6 rounded-2xl">
                    <h4 className="font-bold text-amber-700 dark:text-amber-500 mb-2 flex items-center gap-2">
                       Keep in Mind
                    </h4>
                    <p className="text-amber-900/80 dark:text-amber-200/70">{selected.warning}</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Link href="/tank-size" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    Compare All Tank Sizes & Dimensions <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
