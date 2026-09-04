'use client';

import { useState } from 'react';
import { Check, Cpu, ArrowRight, Settings, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { equipmentData } from '@/data/equipment';

export default function EquipmentRecommender() {
  const [tankSize, setTankSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [tankType, setTankType] = useState<'freshwater' | 'saltwater' | 'planted'>('freshwater');
  const [isPlanted, setIsPlanted] = useState<boolean>(true);

  // Dynamic recommendation engine
  const getRecommendations = () => {
    const list: { category: string; name: string; desc: string; slug: string }[] = [];

    // Filtration
    if (tankSize === 'small') {
      list.push({
        category: 'Filtration',
        name: 'Sponge Filter & Air Pump',
        desc: 'Gentle mechanical and biological filtration ideal for nanos, bettas, and fry.',
        slug: 'sponge-filter',
      });
    } else if (tankSize === 'medium') {
      list.push({
        category: 'Filtration',
        name: 'Hang-On-Back (HOB) Filter',
        desc: 'High surface agitation, customizable media trays, and easy maintenance.',
        slug: 'hang-on-back-filter',
      });
    } else {
      list.push({
        category: 'Filtration',
        name: 'Multi-Stage Canister Filter',
        desc: 'Maximum media capacity and silent high-flow turnover for 55+ gallon setups.',
        slug: 'canister-filter',
      });
    }

    // Heating
    if (tankSize === 'small') {
      list.push({
        category: 'Heating',
        name: '50W Submersible Heater',
        desc: 'Compact pre-set or adjustable heater to maintain consistent 75-80°F.',
        slug: 'submersible-aquarium-heater',
      });
    } else if (tankSize === 'medium') {
      list.push({
        category: 'Heating',
        name: '150W-200W Submersible Heater',
        desc: 'Shatterproof quartz heater with precision electronic thermostat.',
        slug: 'submersible-aquarium-heater',
      });
    } else {
      list.push({
        category: 'Heating',
        name: '300W Titanium / Dual In-Line Heater',
        desc: 'Heavy-duty heating system paired with digital safety temperature controller.',
        slug: 'inline-heater',
      });
    }

    // Lighting
    if (tankType === 'saltwater') {
      list.push({
        category: 'Lighting',
        name: 'Actinic Reef LED Light',
        desc: 'High PAR output supporting coral zooxanthellae and marine luminescence.',
        slug: 'led-reef-light',
      });
    } else if (isPlanted || tankType === 'planted') {
      list.push({
        category: 'Lighting',
        name: 'Full-Spectrum Planted LED Light',
        desc: 'Balanced 6500K daylight spectrum encouraging healthy plant photosynthesis.',
        slug: 'full-spectrum-led-plant-light',
      });
    } else {
      list.push({
        category: 'Lighting',
        name: 'Standard Community LED Fixture',
        desc: 'Energy-saving crisp lighting to highlight fish colors without algae blooms.',
        slug: 'full-spectrum-led-plant-light',
      });
    }

    return list;
  };

  const recommendations = getRecommendations();

  return (
    <section className="py-20 bg-[#f7f7ff] border-t border-[#cfcaf5] text-left">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-condensed font-bold uppercase tracking-widest text-[#27187e] mb-2 block">
            SETUP WIZARD
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
            EQUIPMENT RECOMMENDER
          </h2>
          <p className="text-base text-[#27187e]/80 font-normal max-w-2xl mt-2 font-sans">
            Tell us about your aquarium and get personalized equipment recommendations.
          </p>
        </div>

        {/* Two-Part Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Aquarium Information Controls */}
          <div className="lg:col-span-5 bg-[#edeafc] border border-[#cfcaf5] p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="font-display text-2xl text-[#27187e]">
              AQUARIUM INFORMATION
            </h3>

            {/* Field 1: Tank Size */}
            <div>
              <label className="text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] mb-2 block">
                Tank Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'small', label: 'Small', sub: '5-15 Gal' },
                  { id: 'medium', label: 'Medium', sub: '20-40 Gal' },
                  { id: 'large', label: 'Large', sub: '55+ Gal' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setTankSize(s.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tankSize === s.id
                        ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]'
                        : 'bg-[#f7f7ff] text-[#27187e] border-[#cfcaf5] hover:border-[#27187e]'
                    }`}
                  >
                    <span className="block text-xs font-condensed font-bold uppercase">{s.label}</span>
                    <span className="block text-[10px] opacity-80">{s.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Field 2: Aquarium Type */}
            <div>
              <label className="text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] mb-2 block">
                Aquarium Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'freshwater', label: 'Freshwater' },
                  { id: 'planted', label: 'Planted' },
                  { id: 'saltwater', label: 'Saltwater' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTankType(t.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tankType === t.id
                        ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]'
                        : 'bg-[#f7f7ff] text-[#27187e] border-[#cfcaf5] hover:border-[#27187e]'
                    }`}
                  >
                    <span className="block text-xs font-condensed font-bold uppercase">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Field 3: Live Plants Option */}
            <div>
              <label className="text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] mb-2 block">
                Live Aquatic Plants?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlanted(true)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isPlanted
                      ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]'
                      : 'bg-[#f7f7ff] text-[#27187e] border-[#cfcaf5] hover:border-[#27187e]'
                  }`}
                >
                  <span className="block text-xs font-condensed font-bold uppercase">Yes, Live Plants</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlanted(false)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    !isPlanted
                      ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]'
                      : 'bg-[#f7f7ff] text-[#27187e] border-[#cfcaf5] hover:border-[#27187e]'
                  }`}
                >
                  <span className="block text-xs font-condensed font-bold uppercase">Fish Only</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: Recommended For You */}
          <div className="lg:col-span-7 bg-[#edeafc] border border-[#cfcaf5] p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#cfcaf5]">
                <h3 className="font-display text-2xl text-[#27187e]">
                  RECOMMENDED FOR YOU
                </h3>
                <span className="text-xs font-condensed font-bold uppercase px-3 py-1 bg-[#27187e] text-[#f7f7ff] rounded-lg">
                  {recommendations.length} Selected Hardware
                </span>
              </div>

              <div className="space-y-4">
                {recommendations.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-[#27187e] transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-condensed font-bold uppercase text-[#27187e]/70 block">
                        {item.category}
                      </span>
                      <h4 className="font-display text-xl text-[#27187e] leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#27187e]/75 font-sans mt-0.5 max-w-md">
                        {item.desc}
                      </p>
                    </div>

                    <Link
                      href={`/equipment/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] hover:text-[#1b1059] shrink-0"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#cfcaf5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#27187e]/75 font-sans">
                Adjust tank specs on the left for real-time equipment matching.
              </span>

              <Link
                href="/equipment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs font-condensed font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
              >
                <span>Get Full Recommendations</span>
                <ArrowRight className="w-4 h-4 text-[#f7f7ff]" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
