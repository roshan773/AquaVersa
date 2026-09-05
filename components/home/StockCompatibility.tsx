'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, CheckCircle2, AlertTriangle, XCircle, Info, RefreshCw, PlusCircle, Scale, ShieldAlert, Check } from 'lucide-react';
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

  const parseRange = (value?: string): [number, number] | null => {
    if (!value) return null;
    const matches = value.match(/(-?\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(-?\d+(?:\.\d+)?)/i);
    if (!matches) return null;
    const a = Number(matches[1]);
    const b = Number(matches[2]);
    return [Math.min(a, b), Math.max(a, b)];
  };

  const analyzeCompatibility = () => {
    if (stock.length === 0) {
      return {
        status: 'BLUE',
        title: 'Empty Community Stock List',
        explanation: 'Add species from the dropdown menu to build your stocking plan and verify bioload and social compatibility.',
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

    // 1. Water Type check
    const categories = Array.from(new Set(selectedFish.map(f => f.details.category?.toLowerCase() || '')));
    const hasFresh = categories.includes('freshwater');
    const hasSalt = categories.includes('saltwater');
    
    if (hasFresh && hasSalt) {
      errors.push("Saltwater & Freshwater Conflict: You cannot cohouse marine and freshwater species in the same tank.");
    } else if (hasFresh) {
      positives.push("Environment: All selected fauna share freshwater requirements.");
    } else if (hasSalt) {
      positives.push("Environment: All selected fauna share marine/reef salinity requirements.");
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
      errors.push(`Temperature Conflict: Selected species have non-overlapping thermal tolerances.`);
    } else {
      const overlapWidth = tempOverlap[1] - tempOverlap[0];
      if (overlapWidth < 3) {
        warnings.push(`Narrow Temperature Window: Regulate water strictly between ${tempOverlap[0]}–${tempOverlap[1]}°F.`);
      } else {
        positives.push(`Thermal Overlap: Safe equilibrium window is ${tempOverlap[0]}–${tempOverlap[1]}°F.`);
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
      errors.push(`pH Incompatibility: Selected species have mutually exclusive acidity/alkalinity requirements.`);
    } else {
      const overlapWidth = phOverlap[1] - phOverlap[0];
      if (overlapWidth < 0.4) {
        warnings.push(`Narrow pH Window: Buffer water strictly between pH ${phOverlap[0].toFixed(1)}–${phOverlap[1].toFixed(1)}.`);
      } else {
        positives.push(`pH Overlap: Balanced safe window is pH ${phOverlap[0].toFixed(1)}–${phOverlap[1].toFixed(1)}.`);
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

      const isSchooling = ['neon-tetra', 'zebra-danio', 'cherry-barb', 'harlequin-rasbora', 'corydoras-catfish', 'neon-dwarf-rainbowfish', 'pajama-cardinalfish'].includes(fish.details.slug || '');
      if (isSchooling && fish.quantity < 6) {
        warnings.push(`Schooling Requirement: ${fish.details.name} is a shoaling species and requires at least 6 individuals (current: ${fish.quantity}).`);
      }

      if (fish.details.slug === 'betta-fish' && fish.quantity > 1) {
        errors.push("Territorial Threat: Multiple Bettas will engage in lethal territorial fights.");
      }
      const isTerritorial = ['betta-fish', 'angelfish', 'oscar', 'royal-gramma', 'yellow-watchman-goby', 'yellow-tang', 'coral-beauty'].includes(fish.details.slug || '');
      if (isTerritorial) {
        territorialCount += fish.quantity;
      }
    });

    if (hasAggressive && hasPeaceful) {
      errors.push("Aggression Hazard: Mixing apex predatory/aggressive species with peaceful community fish will cause mortality.");
    } else if (hasSemiAggressive && hasPeaceful) {
      warnings.push("Semi-Aggressive Dynamics: Provide abundant rock caves and vegetation to break direct sightlines.");
    }

    if (territorialCount > 2) {
      warnings.push(`Territorial Density: ${territorialCount} territorial specimens require distinct rock formations.`);
    }

    // 5. Predation Risk
    const hasOscar = selectedFish.some(f => f.details.slug === 'oscar');
    const hasAngelfish = selectedFish.some(f => f.details.slug === 'angelfish');
    const smallSlenderFish = selectedFish.some(f => ['neon-tetra', 'guppy', 'zebra-danio'].includes(f.details.slug || ''));
    
    if (hasOscar && smallSlenderFish) {
      errors.push("Severe Predation Risk: Oscars grow large and will consume slender community fish.");
    } else if (hasAngelfish && selectedFish.some(f => f.details.slug === 'neon-tetra')) {
      errors.push("Predation Risk: Adult Angelfish frequently hunt slender Neon Tetras.");
    }

    // 6. Tank Size
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
      errors.push(`Insufficient Volume: ${limitingFishName} requires a minimum tank volume of ${maxMinTankSizeRequired} gallons (current: ${tankSize} gal).`);
    } else if (tankSize > 0) {
      positives.push(`Tank Volume: Your ${tankSize} gallon volume accommodates the minimum requirement for ${limitingFishName}.`);
    }

    // 7. Bioload Points
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
      errors.push(`Overstocked Bioload (${bioloadPercent}%): Exceeds standard biological filtration capacity. Reduce stock count or upgrade volume.`);
    } else if (bioloadPercent > 80) {
      warnings.push(`Moderately Stocked (${bioloadPercent}%): Nearing max capacity. Maintain strict weekly 25% water changes.`);
    } else {
      positives.push(`Bioload Index (${bioloadPercent}%): Stock level is safe and ecologically balanced.`);
    }

    let overallStatus = 'GREEN';
    let title = 'Ecologically Balanced Community';
    let explanation = 'All selected species are biologically compatible in water chemistry, behavior, and social structure.';

    if (errors.length > 0) {
      overallStatus = 'RED';
      title = 'Incompatible Combination';
      explanation = 'Critical biological or behavioral conflicts detected. Re-adjust your species list.';
    } else if (warnings.length > 0) {
      overallStatus = 'YELLOW';
      title = 'Conditional Compatibility';
      explanation = 'Cohabitation is achievable if specific territorial barriers and parameter buffers are maintained.';
    }

    if (overallStatus === 'GREEN' && stock.length >= 2) {
      unlockAchievement('stocking-plan');
    }

    return {
      status: overallStatus,
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
    <div className="bg-[#ffffff] rounded-3xl border-2 border-[#cfcaf5] p-6 sm:p-9 shadow-sm text-left font-readable">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 border-b border-[#edeafc] pb-6">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-[#27187e]/80 uppercase tracking-wider mb-2">
                Aquarium Volume (US Gallons)
              </label>
              <input 
                type="number"
                value={tankSize || ''}
                onChange={(e) => handleTankSizeChange(e.target.value)}
                placeholder="Gallons"
                className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] focus:border-[#27187e] rounded-2xl px-4 py-3 text-base text-[#27187e] font-readable font-bold focus:outline-none transition-all shadow-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-[#27187e]/80 uppercase tracking-wider mb-2">
                Add Species to Cohabit
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

          {/* Added Stock List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-2xl text-[#27187e]">
                Current Stock List ({stock.length})
              </h3>
              {stock.length > 0 && (
                <button 
                  onClick={handleReset}
                  className="text-xs sm:text-sm font-semibold text-[#27187e]/70 hover:text-[#27187e] flex items-center gap-1.5 cursor-pointer underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Stock
                </button>
              )}
            </div>

            {stock.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-[#cfcaf5] rounded-3xl bg-[#f7f7ff]/70 p-6">
                <Info className="w-8 h-8 text-[#27187e]/40 mx-auto mb-2" />
                <p className="text-base text-[#27187e]/80 font-medium">No fish added yet. Select a species above to build your community profile.</p>
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

        {/* Right Side: Analysis Dashboard */}
        <div className="lg:col-span-5 bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 flex flex-col justify-between self-stretch text-left">
          <div>
            <h3 className="font-display text-2xl mb-4 text-[#27187e]">
              Biological Analysis Verdict
            </h3>
            
            {/* Status card */}
            <div className={`p-5 rounded-2xl border-2 text-left mb-6 ${
              results.status === 'RED' ? 'bg-[#edeafc] border-[#27187e] text-[#27187e]' :
              results.status === 'YELLOW' ? 'bg-[#edeafc] border-[#27187e] text-[#27187e]' :
              results.status === 'BLUE' ? 'bg-[#edeafc] border-[#cfcaf5] text-[#27187e]' :
              'bg-[#edeafc] border-[#27187e] text-[#27187e]'
            }`}>
              <div className="flex items-center gap-2 mb-2 font-bold text-base sm:text-lg">
                {results.status === 'RED' && <ShieldAlert className="w-5 h-5 text-[#27187e] shrink-0" />}
                {results.status === 'YELLOW' && <AlertTriangle className="w-5 h-5 text-[#27187e] shrink-0" />}
                {results.status === 'BLUE' && <Info className="w-5 h-5 text-[#27187e] shrink-0" />}
                {results.status === 'GREEN' && <CheckCircle2 className="w-5 h-5 text-[#27187e] shrink-0" />}
                <span>{results.title}</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[#27187e]/90 font-medium">
                {results.explanation}
              </p>
            </div>

            {/* Bioload progress */}
            {stock.length > 0 && (
              <div className="mb-6 border-b border-[#edeafc] pb-6">
                <div className="flex justify-between items-center text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                  <span>Tank Bioload Pressure</span>
                  <span className="font-bold text-sm text-[#27187e]">
                    {results.bioloadPercent}%
                  </span>
                </div>
                <div className="w-full bg-[#edeafc] h-3 rounded-full overflow-hidden border border-[#cfcaf5]">
                  <div 
                    className="h-full bg-[#27187e] transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(results.bioloadPercent, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Explanatory Details */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {results.errors.map((err, i) => (
                <div key={i} className="flex gap-2.5 text-sm font-semibold text-[#27187e] bg-[#ffffff] p-3 rounded-xl border border-[#cfcaf5]">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#27187e]" />
                  <span>{err}</span>
                </div>
              ))}
              
              {results.warnings.map((warn, i) => (
                <div key={i} className="flex gap-2.5 text-sm font-semibold text-[#27187e] bg-[#ffffff] p-3 rounded-xl border border-[#cfcaf5]">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#27187e]" />
                  <span>{warn}</span>
                </div>
              ))}

              {results.positives.map((pos, i) => (
                <div key={i} className="flex gap-2.5 text-sm font-semibold text-[#27187e] bg-[#ffffff] p-3 rounded-xl border border-[#cfcaf5]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#27187e]" />
                  <span>{pos}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-[#27187e]/70 border-t border-[#edeafc] mt-6 pt-4 leading-relaxed font-medium">
            Note: Computes adult biomass volume, aggressive behavior tags, shoaling size thresholds, and swimming water layers.
          </div>
        </div>
      </div>
    </div>
  );
}
