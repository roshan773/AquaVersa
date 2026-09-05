'use client';

import { useState } from 'react';
import { CheckCircle2, Leaf, Fish, ArrowRight } from 'lucide-react';
import { plantData } from '@/data/plants';
import Link from 'next/link';

export default function FishPlantCompatibility() {
  const [fishType, setFishType] = useState('Community');

  const getRecommendedPlants = () => {
    if (fishType === 'Cichlids') {
      return plantData.filter(p => 
        p.slug === 'java-fern' || 
        p.slug === 'anubias-nana' || 
        p.name.includes('Anubias') || 
        p.name.includes('Java')
      );
    }
    if (fishType === 'Goldfish') {
      return plantData.filter(p => 
        p.slug === 'java-fern' || 
        p.slug === 'anubias-nana' || 
        p.slug === 'vallisneria' || 
        p.slug === 'hornwort' || 
        p.slug === 'frogbit' ||
        p.slug === 'water-spangles'
      );
    }
    if (fishType === 'Bettas') {
      return plantData.filter(p => 
        p.slug === 'anubias-nana' || 
        p.slug === 'amazon-sword' || 
        p.slug === 'frogbit' || 
        p.slug === 'water-spangles' || 
        p.slug === 'red-root-floater' || 
        p.slug === 'water-sprite'
      );
    }
    return plantData.filter(p => 
      p.difficulty === 'Easy' && 
      (p.slug === 'java-fern' || 
       p.slug === 'anubias-nana' || 
       p.slug === 'amazon-sword' || 
       p.slug === 'vallisneria' || 
       p.slug === 'cryptocoryne-wendtii' ||
       p.slug === 'water-wisteria' ||
       p.slug === 'hornwort')
    );
  };

  const recommendations = getRecommendedPlants();

  return (
    <section className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-10 shadow-sm text-left">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Fauna &amp; Flora Harmony</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#27187e] tracking-tight">
            Will my fish eat or uproot these plants?
          </h2>
          <p className="text-base text-[#27187e]/85 font-readable leading-relaxed">
            Certain species (like herbivorous Goldfish or digging Cichlids) destroy soft-stemmed plants. Select your stock category to see resistant botanical choices.
          </p>
          
          <div className="pt-2 font-readable">
            <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-3 tracking-wider">
              Select Primary Fish Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Community', 'Bettas', 'Cichlids', 'Goldfish'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFishType(type)}
                  className={`flex items-center gap-2.5 p-3.5 rounded-2xl border-2 font-readable text-sm font-semibold transition-all cursor-pointer ${
                    fishType === type 
                      ? 'border-[#27187e] bg-[#27187e] text-[#f7f7ff] shadow-sm' 
                      : 'border-[#cfcaf5] bg-[#f7f7ff] text-[#27187e] hover:border-[#27187e]'
                  }`}
                >
                  <Fish className="w-4 h-4" />
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7">
            <h3 className="font-display text-2xl text-[#27187e] mb-4 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#27187e]" strokeWidth={2.5} />
              <span>Safe &amp; Compatible Plants for {fishType}</span>
            </h3>
            <div className="space-y-3 font-readable">
              {recommendations.length > 0 ? (
                recommendations.map(plant => (
                  <Link
                    key={plant.id}
                    href={`/plants/${plant.slug}`}
                    className="bg-[#ffffff] p-4 rounded-2xl border-2 border-[#cfcaf5] hover:border-[#27187e] flex items-center justify-between group transition-all shadow-sm"
                  >
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#27187e] group-hover:underline">
                        {plant.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#27187e]/70">{plant.placement} Zone</p>
                    </div>
                    <span className="text-xs font-semibold bg-[#edeafc] text-[#27187e] border border-[#cfcaf5] px-3 py-1 rounded-full uppercase tracking-wider">
                      Compatible
                    </span>
                  </Link>
                ))
              ) : (
                <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#cfcaf5] text-center">
                  <p className="text-sm text-[#27187e]/80">Try Anubias or Java Fern - they are tough epiphytes that thrive without substrate planting.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
