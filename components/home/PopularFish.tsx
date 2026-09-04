'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function PopularFish() {
  const popularFish = [
    {
      id: 'neon-tetra',
      name: 'Neon Tetra',
      scientific: 'Paracheirodon innesi',
      image: '/images/neon_tetra.png',
      tags: ['Peaceful', 'Schooling', 'Beginner'],
      href: '/fish/freshwater/neon-tetra',
    },
    {
      id: 'betta-fish',
      name: 'Betta Fish',
      scientific: 'Betta splendens',
      image: '/images/betta.png',
      tags: ['Semi-Aggressive', 'Solitary', 'Beginner'],
      href: '/fish/freshwater/betta-fish',
    },
    {
      id: 'corydoras-catfish',
      name: 'Corydoras Catfish',
      scientific: 'Corydoras spp.',
      image: '/images/corydoras.png',
      tags: ['Peaceful', 'Bottom Dweller', 'Beginner'],
      href: '/fish/freshwater/corydoras-catfish',
    },
    {
      id: 'oscar',
      name: 'Oscar',
      scientific: 'Astronotus ocellatus',
      image: '/images/oscar.png',
      tags: ['Semi-Aggressive', 'Large', 'Intermediate'],
      href: '/fish/freshwater/oscar',
    },
  ];

  return (
    <section className="py-20 bg-[#f7f7ff] text-left">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[10px] font-condensed font-bold uppercase tracking-[0.2em] text-[#27187e]/80 mb-2 block">
              FEATURED SPECIES
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
              POPULAR FISH
            </h2>
            <p className="text-xs sm:text-sm text-[#27187e]/80 font-normal max-w-xl mt-1 font-sans">
              A look at some of the most loved aquarium fish.
            </p>
          </div>

          <Link
            href="/fish"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs font-condensed font-bold uppercase tracking-wider transition-all shadow-sm mt-4 md:mt-0"
          >
            <span>View All Fish</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#f7f7ff]" />
          </Link>
        </div>

        {/* 4-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularFish.map((fish) => (
            <Link
              key={fish.id}
              href={fish.href}
              className="bg-[#ffffff] border border-[#cfcaf5]/70 hover:border-[#27187e] rounded-2xl overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Fish Image */}
                <div className="relative w-full aspect-[4/3] bg-[#0d0630] overflow-hidden">
                  <Image
                    src={fish.image}
                    alt={fish.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight">
                      {fish.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-[#27187e]/60 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-[#27187e]/60 italic font-sans mb-3">
                    {fish.scientific}
                  </p>

                  {/* Characteristic Tags */}
                  <div className="flex flex-wrap gap-1">
                    {fish.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-sans font-medium px-2 py-0.5 rounded-md bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
