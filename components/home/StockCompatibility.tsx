'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, CheckCircle2, AlertTriangle, XCircle, Info, RefreshCw, PlusCircle } from 'lucide-react';
import { fishData } from '@/data/fish';
import { storage, KEYS, unlockAchievement } from '@/lib/storage';

interface StockItem {
  id: string;
  quantity: number;
}

export default function StockCompatibility() {
  const [tankSize, setTankSize] = useState<number>(30);
  const [stock, setStock] = useState<StockItem[]>([]);
  const [selectedFishId, setSelectedFishId] = useState<string>('');

  // Load saved stock from localStorage on mount
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

  const handleTankSizeChange = (val: string) => {
    const size = parseInt(val) || 0;
    setTankSize(size);
    saveCurrentState(stock, size);
  };

  // Parsing Numeric ranges (same as FishCompatibility.tsx)
  const parseRange = (value?: string): [number, number] | null => {
    if (!value) return null;
    const matches = value.match(/(-?\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(-?\d+(?:\.\d+)?)/i);
    if (!matches) return null;
    const a = Number(matches[1]);
    const b = Number(matches[2]);
    return [Math.min(a, b), Math.max(a, b)];
  };

  // Stock Compatibility Calculations
  const analyzeCompatibility = () => {
    if (stock.length === 0) {
      return {
        status: 'BLUE',
        title: 'Empty Stock List',
        explanation: 'Add species from the dropdown menu to build your stocking plan and check community compatibility.',
        positives: [],
        warnings: [],
        errors: [],
        bioloadPercent: 0
      };
    }

    const selectedFish = stock.map(item => {
      const details = fishData.find(f => f.id === item.id)!;
      return { ...item, details };
    });

    const warnings: string[] = [];
    const errors: string[] = [];
    const positives: string[] = [];

    // 1. Water Type check (Freshwater vs Saltwater)
    const categories = Array.from(new Set(selectedFish.map(f => f.details.category?.toLowerCase() || '')));
    const hasFresh = categories.includes('freshwater');
    const hasSalt = categories.includes('saltwater');
    
    if (hasFresh && hasSalt) {
      errors.push("Saltwater & Freshwater Mix: You cannot mix saltwater (marine) species and freshwater species in the same aquarium.");
    } else if (hasFresh) {
      positives.push("Environment: All species are freshwater compatible.");
    } else if (hasSalt) {
      positives.push("Environment: All species are saltwater compatible.");
    }

    // 2. Temperature check
    let tempOverlap: [number, number] = [0, 999];
    selectedFish.forEach(fish => {
      const range = parseRange(fish.details.temperature);
      if (range) {
        tempOverlap = [Math.max(tempOverlap[0], range[0]), Math.min(tempOverlap[1], range[1])];
      }
    });

    if (tempOverlap[0] > tempOverlap[1]) {
      errors.push(`Temperature Mismatch: The selected species require conflicting water temperatures. There is no overlapping safe temperature range.`);
    } else {
      const overlapWidth = tempOverlap[1] - tempOverlap[0];
      if (overlapWidth < 3) {
        warnings.push(`Narrow Temperature Overlap: Keep water temperature strictly stable between ${tempOverlap[0]}–${tempOverlap[1]}°F to accommodate all species.`);
      } else {
        positives.push(`Temperature: Safe overlap range is approximately ${tempOverlap[0]}–${tempOverlap[1]}°F.`);
      }
    }

    // 3. pH check
    let phOverlap: [number, number] = [0, 14];
    selectedFish.forEach(fish => {
      const range = parseRange(fish.details.ph);
      if (range) {
        phOverlap = [Math.max(phOverlap[0], range[0]), Math.min(phOverlap[1], range[1])];
      }
    });

    if (phOverlap[0] > phOverlap[1]) {
      errors.push(`pH Level Mismatch: The selected species require conflicting pH levels. Their environmental chemistry needs are incompatible.`);
    } else {
      const overlapWidth = phOverlap[1] - phOverlap[0];
      if (overlapWidth < 0.4) {
        warnings.push(`Narrow pH Overlap: Water pH must be kept stable between ${phOverlap[0].toFixed(1)}–${phOverlap[1].toFixed(1)}.`);
      } else {
        positives.push(`pH range: Safe overlap is pH ${phOverlap[0].toFixed(1)}–${phOverlap[1].toFixed(1)}.`);
      }
    }

    // 4. Temperament & Schooling Checks
    let hasAggressive = false;
    let hasSemiAggressive = false;
    let hasPeaceful = false;
    let territorialCount = 0;

    selectedFish.forEach(fish => {
      const temp = fish.details.temperament?.toLowerCase();
      if (temp?.includes('semi-aggressive')) hasSemiAggressive = true;
      else if (temp?.includes('aggressive')) hasAggressive = true;
      else if (temp?.includes('peaceful') || temp?.includes('community')) hasPeaceful = true;

      // Schooling requirements
      const isSchooling = ['neon-tetra', 'zebra-danio', 'cherry-barb', 'harlequin-rasbora', 'corydoras-catfish', 'neon-dwarf-rainbowfish', 'pajama-cardinalfish'].includes(fish.details.slug || '');
      if (isSchooling && fish.quantity < 6) {
        warnings.push(`Schooling Needs: ${fish.details.name} is a schooling species and should be kept in a group of at least 6 (currently keeping ${fish.quantity}).`);
      }

      // Territorial species conspecific conflicts
      if (fish.details.slug === 'betta-fish') {
        if (fish.quantity > 1) {
          errors.push("Multiple Bettas: Bettas are highly territorial. Multiple Bettas (especially males) should not share a tank.");
        }
      }
      const isTerritorial = ['betta-fish', 'angelfish', 'oscar', 'royal-gramma', 'yellow-watchman-goby', 'yellow-tang', 'coral-beauty'].includes(fish.details.slug || '');
      if (isTerritorial) {
        territorialCount += fish.quantity;
      }
    });

    if (hasAggressive && hasPeaceful) {
      errors.push("Aggressive & Peaceful Mix: Combining aggressive predators/fin-nippers with peaceful community fish is strongly discouraged.");
    } else if (hasSemiAggressive && hasPeaceful) {
      warnings.push("Semi-Aggressive & Peaceful Mix: Semi-aggressive species require careful monitoring. Provide plenty of rock cave hiding spots and plant cover to break lines of sight.");
    }

    if (territorialCount > 2) {
      warnings.push(`High Territorial Density: You have ${territorialCount} territorial fish. Ensure you have ample visual barriers and caves to reduce aggression.`);
    }

    // 5. Predator / Prey Risks (e.g. Angelfish + Neon Tetra)
    const hasOscar = selectedFish.some(f => f.details.slug === 'oscar');
    const hasAngelfish = selectedFish.some(f => f.details.slug === 'angelfish');
    const smallSlenderFish = selectedFish.some(f => ['neon-tetra', 'guppy', 'zebra-danio'].includes(f.details.slug || ''));
    
    if (hasOscar && smallSlenderFish) {
      errors.push("Severe Predation Risk: Oscars grow very large and will easily swallow small community fish like Tetras or Guppies.");
    } else if (hasAngelfish && selectedFish.some(f => f.details.slug === 'neon-tetra')) {
      errors.push("Predation Risk: Mature Angelfish are opportunistic predators and often swallow small, slender Neon Tetras as they grow.");
    }

    // 6. Tank Size requirement
    let maxMinTankSizeRequired = 0;
    let limitingFishName = '';

    selectedFish.forEach(fish => {
      const reqSize = fish.details.minTankSize || 0;
      if (reqSize > maxMinTankSizeRequired) {
        maxMinTankSizeRequired = reqSize;
        limitingFishName = fish.details.name;
      }
    });

    if (tankSize < maxMinTankSizeRequired) {
      errors.push(`Tank Size Too Small: The minimum tank size required for ${limitingFishName} is ${maxMinTankSizeRequired} gallons (your tank is ${tankSize} gallons).`);
    } else if (tankSize > 0) {
      positives.push(`Tank Volume: Your ${tankSize} gallon tank meets the minimum threshold of ${maxMinTankSizeRequired} gallons required by the largest species (${limitingFishName}).`);
    }

    // 7. Stocking Pressure (Bioload) Calculation
    // Slender/Small: size < 2.5in -> factor 1
    // Medium: size 2.5 - 5in -> factor 1.5
    // Large: size 5 - 8in -> factor 2.5
    // Very Large: size > 8in -> factor 4
    let totalBioloadPoints = 0;
    selectedFish.forEach(fish => {
      const size = fish.details.maxSize || 1.5;
      let factor = 1.0;
      if (size >= 8) factor = 4.0;
      else if (size >= 5) factor = 2.5;
      else if (size >= 2.5) factor = 1.5;

      totalBioloadPoints += size * fish.quantity * factor;
    });

    const bioloadPercent = tankSize > 0 ? Math.round((totalBioloadPoints / tankSize) * 100) : 0;

    if (bioloadPercent > 110) {
      errors.push(`Overstocked (${bioloadPercent}%): Total bioload exceeds the filtration capability of a standard ${tankSize} gallon setup. Reduce quantity or upgrade tank size.`);
    } else if (bioloadPercent > 80) {
      warnings.push(`Moderately Stocked (${bioloadPercent}%): The tank is nearing capacity. Excellent biological filtration and strict weekly maintenance are required.`);
    } else {
      positives.push(`Bioload Level (${bioloadPercent}%): Stocking level is light and safe for this volume.`);
    }

    // Overall Status
    let statusColor = 'emerald';
    let overallStatus = 'GREEN';
    let title = 'Good Combination';
    let explanation = 'All selected species are compatible in pH, temperature, environment, and social dynamics. Bioload is well managed.';

    if (errors.length > 0) {
      statusColor = 'red';
      overallStatus = 'RED';
      title = 'Not Recommended';
      explanation = 'Critical compatibility errors found. Housing these fish together is highly likely to result in stress, disease, aggression, or fatalities.';
    } else if (warnings.length > 0) {
      statusColor = 'amber';
      overallStatus = 'YELLOW';
      title = 'Possible with Conditions';
      explanation = 'The species can be combined, but require specific care plans, strict water parameter monitoring, large hiding areas, or increased school sizes.';
    }

    // Unlock achievement
    if (overallStatus === 'GREEN' && stock.length >= 2) {
      unlockAchievement('stocking-plan');
    }

    return {
      status: overallStatus,
      statusColor,
      title,
      explanation,
      positives,
      warnings,
      errors,
      bioloadPercent
    };
  };

  const results = analyzeCompatibility();

  return (
    <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-xl">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 border-b border-border pb-6">
            <div className="flex-1">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Tank Size (US Gallons)</label>
              <input 
                type="number"
                value={tankSize || ''}
                onChange={(e) => handleTankSizeChange(e.target.value)}
                placeholder="Gallons"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-cyan-500 font-mono font-bold"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 font-sans">Add Fish Species</label>
              <div className="flex gap-2">
                <select
                  value={selectedFishId}
                  onChange={(e) => setSelectedFishId(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-cyan-500 text-foreground"
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
                  className="px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Added Stock List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-foreground">Current Stock List ({stock.length})</h3>
              {stock.length > 0 && (
                <button 
                  onClick={handleReset}
                  className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Stock
                </button>
              )}
            </div>

            {stock.length === 0 ? (
              <div className="text-center py-12 border border-border border-dashed rounded-2xl bg-muted/20">
                <Info className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No fish added yet. Select a fish above to begin stocking.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stock.map(item => {
                  const fish = fishData.find(f => f.id === item.id)!;
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-muted/40 border border-border rounded-2xl">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-foreground text-sm sm:text-base">{fish.name}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground px-2 py-0.5 rounded bg-muted border border-border shrink-0">
                          {fish.category}
                        </span>
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

        {/* Right Side: Analysis Dashboard */}
        <div className="lg:col-span-5 bg-muted/30 border border-border rounded-3xl p-6 flex flex-col justify-between self-stretch text-left">
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Compatibility Verdict</h3>
            
            {/* Status card */}
            <div className={`p-5 rounded-2xl border text-left mb-6 ${
              results.status === 'RED' ? 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400' :
              results.status === 'YELLOW' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' :
              results.status === 'BLUE' ? 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' :
              'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
            }`}>
              <div className="flex items-center gap-2 mb-2 font-bold text-lg">
                {results.status === 'RED' && <XCircle className="w-6 h-6 text-rose-500 shrink-0" />}
                {results.status === 'YELLOW' && <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />}
                {results.status === 'BLUE' && <Info className="w-6 h-6 text-blue-500 shrink-0" />}
                {results.status === 'GREEN' && <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />}
                <span>{results.title}</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">{results.explanation}</p>
            </div>

            {/* Bioload visual progress */}
            {stock.length > 0 && (
              <div className="mb-6 border-b border-border/50 pb-6">
                <div className="flex justify-between items-center text-xs font-bold text-muted-foreground mb-2">
                  <span>Tank Stocking Pressure</span>
                  <span className={results.bioloadPercent > 100 ? 'text-rose-500' : results.bioloadPercent > 80 ? 'text-amber-500' : 'text-emerald-500'}>
                    {results.bioloadPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full transition-all duration-500 ease-out ${
                      results.bioloadPercent > 100 ? 'bg-rose-500' : results.bioloadPercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(results.bioloadPercent, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Explanatory Details */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {results.errors.map((err, i) => (
                <div key={i} className="flex gap-2 text-xs text-rose-600 dark:text-rose-400 font-medium">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{err}</span>
                </div>
              ))}
              
              {results.warnings.map((warn, i) => (
                <div key={i} className="flex gap-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{warn}</span>
                </div>
              ))}

              {results.positives.map((pos, i) => (
                <div key={i} className="flex gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{pos}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-[10px] text-muted-foreground border-t border-border mt-6 pt-4 leading-relaxed">
            Note: This calculations engine does not use the outdated "1 inch per gallon" rule, but computes species behavior, waste rating, schooling, and biomass.
          </div>
        </div>
      </div>
    </div>
  );
}
