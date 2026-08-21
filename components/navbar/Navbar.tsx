"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Search, Menu, X, Waves, Anchor, Leaf as LeafIcon, Settings as SettingsIcon } from "lucide-react";
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

  const linkClass = `text-sm font-medium transition-colors duration-300 ${isScrolled
      ? "text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400"
      : "text-white/95 hover:text-cyan-300"
    }`;

  const btnClass = `text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${isScrolled
      ? "text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400"
      : "text-white/95 hover:text-cyan-300"
    }`;

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? "glass border-b border-border shadow-sm"
        : "bg-transparent border-transparent shadow-none"
      }`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-cyan-500 p-1.5 rounded-lg group-hover:bg-cyan-400 transition-colors">
            <Waves className="w-5 h-5 text-slate-900" />
          </div>
          <span className={`font-poppins font-bold text-xl tracking-tight transition-colors duration-300 ${isScrolled ? "text-slate-900 dark:text-white" : "text-white"
            }`}>
            AquaVersa
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className={linkClass}>Home</Link>
          
          {/* Fish Dropdown */}
          <div
            className="relative h-16 flex items-center"
            onMouseEnter={() => setActiveDropdown('fish')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={btnClass}>
              Fish <span className="text-[10px] opacity-60">▼</span>
            </button>
            <AnimatePresence>
              {activeDropdown === 'fish' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-[800px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm grid grid-cols-2 gap-6 z-50 animate-in fade-in zoom-in-95 duration-200"
                >
                  <div className="group flex flex-col gap-3 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-black/30 transition-all border border-transparent hover:border-border text-gray-900 dark:text-gray-100 text-left">
                    <Link href="/fish/freshwater" className="block relative w-full h-32 rounded-lg overflow-hidden bg-blue-100 dark:bg-blue-950">
                      <Image
                        src="/images/betta.png"
                        alt="Freshwater"
                        fill
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-1.5 rounded-md">
                        <Droplets className="w-4 h-4 text-cyan-500" />
                      </div>
                    </Link>
                    <div>
                      <Link href="/fish/freshwater" className="inline-block group-hover:text-cyan-600 transition-colors">
                        <h3 className="font-semibold text-lg">Freshwater Fish</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">Explore colorful species perfect for planted aquariums.</p>
                      <p className="text-xs font-semibold text-cyan-600 mt-2 mb-3">{fwFish.length} Species Available</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                        {fwFish.slice(0, 6).map((fish) => (
                          <Link
                            key={fish.id}
                            href={`/fish/freshwater/${fish.slug}`}
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors truncate"
                            onClick={() => setActiveDropdown(null)}
                          >
                            • {fish.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="group flex flex-col gap-3 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-black/30 transition-all border border-transparent hover:border-border text-gray-900 dark:text-gray-100 text-left">
                    <Link href="/fish/saltwater" className="block relative w-full h-32 rounded-lg overflow-hidden bg-blue-100 dark:bg-blue-950">
                      <Image
                        src="/images/angelfish.png"
                        alt="Saltwater"
                        fill
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-1.5 rounded-md">
                        <Anchor className="w-4 h-4 text-blue-500" />
                      </div>
                    </Link>
                    <div>
                      <Link href="/fish/saltwater" className="inline-block group-hover:text-blue-600 transition-colors">
                        <h3 className="font-semibold text-lg">Saltwater Fish</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">Discover marine life for your reef or fish-only setup.</p>
                      <p className="text-xs font-semibold text-blue-600 mt-2 mb-3">{swFish.length} Species Available</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                        {swFish.slice(0, 6).map((fish) => (
                          <Link
                            key={fish.id}
                            href={`/fish/saltwater/${fish.slug}`}
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
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
              Guides <span className="text-[10px] opacity-60">▼</span>
            </button>
            <AnimatePresence>
              {activeDropdown === 'guides' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm z-50 text-left flex flex-col gap-1.5"
                >
                  <Link href="/guides" className="px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>All Guides</Link>
                  <Link href="/start-aquarium" className="px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>First Aquarium Setup</Link>
                  <Link href="/water-params" className="px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>Water Chemistry</Link>
                  <Link href="/diseases" className="px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>Diseases Guide</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tools Dropdown */}
          <div
            className="relative h-16 flex items-center"
            onMouseEnter={() => setActiveDropdown('tools')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={btnClass}>
              Tools <span className="text-[10px] opacity-60">▼</span>
            </button>
            <AnimatePresence>
              {activeDropdown === 'tools' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-16 right-0 w-[480px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm z-50 text-left grid grid-cols-2 gap-x-6 gap-y-1.5"
                >
                  <div className="col-span-2 border-b border-border pb-2 mb-2 font-bold text-xs text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                    Interactive Toolkit
                  </div>
                  <Link href="/tank-size" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>📐 Aquarium Calculator</Link>
                  <Link href="/water-analyzer" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>🧪 Water Analyzer</Link>
                  <Link href="/compatibility" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>⚖️ Fish Compatibility</Link>
                  <Link href="/stocking-planner" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>📊 Stocking Planner</Link>
                  <Link href="/fish-finder" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>🔍 Fish Recommendation Wizard</Link>
                  <Link href="/equipment-wizard" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>⚙️ Equipment Wizard</Link>
                  <Link href="/budget-calculator" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>💵 Budget Calculator</Link>
                  <Link href="/aquascape-planner" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>🪵 Aquascape Planner</Link>
                  <Link href="/symptom-checker" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>🩺 Symptom Checker</Link>
                  <Link href="/quiz" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setActiveDropdown(null)}>🎓 Aquarium Science Quiz</Link>
                  <Link href="/achievements" className="p-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg col-span-2 border-t border-border mt-2 pt-2 text-center text-cyan-600 dark:text-cyan-400 font-bold" onClick={() => setActiveDropdown(null)}>🏆 View Your Achievements</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Modern Search Bar */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${isScrolled ? "text-slate-400" : "text-white/60"
              }`} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-28 sm:w-36 lg:w-48 pl-10 pr-3 py-2 rounded-full border text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${isScrolled
                  ? "bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 border-border"
                  : "bg-white/10 text-white placeholder-white/50 border-white/20 focus:bg-white/20"
                }`}
            />
          </form>
          <button className={`lg:hidden p-2 rounded-full transition-colors ${isScrolled ? "hover:bg-muted text-slate-800 dark:text-slate-200" : "hover:bg-white/15 text-white"
             }`} onClick={toggleMobileMenu}>
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
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 top-16 bg-black/60 z-30 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-16 right-0 w-full sm:w-80 h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-lg border-l border-border shadow-2xl z-40 overflow-y-auto lg:hidden"
            >
              <div className="flex flex-col p-6 gap-6 text-left">
                <Link href="/" className="font-semibold text-lg hover:text-cyan-500 transition-colors" onClick={toggleMobileMenu}>Home</Link>

                <div className="border-t border-border pt-4">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-bold mb-3 block">Species Library</span>
                  <div className="flex flex-col gap-3 pl-2">
                    <Link href="/fish/freshwater" className="font-semibold text-base hover:text-cyan-500 transition-colors flex items-center gap-2" onClick={toggleMobileMenu}>
                      <Droplets className="w-5 h-5 text-cyan-500" /> Freshwater Fish
                    </Link>
                    <Link href="/fish/saltwater" className="font-semibold text-base hover:text-blue-500 transition-colors flex items-center gap-2" onClick={toggleMobileMenu}>
                      <Anchor className="w-5 h-5 text-blue-500" /> Saltwater Fish
                    </Link>
                    <Link href="/plants" className="font-semibold text-base hover:text-emerald-500 transition-colors flex items-center gap-2" onClick={toggleMobileMenu}>
                      <LeafIcon className="w-5 h-5 text-emerald-500" /> Aquatic Plants
                    </Link>
                    <Link href="/equipment" className="font-semibold text-base hover:text-amber-500 transition-colors flex items-center gap-2" onClick={toggleMobileMenu}>
                      <SettingsIcon className="w-5 h-5 text-amber-500" /> Equipment Gear
                    </Link>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-bold mb-3 block">Setup Guides</span>
                  <div className="flex flex-col gap-3 pl-2">
                    <Link href="/start-aquarium" className="text-sm font-semibold hover:text-cyan-500" onClick={toggleMobileMenu}>• First Setup Guide</Link>
                    <Link href="/water-params" className="text-sm font-semibold hover:text-cyan-500" onClick={toggleMobileMenu}>• Water Chemistry Guide</Link>
                    <Link href="/diseases" className="text-sm font-semibold hover:text-cyan-500" onClick={toggleMobileMenu}>• Diseases & Treatments</Link>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-bold mb-3 block">Interactive Tools</span>
                  <div className="grid grid-cols-1 gap-3 pl-2 text-sm font-semibold">
                    <Link href="/tank-size" className="hover:text-cyan-500" onClick={toggleMobileMenu}>📐 Aquarium Calculator</Link>
                    <Link href="/water-analyzer" className="hover:text-cyan-500" onClick={toggleMobileMenu}>🧪 Water Analyzer</Link>
                    <Link href="/compatibility" className="hover:text-cyan-500" onClick={toggleMobileMenu}>⚖️ Compatibility Checker</Link>
                    <Link href="/stocking-planner" className="hover:text-cyan-500" onClick={toggleMobileMenu}>📊 Stocking Planner</Link>
                    <Link href="/fish-finder" className="hover:text-cyan-500" onClick={toggleMobileMenu}>🔍 Fish Recommendation</Link>
                    <Link href="/equipment-wizard" className="hover:text-cyan-500" onClick={toggleMobileMenu}>⚙️ Equipment Wizard</Link>
                    <Link href="/budget-calculator" className="hover:text-cyan-500" onClick={toggleMobileMenu}>💵 Budget Calculator</Link>
                    <Link href="/aquascape-planner" className="hover:text-cyan-500" onClick={toggleMobileMenu}>🪵 Aquascape Planner</Link>
                    <Link href="/symptom-checker" className="hover:text-cyan-500" onClick={toggleMobileMenu}>🩺 Symptom Checker</Link>
                    <Link href="/quiz" className="hover:text-cyan-500 border-t border-border pt-3 mt-1" onClick={toggleMobileMenu}>🎓 Aquarium Quiz</Link>
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
