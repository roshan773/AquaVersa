'use client';

import { useState } from 'react';
import { Equipment as EquipmentType } from '@/lib/types';
import { Search, ArrowRight, RotateCcw, SlidersHorizontal, Wrench, Filter } from 'lucide-react';
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
        <div className="mb-10 pb-8 border-b border-[#cfcaf5]">
          <span className="text-xs font-condensed font-bold uppercase tracking-[0.25em] text-[#27187e] mb-2 block">
            HARDWARE ARCHIVE
          </span>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-normal text-[#27187e] tracking-wide mb-3">
            EQUIPMENT ARCHIVE
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-normal max-w-2xl font-sans leading-relaxed">
            Educational reference library for filtration mechanics, heating stability, and full-spectrum LED fixtures.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-3xl relative">
            <Search className="w-5 h-5 text-[#27187e]/60 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={1.8} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search hardware (e.g. Canister Filter, Submersible Heater, LED Light)..."
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
                Filter Hardware by Category ({filteredEq.length} profiles documented)
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

          <div>
            <label className="text-[11px] uppercase font-condensed font-bold text-[#27187e] mb-2 block">
              Equipment Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-condensed font-bold uppercase tracking-wider transition-all ${
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
                  <div className="relative w-full h-48 rounded-2xl bg-[#f7f7ff] overflow-hidden mb-5 flex items-center justify-center p-4">
                    <Image
                      src={eq.image || '/hero_aquarium.jpg'}
                      alt={eq.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#edeafc] text-[#27187e] border border-[#cfcaf5] px-2.5 py-1 rounded-md text-[10px] font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Wrench className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                      <span>{eq.category}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight mb-2">
                    {eq.name}
                  </h3>

                  <p className="text-xs text-[#27187e]/80 font-sans leading-relaxed line-clamp-3 mb-4">
                    {eq.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                  <span>Read Hardware Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-12 text-center max-w-xl mx-auto my-12">
            <h3 className="text-3xl font-display font-normal text-[#27187e] mb-2">
              No hardware matched your search.
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

      <GlobalCTA
        badge="HARDWARE & FILTRATION ENGINEERING"
        title={
          <>
            Calculate filtration &amp; heating <br className="hidden sm:inline" />
            for your exact tank size.
          </>
        }
        description="Determine required turnover rates (GPH/LPH), heater wattages, and canister filter sizing tailored to your bioload."
        primaryAction={{
          label: 'Open Equipment Wizard',
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
