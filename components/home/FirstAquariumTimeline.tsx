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
    <section className="py-24 bg-[#030303] border-b border-red-500/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.02),transparent_60%)] pointer-events-none" />
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 font-bold mb-4 border border-red-500/20 text-xs uppercase tracking-wider">
            <Waves className="w-4 h-4" /> Setup Timeline
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-white">
            Your First Aquarium Journey
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
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
                className="relative overflow-hidden group p-6 rounded-2xl bg-black border border-red-500/10 hover:bg-black/60 transition-all duration-500 hover:border-red-500/35 transform hover:-translate-y-1 shadow-sm flex flex-col justify-between min-h-[190px]"
              >
                {/* Background watermarked step number */}
                <span className="absolute right-4 bottom-2 text-7xl font-extrabold text-slate-800/5 group-hover:text-red-500/5 select-none transition-colors duration-500 font-mono">
                  {stepFormatted}
                </span>

                <div>
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-sm font-extrabold text-red-500 mb-6 group-hover:bg-red-500 group-hover:text-black transition-all duration-500">
                    {stepFormatted}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-red-500 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
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
            className="px-10 py-4.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-red-500/15 cursor-pointer"
          >
            <span>Start Your Journey</span> <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
