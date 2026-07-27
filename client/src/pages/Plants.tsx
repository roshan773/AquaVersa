import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchPlants } from '../services/api';
import { Search, SlidersHorizontal, X, Loader2, Leaf } from 'lucide-react';

export const Plants: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [co2Needs, setCo2Needs] = useState('');
  const [lightingNeeds, setLightingNeeds] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: plants = [], isLoading } = useQuery({
    queryKey: ['plants', search, category, difficulty, co2Needs, lightingNeeds, growthRate],
    queryFn: () => fetchPlants({
      search: search || undefined,
      category: category || undefined,
      difficulty: difficulty || undefined,
      co2Needs: co2Needs || undefined,
      lightingNeeds: lightingNeeds || undefined,
      growthRate: growthRate || undefined
    })
  });

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setDifficulty('');
    setCo2Needs('');
    setLightingNeeds('');
    setGrowthRate('');
  };

  const diffColors: Record<string, string> = {
    Easy: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
    Medium: 'border-sky-500/20 text-sky-450 bg-sky-500/5',
    Hard: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 relative z-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Flora Directory</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-100">
          Aquarium Plant <span className="bg-gradient-to-r from-sky-400 to-emerald-450 bg-clip-text text-transparent">Encyclopedia</span>
        </h1>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Discover low-tech plants, carpeting foreground grasses, and check compatibility parameters with live plant species.
        </p>
      </div>

      {/* Control Panel */}
      <div className="glass rounded-3xl p-4 space-y-4 bg-slate-950/40 border border-slate-900/60 shadow-lg shadow-black/25">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search plants (e.g., Java Fern, Amazon Sword, Anubias)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/60 border border-slate-800 focus:outline-none focus:border-sky-400 text-sm font-semibold text-slate-200 transition-colors"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-350 hover:text-sky-400 transition-all font-bold text-sm cursor-pointer"
          >
            <SlidersHorizontal className="h-4.5 w-4.5" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-slate-900/60 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
              >
                <option value="">All Categories</option>
                <option value="Foreground">Foreground</option>
                <option value="Midground">Midground</option>
                <option value="Background">Background</option>
                <option value="Floating">Floating</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
              >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">CO2 Requirements</label>
              <select
                value={co2Needs}
                onChange={(e) => setCo2Needs(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
              >
                <option value="">All Types</option>
                <option value="true">Requires CO2</option>
                <option value="false">Low Tech (No CO2)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Lighting</label>
              <select
                value={lightingNeeds}
                onChange={(e) => setLightingNeeds(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
              >
                <option value="">All Lighting</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Growth Rate</label>
              <select
                value={growthRate}
                onChange={(e) => setGrowthRate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
              >
                <option value="">Any Speed</option>
                <option value="Slow">Slow</option>
                <option value="Medium">Medium</option>
                <option value="Fast">Fast</option>
              </select>
            </div>

            <div className="md:col-span-5 flex justify-end">
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

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-sky-400 py-10 font-bold text-sm">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Fetching aquatic plants directories...</span>
        </div>
      )}

      {/* Grid */}
      {!isLoading && plants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant: any) => (
            <Link
              key={plant._id}
              to={`/plants/${plant.slug}`}
              className="glass rounded-3xl overflow-hidden block glass-hover flex flex-col h-full bg-slate-950/40 border border-slate-900/60 group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-950/20 border-b border-slate-900/60">
                <img
                  src={plant.images?.[0] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400'}
                  alt={plant.name}
                  className="object-cover w-full h-full filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 text-[9px] font-extrabold px-2.5 py-1 rounded-md border tracking-wider uppercase ${diffColors[plant.difficulty] || 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  {plant.difficulty}
                </span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-200 group-hover:text-sky-400 transition-colors flex items-center space-x-2">
                    <Leaf className="h-4.5 w-4.5 text-emerald-450" />
                    <span>{plant.name}</span>
                  </h3>
                  <p className="text-xs italic text-slate-400 font-semibold mt-1">
                    {plant.scientificName}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold mt-3 line-clamp-2">
                    {plant.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-900/60 text-[10px] font-semibold text-slate-350">
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[8px] block">Placement</span>
                    <span>{plant.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[8px] block">CO2 Supply</span>
                    <span>{plant.co2Needs ? 'Yes (Required)' : 'No (Low Tech)'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[8px] block">Growth Speed</span>
                    <span>{plant.growthRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase font-bold text-[8px] block">Lighting</span>
                    <span className="capitalize">{plant.lightingNeeds}</span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="glass rounded-3xl p-12 text-center border border-slate-900/60 max-w-md mx-auto space-y-4 bg-slate-950/20 shadow-lg">
            <Leaf className="h-12 w-12 text-slate-500 mx-auto animate-pulse" />
            <h3 className="font-extrabold text-lg text-slate-200">No Plants Match</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              We couldn't find any plant species matching your current parameters. Try clearing your filters.
            </p>
            <button 
              onClick={clearFilters} 
              className="px-5 py-2.5 bg-slate-900/60 border border-slate-800 text-sky-400 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )
      )}

    </div>
  );
};
export default Plants;
