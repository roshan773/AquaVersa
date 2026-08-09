import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function JourneySelector() {
  const journeys = [
    { title: 'Start Fresh', description: 'Beginner guide to set up your first tank.', href: '/start-aquarium' },
    { title: 'Upgrade', description: 'Take your hobby to the next level with advanced setups.', href: '/upgrade' },
    { title: 'Marine Mastery', description: 'Dive into saltwater reefs and marine ecosystems.', href: '/marine' },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-cyan-900 to-indigo-800 text-white">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
        {journeys.map((j, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:shadow-xl transition-all"
          >
            <h3 className="text-2xl font-bold mb-3">{j.title}</h3>
            <p className="mb-4 text-white/80">{j.description}</p>
            <Link
              href={j.href}
              className="inline-flex items-center gap-2 text-cyan-300 font-medium"
            >
              Explore <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
