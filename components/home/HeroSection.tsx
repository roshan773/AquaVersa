'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Waves, Compass, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-32 sm:pt-36 pb-16 bg-[#0f0738] overflow-hidden text-left">
      {/* Background ambient Persian Indigo lighting */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#27187E]/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#3622a6]/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* LEFT: Bold Condensed Headline & Mission */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#27187E]/50 border border-[#4a34c9]/50 text-[#F7F7FF] text-xs font-condensed uppercase tracking-wider mb-6 shadow-sm">
              <Waves className="w-3.5 h-3.5 text-[#aca1f7]" />
              <span>Aquarium Education & Care Planning</span>
            </div>

            {/* Headline in Bebas Neue / Oswald */}
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-wide text-[#F7F7FF] leading-[0.92] mb-6">
              LEARN. PLAN. <br />
              BUILD. <span className="text-[#aca1f7]">CARE.</span>
            </h1>

            {/* Subtext in clean readable sans */}
            <p className="text-base sm:text-lg text-[#F7F7FF]/80 font-normal max-w-xl leading-relaxed mb-8 font-sans">
              A thoughtful aquarium resource built to help you make informed decisions about fish species, aquatic plants, filtration equipment, water chemistry, and long-term tank maintenance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold">
              <Link
                href="/fish"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#F7F7FF] hover:bg-white text-[#27187E] transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <span>Explore Fish Library</span>
                <Compass className="w-4 h-4 text-[#27187E]" />
              </Link>

              <Link
                href="/start-aquarium"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#27187E] border border-[#4a34c9] hover:border-[#F7F7FF] text-[#F7F7FF] hover:text-white transition-all shadow-md"
              >
                <span>First Aquarium Guide</span>
                <ArrowRight className="w-4 h-4 text-[#aca1f7]" />
              </Link>
            </div>

            {/* Feature Checkmarks */}
            <div className="mt-10 pt-6 border-t border-[#27187E]/80 w-full flex flex-wrap gap-y-2 gap-x-6 text-xs text-[#F7F7FF]/75 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#aca1f7]" />
                <span>Species Compatibility</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#aca1f7]" />
                <span>Nitrogen Cycle Science</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#aca1f7]" />
                <span>Equipment & Plant Matching</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Visual Card Preview with Persian Indigo & Ghost White */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-[#1c0e64] border border-[#3622a6] p-5 sm:p-6 shadow-2xl text-left space-y-4">
              
              {/* Card Top */}
              <div className="flex items-center justify-between border-b border-[#27187E] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#aca1f7] animate-pulse" />
                  <span className="text-xs font-condensed uppercase tracking-wider font-bold text-[#F7F7FF]">Community Ecosystem</span>
                </div>
                <span className="text-[10px] text-[#27187E] font-bold font-condensed uppercase tracking-wider bg-[#F7F7FF] px-2.5 py-0.5 rounded-md">
                  Beginner Friendly
                </span>
              </div>

              {/* Photo Frame */}
              <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-[#0d0630]">
                <Image
                  src="/images/neon_tetra.png"
                  alt="Neon Tetra schooling fish in a planted freshwater aquarium"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute bottom-3 left-3 bg-[#0d0630]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#27187E] text-xs">
                  <span className="font-condensed font-bold uppercase text-[#F7F7FF] block text-sm">Neon Tetra</span>
                  <span className="text-[10px] text-[#F7F7FF]/70 italic">Paracheirodon innesi</span>
                </div>
              </div>

              {/* Quick Parameters Readout */}
              <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                <div className="p-2.5 rounded-xl bg-[#27187E]/60 border border-[#3622a6]">
                  <span className="block text-[9px] uppercase font-condensed tracking-wider text-[#F7F7FF]/60">Min Tank</span>
                  <span className="text-xs font-bold text-[#F7F7FF]">10 Gallons</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#27187E]/60 border border-[#3622a6]">
                  <span className="block text-[9px] uppercase font-condensed tracking-wider text-[#F7F7FF]/60">Water pH</span>
                  <span className="text-xs font-bold text-[#aca1f7]">6.0 – 7.0</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#27187E]/60 border border-[#3622a6]">
                  <span className="block text-[9px] uppercase font-condensed tracking-wider text-[#F7F7FF]/60">Temperature</span>
                  <span className="text-xs font-bold text-[#F7F7FF]">70 – 78°F</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
