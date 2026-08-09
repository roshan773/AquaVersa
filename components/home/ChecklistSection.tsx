'use client';
import { useState } from 'react';
import { Check, ClipboardList, Droplets, Waves } from 'lucide-react';

const freshwaterList = [
  "Aquarium Tank & Stand",
  "Substrate (Gravel/Sand/AquaSoil)",
  "Filter (Sponge or HOB) & Media",
  "Submersible Heater (if tropical)",
  "LED Light (Full spectrum for plants)",
  "Water Conditioner (Dechlorinator)",
  "API Freshwater Master Test Kit",
  "Siphon / Gravel Vacuum",
  "Fish Net",
  "Quality Fish Food (Pellets/Flakes)"
];

const saltwaterList = [
  "Aquarium Tank & Sturdy Stand",
  "Aragonite Sand & Dry/Live Rock",
  "RO/DI Water System",
  "Marine Salt Mix",
  "Refractometer (Salinity Tester)",
  "Protein Skimmer",
  "Wavemakers / Powerheads",
  "Reef-capable LED Lighting",
  "Marine Test Kit (Ammonia, Nitrate, Alk, Calcium)",
  "Submersible Heater"
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

  // Reset checks when switching tabs
  const handleTabSwitch = (tab: 'fresh' | 'salt') => {
    setActiveTab(tab);
    setCheckedItems([]);
  };

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-semibold mb-4">
            <ClipboardList className="w-4 h-4" /> Essential Shopping
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-foreground">
            The Ultimate Starter Checklist
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't go to the fish store unprepared. Here is exactly what you need to buy before bringing any fish home.
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
            <div className="mb-6 flex justify-between items-center text-sm font-semibold text-muted-foreground">
              <span>{checkedItems.length} of {list.length} items selected</span>
              {checkedItems.length === list.length && (
                <span className="text-emerald-500 animate-pulse flex items-center gap-1">
                  <Check className="w-4 h-4" /> Ready to go!
                </span>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {list.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`flex items-center text-left gap-4 p-4 rounded-2xl border transition-all ${
                    checkedItems.includes(idx)
                      ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/50'
                      : 'bg-background border-border hover:border-cyan-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    checkedItems.includes(idx)
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-muted-foreground/30'
                  }`}>
                    {checkedItems.includes(idx) && <Check className="w-4 h-4" />}
                  </div>
                  <span className={`font-medium transition-all ${
                    checkedItems.includes(idx) ? 'text-muted-foreground line-through' : 'text-foreground'
                  }`}>
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
