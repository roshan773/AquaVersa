'use client';

import { useState, useEffect } from 'react';
import { Layers, Info, CheckCircle2, AlertTriangle, XCircle, RefreshCw, PlusCircle, Trash2, Minus, Plus, Compass, Activity, ShieldCheck } from 'lucide-react';
import { fishData } from '@/data/fish';
import { storage, KEYS, unlockAchievement } from '@/lib/storage';
import GlobalCTA from '@/components/ui/GlobalCTA';

interface StockItem {
  id: string;
  quantity: number;
}

export default function StockingPlannerPage() {
  const [tankSize, setTankSize] = useState<number>(30);
  const [stock, setStock] = useState<StockItem[]>([]);
  const [selectedFishId, setSelectedFishId] = useState<string>('');

  // Load from storage
  useEffect(() => {
    const saved = storage.get<{ tankSize: number; stock: StockItem[] }>(KEYS.SAVED_STOCK, {
      tankSize: 30,
      stock: []
    });
    setTankSize(saved.tankSize);
    setStock(saved.stock);
  }, []);

  const saveCurrentState = (updatedStock: StockItem[], updatedSize: number) => {
    storage.set(KEYS.SAVED_STOCK, {
      tankSize: updatedSize,
      stock: updatedStock
    });
  };

  const handleAddFish = () => {
    if (!selectedFishId) return;
    const existing = stock.find(item => item.id === selectedFishId);
    let updated: StockItem[];
    if (existing) {
      updated = stock.map(item => 
        item.id === selectedFishId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...stock, { id: selectedFishId, quantity: 1 }];
    }
    setStock(updated);
    saveCurrentState(updated, tankSize);
    setSelectedFishId('');
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const updated = stock.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
    setStock(updated);
    saveCurrentState(updated, tankSize);
  };

  const handleRemoveFish = (id: string) => {
    const updated = stock.filter(item => item.id !== id);
    setStock(updated);
    saveCurrentState(updated, tankSize);
  };

  const handleReset = () => {
    setStock([]);
    setTankSize(30);
    saveCurrentState([], 30);
  };

  const selectedFish = stock.map(item => {
    const details = fishData.find(f => f.id === item.id)!;
    return { ...item, details };
  });

  let totalBioloadPoints = 0;
  let bottomDwellerCount = 0;
  let topDwellerCount = 0;
  let midDwellerCount = 0;
  const concerns: string[] = [];

  selectedFish.forEach(fish => {
    const size = fish.details.maxSize || 1.5;
    let factor = 1.0;
    
    if (size >= 8) factor = 4.0;
    else if (size >= 5) factor = 2.5;
    else if (size >= 2.5) factor = 1.5;

    totalBioloadPoints += size * fish.quantity * factor;

    const slug = fish.details.slug || '';
    if (slug.includes('corydoras') || slug.includes('goby') || slug.includes('sucker-fish')) {
      bottomDwellerCount += fish.quantity;
    } else if (slug.includes('betta') || slug.includes('guppy') || slug.includes('danio')) {
      topDwellerCount += fish.quantity;
    } else {
      midDwellerCount += fish.quantity;
    }
  });

  const bioloadPercent = tankSize > 0 ? Math.round((totalBioloadPoints / tankSize) * 100) : 0;
  
  let flowFactor = 5;
  if (bioloadPercent > 80) flowFactor = 10;
  else if (bioloadPercent > 50) flowFactor = 8;
  
  const minFilterFlow = Math.round(tankSize * 3.78541 * flowFactor);

  const categories = Array.from(new Set(selectedFish.map(f => f.details.category?.toLowerCase() || '')));
  if (categories.includes('freshwater') && categories.includes('saltwater')) {
    concerns.push("Incompatible Habitats: Cannot mix freshwater and marine species.");
  }

  selectedFish.forEach(fish => {
    const slug = fish.details.slug || '';
    const isSchooler = ['neon-tetra', 'zebra-danio', 'cherry-barb', 'harlequin-rasbora', 'corydoras-catfish', 'neon-dwarf-rainbowfish', 'pajama-cardinalfish'].includes(slug);
    if (isSchooler && fish.quantity < 6) {
      concerns.push(`${fish.details.name} is a shoaling species and requires a group of at least 6 to prevent chronic stress.`);
    }
  });

  selectedFish.forEach(fish => {
    if (fish.details.minTankSize && fish.details.minTankSize > tankSize) {
      concerns.push(`${fish.details.name} requires a minimum tank volume of ${fish.details.minTankSize} Gallons.`);
    }
  });

  const footprintAlerts: string[] = [];
  if (bottomDwellerCount > 10 && tankSize < 30) {
    footprintAlerts.push("High bottom-dweller density: Substrate bottom space is crowded. Provide soft sand and multiple cave structures.");
  }
  if (topDwellerCount > 12 && tankSize < 20) {
    footprintAlerts.push("High upper-stratum density: Surface water layer is crowded. Ensure a tight-fitting canopy to prevent jumping.");
  }

  useEffect(() => {
    if (stock.length >= 2 && bioloadPercent <= 100 && concerns.length === 0) {
      unlockAchievement('stocking-plan');
    }
  }, [stock, bioloadPercent, concerns]);

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Biological Stocking Calculator</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            COMMUNITY STOCKING PLANNER
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl leading-relaxed">
            Enter aquarium volume, add fish species, and calculate stocking density, biological filtration turnover, and swimming layer distribution.
          </p>
        </div>

        {/* Planner Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Inputs & Stock List */}
          <div className="lg:col-span-7 bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-readable">
            <div className="flex flex-col sm:flex-row gap-6 border-b border-[#edeafc] pb-6">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-[#27187e]/80 uppercase tracking-wider mb-2">
                  Aquarium Volume (US Gallons)
                </label>
                <input 
                  type="number"
                  value={tankSize || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setTankSize(val);
                    saveCurrentState(stock, val);
                  }}
                  placeholder="Volume"
                  className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] focus:border-[#27187e] rounded-2xl px-4 py-3 text-base text-[#27187e] font-bold focus:outline-none transition-all shadow-sm"
                />
              </div>

              <div className="flex-1">
                <label className="block text-xs font-semibold text-[#27187e]/80 uppercase tracking-wider mb-2">
                  Add Species to Community
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedFishId}
                    onChange={(e) => setSelectedFishId(e.target.value)}
                    className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] focus:border-[#27187e] rounded-2xl px-3 py-3 text-sm sm:text-base font-readable text-[#27187e] focus:outline-none transition-all cursor-pointer font-medium shadow-sm"
                  >
                    <option value="">Select a species...</option>
                    {fishData.map(fish => (
                      <option key={fish.id} value={fish.id}>
                        {fish.name} ({fish.category})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddFish}
                    disabled={!selectedFishId}
                    className="px-4 py-3 bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] font-bold rounded-2xl transition-all disabled:opacity-40 flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* List */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-2xl text-[#27187e]">
                  Active Stocking List ({stock.length})
                </h3>
                {stock.length > 0 && (
                  <button 
                    onClick={handleReset}
                    className="text-xs sm:text-sm font-semibold text-[#27187e]/70 hover:text-[#27187e] flex items-center gap-1 cursor-pointer underline"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Clear Planner
                  </button>
                )}
              </div>

              {stock.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-[#cfcaf5] rounded-3xl bg-[#f7f7ff]/70 p-6">
                  <Info className="w-8 h-8 text-[#27187e]/40 mx-auto mb-2" />
                  <p className="text-base text-[#27187e]/80 font-medium">No fish in your stocking planner. Select species from the dropdown above to evaluate tank dynamics.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {stock.map(item => {
                    const fish = fishData.find(f => f.id === item.id)!;
                    return (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm sm:text-base text-[#27187e]">{fish.name}</span>
                          <span className="text-xs uppercase font-bold text-[#27187e] px-2.5 py-0.5 rounded-md bg-[#edeafc] border border-[#cfcaf5] shrink-0">
                            {fish.category}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="flex items-center bg-[#ffffff] rounded-xl border-2 border-[#cfcaf5]">
                            <button 
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="p-2 hover:bg-[#edeafc] text-[#27187e] transition-colors rounded-l-lg cursor-pointer"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 font-bold text-sm sm:text-base text-[#27187e]">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="p-2 hover:bg-[#edeafc] text-[#27187e] transition-colors rounded-r-lg cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => handleRemoveFish(item.id)}
                            className="text-[#27187e]/60 hover:text-[#27187e] p-2 rounded-xl hover:bg-[#edeafc] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Analysis Dashboard */}
          <div className="lg:col-span-5 bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-readable">
            <h3 className="font-display text-2xl sm:text-3xl text-[#27187e]">
              Capacity &amp; Sizing Verdict
            </h3>

            {/* Bioload meter */}
            <div className="p-5 rounded-2xl bg-[#f7f7ff] border-2 border-[#cfcaf5]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase font-semibold text-[#27187e]/80 tracking-wider">Bioload Index</span>
                <span className="font-bold text-base text-[#27187e]">{bioloadPercent}%</span>
              </div>
              <div className="w-full bg-[#edeafc] h-3.5 rounded-full overflow-hidden border border-[#cfcaf5]">
                <div 
                  className="h-full bg-[#27187e] transition-all duration-500"
                  style={{ width: `${Math.min(bioloadPercent, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Recommended filtration flow */}
            <div className="p-5 rounded-2xl bg-[#f7f7ff] border-2 border-[#cfcaf5] space-y-1.5">
              <span className="text-xs uppercase font-semibold text-[#27187e]/80 tracking-wider block">
                Required Filter Turnover Flow
              </span>
              <span className="font-display text-2xl sm:text-3xl text-[#27187e] block">
                {minFilterFlow} Liters/Hour
              </span>
              <p className="text-xs text-[#27187e]/70 font-medium">
                {flowFactor}x total volume hourly circulation required to handle waste.
              </p>
            </div>

            {/* Water layer distribution */}
            <div className="p-5 rounded-2xl bg-[#f7f7ff] border-2 border-[#cfcaf5] space-y-3">
              <span className="text-xs uppercase font-semibold text-[#27187e]/80 tracking-wider block">
                Swimming Zone Occupancy
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                <div className="p-2.5 rounded-xl bg-[#ffffff] border border-[#cfcaf5]">
                  <span className="block text-[#27187e]/70 text-[10px] uppercase">Top</span>
                  <span className="text-base text-[#27187e] font-bold">{topDwellerCount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#ffffff] border border-[#cfcaf5]">
                  <span className="block text-[#27187e]/70 text-[10px] uppercase">Mid</span>
                  <span className="text-base text-[#27187e] font-bold">{midDwellerCount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#ffffff] border border-[#cfcaf5]">
                  <span className="block text-[#27187e]/70 text-[10px] uppercase">Bottom</span>
                  <span className="text-base text-[#27187e] font-bold">{bottomDwellerCount}</span>
                </div>
              </div>
            </div>

            {/* Concerns / Alerts */}
            {concerns.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs uppercase font-bold text-[#27187e] tracking-wider block">
                  Biological Warnings ({concerns.length})
                </span>
                {concerns.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#27187e] bg-[#edeafc] p-3 rounded-xl border border-[#cfcaf5] font-medium leading-snug">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-[#27187e] mt-0.5" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            )}

            {footprintAlerts.length > 0 && (
              <div className="space-y-2.5">
                {footprintAlerts.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#27187e] bg-[#f7f7ff] p-3 rounded-xl border border-[#cfcaf5] font-medium leading-snug">
                    <Info className="w-4 h-4 shrink-0 text-[#27187e] mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      <GlobalCTA
        badge="AQUARIUM DIMENSION CALCULATOR"
        title={
          <>
            Calculate precise glass dimensions <br className="hidden sm:inline" />
            and water weight.
          </>
        }
        description="Verify substrate depth requirements, total filled system weight, and exact water displacement before setting up."
        primaryAction={{
          label: 'Open Tank Size Calculator',
          href: '/tank-size',
        }}
        secondaryAction={{
          label: 'Pairwise Compatibility Checker',
          href: '/compatibility',
        }}
      />
    </div>
  );
}
