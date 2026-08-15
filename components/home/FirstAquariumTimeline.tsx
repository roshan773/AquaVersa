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
    <section className="py-24 bg-slate-950/10 dark:bg-slate-950/40 border-b border-slate-900/80">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold mb-4 border border-cyan-500/20">
            <Waves className="w-4 h-4" /> Setup Timeline
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-foreground">
            Your First Aquarium Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A step-by-step roadmap to establish a clean, biologically balanced, and thriving aquatic environment.
          </p>
        </div>

        {/* Horizontal scrollable timeline container on desktop */}
        <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 pb-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {steps.map((s, i) => {
            const stepNum = i + 1;
            const stepFormatted = stepNum < 10 ? `0${stepNum}` : `${stepNum}`;
            return (
              <div 
                key={i} 
                className="flex-1 min-w-[240px] md:min-w-[260px] relative overflow-hidden group p-6 rounded-2xl bg-slate-900/40 dark:bg-slate-950/20 border border-slate-850 hover:bg-slate-900/70 transition-all duration-500 hover:border-cyan-500/30 transform hover:-translate-y-1 shadow-sm flex flex-col justify-between"
              >
                {/* Background watermarked step number */}
                <span className="absolute right-4 bottom-2 text-7xl font-extrabold text-slate-800/10 group-hover:text-cyan-500/5 select-none transition-colors duration-500 font-mono">
                  {stepFormatted}
                </span>

                <div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-sm font-bold text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-500">
                    {stepFormatted}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-cyan-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-full transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
          >
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
