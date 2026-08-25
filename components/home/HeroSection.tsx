'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Waves } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] -mt-16 flex items-center justify-center bg-black overflow-hidden pt-36 pb-20 px-4">
      {/* Background Image */}
      <Image
        src="/betta_bg.png"
        alt="Lush planted aquarium with tropical fish"
        fill
        className="object-cover opacity-35 mix-blend-luminosity hover:scale-105 transition-transform duration-1000"
        priority
        sizes="100vw"
      />
      {/* Overlay & Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-955/20 backdrop-blur-md border border-blue-500/30 mb-8 animate-float text-blue-500 text-xs font-bold uppercase tracking-widest">
          <Waves className="w-4 h-4 text-blue-500" />
          <span>THE ULTIMATE AQUARIUM GUIDE</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-8xl font-poppins font-extrabold mb-6 max-w-5xl leading-[1.08] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-500">
          Build an Aquarium <br className="hidden md:block" /> That <span className="text-blue-500 text-glow-blue">Thrives.</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-xl text-slate-400 max-w-2xl mb-12 font-light leading-relaxed">
          Find the right fish, choose the right equipment, grow the right plants, and learn how to create a healthy aquarium.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/fish"
            className="px-10 py-4.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.45)] flex items-center justify-center gap-2 group transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Fish Library</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/start-aquarium"
            className="px-10 py-4.5 bg-black/40 hover:bg-black/85 backdrop-blur-md border border-white/10 hover:border-blue-500/40 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            Start Your Aquarium
          </Link>
        </div>
      </div>
    </section>
  );
}
