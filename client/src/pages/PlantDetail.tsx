import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlantBySlug } from '../services/api';
import { ArrowLeft, Leaf, Grid, Layers, Lightbulb, PlayCircle, CheckCircle, Info, Compass, AlertTriangle } from 'lucide-react';

export const PlantDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: plant, isLoading, error } = useQuery({
    queryKey: ['plant-detail', slug],
    queryFn: () => fetchPlantBySlug(slug || '')
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-2 text-sky-400 font-bold">
        <Compass className="h-7 w-7 animate-spin" />
        <span>Loading plant details...</span>
      </div>
    );
  }

  if (error || !plant) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <AlertTriangle className="h-12 w-12 text-rose-400 mx-auto" />
        <h3 className="text-xl font-extrabold text-slate-100">Plant Species Not Found</h3>
        <Link to="/plants" className="inline-block px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-slate-950 rounded-xl text-xs font-bold transition-colors">
          Back to Directory
        </Link>
      </div>
    );
  }

  const diffColors: Record<string, string> = {
    Easy: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
    Medium: 'border-sky-500/20 text-sky-400 bg-sky-500/5',
    Hard: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
        <Link to="/plants" className="hover:text-sky-400 transition-colors flex items-center space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Plants</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{plant.name}</span>
      </div>

      {/* Main Header Banner */}
      <div className="glass rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 bg-gradient-to-br from-slate-950/80 to-[#071224]/50">
        
        {/* Left: Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80">
          <img
            src={plant.images?.[0] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600'}
            alt={plant.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Overview */}
        <div className="flex flex-col justify-between py-2 space-y-6">
          <div>
            <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg border tracking-wider uppercase ${diffColors[plant.difficulty] || 'bg-slate-850 border-slate-700'}`}>
              {plant.difficulty} Care
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-100 mt-3 leading-none">
              {plant.name}
            </h1>
            <p className="text-xs italic text-slate-400 font-semibold mt-2.5">
              {plant.scientificName} &bull; Placement: {plant.category}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-800/80 py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-400/20">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Placement</p>
                <p className="text-sm font-extrabold text-slate-100">{plant.category}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-400/20">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Lighting Needs</p>
                <p className="text-sm font-extrabold text-slate-100">{plant.lightingNeeds} Light</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-400/20">
                <PlayCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">CO2 Needs</p>
                <p className="text-sm font-extrabold text-slate-100">{plant.co2Needs ? 'CO2 Injection' : 'Low Tech (No CO2)'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-400/20">
                <Grid className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Growth Speed</p>
                <p className="text-sm font-extrabold text-slate-100">{plant.growthRate}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
            {plant.description}
          </p>

        </div>
      </div>

      {/* Benefits and Care Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Benefits & Stocking Notes */}
        <div className="space-y-6">
          
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-100">Aquarium Benefits</h3>
            <ul className="space-y-2.5 text-xs text-slate-300 font-semibold">
              {plant.benefits?.map((benefit: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2.5 leading-normal">
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-500/5 rounded-2xl border border-emerald-500/15 p-5 flex items-start space-x-3 text-xs leading-relaxed text-slate-300 font-semibold">
            <Info className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-400 block mb-1">Stocking Advice</span>
              {plant.compatibilityTips}
            </div>
          </div>

        </div>

        {/* Right Column: Care Guide & Compatible Fish */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-sky-400 flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-sky-400" />
              <span>Planting & Care Guide</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold whitespace-pre-line">
              {plant.careGuide}
            </p>
          </div>

          {/* Compatible Fish */}
          {plant.compatibleFish?.length > 0 && (
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-100">Compatible Fish Species</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                These fish species coexist beautifully with {plant.name} and will not destroy or consume foliage:
              </p>
              <div className="flex flex-wrap gap-2">
                {plant.compatibleFish.map((fish: any) => (
                  <Link
                    key={fish._id}
                    to={`/fish/${fish.slug}`}
                    className="text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700/60 bg-slate-900/30 hover:bg-sky-500/10 hover:text-sky-400 transition-all"
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
export default PlantDetail;
