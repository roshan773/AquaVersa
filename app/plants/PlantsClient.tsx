'use client';

import { useState } from 'react';
import { Plant as PlantType } from '@/lib/types';
import { Search, ArrowRight, RotateCcw, SlidersHorizontal, Leaf, Sun, Layers, Sprout } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PlantsClientProps {
  plantList: PlantType[];
}

export default function PlantsClient({ plantList }: PlantsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [lightFilter, setLightFilter] = useState('All');
  const [placementFilter, setPlacementFilter] = useState('All');

  const filteredPlants = plantList.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (plant.scientificName && plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLight = lightFilter === 'All' || plant.light?.toLowerCase().includes(lightFilter.toLowerCase());
    const matchesPlacement =
      placementFilter === 'All' || plant.placement?.toLowerCase().includes(placementFilter.toLowerCase());

    return matchesSearch && matchesLight && matchesPlacement;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setLightFilter('All');
    setPlacementFilter('All');
  };

  const hasActiveFilters = searchTerm !== '' || lightFilter !== 'All' || placementFilter !== 'All';

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Page Header */}
        <div className="mb-10 pb-8 border-b border-[#cfcaf5]">
          <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
            BOTANICAL CATALOGUE
          </span>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-normal text-[#27187e] tracking-wide mb-3">
            AQUARIUM PLANTS
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-normal max-w-2xl font-sans leading-relaxed">
            Botanical index of freshwater flora for natural nutrient absorption, aquascaping depth, and fish shelter.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-3xl relative">
            <Search className="w-5 h-5 text-[#27187e]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.8} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search botanical species (e.g. Java Fern, Anubias nana, Amazon Sword)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#ffffff] border-2 border-[#cfcaf5] focus:border-[#27187e] text-base text-[#27187e] font-sans focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 mb-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[#edeafc]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#27187e]" strokeWidth={1.8} aria-hidden="true" />
              <span className="text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                Filter Botanical Archive ({filteredPlants.length} species available)
              </span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            {/* Light Requirement */}
            <div>
              <label className="text-[11px] uppercase font-condensed font-bold text-[#27187e] mb-1.5 block">
                Lighting Requirement
              </label>
              <select
                value={lightFilter}
                onChange={(e) => setLightFilter(e.target.value)}
                className="w-full bg-[#f7f7ff] border border-[#cfcaf5] rounded-xl px-3 py-2 text-xs text-[#27187e] focus:outline-none focus:border-[#27187e]"
              >
                <option value="All">All Light Requirements</option>
                <option value="low">Low Light (Beginner Friendly)</option>
                <option value="medium">Medium Light</option>
                <option value="high">High Light (CO2 Beneficial)</option>
              </select>
            </div>

            {/* Placement */}
            <div>
              <label className="text-[11px] uppercase font-condensed font-bold text-[#27187e] mb-1.5 block">
                Aquarium Placement
              </label>
              <select
                value={placementFilter}
                onChange={(e) => setPlacementFilter(e.target.value)}
                className="w-full bg-[#f7f7ff] border border-[#cfcaf5] rounded-xl px-3 py-2 text-xs text-[#27187e] focus:outline-none focus:border-[#27187e]"
              >
                <option value="All">All Placements</option>
                <option value="foreground">Foreground (Carpeting)</option>
                <option value="midground">Midground &amp; Hardscape</option>
                <option value="background">Background (Tall Stems)</option>
                <option value="floating">Floating Plants</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botanical Plant Grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant) => (
              <Link
                key={plant.id}
                href={`/plants/${plant.slug}`}
                className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#edeafc] overflow-hidden mb-5">
                    <Image
                      src={plant.image}
                      alt={plant.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#f7f7ff] text-[#27187e] px-2.5 py-1 rounded-md text-[10px] font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Leaf className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                      <span>{plant.placement || 'Midground'}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight mb-1">
                    {plant.name}
                  </h3>

                  <p className="text-xs text-[#27187e]/70 italic font-sans mb-4">
                    {plant.scientificName || 'Aquatic flora'}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs font-sans mb-4 pt-3 border-t border-[#edeafc]">
                    <span className="bg-[#edeafc] text-[#27187e] px-2.5 py-1 rounded-md font-medium text-[11px] flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={1.8} aria-hidden="true" />
                      <span>Light: {plant.light}</span>
                    </span>
                    <span className="bg-[#edeafc] text-[#27187e] px-2.5 py-1 rounded-md font-medium text-[11px] flex items-center gap-1.5">
                      <Sprout className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={1.8} aria-hidden="true" />
                      <span>Difficulty: {plant.difficulty}</span>
                    </span>
                  </div>

                  <p className="text-xs text-[#27187e]/80 font-sans leading-relaxed line-clamp-2">
                    {plant.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                  <span>View Botanical Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-12 text-center max-w-xl mx-auto my-12">
            <h3 className="text-3xl font-display font-normal text-[#27187e] mb-2">
              No aquatic plants matched your search.
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
