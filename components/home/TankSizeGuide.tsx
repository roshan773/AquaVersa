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
    <section className="py-20 bg-[#0f0738] relative border-b border-[#27187E]/80 text-left">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#27187E]/50 border border-[#3622a6] mb-3 text-[#F7F7FF] text-xs font-condensed uppercase tracking-wider font-semibold">
            <Ruler className="w-3.5 h-3.5 text-[#aca1f7]" />
            <span>Aquarium Dimensions & Volume</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#F7F7FF] tracking-wide">
            Choosing the Right Tank Size
          </h2>
          <p className="text-[#F7F7FF]/75 text-sm max-w-2xl mt-2 font-normal leading-relaxed font-sans">
            For beginners, moderate-to-larger water volumes offer greater biological stability by diluting organic waste and preventing rapid temperature or pH swings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Tank Selector Buttons */}
          <div className="lg:col-span-4 space-y-3">
            {tankData.map((tank, idx) => (
              <button
                key={tank.size}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  selectedIdx === idx 
                    ? 'border-[#F7F7FF] bg-[#27187E] shadow-md' 
                    : 'border-[#27187E] bg-[#1c0e64] hover:border-[#3622a6]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`text-xl font-display font-normal tracking-wide ${selectedIdx === idx ? 'text-[#F7F7FF]' : 'text-[#F7F7FF]/85'}`}>
                    {tank.size}
                  </h3>
                  <span className="text-xs text-[#aca1f7] font-condensed uppercase font-semibold">{tank.dimensions}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Details Card */}
          <div className="lg:col-span-8">
            <div className="bg-[#1c0e64] rounded-2xl p-6 sm:p-8 border border-[#27187E] shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-[#27187E]">
                  <div className="w-12 h-12 rounded-xl bg-[#F7F7FF] flex items-center justify-center text-[#27187E] font-display text-2xl font-normal shadow-md">
                    {selected.size.split(' ')[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#F7F7FF] tracking-wide">{selected.size}</h3>
                    <p className="text-xs text-[#F7F7FF]/70 font-sans">Filled weight: {selected.weight} • Footprint: {selected.dimensions}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#27187E]/70 p-4 rounded-xl border border-[#3622a6]">
                    <h4 className="font-condensed uppercase tracking-wider font-bold text-[#F7F7FF] text-xs mb-1 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-[#aca1f7]" />
                      Recommended Inhabitants & Setup
                    </h4>
                    <p className="text-xs text-[#F7F7FF]/85 leading-relaxed font-sans">{selected.bestFor}</p>
                  </div>
                  
                  <div className="bg-[#14094a] border border-[#3622a6] p-4 rounded-xl">
                    <h4 className="font-condensed uppercase tracking-wider font-bold text-[#aca1f7] text-xs mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#aca1f7]" />
                      Important Care Considerations
                    </h4>
                    <p className="text-xs text-[#F7F7FF]/85 leading-relaxed font-sans">{selected.warning}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#27187E] flex justify-end">
                <Link href="/tank-size" className="inline-flex items-center gap-1.5 text-xs font-condensed uppercase tracking-wider font-bold text-[#F7F7FF] hover:text-[#aca1f7] transition-colors">
                  <span>View Full Tank Size Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#aca1f7]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
