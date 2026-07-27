import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Waves, Search, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/fish', label: 'Fish Encyclopedia' },
    { href: '/equipment', label: 'Equipment' },
    { href: '/guides', label: 'Learn' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <Waves className="h-8 w-8 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-sky-400 via-blue-450 to-emerald-400 bg-clip-text text-transparent">
                FishVersa
              </span>
            </Link>
          </div>

          {/* Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-bold transition-all duration-200 ${
                    isActive ? 'text-sky-400 shadow-sky-400/10' : 'text-slate-350 hover:text-sky-400'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2.5 text-slate-400 hover:text-sky-400 rounded-xl hover:bg-slate-900/60 transition-colors cursor-pointer"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* CTA Button */}
            <Link
              to="/fish"
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-sky-500 hover:bg-sky-600 transition-all duration-200 text-slate-950 shadow-md shadow-sky-500/10 border border-sky-400/20 btn-glow-cyan"
            >
              Explore Species
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2.5 text-slate-400 hover:text-sky-400 rounded-xl transition-colors cursor-pointer"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>
      </div>

      {/* Global Search Overlay dropdown */}
      {showSearch && (
        <div className="bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 p-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search the entire encyclopedia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 pl-11 text-sm text-slate-200 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-450 transition-all"
                autoFocus
              />
              <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-500" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-xs font-bold text-slate-400 hover:text-sky-400"
                >
                  Clear
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#030712] flex flex-col justify-between p-8 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2.5 group">
                <Waves className="h-8 w-8 text-sky-400" />
                <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-sky-400 via-blue-450 to-emerald-400 bg-clip-text text-transparent">
                  FishVersa
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-sky-400 hover:bg-slate-900/60 rounded-xl transition-all cursor-pointer"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            {/* Centered Navigation Links */}
            <div className="flex flex-col space-y-6 items-center my-auto">
              {links.map((link, idx) => {
                const isActive = location.pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-black tracking-wide transition-all ${
                        isActive 
                          ? 'text-sky-400' 
                          : 'text-slate-350 hover:text-sky-400'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="w-full space-y-6 text-center">
              <Link
                to="/fish"
                onClick={() => setIsOpen(false)}
                className="block w-full py-4 text-center text-xs font-black uppercase tracking-widest rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 shadow-md shadow-sky-500/10 btn-glow-cyan transition-all"
              >
                Explore Species
              </Link>
              <p className="text-[10px] text-slate-650 font-bold uppercase tracking-wider">
                &copy; {new Date().getFullYear()} FishVersa. All rights reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
