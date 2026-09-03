"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Search, Menu, X, Waves, ArrowUpRight, Compass, Leaf, Settings } from "lucide-react";
import Image from "next/image";
import { fishData } from "@/data/fish";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const router = useRouter();
  const validFish = fishData.filter(f => f.slug && f.category);
  const fwFish = validFish.filter(f => f.category!.toLowerCase() === "freshwater");
  const swFish = validFish.filter(f => f.category!.toLowerCase() === "saltwater");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    } else {
      router.push("/search");
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = "font-poppins text-xs uppercase tracking-widest py-1 relative group transition-colors duration-200 text-slate-300 hover:text-white font-semibold flex items-center gap-1";

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <header className={`pointer-events-auto transition-all duration-500 rounded-full flex items-center justify-between px-5 sm:px-7 py-2.5 max-w-6xl w-full ${
        isScrolled 
          ? "bg-[#030812]/92 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.15)]" 
          : "bg-[#050e1d]/80 backdrop-blur-xl border border-cyan-500/20 shadow-2xl"
      }`}>
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none" aria-label="Home">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-rose-500 flex items-center justify-center text-slate-950 font-extrabold text-sm group-hover:rotate-45 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
            <Waves className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-poppins text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-200 transition-colors uppercase">
            ROSHAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-rose-400">AQUVA</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/" className={navLinkClass}>
            <span>Home</span>
            <span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-rose-400 transition-all duration-300 w-0 group-hover:w-full" />
          </Link>

          {/* Fish Dropdown */}
          <div
            className="relative flex items-center py-2"
            onMouseEnter={() => setActiveDropdown('fish')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={navLinkClass}>
              <span>Fish</span>
              <span className="text-[9px] text-cyan-400 opacity-80">▾</span>
              <span className="absolute bottom-1 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-rose-400 transition-all duration-300 w-0 group-hover:w-full" />
            </button>

            <AnimatePresence>
              {activeDropdown === 'fish' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 left-1/2 -translate-x-1/2 w-[680px] bg-[#030812]/95 backdrop-blur-2xl border border-cyan-500/25 rounded-2xl p-6 shadow-2xl grid grid-cols-2 gap-5 z-50 text-left"
                >
                  <div className="p-4 rounded-xl bg-[#061224]/80 border border-cyan-500/15 hover:border-cyan-400/30 transition-all group">
                    <Link href="/fish/freshwater" onClick={() => setActiveDropdown(null)} className="block relative w-full h-28 rounded-lg overflow-hidden mb-3">
                      <Image src="/images/betta.png" alt="Freshwater" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="300px" />
                      <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300">FRESHWATER</div>
                    </Link>
                    <Link href="/fish/freshwater" onClick={() => setActiveDropdown(null)} className="font-poppins font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                      Freshwater Species →
                    </Link>
                    <p className="text-xs text-slate-400 mt-1">{fwFish.length} documented care profiles.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#061224]/80 border border-cyan-500/15 hover:border-rose-400/30 transition-all group">
                    <Link href="/fish/saltwater" onClick={() => setActiveDropdown(null)} className="block relative w-full h-28 rounded-lg overflow-hidden mb-3">
                      <Image src="/images/clownfish.png" alt="Saltwater" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="300px" />
                      <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-mono text-rose-300">SALTWATER</div>
                    </Link>
                    <Link href="/fish/saltwater" onClick={() => setActiveDropdown(null)} className="font-poppins font-bold text-sm text-white group-hover:text-rose-300 transition-colors">
                      Saltwater & Reef →
                    </Link>
                    <p className="text-xs text-slate-400 mt-1">{swFish.length} marine profiles & compatibility.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/plants" className={navLinkClass}>
            <span>Plants</span>
            <span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-rose-400 transition-all duration-300 w-0 group-hover:w-full" />
          </Link>

          <Link href="/equipment" className={navLinkClass}>
            <span>Hardware</span>
            <span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-rose-400 transition-all duration-300 w-0 group-hover:w-full" />
          </Link>

          <Link href="/guides" className={navLinkClass}>
            <span>Guides</span>
            <span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-rose-400 transition-all duration-300 w-0 group-hover:w-full" />
          </Link>

          <Link href="/compatibility" className={navLinkClass}>
            <span>Compatibility</span>
            <span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-rose-400 transition-all duration-300 w-0 group-hover:w-full" />
          </Link>
        </nav>

        {/* RIGHT CTA + SEARCH */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-28 focus:w-44 transition-all duration-300 pl-8 pr-3 py-1.5 rounded-full bg-[#030812]/80 border border-cyan-500/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
            />
          </form>

          {/* Pill CTA Button */}
          <Link
            href="/start-aquarium"
            className="relative inline-flex items-center justify-center font-poppins tracking-wider font-bold uppercase text-[11px] px-5 py-2 rounded-full transition-all duration-300 group overflow-hidden cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Start Setup</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-full bg-[#061224] border border-cyan-500/20 text-white hover:text-cyan-300 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#030812]/98 backdrop-blur-2xl lg:hidden pointer-events-auto flex flex-col justify-between p-6 pt-28"
          >
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">// Navigation Protocol</div>
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-poppins text-xl uppercase tracking-wide flex items-center justify-between py-3 border-b border-cyan-500/10 text-slate-200 hover:text-white">
                  <span>Home</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </Link>
                <Link href="/fish" onClick={() => setIsMobileMenuOpen(false)} className="font-poppins text-xl uppercase tracking-wide flex items-center justify-between py-3 border-b border-cyan-500/10 text-slate-200 hover:text-white">
                  <span>Fish Database</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </Link>
                <Link href="/plants" onClick={() => setIsMobileMenuOpen(false)} className="font-poppins text-xl uppercase tracking-wide flex items-center justify-between py-3 border-b border-cyan-500/10 text-slate-200 hover:text-white">
                  <span>Aquatic Plants</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </Link>
                <Link href="/equipment" onClick={() => setIsMobileMenuOpen(false)} className="font-poppins text-xl uppercase tracking-wide flex items-center justify-between py-3 border-b border-cyan-500/10 text-slate-200 hover:text-white">
                  <span>Hardware Guide</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </Link>
                <Link href="/compatibility" onClick={() => setIsMobileMenuOpen(false)} className="font-poppins text-xl uppercase tracking-wide flex items-center justify-between py-3 border-b border-cyan-500/10 text-slate-200 hover:text-white">
                  <span>Compatibility Planner</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </Link>
                <Link href="/guides" onClick={() => setIsMobileMenuOpen(false)} className="font-poppins text-xl uppercase tracking-wide flex items-center justify-between py-3 border-b border-cyan-500/10 text-slate-200 hover:text-white">
                  <span>Care Guides</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </nav>
            </div>

            <div className="max-w-md mx-auto w-full pt-6">
              <Link
                href="/start-aquarium"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold rounded-full flex items-center justify-center gap-2 uppercase tracking-wider text-xs font-poppins"
              >
                <span>Start Aquarium Setup</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
