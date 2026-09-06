'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandMark } from '@/components/ui/BrandLogo';
import { siteConfig } from '@/config/site';

const diveStages = [
  { depth: 0, label: 'Breaching Surface Waters…', zone: 'Surface (0m)' },
  { depth: 25, label: 'Descending through the Sunlight Zone…', zone: 'Photic Zone (-25m)' },
  { depth: 55, label: 'Passing Amazonian & Coral Biotopes…', zone: 'Reef Shelf (-55m)' },
  { depth: 85, label: 'Synchronizing Water Chemistry Parameters…', zone: 'Deep Biome (-85m)' },
  { depth: 100, label: 'Entering The Aquarium Atlas…', zone: 'Abyssal Vault (-100m)' }
];

export default function SitePreloader() {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [depth, setDepth] = useState(0);
  const [currentStage, setCurrentStage] = useState(diveStages[0]);

  useEffect(() => {
    setMounted(true);

    const startTime = Date.now();
    const duration = 1400; // 1.4s immersive ocean dive

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setDepth(progress);

      const stage = diveStages.slice().reverse().find(s => progress >= s.depth) || diveStages[0];
      setCurrentStage(stage);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
        }, 400);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || isLoaded) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: 'blur(8px)',
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-busy="true"
          aria-label="Diving into Roshan Aquva World"
          className="fixed inset-0 z-[99999] bg-gradient-to-b from-[#1b1059] via-[#12093d] to-[#08031d] text-[#f7f7ff] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* =========================================================
              1. OCEAN SURFACE & SUNLIGHT GOD RAYS
             ========================================================= */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            
            {/* Surface Shimmering Ripple */}
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scaleY: [1, 1.15, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyan-400/20 via-[#27187e]/30 to-transparent blur-xl"
            />

            {/* Sunlight Beams (God Rays piercing down) */}
            <div className="absolute -top-10 left-1/4 w-32 h-[120vh] bg-gradient-to-b from-cyan-300/20 via-[#3b28ab]/10 to-transparent -rotate-12 blur-2xl transform-gpu pointer-events-none" />
            <div className="absolute -top-10 right-1/3 w-48 h-[120vh] bg-gradient-to-b from-indigo-300/20 via-cyan-500/10 to-transparent rotate-12 blur-3xl transform-gpu pointer-events-none" />
            <div className="absolute -top-10 right-10 w-24 h-[100vh] bg-gradient-to-b from-cyan-200/15 via-[#27187e]/10 to-transparent rotate-6 blur-2xl transform-gpu pointer-events-none" />

            {/* Deep Sea Ambient Bioluminescent Auras */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.25, 0.55, 0.25],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#27187e]/40 via-cyan-600/20 to-[#3b28ab]/30 blur-[120px]"
            />

            {/* =========================================================
                2. RISING OCEAN BUBBLES STREAM (Diving downward effect)
               ========================================================= */}
            {[
              { x: '15%', size: 16, dur: 2.8, delay: 0 },
              { x: '28%', size: 24, dur: 3.4, delay: 0.4 },
              { x: '42%', size: 12, dur: 2.3, delay: 0.9 },
              { x: '58%', size: 20, dur: 3.0, delay: 0.2 },
              { x: '72%', size: 14, dur: 2.6, delay: 0.7 },
              { x: '85%', size: 28, dur: 3.8, delay: 0.1 },
              { x: '20%', size: 10, dur: 2.1, delay: 1.1 },
              { x: '65%', size: 18, dur: 3.2, delay: 0.6 },
              { x: '80%', size: 8, dur: 1.9, delay: 1.3 },
            ].map((bubble, i) => (
              <motion.div
                key={i}
                initial={{ y: '110vh', opacity: 0 }}
                animate={{
                  y: '-20vh',
                  opacity: [0, 0.7, 0.9, 0],
                  x: [0, i % 2 === 0 ? 15 : -15, 0],
                }}
                transition={{
                  duration: bubble.dur,
                  repeat: Infinity,
                  delay: bubble.delay,
                  ease: 'easeOut',
                }}
                style={{
                  left: bubble.x,
                  width: bubble.size,
                  height: bubble.size,
                }}
                className="absolute rounded-full border border-cyan-300/60 bg-cyan-400/20 backdrop-blur-xs shadow-[0_0_8px_rgba(56,189,248,0.4)]"
              >
                {/* Bubble Specular Glint */}
                <div className="absolute top-1 left-1 w-1/3 h-1/3 bg-white/80 rounded-full" />
              </motion.div>
            ))}

            {/* Diving Sonar Radar Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-cyan-500/20 border-dashed"
            />
            <motion.div
              animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-indigo-400/30"
            />
          </div>

          {/* =========================================================
              3. CENTER EMBLEM & OCEAN DIVE HUD
             ========================================================= */}
          <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
            
            {/* Diving Submersible Brand Mark */}
            <div className="relative mb-6">
              {/* Aquatic Bioluminescent Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-indigo-500/40 to-blue-500/30 rounded-3xl blur-xl"
              />
              
              <div className="relative p-4 rounded-3xl bg-[#12093d]/90 border-2 border-cyan-400/40 shadow-[0_0_30px_rgba(39,24,126,0.8)] backdrop-blur-md">
                <BrandMark size={76} theme="dark" />
              </div>
            </div>

            {/* Title & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-6"
            >
              <h1 className="font-display font-normal text-3xl sm:text-5xl text-[#ffffff] tracking-wider leading-none mb-1.5 drop-shadow-md">
                {siteConfig.name}
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                <span>OCEAN DIVE IN PROGRESS</span>
              </div>
            </motion.div>

            {/* Depth Telemetry Gauge */}
            <div className="w-64 sm:w-80 mb-5 bg-[#0e0728]/80 border border-cyan-400/30 rounded-2xl p-4 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-300 mb-2">
                <span className="tracking-wider">SUBMERSION DEPTH</span>
                <span className="text-white text-sm">-{depth}m</span>
              </div>

              {/* Depth Descent Progress Bar */}
              <div className="w-full h-3 bg-[#1b1059] rounded-full overflow-hidden p-0.5 border border-cyan-500/40 relative shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full relative"
                  style={{ width: `${depth}%` }}
                  transition={{ ease: 'linear', duration: 0.05 }}
                >
                  {/* Glowing Leading Head of Depth Meter */}
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-cyan-200 rounded-full shadow-[0_0_10px_#38bdf8]" />
                </motion.div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-cyan-300/70 mt-2">
                <span>0m (SURFACE)</span>
                <span className="text-cyan-200 font-bold">{currentStage.zone}</span>
                <span>-100m (ABYSS)</span>
              </div>
            </div>

            {/* Current Dive Stage Narrative */}
            <motion.p
              key={currentStage.label}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm text-cyan-100/90 font-sans font-medium min-h-[1.5rem] leading-relaxed max-w-sm drop-shadow-sm"
            >
              {currentStage.label}
            </motion.p>

          </div>

          {/* Depth Gradient Lines (Water Columns) on sides */}
          <div className="absolute left-6 top-1/3 bottom-1/3 hidden md:flex flex-col justify-between text-[10px] font-mono text-cyan-400/50 border-l border-cyan-500/30 pl-2 pointer-events-none">
            <span>SURFACE 0M</span>
            <span>PHOTIC 25M</span>
            <span>REEF 50M</span>
            <span>TWILIGHT 75M</span>
            <span>ABYSSAL 100M</span>
          </div>

          {/* Bottom Depth Status */}
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-cyan-300/50">
              The Comprehensive Aquarium Care &amp; Planning Atlas
            </span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
