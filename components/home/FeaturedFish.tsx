'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fishData } from '@/data/fish';
import { useStats } from '@/components/home/StatsContext';

export default function FeaturedFish() {
  const { setFishCount } = useStats();

  useEffect(() => {
    if (typeof setFishCount === 'function') {
      setFishCount(fishData.length);
    }
  }, []);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-905 border-b border-slate-200/30 dark:border-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-poppins font-bold text-center mb-16 text-slate-900 dark:text-white font-poppins">Featured Species</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fishData.slice(0, 6).map((fish) => (
            <div key={fish.id} className="group rounded-xl overflow-hidden border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-slate-950 hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-350 flex flex-col hover:-translate-y-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              <div className="relative overflow-hidden h-44 w-full bg-slate-100 dark:bg-slate-900">
                <Image 
                  src={fish.image} 
                  alt={fish.name} 
                  fill
                  className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500" 
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="text-base sm:text-lg font-poppins font-bold mb-1.5 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{fish.name}</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mb-6 line-clamp-2 flex-grow leading-relaxed">{fish.description}</p>
                <Link 
                  href={`/fish/${fish.category?.toLowerCase() || 'unknown'}/${fish.slug}`} 
                  className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 font-semibold text-xs tracking-wider uppercase mt-auto group cursor-pointer"
                >
                  <span>Learn More</span> <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
