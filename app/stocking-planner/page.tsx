'use client';

import { useState, useEffect } from 'react';
import { Layers, Info, CheckCircle2, AlertTriangle, XCircle, RefreshCw, PlusCircle, Trash2, Minus, Plus } from 'lucide-react';
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

  // Stock details & logic
  const selectedFish = stock.map(item => {
    const details = fishData.find(f => f.id === item.id)!;
    return { ...item, details };
  });

  // Calculations
  // Bioload points calculation (biomass factor)
  let totalBioloadPoints = 0;
  let bottomDwellerCount = 0;
  let topDwellerCount = 0;
  let midDwellerCount = 0;
  let needsSchoolWarning = false;
  let minFilterFlow = 0;
  const concerns: string[] = [];

  selectedFish.forEach(fish => {
    const size = fish.details.maxSize || 1.5;
    let factor = 1.0;
    
    // waste multiplier
    if (size >= 8) factor = 4.0;
    else if (size >= 5) factor = 2.5;
    else if (size >= 2.5) factor = 1.5;

    totalBioloadPoints += size * fish.quantity * factor;

    // Categorize swimming zones based on taxonomy
    const slug = fish.details.slug || '';
    if (slug.includes('corydoras') || slug.includes('goby') || slug.includes('sucker-fish')) {
      bottomDwellerCount += fish.quantity;
    } else if (slug.includes('betta') || slug.includes('guppy') || slug.includes('danio')) {
      topDwellerCount += fish.quantity;
    } else {
      midDwellerCount += fish.quantity;
    }

    // Schooling checks
    const isSchooler = ['neon-tetra', 'zebra-danio', 'cherry-barb', 'harlequin-rasbora', 'corydoras-catfish', 'neon-dwarf-rainbowfish', 'pajama-cardinalfish'].includes(slug);
    if (isSchooler && fish.quantity < 6) {
      needsSchoolWarning = true;
    }
  });

  const bioloadPercent = tankSize > 0 ? Math.round((totalBioloadPoints / tankSize) * 100) : 0;
  
  // Filtration turnover flow rates based on bioload density:
  // Light bioload (<50%) -> 5x volume/hour
  // Medium bioload (50-80%) -> 8x volume/hour
  // High bioload (>80%) -> 10x volume/hour
  let flowFactor = 5;
  if (bioloadPercent > 80) flowFactor = 10;
  else if (bioloadPercent > 50) flowFactor = 8;
  
  minFilterFlow = Math.round(tankSize * 3.78541 * flowFactor); // converted to Liters/hour

  // Environment checks
  const categories = Array.from(new Set(selectedFish.map(f => f.details.category?.toLowerCase() || '')));
  if (categories.includes('freshwater') && categories.includes('saltwater')) {
    concerns.push("Cannot mix freshwater and marine species.");
  }

  // School size warnings
  selectedFish.forEach(fish => {
    const slug = fish.details.slug || '';
    const isSchooler = ['neon-tetra', 'zebra-danio', 'cherry-barb', 'harlequin-rasbora', 'corydoras-catfish', 'neon-dwarf-rainbowfish', 'pajama-cardinalfish'].includes(slug);
    if (isSchooler && fish.quantity < 6) {
      concerns.push(`${fish.details.name} needs a group of at least 6 to school and feel secure.`);
    }
  });

  // Size limit warning
  selectedFish.forEach(fish => {
    if (fish.details.minTankSize && fish.details.minTankSize > tankSize) {
      concerns.push(`${fish.details.name} requires a minimum tank size of ${fish.details.minTankSize} Gallons.`);
    }
  });

  // Footprint alerts
  const footprintAlerts: string[] = [];
  if (bottomDwellerCount > 10 && tankSize < 30) {
    footprintAlerts.push("High bottom dweller density. Bottom-dwellers (like Corydoras) compete for substrate floor space. Ensure you have sandy substrate and caves.");
  }
  if (topDwellerCount > 12 && tankSize < 20) {
    footprintAlerts.push("High top dweller density. Guppies, Danios, and Bettas inhabit the upper column. Ensure you have a secure lid to prevent jumps from crowding.");
  }

  // Trigger achievement
  useEffect(() => {
    if (stock.length >= 2 && bioloadPercent <= 100 && concerns.length === 0) {
      unlockAchievement('stocking-plan');
    }
  }, [stock, bioloadPercent, concerns]);

  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <Layers className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Stocking Planner</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Enter your tank size, add fish, and watch stocking density calculate instantly. Plan proper group sizes and manage water column space.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background font-sans">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Input list column */}
            <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-lg space-y-6 text-left">
              <div className="flex flex-col sm:flex-row gap-6 border-b border-border pb-6">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Tank Volume (US Gallons)</label>
                  <input 
                    type="number"
                    value={tankSize || ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setTankSize(val);
                      saveCurrentState(stock, val);
                    }}
                    placeholder="Volume"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-cyan-500 font-mono font-bold"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Select Species to Add</label>
                  <div className="flex gap-2">
                    <select
                      value={selectedFishId}
                      onChange={(e) => setSelectedFishId(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-cyan-500 text-foreground"
                    >
                      <option value="">Choose a species...</option>
                      {fishData.map(fish => (
                        <option key={fish.id} value={fish.id}>
                          {fish.name} ({fish.category})
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddFish}
                      disabled={!selectedFishId}
                      className="px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <PlusCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Placed list */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-foreground">Stock List</h3>
                  {stock.length > 0 && (
                    <button 
                      onClick={handleReset}
                      className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Clear Planner
                    </button>
                  )}
                </div>

                {stock.length === 0 ? (
                  <div className="text-center py-12 border border-border border-dashed rounded-2xl bg-muted/20">
                    <Info className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Select species from the menu to populate your tank.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {stock.map(item => {
                      const fish = fishData.find(f => f.id === item.id)!;
                      return (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded-2xl">
                          <div>
                            <span className="font-bold text-foreground text-sm sm:text-base">{fish.name}</span>
                            <span className="text-[10px] text-muted-foreground block font-sans">Requires {fish.minTankSize} Gal | Max size: {fish.maxSize}"</span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center bg-background rounded-lg border border-border">
                              <button 
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="p-1.5 hover:bg-muted text-muted-foreground transition-colors rounded-l-lg cursor-pointer"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-3 font-mono font-bold text-sm text-foreground">{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="p-1.5 hover:bg-muted text-muted-foreground transition-colors rounded-r-lg cursor-pointer"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => handleRemoveFish(item.id)}
                              className="text-muted-foreground hover:text-destructive p-1 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Results Sidebar Column */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="bg-card border border-border rounded-3xl p-6 shadow-md space-y-6 flex flex-col justify-between self-stretch">
                <div>
                  <h3 className="font-bold text-lg text-foreground border-b border-border/40 pb-3 font-poppins">Planner Results</h3>
                  
                  {/* Stock pressure percentage */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center text-xs font-bold text-muted-foreground mb-2">
                      <span>Stocking Capacity</span>
                      <span className={bioloadPercent > 100 ? 'text-rose-500' : bioloadPercent > 80 ? 'text-amber-500' : 'text-emerald-500'}>
                        {bioloadPercent}% {bioloadPercent > 100 ? '(Overstocked)' : bioloadPercent > 80 ? '(Nearing Limit)' : '(Safe)'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full transition-all duration-500 ease-out ${
                          bioloadPercent > 100 ? 'bg-rose-500' : bioloadPercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(bioloadPercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Footprint Zones */}
                  <div className="mt-6 space-y-3 border-t border-border/40 pt-4">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Water Column Zones</h4>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                      <div className="bg-muted p-2 rounded-xl border border-border">
                        <span className="block text-muted-foreground text-[10px]">Top / Lid</span>
                        <span className="text-foreground text-sm font-mono font-bold">{topDwellerCount} Fish</span>
                      </div>
                      <div className="bg-muted p-2 rounded-xl border border-border">
                        <span className="block text-muted-foreground text-[10px]">Mid Column</span>
                        <span className="text-foreground text-sm font-mono font-bold">{midDwellerCount} Fish</span>
                      </div>
                      <div className="bg-muted p-2 rounded-xl border border-border">
                        <span className="block text-muted-foreground text-[10px]">Bottom Bed</span>
                        <span className="text-foreground text-sm font-mono font-bold">{bottomDwellerCount} Fish</span>
                      </div>
                    </div>
                  </div>

                  {/* Filtration turnover */}
                  <div className="mt-6 border-t border-border/40 pt-4 space-y-1 text-xs">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Filtration Requirements</h4>
                    <p className="text-foreground">Required Filter flow turnover rate:</p>
                    <p className="text-xl font-poppins font-black text-cyan-500">
                      &ge; {minFilterFlow} L/h <span className="text-xs text-muted-foreground font-sans font-normal">( turnover factor: {flowFactor}x )</span>
                    </p>
                  </div>

                  {/* Alert Lists */}
                  {concerns.length > 0 && (
                    <div className="mt-6 border-t border-border/40 pt-4 space-y-2">
                      <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Grouping & Size Alerts
                      </h4>
                      <ul className="space-y-1.5 list-disc pl-4 text-xs text-muted-foreground leading-relaxed">
                        {concerns.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {footprintAlerts.length > 0 && (
                    <div className="mt-6 border-t border-border/40 pt-4 space-y-2">
                      <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Substrate Footprint Alerts
                      </h4>
                      <ul className="space-y-1.5 list-disc pl-4 text-xs text-muted-foreground leading-relaxed">
                        {footprintAlerts.map((ft, i) => (
                          <li key={i}>{ft}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-muted-foreground border-t border-border/50 pt-4 leading-relaxed mt-6">
                  <strong>Stocking Safety Disclaimer:</strong> This engine calculates bioload points based on adult body sizes, waste factors, and specific water layer distribution rather than standard length rules.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <GlobalCTA
        badge="SPECIES COMPATIBILITY & COMMUNITY DESIGN"
        title={
          <>
            Explore full species profiles <br className="hidden sm:inline" />
            and care requirements.
          </>
        }
        description="Verify individual diet needs, lifespan, geographical origins, and behavior for every freshwater and saltwater fish."
        primaryAction={{
          label: 'Browse Species Catalog',
          href: '/fish',
        }}
        secondaryAction={{
          label: 'Test Water Chemistry',
          href: '/water-analyzer',
        }}
      />
    </div>
  );
}
