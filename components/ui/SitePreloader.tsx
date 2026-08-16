"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves } from "lucide-react";

export default function SitePreloader() {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    // Keep loader visible briefly (500ms) to prevent visual layout flash on fast load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      mediaQuery.removeEventListener("change", listener);
      clearTimeout(timer);
    };
  }, []);

  // Block body scroll while preloader is active
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  // If component is server-side rendered (SSR), render a static backdrop
  // to prevent layout flash before React mounts on the client
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500 p-2.5 rounded-xl">
            <Waves className="w-6 h-6 text-slate-900" />
          </div>
          <span className="font-poppins font-extrabold text-2xl tracking-tight text-white">
            AquaGuide
          </span>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          aria-busy="true"
          aria-label="Loading AquaGuide"
          className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Centered Branded Logo Block */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-3 select-none"
            >
              {/* Pulsing Aqua Symbol */}
              <div className={`bg-cyan-500 p-2.5 rounded-xl shadow-lg shadow-cyan-500/10 ${
                reducedMotion ? "" : "animate-pulse"
              }`}>
                <Waves className="w-6 h-6 text-slate-900" />
              </div>
              <span className="font-poppins font-extrabold text-2xl tracking-tight text-white">
                AquaGuide
              </span>
            </motion.div>

            {/* Subtle Aquarium-Inspired Ripple/Wave Animation */}
            {!reducedMotion && (
              <div className="mt-8 flex gap-1.5 justify-center items-center" aria-hidden="true">
                <span 
                  className="w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_6px_rgba(34,211,238,0.4)] animate-[bounce_1.4s_infinite_ease-in-out_0ms]" 
                />
                <span 
                  className="w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_6px_rgba(34,211,238,0.4)] animate-[bounce_1.4s_infinite_ease-in-out_200ms]" 
                />
                <span 
                  className="w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_6px_rgba(34,211,238,0.4)] animate-[bounce_1.4s_infinite_ease-in-out_400ms]" 
                />
              </div>
            )}

            {/* Subtly Faded Loading Text indicator */}
            <span className="mt-4 text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-500 select-none">
              Loading
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
