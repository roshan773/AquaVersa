'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fish as FishType } from '@/lib/types';
import { Search, RotateCcw, Filter, ArrowRight, ChevronRight } from 'lucide-react';

interface FishLibraryClientProps {
  initialFish: FishType[];
}

export default function FishLibraryClient({ initialFish }: FishLibraryClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [habitatFilter, setHabitatFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [temperamentFilter, setTemperamentFilter] = useState('All');

  const validFish = useMemo(() => initialFish.filter((f) => f.slug), [initialFish]);

  const filteredFish = useMemo(() => {
    return validFish.filter((fish) => {
      const matchesSearch =
        fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (fish.scientificName && fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesHabitat =
        habitatFilter === 'All' ||
        fish.category?.toLowerCase() === habitatFilter.toLowerCase();

      const matchesDifficulty =
        difficultyFilter === 'All' || fish.difficulty?.toLowerCase().includes(difficultyFilter.toLowerCase());

      const matchesTemperament =
        temperamentFilter === 'All' ||
        fish.temperament?.toLowerCase().includes(temperamentFilter.toLowerCase());

      return matchesSearch && matchesHabitat && matchesDifficulty && matchesTemperament;
    });
  }, [validFish, searchTerm, habitatFilter, difficultyFilter, temperamentFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setHabitatFilter('All');
    setDifficultyFilter('All');
    setTemperamentFilter('All');
  };

  const hasActiveFilters =
    searchTerm !== '' || habitatFilter !== 'All' || difficultyFilter !== 'All' || temperamentFilter !== 'All';

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Page Header */}
        <div className="mb-10 pb-8 border-b border-[#cfcaf5]">
          <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
            SPECIES FIELD GUIDE
          </span>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-normal text-[#27187e] tracking-wide mb-3">
            FISH SPECIES
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-normal max-w-2xl font-sans leading-relaxed">
            Explore aquarium fish by habitat, care requirements and temperament.
          </p>

          {/* Large Search Bar */}
          <div className="mt-8 max-w-3xl relative">
            <Search className="w-5 h-5 text-[#27187e]/60 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by common name or scientific name (e.g. Neon Tetra, Betta splendens)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#ffffff] border-2 border-[#cfcaf5] focus:border-[#27187e] text-base text-[#27187e] font-sans focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 mb-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[#edeafc]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#27187e]" />
              <span className="text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                Filter Species Index ({filteredFish.length} of {validFish.length} documented)
              </span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            {/* Habitat */}
            <div>
              <label className="text-[11px] uppercase font-condensed font-bold text-[#27187e] mb-1.5 block">
                Habitat
              </label>
              <select
                value={habitatFilter}
                onChange={(e) => setHabitatFilter(e.target.value)}
                className="w-full bg-[#f7f7ff] border border-[#cfcaf5] rounded-xl px-3 py-2 text-xs text-[#27187e] focus:outline-none focus:border-[#27187e]"
              >
                <option value="All">All Habitats</option>
                <option value="freshwater">Freshwater</option>
                <option value="saltwater">Saltwater &amp; Reef</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-[11px] uppercase font-condensed font-bold text-[#27187e] mb-1.5 block">
                Care Difficulty
              </label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full bg-[#f7f7ff] border border-[#cfcaf5] rounded-xl px-3 py-2 text-xs text-[#27187e] focus:outline-none focus:border-[#27187e]"
              >
                <option value="All">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Temperament */}
            <div>
              <label className="text-[11px] uppercase font-condensed font-bold text-[#27187e] mb-1.5 block">
                Temperament
              </label>
              <select
                value={temperamentFilter}
                onChange={(e) => setTemperamentFilter(e.target.value)}
                className="w-full bg-[#f7f7ff] border border-[#cfcaf5] rounded-xl px-3 py-2 text-xs text-[#27187e] focus:outline-none focus:border-[#27187e]"
              >
                <option value="All">All Temperaments</option>
                <option value="peaceful">Peaceful Community</option>
                <option value="semi-aggressive">Semi-Aggressive</option>
                <option value="aggressive">Territorial / Aggressive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Species Field Guide List / Grid */}
        {filteredFish.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFish.map((fish) => (
              <Link
                key={fish.id}
                href={`/fish/${fish.category?.toLowerCase() || 'freshwater'}/${fish.slug}`}
                className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] rounded-2xl bg-[#0d0630] overflow-hidden mb-5">
                    <Image
                      src={fish.image}
                      alt={fish.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#f7f7ff] text-[#27187e] px-2.5 py-1 rounded-md text-[10px] font-condensed font-bold uppercase tracking-wider">
                      {fish.category}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight">
                      {fish.name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-[#27187e]/60 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <p className="text-xs text-[#27187e]/70 italic font-sans mb-4">
                    {fish.scientificName}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs font-sans mb-4 pt-3 border-t border-[#edeafc]">
                    <div className="bg-[#f7f7ff] p-2.5 rounded-xl border border-[#cfcaf5]">
                      <span className="text-[10px] uppercase font-condensed text-[#27187e]/70 block font-bold">Min Tank</span>
                      <span className="font-bold text-sm text-[#27187e]">{fish.minTankSize} Gal</span>
                    </div>
                    <div className="bg-[#f7f7ff] p-2.5 rounded-xl border border-[#cfcaf5]">
                      <span className="text-[10px] uppercase font-condensed text-[#27187e]/70 block font-bold">Difficulty</span>
                      <span className="font-bold text-sm text-[#27187e]">{fish.difficulty}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#27187e]/80 font-sans leading-relaxed line-clamp-2">
                    {fish.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                  <span>View Full Species Sheet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-12 text-center max-w-xl mx-auto my-12">
            <h3 className="text-3xl font-display font-normal text-[#27187e] mb-2">
              No species matched your search.
            </h3>
            <p className="text-sm text-[#27187e]/75 mb-6 font-sans">
              Try adjusting your spelling or reset the filter criteria.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-full bg-[#27187e] text-[#f7f7ff] text-xs font-condensed font-bold uppercase tracking-wider hover:bg-[#1b1059] transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
