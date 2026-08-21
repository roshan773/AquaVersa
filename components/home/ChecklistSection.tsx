'use client';
import { useState, useEffect } from 'react';
import { Check, ClipboardList, Droplets, Waves, Info, RotateCcw } from 'lucide-react';
import { storage, KEYS, unlockAchievement } from '@/lib/storage';

interface ChecklistItem {
  name: string;
  type: 'essential' | 'dependent' | 'optional';
  desc: string;
}

const freshwaterList: ChecklistItem[] = [
  { name: "Aquarium Tank", type: "essential", desc: "The glass or acrylic home for your aquatic ecosystem." },
  { name: "Water Conditioner", type: "essential", desc: "Neutralizes toxic chlorine and heavy metals in tap water instantly." },
  { name: "Filter & Media", type: "essential", desc: "Mechanical and biological cleaning (sponge or hang-on-back filter)." },
  { name: "Water Test Kit", type: "essential", desc: "Liquid testing kit (like API Master Kit) to check toxic Ammonia/Nitrite levels." },
  { name: "Siphon & Gravel Vacuum", type: "essential", desc: "Essential for sucking up fish waste and conducting water changes." },
  { name: "Quality Fish Food", type: "essential", desc: "High-grade pellets/flakes tailored to your fish species' diet." },
  { name: "Fish Net", type: "essential", desc: "For safely catching, moving, or quarantine-handling of fish." },
  { name: "Aquarium Stand", type: "dependent", desc: "Required for tanks >10g. Filled aquariums weigh about 10 lbs per gallon." },
  { name: "Substrate (Gravel/Sand)", type: "dependent", desc: "Essential for live plants and bottom dwellers, optional for bare-bottom setups." },
  { name: "Submersible Heater", type: "dependent", desc: "Mandatory for keeping tropical species warm, unnecessary for coldwater species." },
  { name: "Aquarium LED Light", type: "dependent", desc: "Mandatory for growing live plants, basic/optional for fish-only setups." },
  { name: "Air Pump & Airline", type: "optional", desc: "Useful for driving sponge filters, running bubblers, or increasing aeration." }
];

const saltwaterList: ChecklistItem[] = [
  { name: "Aquarium Tank", type: "essential", desc: "The glass tank configured for saltwater water." },
  { name: "Marine Salt Mix", type: "essential", desc: "Specialized synthetic marine salt formulation to create ocean salinity." },
  { name: "Refractometer", type: "essential", desc: "High-accuracy optical instrument to verify correct water salinity." },
  { name: "RO/DI Water Filter", type: "essential", desc: "Multi-stage pure water filter; tap water contains elements that cause algae crashes." },
  { name: "Filter/Sump System", type: "essential", desc: "For mechanical, chemical, and biological filtration media." },
  { name: "Marine Test Kit", type: "essential", desc: "Liquid kit for parameters like Ammonia, Nitrates, Alkalinity, and pH." },
  { name: "Siphon & Gravel Vacuum", type: "essential", desc: "To vacuum sand beds and perform routine marine water changes." },
  { name: "Quality Marine Food", type: "essential", desc: "Mysis/brine shrimp, nori sheets, and marine pellets." },
  { name: "Aquarium Stand", type: "essential", desc: "Sturdy support base capable of bearing heavy marine structures." },
  { name: "Protein Skimmer", type: "dependent", desc: "Highly recommended for coral reefs, optional for light bioload setups." },
  { name: "Aragonite Sand & Rock", type: "dependent", desc: "Marine substrate and biological base rock for biological filtration." },
  { name: "Submersible Heater", type: "dependent", desc: "Mandatory to keep marine species at stable tropical ocean temperatures." },
  { name: "Wavemakers / Powerheads", type: "dependent", desc: "Essential to generate water flow, preventing dead zones and feeding corals." },
  { name: "Reef-Capable LED Light", type: "dependent", desc: "Mandatory to support photosynthetic corals, optional for fish-only tanks." }
];

interface ChecklistState {
  fresh: string[];
  salt: string[];
}

