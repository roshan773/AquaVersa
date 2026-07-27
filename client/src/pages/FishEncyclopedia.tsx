import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchFishes } from '../services/api';
import { Search, SlidersHorizontal, X, Loader2, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export const FishEncyclopedia: React.FC = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [waterType, setWaterType] = useState('');
  const [temperament, setTemperament] = useState('');
  const [minTankSize, setMinTankSize] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleFilterChange = (setter: Function, value: string) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setDifficulty('');
    setWaterType('');
    setTemperament('');
    setMinTankSize('');
    setPage(1);
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['fishes', debouncedSearch, difficulty, waterType, temperament, minTankSize, page],
    queryFn: () => fetchFishes({
      search: debouncedSearch,
      difficulty,
      waterType,
      temperament,
      minTankSize,
      page,
      limit: 12
    })
  });

  const fishes = data?.fishes || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1, total: 0 };

  const difficultyColors: Record<string, string> = {
    Beginner: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
    Intermediate: 'border-sky-500/20 text-sky-400 bg-sky-500/5',
    Advanced: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 relative z-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Care Guide Database</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-100">
          Find the Perfect <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">Tank Mates</span>
        </h1>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Search the world's most complete aquarium care directory. Filter by water chemistry, care levels, and temperament values.
        </p>
      </div>

      {/* Control Panel */}
      <div className="glass rounded-3xl p-4 space-y-4 bg-slate-950/40 border border-slate-900/60 shadow-lg shadow-black/25">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search fish (e.g., Neon Tetra, Guppy, Betta)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/60 border border-slate-800 focus:outline-none focus:border-sky-400 text-sm font-semibold text-slate-200 transition-all"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-sky-400 rounded-full hover:bg-slate-850 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-350 hover:text-sky-400 transition-all font-bold text-sm cursor-pointer"
          >
            <SlidersHorizontal className="h-4.5 w-4.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Extended Filter Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-900/60">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-550">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => handleFilterChange(setDifficulty, e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
              >
                <option value="">Any Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-555">Water Type</label>
              <select
                value={waterType}
                onChange={(e) => handleFilterChange(setWaterType, e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
              >
                <option value="">Any Water</option>
                <option value="Freshwater">Freshwater</option>
                <option value="Brackish">Brackish</option>
                <option value="Saltwater">Saltwater</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-555">Temperament</label>
              <select
                value={temperament}
                onChange={(e) => handleFilterChange(setTemperament, e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
              >
                <option value="">Any Temperament</option>
                <option value="Peaceful">Peaceful</option>
                <option value="Semi-Aggressive">Semi-Aggressive</option>
                <option value="Aggressive">Aggressive</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-555">Max Tank Size</label>
              <select
                value={minTankSize}
                onChange={(e) => handleFilterChange(setMinTankSize, e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
              >
                <option value="">Any Size</option>
                <option value="10">Under 10 Gallons</option>
                <option value="20">Under 20 Gallons</option>
                <option value="30">Under 30 Gallons</option>
                <option value="50">Under 50 Gallons</option>
                <option value="75">Under 75 Gallons</option>
              </select>
            </div>

            <div className="sm:col-span-2 md:col-span-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-rose-450 hover:text-rose-400 transition-colors py-1 cursor-pointer flex items-center space-x-1"
              >
                <X className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Loading indicator */}
      {(isLoading || isFetching) && (
        <div className="flex items-center justify-center space-x-2.5 text-sky-400 py-10 font-bold text-sm">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Fetching species care databases...</span>
        </div>
      )}

      {/* Species Grid */}
      {!isLoading && fishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fishes.map((fish: any) => (
            <Link
              key={fish._id}
              to={`/fish/${fish.slug}`}
              className="glass rounded-3xl overflow-hidden block glass-hover flex flex-col h-full bg-slate-950/40 border border-slate-900/60 group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-950/20 border-b border-slate-900/60">
                <img
                  src={fish.images?.[0] || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=300'}
                  alt={fish.commonName}
                  className="object-cover w-full h-full filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 text-[9px] font-extrabold px-2.5 py-1 rounded-md border tracking-wider uppercase ${difficultyColors[fish.difficulty] || 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  {fish.difficulty}
                </span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-200 group-hover:text-sky-400 transition-colors leading-tight">
                    {fish.commonName}
                  </h3>
                  <p className="text-xs italic text-slate-400 font-semibold mt-1">
                    {fish.scientificName}
                  </p>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-900/60 text-[11px] font-semibold text-slate-350">
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[9px] block">Tank Size</span>
                    <span>{fish.minTankSize.gallons} Gal ({fish.minTankSize.liters} L)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[9px] block">Temp Range</span>
                    <span>{fish.waterParams.tempMin}°C - {fish.waterParams.tempMax}°C</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[9px] block">pH level</span>
                    <span>{fish.waterParams.phMin} - {fish.waterParams.phMax}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[9px] block">Temperament</span>
                    <span>{fish.temperament}</span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-20 bg-slate-950/20 border border-slate-900/80 rounded-3xl space-y-4 max-w-md mx-auto">
            <Compass className="h-12 w-12 text-slate-500 mx-auto" />
            <p className="text-slate-400 font-bold text-sm">No species profiles found matching those filter selections.</p>
            <button 
              onClick={clearFilters}
              className="px-5 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl hover:bg-slate-900 text-sky-400 text-xs font-bold transition-all cursor-pointer"
            >
              Clear Search Criteria
            </button>
          </div>
        )
      )}

      {/* Pagination */}
      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-900/60 pt-6">
          <div className="text-xs font-bold text-slate-400">
            Page {pagination.page} of {pagination.totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center justify-center p-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-350 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="flex items-center justify-center p-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-350 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
export default FishEncyclopedia;
