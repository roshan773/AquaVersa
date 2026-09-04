'use client';

import { useState } from 'react';
import { Waves, Scale, Settings } from "lucide-react";
import FishCompatibility from "@/components/home/FishCompatibility";
import FishPlantCompatibility from "@/components/home/FishPlantCompatibility";
import StockCompatibility from "@/components/home/StockCompatibility";
import GlobalCTA from "@/components/ui/GlobalCTA";

export default function CompatibilityPage() {
  const [tab, setTab] = useState<'pair' | 'stock'>('pair');

  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <Waves className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Aquarium Compatibility Guide</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Discover which species thrive together. Plan a community using temperature, pH, temperament, and bioload metrics.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex justify-center max-w-md mx-auto bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setTab('pair')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                tab === 'pair' ? 'bg-cyan-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scale className="w-4 h-4" /> Pairwise Checker
            </button>
            <button
              onClick={() => setTab('stock')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                tab === 'stock' ? 'bg-cyan-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings className="w-4 h-4" /> Build Your Stock
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {tab === 'pair' ? (
          <div className="space-y-12">
            <FishCompatibility />
            <FishPlantCompatibility />
          </div>
        ) : (
          <StockCompatibility />
        )}
      </div>

      <GlobalCTA
        badge="SPECIES COMPATIBILITY ENGINE"
        title={
          <>
            Calculate tank dimensions &amp; <br className="hidden sm:inline" />
            minimum water volume requirements.
          </>
        }
        description="Ensure your community species have sufficient horizontal swimming corridors and biological volume buffer."
        primaryAction={{
          label: 'Open Volume Calculator',
          href: '/tank-size',
        }}
        secondaryAction={{
          label: 'Browse Species Catalog',
          href: '/fish',
        }}
      />
    </div>
  );
}

