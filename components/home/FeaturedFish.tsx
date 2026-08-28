'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { fishData } from '@/data/fish';
import { useStats } from '@/components/home/StatsContext';
import { motion } from 'framer-motion';

export default function FeaturedFish() {
  const { setFishCount } = useStats();

  useEffect(() => {
    if (typeof setFishCount === 'function') {
      setFishCount(fishData.length);
    }
  }, []);

  return (
    <section className="py-24 bg-black relative overflow-hidden border-b border-slate-900">
      {/* Light glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.02),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-cyan-955/25 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md mb-4 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Discover Species</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-white tracking-tight">Featured Species</h2>
          <p className="text-slate-400 font-light text-sm max-w-md mt-3 leading-relaxed">
            Get comprehensive parameters, stocking guidelines, and care tutorials for popular community fish.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fishData.slice(0, 6).map((fish, i) => {
            const isFreshwater = fish.category?.toLowerCase() === "freshwater";
            const badgeColor = 
              fish.difficulty === "Beginner" ? "bg-emerald-500/10 text-emerald-450 border-emerald-500/20" :
              fish.difficulty === "Advanced Beginner" ? "bg-teal-500/10 text-teal-400 border-teal-500/20" :
              fish.difficulty === "Intermediate" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
              "bg-amber-500/10 text-amber-500 border-amber-500/20";
            
            return (
              <motion.div 
                key={fish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="group rounded-3xl overflow-hidden border border-slate-900 bg-slate-950/40 hover:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 text-left"
              >
                {/* Card Image */}
                <div className="relative overflow-hidden h-52 w-full bg-slate-950">
                  <Image 
                    src={fish.image} 
                    alt={`${fish.name} (${fish.scientificName || 'Tropical Species'})`} 
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-90" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-slate-950/70 border border-slate-800 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                    {fish.category}
                  </div>

                  {/* Difficulty Tag */}
                  <div className={`absolute top-4 right-4 border backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase ${badgeColor}`}>
                    {fish.difficulty}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-1 text-white group-hover:text-blue-500 transition-colors line-clamp-1">
                    {fish.name}
                  </h3>
                  <p className="text-xs text-slate-500 italic mb-4 font-light">{fish.scientificName}</p>
                  
                  <p className="text-sm text-slate-400 font-light mb-6 line-clamp-2 flex-grow leading-relaxed font-sans">
                    {fish.description}
                  </p>
                  
                  <Link 
                    href={`/fish/${fish.category?.toLowerCase() || 'unknown'}/${fish.slug}`} 
                    className="inline-flex items-center gap-2 text-slate-200 hover:text-white font-bold text-xs tracking-wider uppercase mt-auto group cursor-pointer font-poppins"
                  >
                    <span>View Care Guide</span> 
                    <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform text-blue-500" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
