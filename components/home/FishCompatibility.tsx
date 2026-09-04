'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import Image from 'next/image';
import { fishData } from '@/data/fish';

export default function FishCompatibility() {
  const [fish1, setFish1] = useState(fishData[0].id); // Neon Tetra
  const [fish2, setFish2] = useState(fishData[1].id); // Guppy

  const f1Data = fishData.find((f) => f.id === fish1) || fishData[0];
  const f2Data = fishData.find((f) => f.id === fish2) || fishData[1];

  return (
    <section className="marine-pattern-dark py-24 bg-[#27187e] text-[#f7f7ff] relative overflow-hidden text-left">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#f7f7ff]/80 mb-2 block">
            AQUARIUM TOOLS
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#f7f7ff] tracking-wide">
            Fish Compatibility Checker
          </h2>
          <p className="text-base sm:text-lg text-[#f7f7ff]/85 font-normal max-w-2xl mt-2 font-sans leading-relaxed">
            Compare two fish to see how well they match in terms of water parameters, temperament, tank size and care requirements.
          </p>
        </div>

        {/* Compatibility Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT & CENTER: 2 Circular Fish Matchup with VS */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            
            {/* Fish 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden mb-4 border-4 border-[#f7f7ff]/30 bg-[#1f1366] relative shadow-2xl">
                <Image
                  src={f1Data.image}
                  alt={f1Data.name}
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>

              <span className="font-display text-2xl sm:text-3xl text-[#f7f7ff] mb-3 tracking-wide block">
                {f1Data.name}
              </span>

              <div className="relative">
                <select
                  value={fish1}
                  onChange={(e) => setFish1(e.target.value)}
                  className="bg-[#1f1366] border-2 border-[#3b28ab] hover:border-[#f7f7ff]/50 rounded-full px-5 py-2.5 text-xs sm:text-sm text-[#f7f7ff] font-sans focus:outline-none focus:ring-2 focus:ring-[#f7f7ff]/50 transition-colors cursor-pointer appearance-none pr-9 font-medium shadow-md"
                >
                  {fishData.map((f) => (
                    <option key={f.id} value={f.id} className="bg-[#1f1366] text-[#f7f7ff]">
                      {f.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#f7f7ff]/80 pointer-events-none">
                  ▾
                </span>
              </div>
            </div>

            {/* VS Badge */}
            <div className="w-14 h-14 rounded-full bg-[#1f1366] border-2 border-[#3b28ab] flex items-center justify-center font-display text-xl text-[#f7f7ff] shadow-xl shrink-0">
              VS
            </div>

            {/* Fish 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden mb-4 border-4 border-[#f7f7ff]/30 bg-[#1f1366] relative shadow-2xl">
                <Image
                  src={f2Data.image}
                  alt={f2Data.name}
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>

              <span className="font-display text-2xl sm:text-3xl text-[#f7f7ff] mb-3 tracking-wide block">
                {f2Data.name}
              </span>

              <div className="relative">
                <select
                  value={fish2}
                  onChange={(e) => setFish2(e.target.value)}
                  className="bg-[#1f1366] border-2 border-[#3b28ab] hover:border-[#f7f7ff]/50 rounded-full px-5 py-2.5 text-xs sm:text-sm text-[#f7f7ff] font-sans focus:outline-none focus:ring-2 focus:ring-[#f7f7ff]/50 transition-colors cursor-pointer appearance-none pr-9 font-medium shadow-md"
                >
                  {fishData.map((f) => (
                    <option key={f.id} value={f.id} className="bg-[#1f1366] text-[#f7f7ff]">
                      {f.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#f7f7ff]/80 pointer-events-none">
                  ▾
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: Find the best tankmates info box */}
          <div className="lg:col-span-4 bg-[#1f1366] border-2 border-[#3b28ab] rounded-3xl p-7 sm:p-8 shadow-2xl text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#27187e] border border-[#3b28ab] flex items-center justify-center text-[#f7f7ff] shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#f7f7ff] tracking-wide">
                Find the best tankmates
              </h3>
            </div>

            <p className="text-sm text-[#f7f7ff]/85 font-sans leading-relaxed">
              Get a detailed comparison and practical guidance to help you make informed decisions. Compatibility can vary by individual fish and aquarium conditions.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}