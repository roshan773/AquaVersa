import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchFishes, checkCompatibility } from '../services/api';
import { ShieldAlert, CheckCircle2, AlertTriangle, AlertOctagon, HelpCircle, ArrowRight, Loader2 } from 'lucide-react';

export const Compatibility: React.FC = () => {
  const [fish1Id, setFish1Id] = useState('');
  const [fish2Id, setFish2Id] = useState('');

  // Fetch all fish for select dropdowns
  const { data: fishesData, isLoading: isFishesLoading } = useQuery({
    queryKey: ['fishes-compatibility-dropdown'],
    queryFn: () => fetchFishes({ limit: 100 })
  });

  const fishes = fishesData?.fishes || [];

  // Run compatibility checker mutation
  const checkMutation = useMutation({
    mutationFn: (ids: string[]) => checkCompatibility(ids),
  });

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (fish1Id && fish2Id) {
      if (fish1Id === fish2Id) {
        alert('Please choose two different fish species to cross-check compatibility.');
        return;
      }
      checkMutation.mutate([fish1Id, fish2Id]);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compatible':
        return <CheckCircle2 className="h-10 w-10 text-emerald-400" />;
      case 'Caution':
        return <AlertTriangle className="h-10 w-10 text-amber-400" />;
      case 'Incompatible':
        return <AlertOctagon className="h-10 w-10 text-rose-400" />;
      default:
        return <HelpCircle className="h-10 w-10 text-slate-500" />;
    }
  };

  const statusColors: Record<string, string> = {
    Compatible: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    Caution: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    Incompatible: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-100 flex items-center justify-center space-x-3">
          <ShieldAlert className="h-10 w-10 text-sky-400 animate-pulse" />
          <span>Tank Mate Compatibility</span>
        </h1>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Select two fish species to run our cross-check parameters matching algorithm covering pH, temperature thresholds, sizes, and aggression profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Selector Panel */}
        <div className="md:col-span-1 glass rounded-3xl p-6 border border-slate-800/80 bg-slate-950/20 h-fit space-y-6">
          <h3 className="font-extrabold text-base border-b border-slate-800/80 pb-2 text-slate-100">Select Species</h3>
          
          <form onSubmit={handleCheck} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fish Species 1</label>
              <select
                value={fish1Id}
                onChange={(e) => setFish1Id(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
                required
              >
                <option value="">Choose fish...</option>
                {fishes.map((f: any) => (
                  <option key={f._id} value={f._id}>{f.commonName} ({f.scientificName})</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fish Species 2</label>
              <select
                value={fish2Id}
                onChange={(e) => setFish2Id(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
                required
              >
                <option value="">Choose fish...</option>
                {fishes.map((f: any) => (
                  <option key={f._id} value={f._id}>{f.commonName} ({f.scientificName})</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={checkMutation.isPending || isFishesLoading}
              className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 hover:opacity-95 btn-glow-cyan flex items-center justify-center space-x-2 cursor-pointer"
            >
              {checkMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <span>Check Compatibility</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Results Panel */}
        <div className="md:col-span-2 space-y-6">
          
          {checkMutation.isIdle && (
            <div className="glass rounded-3xl p-10 flex flex-col items-center justify-center space-y-4 text-center border border-slate-800/80 min-h-[300px]">
              <ShieldAlert className="h-12 w-12 text-slate-500" />
              <h4 className="font-extrabold text-base text-slate-200">Awaiting Compatibility Selection</h4>
              <p className="text-xs text-slate-400 max-w-xs font-semibold leading-relaxed">
                Choose two different fish species from the dropdown panel on the left and run calculations to see their compatibility reports.
              </p>
            </div>
          )}

          {checkMutation.isSuccess && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Main Rating Card */}
              <div className={`glass rounded-3xl p-6 border flex items-center space-x-5 ${statusColors[checkMutation.data.status]}`}>
                <div className="p-2.5 bg-slate-950/40 rounded-2xl">
                  {getStatusIcon(checkMutation.data.status)}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Verdict</span>
                  <h4 className="text-2xl font-black">{checkMutation.data.status}</h4>
                </div>
              </div>

              {/* Reasons */}
              <div className="glass rounded-3xl p-6 border border-slate-800/80 space-y-4">
                <h4 className="font-extrabold text-sm text-slate-100">Compatibility Details</h4>
                <ul className="space-y-3">
                  {checkMutation.data.reasons.map((reason: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3 text-xs leading-normal text-slate-300 font-semibold">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0"></div>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendation parameters */}
              <div className="p-5 bg-sky-500/5 border border-sky-500/20 rounded-2xl grid grid-cols-2 gap-4 text-center">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Recommended Min Tank Size</span>
                  <p className="text-base font-black text-slate-200 mt-1">
                    {checkMutation.data.recommendedMinTankSize.gallons} Gal / {checkMutation.data.recommendedMinTankSize.liters} L
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Hiding Spots Need</span>
                  <p className="text-xs font-bold text-slate-200 mt-1">
                    {checkMutation.data.status === 'Compatible' ? 'Standard Aquascape' : 'Abundant Spacing/Decor'}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
export default Compatibility;
