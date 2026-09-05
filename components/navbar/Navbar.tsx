'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Fish,
  Leaf,
  Wrench,
  BookOpen,
  Compass,
  Info,
  Mail,
  FlaskConical,
  Calculator,
  Maximize2,
  Stethoscope,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const overlaySearchInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Close on Escape key
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

  // Prevent background scrolling when menu or search modal is open
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

  // Handle scroll effect
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

  const primaryLinks = [
    {
      num: '01',
      label: 'Fish Library',
      href: '/fish',
      badge: '120+ Species',
      desc: 'Systematic database of freshwater & marine fish species.',
      icon: Fish,
    },
    {
      num: '02',
      label: 'Aquarium Plants',
      href: '/plants',
      badge: 'Flora Archive',
      desc: 'Comprehensive guide to aquatic plants & aquascaping.',
      icon: Leaf,
    },
    {
      num: '03',
      label: 'Equipment Archive',
      href: '/equipment',
      badge: 'Gear & Tech',
      desc: 'Filters, lighting, heaters, and essential tank hardware.',
      icon: Wrench,
    },
    {
      num: '04',
      label: 'Care Guides',
      href: '/guides',
      badge: 'Step-by-Step',
      desc: 'Nitrogen cycle, water chemistry, and tank maintenance.',
      icon: BookOpen,
    },
    {
      num: '05',
      label: 'Beginner Roadmap',
      href: '/start-aquarium',
      badge: '10-Step Plan',
      desc: 'Complete step-by-step setup guide for first-time aquarists.',
      icon: Sparkles,
    },
    {
      num: '06',
      label: 'About The Atlas',
      href: '/about',
      badge: 'Our Mission',
      desc: 'Open-access educational encyclopedia for all hobbyists.',
      icon: Info,
    },
    {
      num: '07',
      label: 'Contact & Support',
      href: '/contact',
      badge: 'Get In Touch',
      desc: 'Send inquiries, feedback, or species contribution requests.',
      icon: Mail,
    },
  ];

  const smartTools = [
    {
      title: 'Water Analyzer',
      href: '/water-analyzer',
      desc: 'Instant diagnostic for pH, GH, Ammonia, Nitrite & Nitrate.',
      icon: FlaskConical,
      badge: 'Interactive',
    },
    {
      title: 'Stocking Planner',
      href: '/stocking-planner',
      desc: 'Calculate bioload capacity & adult size compatibility.',
      icon: Calculator,
      badge: 'Calculator',
    },
    {
      title: 'Tank Size Guide',
      href: '/tank-size',
      desc: 'Standard dimensions, water volume, and filled weight guide.',
      icon: Maximize2,
      badge: 'Reference',
    },
    {
      title: 'Species Compatibility',
      href: '/compatibility',
      desc: 'Verify temperament, temperature & water hardness synergy.',
      icon: Compass,
      badge: 'Matrix',
    },
    {
      title: 'Disease Checker',
      href: '/symptom-checker',
      desc: 'Identify symptoms, diagnose illnesses & treatment protocols.',
      icon: Stethoscope,
      badge: 'Diagnostic',
    },
    {
      title: 'Aquascape Planner',
      href: '/aquascape-planner',
      desc: 'Design layouts, substrate layers & plant placements.',
      icon: Layers,
      badge: 'Planner',
    },
  ];

  const trendingSearches = [
    'Betta Fish',
    'Nitrogen Cycle',
    'Canister Filter',
    'Neon Tetra',
    'Java Fern',
    'Water Hardness',
  ];

  return (
    <>
      {/* =========================================================
          TOP FIXED HEADER BAR
          ========================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#f7f7ff]/95 backdrop-blur-md border-b border-[#cfcaf5] py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="site-container flex items-center justify-between">
          {/* BRAND LOGO */}
          <BrandLogo size="md" onClick={closeMenu} />

          {/* RIGHT ACTIONS: Search Trigger & Menu Button */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full bg-[#f7f7ff] border border-[#cfcaf5] hover:border-[#27187e] hover:bg-[#edeafc] flex items-center justify-center text-[#27187e] transition-all shadow-sm focus:outline-none cursor-pointer"
              aria-label="Open Search"
            >
              <Search className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
            </button>

            {/* LUCIDE MENU / CLOSE TOGGLE BUTTON */}
            <button
              onClick={toggleMenu}
              className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] transition-all shadow-md active:scale-95 focus:outline-none cursor-pointer"
              aria-label={isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isOpen}
            >
              <span className="text-xs font-condensed font-bold uppercase tracking-widest hidden sm:inline-block">
                {isOpen ? 'Close' : 'Menu'}
              </span>

              {/* Centered Animated Icon */}
              <div className="w-5 h-5 flex items-center justify-center relative">
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center justify-center"
                    >
                      <X className="w-5 h-5 text-[#f7f7ff]" strokeWidth={2} aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center justify-center"
                    >
                      <Menu className="w-5 h-5 text-[#f7f7ff]" strokeWidth={2} aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          FULL-SCREEN EDITORIAL OVERLAY MENU (IMMERSIVE LUXURY)
          ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] bg-[#12093d]/98 backdrop-blur-2xl text-[#f7f7ff] overflow-y-auto flex flex-col justify-between"
          >
            {/* Background Ambient Aquatic Accents */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#27187e] blur-[120px]" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#3b28ab] blur-[140px] opacity-40" />
              <div className="absolute inset-0 bg-[radial-gradient(#cfcaf5_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
            </div>

            {/* TOP BAR INSIDE OVERLAY */}
            <div className="relative z-10 border-b border-[#cfcaf5]/15 py-5">
              <div className="site-container flex items-center justify-between">
                {/* Brand Logo Dark Mode */}
                <BrandLogo size="md" theme="dark" onClick={closeMenu} />

                {/* Right Action: Close Button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={closeMenu}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#27187e]/80 hover:bg-[#3b28ab] text-[#f7f7ff] border border-[#cfcaf5]/30 transition-all font-condensed text-xs uppercase tracking-wider cursor-pointer shadow-lg"
                    aria-label="Close navigation overlay"
                  >
                    <span>Close Menu</span>
                    <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-[#12093d] text-[#cfcaf5] border border-[#cfcaf5]/20 font-mono">
                      ESC
                    </span>
                    <X className="w-4 h-4 text-[#f7f7ff]" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

            {/* MAIN EDITORIAL CONTENT GRID */}
            <div className="relative z-10 flex-1 py-8 lg:py-12">
              <div className="site-container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  
                  {/* LEFT 7 COLS: EDITORIAL MAIN DIRECTORIES */}
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#cfcaf5]/20">
                      <span className="font-sans text-sm sm:text-base font-bold tracking-wider text-[#cfcaf5] uppercase">
                        01 // Main Atlas Archives
                      </span>
                      <span className="font-readable text-sm sm:text-base text-[#cfcaf5]">
                        Explore Aquarium Repositories
                      </span>
                    </div>

                    <nav className="flex flex-col divide-y divide-[#cfcaf5]/15" aria-label="Main Navigation">
                      {primaryLinks.map((item, idx) => {
                        const isActive = pathname === item.href;
                        const isHovered = hoveredIdx === idx;

                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.04 * idx, duration: 0.25 }}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            className="relative group"
                          >
                            <Link
                              href={item.href}
                              onClick={closeMenu}
                              className={`flex items-center justify-between py-4 sm:py-5 transition-all duration-200 ${
                                isActive ? 'text-[#ffffff]' : 'text-[#f7f7ff] hover:text-[#ffffff]'
                              }`}
                            >
                              <div className="flex items-center gap-4 sm:gap-6">
                                {/* Number Prefix */}
                                <span
                                  className={`font-mono text-sm sm:text-base font-semibold tracking-wider transition-colors ${
                                    isActive || isHovered
                                      ? 'text-[#ffffff]'
                                      : 'text-[#cfcaf5]/70'
                                  }`}
                                >
                                  {item.num}
                                </span>

                                {/* Icon Pill */}
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                                    isActive
                                      ? 'bg-[#ffffff] text-[#27187e] shadow-md'
                                      : isHovered
                                      ? 'bg-[#3b28ab] text-[#ffffff]'
                                      : 'bg-[#27187e] text-[#cfcaf5] border border-[#cfcaf5]/30'
                                  }`}
                                >
                                  <item.icon className="w-5 h-5" strokeWidth={2} />
                                </div>

                                {/* Label & Description */}
                                <div className="flex flex-col text-left">
                                  <div className="flex items-center gap-3">
                                    <span className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-wide group-hover:translate-x-1.5 transition-transform duration-200 text-[#ffffff]">
                                      {item.label}
                                    </span>
                                    {isActive && (
                                      <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] text-[#27187e] text-xs font-readable font-bold uppercase tracking-wider">
                                        Active
                                      </span>
                                    )}
                                  </div>
                                  <span className="font-readable text-sm sm:text-base text-[#e2dffa] font-normal mt-1 leading-relaxed block">
                                    {item.desc}
                                  </span>
                                </div>
                              </div>

                              {/* Right Badge & Arrow */}
                              <div className="flex items-center gap-3 shrink-0">
                                <span className="hidden md:inline-block px-3 py-1 rounded-lg bg-[#27187e] border border-[#cfcaf5]/40 font-readable text-xs sm:text-sm font-medium text-[#ffffff] shadow-xs">
                                  {item.badge}
                                </span>
                                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#27187e] group-hover:bg-[#ffffff] text-[#cfcaf5] group-hover:text-[#27187e] border border-[#cfcaf5]/30 transition-all shadow-xs">
                                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </nav>
                  </div>

                  {/* RIGHT 5 COLS: QUICK SEARCH & SMART TOOLS */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    
                    {/* INLINE QUICK SEARCH BOX */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#1b1059] border border-[#cfcaf5]/30 shadow-xl backdrop-blur-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-sans text-sm sm:text-base font-bold tracking-wider text-[#ffffff] uppercase flex items-center gap-2">
                          <Search className="w-4 h-4 text-[#cfcaf5]" />
                          Quick Atlas Search
                        </span>
                      </div>

                      <form
                        onSubmit={(e) => handleSearchSubmit(e, searchQuery)}
                        className="relative mb-3"
                      >
                        <Search
                          className="w-4 h-4 text-[#cfcaf5] absolute left-3.5 top-1/2 -translate-y-1/2"
                          strokeWidth={2}
                        />
                        <input
                          ref={overlaySearchInputRef}
                          type="text"
                          placeholder="Search species, plants, gear..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-20 py-3 rounded-xl bg-[#12093d] border border-[#cfcaf5]/40 focus:border-[#ffffff] font-readable text-sm sm:text-base text-[#ffffff] placeholder-[#cfcaf5]/70 focus:outline-none transition-all"
                        />
                        <button
                          type="submit"
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#27187e] hover:bg-[#3b28ab] text-[#ffffff] border border-[#cfcaf5]/40 rounded-lg font-readable text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                        >
                          Find
                        </button>
                      </form>

                      {/* Trending Suggestions */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="font-readable text-xs sm:text-sm font-medium text-[#cfcaf5]">
                          Trending:
                        </span>
                        {trendingSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => {
                              router.push(`/search?q=${encodeURIComponent(term)}`);
                              closeMenu();
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#27187e] hover:bg-[#ffffff] text-[#e2dffa] hover:text-[#27187e] border border-[#cfcaf5]/30 font-readable text-xs sm:text-sm font-medium transition-all cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SMART TOOLS & CALCULATORS */}
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#cfcaf5]/20">
                        <span className="font-sans text-sm sm:text-base font-bold tracking-wider text-[#cfcaf5] uppercase">
                          02 // Interactive Tools
                        </span>
                        <Link
                          href="/compatibility"
                          onClick={closeMenu}
                          className="font-readable text-sm sm:text-base font-medium text-[#e2dffa] hover:text-[#ffffff] flex items-center gap-1"
                        >
                          <span>All Tools</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {smartTools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={closeMenu}
                            className="group p-4 rounded-xl bg-[#1b1059] hover:bg-[#27187e] border border-[#cfcaf5]/25 hover:border-[#cfcaf5]/60 transition-all flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="w-8 h-8 rounded-lg bg-[#12093d] flex items-center justify-center text-[#cfcaf5] group-hover:bg-[#ffffff] group-hover:text-[#27187e] transition-colors border border-[#cfcaf5]/20">
                                <tool.icon className="w-4 h-4" />
                              </div>
                              <span className="font-mono text-xs text-[#cfcaf5] uppercase font-semibold">
                                {tool.badge}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-display text-lg sm:text-xl font-normal tracking-wide text-[#ffffff] leading-tight">
                                {tool.title}
                              </h4>
                              <p className="font-readable text-sm sm:text-base text-[#e2dffa] font-normal leading-snug line-clamp-2 mt-1">
                                {tool.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* FEATURED ROADMAP CARD */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#27187e] to-[#1b1059] border-2 border-[#cfcaf5]/40 shadow-xl flex items-center justify-between gap-4">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded bg-[#ffffff] text-[#27187e] font-readable text-xs font-bold uppercase tracking-wider mb-2">
                          New to Aquariums?
                        </span>
                        <h4 className="font-display text-xl sm:text-2xl text-[#ffffff] leading-snug">
                          Complete 10-Step Setup Roadmap
                        </h4>
                        <p className="font-readable text-sm sm:text-base text-[#e2dffa] font-normal mt-1 leading-relaxed">
                          Avoid common beginner mistakes before buying fish.
                        </p>
                      </div>

                      <Link
                        href="/start-aquarium"
                        onClick={closeMenu}
                        className="shrink-0 w-12 h-12 rounded-full bg-[#ffffff] hover:bg-[#cfcaf5] text-[#27187e] flex items-center justify-center transition-transform hover:scale-105 shadow-lg cursor-pointer"
                        aria-label="Start Beginner Roadmap"
                      >
                        <ArrowRight className="w-5 h-5" strokeWidth={2.4} />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* BOTTOM BAR INSIDE OVERLAY */}
            <div className="relative z-10 border-t border-[#cfcaf5]/20 py-4 bg-[#12093d]">
              <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-3 font-readable text-sm sm:text-base text-[#e2dffa]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Roshan Aquva World — The Free &amp; Systematic Aquarium Atlas.</span>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href="/privacy"
                    onClick={closeMenu}
                    className="hover:text-[#ffffff] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <span>•</span>
                  <Link
                    href="/terms"
                    onClick={closeMenu}
                    className="hover:text-[#ffffff] transition-colors"
                  >
                    Terms of Use
                  </Link>
                  <span>•</span>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="hover:text-[#ffffff] transition-colors"
                  >
                    Direct Support
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          INDEPENDENT SEARCH MODAL DIALOG
          ========================================================= */}
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
                  <Search className="w-5 h-5 text-[#27187e]" strokeWidth={2} aria-hidden="true" />
                  <span className="font-display text-xl text-[#27187e]">
                    SEARCH THE AQUARIUM ATLAS
                  </span>
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#edeafc] flex items-center justify-center text-[#27187e] hover:bg-[#27187e] hover:text-[#f7f7ff] transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative">
                <Search
                  className="w-5 h-5 text-[#27187e]/60 absolute left-4 top-1/2 -translate-y-1/2"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
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
                      className="px-3 py-1 rounded-lg bg-[#edeafc] text-[#27187e] hover:bg-[#27187e] hover:text-[#f7f7ff] transition-colors cursor-pointer"
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


