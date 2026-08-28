"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, Compass, Leaf, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-black text-slate-100 flex items-center justify-center py-16 px-4 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-955/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center gap-8">
        
        {/* Animated illustration container */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-64 h-64 md:w-80 md:h-80 shrink-0"
        >
          <Image
            src="/images/empty_aquarium.png"
            alt="Stylized illustration of a glowing blue tropical fish swimming inside an empty glass bowl"
            fill
            className="object-contain animate-float"
            priority
            sizes="(max-width: 768px) 256px, 320px"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 max-w-xl"
        >
          <h1 className="text-3xl md:text-5xl font-poppins font-extrabold tracking-tight text-white leading-tight">
            Looks Like This Aquarium Is Empty.
          </h1>
          <p className="text-base text-slate-400 leading-relaxed font-light">
            The page you're looking for couldn't be found. Let's get you back to exploring the underwater world.
          </p>
        </motion.div>

        {/* Buttons Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center pt-2 text-xs font-bold tracking-wider uppercase font-poppins"
        >
          <Link
            href="/"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4.5 h-4.5" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/fish"
            className="px-6 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4.5 h-4.5" />
            <span>Explore Fish</span>
          </Link>

          <Link
            href="/plants"
            className="px-6 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Leaf className="w-4.5 h-4.5 shrink-0" />
            <span>Explore Plants</span>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
