"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";
import { getCookieConsent, setCookieConsent, initGA } from "@/lib/analytics";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = getCookieConsent();
    if (consent === "accepted") {
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      if (gaId) {
        initGA(gaId);
      }
    } else if (consent === null) {
      // Small delay before showing the banner for premium feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent("accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    setCookieConsent("declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="bg-slate-950/95 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-left flex flex-col gap-4">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white tracking-wide font-poppins">Cookie Consent</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  We use cookies to analyze site traffic, improve usability, and enhance your AquaGuide experience. Choose your preferences below.
                </p>
              </div>
              <button 
                onClick={handleDecline} 
                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 justify-end text-xs font-semibold">
              <Link 
                href="/privacy-policy" 
                className="text-slate-400 hover:text-white transition-colors mr-auto hover:underline"
              >
                Privacy Policy
              </Link>
              <button
                onClick={handleDecline}
                className="px-4 py-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 rounded-lg text-slate-350 transition-colors cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer shadow-md shadow-blue-600/10"
              >
                Accept
              </button>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Simple fallback Link component in case standard Link is needed
import Link from "next/link";
