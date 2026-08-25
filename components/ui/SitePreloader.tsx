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

    // Keep loader visible briefly (550ms) to allow rendering and prevent flash
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 550);

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

  // SSR Static Placeholder to prevent flash of content before mounting
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-900 p-2.5 rounded-xl">
            <Waves className="w-6 h-6 text-blue-500" />
          </div>
          <span className="font-poppins font-bold text-2xl tracking-tight text-white">
            AquaVersa
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
          transition={{ duration: 0.3, ease: "easeInOut" }}
          aria-busy="true"
          aria-label="Loading website"
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Centered Branded Logo Block */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-3.5 select-none"
            >
              {/* Premium Subtle Branded Icon */}
              <div className="bg-slate-950 border border-slate-900 p-2.5 rounded-xl shadow-md">
                <Waves className="w-6 h-6 text-blue-500" />
              </div>
              <span className="font-poppins font-bold text-2xl tracking-tight text-white">
                AquaVersa
              </span>
            </motion.div>

            {/* High-Precision Shimmer Progress Line */}
            <div className="w-36 h-[1.5px] bg-slate-950 rounded-full overflow-hidden mt-8 relative" aria-hidden="true">
              {!reducedMotion && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer" />
              )}
            </div>

            {/* Subtly Faded Loading Text */}
            <span className="mt-4 text-[9px] uppercase font-bold tracking-[0.25em] text-slate-500 select-none">
              Loading
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
