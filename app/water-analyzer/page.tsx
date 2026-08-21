'use client';

import { useState, useEffect } from 'react';
import { FlaskConical, AlertTriangle, CheckCircle2, XCircle, Info, RefreshCw } from 'lucide-react';
import { fishData } from '@/data/fish';
import { unlockAchievement } from '@/lib/storage';

interface ParameterResult {
  name: string;
  value: number;
  target: string;
  status: 'GOOD' | 'WATCH' | 'ATTENTION';
  explanation: string;
  nextAction: string;
}

export default function WaterAnalyzerPage() {
  const [targetType, setTargetType] = useState<'fresh_gen' | 'salt_gen' | 'species'>('fresh_gen');
  const [selectedFishId, setSelectedFishId] = useState<string>('');
  
  // Parameter Inputs
  const [temp, setTemp] = useState<number>(76);
  const [ph, setPh] = useState<number>(7.0);
  const [ammonia, setAmmonia] = useState<number>(0);
  const [nitrite, setNitrite] = useState<number>(0);
  const [nitrate, setNitrate] = useState<number>(10);
  const [gh, setGh] = useState<number>(6);
  const [kh, setKh] = useState<number>(4);

  const handleReset = () => {
    setTemp(76);
    setPh(7.0);
    setAmmonia(0);
    setNitrite(0);
    setNitrate(10);
    setGh(6);
    setKh(4);
    setSelectedFishId('');
    setTargetType('fresh_gen');
  };

  // Helper: parse string range
  const parseRange = (value?: string): [number, number] | null => {
    if (!value) return null;
    const matches = value.match(/(-?\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(-?\d+(?:\.\d+)?)/i);
    if (!matches) return null;
    const a = Number(matches[1]);
    const b = Number(matches[2]);
    return [Math.min(a, b), Math.max(a, b)];
  };

  // Determine Target ranges based on user selection
  let targetTempRange: [number, number] = [72, 78];
  let targetPhRange: [number, number] = [6.5, 7.5];
  let targetGhRange: [number, number] = [4, 8];
  let targetKhRange: [number, number] = [3, 6];
  let isSaltwater = false;
  let targetLabel = "General Freshwater Community";

  const activeFish = selectedFishId ? fishData.find(f => f.id === selectedFishId) : null;

  if (targetType === 'salt_gen') {
    targetTempRange = [75, 80];
    targetPhRange = [8.1, 8.4];
    targetGhRange = [8, 12]; // General marine equivalent
    targetKhRange = [8, 12];
    isSaltwater = true;
    targetLabel = "General Saltwater Reef Community";
  } else if (targetType === 'species' && activeFish) {
    targetLabel = `${activeFish.name} Requirements`;
    isSaltwater = activeFish.category?.toLowerCase() === 'saltwater';
    
    const parsedTemp = parseRange(activeFish.temperature);
    if (parsedTemp) targetTempRange = parsedTemp;

    const parsedPh = parseRange(activeFish.ph);
    if (parsedPh) targetPhRange = parsedPh;

    if (isSaltwater) {
      targetGhRange = [8, 12];
      targetKhRange = [8, 12];
    } else {
      // Default soft water vs hard water species adjustments
      const nameLower = activeFish.name.toLowerCase();
      if (nameLower.includes('tetra') || nameLower.includes('betta') || nameLower.includes('discus')) {
        targetGhRange = [3, 6];
        targetKhRange = [2, 4];
      } else if (nameLower.includes('guppy') || nameLower.includes('molly')) {
        targetGhRange = [8, 15];
        targetKhRange = [5, 10];
      } else {
        targetGhRange = [4, 10];
        targetKhRange = [3, 8];
      }
    }
  }

  // Analyze water chemistry
  const analyzeParameters = (): {
    overallStatus: 'GOOD' | 'WATCH' | 'ATTENTION';
    results: ParameterResult[];
  } => {
    const results: ParameterResult[] = [];
    
    // 1. Temperature
    let tempStatus: ParameterResult['status'] = 'GOOD';
    let tempExplanation = `Within the recommended target of ${targetTempRange[0]}–${targetTempRange[1]}°F.`;
    let tempAction = "No action needed. Keep heating system checked.";
    
    if (temp < targetTempRange[0] - 3 || temp > targetTempRange[1] + 3) {
      tempStatus = 'ATTENTION';
      tempExplanation = `Severely outside target range of ${targetTempRange[0]}–${targetTempRange[1]}°F. Extreme temperatures cause lethargy, metabolic stress, and death.`;
      tempAction = "Slowly adjust your heater. Inspect if heater is broken or unplugged. Avoid rapid temperature drops.";
    } else if (temp < targetTempRange[0] || temp > targetTempRange[1]) {
      tempStatus = 'WATCH';
      tempExplanation = `Slightly outside target range of ${targetTempRange[0]}–${targetTempRange[1]}°F. Weakens the immune system over time, increasing disease susceptibility (e.g. Ich).`;
      tempAction = "Nudge the heater adjustment dial slightly. Ensure there are no cool drafts hitting the aquarium.";
    }

    results.push({
      name: 'Temperature',
      value: temp,
      target: `${targetTempRange[0]}–${targetTempRange[1]} °F`,
      status: tempStatus,
      explanation: tempExplanation,
      nextAction: tempAction
    });

    // 2. pH Level
    let phStatus: ParameterResult['status'] = 'GOOD';
    let phExplanation = `Within the recommended target of ${targetPhRange[0].toFixed(1)}–${targetPhRange[1].toFixed(1)}.`;
    let phAction = "Stable pH is critical. Do not perform heavy adjustments.";
    
    if (ph < targetPhRange[0] - 0.6 || ph > targetPhRange[1] + 0.6) {
      phStatus = 'ATTENTION';
      phExplanation = `pH is severely off target (${targetPhRange[0].toFixed(1)}–${targetPhRange[1].toFixed(1)}). Acidosis or alkalosis may occur.`;
      phAction = "Do not use chemical pH Up/Down buffers! Adjust naturally. Raise slowly with crushed coral or limestone. Lower slowly with driftwood or peat moss.";
    } else if (ph < targetPhRange[0] || ph > targetPhRange[1]) {
      phStatus = 'WATCH';
      phExplanation = `Slightly off target (${targetPhRange[0].toFixed(1)}–${targetPhRange[1].toFixed(1)}). Adaptable if stable, but swings must be avoided.`;
      phAction = "Monitor stability over several days. Stability is always more important than targeting a exact decimal.";
    }

    results.push({
      name: 'pH Level',
      value: ph,
      target: `${targetPhRange[0].toFixed(1)}–${targetPhRange[1].toFixed(1)}`,
      status: phStatus,
      explanation: phExplanation,
      nextAction: phAction
    });

    // 3. Ammonia
    let ammStatus: ParameterResult['status'] = 'GOOD';
    let ammExplanation = "Zero detectable Ammonia. The nitrogen cycle is successfully processing fish waste.";
    let ammAction = "Continue standard feeding and monthly maintenance.";

    if (ammonia > 0.5) {
      ammStatus = 'ATTENTION';
      ammExplanation = `High Ammonia levels (${ammonia} ppm) are highly toxic. Burns fish gills, damages mucus layers, and leads to rapid death.`;
      ammAction = "Perform an immediate 30-50% water change. Add Seachem Prime or similar detoxifier. Stop feeding until Ammonia is back to 0 ppm.";
    } else if (ammonia > 0) {
      ammStatus = 'WATCH';
      ammExplanation = `Trace Ammonia detected (${ammonia} ppm). In a cycled tank, any reading above zero indicates biological filtration lag, overstocking, or a decay source.`;
      ammAction = "Do a 25% water change. Check for dead fish or decaying organic matter. Add beneficial bacteria cultures.";
    }

    results.push({
      name: 'Ammonia (NH3)',
      value: ammonia,
      target: '0 ppm (Strict)',
      status: ammStatus,
      explanation: ammExplanation,
      nextAction: ammAction
    });

    // 4. Nitrite
    let nitStatus: ParameterResult['status'] = 'GOOD';
    let nitExplanation = "Zero detectable Nitrite. Beneficial bacteria are successfully converting nitrites to nitrates.";
    let nitAction = "Good job. Maintain biological filter health.";

    if (nitrite > 0.5) {
      nitStatus = 'ATTENTION';
      nitExplanation = `High Nitrite levels (${nitrite} ppm) are lethal. Prevents fish blood cells from carrying oxygen (brown blood disease). Fish will gasp at the surface.`;
      ammAction = "Perform a 30-50% water change immediately. Dose water detoxifier. Add aquarium salt (if freshwater species-safe) to block nitrite uptake.";
    } else if (nitrite > 0) {
      nitStatus = 'WATCH';
      nitExplanation = `Trace Nitrite detected (${nitrite} ppm). Dangerous indicating cycle disruption (mini-cycle) or filter damage (e.g., from chlorine).`;
      nitAction = "Do a 20% water change. Dose biological booster. Verify filter was not rinsed in unconditioned tap water.";
    }

    results.push({
      name: 'Nitrite (NO2)',
      value: nitrite,
      target: '0 ppm (Strict)',
      status: nitStatus,
      explanation: nitExplanation,
      nextAction: nitStatus === 'WATCH' ? nitAction : (nitrite > 0.5 ? "Perform a 30-50% water change immediately. Dose water detoxifier. Add aquarium salt (if freshwater species-safe) to block nitrite uptake." : "No action needed.")
    });

    // 5. Nitrate
    let natStatus: ParameterResult['status'] = 'GOOD';
    let maxSafeNat = isSaltwater ? 20 : 40;
    let targetNat = isSaltwater ? '< 10 ppm' : '< 20 ppm';
    let natExplanation = `Healthy nitrate level of ${nitrate} ppm. Normal byproduct of nitrification.`;
    let natAction = "Continue weekly water changes to prevent accumulation.";

    if (nitrate >= maxSafeNat) {
      natStatus = 'ATTENTION';
      natExplanation = `Excessive Nitrates (${nitrate} ppm). Triggers chronic stress, stunts growth, damages eggs, and fuels massive algae blooms.`;
      natAction = "Perform a 30% water change. Vacuum the substrate to remove trapped mulm. Feed less and add live plants.";
    } else if (nitrate > (isSaltwater ? 10 : 20)) {
      natStatus = 'WATCH';
      natExplanation = `Elevated Nitrates (${nitrate} ppm). Safe for short terms, but indicates a need for maintenance soon.`;
      natAction = "Schedule a 20% water change. Verify filter media is not clogged.";
    }

    results.push({
      name: 'Nitrate (NO3)',
      value: nitrate,
      target: targetNat,
      status: natStatus,
      explanation: natExplanation,
      nextAction: natAction
    });

    // 6. GH (General Hardness)
    let ghStatus: ParameterResult['status'] = 'GOOD';
    let ghExplanation = `GH of ${gh} dGH is ideal for mineral osmotic balance.`;
    let ghAction = "Maintain consistent mineral composition.";

    if (gh < targetGhRange[0]) {
      ghStatus = 'WATCH';
      ghExplanation = `Soft water (${gh} dGH). Lacks calcium/magnesium minerals, hindering live plants, shrimp molting, or snail shell growth.`;
      ghAction = "Safely raise hardness by adding crushed coral, Wonder Shells, or mineral salts.";
    } else if (gh > targetGhRange[1]) {
      ghStatus = 'WATCH';
      ghExplanation = `Hard water (${gh} dGH). High mineral content, which soft water species (like Discus or Neon Tetras) find stressful over time.`;
      ghAction = "Blend in RO/DI (Reverse Osmosis) water during changes to dilute minerals.";
    }

    results.push({
      name: 'General Hardness (GH)',
      value: gh,
      target: `${targetGhRange[0]}–${targetGhRange[1]} dGH`,
      status: ghStatus,
      explanation: ghExplanation,
      nextAction: ghAction
    });

    // 7. KH (Carbonate Hardness)
    let khStatus: ParameterResult['status'] = 'GOOD';
    let khExplanation = `KH of ${kh} dKH is sufficient to buffer pH swings.`;
    let khAction = "Maintain KH to keep pH stable.";

    if (kh < 3 && !isSaltwater) {
      khStatus = 'WATCH';
      khExplanation = `Low KH (${kh} dKH) alert! Water has no buffering capacity. A minor organic decay surge can cause a severe pH crash (acid crash).`;
      khAction = "Raise KH slowly. Place a small bag of crushed coral inside the filter, or add buffer salts.";
    } else if (kh < targetKhRange[0] || kh > targetKhRange[1]) {
      khStatus = 'WATCH';
      khExplanation = `Carbonate hardness (${kh} dKH) is outside target (${targetKhRange[0]}–${targetKhRange[1]}). Affects pH stability.`;
      khAction = "Adjust mineral inputs. Avoid sudden changes.";
    }

    results.push({
      name: 'Carbonate Hardness (KH)',
      value: kh,
      target: `${targetKhRange[0]}–${targetKhRange[1]} dKH`,
      status: khStatus,
      explanation: khExplanation,
      nextAction: khAction
    });

    // Determine overall status
    let overallStatus: ParameterResult['status'] = 'GOOD';
    if (results.some(r => r.status === 'ATTENTION')) {
      overallStatus = 'ATTENTION';
    } else if (results.some(r => r.status === 'WATCH')) {
      overallStatus = 'WATCH';
    }

    // Trigger achievement
    if (results.length > 0) {
      unlockAchievement('water-check');
    }

    return { overallStatus, results };
  };

  const analysis = analyzeParameters();

  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <FlaskConical className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Water Parameter Analyzer</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Enter your current aquarium test kit readings below to check chemical safety against generalized ranges or species-specific requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form Column */}
            <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-lg space-y-6 text-left">
              <div className="border-b border-border pb-4">
                <h2 className="font-bold text-xl text-foreground mb-3">Test Kit Inputs</h2>
                
                {/* Target Type Selector */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Target Context</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => { setTargetType('fresh_gen'); setSelectedFishId(''); }}
                        className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer truncate ${
                          targetType === 'fresh_gen' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/35' : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        Freshwater
                      </button>
                      <button 
                        onClick={() => { setTargetType('salt_gen'); setSelectedFishId(''); }}
                        className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer truncate ${
                          targetType === 'salt_gen' ? 'bg-blue-500/10 text-blue-500 border-blue-500/35' : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        Saltwater
                      </button>
                      <button 
                        onClick={() => setTargetType('species')}
                        className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer truncate ${
                          targetType === 'species' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/35' : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        Species Specific
                      </button>
                    </div>
                  </div>

                  {targetType === 'species' && (
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Select Species</label>
                      <select
                        value={selectedFishId}
                        onChange={(e) => setSelectedFishId(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Choose a fish...</option>
                        {fishData.map(f => (
                          <option key={f.id} value={f.id}>{f.name} ({f.category})</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Chemical Parameter Sliders */}
              <div className="space-y-4 font-sans text-sm">
                {/* Temp */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-semibold">
                    <span className="text-foreground">Temperature</span>
                    <span className="font-mono text-cyan-500 font-bold">{temp} °F</span>
                  </div>
                  <input 
                    type="range" min="60" max="90" step="1" value={temp} 
                    onChange={e => setTemp(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* pH */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-semibold">
                    <span className="text-foreground">pH Level</span>
                    <span className="font-mono text-cyan-500 font-bold">{ph.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="5.0" max="9.0" step="0.1" value={ph} 
                    onChange={e => setPh(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Ammonia */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-semibold">
                    <span className="text-foreground">Ammonia (NH3)</span>
                    <span className={`font-mono font-bold ${ammonia > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>{ammonia} ppm</span>
                  </div>
                  <select 
                    value={ammonia} onChange={e => setAmmonia(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none"
                  >
                    <option value="0">0 ppm (Safe)</option>
                    <option value="0.25">0.25 ppm (Toxic Trace)</option>
                    <option value="0.5">0.50 ppm (Harmful)</option>
                    <option value="1.0">1.0 ppm (Lethal)</option>
                    <option value="2.0">2.0+ ppm (Severe Toxicity)</option>
                  </select>
                </div>

                {/* Nitrite */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-semibold">
                    <span className="text-foreground">Nitrite (NO2)</span>
                    <span className={`font-mono font-bold ${nitrite > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>{nitrite} ppm</span>
                  </div>
                  <select 
                    value={nitrite} onChange={e => setNitrite(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none"
                  >
                    <option value="0">0 ppm (Safe)</option>
                    <option value="0.25">0.25 ppm (Toxic Trace)</option>
                    <option value="0.5">0.50 ppm (Harmful)</option>
                    <option value="1.0">1.0 ppm (Lethal)</option>
                    <option value="2.0">2.0+ ppm (Severe Toxicity)</option>
                  </select>
                </div>

                {/* Nitrate */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-semibold">
                    <span className="text-foreground">Nitrate (NO3)</span>
                    <span className="font-mono text-cyan-500 font-bold">{nitrate} ppm</span>
                  </div>
                  <input 
                    type="range" min="0" max="80" step="5" value={nitrate} 
                    onChange={e => setNitrate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* GH */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-semibold">
                    <span className="text-foreground">General Hardness (GH)</span>
                    <span className="font-mono text-cyan-500 font-bold">{gh} dGH</span>
                  </div>
                  <input 
                    type="range" min="0" max="25" step="1" value={gh} 
                    onChange={e => setGh(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* KH */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-semibold">
                    <span className="text-foreground">Carbonate Hardness (KH)</span>
                    <span className="font-mono text-cyan-500 font-bold">{kh} dKH</span>
                  </div>
                  <input 
                    type="range" min="0" max="20" step="1" value={kh} 
                    onChange={e => setKh(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mt-6"
              >
                <RefreshCw className="w-4 h-4" /> Reset Analyzer
              </button>
            </div>

            {/* Analysis Results Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Overall Status Banner */}
              <div className={`p-6 rounded-3xl border ${
                analysis.overallStatus === 'ATTENTION' ? 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400' :
                analysis.overallStatus === 'WATCH' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' :
                'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  {analysis.overallStatus === 'ATTENTION' && <XCircle className="w-8 h-8 text-rose-500 shrink-0" />}
                  {analysis.overallStatus === 'WATCH' && <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />}
                  {analysis.overallStatus === 'GOOD' && <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />}
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-foreground">
                      Aquarium Status: {analysis.overallStatus === 'ATTENTION' ? 'NEEDS ATTENTION' : analysis.overallStatus === 'WATCH' ? 'WATCH' : 'GOOD'}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Evaluating against: <strong className="text-foreground">{targetLabel}</strong></p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-sans mt-3">
                  {analysis.overallStatus === 'ATTENTION' && "Critical chemical imbalances detected. Immediate action is required to restore water safety and prevent mortality."}
                  {analysis.overallStatus === 'WATCH' && "Some parameters are slightly off-target or indicate trace waste accumulation. Schedule routine water changes and monitor trends."}
                  {analysis.overallStatus === 'GOOD' && "Excellent parameters. Your biological cycle is fully functioning and water chemistry fits requirements perfectly."}
                </p>
              </div>

              {/* Parameter Row Grid */}
              <div className="space-y-4">
                {analysis.results.map((param, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-3xl p-5 shadow-sm space-y-3 font-sans">
                    <div className="flex justify-between items-center flex-wrap gap-2 border-b border-border/40 pb-3">
                      <div>
                        <h4 className="font-bold text-base text-foreground">{param.name}</h4>
                        <span className="text-xs text-muted-foreground">Target: <strong className="text-foreground/80">{param.target}</strong></span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-black text-foreground bg-muted px-2.5 py-1 rounded-lg border border-border">
                          {param.value} {param.name.includes('Temp') ? '°F' : param.name.includes('pH') ? '' : param.name.includes('dG') || param.name.includes('dK') ? 'd' : 'ppm'}
                        </span>
                        
                        <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wider ${
                          param.status === 'ATTENTION' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                          param.status === 'WATCH' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        }`}>
                          {param.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs space-y-2">
                      <p className="text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">Status Description:</strong> {param.explanation}
                      </p>
                      
                      {param.status !== 'GOOD' && (
                        <div className="p-3 bg-muted rounded-xl border border-border flex items-start gap-2 text-foreground/90 leading-relaxed font-medium">
                          <Info className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block text-[10px] text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-0.5">Recommended Next Action</strong>
                            {param.nextAction}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
