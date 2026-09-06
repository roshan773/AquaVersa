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
  const [progress, setProgress] = useState(12);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Randomize initial fact
    setFactIndex(Math.floor(Math.random() * facts.length));

    // Progress increments
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 12;
        return Math.min(100, prev + step);
      });
    }, 120);

    // Ensure preloader displays cleanly for at least 1.2s
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoaded(true);
      }, 350);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
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
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-busy="true"
          aria-label="Loading Roshan Aquva World"
          className="fixed inset-0 z-[99999] bg-[#f7f7ff] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Animated Background Water Rays & Ambient Pulsing Waves */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#cfcaf5]/60 via-[#edeafc]/80 to-[#27187e]/20 blur-[100px]"
            />
            
            {/* Floating Water Bubble Particles */}
            {[
              { x: '25%', y: '80%', size: 14, dur: 4.2, delay: 0 },
              { x: '75%', y: '85%', size: 18, dur: 5.1, delay: 0.5 },
              { x: '45%', y: '90%', size: 10, dur: 3.8, delay: 1.2 },
              { x: '60%', y: '75%', size: 16, dur: 4.6, delay: 0.8 },
              { x: '35%', y: '82%', size: 22, dur: 5.5, delay: 0.2 },
            ].map((bubble, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: -400,
                  opacity: [0, 0.6, 0.8, 0],
                  scale: [0.8, 1.2],
                }}
                transition={{
                  duration: bubble.dur,
                  repeat: Infinity,
                  delay: bubble.delay,
                  ease: 'easeOut',
                }}
                style={{
                  left: bubble.x,
                  bottom: bubble.y,
                  width: bubble.size,
                  height: bubble.size,
                }}
                className="absolute rounded-full border border-[#27187e]/30 bg-[#edeafc]/50 backdrop-blur-xs shadow-sm"
              />
            ))}

            {/* Rotating Marine Compass / Depth Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#cfcaf5]/60 border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-[#27187e]/15 border-dotted"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            
            {/* Glowing Brand Mark with Ripple Effect */}
            <div className="relative mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-4 bg-gradient-to-r from-[#27187e]/20 via-[#cfcaf5]/40 to-[#27187e]/20 rounded-3xl blur-lg"
              />
              <div className="relative p-4 rounded-3xl bg-[#ffffff] border-2 border-[#cfcaf5] shadow-xl">
                <BrandMark size={72} theme="light" />
              </div>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mb-6"
            >
              <h1 className="font-display font-normal text-3xl sm:text-4xl text-[#27187e] tracking-wider leading-none mb-1.5">
                {siteConfig.name}
              </h1>
              <span className="font-sans font-bold uppercase tracking-[0.28em] text-[10px] sm:text-[11px] text-[#27187e]/70">
                The Aquarium Atlas
              </span>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-64 sm:w-72 mb-5">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#27187e]/80 mb-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#27187e] animate-ping inline-block" />
                  <span>INITIALIZING ATLAS</span>
                </span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#edeafc] rounded-full overflow-hidden p-0.5 border-2 border-[#cfcaf5] shadow-inner relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#27187e] via-[#3b28ab] to-[#27187e] rounded-full relative shadow-sm"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/90 rounded-full animate-pulse shadow-sm" />
                </motion.div>
              </div>
            </div>

            {/* Dynamic Status / Fact text */}
            <motion.p
              key={factIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm text-[#27187e]/85 font-sans font-medium min-h-[2rem] leading-relaxed max-w-xs"
            >
              {facts[factIndex]}
            </motion.p>

          </div>

          {/* Bottom subtle copyright / badge */}
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#27187e]/50">
              Science-Backed Fishkeeping Reference • 2026 Edition
            </span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
