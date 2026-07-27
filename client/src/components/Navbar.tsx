import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Waves, Search, Menu, X, 
  Compass, Wrench, BookOpen, 
  FileText, HelpCircle, ChevronRight 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const links = [
    { href: '/', label: 'Home', desc: 'Return to dashboard & news feed', icon: Waves },
    { href: '/fish', label: 'Fish Encyclopedia', desc: 'Browse tropical fish species catalog', icon: Compass },
    { href: '/equipment', label: 'Equipment Match', desc: 'Filter, heater & tank calculators', icon: Wrench },
    { href: '/guides', label: 'Learn & Diagnose', desc: 'Expert care guides & disease diagnostics', icon: BookOpen },
    { href: '/blog', label: 'FishVersa Blog', desc: 'Latest articles & aquascaping secrets', icon: FileText },
    { href: '/about', label: 'Our Mission', desc: 'Founded to simplify ecosystem chemistry', icon: HelpCircle },
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
        
        {/* Main Logo & Triggers Row */}
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
      </div>

      {/* Mobile Glassmorphic Overlay Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-[#030712]/98 backdrop-blur-xl border-b border-slate-900 shadow-2xl p-5 space-y-5 animate-in slide-in-from-top-3 duration-250 max-h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Column list of items */}
          <div className="flex flex-col space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/30 border border-slate-900/40 hover:bg-slate-900/60 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl border ${
                      isActive 
                        ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' 
                        : 'bg-slate-950 text-slate-450 border-slate-850 group-hover:text-sky-400'
                    } transition-all`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-left">
                      <span className={`block text-xs font-bold ${
                        isActive ? 'text-sky-400' : 'text-slate-200 group-hover:text-sky-400'
                      } transition-all`}>
                        {link.label}
                      </span>
                      <span className="block text-[9px] text-slate-500 font-semibold mt-0.5 leading-none">
                        {link.desc}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/fish"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3.5 text-center text-xs font-black uppercase tracking-wider rounded-2xl bg-sky-500 hover:bg-sky-600 text-slate-950 shadow-md shadow-sky-500/10 transition-all btn-glow-cyan"
            >
              Explore Species Catalog
            </Link>
          </div>
        </div>
      )}

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
