'use client';

import { useState } from 'react';
import { FlaskConical, AlertTriangle, CheckCircle2, XCircle, Info, RefreshCw, Layers, ShieldCheck, Activity } from 'lucide-react';
import { fishData } from '@/data/fish';
import { unlockAchievement } from '@/lib/storage';
import GlobalCTA from '@/components/ui/GlobalCTA';

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

  const parseRange = (value?: string): [number, number] | null => {
    if (!value) return null;
    const matches = value.match(/(-?\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(-?\d+(?:\.\d+)?)/i);
    if (!matches) return null;
    const a = Number(matches[1]);
    const b = Number(matches[2]);
    return [Math.min(a, b), Math.max(a, b)];
  };

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
    targetGhRange = [8, 12];
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

  const analyzeParameters = (): {
    overallStatus: 'GOOD' | 'WATCH' | 'ATTENTION';
    results: ParameterResult[];
  } => {
    const results: ParameterResult[] = [];
    
    // 1. Temperature
    let tempStatus: ParameterResult['status'] = 'GOOD';
    let tempExplanation = `Within the recommended target range of ${targetTempRange[0]}–${targetTempRange[1]}°F.`;
    let tempAction = "No action needed. Keep heating system inspected.";
    
    if (temp < targetTempRange[0] - 3 || temp > targetTempRange[1] + 3) {
      tempStatus = 'ATTENTION';
      tempExplanation = `Severely outside target range of ${targetTempRange[0]}–${targetTempRange[1]}°F. Extreme temperatures cause metabolic distress and shock.`;
      tempAction = "Slowly adjust your heater calibration dial. Inspect if the heater is functioning correctly.";
    } else if (temp < targetTempRange[0] || temp > targetTempRange[1]) {
      tempStatus = 'WATCH';
      tempExplanation = `Slightly outside target range of ${targetTempRange[0]}–${targetTempRange[1]}°F. Can reduce immune resistance over time.`;
      tempAction = "Nudge heater dial slightly. Verify thermometer accuracy.";
    }

    results.push({
      name: 'Water Temperature',
      value: temp,
      target: `${targetTempRange[0]}–${targetTempRange[1]} °F`,
      status: tempStatus,
      explanation: tempExplanation,
      nextAction: tempAction
    });

    // 2. pH Level
    let phStatus: ParameterResult['status'] = 'GOOD';
    let phExplanation = `Within the target buffer of ${targetPhRange[0].toFixed(1)}–${targetPhRange[1].toFixed(1)}.`;
    let phAction = "Stable pH is critical. Avoid rapid chemical shifts.";
    
    if (ph < targetPhRange[0] - 0.6 || ph > targetPhRange[1] + 0.6) {
      phStatus = 'ATTENTION';
      phExplanation = `pH is significantly off target (${targetPhRange[0].toFixed(1)}–${targetPhRange[1].toFixed(1)}). Acidosis or alkalosis may occur.`;
      phAction = "Adjust naturally and slowly. Raise using crushed coral substrate; lower gradually with driftwood tannins.";
    } else if (ph < targetPhRange[0] || ph > targetPhRange[1]) {
      phStatus = 'WATCH';
      phExplanation = `Slightly off target (${targetPhRange[0].toFixed(1)}–${targetPhRange[1].toFixed(1)}). Steady stability is superior to erratic chemical correction.`;
      phAction = "Observe stability over successive weekly water changes.";
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
    let ammoniaStatus: ParameterResult['status'] = 'GOOD';
    let ammoniaExplanation = "Zero ammonia detected. Biological biofilter is actively converting fish waste.";
    let ammoniaAction = "Maintain regular bi-weekly biological filter sponge rinses in tank water.";

    if (ammonia >= 0.5) {
      ammoniaStatus = 'ATTENTION';
      ammoniaExplanation = `Critical toxicity (${ammonia} ppm). Ammonia burns fish gills and blocks oxygen transport.`;
      ammoniaAction = "Perform an immediate 50% water change with dechlorinator. Dose emergency ammonia binder and cease feeding.";
    } else if (ammonia > 0) {
      ammoniaStatus = 'WATCH';
      ammoniaExplanation = `Trace ammonia detected (${ammonia} ppm). Indicates an uncycled tank, dying plant matter, or overfeeding.`;
      ammoniaAction = "Conduct a 25% water change, verify filter impeller operation, and test again in 24 hours.";
    }

    results.push({
      name: 'Ammonia (NH3/NH4+)',
      value: ammonia,
      target: '0.0 ppm (Zero)',
      status: ammoniaStatus,
      explanation: ammoniaExplanation,
      nextAction: ammoniaAction
    });

    // 4. Nitrite
    let nitriteStatus: ParameterResult['status'] = 'GOOD';
    let nitriteExplanation = "Zero nitrite detected. Secondary nitrifying bacteria (Nitrospira) are healthy.";
    let nitriteAction = "Continue balanced feeding schedules.";

    if (nitrite >= 0.5) {
      nitriteStatus = 'ATTENTION';
      nitriteExplanation = `Severe toxicity (${nitrite} ppm). Nitrite causes brown blood disease by preventing blood oxygenation.`;
      nitriteAction = "Perform an immediate 50% water change. Dose aquarium salt (1 tbsp/5 gal for freshwater) to block nitrite uptake.";
    } else if (nitrite > 0) {
      nitriteStatus = 'WATCH';
      nitriteExplanation = `Trace nitrite detected (${nitrite} ppm). Nitrogen cycle is undergoing a mini-spike or incomplete cycle.`;
      nitriteAction = "Perform a 25% water change, add concentrated beneficial bacteria starter, and reduce feeding.";
    }

    results.push({
      name: 'Nitrite (NO2-)',
      value: nitrite,
      target: '0.0 ppm (Zero)',
      status: nitriteStatus,
      explanation: nitriteExplanation,
      nextAction: nitriteAction
    });

    // 5. Nitrate
    let nitrateStatus: ParameterResult['status'] = 'GOOD';
    let nitrateExplanation = `Safe accumulation level (${nitrate} ppm).`;
    let nitrateAction = "Maintain routine 20–25% partial water changes every 7 to 10 days.";

    if (nitrate >= 40) {
      nitrateStatus = 'ATTENTION';
      nitrateExplanation = `Excessively elevated (${nitrate} ppm). Promotes heavy nuisance algae blooms and stunts fish growth.`;
      nitrateAction = "Conduct a 35% water change today and another in 3 days. Clean mechanical filter floss and vacuum substrate.";
    } else if (nitrate >= 25) {
      nitrateStatus = 'WATCH';
      nitrateExplanation = `Moderate accumulation (${nitrate} ppm). Reaching the upper safety threshold for sensitive species.`;
      nitrateAction = "Schedule your weekly water change soon. Incorporate fast-growing stem plants or floating flora.";
    }

    results.push({
      name: 'Nitrate (NO3-)',
      value: nitrate,
      target: '< 20 ppm',
      status: nitrateStatus,
      explanation: nitrateExplanation,
      nextAction: nitrateAction
    });

    // 6. GH
    let ghStatus: ParameterResult['status'] = 'GOOD';
    let ghExplanation = `Mineral content is balanced (${gh} dGH) for the target profile.`;
    let ghAction = "Maintain steady tap water or remineralized RO water parameters.";

    if (gh < targetGhRange[0] - 2 || gh > targetGhRange[1] + 4) {
      ghStatus = 'WATCH';
      ghExplanation = `Hardness is off target (${gh} dGH vs target ${targetGhRange[0]}–${targetGhRange[1]} dGH).`;
      ghAction = gh < targetGhRange[0] ? "Add mineral booster or wonder shell for calcium/magnesium." : "Dilute with distilled/RO water during water changes.";
    }

    results.push({
      name: 'General Hardness (GH)',
      value: gh,
      target: `${targetGhRange[0]}–${targetGhRange[1]} dGH`,
      status: ghStatus,
      explanation: ghExplanation,
      nextAction: ghAction
    });

    // 7. KH
    let khStatus: ParameterResult['status'] = 'GOOD';
    let khExplanation = `Adequate carbonate buffering capacity (${kh} dKH) prevents sudden pH crashes.`;
    let khAction = "Buffer remains stable.";

    if (kh < 2) {
      khStatus = 'ATTENTION';
      khExplanation = `Critically low buffer (${kh} dKH). Tank is at high risk of rapid, catastrophic pH collapse.`;
      khAction = "Slowly introduce crushed coral or sodium bicarbonate buffer to raise KH above 3 dKH.";
    } else if (kh < targetKhRange[0]) {
      khStatus = 'WATCH';
      khExplanation = `Low buffer (${kh} dKH). Water has modest capacity to absorb biological acid buildup.`;
      khAction = "Monitor pH weekly and gently support carbonate buffer with natural calcareous decor.";
    }

    results.push({
      name: 'Carbonate Hardness (KH)',
      value: kh,
      target: `${targetKhRange[0]}–${targetKhRange[1]} dKH`,
      status: khStatus,
      explanation: khExplanation,
      nextAction: khAction
    });

    let overallStatus: 'GOOD' | 'WATCH' | 'ATTENTION' = 'GOOD';
    if (results.some(r => r.status === 'ATTENTION')) {
      overallStatus = 'ATTENTION';
    } else if (results.some(r => r.status === 'WATCH')) {
      overallStatus = 'WATCH';
    }

    return { overallStatus, results };
  };

  const analysis = analyzeParameters();

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <FlaskConical className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Water Chemistry Diagnostics</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            WATER PARAMETER ANALYZER
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl leading-relaxed">
            Enter liquid reagent or digital test kit measurements to audit water safety against standard benchmarks or species-specific requirements.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-readable">
            <div className="border-b border-[#edeafc] pb-5">
              <h2 className="font-display text-2xl sm:text-3xl text-[#27187e] mb-4">
                Test Kit Measurements
              </h2>
              
              {/* Target Type Selector */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#27187e]/80 uppercase tracking-wider mb-2">
                    Evaluation Context
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => { setTargetType('fresh_gen'); setSelectedFishId(''); }}
                      className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-xl border-2 transition-all cursor-pointer truncate ${
                        targetType === 'fresh_gen' ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]' : 'bg-[#f7f7ff] border-[#cfcaf5] text-[#27187e]'
                      }`}
                    >
                      Freshwater
                    </button>
                    <button 
                      onClick={() => { setTargetType('salt_gen'); setSelectedFishId(''); }}
                      className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-xl border-2 transition-all cursor-pointer truncate ${
                        targetType === 'salt_gen' ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]' : 'bg-[#f7f7ff] border-[#cfcaf5] text-[#27187e]'
                      }`}
                    >
                      Saltwater
                    </button>
                    <button 
                      onClick={() => setTargetType('species')}
                      className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-xl border-2 transition-all cursor-pointer truncate ${
                        targetType === 'species' ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]' : 'bg-[#f7f7ff] border-[#cfcaf5] text-[#27187e]'
                      }`}
                    >
                      Species
                    </button>
                  </div>
                </div>

                {targetType === 'species' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#27187e]/80 uppercase tracking-wider mb-2">
                      Select Target Fish
                    </label>
                    <select
                      value={selectedFishId}
                      onChange={(e) => setSelectedFishId(e.target.value)}
                      className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] focus:border-[#27187e] rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-[#27187e] font-medium focus:outline-none cursor-pointer"
                    >
                      <option value="">Choose a species...</option>
                      {fishData.map(f => (
                        <option key={f.id} value={f.id}>{f.name} ({f.category})</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Sliders & Selects */}
            <div className="space-y-4 font-readable text-sm">
              {/* Temp */}
              <div>
                <div className="flex justify-between items-center mb-1.5 font-semibold text-sm sm:text-base">
                  <span className="text-[#27187e]">Temperature</span>
                  <span className="font-bold text-[#27187e]">{temp} °F</span>
                </div>
                <input 
                  type="range" min="60" max="90" step="1" value={temp} 
                  onChange={e => setTemp(Number(e.target.value))}
                  className="w-full h-2 bg-[#edeafc] rounded-lg appearance-none cursor-pointer accent-[#27187e]"
                />
              </div>

              {/* pH */}
              <div>
                <div className="flex justify-between items-center mb-1.5 font-semibold text-sm sm:text-base">
                  <span className="text-[#27187e]">pH Level</span>
                  <span className="font-bold text-[#27187e]">{ph.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="5.0" max="9.0" step="0.1" value={ph} 
                  onChange={e => setPh(Number(e.target.value))}
                  className="w-full h-2 bg-[#edeafc] rounded-lg appearance-none cursor-pointer accent-[#27187e]"
                />
              </div>

              {/* Ammonia */}
              <div>
                <div className="flex justify-between items-center mb-1.5 font-semibold text-sm sm:text-base">
                  <span className="text-[#27187e]">Ammonia (NH3)</span>
                  <span className="font-bold text-[#27187e]">{ammonia} ppm</span>
                </div>
                <select 
                  value={ammonia} onChange={e => setAmmonia(Number(e.target.value))}
                  className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-[#27187e] font-medium focus:outline-none"
                >
                  <option value="0">0.0 ppm (Safe / Cycled)</option>
                  <option value="0.25">0.25 ppm (Toxic Trace)</option>
                  <option value="0.5">0.50 ppm (Harmful)</option>
                  <option value="1.0">1.0 ppm (Lethal)</option>
                  <option value="2.0">2.0+ ppm (Severe Toxicity)</option>
                </select>
              </div>

              {/* Nitrite */}
              <div>
                <div className="flex justify-between items-center mb-1.5 font-semibold text-sm sm:text-base">
                  <span className="text-[#27187e]">Nitrite (NO2)</span>
                  <span className="font-bold text-[#27187e]">{nitrite} ppm</span>
                </div>
                <select 
                  value={nitrite} onChange={e => setNitrite(Number(e.target.value))}
                  className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-[#27187e] font-medium focus:outline-none"
                >
                  <option value="0">0.0 ppm (Safe / Cycled)</option>
                  <option value="0.25">0.25 ppm (Toxic Trace)</option>
                  <option value="0.5">0.50 ppm (Harmful)</option>
                  <option value="1.0">1.0 ppm (Lethal)</option>
                  <option value="2.0">2.0+ ppm (Severe Toxicity)</option>
                </select>
              </div>

              {/* Nitrate */}
              <div>
                <div className="flex justify-between items-center mb-1.5 font-semibold text-sm sm:text-base">
                  <span className="text-[#27187e]">Nitrate (NO3)</span>
                  <span className="font-bold text-[#27187e]">{nitrate} ppm</span>
                </div>
                <input 
                  type="range" min="0" max="80" step="5" value={nitrate} 
                  onChange={e => setNitrate(Number(e.target.value))}
                  className="w-full h-2 bg-[#edeafc] rounded-lg appearance-none cursor-pointer accent-[#27187e]"
                />
              </div>

              {/* GH */}
              <div>
                <div className="flex justify-between items-center mb-1.5 font-semibold text-sm sm:text-base">
                  <span className="text-[#27187e]">General Hardness (GH)</span>
                  <span className="font-bold text-[#27187e]">{gh} dGH</span>
                </div>
                <input 
                  type="range" min="0" max="25" step="1" value={gh} 
                  onChange={e => setGh(Number(e.target.value))}
                  className="w-full h-2 bg-[#edeafc] rounded-lg appearance-none cursor-pointer accent-[#27187e]"
                />
              </div>

              {/* KH */}
              <div>
                <div className="flex justify-between items-center mb-1.5 font-semibold text-sm sm:text-base">
                  <span className="text-[#27187e]">Carbonate Hardness (KH)</span>
                  <span className="font-bold text-[#27187e]">{kh} dKH</span>
                </div>
                <input 
                  type="range" min="0" max="20" step="1" value={kh} 
                  onChange={e => setKh(Number(e.target.value))}
                  className="w-full h-2 bg-[#edeafc] rounded-lg appearance-none cursor-pointer accent-[#27187e]"
                />
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] font-semibold text-sm sm:text-base rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-6 shadow-sm"
            >
              <RefreshCw className="w-4 h-4" /> Reset Parameter Values
            </button>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-6 font-readable">
            
            {/* Status Banner */}
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                {analysis.overallStatus === 'ATTENTION' && <AlertTriangle className="w-6 h-6 text-[#27187e] shrink-0" />}
                {analysis.overallStatus === 'WATCH' && <Info className="w-6 h-6 text-[#27187e] shrink-0" />}
                {analysis.overallStatus === 'GOOD' && <CheckCircle2 className="w-6 h-6 text-[#27187e] shrink-0" />}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#27187e]">
                    Status: {analysis.overallStatus === 'ATTENTION' ? 'NEEDS ATTENTION' : analysis.overallStatus === 'WATCH' ? 'WATCH LIST' : 'OPTIMAL EQUILIBRIUM'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#27187e]/70 mt-0.5 font-semibold">
                    Evaluating against: <strong className="text-[#27187e]">{targetLabel}</strong>
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#27187e]/85 leading-relaxed font-medium mt-3">
                {analysis.overallStatus === 'ATTENTION' && "Critical chemical imbalances detected. Immediate bio-remediation is required to protect aquatic life."}
                {analysis.overallStatus === 'WATCH' && "Some parameters are slightly out of balance. Schedule regular maintenance and monitor trends."}
                {analysis.overallStatus === 'GOOD' && "Excellent parameters. Your biological cycle is fully functioning and water chemistry is in stable equilibrium."}
              </p>
            </div>

            {/* Parameter Rows */}
            <div className="space-y-4">
              {analysis.results.map((param, idx) => (
                <div key={idx} className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
                  <div className="flex justify-between items-center flex-wrap gap-2 border-b border-[#edeafc] pb-3">
                    <div>
                      <h4 className="font-bold text-base sm:text-lg text-[#27187e]">{param.name}</h4>
                      <span className="text-xs sm:text-sm text-[#27187e]/70">Target: <strong className="text-[#27187e]">{param.target}</strong></span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm sm:text-base text-[#27187e] bg-[#f7f7ff] px-3 py-1 rounded-xl border border-[#cfcaf5]">
                        {param.value} {param.name.includes('Temp') ? '°F' : param.name.includes('pH') ? '' : param.name.includes('Hardness') ? 'd' : 'ppm'}
                      </span>
                      
                      <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#edeafc] text-[#27187e] border border-[#cfcaf5]">
                        {param.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm space-y-2">
                    <p className="text-[#27187e]/85 leading-relaxed font-medium">
                      <strong className="text-[#27187e]">Diagnosis:</strong> {param.explanation}
                    </p>
                    
                    {param.status !== 'GOOD' && (
                      <div className="p-3.5 bg-[#f7f7ff] rounded-2xl border border-[#cfcaf5] flex items-start gap-2.5 text-[#27187e] leading-relaxed font-medium">
                        <Info className="w-4 h-4 text-[#27187e] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-xs uppercase font-bold text-[#27187e] tracking-wider mb-0.5">Recommended Action Protocol</strong>
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

      <GlobalCTA
        badge="BIOLOGICAL WATER CHEMISTRY"
        title={
          <>
            Master the aquarium <br className="hidden sm:inline" />
            nitrogen cycle safely.
          </>
        }
        description="Learn how beneficial nitrifying bacteria convert toxic ammonia into safe nitrate compounds across our step-by-step cycling guide."
        primaryAction={{
          label: 'Read Nitrogen Cycle Guide',
          href: '/guides',
        }}
        secondaryAction={{
          label: 'Check Species Parameters',
          href: '/fish',
        }}
      />
    </div>
  );
}
