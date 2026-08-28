'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Settings, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export default function JourneySelector() {
  const journeys = [
    { 
      title: 'Start Fresh', 
      description: 'Follow our step-by-step setup guides to cycle and stabilize your first tank.', 
      href: '/start-aquarium',
      icon: <Sparkles className="w-5 h-5 text-emerald-450" />,
      glowColor: 'from-emerald-500/10 to-transparent',
      borderColor: 'group-hover:border-emerald-500/30',
      tagColor: 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20',
      actionText: 'Start Setup Guide'
    },
    { 
      title: 'Advanced Gear', 
      description: 'Browse biological filters, lighting systems, and essential tank equipment.', 
      href: '/equipment',
      icon: <Settings className="w-5 h-5 text-amber-500" />,
      glowColor: 'from-amber-500/10 to-transparent',
      borderColor: 'group-hover:border-amber-500/30',
      tagColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      actionText: 'Explore Hardware'
    },
    { 
      title: 'Ecosystem Balance', 
      description: 'Check parameters and companion compatibility to plan your community tank.', 
      href: '/compatibility',
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      glowColor: 'from-cyan-500/10 to-transparent',
      borderColor: 'group-hover:border-cyan-500/30',
      tagColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      actionText: 'Planner Wizard'
    },
  ];

  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold tracking-tight text-white mb-4">Choose Your Aquarium Pathway</h2>
          <p className="text-slate-400 font-light max-w-xl mx-auto text-sm leading-relaxed">
            Whether you are adding your first fish or configuring advanced CO2 systems, we have structured guides for your journey.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {journeys.map((j, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden group p-8 rounded-3xl bg-slate-950/40 border border-slate-900/80 hover:bg-slate-900/10 transition-all duration-300 shadow-sm hover:shadow-xl ${j.borderColor} flex flex-col justify-between text-left h-full`}
            >
              {/* Background Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${j.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <div>
                {/* Header Icon Block */}
                <div className={`inline-flex p-3 rounded-2xl bg-slate-950/80 border ${j.tagColor} items-center justify-center mb-6`}>
                  {j.icon}
                </div>
                
                <h3 className="text-2xl font-poppins font-bold mb-3 text-white">{j.title}</h3>
                <p className="mb-8 text-slate-400 font-light text-sm leading-relaxed font-sans">{j.description}</p>
              </div>

              <div>
                <Link
                  href={j.href}
                  className="inline-flex items-center gap-2 text-slate-200 hover:text-white font-bold text-xs tracking-wider uppercase transition-colors group cursor-pointer font-poppins"
                >
                  <span>{j.actionText}</span> 
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
