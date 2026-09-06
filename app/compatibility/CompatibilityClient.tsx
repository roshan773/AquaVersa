'use client';

import { useState } from 'react';
import { 
  Scale, 
  Settings, 
  Compass, 
  Leaf, 
  Grid, 
  BookOpen, 
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import PairwiseMatcher from '@/components/compatibility/PairwiseMatcher';
import PlantCompatibility from '@/components/compatibility/PlantCompatibility';
import CompatibilityMatrix from '@/components/compatibility/CompatibilityMatrix';
import CompatibilityGuide from '@/components/compatibility/CompatibilityGuide';
import StockCompatibility from '@/components/home/StockCompatibility';
import GlobalCTA from '@/components/ui/GlobalCTA';

type TabType = 'pair' | 'stock' | 'plants' | 'matrix' | 'guide';

export default function CompatibilityClient() {
  const [tab, setTab] = useState<TabType>('pair');

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 text-left marine-pattern-light">
      <div className="site-container pb-20 sm:pb-24">
        
        {/* Editorial Breadcrumbs */}
        <div className="flex items-center gap-2 font-readable text-xs font-semibold text-[#27187e]/70 mb-6">
          <Link href="/" className="hover:text-[#27187e] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <Link href="/#tools" className="hover:text-[#27187e] transition-colors">Smart Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[#27187e]">Compatibility Engine</span>
        </div>

        {/* Header Hero Banner */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Atlas Community Biology Engine</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4 leading-[0.95]">
            Aquarium Fish Compatibility Checker
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-3xl leading-relaxed font-medium">
            Evaluate water chemistry overlap, aggressive territorial behaviors, vertical swimming corridors, and live plant safety to build a thriving, stress-free community aquarium.
          </p>

          {/* 5-Tab Interactive Engine Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-8 bg-[#ffffff] p-2 rounded-3xl border-2 border-[#cfcaf5] shadow-sm">
            <button
              onClick={() => setTab('pair')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl font-readable text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                tab === 'pair'
                  ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm'
                  : 'text-[#27187e]/80 hover:text-[#27187e] hover:bg-[#edeafc]'
              }`}
            >
              <Scale className="w-4 h-4 shrink-0" />
              <span className="truncate">Pair Matcher</span>
            </button>

            <button
              onClick={() => setTab('stock')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl font-readable text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                tab === 'stock'
                  ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm'
                  : 'text-[#27187e]/80 hover:text-[#27187e] hover:bg-[#edeafc]'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span className="truncate">Stock Builder</span>
            </button>

            <button
              onClick={() => setTab('plants')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl font-readable text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                tab === 'plants'
                  ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm'
                  : 'text-[#27187e]/80 hover:text-[#27187e] hover:bg-[#edeafc]'
              }`}
            >
              <Leaf className="w-4 h-4 shrink-0" />
              <span className="truncate">Plant Selector</span>
            </button>

            <button
              onClick={() => setTab('matrix')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl font-readable text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                tab === 'matrix'
                  ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm'
                  : 'text-[#27187e]/80 hover:text-[#27187e] hover:bg-[#edeafc]'
              }`}
            >
              <Grid className="w-4 h-4 shrink-0" />
              <span className="truncate">Quick Matrix</span>
            </button>

            <button
              onClick={() => setTab('guide')}
              className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl font-readable text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                tab === 'guide'
                  ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm'
                  : 'text-[#27187e]/80 hover:text-[#27187e] hover:bg-[#edeafc]'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="truncate">Rules Guide</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tool Content */}
        <div className="space-y-16">
          {tab === 'pair' && (
            <div className="space-y-14">
              <PairwiseMatcher />
              <PlantCompatibility />
              <CompatibilityMatrix />
              <CompatibilityGuide />
            </div>
          )}

          {tab === 'stock' && (
            <div className="space-y-14">
              <StockCompatibility />
              <CompatibilityGuide />
            </div>
          )}

          {tab === 'plants' && (
            <div className="space-y-14">
              <PlantCompatibility />
              <PairwiseMatcher />
            </div>
          )}

          {tab === 'matrix' && (
            <div className="space-y-14">
              <CompatibilityMatrix />
              <PairwiseMatcher />
              <CompatibilityGuide />
            </div>
          )}

          {tab === 'guide' && (
            <div className="space-y-14">
              <CompatibilityGuide />
              <CompatibilityMatrix />
            </div>
          )}
        </div>

      </div>

      <GlobalCTA
        badge="SPECIES COMPATIBILITY ENGINE"
        title={
          <>
            Calculate tank dimensions &amp; <br className="hidden sm:inline" />
            minimum water volume requirements.
          </>
        }
        description="Ensure your community species have sufficient horizontal swimming corridors and biological volume buffer."
        primaryAction={{
          label: 'Open Volume Calculator',
          href: '/tank-size',
        }}
        secondaryAction={{
          label: 'Browse Species Catalog',
          href: '/fish',
        }}
      />
    </div>
  );
}
