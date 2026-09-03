'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Waves, Sparkles, Activity, ShieldCheck, Droplets, Terminal, Cpu, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-32 sm:pt-40 pb-16 bg-gradient-to-b from-[#030812] via-[#050e1d] to-[#030812] overflow-hidden">
      {/* Background ambient lighting and tech grid */}
      <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />
      <div className="absolute top-[20%] left-1/4 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[30%] right-1/4 w-[500px] h-[500px] bg-rose-500/12 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Subtle Stream labels in corners */}
      <div className="absolute top-28 left-8 font-mono text-[10px] text-cyan-500/30 tracking-widest hidden lg:block pointer-events-none">
        <div>STREAM // 0x4151 0x5541 0x5641 0x2026</div>
        <div className="text-rose-400/40">ECOSYSTEM // BIO_STABLE</div>
      </div>
      <div className="absolute top-28 right-8 font-mono text-[10px] text-cyan-500/30 tracking-widest text-right hidden lg:block pointer-events-none">
        <div>TELEMETRY // LIVE</div>
        <div className="text-cyan-400/40">CHEMISTRY // 7.2_PH</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Punchy Editorial Studio Layout */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Pill Tag */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#071324] border border-cyan-500/30 text-cyan-300 text-[11px] font-mono tracking-widest uppercase mb-6 shadow-xl backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>AQUATIC SCIENCE • LIVING ECOSYSTEMS • SPECIES CARE</span>
            </motion.div>

            {/* Giant Display Headlines */}
            <motion.h1 
              variants={fadeInUp}
              className="font-poppins text-6xl sm:text-7xl md:text-8xl xl:text-[9rem] font-extrabold uppercase tracking-tight text-white leading-[0.88] mb-8"
            >
              <span className="block hover:translate-x-2 transition-transform duration-300">
                EXPLORE<span className="text-cyan-400">.</span>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 hover:translate-x-2 transition-transform duration-300">
                CARE<span className="text-rose-400">.</span>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-rose-500 text-glow-coral hover:translate-x-2 transition-transform duration-300">
                THRIVE<span className="text-cyan-400">.</span>
              </span>
            </motion.h1>

            {/* Description Quote */}
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-xl leading-relaxed mb-10 border-l-2 border-cyan-500/40 pl-5 font-sans"
            >
              We decode aquarium biology, calculate community compatibility, and engineer step-by-step guides so hobbyists can build thriving aquatic ecosystems with zero guesswork.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 sm:gap-6 font-poppins"
            >
              <Link
                href="/fish"
                className="relative inline-flex items-center justify-center font-bold uppercase tracking-wider text-xs sm:text-sm px-8 py-4 rounded-full transition-all duration-300 group overflow-hidden cursor-pointer bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Explore Fish Library</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>

              <Link
                href="/start-aquarium"
                className="relative inline-flex items-center justify-center font-bold uppercase tracking-wider text-xs sm:text-sm px-8 py-4 rounded-full transition-all duration-300 group overflow-hidden cursor-pointer bg-[#091526]/80 text-slate-200 border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#0c1c33] backdrop-blur-md hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <span>Start Setup Guide</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* Telemetry Metrics Strip */}
            <motion.div 
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-cyan-500/15 w-full grid grid-cols-3 gap-6"
            >
              <div>
                <div className="font-poppins text-3xl sm:text-4xl font-extrabold text-white">30+</div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-400 tracking-wider mt-1">Species Profiles</div>
              </div>
              <div>
                <div className="font-poppins text-3xl sm:text-4xl font-extrabold text-cyan-300">100%</div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-400 tracking-wider mt-1">Verified Parameters</div>
              </div>
              <div>
                <div className="font-poppins text-3xl sm:text-4xl font-extrabold text-rose-400">0 Loss</div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-400 tracking-wider mt-1">Compatibility Goal</div>
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: Interactive High-Tech Telemetry HUD Orb Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-md rounded-3xl bg-[#061224]/80 border border-cyan-500/25 p-7 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-cyan-400/40 transition-all duration-500">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-cyan-500/15 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs text-white uppercase font-bold tracking-wider">AQUA_OS // V3.2</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 uppercase bg-[#030a14] px-3 py-1 rounded-full border border-cyan-500/20 font-bold">
                  ACTIVE ECOSYSTEM
                </span>
              </div>

              {/* Center Orbiting Ring Orb */}
              <div className="relative my-auto py-6 sm:py-8 flex flex-col items-center justify-center">
                <div className="absolute w-60 h-60 rounded-full border border-cyan-500/20 animate-[spin_24s_linear_infinite]" />
                <div className="absolute w-48 h-48 rounded-full border border-rose-400/30 border-dashed animate-[spin_14s_linear_infinite_reverse]" />
                <div className="absolute w-36 h-36 rounded-full bg-cyan-500/10 border border-cyan-400/30 animate-pulse" />
                
                {/* Central Hologram Core */}
                <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-rose-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-500 p-2">
                  <Waves className="w-12 h-12 text-slate-950 animate-pulse" />
                </div>

                {/* Floating Telemetry Badges */}
                <div className="absolute -top-1 left-2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#030913] border border-cyan-500/30 text-[10px] sm:text-[11px] font-mono text-cyan-300 shadow-xl">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span>ZERO-MISTAKE: ENABLED</span>
                </div>

                <div className="absolute -bottom-1 right-1 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#030913] border border-cyan-500/30 text-[10px] sm:text-[11px] font-mono text-white shadow-xl">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>NITROGEN_CYCLE: STABLE</span>
                </div>
              </div>

              {/* Terminal Readout Box */}
              <div className="bg-[#030812] p-4 rounded-2xl border border-cyan-500/20 font-mono text-[11px] text-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Terminal className="w-4 h-4 text-rose-400" />
                  <span>&gt; ecosystem.diagnose('WATER_CHEMISTRY')</span>
                </div>
                <div className="text-slate-400 pl-6 text-[10px] leading-tight font-mono">
                  [STATUS: 200 CYCLED] 0 ppm NH3 • 0 ppm NO2 • 7.2 pH • 78°F
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
