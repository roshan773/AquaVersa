import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMedicineBySlug } from '../services/api';
import { ArrowLeft, HeartPulse, CheckCircle, AlertTriangle, Compass } from 'lucide-react';

export const MedicineDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: med, isLoading, error } = useQuery({
    queryKey: ['medicine-detail', slug],
    queryFn: () => fetchMedicineBySlug(slug || '')
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-2 text-sky-400 font-bold">
        <Compass className="h-7 w-7 animate-spin" />
        <span>Loading medical specifications...</span>
      </div>
    );
  }

  if (error || !med) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <AlertTriangle className="h-12 w-12 text-rose-400 mx-auto" />
        <h3 className="text-xl font-extrabold text-slate-100">Medicine Profile Not Found</h3>
        <Link to="/medicines" className="inline-block px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-slate-950 rounded-xl text-xs font-bold transition-colors">
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
        <Link to="/medicines" className="hover:text-sky-400 transition-colors flex items-center space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Medicines</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{med.name}</span>
      </div>

      {/* Main card */}
      <div className="glass rounded-3xl p-6 md:p-8 bg-gradient-to-br from-slate-950/80 to-[#071224]/50 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-sky-500/10 border border-sky-400/20 text-sky-400 rounded-2xl">
            <HeartPulse className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-100">{med.name}</h1>
            <p className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mt-1">
              Active Ingredients: {med.activeIngredients?.join(', ')}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-350 leading-relaxed font-semibold">
          {med.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-800/80">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider mb-2">Primary Purpose</span>
            <p className="text-xs text-slate-300 leading-normal font-semibold">
              {med.purpose}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider mb-2">Instructions</span>
            <p className="text-xs text-slate-300 leading-normal font-semibold">
              {med.instructions}
            </p>
          </div>
        </div>
      </div>

      {/* Dosage instructions, Safe/Unsafe lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-3 bg-slate-950/40">
            <h3 className="text-sm font-bold text-sky-400">Dosage Instructions</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold whitespace-pre-line">
              {med.dosageInstructions}
            </p>
          </div>

          {med.warnings?.length > 0 && (
            <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-3">
              <h3 className="text-sm font-bold text-rose-400">Treatment Warnings</h3>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300 font-semibold leading-relaxed">
                {med.warnings.map((warn: string, idx: number) => (
                  <li key={idx}>{warn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Mappings */}
        <div className="space-y-6">
          {med.safeFish?.length > 0 && (
            <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-400" />
                <span>Safe Species</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {med.safeFish.map((fish: any) => (
                  <Link
                    key={fish._id}
                    to={`/fish/${fish.slug}`}
                    className="text-[10px] font-bold px-2 py-1 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                  >
                    {fish.commonName}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {med.unsafeFish?.length > 0 && (
            <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center space-x-2">
                <AlertTriangle className="h-4.5 w-4.5 text-rose-400" />
                <span>Unsafe Species</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {med.unsafeFish.map((fish: any) => (
                  <Link
                    key={fish._id}
                    to={`/fish/${fish.slug}`}
                    className="text-[10px] font-bold px-2 py-1 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    {fish.commonName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default MedicineDetail;
