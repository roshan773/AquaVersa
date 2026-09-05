'use client';

import { useState, useEffect } from 'react';
import { Ruler, Info, Layers, Hammer, Thermometer, Droplets, Filter, Lightbulb, RefreshCw, Scale, ShieldCheck } from "lucide-react";
import TankSizeGuide from "@/components/home/TankSizeGuide";
import AquariumTypes from "@/components/home/AquariumTypes";
import { unlockAchievement } from '@/lib/storage';
import GlobalCTA from "@/components/ui/GlobalCTA";

export default function TankSizePage() {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [length, setLength] = useState<string>('24');
  const [width, setWidth] = useState<string>('12');
  const [height, setHeight] = useState<string>('16');
  const [gallons, setGallons] = useState<number>(10);
  const [liters, setLiters] = useState<number>(38);

  useEffect(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    if (unit === 'in') {
      const volGallons = (l * w * h) / 231;
      const volLiters = volGallons * 3.78541;
      setGallons(parseFloat(volGallons.toFixed(1)));
      setLiters(parseFloat(volLiters.toFixed(1)));
    } else {
      const volLiters = (l * w * h) / 1000;
      const volGallons = volLiters * 0.264172;
      setGallons(parseFloat(volGallons.toFixed(1)));
      setLiters(parseFloat(volLiters.toFixed(1)));
    }
  }, [length, width, height, unit]);

  const handleReset = () => {
    if (unit === 'in') {
      setLength('24');
      setWidth('12');
      setHeight('16');
    } else {
      setLength('60');
      setWidth('30');
      setHeight('30');
    }
  };

  const handleUnitSwitch = (newUnit: 'in' | 'cm') => {
    setUnit(newUnit);
    if (newUnit === 'in') {
      setLength(prev => {
        const val = parseFloat(prev);
        return val ? Math.round(val / 2.54).toString() : '24';
      });
      setWidth(prev => {
        const val = parseFloat(prev);
        return val ? Math.round(val / 2.54).toString() : '12';
      });
      setHeight(prev => {
        const val = parseFloat(prev);
        return val ? Math.round(val / 2.54).toString() : '16';
      });
    } else {
      setLength(prev => {
        const val = parseFloat(prev);
        return val ? Math.round(val * 2.54).toString() : '60';
      });
      setWidth(prev => {
        const val = parseFloat(prev);
        return val ? Math.round(val * 2.54).toString() : '30';
      });
      setHeight(prev => {
        const val = parseFloat(prev);
        return val ? Math.round(val * 2.54).toString() : '30';
      });
    }
  };

  const filterMinL = Math.round(liters * 5);
  const filterMaxL = Math.round(liters * 10);
  const filterMinG = Math.round(gallons * 5);
  const filterMaxG = Math.round(gallons * 10);

  const heaterMin = Math.round(gallons * 3.5);
  const heaterMax = Math.round(gallons * 5);

  const waterChangeMinL = Math.round(liters * 0.1);
  const waterChangeMaxL = Math.round(liters * 0.25);
  const waterChangeMinG = Math.round(gallons * 0.1);
  const waterChangeMaxG = Math.round(gallons * 0.25);

  const lVal = parseFloat(length) || 0;
  const wVal = parseFloat(width) || 0;
  const substrateLbs = unit === 'in' ? Math.round((lVal * wVal * 2) * 0.05) : Math.round(((lVal * wVal * 5) / 1000) * 1.3 * 2.20462);

  const waterWeightLbs = Math.round(gallons * 8.34);
  const glassWeightLbs = Math.round(gallons * 1.5);
  const totalWeightLbs = waterWeightLbs + substrateLbs + glassWeightLbs;
  const totalWeightKg = Math.round(totalWeightLbs * 0.453592);

  useEffect(() => {
    if (gallons > 0) {
      unlockAchievement('tank-dimensions');
    }
  }, [gallons]);

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Ruler className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Aquarium Physics &amp; Volume</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            TANK SIZE &amp; VOLUME CALCULATOR
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl leading-relaxed">
            Calculate precise aquarium volume, filled setup weight, substrate requirements, and heater/filter ratings from custom glass dimensions.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Dimension Inputs */}
          <div className="lg:col-span-6 bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-readable">
            <div className="flex justify-between items-center border-b border-[#edeafc] pb-4">
              <h2 className="font-display text-2xl sm:text-3xl text-[#27187e]">
                Glass Dimensions
              </h2>
              
              <div className="flex bg-[#f7f7ff] p-1 rounded-xl border border-[#cfcaf5]">
                <button
                  onClick={() => handleUnitSwitch('in')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    unit === 'in' ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm' : 'text-[#27187e]'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => handleUnitSwitch('cm')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    unit === 'cm' ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm' : 'text-[#27187e]'
                  }`}
                >
                  Centimeters
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                  Length ({unit})
                </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] focus:border-[#27187e] rounded-2xl px-4 py-3 text-base text-[#27187e] font-bold focus:outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                  Width / Depth ({unit})
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] focus:border-[#27187e] rounded-2xl px-4 py-3 text-base text-[#27187e] font-bold focus:outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                  Height ({unit})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] focus:border-[#27187e] rounded-2xl px-4 py-3 text-base text-[#27187e] font-bold focus:outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={handleReset}
                className="text-xs sm:text-sm font-semibold text-[#27187e]/70 hover:text-[#27187e] flex items-center gap-1.5 cursor-pointer underline"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Default Dimensions
              </button>
            </div>

            {/* Calculated Primary Volume Display */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#edeafc]">
              <div className="bg-[#edeafc] p-5 rounded-2xl border border-[#cfcaf5]">
                <span className="text-xs uppercase font-bold text-[#27187e]/70 block tracking-wider mb-1">
                  Water Volume (US)
                </span>
                <span className="font-display text-4xl sm:text-5xl text-[#27187e] block">
                  {gallons} <span className="text-xl sm:text-2xl font-normal">Gal</span>
                </span>
              </div>

              <div className="bg-[#edeafc] p-5 rounded-2xl border border-[#cfcaf5]">
                <span className="text-xs uppercase font-bold text-[#27187e]/70 block tracking-wider mb-1">
                  Water Volume (Metric)
                </span>
                <span className="font-display text-4xl sm:text-5xl text-[#27187e] block">
                  {liters} <span className="text-xl sm:text-2xl font-normal">L</span>
                </span>
              </div>
            </div>
          </div>

          {/* Equipment & Engineering Ledger */}
          <div className="lg:col-span-6 bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 font-readable">
            <h3 className="font-display text-2xl sm:text-3xl text-[#27187e]">
              Hardware &amp; Physical Engineering
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f7f7ff] p-4 rounded-2xl border border-[#cfcaf5]">
                <div className="flex items-center gap-2 mb-1 text-[#27187e]">
                  <Filter className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">Turnover Flow Rate</span>
                </div>
                <span className="font-bold text-base text-[#27187e] block">
                  {filterMinG}–{filterMaxG} GPH ({filterMinL}–{filterMaxL} L/h)
                </span>
                <span className="text-xs text-[#27187e]/70 block mt-0.5">5x to 10x hourly turnover</span>
              </div>

              <div className="bg-[#f7f7ff] p-4 rounded-2xl border border-[#cfcaf5]">
                <div className="flex items-center gap-2 mb-1 text-[#27187e]">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">Heater Wattage</span>
                </div>
                <span className="font-bold text-base text-[#27187e] block">
                  {heaterMin}–{heaterMax} Watts
                </span>
                <span className="text-xs text-[#27187e]/70 block mt-0.5">3.5–5 Watts per gallon</span>
              </div>

              <div className="bg-[#f7f7ff] p-4 rounded-2xl border border-[#cfcaf5]">
                <div className="flex items-center gap-2 mb-1 text-[#27187e]">
                  <Droplets className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">Weekly Water Change</span>
                </div>
                <span className="font-bold text-base text-[#27187e] block">
                  {waterChangeMinG}–{waterChangeMaxG} Gal ({waterChangeMinL}–{waterChangeMaxL} L)
                </span>
                <span className="text-xs text-[#27187e]/70 block mt-0.5">10% to 25% weekly maintenance</span>
              </div>

              <div className="bg-[#f7f7ff] p-4 rounded-2xl border border-[#cfcaf5]">
                <div className="flex items-center gap-2 mb-1 text-[#27187e]">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">Substrate Needed</span>
                </div>
                <span className="font-bold text-base text-[#27187e] block">
                  ~{substrateLbs} lbs (~{Math.round(substrateLbs * 0.453592)} kg)
                </span>
                <span className="text-xs text-[#27187e]/70 block mt-0.5">For a standard 2-inch bed</span>
              </div>
            </div>

            {/* Total Filled Weight Alert */}
            <div className="p-5 rounded-2xl bg-[#edeafc] border-2 border-[#27187e] space-y-1">
              <div className="flex items-center gap-2 text-[#27187e] font-bold">
                <ShieldCheck className="w-5 h-5 text-[#27187e]" />
                <span className="text-sm uppercase tracking-wider">Total Filled System Weight</span>
              </div>
              <p className="font-display text-3xl text-[#27187e]">
                ~{totalWeightLbs} lbs <span className="text-xl font-normal">({totalWeightKg} kg)</span>
              </p>
              <p className="text-xs text-[#27187e]/80 font-medium">
                Combined weight of water, substrate, glass, and equipment. Verify your aquarium stand and floor joist capacity.
              </p>
            </div>
          </div>

        </div>

        {/* Section 2: Standard Tank Sizes Guide */}
        <TankSizeGuide />

        {/* Section 3: Aquarium Types */}
        <AquariumTypes />

      </div>

      <GlobalCTA
        badge="SPECIES COMPATIBILITY & STOCKING"
        title={
          <>
            Ready to stock your <br className="hidden sm:inline" />
            new aquarium volume?
          </>
        }
        description="Verify water parameter compatibility, swimming levels, and social group sizes with our interactive tools."
        primaryAction={{
          label: 'Launch Stocking Planner',
          href: '/stocking-planner',
        }}
        secondaryAction={{
          label: 'Pairwise Compatibility Checker',
          href: '/compatibility',
        }}
      />
    </div>
  );
}
