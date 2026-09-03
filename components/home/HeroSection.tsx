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
    <section className="relative min-h-[95vh] -mt-16 flex items-center justify-center bg-[#030812] overflow-hidden pt-36 pb-20 px-4">
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#030812] via-[#030812]/50 to-[#030812]/80" />
      <div className="absolute top-[25%] left-1/3 w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute top-[35%] right-1/4 w-[450px] h-[450px] bg-rose-500/12 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center"
      >
        {/* Pill Tag */}
        <motion.div 
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-955/60 backdrop-blur-md border border-cyan-500/30 mb-8 animate-float text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/10"
        >
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>The Ultimate Aquarium Companion</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          variants={fadeInUp}
          className="text-5xl md:text-8xl font-poppins font-extrabold mb-6 max-w-5xl leading-[1.08] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300"
        >
          Build an Aquarium <br className="hidden md:block" /> That <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-rose-500 text-glow-coral">Thrives.</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          variants={fadeInUp}
          className="text-base md:text-xl text-slate-300 max-w-2xl mb-12 font-light leading-relaxed font-sans"
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
            className="px-10 py-4.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Fish Library</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/start-aquarium"
            className="px-10 py-4.5 bg-slate-900/80 border border-slate-700/70 hover:border-cyan-500/50 hover:bg-slate-850 text-slate-200 hover:text-white rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer backdrop-blur-sm"
          >
            Start Setup Guide
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
