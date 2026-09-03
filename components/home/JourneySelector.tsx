'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, Settings, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JourneySelector() {
  const journeys = [
    { 
      title: 'Start Fresh', 
      badge: 'BEGINNER PROTOCOL',
      description: 'Follow our step-by-step setup guides to cycle and stabilize your first tank with zero casualties.', 
      href: '/start-aquarium',
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      glowColor: 'from-cyan-500/20 to-transparent',
      borderColor: 'group-hover:border-cyan-400/50',
      tagColor: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
      actionText: 'Start Setup Guide'
    },
    { 
      title: 'Advanced Hardware', 
      badge: 'EQUIPMENT AUDIT',
      description: 'Browse biological canister filters, high-PAR LED lighting, heaters, and essential tank equipment.', 
      href: '/equipment',
      icon: <Settings className="w-5 h-5 text-rose-400" />,
      glowColor: 'from-rose-500/20 to-transparent',
      borderColor: 'group-hover:border-rose-400/50',
      tagColor: 'bg-rose-950/60 text-rose-300 border-rose-500/30',
      actionText: 'Explore Hardware'
    },
    { 
      title: 'Ecosystem Balance', 
      badge: 'COMPATIBILITY MATRIX',
      description: 'Check water parameters, pH, temperament, and companion compatibility to plan your community tank.', 
      href: '/compatibility',
      icon: <Compass className="w-5 h-5 text-teal-400" />,
      glowColor: 'from-teal-500/20 to-transparent',
      borderColor: 'group-hover:border-teal-400/50',
      tagColor: 'bg-teal-950/60 text-teal-300 border-teal-500/30',
      actionText: 'Planner Wizard'
    },
  ];

  return (
    <section className="py-24 bg-[#030812] text-white relative overflow-hidden">
      {/* Background ambient grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header with Studio Bar */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-10 bg-cyan-400" />
            <span className="text-[11px] font-mono tracking-widest text-cyan-400 font-bold uppercase">// CHOOSE YOUR PATHWAY</span>
            <span className="h-0.5 w-10 bg-rose-400" />
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-poppins font-extrabold tracking-tight text-white max-w-2xl">
            Structured Pathways For Every Aquarist.
          </h2>
          <p className="text-slate-400 font-light max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-sans">
            Whether you are adding your first neon tetra or configuring advanced high-tech aquascapes, we have structured guides for your journey.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {journeys.map((j, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className={`relative overflow-hidden group p-8 rounded-3xl bg-[#061224]/80 border border-cyan-500/20 hover:bg-[#081830] transition-all duration-500 shadow-xl ${j.borderColor} flex flex-col justify-between text-left h-full backdrop-blur-md`}
            >
              {/* Background Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${j.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <div>
                {/* Header Icon & Monospace Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex p-3 rounded-2xl border ${j.tagColor} items-center justify-center shadow-lg`}>
                    {j.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase bg-[#030913] px-3 py-1 rounded-full border border-cyan-500/15">
                    {j.badge}
                  </span>
                </div>
                
                <h3 className="text-2xl font-poppins font-extrabold mb-3 text-white group-hover:text-cyan-200 transition-colors">
                  {j.title}
                </h3>
                <p className="mb-8 text-slate-300 font-light text-sm leading-relaxed font-sans">
                  {j.description}
                </p>
              </div>

              <div>
                <Link
                  href={j.href}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-white font-bold text-xs tracking-wider uppercase transition-colors group cursor-pointer font-poppins"
                >
                  <span>{j.actionText}</span> 
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
