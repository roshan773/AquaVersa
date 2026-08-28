"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export default function StickyMobileCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [ctaData, setCtaData] = useState<{ text: string; href: string } | null>(null);

  useEffect(() => {
    // Hide by default on non-interactive or specific informational pages
    const hiddenRoutes = [
      "/about",
      "/contact",
      "/privacy",
      "/privacy-policy",
      "/terms",
      "/thank-you",
      "/not-found"
    ];

    if (hiddenRoutes.some(route => pathname?.startsWith(route))) {
      setIsVisible(false);
      return;
    }

    // Determine path-specific CTA
    let text = "";
    let href = "";

    if (pathname === "/") {
      text = "Start Your Aquarium Setup";
      href = "/start-aquarium";
    } else if (pathname?.startsWith("/fish")) {
      text = "Check Fish Compatibility";
      href = "/compatibility";
    } else if (pathname?.startsWith("/plants")) {
      text = "Design Aquascape Layout";
      href = "/aquascape-planner";
    } else if (pathname?.startsWith("/equipment")) {
      text = "Try Equipment Wizard";
      href = "/equipment-wizard";
    } else {
      text = "Start Setup Guide";
      href = "/start-aquarium";
    }

    setCtaData({ text, href });
    
    // Show only on mobile view (verified on client side)
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsVisible(isMobile);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
  };

  if (!isVisible || !ctaData) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 bg-slate-950/95 backdrop-blur-md border-t border-blue-500/20 md:hidden flex items-center justify-between gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.4)]">
      <Link
        href={ctaData.href}
        className="flex-1 py-3 px-5 bg-blue-600 active:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 tracking-wide uppercase font-poppins transition-colors"
      >
        <span>{ctaData.text}</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
      <button
        onClick={handleDismiss}
        className="p-3 bg-slate-900 border border-slate-800 active:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
        aria-label="Dismiss sticky CTA"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
