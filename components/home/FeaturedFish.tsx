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
            <div key={fish.id} className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all">
              <Image src={fish.image} alt={fish.name} width={400} height={300} className="object-cover w-full h-48" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-foreground">{fish.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{fish.description}</p>
                <Link href={`/fish/${fish.slug}`} className="inline-flex items-center gap-2 text-cyan-600 font-medium">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
