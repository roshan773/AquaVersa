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
    <section className="py-24 bg-black relative overflow-hidden border-b border-blue-500/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.02),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-poppins font-bold text-center mb-16 text-white">Featured Fish</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fishData.slice(0, 6).map((fish) => (
            <div key={fish.id} className="group rounded-2xl overflow-hidden border border-blue-500/10 bg-black/40 hover:border-blue-500/35 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] transition-all duration-300 flex flex-col hover:-translate-y-1">
              <div className="relative overflow-hidden h-48 w-full bg-black">
                <Image 
                  src={fish.image} 
                  alt={fish.name} 
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-80" 
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-500 transition-colors">{fish.name}</h3>
                <p className="text-sm text-slate-400 font-light mb-6 line-clamp-2 flex-grow leading-relaxed">{fish.description}</p>
                <Link 
                  href={`/fish/${fish.category?.toLowerCase() || 'unknown'}/${fish.slug}`} 
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold text-xs tracking-wider uppercase mt-auto group cursor-pointer"
                >
                  <span>Learn More</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
