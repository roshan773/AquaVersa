'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowLeftRight, 
  Sparkles, 
  Thermometer, 
  Droplets, 
  ShieldAlert, 
  Layers, 
  ExternalLink,
  Shuffle,
  Info,
  Maximize2
} from 'lucide-react';
import { fishData } from '@/data/fish';
import { Fish } from '@/lib/types';

function parseRange(str?: string): [number, number] | null {
  if (!str) return null;
  const match = str.match(/(-?\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(-?\d+(?:\.\d+)?)/i);
  if (!match) return null;
  const a = parseFloat(match[1]);
  const b = parseFloat(match[2]);
  return [Math.min(a, b), Math.max(a, b)];
}

export default function PairwiseMatcher() {
  const [fish1Id, setFish1Id] = useState<string>('fw-0'); // Neon Tetra
  const [fish2Id, setFish2Id] = useState<string>('fw-1'); // Guppy

  const fish1: Fish = useMemo(() => fishData.find(f => f.id === fish1Id) || fishData[0], [fish1Id]);
  const fish2: Fish = useMemo(() => fishData.find(f => f.id === fish2Id) || fishData[1], [fish2Id]);

  const handleSwap = () => {
    setFish1Id(fish2Id);
    setFish2Id(fish1Id);
  };

  const handleRandom = () => {
    const freshOnly = fishData.filter(f => f.category === 'Freshwater');
    const idx1 = Math.floor(Math.random() * freshOnly.length);
    let idx2 = Math.floor(Math.random() * freshOnly.length);
    if (idx2 === idx1) idx2 = (idx1 + 1) % freshOnly.length;
    setFish1Id(freshOnly[idx1].id);
    setFish2Id(freshOnly[idx2].id);
  };

  const analysis = useMemo(() => {
    const isSameSpecies = fish1.id === fish2.id;
    const sameCategory = (fish1.category || 'freshwater').toLowerCase() === (fish2.category || 'freshwater').toLowerCase();

    // 1. Cross Biome Check
    if (!sameCategory) {
      return {
        score: 0,
        status: 'INCOMPATIBLE',
        badgeColor: 'bg-red-600 text-white',
        borderColor: 'border-red-500',
        title: 'Cross-Biome Incompatibility',
        summary: `Fatal mismatch: ${fish1.name} is a ${fish1.category} species, whereas ${fish2.name} is a ${fish2.category} species. They require completely different salinity ecosystems and cannot share an aquarium.`,
        tempOverlap: null,
        phOverlap: null,
        tempStatus: 'CRITICAL',
        phStatus: 'CRITICAL',
        temperamentStatus: 'CRITICAL',
        predationRisk: false,
        minTankRecommended: Math.max(fish1.minTankSize || 10, fish2.minTankSize || 10),
        points: [
          { type: 'error', text: `${fish1.category} vs ${fish2.category}: Salinity and osmoregulation conflict.` }
        ],
        tips: ['Always keep freshwater and marine species in separate, dedicated tank systems.']
      };
    }

    // 2. Same Species Special Cases
    if (isSameSpecies) {
      const isBetta = fish1.slug === 'betta-fish';
      const isSchooling = ['neon-tetra', 'zebra-danio', 'cherry-barb', 'harlequin-rasbora', 'corydoras-catfish', 'neon-dwarf-rainbowfish'].includes(fish1.slug || '');
      const isLivebearer = ['guppy', 'molly', 'platy', 'swordtail'].includes(fish1.slug || '');

      let score = 95;
      let summary = `Same-species pairing for ${fish1.name}.`;
      const points: { type: 'success' | 'warning' | 'error'; text: string }[] = [];
      const tips: string[] = [];

      if (isBetta) {
        score = 10;
        summary = 'Male Bettas are aggressively territorial toward other male Bettas and will fight to the death.';
        points.push({ type: 'error', text: 'Conspecific aggression: Never house two male Betta splendens together.' });
        tips.push('House male Bettas individually in minimum 5-gallon setups with gentle filtration.');
      } else if (isSchooling) {
        summary = `${fish1.name} is a schooling species that thrives when kept with its own kind.`;
        points.push({ type: 'success', text: `Schooling dynamic: Maintain a minimum group of 6 to 10+ ${fish1.name}s for safety and natural behavior.` });
        tips.push('Large schools drastically reduce stress and bring out vibrant natural coloration.');
      } else if (isLivebearer) {
        summary = `${fish1.name}s thrive in groups but reproduce rapidly.`;
        points.push({ type: 'warning', text: 'Breeding ratio: Maintain 1 male to 2–3 females to prevent females from being exhausted by courtship.' });
        tips.push('Plan ahead for fry population control or house single-sex groups.');
      }

      return {
        score,
        status: isBetta ? 'INCOMPATIBLE' : 'COMPATIBLE',
        badgeColor: isBetta ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white',
        borderColor: isBetta ? 'border-red-500' : 'border-emerald-500',
        title: isBetta ? 'Lethal Aggression Risk' : 'Conspecific Cohabitation',
        summary,
        tempOverlap: parseRange(fish1.temperature),
        phOverlap: parseRange(fish1.ph),
        tempStatus: 'PERFECT',
        phStatus: 'PERFECT',
        temperamentStatus: isBetta ? 'CRITICAL' : 'PERFECT',
        predationRisk: false,
        minTankRecommended: fish1.minTankSize || 10,
        points,
        tips: tips.length > 0 ? tips : ['Maintain consistent water parameters and stable feeding routines.']
      };
    }

    // 3. Different Species - Calculate Overlaps
    const points: { type: 'success' | 'warning' | 'error'; text: string }[] = [];
    const tips: string[] = [];
    let score = 100;

    // A. Temperature Overlap
    const t1 = parseRange(fish1.temperature) || [72, 78];
    const t2 = parseRange(fish2.temperature) || [72, 78];
    const tempOverlapMin = Math.max(t1[0], t2[0]);
    const tempOverlapMax = Math.min(t1[1], t2[1]);
    const tempHasOverlap = tempOverlapMin <= tempOverlapMax;

    let tempStatus: 'PERFECT' | 'ACCEPTABLE' | 'CRITICAL' = 'PERFECT';
    if (!tempHasOverlap) {
      score -= 40;
      tempStatus = 'CRITICAL';
      points.push({
        type: 'error',
        text: `Temperature Mismatch: ${fish1.name} (${t1[0]}–${t1[1]}°F) and ${fish2.name} (${t2[0]}–${t2[1]}°F) share no overlapping thermal zone.`
      });
    } else {
      const window = tempOverlapMax - tempOverlapMin;
      if (window < 3) {
        score -= 10;
        tempStatus = 'ACCEPTABLE';
        points.push({
          type: 'warning',
          text: `Narrow Thermal Window: Target strictly ${tempOverlapMin}°F–${tempOverlapMax}°F.`
        });
      } else {
        points.push({
          type: 'success',
          text: `Thermal Overlap: Safe equilibrium window is ${tempOverlapMin}°F–${tempOverlapMax}°F.`
        });
      }
    }

    // B. pH Overlap
    const p1 = parseRange(fish1.ph) || [6.5, 7.5];
    const p2 = parseRange(fish2.ph) || [6.5, 7.5];
    const phOverlapMin = Math.max(p1[0], p2[0]);
    const phOverlapMax = Math.min(p2[1], p2[1]);
    const phHasOverlap = phOverlapMin <= phOverlapMax;

    let phStatus: 'PERFECT' | 'ACCEPTABLE' | 'CRITICAL' = 'PERFECT';
    if (!phHasOverlap) {
      score -= 40;
      phStatus = 'CRITICAL';
      points.push({
        type: 'error',
        text: `pH Acidity Conflict: ${fish1.name} (${p1[0]}–${p1[1]}) and ${fish2.name} (${p2[0]}–${p2[1]}) have incompatible water hardness/pH needs.`
      });
    } else {
      const window = phOverlapMax - phOverlapMin;
      if (window < 0.4) {
        score -= 10;
        phStatus = 'ACCEPTABLE';
        points.push({
          type: 'warning',
          text: `Narrow pH Window: Maintain water between pH ${phOverlapMin.toFixed(1)}–${phOverlapMax.toFixed(1)}.`
        });
      } else {
        points.push({
          type: 'success',
          text: `pH Equilibrium: Compatible in the pH ${phOverlapMin.toFixed(1)}–${phOverlapMax.toFixed(1)} range.`
        });
      }
    }

    // C. Temperament & Behavioral Conflict
    const temp1 = (fish1.temperament || 'Peaceful').toLowerCase();
    const temp2 = (fish2.temperament || 'Peaceful').toLowerCase();
    let temperamentStatus: 'PERFECT' | 'ACCEPTABLE' | 'CRITICAL' = 'PERFECT';

    const is1Aggressive = temp1.includes('aggressive') && !temp1.includes('semi');
    const is2Aggressive = temp2.includes('aggressive') && !temp2.includes('semi');
    const is1Semi = temp1.includes('semi-aggressive');
    const is2Semi = temp2.includes('semi-aggressive');
    const is1Peaceful = temp1.includes('peaceful');
    const is2Peaceful = temp2.includes('peaceful');

    // Fin Nipping & Specific Pair Checks
    const isBettaAndGuppy = (fish1.slug === 'betta-fish' && fish2.slug === 'guppy') || (fish2.slug === 'betta-fish' && fish1.slug === 'guppy');
    const isTigerBarbAndLongFin = (fish1.slug === 'tiger-barb' || fish2.slug === 'tiger-barb') && (fish1.slug === 'betta-fish' || fish2.slug === 'betta-fish' || fish1.slug === 'angelfish' || fish2.slug === 'angelfish' || fish1.slug === 'guppy' || fish2.slug === 'guppy');

    if ((is1Aggressive && is2Peaceful) || (is2Aggressive && is1Peaceful)) {
      score -= 40;
      temperamentStatus = 'CRITICAL';
      points.push({
        type: 'error',
        text: 'Aggression Hazard: One species is aggressive/territorial and will stress or harass peaceful tank mates.'
      });
    } else if (isBettaAndGuppy) {
      score -= 30;
      temperamentStatus = 'ACCEPTABLE';
      points.push({
        type: 'warning',
        text: 'Fin-Targeting Warning: Male Bettas may mistake long-finned male Guppies for rival Bettas and attack them.'
      });
      tips.push('If keeping Bettas with Guppies, opt for female short-finned Guppies and provide heavy plant cover.');
    } else if (isTigerBarbAndLongFin) {
      score -= 35;
      temperamentStatus = 'CRITICAL';
      points.push({
        type: 'error',
        text: 'Fin-Nipping Risk: Tiger Barbs are notorious for shredding long flowy fins of slow-moving fish.'
      });
      tips.push('Keep Tiger Barbs in large schools (8+) to focus nipping within their own group, away from other species.');
    } else if (is1Semi || is2Semi) {
      score -= 15;
      temperamentStatus = 'ACCEPTABLE';
      points.push({
        type: 'warning',
        text: 'Semi-Aggressive Presence: Requires visual barriers (driftwood, rock caves, dense plant thickets) to establish separate territories.'
      });
    } else {
      points.push({
        type: 'success',
        text: 'Temperament Synergy: Both species are peaceful community fish.'
      });
    }

    // D. Predation Risk (Size disparity)
    const size1 = fish1.maxSize || 2;
    const size2 = fish2.maxSize || 2;
    const sizeRatio = Math.max(size1, size2) / Math.min(size1, size2);
    let predationRisk = false;

    if (sizeRatio >= 3.5 && (size1 >= 5 || size2 >= 5)) {
      score -= 35;
      predationRisk = true;
      const larger = size1 > size2 ? fish1.name : fish2.name;
      const smaller = size1 > size2 ? fish2.name : fish1.name;
      points.push({
        type: 'error',
        text: `Predation Risk: Adult ${larger} (${Math.max(size1, size2)}") can easily swallow small ${smaller} (${Math.min(size1, size2)}").`
      });
      tips.push('Remember the golden rule of fishkeeping: "If it fits in their mouth, it will eventually be eaten."');
    }

    // E. Tank Size Buffer
    const minTank = Math.max(fish1.minTankSize || 10, fish2.minTankSize || 10) + 5;

    // F. Direct Compatibility Matrix Check in fishData
    const isDirectMatch = (fish1.compatibleWith || []).includes(fish2.slug || '') || (fish2.compatibleWith || []).includes(fish1.slug || '');
    if (isDirectMatch && score >= 70) {
      score = Math.min(100, score + 10);
      points.push({
        type: 'success',
        text: 'Verified Co-Habitant: These two species are documented as proven community tank mates in hobby literature.'
      });
    }

    score = Math.max(5, Math.min(100, score));

    // Determine Status
    let status: 'COMPATIBLE' | 'CAUTION' | 'INCOMPATIBLE' = 'COMPATIBLE';
    let badgeColor = 'bg-emerald-600 text-white';
    let borderColor = 'border-emerald-500';
    let title = 'Great Match — Community Compatible';
    let summary = `${fish1.name} and ${fish2.name} share harmonious parameters, non-conflicting temperaments, and compatible swimming layers.`;

    if (score < 60) {
      status = 'INCOMPATIBLE';
      badgeColor = 'bg-rose-600 text-white';
      borderColor = 'border-rose-500';
      title = 'Incompatible — High Conflict Risk';
      summary = `Housing ${fish1.name} with ${fish2.name} is not recommended due to critical parameter mismatches or behavioral aggression.`;
    } else if (score < 85) {
      status = 'CAUTION';
      badgeColor = 'bg-amber-600 text-white';
      borderColor = 'border-amber-500';
      title = 'Compatible with Caution';
      summary = `${fish1.name} and ${fish2.name} can cohabitate successfully if tank volume, environmental structure, and feeding routines are carefully managed.`;
    }

    if (tips.length === 0) {
      tips.push('Provide ample swimming space, live plants, and feed foods suited for both surface and bottom dwellers.');
      tips.push('Introduce new tank mates with aquarium lights turned off to reduce initial territorial stress.');
    }

    return {
      score,
      status,
      badgeColor,
      borderColor,
      title,
      summary,
      tempOverlap: tempHasOverlap ? [tempOverlapMin, tempOverlapMax] : null,
      phOverlap: phHasOverlap ? [phOverlapMin, phOverlapMax] : null,
      tempStatus,
      phStatus,
      temperamentStatus,
      predationRisk,
      minTankRecommended: minTank,
      points,
      tips
    };
  }, [fish1, fish2]);

  return (
    <div className="space-y-8 text-left font-sans">
      
      {/* Interactive Matchup Selection Cards */}
      <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#edeafc]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#27187e]/70 block mb-1">
              PAIRWISE COMPARISON TOOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#27187e] tracking-tight">
              Select Two Species to Evaluate
            </h2>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSwap}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#edeafc] hover:bg-[#cfcaf5] text-[#27187e] font-readable text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              title="Swap Species Positions"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Swap</span>
            </button>
            <button
              onClick={handleRandom}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] font-readable text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
              title="Pick a Random Pair"
            >
              <Shuffle className="w-4 h-4" />
              <span>Random Match</span>
            </button>
          </div>
        </div>

        {/* 2 Species Selectors with VS Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
          
          {/* Fish 1 Card */}
          <div className="lg:col-span-5 bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#1f1366] border-2 border-[#cfcaf5] shrink-0 shadow-sm">
              <Image
                src={fish1.image}
                alt={fish1.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-md bg-[#edeafc] border border-[#cfcaf5] text-[10px] font-bold uppercase tracking-wider text-[#27187e]">
                  {fish1.category}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#ffffff] border border-[#cfcaf5] text-[10px] font-semibold text-[#27187e]/80">
                  {fish1.temperament}
                </span>
              </div>
              <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#27187e] leading-tight mb-2">
                {fish1.name}
              </h3>
              <div className="relative">
                <select
                  value={fish1Id}
                  onChange={(e) => setFish1Id(e.target.value)}
                  className="w-full bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-xl px-3.5 py-2 text-xs sm:text-sm font-readable font-semibold text-[#27187e] focus:outline-none focus:ring-2 focus:ring-[#27187e]/30 cursor-pointer appearance-none pr-8 transition-colors"
                >
                  {fishData.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.category})
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#27187e]/70 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-[#27187e] text-[#f7f7ff] flex items-center justify-center font-sans font-extrabold text-sm tracking-widest shadow-md">
              VS
            </div>
          </div>

          {/* Fish 2 Card */}
          <div className="lg:col-span-5 bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#1f1366] border-2 border-[#cfcaf5] shrink-0 shadow-sm">
              <Image
                src={fish2.image}
                alt={fish2.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-md bg-[#edeafc] border border-[#cfcaf5] text-[10px] font-bold uppercase tracking-wider text-[#27187e]">
                  {fish2.category}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#ffffff] border border-[#cfcaf5] text-[10px] font-semibold text-[#27187e]/80">
                  {fish2.temperament}
                </span>
              </div>
              <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#27187e] leading-tight mb-2">
                {fish2.name}
              </h3>
              <div className="relative">
                <select
                  value={fish2Id}
                  onChange={(e) => setFish2Id(e.target.value)}
                  className="w-full bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-xl px-3.5 py-2 text-xs sm:text-sm font-readable font-semibold text-[#27187e] focus:outline-none focus:ring-2 focus:ring-[#27187e]/30 cursor-pointer appearance-none pr-8 transition-colors"
                >
                  {fishData.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.category})
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#27187e]/70 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Matchup Scientific Analysis Verdict Card */}
      <div className={`bg-[#ffffff] border-2 ${analysis.borderColor} rounded-3xl p-6 sm:p-9 shadow-md text-left`}>
        
        {/* Verdict Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#edeafc]">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${analysis.badgeColor}`}>
                {analysis.status}
              </span>
              <span className="font-readable text-xs font-semibold text-[#27187e]/70">
                Compatibility Index: <strong className="text-[#27187e] text-sm">{analysis.score}%</strong>
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-sans font-bold text-[#27187e] tracking-tight">
              {analysis.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-[#f7f7ff] border border-[#cfcaf5] rounded-2xl px-4 py-3">
            <Maximize2 className="w-5 h-5 text-[#27187e]" />
            <div className="text-left font-readable">
              <span className="text-[10px] uppercase font-bold text-[#27187e]/70 block leading-tight">
                Recommended Tank
              </span>
              <span className="text-base font-bold text-[#27187e]">
                {analysis.minTankRecommended}+ Gallons
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <p className="font-readable text-base sm:text-lg text-[#27187e]/90 leading-relaxed font-medium mb-8 bg-[#edeafc]/50 p-4 sm:p-5 rounded-2xl border border-[#cfcaf5]">
          {analysis.summary}
        </p>

        {/* Parameter Gauges & Overlap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          
          {/* Temperature Overlap Card */}
          <div className="bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#27187e]">
                  <Thermometer className="w-4 h-4 text-amber-500" /> Temperature
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  analysis.tempStatus === 'PERFECT' ? 'bg-emerald-100 text-emerald-800' :
                  analysis.tempStatus === 'ACCEPTABLE' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {analysis.tempStatus}
                </span>
              </div>
              <div className="space-y-1.5 font-readable text-xs text-[#27187e]/80 mb-4">
                <div className="flex justify-between">
                  <span>{fish1.name}:</span>
                  <span className="font-semibold text-[#27187e]">{fish1.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span>{fish2.name}:</span>
                  <span className="font-semibold text-[#27187e]">{fish2.temperature}</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#cfcaf5] font-readable">
              <span className="text-[11px] font-semibold uppercase text-[#27187e]/70 block">Target Safe Range</span>
              <span className="text-sm font-bold text-[#27187e]">
                {analysis.tempOverlap ? `${analysis.tempOverlap[0]}°F – ${analysis.tempOverlap[1]}°F` : 'No Safe Overlap'}
              </span>
            </div>
          </div>

          {/* pH Overlap Card */}
          <div className="bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#27187e]">
                  <Droplets className="w-4 h-4 text-cyan-500" /> pH &amp; Acidity
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  analysis.phStatus === 'PERFECT' ? 'bg-emerald-100 text-emerald-800' :
                  analysis.phStatus === 'ACCEPTABLE' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {analysis.phStatus}
                </span>
              </div>
              <div className="space-y-1.5 font-readable text-xs text-[#27187e]/80 mb-4">
                <div className="flex justify-between">
                  <span>{fish1.name}:</span>
                  <span className="font-semibold text-[#27187e]">pH {fish1.ph}</span>
                </div>
                <div className="flex justify-between">
                  <span>{fish2.name}:</span>
                  <span className="font-semibold text-[#27187e]">pH {fish2.ph}</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#cfcaf5] font-readable">
              <span className="text-[11px] font-semibold uppercase text-[#27187e]/70 block">Target Safe pH</span>
              <span className="text-sm font-bold text-[#27187e]">
                {analysis.phOverlap ? `pH ${analysis.phOverlap[0].toFixed(1)} – ${analysis.phOverlap[1].toFixed(1)}` : 'No pH Overlap'}
              </span>
            </div>
          </div>

          {/* Temperament & Social Card */}
          <div className="bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#27187e]">
                  <ShieldAlert className="w-4 h-4 text-indigo-500" /> Temperament Match
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  analysis.temperamentStatus === 'PERFECT' ? 'bg-emerald-100 text-emerald-800' :
                  analysis.temperamentStatus === 'ACCEPTABLE' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {analysis.temperamentStatus}
                </span>
              </div>
              <div className="space-y-1.5 font-readable text-xs text-[#27187e]/80 mb-4">
                <div className="flex justify-between">
                  <span>{fish1.name}:</span>
                  <span className="font-semibold text-[#27187e]">{fish1.temperament} ({fish1.maxSize}&quot;)</span>
                </div>
                <div className="flex justify-between">
                  <span>{fish2.name}:</span>
                  <span className="font-semibold text-[#27187e]">{fish2.temperament} ({fish2.maxSize}&quot;)</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#cfcaf5] font-readable">
              <span className="text-[11px] font-semibold uppercase text-[#27187e]/70 block">Predation / Fin Nipping</span>
              <span className="text-sm font-bold text-[#27187e]">
                {analysis.predationRisk ? 'High Risk' : 'Low Risk'}
              </span>
            </div>
          </div>

        </div>

        {/* Detailed Criteria Checklist */}
        <div className="mb-8">
          <h4 className="text-sm uppercase font-bold tracking-wider text-[#27187e] mb-4 font-sans">
            Biological Evaluation Breakdown
          </h4>
          <div className="space-y-3 font-readable text-sm">
            {analysis.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f7f7ff] border border-[#cfcaf5]">
                {pt.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                {pt.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
                {pt.type === 'error' && <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
                <span className="text-[#27187e] font-medium leading-relaxed">{pt.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Husbandry Tips */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#edeafc] border border-[#cfcaf5]">
          <h4 className="flex items-center gap-2 text-base font-sans font-bold text-[#27187e] mb-3">
            <Sparkles className="w-4 h-4 text-[#27187e]" />
            <span>Recommended Husbandry Protocols for this Pairing</span>
          </h4>
          <ul className="space-y-2 font-readable text-sm text-[#27187e]/85">
            {analysis.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#27187e] font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links to Species Care Sheets */}
        <div className="mt-6 pt-6 border-t border-[#edeafc] flex flex-wrap items-center justify-between gap-4 font-readable text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#27187e]/70 font-semibold">Full Care Profiles:</span>
            <Link
              href={`/fish/${fish1.category?.toLowerCase() || 'freshwater'}/${fish1.slug}`}
              className="inline-flex items-center gap-1 text-[#27187e] font-bold hover:underline"
            >
              <span>{fish1.name}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[#cfcaf5]">|</span>
            <Link
              href={`/fish/${fish2.category?.toLowerCase() || 'freshwater'}/${fish2.slug}`}
              className="inline-flex items-center gap-1 text-[#27187e] font-bold hover:underline"
            >
              <span>{fish2.name}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
          <span className="text-[11px] text-[#27187e]/60">
            Atlas Reference Standard v2.4
          </span>
        </div>

      </div>

    </div>
  );
}
