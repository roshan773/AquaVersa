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
          className="fixed inset-0 z-[9999] bg-[#0d0630] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Logo Mark */}
            <div className="w-14 h-14 rounded-2xl bg-[#27187E] border border-[#3622a6] flex items-center justify-center text-[#F7F7FF] shadow-2xl">
              <Waves className="w-7 h-7 animate-pulse text-[#F7F7FF]" />
            </div>

            {/* Brand Title */}
            <div className="text-center">
              <h2 className="font-display font-normal text-2xl text-[#F7F7FF] tracking-wider">
                {siteConfig.name}
              </h2>
              <p className="text-xs text-[#F7F7FF]/70 font-sans mt-1">
                Exploring the underwater world…
              </p>
            </div>

            {/* Progress line */}
            <div className="w-32 h-1 bg-[#1c0e64] rounded-full overflow-hidden mt-2 relative" aria-hidden="true">
              <div className="absolute inset-0 bg-gradient-to-r from-[#27187E] via-[#aca1f7] to-[#F7F7FF] animate-shimmer" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
