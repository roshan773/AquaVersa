"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Waves, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { fishData } from "@/data/fish";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const validFish = fishData.filter(f => f.slug && f.category);
  const fwFish = validFish.filter(f => f.category!.toLowerCase() === "freshwater");
  const swFish = validFish.filter(f => f.category!.toLowerCase() === "saltwater");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      closeMobileMenu();
    } else {
      router.push("/search");
      closeMobileMenu();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `text-xs font-semibold tracking-wider uppercase font-condensed py-1.5 px-3 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
      isActive 
        ? "text-[#27187E] bg-[#F7F7FF] font-bold shadow-md" 
        : "text-[#F7F7FF]/85 hover:text-[#F7F7FF] hover:bg-[#27187E]/60"
    }`;
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <header className={`pointer-events-auto transition-all duration-300 rounded-2xl flex items-center justify-between px-5 sm:px-7 py-3 max-w-6xl w-full ${
        isScrolled 
          ? "bg-[#0d0630]/95 backdrop-blur-md border border-[#27187E] shadow-2xl shadow-black/70" 
          : "bg-[#1c0e64]/90 backdrop-blur-md border border-[#27187E]/80 shadow-xl"
      }`}>
        
        {/* LOGO */}
        <Link 
          href="/" 
          onClick={closeMobileMenu}
          className="flex items-center gap-2.5 group focus:outline-none" 
          aria-label="Roshan Aquva World Home"
        >
          <div className="w-8 h-8 rounded-xl bg-[#F7F7FF] flex items-center justify-center text-[#27187E] group-hover:scale-105 transition-transform duration-200 shadow-md">
            <Waves className="w-5 h-5 text-[#27187E]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display text-lg sm:text-xl font-normal tracking-wider text-[#F7F7FF] group-hover:text-white transition-colors leading-none">
              ROSHAN <span className="text-[#aca1f7]">AQUVA</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#F7F7FF]/70 font-semibold leading-tight mt-0.5">
              Aquarium Guide
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary Navigation">
          <Link href="/" className={navLinkClass("/")}>
            <span>Home</span>
          </Link>

          {/* Fish Dropdown */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setActiveDropdown('fish')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link 
              href="/fish" 
              className={navLinkClass("/fish")}
              onClick={() => setActiveDropdown(null)}
            >
              <span>Fish</span>
              <span className="text-[10px] opacity-80">▾</span>
            </Link>

            <AnimatePresence>
              {activeDropdown === 'fish' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-10 left-1/2 -translate-x-1/2 w-[540px] bg-[#14094a] border border-[#3622a6] rounded-2xl p-5 shadow-2xl grid grid-cols-2 gap-4 z-50 text-left"
                >
                  <Link 
                    href="/fish/freshwater" 
                    onClick={() => setActiveDropdown(null)} 
                    className="p-3.5 rounded-xl bg-[#27187e]/60 border border-[#3622a6] hover:border-[#F7F7FF] hover:bg-[#27187e] transition-all group"
                  >
                    <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2.5 bg-[#0d0630]">
                      <Image 
                        src="/images/betta.png" 
                        alt="Freshwater fish collection" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" 
                        sizes="240px" 
                      />
                    </div>
                    <div className="font-condensed font-bold text-sm uppercase text-[#F7F7FF] group-hover:text-white transition-colors">
                      Freshwater Species →
                    </div>
                    <p className="text-[11px] text-[#F7F7FF]/70 mt-0.5">{fwFish.length} species profiles & tank requirements.</p>
                  </Link>

                  <Link 
                    href="/fish/saltwater" 
                    onClick={() => setActiveDropdown(null)} 
                    className="p-3.5 rounded-xl bg-[#27187e]/60 border border-[#3622a6] hover:border-[#F7F7FF] hover:bg-[#27187e] transition-all group"
                  >
                    <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2.5 bg-[#0d0630]">
                      <Image 
                        src="/images/clownfish.png" 
                        alt="Saltwater marine fish collection" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" 
                        sizes="240px" 
                      />
                    </div>
                    <div className="font-condensed font-bold text-sm uppercase text-[#F7F7FF] group-hover:text-white transition-colors">
                      Saltwater & Reef →
                    </div>
                    <p className="text-[11px] text-[#F7F7FF]/70 mt-0.5">{swFish.length} marine profiles & compatibility.</p>
                  </Link>

                  <div className="col-span-2 pt-2 border-t border-[#3622a6] flex justify-between items-center text-xs">
                    <span className="text-[#F7F7FF]/70 text-[11px]">Explore all species in one place:</span>
                    <Link 
                      href="/fish" 
                      onClick={() => setActiveDropdown(null)} 
                      className="text-[#aca1f7] hover:text-white hover:underline font-bold uppercase tracking-wider font-condensed"
                    >
                      View Complete Fish Library →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/plants" className={navLinkClass("/plants")}>
            <span>Plants</span>
          </Link>

          <Link href="/equipment" className={navLinkClass("/equipment")}>
            <span>Equipment</span>
          </Link>

          <Link href="/compatibility" className={navLinkClass("/compatibility")}>
            <span>Compatibility</span>
          </Link>

          <Link href="/tank-size" className={navLinkClass("/tank-size")}>
            <span>Tank Size</span>
          </Link>

          <Link href="/guides" className={navLinkClass("/guides")}>
            <span>Guides</span>
          </Link>

          <Link href="/about" className={navLinkClass("/about")}>
            <span>About</span>
          </Link>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2.5">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-[#aca1f7] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search fish, plants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-36 focus:w-52 transition-all duration-200 pl-8 pr-3 py-1.5 rounded-full bg-[#14094a] border border-[#3622a6] text-xs text-[#F7F7FF] placeholder-[#F7F7FF]/50 focus:outline-none focus:border-[#F7F7FF] focus:ring-1 focus:ring-[#F7F7FF]"
            />
          </form>

          {/* Ghost White Primary CTA Button */}
          <Link
            href="/start-aquarium"
            className="inline-flex items-center justify-center font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer bg-[#F7F7FF] hover:bg-white text-[#27187E] shadow-md hover:scale-105 active:scale-95"
          >
            <span>Start Setup</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-[#27187E]" />
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-[#27187e] border border-[#3622a6] text-[#F7F7FF] hover:text-white transition-colors"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-4 h-4 flex items-center justify-center origin-center"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.div>
          </button>
        </div>

      </header>

      {/* MOBILE FULL-SCREEN MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0d0630]/98 backdrop-blur-xl lg:hidden pointer-events-auto flex flex-col justify-between p-6 pt-24 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 max-w-md mx-auto w-full text-left">
              
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="w-4 h-4 text-[#aca1f7] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search species, guides, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c0e64] border border-[#3622a6] text-sm text-[#F7F7FF] placeholder-[#F7F7FF]/50 focus:outline-none focus:border-[#F7F7FF]"
                />
              </form>

              {/* Navigation Links */}
              <nav className="flex flex-col divide-y divide-[#27187e]/60 font-condensed uppercase tracking-wider text-base">
                <Link 
                  href="/" 
                  onClick={closeMobileMenu} 
                  className="py-3 flex items-center justify-between text-[#F7F7FF] hover:text-white"
                >
                  <span>Home</span>
                  <ArrowUpRight className="w-4 h-4 text-[#aca1f7]" />
                </Link>
                <Link 
                  href="/fish" 
                  onClick={closeMobileMenu} 
                  className="py-3 flex items-center justify-between text-[#F7F7FF] hover:text-white"
                >
                  <span>Fish Species Library</span>
                  <ArrowUpRight className="w-4 h-4 text-[#aca1f7]" />
                </Link>
                <Link 
                  href="/plants" 
                  onClick={closeMobileMenu} 
                  className="py-3 flex items-center justify-between text-[#F7F7FF] hover:text-white"
                >
                  <span>Aquatic Plants</span>
                  <ArrowUpRight className="w-4 h-4 text-[#aca1f7]" />
                </Link>
                <Link 
                  href="/equipment" 
                  onClick={closeMobileMenu} 
                  className="py-3 flex items-center justify-between text-[#F7F7FF] hover:text-white"
                >
                  <span>Equipment Guide</span>
                  <ArrowUpRight className="w-4 h-4 text-[#aca1f7]" />
                </Link>
                <Link 
                  href="/compatibility" 
                  onClick={closeMobileMenu} 
                  className="py-3 flex items-center justify-between text-[#F7F7FF] hover:text-white"
                >
                  <span>Compatibility Checker</span>
                  <ArrowUpRight className="w-4 h-4 text-[#aca1f7]" />
                </Link>
                <Link 
                  href="/tank-size" 
                  onClick={closeMobileMenu} 
                  className="py-3 flex items-center justify-between text-[#F7F7FF] hover:text-white"
                >
                  <span>Tank Size Guide</span>
                  <ArrowUpRight className="w-4 h-4 text-[#aca1f7]" />
                </Link>
                <Link 
                  href="/guides" 
                  onClick={closeMobileMenu} 
                  className="py-3 flex items-center justify-between text-[#F7F7FF] hover:text-white"
                >
                  <span>Care Guides & Articles</span>
                  <ArrowUpRight className="w-4 h-4 text-[#aca1f7]" />
                </Link>
                <Link 
                  href="/contact" 
                  onClick={closeMobileMenu} 
                  className="py-3 flex items-center justify-between text-[#F7F7FF] hover:text-white"
                >
                  <span>Contact & Questions</span>
                  <ArrowUpRight className="w-4 h-4 text-[#aca1f7]" />
                </Link>
              </nav>
            </div>

            <div className="max-w-md mx-auto w-full pt-6 border-t border-[#27187e]">
              <Link
                href="/start-aquarium"
                onClick={closeMobileMenu}
                className="w-full py-3.5 bg-[#F7F7FF] text-[#27187E] font-condensed font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <span>Start Aquarium Setup Guide</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
