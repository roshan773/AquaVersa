'use client';

import { useState } from 'react';
import { Waves, Scale, Settings, Layers, Compass } from "lucide-react";
import FishCompatibility from "@/components/home/FishCompatibility";
import FishPlantCompatibility from "@/components/home/FishPlantCompatibility";
import StockCompatibility from "@/components/home/StockCompatibility";
import GlobalCTA from "@/components/ui/GlobalCTA";

export default function CompatibilityPage() {
  const [tab, setTab] = useState<'pair' | 'stock'>('pair');

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Header Banner */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Community Biology Engine</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            SPECIES COMPATIBILITY
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl leading-relaxed">
            Verify water chemistry overlap, aggressive territorial behaviors, minimum tank volumes, and plant-grazing dynamics.
          </p>

          {/* Mode Switcher */}
          <div className="flex max-w-md mt-8 bg-[#ffffff] p-1.5 rounded-2xl border-2 border-[#cfcaf5] shadow-sm">
            <button
              onClick={() => setTab('pair')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-readable text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                tab === 'pair' ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm' : 'text-[#27187e]/80 hover:text-[#27187e]'
              }`}
            >
              <Scale className="w-4 h-4" /> Pairwise Matcher
            </button>
            <button
              onClick={() => setTab('stock')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-readable text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                tab === 'stock' ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm' : 'text-[#27187e]/80 hover:text-[#27187e]'
              }`}
            >
              <Settings className="w-4 h-4" /> Community Stock List
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-12">
          {tab === 'pair' ? (
            <div className="space-y-12">
              <FishCompatibility />
              <FishPlantCompatibility />
            </div>
          ) : (
            <StockCompatibility />
          )}
        </div>

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
