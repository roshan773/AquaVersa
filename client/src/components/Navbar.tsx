import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Waves, Search, Menu, X } from 'lucide-react';

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
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/25 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-0">
        
        {/* Main Logo & Triggers Row */}
        <div className="flex items-center justify-between h-12 lg:h-20">
          
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

          {/* Right Actions - Desktop */}
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

          {/* Mobile triggers */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-slate-400 hover:text-sky-400 rounded-xl transition-colors cursor-pointer"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Expanding Dropdown (Pushes page content down natively) */}
        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-900 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-3">
              {links.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold text-center transition-all ${
                      isActive 
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' 
                        : 'bg-slate-900/40 text-slate-350 hover:bg-slate-900/80 hover:text-sky-400 border border-transparent'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <Link
              to="/fish"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3.5 text-center text-xs font-black uppercase tracking-wider rounded-xl bg-sky-500 text-slate-950 shadow-md shadow-sky-500/10"
            >
              Explore Species
            </Link>
          </div>
        )}

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
    </nav>
  );
};
export default Navbar;
