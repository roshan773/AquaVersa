'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  Sparkles,
  Droplets,
  Thermometer,
  ShieldCheck,
  Fish,
  Layers,
} from 'lucide-react';

export default function AtlasHero() {
  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 bg-[#f7f7ff] text-[#27187e] overflow-hidden text-left">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Indigo Ambient Glows */}
        <div className="absolute -top-24 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#cfcaf5]/40 to-[#edeafc]/20 blur-[130px] -z-10" />
        <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#edeafc]/60 to-[#cfcaf5]/30 blur-[120px] -z-10" />
        
        {/* Subtle Decorative Geometric Grid / Latitude Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27187e08_1px,transparent_1px),linear-gradient(to_bottom,#27187e08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-70" />
      </div>

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: Eyebrow, Headline, Description, Buttons, Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            
            {/* Live Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#cfcaf5] shadow-xs mb-6 group hover:border-[#27187e] transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#27187e] animate-ping" />
              <span className="text-[11px] sm:text-xs font-condensed font-bold uppercase tracking-[0.22em] text-[#27187e]">
                ROSHAN AQUVA WORLD
              </span>
              <span className="text-[10px] font-mono text-[#27187e]/60 pl-1 border-l border-[#cfcaf5]">
                THE AQUARIUM ATLAS
              </span>
            </div>

            {/* High-Impact Editorial Headline */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.8rem] font-normal tracking-wide text-[#27187e] leading-[0.93] mb-6">
              Know your fish.{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#27187e] via-[#3b28ab] to-[#27187e]">
                Understand your
              </span>{' '}
              aquarium.
            </h1>

            {/* Sub-headline / Description */}
            <p className="text-base sm:text-lg md:text-xl text-[#27187e]/85 font-normal max-w-lg leading-relaxed mb-8 font-sans">
              Practical aquarium knowledge for choosing fish, understanding their needs, planning tanks and caring for aquatic life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-condensed uppercase tracking-wider font-bold mb-10 w-full sm:w-auto">
              <Link
                href="/fish"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-sm group cursor-pointer"
              >
                <span>Explore Fish</span>
                <ArrowRight className="w-4 h-4 text-[#f7f7ff] group-hover:translate-x-1 transition-transform" strokeWidth={2.2} aria-hidden="true" />
              </Link>

              <Link
                href="/start-aquarium"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] hover:bg-[#edeafc] text-[#27187e] transition-all shadow-xs hover:-translate-y-0.5 active:translate-y-0 text-sm cursor-pointer"
              >
                <span>Start with the Basics</span>
              </Link>
            </div>

            {/* Quick Atlas Verification Badges */}
            <div className="pt-6 border-t border-[#cfcaf5]/80 grid grid-cols-3 gap-4 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl text-[#27187e] leading-none">
                  120+
                </span>
                <span className="text-[11px] font-sans font-medium text-[#27187e]/70 mt-1">
                  Species Dossiers
                </span>
              </div>
              <div className="flex flex-col border-l border-[#cfcaf5] pl-4">
                <span className="font-display text-2xl sm:text-3xl text-[#27187e] leading-none">
                  100%
                </span>
                <span className="text-[11px] font-sans font-medium text-[#27187e]/70 mt-1">
                  Free &amp; Open Atlas
                </span>
              </div>
              <div className="flex flex-col border-l border-[#cfcaf5] pl-4">
                <span className="font-display text-2xl sm:text-3xl text-[#27187e] leading-none">
                  6+
                </span>
                <span className="text-[11px] font-sans font-medium text-[#27187e]/70 mt-1">
                  Smart Tools
                </span>
              </div>
            </div>

          </motion.div>

          {/* RIGHT: High-End Layered Biotope Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Outer Glow Backing Container */}
            <div className="relative w-full max-w-xl group">
              
              {/* Background Accent Frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#27187e]/20 via-[#cfcaf5]/40 to-[#27187e]/20 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main Image Frame */}
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[#cfcaf5] bg-[#edeafc]">
                <Image
                  src="/images/hero_discus.jpg"
                  alt="Natural planted freshwater aquarium with blue Discus fish"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-width: 768px) 100vw, 650px"
                />

                {/* Rich Multilayer Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12093d]/85 via-[#27187e]/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#12093d]/40 via-transparent to-transparent pointer-events-none" />

                {/* TOP FLOATING BIOTOPE BADGE */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12093d]/80 backdrop-blur-md border border-[#cfcaf5]/30 text-[#f7f7ff] shadow-lg">
                    <Compass className="w-3.5 h-3.5 text-[#cfcaf5]" />
                    <span className="text-xs font-condensed font-bold uppercase tracking-wider">
                      Amazonian Biotope
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#12093d]/80 backdrop-blur-md border border-[#cfcaf5]/30 text-[#f7f7ff] shadow-lg text-[11px] font-mono">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                    <span>28°–30°C</span>
                  </div>
                </div>

                {/* BOTTOM FLOATING GLASS CARD */}
                <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-[#12093d]/85 backdrop-blur-md border border-[#cfcaf5]/30 text-left text-[#f7f7ff] shadow-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-2xl sm:text-3xl tracking-wider text-[#ffffff] leading-none">
                      THE NATURAL HABITAT
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#27187e] border border-[#cfcaf5]/30 text-[10px] font-mono text-[#cfcaf5] uppercase">
                      pH 6.0 - 7.0
                    </span>
                  </div>

                  <p className="text-xs font-sans text-[#cfcaf5] font-medium mb-3">
                    Symphysodon aequifasciatus — Planted Amazonian Biotopes
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#cfcaf5]/20 text-[11px] font-sans">
                    <span className="inline-flex items-center gap-1 text-[#f7f7ff]/90">
                      <Droplets className="w-3 h-3 text-cyan-400" />
                      <span>Soft Water (1–5 dGH)</span>
                    </span>
                    <span className="text-[#cfcaf5]/40">•</span>
                    <span className="inline-flex items-center gap-1 text-[#f7f7ff]/90">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Planted Setup</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* FLOATING STAT PILL ACCENT */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="hidden sm:flex absolute -left-6 top-1/3 -translate-y-1/2 p-3.5 rounded-2xl bg-[#ffffff] border-2 border-[#27187e] shadow-xl items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#edeafc] text-[#27187e] flex items-center justify-center">
                  <Fish className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display text-base text-[#27187e] leading-tight">
                    Blue Diamond Discus
                  </span>
                  <span className="text-[10px] font-sans font-semibold text-[#27187e]/70 uppercase tracking-wider">
                    Featured Profile
                  </span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

