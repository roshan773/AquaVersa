'use client';
import { useState } from 'react';
import { Check, ClipboardList, Droplets, Waves, Info } from 'lucide-react';

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

export default function ChecklistSection() {
  const [activeTab, setActiveTab] = useState<'fresh' | 'salt'>('fresh');
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const list = activeTab === 'fresh' ? freshwaterList : saltwaterList;

  const handleTabSwitch = (tab: 'fresh' | 'salt') => {
    setActiveTab(tab);
    setCheckedItems([]);
  };

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
              onClick={() => handleTabSwitch('fresh')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 text-lg font-bold transition-colors ${
                activeTab === 'fresh' 
                  ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-b-2 border-cyan-500' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Droplets className="w-5 h-5" /> Freshwater Setup
            </button>
            <button 
              onClick={() => handleTabSwitch('salt')}
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
            <div className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-sm font-semibold text-muted-foreground border-b border-border/50 pb-4">
              <span>{checkedItems.length} of {list.length} items checked off</span>
              {checkedItems.length === list.length ? (
                <span className="text-emerald-500 animate-pulse flex items-center gap-1">
                  <Check className="w-4 h-4 font-bold" /> You are fully prepared to start!
                </span>
              ) : (
                <span className="text-xs font-normal text-slate-400 flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg border border-border">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0" /> Optional & Dependent items are not mandatory for all aquariums.
                </span>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {list.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`flex items-start text-left gap-4 p-5 rounded-2xl border transition-all cursor-pointer select-none group h-full ${
                    checkedItems.includes(idx)
                      ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/40 shadow-sm'
                      : 'bg-background border-border hover:border-cyan-500/40 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                    checkedItems.includes(idx)
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-muted-foreground/30 group-hover:border-cyan-500'
                  }`}>
                    {checkedItems.includes(idx) && <Check className="w-4 h-4" />}
                  </div>
                  
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`font-bold transition-all text-base leading-tight ${
                        checkedItems.includes(idx) ? 'text-muted-foreground line-through' : 'text-foreground'
                      }`}>
                        {item.name}
                      </span>
                      {getBadge(item.type)}
                    </div>
                    <p className={`text-xs leading-relaxed transition-all ${
                      checkedItems.includes(idx) ? 'text-muted-foreground/60 line-through' : 'text-muted-foreground'
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
