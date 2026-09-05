'use client';

import { useState } from 'react';
import { Ruler, ArrowRight, Info, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const tankData = [
  {
    size: '5 Gallon',
    dimensions: '16" × 8" × 10"',
    weight: '~48 lbs filled',
    bestFor: 'A single Betta fish or a dedicated freshwater dwarf shrimp & snail colony.',
    warning: 'Small water volume means parameters can shift rapidly with slight overfeeding.'
  },
  {
    size: '10 Gallon',
    dimensions: '20" × 10" × 12"',
    weight: '~110 lbs filled',
    bestFor: 'Betta community with snails, or a small school (6) of nano fish like Ember Tetras or Chili Rasboras.',
    warning: 'Still requires steady weekly water changes and careful feeding discipline.'
  },
  {
    size: '20 Gallon Long',
    dimensions: '30" × 12" × 12"',
    weight: '~225 lbs filled',
    bestFor: 'The ideal beginner footprint. Excellent horizontal swimming length for schooling tetras and Corydoras.',
    warning: 'Requires a level, dedicated aquarium stand capable of supporting ~250 lbs.'
  },
  {
    size: '55 Gallon',
    dimensions: '48" × 13" × 21"',
    weight: '~600 lbs filled',
    bestFor: 'Diverse community ecosystems, peaceful medium species, or heavily planted display tanks.',
    warning: 'Significant weight requires verification of floor support and careful filter positioning.'
  }
];

export default function TankSizeGuide() {
  const [selectedIdx, setSelectedIdx] = useState(2); // Default to 20G Long
  const selected = tankData[selectedIdx];

  return (
    <section className="py-16 bg-[#ffffff] rounded-3xl border-2 border-[#cfcaf5] mb-16 p-6 sm:p-10 shadow-sm text-left font-readable">
      <div className="mb-10 pb-6 border-b border-[#edeafc]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] text-xs font-semibold uppercase tracking-wider mb-3">
          <Ruler className="w-3.5 h-3.5 text-[#27187e]" />
          <span>Standard Aquarium Dimensions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-[#27187e] tracking-tight">
          Standard Aquarium Form Factors
        </h2>
        <p className="text-base text-[#27187e]/85 max-w-2xl mt-2 leading-relaxed">
          Moderate-to-larger water volumes offer greater biological stability by diluting organic waste and preventing rapid temperature or pH swings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Tank Selector Buttons */}
        <div className="lg:col-span-5 space-y-3">
          {tankData.map((tank, idx) => (
            <button
              key={tank.size}
              onClick={() => setSelectedIdx(idx)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
                selectedIdx === idx 
                  ? 'border-[#27187e] bg-[#27187e] text-[#f7f7ff]' 
                  : 'border-[#cfcaf5] bg-[#f7f7ff] text-[#27187e] hover:border-[#27187e]'
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl sm:text-2xl font-display font-normal">
                  {tank.size}
                </h3>
                <span className={`text-xs font-semibold uppercase tracking-wider ${selectedIdx === idx ? 'text-[#cfcaf5]' : 'text-[#27187e]/70'}`}>
                  {tank.dimensions}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Details Card */}
        <div className="lg:col-span-7">
          <div className="bg-[#f7f7ff] rounded-3xl p-6 sm:p-8 border-2 border-[#cfcaf5] shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#edeafc]">
                <div className="w-14 h-14 rounded-2xl bg-[#27187e] flex items-center justify-center text-[#f7f7ff] font-display text-2xl font-normal shadow-md shrink-0">
                  {selected.size.split(' ')[0]}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e]">{selected.size}</h3>
                  <p className="text-xs sm:text-sm text-[#27187e]/70 font-semibold mt-0.5">Filled weight: {selected.weight} • Footprint: {selected.dimensions}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base">
                <div className="bg-[#ffffff] p-4 sm:p-5 rounded-2xl border border-[#cfcaf5]">
                  <h4 className="uppercase tracking-wider font-bold text-[#27187e] text-xs mb-1.5 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#27187e]" />
                    <span>Optimal Species Stocking</span>
                  </h4>
                  <p className="text-[#27187e]/90 leading-relaxed font-medium">
                    {selected.bestFor}
                  </p>
                </div>

                <div className="bg-[#edeafc] p-4 sm:p-5 rounded-2xl border border-[#cfcaf5]">
                  <h4 className="uppercase tracking-wider font-bold text-[#27187e] text-xs mb-1.5 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#27187e]" />
                    <span>Aquarium Consideration</span>
                  </h4>
                  <p className="text-[#27187e]/90 leading-relaxed font-medium">
                    {selected.warning}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#edeafc] flex items-center justify-between">
              <Link
                href="/stocking-planner"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#27187e] hover:underline"
              >
                <span>Plan Stocking for this Volume</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
