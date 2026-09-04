"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function SitePreloader() {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Smooth short dismiss once page is mounted and active
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || isLoaded) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-busy="true"
          aria-label="Loading Roshan Aquva World"
          className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Logo Mark */}
            <div className="w-12 h-12 rounded-2xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-lg">
              <Waves className="w-6 h-6 animate-pulse text-teal-300" />
            </div>

            {/* Brand Title */}
            <div className="text-center">
              <h2 className="font-poppins font-bold text-lg text-white tracking-tight">
                {siteConfig.name}
              </h2>
              <p className="text-xs text-slate-400 font-normal mt-1">
                Exploring the underwater world…
              </p>
            </div>

            {/* Progress line */}
            <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden mt-2 relative" aria-hidden="true">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-400 animate-shimmer" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
