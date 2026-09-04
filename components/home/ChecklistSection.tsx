'use client';

import { useState, useEffect } from 'react';
import { Check, ClipboardList, Droplets, Waves, Info, RotateCcw } from 'lucide-react';
import { storage, KEYS } from '@/lib/storage';

interface ChecklistItem {
  name: string;
  type: 'essential' | 'dependent' | 'optional';
  desc: string;
}

const freshwaterList: ChecklistItem[] = [
  { name: 'Aquarium Tank', type: 'essential', desc: 'The glass or acrylic home for your aquatic ecosystem.' },
  { name: 'Water Conditioner', type: 'essential', desc: 'Neutralizes toxic chlorine and heavy metals in tap water instantly.' },
  { name: 'Filter & Media', type: 'essential', desc: 'Mechanical and biological cleaning (sponge or hang-on-back filter).' },
  { name: 'Water Test Kit', type: 'essential', desc: 'Liquid testing kit (like API Master Kit) to check Ammonia and Nitrite levels.' },
  { name: 'Siphon & Gravel Vacuum', type: 'essential', desc: 'Essential for removing detritus and performing weekly partial water changes.' },
  { name: 'Quality Fish Food', type: 'essential', desc: 'High-grade pellets/flakes tailored to your fish species dietary requirements.' },
  { name: 'Fish Net', type: 'essential', desc: 'For safely moving or quarantine-handling fish.' },
  { name: 'Aquarium Stand', type: 'dependent', desc: 'Required for tanks >10g. Filled aquariums weigh about 10 lbs per gallon.' },
  { name: 'Substrate (Gravel/Sand)', type: 'dependent', desc: 'Essential for live plants and bottom dwellers, optional for bare-bottom setups.' },
  { name: 'Submersible Heater', type: 'dependent', desc: 'Mandatory for keeping tropical species at a stable 75–80°F temperature.' },
  { name: 'Aquarium LED Light', type: 'dependent', desc: 'Mandatory for live plants, standard for fish-only setups.' },
  { name: 'Air Pump & Airline', type: 'optional', desc: 'Useful for driving sponge filters and ensuring surface gas exchange.' },
];

const saltwaterList: ChecklistItem[] = [
  { name: 'Aquarium Tank', type: 'essential', desc: 'The glass tank configured for marine water volume.' },
  { name: 'Marine Salt Mix', type: 'essential', desc: 'Specialized synthetic marine salt formulation to create ocean salinity.' },
  { name: 'Refractometer', type: 'essential', desc: 'High-accuracy optical instrument to verify correct specific gravity (1.025).' },
  { name: 'RO/DI Water Filter', type: 'essential', desc: 'Multi-stage pure water filter to avoid nuisance algae and copper contamination.' },
  { name: 'Filter / Sump System', type: 'essential', desc: 'For high-capacity biological and mechanical media.' },
  { name: 'Marine Test Kit', type: 'essential', desc: 'Liquid kit for Ammonia, Nitrites, Nitrates, Alkalinity, and pH.' },
  { name: 'Siphon & Gravel Vacuum', type: 'essential', desc: 'To vacuum sand beds and perform routine marine water changes.' },
  { name: 'Quality Marine Food', type: 'essential', desc: 'Mysis shrimp, nori seaweed sheets, and marine pellets.' },
  { name: 'Aquarium Stand', type: 'essential', desc: 'Heavy-duty support base capable of bearing dense marine setups.' },
  { name: 'Protein Skimmer', type: 'dependent', desc: 'Highly recommended for reef aquariums to remove dissolved organic compounds.' },
  { name: 'Aragonite Sand & Live Rock', type: 'dependent', desc: 'Marine substrate and biological base structure for bacteria colonies.' },
  { name: 'Submersible Heater', type: 'dependent', desc: 'Mandatory to keep marine species at stable tropical reef temperatures.' },
];

interface ChecklistState {
  fresh: string[];
  salt: string[];
}

