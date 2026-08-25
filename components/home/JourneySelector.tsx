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
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.03),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 relative z-10 max-w-6xl">
        {journeys.map((j, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-black border border-red-500/10 hover:border-red-500/35 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] transform hover:-translate-y-1 text-left"
          >
            <h3 className="text-2xl font-poppins font-bold mb-3 text-white">{j.title}</h3>
            <p className="mb-6 text-slate-400 font-light text-sm leading-relaxed">{j.description}</p>
            <Link
              href={j.href}
              className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-bold text-sm tracking-wider uppercase transition-colors group cursor-pointer"
            >
              <span>Explore</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
