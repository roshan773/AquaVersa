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

      {/* Mobile sliding drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Sidebar Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 bg-slate-950/95 backdrop-blur-xl border-l border-slate-900/80 shadow-2xl flex flex-col p-6 space-y-6 lg:hidden"
            >
              {/* Close Button Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-900">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-sky-400 via-blue-450 to-emerald-400 bg-clip-text text-transparent">
                  FishVersa
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-sky-400 hover:bg-slate-900/60 rounded-xl transition-all cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Links List */}
              <div className="flex-grow flex flex-col space-y-2 pt-4">
                {links.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-bold transition-all flex items-center ${
                        isActive 
                          ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-400' 
                          : 'text-slate-300 hover:bg-slate-900/40 hover:text-sky-400'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Action Button inside Drawer */}
              <div className="pt-6 border-t border-slate-900">
                <Link
                  to="/fish"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 shadow-md shadow-sky-500/10 btn-glow-cyan transition-all"
                >
                  Explore Species
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
