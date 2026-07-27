import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchDiseases } from '../services/api';
import { Search, Loader2, HeartPulse, AlertTriangle } from 'lucide-react';

export const Diseases: React.FC = () => {
  const [search, setSearch] = useState('');
  const [environment, setEnvironment] = useState('');

  const { data: diseases = [], isLoading } = useQuery({
    queryKey: ['diseases', search, environment],
    queryFn: () => fetchDiseases({
      search: search || undefined,
      environment: environment || undefined
    })
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-100 flex items-center justify-center space-x-3">
          <HeartPulse className="h-10 w-10 text-rose-400" />
          <span>Disease & Diagnosis</span>
        </h1>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Diagnose symptoms, identify causes, and learn veterinary-approved recovery instructions and medications.
        </p>
      </div>

      {/* Prominent Vet Disclaimer */}
      <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start space-x-3 text-amber-500 font-semibold">
        <AlertTriangle className="h-6 w-6 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1 leading-relaxed">
          <h4 className="font-bold text-sm">Veterinary & Medical Treatment Disclaimer</h4>
          <p>
            The symptom profiles, diagnosis details, and dosages in this guide are compiled strictly for general educational reference. They are not prescriptive diagnostic protocols. Always consult a veterinary specialist.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search symptoms or diseases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/40 border border-slate-700/60 rounded-xl px-4 py-2.5 pl-9 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
          />
        </div>
        <select
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
          className="bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
        >
          <option value="">All Water Types</option>
          <option value="freshwater">Freshwater Only</option>
          <option value="saltwater">Saltwater Only</option>
        </select>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-sky-400 py-10 font-bold text-sm">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading disease database...</span>
        </div>
      )}

      {/* List */}
      {!isLoading && diseases.length > 0 ? (
        <div className="space-y-6">
          {diseases.map((disease: any) => (
            <div key={disease._id} className="glass rounded-2xl border border-slate-800/80 p-6 space-y-4 bg-slate-950/20">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                    <HeartPulse className="h-5 w-5 text-rose-400" />
                    <span>{disease.name}</span>
                  </h3>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold mt-1">
                    Environment: {disease.isFreshwater ? 'Freshwater' : ''} {disease.isSaltwater ? 'Saltwater' : ''}
                  </p>
                </div>
                <Link
                  to={`/diseases/${disease.slug}`}
                  className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-slate-950 rounded-xl text-xs font-bold transition-all"
                >
                  View Details
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-300 pt-2 border-t border-slate-800/40">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Symptoms</span>
                  <p className="line-clamp-2">{disease.symptoms.join(', ')}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Recommended Treatment</span>
                  <p className="line-clamp-2">{disease.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center text-xs font-semibold text-slate-500 py-10">No diseases found matching selection.</div>
        )
      )}

    </div>
  );
};
export default Diseases;
