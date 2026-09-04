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
    <section className="py-20 bg-[#27187e] text-[#f7f7ff] relative overflow-hidden text-left">
      {/* Subtle aquatic background silhouettes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(247,247,255,0.4),transparent_50%)]" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-[10px] font-condensed font-bold uppercase tracking-[0.2em] text-[#f7f7ff]/70 mb-2 block">
            AQUARIUM TOOLS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#f7f7ff] tracking-wide">
            Fish Compatibility Checker
          </h2>
          <p className="text-xs sm:text-sm text-[#f7f7ff]/80 font-normal max-w-2xl mt-2 font-sans">
            Compare two fish to see how well they match in terms of water parameters, temperament, tank size and care requirements.
          </p>
        </div>

        {/* Compatibility Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT & CENTER: 2 Circular Fish Matchup with VS */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            
            {/* Fish 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-3 border-2 border-[#f7f7ff]/30 bg-[#1f1366] relative shadow-lg">
                <Image
                  src={f1Data.image}
                  alt={f1Data.name}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>

              <span className="font-display text-lg sm:text-xl text-[#f7f7ff] mb-2 tracking-wide block">
                {f1Data.name}
              </span>

              <div className="relative">
                <select
                  value={fish1}
                  onChange={(e) => setFish1(e.target.value)}
                  className="bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff]/40 rounded-full px-4 py-1.5 text-xs text-[#f7f7ff] font-sans focus:outline-none focus:ring-1 focus:ring-[#f7f7ff]/50 transition-colors cursor-pointer appearance-none pr-8"
                >
                  {fishData.map((f) => (
                    <option key={f.id} value={f.id} className="bg-[#1f1366] text-[#f7f7ff]">
                      {f.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#f7f7ff]/70 pointer-events-none">
                  ▾
                </span>
              </div>
            </div>

            {/* VS Badge */}
            <div className="w-10 h-10 rounded-full bg-[#1f1366] border border-[#3b28ab] flex items-center justify-center font-display text-sm text-[#f7f7ff]/80 shrink-0">
              VS
            </div>

            {/* Fish 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-3 border-2 border-[#f7f7ff]/30 bg-[#1f1366] relative shadow-lg">
                <Image
                  src={f2Data.image}
                  alt={f2Data.name}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>

              <span className="font-display text-lg sm:text-xl text-[#f7f7ff] mb-2 tracking-wide block">
                {f2Data.name}
              </span>

              <div className="relative">
                <select
                  value={fish2}
                  onChange={(e) => setFish2(e.target.value)}
                  className="bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff]/40 rounded-full px-4 py-1.5 text-xs text-[#f7f7ff] font-sans focus:outline-none focus:ring-1 focus:ring-[#f7f7ff]/50 transition-colors cursor-pointer appearance-none pr-8"
                >
                  {fishData.map((f) => (
                    <option key={f.id} value={f.id} className="bg-[#1f1366] text-[#f7f7ff]">
                      {f.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#f7f7ff]/70 pointer-events-none">
                  ▾
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: Find the best tankmates info box */}
          <div className="lg:col-span-4 bg-[#1f1366]/80 border border-[#3b28ab] rounded-2xl p-6 shadow-xl text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#27187e] border border-[#3b28ab] flex items-center justify-center text-[#f7f7ff] shrink-0">
                <Info className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-display text-lg sm:text-xl text-[#f7f7ff] tracking-wide">
                Find the best tankmates
              </h3>
            </div>

            <p className="text-xs text-[#f7f7ff]/75 font-sans leading-relaxed">
              Get a detailed comparison and practical guidance to help you make informed decisions. Compatibility can vary by individual fish and aquarium conditions.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}