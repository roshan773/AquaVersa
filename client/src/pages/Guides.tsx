import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchGuides } from '../services/api';
import { Search, BookOpen, Loader2 } from 'lucide-react';

export const Guides: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const { data: guides = [], isLoading } = useQuery({
    queryKey: ['guides', search, category],
    queryFn: () => fetchGuides({
      search: search || undefined,
      category: category || undefined
    })
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-100 flex items-center justify-center space-x-3">
          <BookOpen className="h-10 w-10 text-sky-400" />
          <span>Aquarium Guide Library</span>
        </h1>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Master the Nitrogen Cycle, perfect water chemistry metrics, design plant growth beds, and diagnose fish illnesses.
        </p>
      </div>

      {/* Controls */}
      <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search guides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/40 border border-slate-700/60 rounded-xl px-4 py-2.5 pl-9 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
        >
          <option value="">All Categories</option>
          <option value="Setup">Setup & Cycling</option>
          <option value="Water Quality">Water Quality & Chemistry</option>
          <option value="Care">Care Guides</option>
          <option value="Aquascaping">Aquascaping & Hardscape</option>
        </select>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-sky-400 py-10 font-bold text-sm">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Fetching guide articles...</span>
        </div>
      )}

      {/* Grid */}
      {!isLoading && guides.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {guides.map((guide: any) => (
            <Link
              key={guide._id}
              to={`/guides/${guide.slug}`}
              className="glass rounded-2xl overflow-hidden block glass-hover flex flex-col h-full bg-slate-950/30 group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900 border-b border-slate-800/80">
                <img
                  src={guide.image || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=400'}
                  alt={guide.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[9px] font-extrabold px-2.5 py-1 rounded-md border tracking-wider uppercase bg-sky-500/10 text-sky-400 border-sky-500/20">
                  {guide.category}
                </span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-100 group-hover:text-sky-400 transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold mt-2 line-clamp-2">
                    {guide.excerpt}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider pt-3 border-t border-slate-800/60">
                  <span>{guide.readTime}</span>
                  <span>{guide.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center text-xs font-semibold text-slate-500 py-10">No guides matching query.</div>
        )
      )}

    </div>
  );
};
export default Guides;
