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
    <section className="marine-pattern-light py-24 bg-[#f7f7ff] text-left relative overflow-hidden">
      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
              FEATURED SPECIES
            </span>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-normal text-[#27187e] tracking-wide">
              POPULAR FISH
            </h2>
            <p className="text-base sm:text-lg text-[#27187e]/85 font-normal max-w-xl mt-2 font-sans leading-relaxed">
              A look at some of the most loved aquarium fish.
            </p>
          </div>

          <Link
            href="/fish"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs sm:text-sm font-condensed font-bold uppercase tracking-wider transition-all shadow-md mt-4 md:mt-0"
          >
            <span>View All Fish</span>
            <ArrowRight className="w-4 h-4 text-[#f7f7ff]" />
          </Link>
        </div>

        {/* 4-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularFish.map((fish) => (
            <Link
              key={fish.id}
              href={fish.href}
              className="bg-[#ffffff] border-2 border-[#cfcaf5]/80 hover:border-[#27187e] rounded-3xl overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
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
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight">
                      {fish.name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-[#27187e]/60 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-[#27187e]/70 italic font-sans mb-4">
                    {fish.scientific}
                  </p>

                  {/* Characteristic Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {fish.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-sans font-semibold px-2.5 py-1 rounded-md bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]/80"
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
