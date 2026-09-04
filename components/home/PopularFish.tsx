'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { fishData } from '@/data/fish';

export default function PopularFish() {
  // Select 4 popular species: Neon Tetra, Betta Fish, Corydoras Catfish, Angelfish (or Guppy)
  const popularFish = fishData.slice(0, 4);

  return (
    <section className="py-20 bg-[#f7f7ff] border-t border-[#cfcaf5] text-left">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-condensed font-bold uppercase tracking-widest text-[#27187e] mb-2 block">
              SPECIES SPOTLIGHT
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
              POPULAR FISH
            </h2>
            <p className="text-base text-[#27187e]/80 font-normal max-w-xl mt-2 font-sans">
              A look at some of the most loved aquarium fish.
            </p>
          </div>

          <Link
            href="/fish"
            className="inline-flex items-center gap-2 text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] hover:text-[#1b1059] transition-colors mt-4 md:mt-0 group"
          >
            <span>View All Fish</span>
            <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularFish.map((fish) => (
            <Link
              key={fish.id}
              href={`/fish/${fish.category?.toLowerCase() || 'freshwater'}/${fish.slug}`}
              className="editorial-card group flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl"
            >
              <div>
                {/* Fish Image */}
                <div className="relative w-full aspect-[4/3] bg-[#edeafc] overflow-hidden">
                  <Image
                    src={fish.image}
                    alt={`${fish.name} (${fish.scientificName})`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-[#f7f7ff]/90 backdrop-blur-sm border border-[#cfcaf5] px-2.5 py-1 rounded-lg text-[10px] font-condensed uppercase tracking-wider font-bold text-[#27187e]">
                    {fish.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-2xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight line-clamp-1">
                    {fish.name}
                  </h3>
                  <p className="text-xs text-[#27187e]/60 italic font-sans mb-3 line-clamp-1">
                    {fish.scientificName}
                  </p>

                  <p className="text-xs text-[#27187e]/75 font-sans leading-relaxed line-clamp-2 mb-4">
                    {fish.description}
                  </p>

                  {/* Characteristic Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-[10px] font-condensed font-semibold uppercase px-2 py-0.5 rounded-md bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]">
                      {fish.minTankSize} Gal Min
                    </span>
                    <span className="text-[10px] font-condensed font-semibold uppercase px-2 py-0.5 rounded-md bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]">
                      {fish.temperament}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="px-5 pb-5 pt-3 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                <span>View Care Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#27187e] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
