'use client';
import React from 'react';
import { ArrowRight, Waves } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { title: 'Choose Tank', description: 'Select size and type suitable for your fish.' },
  { title: 'Prepare Water', description: 'Treat tap water and set parameters.' },
  { title: 'Substrate & Plants', description: 'Add soil, sand and plant life.' },
  { title: 'Equipment', description: 'Install filter, heater and lighting.' },
  { title: 'Cycle Tank', description: 'Establish beneficial bacteria.' },
  { title: 'Add Fish', description: 'Introduce compatible species gradually.' },
  { title: 'Maintain', description: 'Regular water changes and care.' },
];

export default function FirstAquariumTimeline() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200/30 dark:border-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-poppins font-semibold mb-4 border border-cyan-500/25 text-xs uppercase tracking-wider">
            <Waves className="w-3.5 h-3.5" /> Setup Timeline
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-slate-900 dark:text-white">
            Your First Aquarium Journey
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-450 max-w-2xl mx-auto font-light leading-relaxed">
            A step-by-step roadmap to establish a clean, biologically balanced, and thriving aquatic environment.
          </p>
        </div>

        {/* Responsive Grid layout (stacked on mobile, 2/3/4 cols on larger devices) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const stepNum = i + 1;
            const stepFormatted = stepNum < 10 ? `0${stepNum}` : `${stepNum}`;
            return (
              <div 
                key={i} 
                className="relative overflow-hidden group p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:border-slate-350 dark:hover:border-slate-700 flex flex-col justify-between min-h-[190px] text-left"
              >
                {/* Background watermarked step number */}
                <span className="absolute right-4 bottom-2 text-7xl font-extrabold text-slate-200/40 dark:text-slate-800/10 group-hover:text-cyan-500/5 select-none transition-colors duration-300 font-mono">
                  {stepFormatted}
                </span>

                <div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                    {stepFormatted}
                  </div>
                  <h3 className="text-base sm:text-lg font-poppins font-bold mb-2 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-450 font-light leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/start-aquarium" 
            className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Start Your Journey</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
