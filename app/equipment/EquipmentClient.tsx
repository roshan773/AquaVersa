'use client';

import { useState } from 'react';
import { Equipment as EquipmentType } from '@/lib/types';
import { Search, ArrowRight, RotateCcw, SlidersHorizontal, Wrench, Filter, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import GlobalCTA from '@/components/ui/GlobalCTA';

interface EquipmentClientProps {
  eqList: EquipmentType[];
}

export default function EquipmentClient({ eqList }: EquipmentClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(eqList.map((e) => e.category)))];

  const filteredEq = eqList.filter((eq) => {
    const matchesSearch =
      eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || eq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
  };

  const hasActiveFilters = searchTerm !== '' || categoryFilter !== 'All';

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Page Header */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Wrench className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Hardware &amp; Life Support Systems</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            EQUIPMENT &amp; HARDWARE ARCHIVE
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl leading-relaxed">
            Educational reference guide for biological filtration turnover rates, submersible heating stability, and full-spectrum LED lighting.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-3xl relative">
            <Search className="w-5 h-5 text-[#27187e]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={2} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search hardware (e.g. Canister Filter, Submersible Heater, LED Light)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#ffffff] border-2 border-[#cfcaf5] focus:border-[#27187e] text-base text-[#27187e] font-readable placeholder:text-[#27187e]/50 focus:outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 mb-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#edeafc]">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-5 h-5 text-[#27187e]" strokeWidth={2} aria-hidden="true" />
              <span className="font-readable font-semibold text-sm sm:text-base text-[#27187e]">
                Filter Hardware by Category ({filteredEq.length} profiles documented)
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

          <div>
            <label className="text-xs uppercase font-semibold text-[#27187e]/80 mb-3 block tracking-wider font-readable">
              Equipment Category
            </label>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2.5 rounded-xl font-readable text-sm font-semibold transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm'
                      : 'bg-[#edeafc] text-[#27187e] hover:bg-[#cfcaf5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Equipment Cards Grid */}
        {filteredEq.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEq.map((eq) => (
              <Link
                key={eq.id}
                href={`/equipment/${eq.slug}`}
                className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="relative w-full h-52 rounded-2xl bg-[#edeafc] overflow-hidden mb-5 flex items-center justify-center p-4">
                    <Image
                      src={eq.image || '/hero_aquarium.jpg'}
                      alt={eq.name}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#f7f7ff] text-[#27187e] border border-[#cfcaf5] px-3 py-1 rounded-md font-readable text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <Wrench className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={2.2} aria-hidden="true" />
                      <span>{eq.category}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight mb-2">
                    {eq.name}
                  </h2>

                  <p className="text-sm sm:text-base text-[#27187e]/85 font-readable leading-relaxed line-clamp-3 mb-4">
                    {eq.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-[#edeafc] flex items-center justify-between font-readable font-semibold text-sm text-[#27187e]">
                  <span>Read Hardware Engineering Guide</span>
                  <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-12 text-center max-w-xl mx-auto my-12">
            <h3 className="text-3xl font-display font-normal text-[#27187e] mb-3">
              No hardware matched your search.
            </h3>
            <p className="text-base text-[#27187e]/75 mb-6 font-readable">
              Try adjusting your search terms or reset the filter to view all hardware guides.
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
        badge="HARDWARE SIZING & SELECTION"
        title={
          <>
            Configure the right equipment <br className="hidden sm:inline" />
            for your aquarium volume.
          </>
        }
        description="Determine pump GPH requirements, canister filter capacities, and proper wattage using our interactive sizing utilities."
        primaryAction={{
          label: 'Equipment Selection Wizard',
          href: '/equipment-wizard',
        }}
        secondaryAction={{
          label: 'Calculate Tank Dimensions',
          href: '/tank-size',
        }}
      />
    </div>
  );
}
