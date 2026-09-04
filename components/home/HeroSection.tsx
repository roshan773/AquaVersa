'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Waves, Compass, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-32 sm:pt-36 pb-16 bg-[#030712] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-teal-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-[450px] h-[450px] bg-blue-950/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* LEFT: Headline & Story */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-teal-300 text-xs font-medium mb-6">
              <Waves className="w-3.5 h-3.5 text-teal-400" />
              <span>Aquarium Education & Care Planning</span>
            </div>

            {/* Headline */}
            <h1 className="font-poppins text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Learn. Plan. <br className="hidden sm:block" />
              Build. <span className="text-teal-400">Care.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed mb-8">
              A thoughtful aquarium resource built to help you make informed decisions about fish species, aquatic plants, filtration equipment, water chemistry, and long-term tank maintenance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-poppins text-xs sm:text-sm font-semibold">
              <Link
                href="/fish"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white transition-colors shadow-sm"
              >
                <span>Explore Fish Library</span>
                <Compass className="w-4 h-4" />
              </Link>

              <Link
                href="/start-aquarium"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white transition-colors"
              >
                <span>First Aquarium Guide</span>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </Link>
            </div>

            {/* Practical feature tags */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 w-full flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Species Compatibility</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Nitrogen Cycle Science</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Equipment & Plant Matching</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Visual Ecosystem Preview Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-[#061224] border border-slate-800 p-5 sm:p-6 shadow-xl text-left space-y-4">
              
              {/* Card Top */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span className="text-xs font-semibold text-white">Community Aquarium Focus</span>
                </div>
                <span className="text-[11px] text-teal-400 font-medium bg-teal-950/60 px-2.5 py-0.5 rounded-md border border-teal-800/30">
                  Beginner Friendly
                </span>
              </div>

              {/* Photo Frame */}
              <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-slate-950">
                <Image
                  src="/images/neon_tetra.png"
                  alt="Neon Tetra schooling fish in a planted freshwater aquarium"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute bottom-3 left-3 bg-[#030712]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
                  <span className="font-semibold text-white block">Neon Tetra</span>
                  <span className="text-[10px] text-slate-400 italic">Paracheirodon innesi</span>
                </div>
              </div>

              {/* Quick Parameters Readout */}
              <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="block text-[10px] uppercase font-medium text-slate-500">Min Tank</span>
                  <span className="text-xs font-bold text-white">10 Gallons</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="block text-[10px] uppercase font-medium text-slate-500">Water pH</span>
                  <span className="text-xs font-bold text-teal-300">6.0 – 7.0</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="block text-[10px] uppercase font-medium text-slate-500">Temperature</span>
                  <span className="text-xs font-bold text-white">70 – 78°F</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
