"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Search, Menu, X, Waves, Anchor, Leaf as LeafIcon, Settings as SettingsIcon, Compass } from "lucide-react";
import Image from "next/image";
import { fishData } from "@/data/fish";

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

  const linkClass = "text-sm font-medium tracking-normal transition-colors duration-200 text-slate-800 hover:text-cyan-500 cursor-pointer";
  const btnClass = "text-sm font-medium tracking-normal transition-colors duration-200 flex items-center gap-1.5 text-slate-800 hover:text-cyan-500 cursor-pointer focus:outline-none";

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 ${
      isScrolled ? "py-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]" : "py-3.5"
    }`}>
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-cyan-500/10 p-2 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
            <Waves className="w-5 h-5 text-cyan-500" />
          </div>
          <span className="font-poppins font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            AquaVersa
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className={linkClass}>Home</Link>
          
          {/* Explore (Tools) Dropdown */}
          <div
            className="relative h-16 flex items-center"
            onMouseEnter={() => setActiveDropdown('explore')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={btnClass}>
              Explore <span className="text-[9px] opacity-50">▼</span>
            </button>
            <AnimatePresence>
              {activeDropdown === 'explore' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-16 right-1/2 translate-x-1/2 w-[520px] bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-lg z-50 text-left grid grid-cols-2 gap-x-6 gap-y-1.5"
                >
                  <div className="col-span-2 border-b border-slate-200/60 dark:border-slate-800 pb-2 mb-2 font-poppins font-bold text-xs text-cyan-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> Interactive Toolkit
                  </div>
                  <Link href="/tank-size" className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>📐 Aquarium Calculator</Link>
                  <Link href="/water-analyzer" className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>🧪 Water Analyzer</Link>
                  <Link href="/compatibility" className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>⚖️ Fish Compatibility</Link>
                  <Link href="/stocking-planner" className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>📊 Stocking Planner</Link>
                  <Link href="/fish-finder" className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>🔍 Fish Recommendation</Link>
                  <Link href="/equipment-wizard" className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>⚙️ Equipment Wizard</Link>
                  <Link href="/budget-calculator" className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>💵 Budget Calculator</Link>
                  <Link href="/aquascape-planner" className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>🪵 Aquascape Planner</Link>
                  <Link href="/symptom-checker" className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>🩺 Symptom Checker</Link>
                  <Link href="/quiz" className="p-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>🎓 Science Quiz</Link>
                  <Link href="/achievements" className="p-2 text-xs font-bold text-cyan-500 hover:text-cyan-600 rounded-lg col-span-2 border-t border-slate-200/60 dark:border-slate-800 mt-2 pt-2 text-center" onClick={() => setActiveDropdown(null)}>🏆 View Your Achievements</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fish Dropdown */}
          <div
            className="relative h-16 flex items-center"
            onMouseEnter={() => setActiveDropdown('fish')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={btnClass}>
              Fish <span className="text-[9px] opacity-50">▼</span>
            </button>
            <AnimatePresence>
              {activeDropdown === 'fish' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-[720px] bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-lg grid grid-cols-2 gap-5 z-50 text-left"
                >
                  <div className="group flex flex-col gap-2.5 p-3 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-all border border-transparent">
                    <Link href="/fish/freshwater" className="block relative w-full h-24 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/20">
                      <Image
                        src="/images/betta.png"
                        alt="Freshwater"
                        fill
                        className="object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
                        sizes="320px"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200/35">
                        <Droplets className="w-3.5 h-3.5 text-cyan-500" />
                      </div>
                    </Link>
                    <div>
                      <Link href="/fish/freshwater" className="inline-block hover:text-cyan-500 transition-colors">
                        <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Freshwater Fish</h3>
                      </Link>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">Explore colorful species perfect for planted aquariums.</p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3 pt-2.5 border-t border-slate-200/50 dark:border-slate-800">
                        {fwFish.slice(0, 4).map((fish) => (
                          <Link
                            key={fish.id}
                            href={`/fish/freshwater/${fish.slug}`}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors truncate"
                            onClick={() => setActiveDropdown(null)}
                          >
                            • {fish.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="group flex flex-col gap-2.5 p-3 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-all border border-transparent">
                    <Link href="/fish/saltwater" className="block relative w-full h-24 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/20">
                      <Image
                        src="/images/angelfish.png"
                        alt="Saltwater"
                        fill
                        className="object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
                        sizes="320px"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200/35">
                        <Anchor className="w-3.5 h-3.5 text-cyan-500" />
                      </div>
                    </Link>
                    <div>
                      <Link href="/fish/saltwater" className="inline-block hover:text-cyan-500 transition-colors">
                        <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Saltwater Fish</h3>
                      </Link>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">Discover marine life for your reef or fish-only setup.</p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3 pt-2.5 border-t border-slate-200/50 dark:border-slate-800">
                        {swFish.slice(0, 4).map((fish) => (
                          <Link
                            key={fish.id}
                            href={`/fish/saltwater/${fish.slug}`}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors truncate"
                            onClick={() => setActiveDropdown(null)}
                          >
                            • {fish.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/plants" className={linkClass}>Plants</Link>
          <Link href="/equipment" className={linkClass}>Equipment</Link>

          {/* Guides Dropdown */}
          <div
            className="relative h-16 flex items-center"
            onMouseEnter={() => setActiveDropdown('guides')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={btnClass}>
              Guides <span className="text-[9px] opacity-50">▼</span>
            </button>
            <AnimatePresence>
              {activeDropdown === 'guides' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-48 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3 shadow-lg z-50 text-left flex flex-col gap-1"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href="/guides" className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>All Guides</Link>
                  <Link href="/start-aquarium" className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>First Aquarium Setup</Link>
                  <Link href="/water-params" className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>Water Chemistry</Link>
                  <Link href="/diseases" className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 rounded-lg" onClick={() => setActiveDropdown(null)}>Diseases Guide</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/contact" className={linkClass}>Contact</Link>
        </div>

        {/* Search Bar & Mobile Burger */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides, fish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-36 sm:w-44 lg:w-56 pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-slate-50 dark:focus:bg-slate-950 transition-all duration-200"
            />
          </form>
          <button className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 top-16 bg-black/40 z-30 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed top-16 right-0 w-full sm:w-80 h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-40 overflow-y-auto lg:hidden"
            >
              <div className="flex flex-col p-6 gap-6 text-left">
                <Link href="/" className="font-semibold text-base text-slate-900 dark:text-white hover:text-cyan-500 transition-colors" onClick={toggleMobileMenu}>Home</Link>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold mb-3 block font-poppins">Species Library</span>
                  <div className="flex flex-col gap-3.5 pl-2">
                    <Link href="/fish/freshwater" className="font-medium text-sm text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors flex items-center gap-2" onClick={toggleMobileMenu}>
                      <Droplets className="w-4 h-4 text-cyan-500" /> Freshwater Fish
                    </Link>
                    <Link href="/fish/saltwater" className="font-medium text-sm text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors flex items-center gap-2" onClick={toggleMobileMenu}>
                      <Anchor className="w-4 h-4 text-cyan-500" /> Saltwater Fish
                    </Link>
                    <Link href="/plants" className="font-medium text-sm text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors flex items-center gap-2" onClick={toggleMobileMenu}>
                      <LeafIcon className="w-4 h-4 text-cyan-500" /> Aquatic Plants
                    </Link>
                    <Link href="/equipment" className="font-medium text-sm text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors flex items-center gap-2" onClick={toggleMobileMenu}>
                      <SettingsIcon className="w-4 h-4 text-cyan-500" /> Equipment Gear
                    </Link>
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold mb-3 block font-poppins">Setup Guides</span>
                  <div className="flex flex-col gap-3 pl-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <Link href="/start-aquarium" className="hover:text-cyan-500" onClick={toggleMobileMenu}>• First Setup Guide</Link>
                    <Link href="/water-params" className="hover:text-cyan-500" onClick={toggleMobileMenu}>• Water Chemistry Guide</Link>
                    <Link href="/diseases" className="hover:text-cyan-500" onClick={toggleMobileMenu}>• Diseases & Treatments</Link>
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold mb-3 block font-poppins">Interactive Tools</span>
                  <div className="grid grid-cols-1 gap-3.5 pl-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <Link href="/tank-size" className="hover:text-cyan-500" onClick={toggleMobileMenu}>📐 Aquarium Calculator</Link>
                    <Link href="/water-analyzer" className="hover:text-cyan-500" onClick={toggleMobileMenu}>🧪 Water Analyzer</Link>
                    <Link href="/compatibility" className="hover:text-cyan-500" onClick={toggleMobileMenu}>⚖️ Compatibility Checker</Link>
                    <Link href="/stocking-planner" className="hover:text-cyan-500" onClick={toggleMobileMenu}>📊 Stocking Planner</Link>
                    <Link href="/fish-finder" className="hover:text-cyan-500" onClick={toggleMobileMenu}>🔍 Fish Recommendation</Link>
                    <Link href="/equipment-wizard" className="hover:text-cyan-500" onClick={toggleMobileMenu}>⚙️ Equipment Wizard</Link>
                    <Link href="/budget-calculator" className="hover:text-cyan-500" onClick={toggleMobileMenu}>💵 Budget Calculator</Link>
                    <Link href="/aquascape-planner" className="hover:text-cyan-500" onClick={toggleMobileMenu}>🪵 Aquascape Planner</Link>
                    <Link href="/symptom-checker" className="hover:text-cyan-500" onClick={toggleMobileMenu}>🩺 Symptom Checker</Link>
                    <Link href="/quiz" className="hover:text-cyan-500 border-t border-slate-200 dark:border-slate-800 pt-3 mt-1" onClick={toggleMobileMenu}>🎓 Aquarium Quiz</Link>
                    <Link href="/achievements" className="text-cyan-500 font-bold" onClick={toggleMobileMenu}>🏆 View Achievements</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
