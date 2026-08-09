'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useStats } from '@/components/home/StatsContext';
import { ArrowRight, Waves } from 'lucide-react';

export default function HeroSection() {
  const { fish, plants, equipment } = useStats();
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#071A2B] to-[#0B3B5A]">
      {/* Background Image */}
      <Image
        src="/hero_aquarium.jpg"
        alt="Lush planted aquarium with tropical fish"
        fill
        className="object-cover opacity-70"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center text-white">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
          <Waves className="w-4 h-4 text-cyan-300" />
          <span className="text-sm font-medium tracking-wide">THE ULTIMATE AQUARIUM GUIDE</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-poppins font-bold mb-6 max-w-4xl leading-tight">
          Build an Aquarium That <span className="text-[#00B8D9]">Thrives.</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-10">
          Find the right fish, choose the right equipment, grow the right plants, and learn how to create a healthy aquarium.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/fish"
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-full transition-all flex items-center justify-center gap-2 group"
          >
            Explore Fish
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/start-aquarium"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full transition-all flex items-center justify-center"
          >
            Start Your Aquarium
          </Link>
        </div>
        {/* Trust stats */}
        <div className="mt-12 flex gap-8 text-sm text-white/80">
          <span>{fish}+ Fish Guides</span>
          <span>{plants}+ Plants</span>
          <span>{equipment}+ Equipment Guides</span>
          <span>Beginner Friendly</span>
        </div>
      </div>
    </section>
  );
}
