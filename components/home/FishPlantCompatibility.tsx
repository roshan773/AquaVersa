'use client';
import { useState } from 'react';
import { CheckCircle2, Leaf, Fish } from 'lucide-react';
import { plantData } from '@/data/plants';
import Link from 'next/link';

export default function FishPlantCompatibility() {
  const [fishType, setFishType] = useState('Community');

  const getRecommendedPlants = () => {
    if (fishType === 'Cichlids') {
      return plantData.filter(p => p.name.includes('Anubias') || p.name.includes('Java Fern'));
    }
    if (fishType === 'Goldfish') {
       // Goldfish eat soft plants, recommend tough ones
       return plantData.filter(p => p.name.includes('Anubias') || p.name.includes('Sword'));
    }
    // Community or Betta
    return plantData.slice(0, 3);
  };

  const recommendations = getRecommendedPlants();

  return (
    <section className="py-24 bg-muted/10 border-y border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-sm flex flex-col md:flex-row gap-12 items-center">
          
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold">
              <Leaf className="w-4 h-4" /> Plant Matcher
            </div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground">
              Will my fish eat these plants?
            </h2>
            <p className="text-muted-foreground text-lg">
              Some fish are notorious plant destroyers. Select your fish type to see which plants can survive in your tank.
            </p>
            
            <div className="pt-4">
              <label className="block text-sm font-bold mb-2">Select Fish Type</label>
              <div className="grid grid-cols-2 gap-3">
                {['Community', 'Bettas', 'Cichlids', 'Goldfish'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFishType(type)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                      fishType === type 
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' 
                        : 'border-border hover:border-emerald-300'
                    }`}
                  >
                    <Fish className="w-4 h-4" />
                    <span className="font-semibold">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-muted rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Safe Plants for {fishType}
              </h3>
              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map(plant => (
                    <Link key={plant.id} href={`/plants/${plant.slug}`} className="bg-background p-4 rounded-xl shadow-sm border border-border flex items-center justify-between hover:border-emerald-500/30 hover:shadow transition-all block group">
                      <div>
                        <h4 className="font-bold text-foreground group-hover:text-emerald-600 transition-colors">{plant.name}</h4>
                        <p className="text-xs text-muted-foreground">{plant.placement}</p>
                      </div>
                      <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1 rounded-full">
                        Compatible
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="bg-background p-4 rounded-xl shadow-sm border border-border text-center">
                    <p className="text-muted-foreground">Try Anubias or Java Fern - they are tough and most fish won't eat them.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
