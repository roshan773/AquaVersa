'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fish as FishType } from '@/lib/types';
import GlobalCTA from '@/components/ui/GlobalCTA';
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  ChevronRight,
  Fish,
  Thermometer,
  Ruler,
  Droplets,
  Layers,
} from 'lucide-react';

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
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={2} />
            <span>Digital Species Field Guide</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            FISH SPECIES ATLAS
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl leading-relaxed">
            Explore verified biological requirements, water chemistry ranges, minimum aquarium volumes, and community temperaments.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-3xl relative">
            <Search className="w-5 h-5 text-[#27187e]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={2} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by common name or binomial taxonomy (e.g. Neon Tetra, Betta splendens)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#ffffff] border-2 border-[#cfcaf5] focus:border-[#27187e] text-base text-[#27187e] font-readable placeholder:text-[#27187e]/50 focus:outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 mb-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#edeafc]">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-5 h-5 text-[#27187e]" strokeWidth={2} aria-hidden="true" />
              <span className="font-readable font-semibold text-sm sm:text-base text-[#27187e]">
                Filter Species Index ({filteredFish.length} of {validFish.length} documented)
              </span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="font-readable font-semibold text-sm text-[#27187e] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-readable">
            {/* Habitat */}
            <div>
              <label className="text-xs uppercase font-semibold text-[#27187e]/80 mb-2 block tracking-wider">
                Habitat Category
              </label>
              <select
                value={habitatFilter}
                onChange={(e) => setHabitatFilter(e.target.value)}
                className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-[#27187e] font-readable font-medium focus:outline-none focus:border-[#27187e] transition-all cursor-pointer"
              >
                <option value="All">All Habitats (Freshwater &amp; Marine)</option>
                <option value="freshwater">Freshwater</option>
                <option value="saltwater">Saltwater &amp; Reef</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-xs uppercase font-semibold text-[#27187e]/80 mb-2 block tracking-wider">
                Care Difficulty
              </label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-[#27187e] font-readable font-medium focus:outline-none focus:border-[#27187e] transition-all cursor-pointer"
              >
                <option value="All">All Experience Levels</option>
                <option value="beginner">Beginner Friendly</option>
                <option value="intermediate">Intermediate Care</option>
                <option value="advanced">Advanced / Specialist</option>
              </select>
            </div>

            {/* Temperament */}
            <div>
              <label className="text-xs uppercase font-semibold text-[#27187e]/80 mb-2 block tracking-wider">
                Temperament
              </label>
              <select
                value={temperamentFilter}
                onChange={(e) => setTemperamentFilter(e.target.value)}
                className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-[#27187e] font-readable font-medium focus:outline-none focus:border-[#27187e] transition-all cursor-pointer"
              >
                <option value="All">All Temperaments</option>
                <option value="peaceful">Peaceful Community</option>
                <option value="semi-aggressive">Semi-Aggressive</option>
                <option value="aggressive">Territorial / Aggressive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Species Field Guide Grid */}
        {filteredFish.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFish.map((fish) => (
              <Link
                key={fish.id}
                href={`/fish/${fish.category?.toLowerCase() || 'freshwater'}/${fish.slug}`}
                className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] rounded-2xl bg-[#12093d] overflow-hidden mb-5">
                    <Image
                      src={fish.image}
                      alt={fish.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#f7f7ff] text-[#27187e] border border-[#cfcaf5] px-3 py-1 rounded-md font-readable text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <Fish className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={2.2} aria-hidden="true" />
                      <span>{fish.category}</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight">
                      {fish.name}
                    </h2>
                    <ChevronRight className="w-5 h-5 text-[#27187e]/60 group-hover:translate-x-1 group-hover:text-[#27187e] transition-all shrink-0 mt-1" strokeWidth={2} aria-hidden="true" />
                  </div>

                  <p className="text-sm text-[#27187e]/70 italic font-readable mb-4">
                    {fish.scientificName}
                  </p>

                  {/* Species Parameter Matrix */}
                  <div className="grid grid-cols-2 gap-2.5 font-readable mb-4 pt-4 border-t border-[#edeafc]">
                    <div className="bg-[#f7f7ff] p-3 rounded-xl border border-[#cfcaf5] flex items-center gap-2.5">
                      <Ruler className="w-4 h-4 text-[#27187e] shrink-0" strokeWidth={2} aria-hidden="true" />
                      <div>
                        <span className="text-xs uppercase font-semibold text-[#27187e]/70 block tracking-wider">Min Tank</span>
                        <span className="font-bold text-sm text-[#27187e]">{fish.minTankSize} Gal</span>
                      </div>
                    </div>
                    <div className="bg-[#f7f7ff] p-3 rounded-xl border border-[#cfcaf5] flex items-center gap-2.5">
                      <Thermometer className="w-4 h-4 text-[#27187e] shrink-0" strokeWidth={2} aria-hidden="true" />
                      <div>
                        <span className="text-xs uppercase font-semibold text-[#27187e]/70 block tracking-wider">Care Level</span>
                        <span className="font-bold text-sm text-[#27187e] capitalize">{fish.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#27187e]/85 font-readable leading-relaxed line-clamp-2">
                    {fish.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-[#edeafc] flex items-center justify-between text-sm font-readable font-semibold text-[#27187e]">
                  <span>View Full Species Sheet</span>
                  <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-12 text-center max-w-xl mx-auto my-12">
            <h3 className="text-3xl font-display font-normal text-[#27187e] mb-3">
              No species matched your search.
            </h3>
            <p className="text-base text-[#27187e]/75 mb-6 font-readable">
              Try adjusting your spelling or reset the filter criteria to see all documented fish.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-full bg-[#27187e] text-[#f7f7ff] text-sm font-readable font-bold uppercase tracking-wider hover:bg-[#1b1059] transition-all cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>

      <GlobalCTA
        badge="SPECIES ATLAS // COMPATIBILITY"
        title={
          <>
            Ready to design your <br className="hidden sm:inline" />
            community aquarium?
          </>
        }
        description="Verify water parameter overlap, minimum tank volumes, and peaceful schooling temperaments with our interactive stocking calculator."
        primaryAction={{
          label: 'Launch Stocking Planner',
          href: '/stocking-planner',
        }}
        secondaryAction={{
          label: 'Check Compatibility',
          href: '/compatibility',
        }}
      />
    </div>
  );
}
