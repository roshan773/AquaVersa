import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchMedicines } from '../services/api';
import { Search, Loader2, HeartPulse } from 'lucide-react';

export const Medicines: React.FC = () => {
  const [search, setSearch] = useState('');

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ['medicines', search],
    queryFn: () => fetchMedicines({ search: search || undefined })
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-100 flex items-center justify-center space-x-3">
          <HeartPulse className="h-10 w-10 text-sky-400" />
          <span>Aquarium Medicines</span>
        </h1>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Search veterinary treatments, view active ingredients, safe fish indexes, and dosage metrics.
        </p>
      </div>

      {/* Controls */}
      <div className="glass rounded-2xl p-4 flex gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search medicine brand or chemical..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/40 border border-slate-700/60 rounded-xl px-4 py-2.5 pl-9 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-sky-400 py-10 font-bold text-sm">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading medicine data...</span>
        </div>
      )}

      {/* Grid */}
      {!isLoading && medicines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medicines.map((med: any) => (
            <div key={med._id} className="glass rounded-2xl border border-slate-800/80 p-6 space-y-4 flex flex-col justify-between h-full bg-slate-950/20">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                  <HeartPulse className="h-5 w-5 text-sky-400" />
                  <span>{med.name}</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {med.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Active Ingredients: {med.activeIngredients?.join(', ')}
                </span>
                <Link
                  to={`/medicines/${med.slug}`}
                  className="px-4 py-2 bg-sky-500/10 border border-sky-400/20 text-sky-400 hover:bg-sky-500 hover:text-slate-950 rounded-xl text-xs font-bold transition-all"
                >
                  View Dosages
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center text-xs font-semibold text-slate-500 py-10">No medicines found.</div>
        )
      )}

    </div>
  );
};
export default Medicines;
