'use client';

import { useState, useEffect } from 'react';
import { Ruler, Info, Layers, Hammer, Thermometer, Droplets, Filter, Lightbulb, RefreshCw } from "lucide-react";
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
      // Convert current cm to inches (approx)
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
      // Convert current inches to cm (approx)
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

  // Recommendations Math
  // Filter flow: 5x to 10x tank volume per hour
  const filterMinL = Math.round(liters * 5);
  const filterMaxL = Math.round(liters * 10);
  const filterMinG = Math.round(gallons * 5);
  const filterMaxG = Math.round(gallons * 10);

  // Heater Wattage: 3-5 Watts per Gallon (or 1 Watt per Litre approx)
  const heaterMin = Math.round(gallons * 3.5);
  const heaterMax = Math.round(gallons * 5);

  // Weekly Water Change: 10% - 25% of volume
  const waterChangeMinL = Math.round(liters * 0.1);
  const waterChangeMaxL = Math.round(liters * 0.25);
  const waterChangeMinG = Math.round(gallons * 0.1);
  const waterChangeMaxG = Math.round(gallons * 0.25);

  // Substrate weight: for 2 inch (5 cm) bed
  // L * W * depth. gravel is approx 1.3 kg/L or 0.05 lbs/in3 density
  const lVal = parseFloat(length) || 0;
  const wVal = parseFloat(width) || 0;
  const hVal = parseFloat(height) || 0;
  let substrateWeightLbs = 0;
  let substrateWeightKg = 0;

  if (unit === 'in') {
    const volumeCuIn = lVal * wVal * 2; // 2 inches deep
    substrateWeightLbs = parseFloat((volumeCuIn * 0.05).toFixed(1));
    substrateWeightKg = parseFloat((substrateWeightLbs * 0.453592).toFixed(1));
  } else {
    const volumeLiters = (lVal * wVal * 5) / 1000; // 5 cm deep
    substrateWeightKg = parseFloat((volumeLiters * 1.3).toFixed(1));
    substrateWeightLbs = parseFloat((substrateWeightKg * 2.20462).toFixed(1));
  }

  // Lighting Category based on tank depth (height)
  let lightingCategory = "";
  let lightingExplanation = "";
  const heightInches = unit === 'in' ? hVal : hVal / 2.54;

  if (heightInches < 12) {
    lightingCategory = "Low to Medium Light";
    lightingExplanation = "Shallow tank (under 12\" depth) allows excellent light penetration. Standard aquarium LEDs will easily grow low-tech plants without issues.";
  } else if (heightInches <= 18) {
    lightingCategory = "Medium Light Recommended";
    lightingExplanation = "Average tank depth (12\"–18\"). Adequate for most standard setups. Dense carpeting plants may require slightly higher output or centered fixtures.";
  } else {
    lightingCategory = "High Output LED with Lens Control";
    lightingExplanation = "Deep tank (over 18\" depth). Water absorbs light rapidly. Requires strong, focused LED fixtures (like pendant spotlights or lenses) to reach the substrate level.";
  }

  // Check achievement on calculation
  useEffect(() => {
    if (gallons > 0) {
      unlockAchievement('tank-calc');
    }
  }, [gallons]);

  return (
    <div className="w-full">
      {/* Header and Interactive Calculator */}
      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 border-b border-slate-900 overflow-hidden px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-6 border border-cyan-500/20 shadow-lg">
              <Ruler className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-white">Tank Volume & Setup Calculator</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Enter your tank dimensions below to calculate empty volume and get custom recommendations for your filter flow, heater, substrate, and water changes.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-6 bg-slate-900/60 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-855 pb-4">
                <span className="font-bold text-lg text-slate-200">Tank Dimensions</span>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button 
                    onClick={() => handleUnitSwitch('in')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      unit === 'in' ? 'bg-cyan-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Inches (in)
                  </button>
                  <button 
                    onClick={() => handleUnitSwitch('cm')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      unit === 'cm' ? 'bg-cyan-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Centimeters (cm)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Length</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono font-bold"
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-500 font-bold">{unit}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Width</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono font-bold"
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-500 font-bold">{unit}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Height</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono font-bold"
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-500 font-bold">{unit}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Reset Size
                </button>
              </div>

              {/* Warning box */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left">
                <div className="flex gap-3 text-amber-400 mb-2">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="font-bold text-sm">Critical Stocking Note</span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Aquarium volume is only one variable. Real stocking capacity depends on <strong>adult species size, schooling behavior, waste production, and filtration capacity.</strong> A longer, wider tank provides a larger surface area for oxygen exchange than a tall, narrow tank of identical volume.
                </p>
              </div>
            </div>

            {/* Output */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs mb-4">
                  <Layers className="w-4 h-4" /> Calculated Capacity
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/60">
                    <span className="text-xs font-bold text-slate-400 block mb-1">Volume (US Gallons)</span>
                    <span className="text-3xl md:text-4xl font-poppins font-black text-white leading-none tracking-tight">
                      {gallons} <span className="text-lg font-bold text-cyan-400">gal</span>
                    </span>
                  </div>
                  
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/60">
                    <span className="text-xs font-bold text-slate-400 block mb-1">Volume (Metric Liters)</span>
                    <span className="text-3xl md:text-4xl font-poppins font-black text-slate-200 leading-none tracking-tight">
                      {liters} <span className="text-lg font-bold text-cyan-500">L</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 border-t border-slate-850 pt-4 leading-relaxed text-left">
                *Calculation is based on empty internal volumes. Substrate, rocks, wood, and equipment will displace water, reducing the actual water volume by approximately 10-20%.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* V2 Recommendations Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-poppins font-bold mb-2 text-foreground text-left">Toolkit Recommendations</h2>
          <p className="text-muted-foreground mb-10 text-left">Based on your tank dimensions, here are the calculated requirements for your setup:</p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {/* Filter */}
            <div className="p-6 bg-card border border-border rounded-3xl flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-2xl border border-cyan-500/20 shrink-0">
                <Filter className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground">Suggested Filter Flow</h3>
                <p className="text-2xl font-poppins font-black text-cyan-500">
                  {filterMinL}–{filterMaxL} L/h <span className="text-xs font-semibold text-muted-foreground">({filterMinG}–{filterMaxG} GPH)</span>
                </p>
                <p className="text-xs text-muted-foreground pt-1.5 leading-relaxed">
                  <strong>How it's determined:</strong> To maintain clean water, a filter should cycle the entire tank volume 5 to 10 times per hour. Higher turnover rates are recommended for heavily stocked tanks or high-waste species.
                </p>
              </div>
            </div>

            {/* Heater */}
            <div className="p-6 bg-card border border-border rounded-3xl flex items-start gap-4">
              <div className="p-3 bg-orange-500/10 text-orange-500 rounded-2xl border border-orange-500/20 shrink-0">
                <Thermometer className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground">Suggested Heater Wattage</h3>
                <p className="text-2xl font-poppins font-black text-orange-500">
                  {heaterMin}–{heaterMax} W
                </p>
                <p className="text-xs text-muted-foreground pt-1.5 leading-relaxed">
                  <strong>How it's determined:</strong> Recommended wattage is calculated at 3 to 5 watts per gallon (approx. 1 watt per liter) to maintain tropical temperatures (72–82°F / 22–28°C) in standard room temp environments.
                </p>
              </div>
            </div>

            {/* Substrate */}
            <div className="p-6 bg-card border border-border rounded-3xl flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl border border-amber-500/20 shrink-0">
                <Hammer className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground">Approximate Substrate Quantity</h3>
                <p className="text-2xl font-poppins font-black text-amber-500">
                  {substrateWeightKg} kg <span className="text-xs font-semibold text-muted-foreground">({substrateWeightLbs} lbs)</span>
                </p>
                <p className="text-xs text-muted-foreground pt-1.5 leading-relaxed">
                  <strong>How it's determined:</strong> Calculated for a healthy 2-inch (5 cm) bed depth. Standard dry substrate has an approximate bulk density of 1.3 kg/L. Deep substrate is crucial for live plant rooting and biological filtration.
                </p>
              </div>
            </div>

            {/* Water Change */}
            <div className="p-6 bg-card border border-border rounded-3xl flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl border border-blue-500/20 shrink-0">
                <Droplets className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground">Weekly Water Change</h3>
                <p className="text-2xl font-poppins font-black text-blue-500">
                  {waterChangeMinL}–{waterChangeMaxL} L <span className="text-xs font-semibold text-muted-foreground">({waterChangeMinG}–{waterChangeMaxG} gal)</span>
                </p>
                <p className="text-xs text-muted-foreground pt-1.5 leading-relaxed">
                  <strong>How it's determined:</strong> Diluting nitrates and replenishing essential trace minerals requires changing 10% to 25% of the aquarium's volume weekly. Never replace 100% of the water as it crashes the biological cycle.
                </p>
              </div>
            </div>

            {/* Lighting */}
            <div className="p-6 bg-card border border-border rounded-3xl flex md:col-span-2 items-start gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20 shrink-0">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground">Suggested Lighting Category</h3>
                <p className="text-xl font-poppins font-black text-emerald-500">
                  {lightingCategory}
                </p>
                <p className="text-xs text-muted-foreground pt-1.5 leading-relaxed">
                  {lightingExplanation}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  <strong>How it's determined:</strong> Light intensity decays rapidly under water. Tall tanks require higher power output or focused LED lenses to penetrate deep columns, whereas shallow tanks can use entry-level low-power lighting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TankSizeGuide />
      <AquariumTypes />

      <GlobalCTA
        badge="AQUARIUM VOLUME & HARDWARE SIZING"
        title={
          <>
            Select filtration &amp; heating <br className="hidden sm:inline" />
            matched to your calculated volume.
          </>
        }
        description="Explore recommended canister filters, sponge filters, and substrate depths based on your dimensions."
        primaryAction={{
          label: 'Equipment Selection Wizard',
          href: '/equipment-wizard',
        }}
        secondaryAction={{
          label: 'Stocking Safety Planner',
          href: '/stocking-planner',
        }}
      />
    </div>
  );
}