export default function ChecklistSection() {
  const [activeTab, setActiveTab] = useState<'fresh' | 'salt'>('fresh');
  const [checkedState, setCheckedState] = useState<ChecklistState>({ fresh: [], salt: [] });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setCheckedState(storage.get<ChecklistState>(KEYS.CHECKLIST, { fresh: [], salt: [] }));
    setIsMounted(true);
  }, []);

  const list = activeTab === 'fresh' ? freshwaterList : saltwaterList;
  const currentChecked = isMounted ? checkedState[activeTab] || [] : [];
  const percent = Math.round((currentChecked.length / list.length) * 100);

  const toggleCheck = (name: string) => {
    const isChecked = currentChecked.includes(name);
    const updatedTabList = isChecked
      ? currentChecked.filter((item) => item !== name)
      : [...currentChecked, name];

    const newState = {
      ...checkedState,
      [activeTab]: updatedTabList,
    };

    setCheckedState(newState);
    storage.set(KEYS.CHECKLIST, newState);
  };

  const handleReset = () => {
    const newState = {
      ...checkedState,
      [activeTab]: [],
    };
    setCheckedState(newState);
    storage.set(KEYS.CHECKLIST, newState);
  };

  const getBadge = (type: ChecklistItem['type']) => {
    switch (type) {
      case 'essential':
        return (
          <span className="text-[10px] font-condensed font-bold uppercase px-2 py-0.5 rounded bg-[#27187e] text-[#f7f7ff]">
            Essential
          </span>
        );
      case 'dependent':
        return (
          <span className="text-[10px] font-condensed font-bold uppercase px-2 py-0.5 rounded bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]">
            Setup Dependent
          </span>
        );
      case 'optional':
        return (
          <span className="text-[10px] font-condensed font-bold uppercase px-2 py-0.5 rounded bg-[#f7f7ff] text-[#27187e] border border-[#cfcaf5]">
            Optional
          </span>
        );
    }
  };

  return (
    <section className="py-20 bg-[#f7f7ff] border-t border-[#cfcaf5] text-left">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-condensed font-bold uppercase tracking-widest text-[#27187e] mb-2 block">
            PRE-SETUP CHECKLIST
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
            BEGINNER CHECKLIST
          </h2>
          <p className="text-base text-[#27187e]/80 font-normal max-w-xl mt-2 font-sans">
            Differentiate between mandatory gear and setup-dependent hardware before buying livestock.
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-[#edeafc] border border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* Tab Selector */}
          <div className="flex border-b border-[#cfcaf5] mb-8 pb-4 gap-4">
            <button
              onClick={() => setActiveTab('fresh')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-condensed font-bold uppercase tracking-wider transition-all ${
                activeTab === 'fresh'
                  ? 'bg-[#27187e] text-[#f7f7ff]'
                  : 'bg-[#f7f7ff] text-[#27187e] hover:bg-[#edeafc]'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>Freshwater Setup</span>
            </button>

            <button
              onClick={() => setActiveTab('salt')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-condensed font-bold uppercase tracking-wider transition-all ${
                activeTab === 'salt'
                  ? 'bg-[#27187e] text-[#f7f7ff]'
                  : 'bg-[#f7f7ff] text-[#27187e] hover:bg-[#edeafc]'
              }`}
            >
              <Waves className="w-4 h-4" />
              <span>Saltwater Setup</span>
            </button>
          </div>

          {/* Progress Bar & Actions */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                Progress: {currentChecked.length} of {list.length} items checked ({percent}%)
              </span>
              {currentChecked.length > 0 && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-condensed font-bold uppercase text-[#27187e]/80 hover:text-[#27187e] underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Checklist</span>
                </button>
              )}
            </div>

            <div className="w-full bg-[#f7f7ff] h-3 rounded-full overflow-hidden border border-[#cfcaf5]">
              <div
                className="bg-[#27187e] h-full transition-all duration-500 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Item Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {list.map((item, idx) => {
              const isItemChecked = currentChecked.includes(item.name);
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(item.name)}
                  className={`flex items-start text-left gap-4 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                    isItemChecked
                      ? 'bg-[#f7f7ff] border-[#27187e] shadow-sm'
                      : 'bg-[#f7f7ff] border-[#cfcaf5] hover:border-[#27187e]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                      isItemChecked
                        ? 'bg-[#27187e] border-[#27187e] text-[#f7f7ff]'
                        : 'border-[#cfcaf5] bg-[#f7f7ff]'
                    }`}
                  >
                    {isItemChecked && <Check className="w-4 h-4 text-[#f7f7ff]" />}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-display text-lg tracking-wide leading-none ${
                          isItemChecked ? 'text-[#27187e]/50 line-through' : 'text-[#27187e]'
                        }`}
                      >
                        {item.name}
                      </span>
                      {getBadge(item.type)}
                    </div>
                    <p
                      className={`text-xs font-sans leading-relaxed ${
                        isItemChecked ? 'text-[#27187e]/40 line-through' : 'text-[#27187e]/75'
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
