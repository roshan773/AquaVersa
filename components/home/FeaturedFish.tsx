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
    <section className="py-20 bg-[#030712] relative border-b border-slate-800/80">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-800/30 mb-3 text-teal-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              <span>Species Care Library</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-white tracking-tight">
              Featured Aquarium Fish
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mt-2 font-normal leading-relaxed">
              Explore essential care requirements, tank parameters, and social temperaments for popular freshwater and marine species.
            </p>
          </div>

          <Link 
            href="/fish" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors mt-4 md:mt-0"
          >
            <span>Browse All {fishData.length} Species</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {fishData.slice(0, 6).map((fish) => {
            const isFreshwater = fish.category?.toLowerCase() === "freshwater";
            const badgeColor = 
              fish.difficulty === "Beginner" ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/30" :
              fish.difficulty === "Advanced Beginner" ? "bg-teal-950/60 text-teal-300 border-teal-800/30" :
              fish.difficulty === "Intermediate" ? "bg-blue-950/60 text-blue-300 border-blue-800/30" :
              "bg-amber-950/60 text-amber-300 border-amber-800/30";
            
            return (
              <div 
                key={fish.id}
                className="group rounded-2xl overflow-hidden border border-slate-800 bg-[#061224] hover:border-slate-700 transition-all duration-200 flex flex-col"
              >
                {/* Card Image */}
                <div className="relative overflow-hidden h-48 w-full bg-slate-950">
                  <Image 
                    src={fish.image} 
                    alt={`${fish.name} (${fish.scientificName || 'Aquarium species'})`} 
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 opacity-90" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#030712]/90 backdrop-blur-sm border border-slate-800 px-2.5 py-0.5 rounded-md text-[10px] font-semibold text-slate-300">
                    {fish.category}
                  </div>

                  {/* Difficulty Tag */}
                  <div className={`absolute top-3 right-3 border backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[10px] font-semibold ${badgeColor}`}>
                    {fish.difficulty}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-3">
                    <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-1 font-poppins">
                      {fish.name}
                    </h3>
                    <p className="text-xs text-slate-400 italic font-normal">{fish.scientificName}</p>
                  </div>
                  
                  {/* Quick parameter pills */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] text-slate-300">
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block text-[9px] uppercase">Min Tank</span>
                      <span className="font-semibold text-white">{fish.minTankSize} gal</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block text-[9px] uppercase">Temperament</span>
                      <span className="font-semibold text-white truncate block">{fish.temperament}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-normal mb-5 line-clamp-2 flex-grow leading-relaxed">
                    {fish.description}
                  </p>
                  
                  <Link 
                    href={`/fish/${fish.category?.toLowerCase() || 'freshwater'}/${fish.slug}`} 
                    className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white font-semibold text-xs mt-auto group cursor-pointer pt-3 border-t border-slate-800/80"
                  >
                    <span>Read Care Profile</span> 
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
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
