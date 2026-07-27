import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchDiseaseBySlug } from '../services/api';
import { ArrowLeft, AlertTriangle, Compass, HeartPulse, ShieldAlert, Sparkles, Activity } from 'lucide-react';

export const DiseaseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: disease, isLoading, error } = useQuery({
    queryKey: ['disease-detail', slug],
    queryFn: () => fetchDiseaseBySlug(slug || '')
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-2 text-sky-400 font-bold">
        <Compass className="h-7 w-7 animate-spin" />
        <span>Loading diagnosis details...</span>
      </div>
    );
  }

  if (error || !disease) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <AlertTriangle className="h-12 w-12 text-rose-400 mx-auto animate-pulse" />
        <h3 className="text-xl font-extrabold text-slate-100">Diagnosis Report Not Found</h3>
        <Link to="/diseases" className="inline-block px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-slate-950 rounded-xl text-xs font-bold transition-colors">
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
        <Link to="/diseases" className="hover:text-sky-400 transition-colors flex items-center space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Diseases</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{disease.name}</span>
      </div>

      {/* Vet warning */}
      <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start space-x-3 text-amber-500 font-semibold">
        <AlertTriangle className="h-6 w-6 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1 leading-relaxed">
          <h4 className="font-bold text-sm">Professional Veterinary Diagnosis Warning</h4>
          <p>
            The care instructions, medicine protocols, and emergency guidelines below are strictly for educational reference. They do not constitute formal veterinary diagnostics or prescriptions.
          </p>
        </div>
      </div>

      {/* Main card info */}
      <div className="glass rounded-3xl p-6 md:p-8 bg-gradient-to-br from-slate-950/80 to-[#071224]/50 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl">
            <HeartPulse className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-100">{disease.name}</h1>
            <p className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mt-1">
              Target Environment: {disease.isFreshwater ? 'Freshwater' : ''} {disease.isSaltwater ? 'Saltwater' : ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-800/80">
          
          {/* Symptoms */}
          <div className="space-y-3">
            <h3 className="text-sm uppercase font-extrabold text-slate-400 flex items-center space-x-2">
              <ShieldAlert className="h-4.5 w-4.5 text-rose-400" />
              <span>Diagnostic Symptoms</span>
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs text-slate-350 font-semibold leading-relaxed">
              {disease.symptoms.map((symptom: string, idx: number) => (
                <li key={idx} className="capitalize">{symptom}</li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="space-y-3">
            <h3 className="text-sm uppercase font-extrabold text-slate-400 flex items-center space-x-2">
              <AlertTriangle className="h-4.5 w-4.5 text-amber-400" />
              <span>Primary Causes & Stressors</span>
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs text-slate-350 font-semibold leading-relaxed">
              {disease.causes.map((cause: string, idx: number) => (
                <li key={idx}>{cause}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Diagnosis, Treatments & Recovery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Recovery Timeline */}
        <div className="space-y-6">
          
          <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Activity className="h-4.5 w-4.5 text-emerald-400" />
              <span>Recovery Expectation</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              {disease.recovery}
            </p>
          </div>

          {/* Recommended Medicines */}
          {disease.medicines?.length > 0 && (
            <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-3">
              <h3 className="text-sm font-bold text-slate-100">Prescribed Treatment Meds</h3>
              <div className="space-y-2">
                {disease.medicines.map((med: any) => (
                  <Link
                    key={med._id}
                    to={`/medicines/${med.slug}`}
                    className="block p-3 rounded-xl border border-slate-700/60 bg-slate-900/30 text-xs font-bold text-sky-400 hover:bg-sky-500/10 transition-colors"
                  >
                    {med.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Steps */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-3">
            <h3 className="text-sm font-bold text-sky-400 flex items-center space-x-2">
              <Sparkles className="h-4.5 w-4.5 text-sky-400" />
              <span>Emergency Action Plan</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              {disease.emergencyGuide}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-3">
            <h3 className="text-sm font-bold text-slate-100">How to Diagnose</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              {disease.diagnosis}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-3">
            <h3 className="text-sm font-bold text-rose-400">Treatment Dosing Protocol</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              {disease.treatment}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
export default DiseaseDetail;
