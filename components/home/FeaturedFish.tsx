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
    // Initialize fish count based on featured fish displayed
    if (typeof setFishCount === 'function') {
      setFishCount(fishData.length);
    }
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Featured Fish</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {fishData.slice(0, 6).map((fish) => (
            <div key={fish.id} className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all flex flex-col">
              <div className="relative overflow-hidden h-48 w-full bg-muted">
                <Image 
                  src={fish.image} 
                  alt={fish.name} 
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-cyan-600 transition-colors">{fish.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{fish.description}</p>
                <Link 
                  href={`/fish/${fish.category?.toLowerCase() || 'unknown'}/${fish.slug}`} 
                  className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium mt-auto group-hover:text-cyan-500"
                >
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
