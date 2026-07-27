import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchEquipment, getEquipmentRecommendation } from '../services/api';
import { Search, Loader2, Wrench } from 'lucide-react';

export const Equipment: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Sizing assistant states
  const [vol, setVol] = useState(20);
  const [unit, setUnit] = useState<'gallons' | 'liters'>('gallons');

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['equipment', search, category],
    queryFn: () => fetchEquipment({
      search: search || undefined,
      category: category || undefined
    })
  });

  const recommendMutation = useMutation({
    mutationFn: (payload: any) => getEquipmentRecommendation(payload)
  });

  const handleSizingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recommendMutation.mutate({ volume: vol, unit });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative z-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Hardware & Tank Setup</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-100">
          Aquarium <span className="bg-gradient-to-r from-sky-400 to-emerald-450 bg-clip-text text-transparent">Equipment Directory</span>
        </h1>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Size filters, heater wattages, lighting parameters, and explore ratings for canister filters and accessories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sizing Assistant */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass rounded-3xl p-6 border border-slate-900/60 bg-slate-950/40 space-y-5 shadow-lg shadow-black/25">
            <h3 className="font-extrabold text-base border-b border-slate-900/60 pb-2 text-slate-200 flex items-center space-x-2">
              <Wrench className="h-4.5 w-4.5 text-sky-400 animate-pulse" />
              <span>Sizing Assistant</span>
            </h3>

            <form onSubmit={handleSizingSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tank Volume</label>
                <div className="flex bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <input
                    type="number"
                    value={vol}
                    onChange={(e) => setVol(parseInt(e.target.value) || 0)}
                    className="flex-grow px-3 py-2.5 text-xs font-semibold focus:outline-none bg-transparent text-slate-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setUnit('gallons')}
                    className={`px-3.5 text-[10px] font-bold uppercase transition-colors cursor-pointer ${unit === 'gallons' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Gal
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('liters')}
                    className={`px-3.5 text-[10px] font-bold uppercase transition-colors cursor-pointer ${unit === 'liters' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Ltr
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={recommendMutation.isPending}
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 btn-glow-cyan cursor-pointer"
              >
                {recommendMutation.isPending ? 'Sizing...' : 'Size Equipment'}
              </button>
            </form>

            {/* Sizing Recommendations Results */}
            {recommendMutation.isSuccess && (
              <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-2xl space-y-4 text-xs font-semibold leading-relaxed animate-in fade-in">
                <div>
                  <span className="text-[9px] uppercase font-bold text-sky-400 block">Recommended Filter Flow</span>
                  <p className="text-slate-200">{recommendMutation.data.sizing.filter.recommendedType}</p>
                  <p className="text-[10px] text-slate-450 mt-1">{recommendMutation.data.sizing.filter.notes}</p>
                </div>
                <div className="border-t border-slate-900/60 pt-3">
                  <span className="text-[9px] uppercase font-bold text-sky-400 block">Recommended Heater</span>
                  <p className="text-slate-200">{recommendMutation.data.sizing.heater.recommendedWattage} Watts</p>
                  <p className="text-[10px] text-slate-455 mt-1">{recommendMutation.data.sizing.heater.notes}</p>
                </div>
                <div className="border-t border-slate-900/60 pt-3">
                  <span className="text-[9px] uppercase font-bold text-sky-400 block">Recommended Substrate Weight</span>
                  <p className="text-slate-200">{recommendMutation.data.sizing.substrate.gravelWeightLbs} lbs / {recommendMutation.data.sizing.substrate.gravelWeightKg} kg</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Catalog Grid */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Controls */}
          <div className="glass rounded-3xl p-4 flex flex-col md:flex-row gap-3 bg-slate-950/40 border border-slate-900/60 shadow-lg shadow-black/25">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 pl-9 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-350"
            >
              <option value="">All Categories</option>
              <option value="Filter">Filters</option>
              <option value="Heater">Heaters</option>
              <option value="Lighting">Lighting</option>
              <option value="Substrate">Substrates</option>
              <option value="CO2">CO2 Gear</option>
            </select>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center space-x-2 text-sky-405 py-10 font-bold text-sm">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Fetching catalog products...</span>
            </div>
          )}

          {/* Catalog grid */}
          {!isLoading && items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.map((item: any) => (
                <Link
                  key={item._id}
                  to={`/equipment/${item.slug}`}
                  className="glass rounded-3xl overflow-hidden block glass-hover flex flex-col h-full bg-slate-950/40 border border-slate-900/60 group"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-950/20 border-b border-slate-900/60">
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=400'}
                      alt={item.name}
                      className="object-cover w-full h-full filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[9px] font-extrabold px-2.5 py-1 rounded-md border tracking-wider uppercase bg-sky-500/10 text-sky-400 border-sky-500/20">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-200 group-hover:text-sky-400 transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-slate-455 font-bold mt-1 uppercase tracking-wider">
                        Brand: {item.brand}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold pt-3 border-t border-slate-900/60">
                      <span className="text-sky-400 font-extrabold">${item.price}</span>
                      <span className="text-slate-400 font-semibold">Rating: {item.rating}/5</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="text-center py-10 font-semibold text-slate-500 text-xs">No equipment matching query.</div>
            )
          )}

        </div>

      </div>

    </div>
  );
};
export default Equipment;
