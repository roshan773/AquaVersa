'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { fishData } from '@/data/fish';
import { useStats } from '@/components/home/StatsContext';

export default function FeaturedFish() {
  const { setFishCount } = useStats();

  useEffect(() => {
    if (typeof setFishCount === 'function') {
      setFishCount(fishData.length);
    }
  }, [setFishCount]);

  return (
    <section className="py-20 bg-[#0f0738] relative border-b border-[#27187E]/80">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#27187E]/50 border border-[#3622a6] mb-3 text-[#F7F7FF] text-xs font-condensed uppercase tracking-wider font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#aca1f7]" />
              <span>Species Care Library</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#F7F7FF] tracking-wide">
              Featured Aquarium Species
            </h2>
            <p className="text-[#F7F7FF]/75 text-sm max-w-xl mt-2 font-normal leading-relaxed font-sans">
              Explore essential care requirements, tank parameters, and social temperaments for popular freshwater and marine species.
            </p>
          </div>

          <Link 
            href="/fish" 
            className="inline-flex items-center gap-1.5 text-xs font-condensed font-bold uppercase tracking-wider text-[#F7F7FF] hover:text-[#aca1f7] transition-colors mt-4 md:mt-0"
          >
            <span>Browse All {fishData.length} Species</span>
            <ArrowRight className="w-4 h-4 text-[#aca1f7]" />
          </Link>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {fishData.slice(0, 6).map((fish) => {
            const badgeColor = 
              fish.difficulty === "Beginner" ? "bg-[#F7F7FF] text-[#27187E] font-bold" :
              fish.difficulty === "Advanced Beginner" ? "bg-[#d0cbfb] text-[#14094a] font-bold" :
              fish.difficulty === "Intermediate" ? "bg-[#3622a6] text-[#F7F7FF] font-semibold" :
              "bg-[#ffbe3b] text-[#14094a] font-bold";
            
            return (
              <div 
                key={fish.id}
                className="group rounded-2xl overflow-hidden border border-[#27187E] bg-[#1c0e64] hover:border-[#F7F7FF] transition-all duration-200 flex flex-col shadow-lg"
              >
                {/* Card Image */}
                <div className="relative overflow-hidden h-48 w-full bg-[#0d0630]">
                  <Image 
                    src={fish.image} 
                    alt={`${fish.name} (${fish.scientificName || 'Aquarium species'})`} 
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 opacity-90" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#0d0630]/90 backdrop-blur-sm border border-[#27187E] px-2.5 py-0.5 rounded-md text-[10px] font-condensed uppercase tracking-wider font-semibold text-[#F7F7FF]">
                    {fish.category}
                  </div>

                  {/* Difficulty Tag */}
                  <div className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-condensed uppercase tracking-wider shadow-sm ${badgeColor}`}>
                    {fish.difficulty}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-3">
                    <h3 className="text-xl font-display font-normal tracking-wide text-[#F7F7FF] group-hover:text-white transition-colors line-clamp-1">
                      {fish.name}
                    </h3>
                    <p className="text-xs text-[#F7F7FF]/70 italic font-normal font-sans">{fish.scientificName}</p>
                  </div>
                  
                  {/* Quick parameter pills */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] text-[#F7F7FF]">
                    <div className="p-2 rounded-xl bg-[#27187E]/60 border border-[#3622a6]">
                      <span className="text-[#F7F7FF]/60 block text-[9px] uppercase font-condensed tracking-wider">Min Tank</span>
                      <span className="font-bold text-[#F7F7FF] font-condensed text-sm">{fish.minTankSize} GAL</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#27187E]/60 border border-[#3622a6]">
                      <span className="text-[#F7F7FF]/60 block text-[9px] uppercase font-condensed tracking-wider">Temperament</span>
                      <span className="font-bold text-[#F7F7FF] font-condensed text-sm truncate block">{fish.temperament}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#F7F7FF]/75 font-normal mb-5 line-clamp-2 flex-grow leading-relaxed font-sans">
                    {fish.description}
                  </p>
                  
                  <Link 
                    href={`/fish/${fish.category?.toLowerCase() || 'freshwater'}/${fish.slug}`} 
                    className="inline-flex items-center gap-1.5 text-[#F7F7FF] hover:text-white font-condensed uppercase tracking-wider font-bold text-xs mt-auto group cursor-pointer pt-3 border-t border-[#27187E]"
                  >
                    <span>Read Care Profile</span> 
                    <ArrowRight className="w-3.5 h-3.5 text-[#aca1f7] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
