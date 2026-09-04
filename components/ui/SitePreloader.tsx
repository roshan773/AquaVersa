'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandMark } from '@/components/ui/BrandLogo';
import { siteConfig } from '@/config/site';

export default function SitePreloader() {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
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
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-busy="true"
          aria-label="Loading Roshan Aquva World"
          className="fixed inset-0 z-[9999] bg-[#f7f7ff] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Logo Mark */}
            <BrandMark size={56} theme="light" />


            {/* Brand Title */}
            <div className="text-center">
              <h2 className="font-display font-normal text-3xl text-[#27187e] tracking-wider">
                {siteConfig.name}
              </h2>
              <p className="text-xs text-[#27187e]/75 font-sans mt-1">
                Exploring the underwater world…
              </p>
            </div>

            {/* Progress line */}
            <div className="w-32 h-1 bg-[#edeafc] rounded-full overflow-hidden mt-2 relative border border-[#cfcaf5]" aria-hidden="true">
              <div className="absolute inset-0 bg-[#27187e] animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
