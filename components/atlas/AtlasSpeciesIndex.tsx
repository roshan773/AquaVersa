'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Fish, Ruler, Thermometer } from 'lucide-react';
import { fishData } from '@/data/fish';

export default function AtlasSpeciesIndex() {
  // Select 6 distinct species representing different biotope profiles
  const speciesList = fishData.slice(0, 6);

  return (
    <section className="marine-pattern-light py-24 bg-[#f7f7ff] text-left border-t border-[#cfcaf5]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
              SPECIES FIELD GUIDE
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
              Find the right species.
            </h2>
            <p className="text-base sm:text-lg text-[#27187e]/85 font-normal max-w-xl mt-2 font-sans leading-relaxed">
              Care requirements, adult sizing, and biological compatibilities from our natural history database.
            </p>
          </div>

          <Link
            href="/fish"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs sm:text-sm font-condensed font-bold uppercase tracking-wider transition-all shadow-md mt-4 md:mt-0"
          >
            <span>View Species Library</span>
            <ArrowRight className="w-4 h-4 text-[#f7f7ff]" strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>

        {/* Natural History Field Guide Index Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speciesList.map((fish) => (
            <Link
              key={fish.id}
              href={`/fish/${fish.category?.toLowerCase() || 'freshwater'}/${fish.slug}`}
              className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Image */}
                <div className="relative w-full aspect-[16/10] rounded-2xl bg-[#0d0630] overflow-hidden mb-5">
                  <Image
                    src={fish.image}
                    alt={`${fish.name} (${fish.scientificName})`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#f7f7ff] text-[#27187e] px-2.5 py-1 rounded-md text-[10px] font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Fish className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                    <span>{fish.category}</span>
                  </div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight">
                    {fish.name}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-[#27187e]/60 group-hover:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
                </div>
                
                <p className="text-xs text-[#27187e]/70 italic font-sans mb-4">
                  {fish.scientificName}
                </p>

                {/* Species Parameters Table */}
                <div className="grid grid-cols-2 gap-2 text-xs font-sans mb-4 pt-3 border-t border-[#edeafc]">
                  <div className="bg-[#f7f7ff] p-2.5 rounded-xl border border-[#cfcaf5] flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#27187e] shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    <div>
                      <span className="text-[10px] uppercase font-condensed text-[#27187e]/70 block font-bold">Min Tank</span>
                      <span className="font-bold text-xs text-[#27187e]">{fish.minTankSize} Gal</span>
                    </div>
                  </div>
                  <div className="bg-[#f7f7ff] p-2.5 rounded-xl border border-[#cfcaf5] flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-[#27187e] shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    <div>
                      <span className="text-[10px] uppercase font-condensed text-[#27187e]/70 block font-bold">Care Level</span>
                      <span className="font-bold text-xs text-[#27187e] capitalize">{fish.difficulty}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#27187e]/80 font-sans leading-relaxed line-clamp-2">
                  {fish.description}
                </p>
              </div>

              {/* View link */}
              <div className="pt-4 mt-4 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                <span>Open Species Sheet</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