export default function ChecklistSection() {
  const [activeTab, setActiveTab] = useState<'fresh' | 'salt'>('fresh');
  const [checkedState, setCheckedState] = useState<ChecklistState>({ fresh: [], salt: [] });
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setCheckedState(storage.get<ChecklistState>(KEYS.CHECKLIST, { fresh: [], salt: [] }));
    setIsMounted(true);
  }, []);

  const list = activeTab === 'fresh' ? freshwaterList : saltwaterList;
  const currentChecked = activeTab === 'fresh' ? checkedState.fresh : checkedState.salt;

  const toggleCheck = (name: string) => {
    const isChecked = currentChecked.includes(name);
    let updatedList: string[];
    
    if (isChecked) {
      updatedList = currentChecked.filter(item => item !== name);
    } else {
      updatedList = [...currentChecked, name];
    }

    const newState = {
      ...checkedState,
      [activeTab === 'fresh' ? 'fresh' : 'salt']: updatedList
    };

    setCheckedState(newState);
    storage.set(KEYS.CHECKLIST, newState);

    // Check achievement unlock
    if (updatedList.length === list.length) {
      unlockAchievement('first-setup');
    }
  };

  const handleReset = () => {
    const newState = {
      ...checkedState,
      [activeTab === 'fresh' ? 'fresh' : 'salt']: []
    };
    setCheckedState(newState);
    storage.set(KEYS.CHECKLIST, newState);
  };

  const percent = list.length > 0 ? Math.round((currentChecked.length / list.length) * 100) : 0;

  const getBadge = (type: ChecklistItem['type']) => {
    switch (type) {
      case 'essential':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">Essential</span>;
      case 'dependent':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">Setup Dependent</span>;
      case 'optional':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">Optional</span>;
    }
  };

  if (!isMounted) {
    return (
      <section className="py-24 bg-background border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <p className="text-muted-foreground">Loading checklist...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-semibold mb-4">
            <ClipboardList className="w-4 h-4" /> Essential Shopping
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-foreground">
            The Ultimate Starter Checklist
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Differentiate between mandatory gear and species-specific items. Click to check off items as you compile your shopping list!
          </p>
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button 
              onClick={() => setActiveTab('fresh')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 text-lg font-bold transition-colors ${
                activeTab === 'fresh' 
                  ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-b-2 border-cyan-500' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Droplets className="w-5 h-5" /> Freshwater Setup
            </button>
            <button 
              onClick={() => setActiveTab('salt')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 text-lg font-bold transition-colors ${
                activeTab === 'salt' 
                  ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-b-2 border-blue-500' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Waves className="w-5 h-5" /> Saltwater Setup
            </button>
          </div>

          {/* List */}
          <div className="p-6 md:p-10">
            {/* Progress Bar Container */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  Progress: {currentChecked.length} of {list.length} completed ({percent}%)
                </span>
                {currentChecked.length > 0 && (
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset active checklist
                  </button>
                )}
              </div>
              
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full transition-all duration-500 ease-out" 
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                {currentChecked.length === list.length ? (
                  <span className="text-emerald-500 font-bold animate-pulse flex items-center gap-1">
                    <Check className="w-4 h-4" /> You are fully prepared to start! (Achievement Unlocked)
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-lg border border-border">
                    <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Optional & Dependent items are not mandatory for all setups.
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {list.map((item, idx) => {
                const isItemChecked = currentChecked.includes(item.name);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(item.name)}
                    className={`flex items-start text-left gap-4 p-5 rounded-2xl border transition-all cursor-pointer select-none group h-full ${
                      isItemChecked
                        ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/40 shadow-sm'
                        : 'bg-background border-border hover:border-cyan-500/40 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                      isItemChecked
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-muted-foreground/30 group-hover:border-cyan-500'
                    }`}>
                      {isItemChecked && <Check className="w-4 h-4" />}
                    </div>
                    
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`font-bold transition-all text-base leading-tight ${
                          isItemChecked ? 'text-muted-foreground line-through' : 'text-foreground'
                        }`}>
                          {item.name}
                        </span>
                        {getBadge(item.type)}
                      </div>
                      <p className={`text-xs leading-relaxed transition-all ${
                        isItemChecked ? 'text-muted-foreground/60 line-through' : 'text-muted-foreground'
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

