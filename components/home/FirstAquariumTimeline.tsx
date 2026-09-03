'use client';
import React from 'react';
import { ArrowUpRight, Waves, Sparkles } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { title: 'Choose Tank Dimensions', tag: 'VOLUME_CALC', description: 'Select aquarium footprint, gallon volume, and placement location.' },
  { title: 'Condition Source Water', tag: 'CHEMISTRY_PREP', description: 'Dechlorinate tap water, establish target pH, and calibrate salinity if reef.' },
  { title: 'Substrate & Aquascape', tag: 'HARDSCAPE_LAYER', description: 'Layer active aqua-soil, cosmetic sand, driftwood, and low-light flora.' },
  { title: 'Deploy Filtration Hardware', tag: 'GEAR_INSTALL', description: 'Install biological filter media, titanium heater, and spectrum lighting.' },
  { title: 'Cycle Beneficial Bacteria', tag: 'NITROGEN_CYCLE', description: 'Dose beneficial nitrifying bacteria until ammonia & nitrites hit zero.' },
  { title: 'Gradual Species Stocking', tag: 'BIOLOAD_MANAGE', description: 'Acclimatize community fish slowly to prevent bioload spikes.' },
  { title: 'Routine Science Care', tag: 'MAINTENANCE_LOOP', description: 'Execute weekly water tests and 20% water changes for longevity.' },
];

export default function FirstAquariumTimeline() {
  return (
    <section className="py-24 bg-[#020610] border-b border-cyan-500/15 relative overflow-hidden">
      {/* Ambient Grid & Glows */}
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Studio Section Title */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#061224] border border-cyan-500/30 text-cyan-300 font-mono text-[11px] uppercase tracking-widest font-bold mb-2">
            <Waves className="w-3.5 h-3.5 text-rose-400" />
            <span>SETUP TIMELINE // ZERO-CASUALTY ROADMAP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-poppins font-extrabold tracking-tight text-white">
            Your First Aquarium Journey.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed font-sans">
            A precise, scientific blueprint to establish a clean, biologically balanced, and thriving underwater environment.
          </p>
        </div>

        {/* Studio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const stepNum = i + 1;
            const stepFormatted = stepNum < 10 ? `0${stepNum}` : `${stepNum}`;
            return (
              <div 
                key={i} 
                className="relative overflow-hidden group p-6 rounded-3xl bg-[#061224]/75 border border-cyan-500/15 hover:bg-[#081830] transition-all duration-500 hover:border-cyan-400/40 transform hover:-translate-y-1 shadow-xl flex flex-col justify-between min-h-[210px] text-left backdrop-blur-md"
              >
                {/* Background watermarked step number */}
                <span className="absolute right-3 bottom-1 text-7xl font-extrabold text-cyan-500/5 group-hover:text-cyan-400/10 select-none transition-colors duration-500 font-mono">
                  {stepFormatted}
                </span>

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-9 h-9 rounded-xl bg-[#030913] border border-cyan-500/30 flex items-center justify-center text-xs font-mono font-extrabold text-cyan-300 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-rose-400 group-hover:text-slate-950 transition-all duration-300 shadow-md">
                      {stepFormatted}
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase bg-[#020610] px-2 py-0.5 rounded border border-cyan-500/10">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-poppins font-bold mb-2 text-white group-hover:text-cyan-200 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed font-sans">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered CTA */}
        <div className="mt-14 text-center">
          <Link 
            href="/start-aquarium"
            className="relative inline-flex items-center justify-center font-poppins tracking-wider font-bold uppercase text-xs px-8 py-4 rounded-full transition-all duration-300 group overflow-hidden cursor-pointer bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Launch Complete Setup Guide</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
