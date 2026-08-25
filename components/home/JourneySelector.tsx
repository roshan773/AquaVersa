import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function JourneySelector() {
  const journeys = [
    { title: 'Start Fresh', description: 'Beginner guide to set up your first tank step by step.', href: '/start-aquarium' },
    { title: 'Advanced Gear', description: 'Take your hobby to the next level with essential aquarium hardware.', href: '/equipment' },
    { title: 'Ecosystem Balance', description: 'Ensure your fish and plants peacefully co-exist.', href: '/compatibility' },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-b border-slate-200/30 dark:border-slate-900">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 relative z-10 max-w-7xl">
        {journeys.map((j, i) => (
          <div
            key={i}
            className="p-8 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 text-left"
          >
            <h3 className="text-xl font-poppins font-bold mb-3 text-slate-900 dark:text-white">{j.title}</h3>
            <p className="mb-6 text-slate-500 dark:text-slate-450 font-light text-sm leading-relaxed">{j.description}</p>
            <Link
              href={j.href}
              className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 font-semibold text-xs tracking-wider uppercase transition-colors group cursor-pointer"
            >
              <span>Explore</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
