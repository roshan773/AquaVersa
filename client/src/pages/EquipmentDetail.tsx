import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEquipmentBySlug } from '../services/api';
import { ArrowLeft, CheckCircle, XCircle, Info, Sparkles, Compass, AlertTriangle } from 'lucide-react';

export const EquipmentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: item, isLoading, error } = useQuery({
    queryKey: ['equipment-detail', slug],
    queryFn: () => fetchEquipmentBySlug(slug || '')
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-2 text-sky-400 font-bold">
        <Compass className="h-7 w-7 animate-spin" />
        <span>Loading product specs...</span>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <AlertTriangle className="h-12 w-12 text-rose-400 mx-auto" />
        <h3 className="text-xl font-extrabold text-slate-100">Product Not Found</h3>
        <Link to="/equipment" className="inline-block px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-slate-950 rounded-xl text-xs font-bold transition-colors">
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
        <Link to="/equipment" className="hover:text-sky-400 transition-colors flex items-center space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Equipment</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{item.name}</span>
      </div>

      {/* Product Banner */}
      <div className="glass rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 bg-gradient-to-br from-slate-950/80 to-[#071224]/50">
        
        {/* Left: Product Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80">
          <img
            src={item.images?.[0] || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600'}
            alt={item.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Summary details */}
        <div className="flex flex-col justify-between py-2 space-y-6">
          <div>
            <span className="text-[10px] font-extrabold px-3 py-1.5 rounded-lg border border-sky-400/20 bg-sky-500/5 text-sky-400 tracking-wider uppercase">
              {item.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-100 mt-3 leading-tight">
              {item.name}
            </h1>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Brand: {item.brand} &bull; Rating: {item.rating}/5
            </p>
          </div>

          <div className="border-t border-b border-slate-800/80 py-4 text-xs font-semibold text-slate-300 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-500 block">Power Consumption</span>
              <span className="text-sm font-extrabold text-slate-200">{item.powerConsumption}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-500 block">Estimated Price</span>
              <span className="text-sm font-extrabold text-sky-400">${item.price}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Product Specifications</span>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
              {item.specifications && Object.entries(item.specifications).map(([key, val]: any) => (
                <div key={key} className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                  <span className="text-[9px] text-slate-500 uppercase block leading-none mb-1">{key}</span>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Specs, Pros, Cons & Guides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Pros and Cons */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center space-x-2">
              <CheckCircle className="h-4.5 w-4.5 text-emerald-400" />
              <span>Pros & Advantages</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300 font-semibold">
              {item.pros?.map((pro: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-4">
            <h3 className="text-base font-bold text-rose-400 flex items-center space-x-2">
              <XCircle className="h-4.5 w-4.5 text-rose-400" />
              <span>Cons & Drawbacks</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300 font-semibold">
              {item.cons?.map((con: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Maintenance & Recommended Fish */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-4 bg-gradient-to-tr from-[#051124]/40 to-slate-950/40">
            <h3 className="text-base font-bold text-sky-400 flex items-center space-x-2">
              <Sparkles className="h-4.5 w-4.5 text-sky-400" />
              <span>Maintenance Requirements</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              {item.maintenance}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <Info className="h-4.5 w-4.5 text-slate-400" />
              <span>Expert Buying Guide</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              {item.buyingGuide}
            </p>
          </div>

          {/* Recommended Fish */}
          {item.recommendedFish?.length > 0 && (
            <div className="glass rounded-2xl p-6 border border-slate-800/80 space-y-4">
              <h3 className="text-base font-bold text-slate-100">Best Paired Species</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                This item is specifically optimized or heavily recommended for configurations housing:
              </p>
              <div className="flex flex-wrap gap-2">
                {item.recommendedFish.map((fish: any) => (
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
export default EquipmentDetail;
