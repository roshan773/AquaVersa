'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Thermometer, Droplet, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-slate-50 dark:bg-slate-955 pt-20 pb-20 lg:py-28 overflow-hidden border-b border-slate-200/40 dark:border-slate-900">
      {/* Soft background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-poppins text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              A smarter way to understand aquariums
            </span>
            
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
              Build an aquarium <br />
              that <span className="text-cyan-500">thrives.</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8 max-w-lg">
              AquaVersa simplifies aquatic science. Plan compatible species, balance water chemistry, configure equipment specs, and build healthy ecosystems with modern interactive planners.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/fish"
                className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm hover:shadow"
              >
                <span>Explore Species Database</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
              </Link>
              <Link
                href="/start-aquarium"
                className="px-8 py-3.5 bg-slate-200/60 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-xl transition-all flex items-center justify-center cursor-pointer"
              >
                Start Setup Guide
              </Link>
            </div>
          </div>

          {/* Right Asymmetric Image Showcase */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900 p-2.5">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950">
                <Image
                  src="/betta_bg.png"
                  alt="Minimalist aquarium showcase with tropical fish"
                  fill
                  className="object-cover opacity-95 group-hover:scale-102 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
              
              {/* Asymmetric Metadata Floating Label */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-800 rounded-xl p-3 shadow-md flex items-center gap-4 z-20 animate-float max-w-[240px]">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-600">
                  <ShieldCheck className="w-5 h-5 text-cyan-500" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">Active Planner</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">Stocking Safety: 98%</span>
                </div>
              </div>

              {/* Second Floating Parameter Overlay */}
              <div className="absolute top-6 -right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-800 rounded-xl p-3 shadow-md flex flex-col gap-2 z-20 max-w-[150px]">
                <div className="flex items-center gap-2 text-left">
                  <Thermometer className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">76°F - 80°F</span>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <Droplet className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">6.8 - 7.4 pH</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
