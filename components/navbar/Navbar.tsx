'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Waves,
  ArrowRight,
  BookOpen,
  Fish,
  Leaf,
  Wrench,
  Compass,
  Info,
  Mail,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const drawerSearchInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent, queryToUse?: string) => {
    e.preventDefault();
    const q = (queryToUse || searchQuery).trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      closeMenu();
    }
  };

  const navLinks = [
    { label: 'Home', href: '/', badge: 'Atlas Hub', icon: <Waves className="w-5 h-5 text-[#27187e]" /> },
    { label: 'Fish Library', href: '/fish', badge: '120+ Species', icon: <Fish className="w-5 h-5 text-[#27187e]" /> },
    { label: 'Aquarium Plants', href: '/plants', badge: 'Flora Archive', icon: <Leaf className="w-5 h-5 text-[#27187e]" /> },
    { label: 'Equipment Archive', href: '/equipment', badge: 'Gear & Tech', icon: <Wrench className="w-5 h-5 text-[#27187e]" /> },
    { label: 'Care Guides', href: '/guides', badge: 'Step-by-Step', icon: <BookOpen className="w-5 h-5 text-[#27187e]" /> },
    { label: 'Aquarium Tools', href: '/compatibility', badge: 'Interactive', icon: <Compass className="w-5 h-5 text-[#27187e]" /> },
    { label: 'About Atlas', href: '/about', badge: 'Our Story', icon: <Info className="w-5 h-5 text-[#27187e]" /> },
    { label: 'Contact', href: '/contact', badge: 'Get in Touch', icon: <Mail className="w-5 h-5 text-[#27187e]" /> },
  ];

  return (
    <>
      {/* HEADER BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#f7f7ff]/95 backdrop-blur-md border-b border-[#cfcaf5] py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="site-container flex items-center justify-between">
          
          {/* BRAND LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Roshan Aquva World — The Aquarium Atlas"
          >
            <div className="w-9 h-9 rounded-xl bg-[#27187e] flex items-center justify-center text-[#f7f7ff] shadow-md group-hover:scale-105 transition-transform">
              <Waves className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-2xl tracking-wider text-[#27187e] leading-none">
                ROSHAN AQUVA WORLD
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#27187e]/70 font-semibold mt-0.5 font-sans">
                The Aquarium Atlas
              </span>
            </div>
          </Link>

          {/* RIGHT ACTIONS: Search & Stylish Marine Hamburger */}
          <div className="flex items-center gap-3">
            
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full bg-[#f7f7ff] border border-[#cfcaf5] hover:border-[#27187e] hover:bg-[#edeafc] flex items-center justify-center text-[#27187e] transition-all shadow-sm focus:outline-none"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* STYLISH MARINE HAMBURGER MENU BUTTON */}
            <button
              onClick={toggleMenu}
              className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] transition-all shadow-md active:scale-95 focus:outline-none"
              aria-label={isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isOpen}
            >
              <span className="text-xs font-condensed font-bold uppercase tracking-widest hidden sm:inline-block">
                Menu
              </span>

              {/* Animated 3 Marine Wave Lines */}
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span className="w-5 h-0.5 bg-[#f7f7ff] rounded-full transition-all" />
                <span className="w-3.5 h-0.5 bg-[#f7f7ff] rounded-full self-end transition-all" />
                <span className="w-5 h-0.5 bg-[#f7f7ff] rounded-full transition-all" />
              </div>
            </button>

          </div>

        </div>
      </header>

      {/* FULL-SCREEN ANIMATED MARINE NAVIGATION DRAWER (Z-INDEX 100 TO AVOID ANY OVERLAPPING) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-[#27187e]/60 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="relative w-full max-w-lg h-full bg-[#f7f7ff] border-l-2 border-[#cfcaf5] shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto z-10 marine-pattern-light"
            >
              <div>
                {/* TOP HEADER INSIDE DRAWER (Fixed cleanly without colliding) */}
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#cfcaf5]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#27187e] flex items-center justify-center text-[#f7f7ff] shadow-sm">
                      <Waves className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-display text-xl text-[#27187e] block leading-none">
                        ROSHAN AQUVA WORLD
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187e]/70 font-sans">
                        Navigation Atlas
                      </span>
                    </div>
                  </div>

                  {/* Single Clean Close Button */}
                  <button
                    onClick={closeMenu}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#edeafc] hover:bg-[#27187e] text-[#27187e] hover:text-[#f7f7ff] border border-[#cfcaf5] transition-all font-sans text-xs font-bold"
                    aria-label="Close menu"
                  >
                    <span>CLOSE</span>
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* INLINE QUICK SEARCH IN DRAWER */}
                <form
                  onSubmit={(e) => handleSearchSubmit(e, searchQuery)}
                  className="relative mb-5"
                >
                  <Search className="w-4 h-4 text-[#27187e]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    ref={drawerSearchInputRef}
                    type="text"
                    placeholder="Search species, equipment, guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-[#ffffff] border border-[#cfcaf5] focus:border-[#27187e] text-sm text-[#27187e] font-sans focus:outline-none shadow-sm transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] rounded-lg text-xs font-bold font-sans transition-colors"
                  >
                    Search
                  </button>
                </form>

                {/* NAVIGATION ITEMS */}
                <nav className="space-y-2">
                  {navLinks.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * idx, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 group ${
                            isActive
                              ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e] shadow-md'
                              : 'bg-[#ffffff] text-[#27187e] border-[#cfcaf5] hover:border-[#27187e] hover:bg-[#edeafc]'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                                isActive
                                  ? 'bg-[#1f1366] text-[#f7f7ff]'
                                  : 'bg-[#edeafc] text-[#27187e] group-hover:bg-[#27187e] group-hover:text-[#f7f7ff]'
                              }`}
                            >
                              {item.icon}
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="font-display text-xl tracking-wide leading-tight">
                                {item.label}
                              </span>
                              <span
                                className={`text-[10px] font-sans font-semibold tracking-wider uppercase ${
                                  isActive ? 'text-[#cfcaf5]' : 'text-[#27187e]/60'
                                }`}
                              >
                                {item.badge}
                              </span>
                            </div>
                          </div>

                          <ArrowRight
                            className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                              isActive ? 'text-[#f7f7ff]' : 'text-[#27187e]'
                            }`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* DRAWER FOOTER */}
              <div className="mt-6 pt-5 border-t border-[#cfcaf5] flex flex-col gap-3">
                <Link
                  href="/start-aquarium"
                  onClick={closeMenu}
                  className="w-full py-3.5 rounded-xl bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs font-condensed font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Beginner Setup Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-[#27187e]/70 text-center font-sans">
                  The Aquarium Atlas — Systematic knowledge for aquarium keepers.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INDEPENDENT SEARCH MODAL DIALOG */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[110] flex items-start justify-center p-4 pt-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-[#27187e]/70 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -10, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#ffffff] border-2 border-[#27187e] rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Waves className="w-5 h-5 text-[#27187e]" />
                  <span className="font-display text-xl text-[#27187e]">
                    SEARCH THE AQUARIUM ATLAS
                  </span>
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#edeafc] flex items-center justify-center text-[#27187e] hover:bg-[#27187e] hover:text-[#f7f7ff] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="w-5 h-5 text-[#27187e]/60 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  autoFocus
                  type="text"
                  placeholder="Search species, equipment, plants, guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#f7f7ff] border-2 border-[#cfcaf5] focus:border-[#27187e] text-base text-[#27187e] font-sans focus:outline-none"
                />
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-sans">
                <span className="text-[#27187e]/70 font-semibold">Quick Suggestions:</span>
                {['Neon Tetra', 'Betta Fish', 'Canister Filter', 'Nitrogen Cycle', 'Java Fern'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        router.push(`/search?q=${encodeURIComponent(term)}`);
                        setIsSearchOpen(false);
                      }}
                      className="px-3 py-1 rounded-lg bg-[#edeafc] text-[#27187e] hover:bg-[#27187e] hover:text-[#f7f7ff] transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

