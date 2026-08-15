"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Fish, Search, Menu, X, Waves, Anchor, Settings } from "lucide-react";
import Image from "next/image";
import { equipmentData } from "@/data/equipment";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-cyan-500 p-1.5 rounded-lg group-hover:bg-cyan-400 transition-colors">
            <Waves className="w-5 h-5 text-slate-900" />
          </div>
          <span className="font-poppins font-bold text-xl tracking-tight">AquaGuide</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-cyan-600 transition-colors">Home</Link>
          <Link href="/about" className="text-sm font-medium hover:text-cyan-600 transition-colors">About Us</Link>
          
          <div
            className="relative h-16 flex items-center"
            onMouseEnter={() => setActiveDropdown('fish')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-sm font-medium hover:text-cyan-600 transition-colors flex items-center gap-1">
              Fish <span className="text-[10px] opacity-50">▼</span>
            </button>
            <AnimatePresence>
              {activeDropdown === 'fish' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-[800px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm grid grid-cols-2 gap-6 z-50"
                >
                  <Link href="/fish/freshwater" className="group flex flex-col gap-3 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-black/30 transition-all border border-transparent hover:border-border text-gray-900 dark:text-gray-100">
                    <div className="relative w-full h-32 rounded-lg overflow-hidden bg-blue-100 dark:bg-blue-950">
                      <Image 
                        src="/images/betta.png" 
                        alt="Freshwater" 
                        fill 
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-1.5 rounded-md">
                        <Droplets className="w-4 h-4 text-cyan-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-cyan-600 transition-colors">Freshwater Fish</h3>
                      <p className="text-sm text-muted-foreground mt-1">Explore colorful species perfect for planted aquariums.</p>
                      <p className="text-xs font-medium text-cyan-600 mt-2">150+ Species</p>
                    </div>
                  </Link>
                  
                  <Link href="/fish/saltwater" className="group flex flex-col gap-3 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-black/30 transition-all border border-transparent hover:border-border">
                    <div className="relative w-full h-32 rounded-lg overflow-hidden bg-blue-100 dark:bg-blue-950">
                      <Image 
                        src="/images/angelfish.png" 
                        alt="Saltwater" 
                        fill 
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-1.5 rounded-md">
                        <Anchor className="w-4 h-4 text-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">Saltwater Fish</h3>
                      <p className="text-sm text-muted-foreground mt-1">Discover marine life for your reef or fish-only setup.</p>
                      <p className="text-xs font-medium text-blue-600 mt-2">80+ Species</p>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/equipment" className="text-sm font-medium hover:text-cyan-600 transition-colors">Equipment</Link>

          <Link href="/plants" className="text-sm font-medium hover:text-cyan-600 transition-colors">Plants</Link>
          <Link href="/diseases" className="text-sm font-medium hover:text-cyan-600 transition-colors">Diseases</Link>
        </div>

          {/* Modern Search Bar */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-3 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </form>
            <button className="md:hidden p-2 rounded-full hover:bg-muted transition-colors" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <Link href="/" className="font-medium p-2 rounded-md hover:bg-muted">Home</Link>
              <Link href="/about" className="font-medium p-2 rounded-md hover:bg-muted">About Us</Link>
              <div className="font-medium p-2 rounded-md">
                <span className="text-muted-foreground mb-2 block text-sm">Fish</span>
                <div className="flex flex-col gap-2 pl-4 border-l-2 border-muted">
                  <Link href="/fish/freshwater" className="p-2 hover:bg-muted rounded-md flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-500" /> Freshwater
                  </Link>
                  <Link href="/fish/saltwater" className="p-2 hover:bg-muted rounded-md flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-blue-500" /> Saltwater
                  </Link>
                </div>
              </div>
              <Link href="/equipment" className="font-medium p-2 rounded-md hover:bg-muted">Equipment</Link>
              <Link href="/plants" className="font-medium p-2 rounded-md hover:bg-muted">Plants</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
