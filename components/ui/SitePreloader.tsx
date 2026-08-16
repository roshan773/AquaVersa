"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fish } from "lucide-react";

const BUBBLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${(i * 4.3 + Math.random() * 4) % 100}%`,
  delay: `${Math.random() * 6}s`,
  size: `${Math.random() * 12 + 6}px`,
  speed: i % 3 === 0 ? "animate-bubble-slow" : i % 3 === 1 ? "animate-bubble-medium" : "animate-bubble-fast"
}));

const LOADING_TEXTS = [
  "Cycling the biological filter...",
  "Testing ammonia and nitrite levels...",
  "Acclimating tropical species...",
  "Planting aquatic flora...",
  "Polishing water column clarity...",
];

export default function SitePreloader() {
  const [show, setShow] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Cycle text messages
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 450);

    // Disable loading screen after 1.8 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, []);

  // Disable body scroll when loader is active
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Floating Bubble Particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {BUBBLES.map((bubble) => (
              <div
                key={bubble.id}
                className={`absolute rounded-full bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-[1px] ${bubble.speed}`}
                style={{
                  left: bubble.left,
                  width: bubble.size,
                  height: bubble.size,
                  animationDelay: bubble.delay,
                  bottom: "-40px",
                }}
              />
            ))}
          </div>

          {/* Swimming Track & Bobbing Fish */}
          <div className="relative w-full max-w-xl h-32 mb-8 flex items-center justify-center z-10">
            {/* Ambient Water Stream Line */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent rounded-full shadow-[0_0_8px_rgba(34,211,238,0.2)]" />
            
            {/* Swimming Fish Wrapper */}
            <div className="absolute w-[80%] left-0 animate-swim h-full flex items-center">
              <div className="animate-bob">
                <Fish className="w-14 h-14 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.75)]" />
              </div>
            </div>
          </div>

          {/* Loading Progress & Text */}
          <div className="w-full max-w-sm px-4 flex flex-col items-center text-center z-10">
            <h2 className="font-poppins font-bold text-xl text-white tracking-wide mb-2 flex items-center gap-2">
              AquaGuide
            </h2>
            
            {/* Loading text with transition animation */}
            <div className="h-6 overflow-hidden mb-6">
              <motion.p
                key={textIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs font-semibold text-cyan-300 tracking-wider uppercase"
              >
                {LOADING_TEXTS[textIndex]}
              </motion.p>
            </div>

            {/* Premium Progress Bar Track */}
            <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.0, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
