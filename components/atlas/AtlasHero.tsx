'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Fish,
  Leaf,
  FlaskConical,
  Wrench,
  Droplets,
  Thermometer,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { fishData } from '@/data/fish';
import { plantData } from '@/data/plants';

export default function AtlasHero() {
  const speciesCount = fishData.filter((f) => f.slug).length;
  const plantsCount = plantData.filter((p) => p.slug).length;

  return (
    <section className="marine-pattern-light relative pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 bg-[#f7f7ff] text-[#27187e] overflow-hidden text-left">
      {/* Background ambient lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#27187e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 right-10 w-96 h-96 bg-[#cfcaf5]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Top Atlas Editorial Live Pill */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#27187e]/10 border border-[#27187e]/20 text-xs font-condensed font-bold uppercase tracking-[0.2em] text-[#27187e] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#27187e] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={2} aria-hidden="true" />
            <span>ROSHAN AQUVA WORLD // THE AQUARIUM ATLAS</span>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-sans text-[#27187e]/70 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={2} aria-hidden="true" />
            Bio-Verified Species &amp; Water Chemistry Reference
          </span>
        </div>

        {/* Main Grid: Left Typography & Content, Right Rich Framing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">
          
          {/* LEFT COLUMN: Grand Editorial Title, Narrative, Buttons & Metrics */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-normal tracking-wide text-[#27187e] leading-[0.92] mb-6">
              Know your fish. <br />
              Understand your <br />
              <span className="italic font-serif text-[#27187e]">aquarium.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#27187e]/85 font-normal max-w-xl leading-relaxed mb-8 font-sans">
              Practical, systematic aquarium knowledge for choosing compatible species, testing water parameters, balancing planted aquascapes, and maintaining life-supporting biological filtration.
            </p>

            {/* Dual Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold mb-10 w-full sm:w-auto">
              <Link
                href="/fish"
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] transition-all shadow-xl hover:scale-105 active:scale-95 text-xs sm:text-sm group"
              >
                <span>Explore Species Atlas</span>
                <ArrowRight className="w-4 h-4 text-[#f7f7ff] group-hover:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
              </Link>

              <Link
                href="/start-aquarium"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 rounded-full bg-[#f7f7ff] border-2 border-[#27187e] hover:bg-[#edeafc] text-[#27187e] transition-all shadow-sm text-xs sm:text-sm hover:scale-105 active:scale-95 group"
              >
                <BookOpen className="w-4 h-4 text-[#27187e]" strokeWidth={1.8} aria-hidden="true" />
                <span>Start Aquarium Guide</span>
              </Link>
            </div>

            {/* Live Reference Metrics Row */}
            <div className="w-full pt-6 border-t border-[#cfcaf5]/80 grid grid-cols-3 gap-4 sm:gap-6 text-left">
              <div>
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#27187e] block leading-none">
                  {speciesCount}+
                </span>
                <span className="text-[11px] sm:text-xs text-[#27187e]/75 font-sans mt-1.5 block font-semibold uppercase tracking-wider">
                  Cataloged Species
                </span>
              </div>
              
              <div>
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#27187e] block leading-none">
                  {plantsCount}+
                </span>
                <span className="text-[11px] sm:text-xs text-[#27187e]/75 font-sans mt-1.5 block font-semibold uppercase tracking-wider">
                  Botanical Flora
                </span>
              </div>

              <div>
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#27187e] block leading-none">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs text-[#27187e]/75 font-sans mt-1.5 block font-semibold uppercase tracking-wider">
                  Scientific Accuracy
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Luxury Framed Visual with Interactive Biotope Badges */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Visual Frame Container */}
            <div className="relative w-full aspect-[4/5] max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-[#ffffff] bg-[#edeafc] group">
              <Image
                src="/images/hero_discus.jpg"
                alt="Natural planted freshwater aquarium with blue Discus fish (Symphysodon aequifasciatus)"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
              />
              
              {/* Natural gradient depth mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#27187e]/90 via-[#27187e]/20 to-transparent pointer-events-none" />

              {/* Floating Top Telemetry Pill */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="bg-[#27187e]/80 backdrop-blur-md border border-[#f7f7ff]/30 text-[#f7f7ff] px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono shadow-lg">
                  <Droplets className="w-3.5 h-3.5 text-[#f7f7ff]" strokeWidth={1.8} aria-hidden="true" />
                  <span>pH 6.8 · TDS 85 · 26°C</span>
                </div>
                <div className="bg-[#f7f7ff] text-[#27187e] px-2.5 py-1 rounded-full text-[10px] font-condensed font-bold uppercase tracking-wider shadow-md">
                  Active Dossier
                </div>
              </div>

              {/* Bottom Botanical & Habitat Caption Card */}
              <div className="absolute bottom-5 left-5 right-5 text-left text-[#f7f7ff] pointer-events-none">
                <div className="flex items-center gap-1.5 text-xs font-condensed font-bold uppercase tracking-widest text-[#cfcaf5] mb-1">
                  <Compass className="w-3.5 h-3.5 text-[#f7f7ff]" strokeWidth={1.8} aria-hidden="true" />
                  <span>Featured Biotope Dossier</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl tracking-wide leading-tight text-[#f7f7ff] mb-1">
                  The Amazonian Discus Basin
                </h2>
                <p className="text-xs font-sans text-[#cfcaf5] line-clamp-2 leading-relaxed">
                  Symphysodon aequifasciatus living among gentle driftwoods, fine river sands, and submerged Amazon swords.
                </p>
              </div>
            </div>

            {/* Subtle floating accent pill below photo */}
            <div className="mt-4 w-full flex items-center justify-between text-xs text-[#27187e]/70 px-2 font-mono">
              <span className="flex items-center gap-1">
                <Fish className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden="true" />
                <span>Bio-Class: Cichlidae</span>
              </span>
              <span className="flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden="true" />
                <span>Care: Intermediate</span>
              </span>
            </div>

          </div>

        </div>

        {/* BOTTOM QUICK DISCOVERY STRIP: Fast-link badges across all major pillars */}
        <div className="w-full pt-8 border-t border-[#cfcaf5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs font-condensed font-bold uppercase tracking-widest text-[#27187e]/70">
            Direct Archives:
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/fish/freshwater"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#cfcaf5] hover:border-[#27187e] text-[#27187e] text-xs font-sans font-medium transition-all shadow-xs hover:scale-105"
            >
              <Fish className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={1.8} aria-hidden="true" />
              <span>Freshwater Species</span>
            </Link>

            <Link
              href="/fish/saltwater"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#cfcaf5] hover:border-[#27187e] text-[#27187e] text-xs font-sans font-medium transition-all shadow-xs hover:scale-105"
            >
              <Droplets className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={1.8} aria-hidden="true" />
              <span>Marine Reef Life</span>
            </Link>

            <Link
              href="/plants"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#cfcaf5] hover:border-[#27187e] text-[#27187e] text-xs font-sans font-medium transition-all shadow-xs hover:scale-105"
            >
              <Leaf className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={1.8} aria-hidden="true" />
              <span>Aquascaping Flora</span>
            </Link>

            <Link
              href="/equipment"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#cfcaf5] hover:border-[#27187e] text-[#27187e] text-xs font-sans font-medium transition-all shadow-xs hover:scale-105"
            >
              <Wrench className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={1.8} aria-hidden="true" />
              <span>Filtration &amp; Gear</span>
            </Link>

            <Link
              href="/water-analyzer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#cfcaf5] hover:border-[#27187e] text-[#27187e] text-xs font-sans font-medium transition-all shadow-xs hover:scale-105"
            >
              <FlaskConical className="w-3.5 h-3.5 text-[#27187e]" strokeWidth={1.8} aria-hidden="true" />
              <span>Water Chemistry</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
