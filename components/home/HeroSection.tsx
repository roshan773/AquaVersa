'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Waves, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] -mt-16 flex items-center justify-center bg-black overflow-hidden pt-36 pb-20 px-4">
      {/* Background Image */}
      <Image
        src="/betta_bg.png"
        alt="Lush planted aquarium with tropical fish"
        fill
        className="object-cover opacity-25 mix-blend-luminosity scale-100 hover:scale-105 transition-transform duration-1000 pointer-events-none"
        priority
        sizes="100vw"
      />
      {/* Overlay & Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      <div className="absolute top-[25%] left-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[35%] right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center"
      >
        {/* Pill Tag */}
        <motion.div 
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/40 backdrop-blur-md border border-blue-500/25 mb-8 animate-float text-blue-400 text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>The Ultimate Aquarium Companion</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          variants={fadeInUp}
          className="text-5xl md:text-8xl font-poppins font-extrabold mb-6 max-w-5xl leading-[1.08] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400"
        >
          Build an Aquarium <br className="hidden md:block" /> That <span className="text-blue-500 text-glow-blue animate-pulse">Thrives.</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          variants={fadeInUp}
          className="text-base md:text-xl text-slate-400 max-w-2xl mb-12 font-light leading-relaxed font-sans"
        >
          Find compatible fish species, design gorgeous layouts, choose high-spec equipment, and learn how to cycle healthy water parameters.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto text-xs font-bold tracking-wider uppercase font-poppins"
        >
          <Link
            href="/fish"
            className="px-10 py-4.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:shadow-[0_0_40px_rgba(59,130,246,0.45)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Fish Library</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/start-aquarium"
            className="px-10 py-4.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            Start Setup Guide
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
