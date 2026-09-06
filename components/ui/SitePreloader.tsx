'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandMark } from '@/components/ui/BrandLogo';
import { siteConfig } from '@/config/site';

const facts = [
  'Establishing biological nitrogen cycle parameters…',
  'Analyzing species temperaments and swimming corridors…',
  'Calibrating freshwater & marine care databases…',
  'Preparing aquatic flora & botanical profiles…',
  'Loading the comprehensive aquarium atlas…'
];

export default function SitePreloader() {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Randomize initial fact
    setFactIndex(Math.floor(Math.random() * facts.length));

    // Progress increment timer
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 20) + 15;
        return Math.min(100, prev + increment);
      });
    }, 120);

    // Completion timer
    const completeTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 900);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, []);

  if (!mounted || isLoaded) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-busy="true"
          aria-label="Loading Roshan Aquva World"
          className="fixed inset-0 z-[9999] bg-[#f7f7ff] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Ambient Background Water Light Rays & Ripples */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#cfcaf5]/50 via-[#edeafc]/60 to-[#27187e]/15 blur-[90px]"
            />
            
            {/* Geometric Marine Water Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#cfcaf5]/40 border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-[#27187e]/10 border-dotted"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            
            {/* Glowing Brand Mark with Ripple Effect */}
            <div className="relative mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-3 bg-[#27187e]/15 rounded-3xl blur-md"
              />
              <div className="relative p-3 rounded-3xl bg-[#ffffff] border-2 border-[#cfcaf5] shadow-lg">
                <BrandMark size={64} theme="light" />
              </div>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mb-5"
            >
              <h1 className="font-display font-normal text-3xl sm:text-4xl text-[#27187e] tracking-wider leading-none mb-1">
                {siteConfig.name}
              </h1>
              <span className="font-sans font-bold uppercase tracking-[0.25em] text-[10px] sm:text-[11px] text-[#27187e]/70">
                The Aquarium Atlas
              </span>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-56 sm:w-64 mb-4">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#27187e]/70 mb-1.5">
                <span>INITIALIZING ATLAS</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#edeafc] rounded-full overflow-hidden p-0.5 border border-[#cfcaf5] shadow-inner relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#27187e] via-[#3b28ab] to-[#27187e] rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.15 }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 rounded-full animate-ping" />
                </motion.div>
              </div>
            </div>

            {/* Dynamic Status / Fact text */}
            <motion.p
              key={factIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-[#27187e]/80 font-sans font-medium min-h-[1.5rem] leading-relaxed max-w-xs"
            >
              {facts[factIndex]}
            </motion.p>

          </div>

          {/* Bottom subtle copyright / badge */}
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#27187e]/50">
              Science-Backed Fishkeeping Reference
            </span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
