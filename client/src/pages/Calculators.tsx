import React, { useState } from 'react';
import { Calculator, Grid, Thermometer, Flame, Droplets, Lightbulb, RefreshCw } from 'lucide-react';

export const Calculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'volume' | 'heater' | 'filter' | 'stocking' | 'waterchange' | 'lighting'>('volume');

  // Volume Calculator States
  const [volUnit, setVolUnit] = useState<'inches' | 'cm'>('inches');
  const [length, setLength] = useState(24);
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(16);
  const [volumeGallons, setVolumeGallons] = useState<number>(20);
  const [volumeLiters, setVolumeLiters] = useState<number>(75);

  const calculateVolume = () => {
    if (volUnit === 'inches') {
      const g = (length * width * height) / 231;
      setVolumeGallons(parseFloat(g.toFixed(1)));
      setVolumeLiters(parseFloat((g * 3.78541).toFixed(1)));
    } else {
      const l = (length * width * height) / 1000;
      setVolumeLiters(parseFloat(l.toFixed(1)));
      setVolumeGallons(parseFloat((l / 3.78541).toFixed(1)));
    }
  };

  // Heater Calculator States
  const [heatVol, setHeatVol] = useState(30);
  const [heatUnit, setHeatUnit] = useState<'gallons' | 'liters'>('gallons');
  const [tempDiff, setTempDiff] = useState(10); // in Fahrenheit rise
  const [heaterWattage, setHeaterWattage] = useState<number>(120);

  const calculateHeater = () => {
    const volG = heatUnit === 'liters' ? heatVol / 3.78541 : heatVol;
    // Standard rule: 4W per gallon for 10F rise
    const multiplier = tempDiff <= 5 ? 3 : tempDiff <= 10 ? 4 : 5;
    setHeaterWattage(Math.ceil(volG * multiplier));
  };

  // Filter Calculator States
  const [filtVol, setFiltVol] = useState(20);
  const [filtUnit, setFiltUnit] = useState<'gallons' | 'liters'>('gallons');
  const [bioload, setBioload] = useState<'light' | 'moderate' | 'heavy'>('moderate');
  const [requiredGPH, setRequiredGPH] = useState<number>(100);
  const [requiredLPH, setRequiredLPH] = useState<number>(378);

  const calculateFilter = () => {
    const volG = filtUnit === 'liters' ? filtVol / 3.78541 : filtVol;
    const turnover = bioload === 'light' ? 4 : bioload === 'moderate' ? 6 : 8;
    const gph = Math.ceil(volG * turnover);
    setRequiredGPH(gph);
    setRequiredLPH(Math.ceil(gph * 3.78541));
  };

  // Stocking Calculator States
  const [stockVol, setStockVol] = useState(20);
  const [stockUnit, setStockUnit] = useState<'gallons' | 'liters'>('gallons');
  const [fishSize, setFishSize] = useState(2); // average fish size in inches
  const [fishCount, setFishCount] = useState(8);
  const [stockPercent, setStockPercent] = useState<number>(80);

  const calculateStocking = () => {
    const volG = stockUnit === 'liters' ? stockVol / 3.78541 : stockVol;
    // Standard rule: 1 inch of fish per gallon (adjusted by size factor for bioload curve)
    const sizeMultiplier = fishSize <= 1 ? 1 : fishSize <= 3 ? 1.2 : 1.5;
    const maxInches = volG / sizeMultiplier;
    const currentInches = fishCount * fishSize;
    setStockPercent(Math.ceil((currentInches / maxInches) * 100));
  };

  // Water Change Calculator
  const [nitrateCurrent, setNitrateCurrent] = useState(40);
  const [nitrateTarget, setNitrateTarget] = useState(10);
  const [waterChangePercent, setWaterChangePercent] = useState<number>(75);

  const calculateWaterChange = () => {
    if (nitrateCurrent > 0) {
      const reductionNeeded = (nitrateCurrent - nitrateTarget) / nitrateCurrent;
      setWaterChangePercent(Math.ceil(Math.max(0, reductionNeeded * 100)));
    }
  };

  // Lighting Calculator
  const [lightVol, setLightVol] = useState(30);
  const [lightUnit, setLightUnit] = useState<'gallons' | 'liters'>('gallons');
  const [plantType, setPlantType] = useState<'low' | 'medium' | 'high'>('medium');
  const [lightWatts, setLightWatts] = useState<number>(60);

  const calculateLighting = () => {
    const volG = lightUnit === 'liters' ? lightVol / 3.78541 : lightVol;
    const wattsPerGal = plantType === 'low' ? 1.5 : plantType === 'medium' ? 2.5 : 4.0;
    setLightWatts(Math.ceil(volG * wattsPerGal));
  };

  const tabs = [
    { id: 'volume', label: 'Tank Volume', icon: Grid },
    { id: 'heater', label: 'Heater Size', icon: Thermometer },
    { id: 'filter', label: 'Filter Flow', icon: Droplets },
    { id: 'stocking', label: 'Stocking limits', icon: Flame },
    { id: 'waterchange', label: 'Water Change', icon: RefreshCw },
    { id: 'lighting', label: 'Lighting Watts', icon: Lightbulb },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-100 flex items-center justify-center space-x-3">
          <Calculator className="h-10 w-10 text-sky-400" />
          <span>Aquarium Calculators</span>
        </h1>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Sizing guidelines for volume, biological filtrations, heater wattages, water changes, and stocking lists.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-sky-500 border-sky-400 text-slate-950 btn-glow-cyan'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-sky-400'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Calculator Body Card */}
      <div className="glass rounded-3xl p-6 md:p-10 space-y-8 bg-gradient-to-br from-slate-950/70 to-[#071224]/50">
        
        {/* TANK VOLUME */}
        {activeTab === 'volume' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-100">Tank Volume Calculator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-900 rounded-xl p-1 border border-slate-800">
                  <button
                    onClick={() => setVolUnit('inches')}
                    className={`flex-grow py-2 rounded-lg text-xs font-bold transition-colors ${volUnit === 'inches' ? 'bg-sky-500 text-slate-950' : 'text-slate-400'}`}
                  >
                    Inches
                  </button>
                  <button
                    onClick={() => setVolUnit('cm')}
                    className={`flex-grow py-2 rounded-lg text-xs font-bold transition-colors ${volUnit === 'cm' ? 'bg-sky-500 text-slate-950' : 'text-slate-400'}`}
                  >
                    Centimeters
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tank Length</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tank Width</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tank Height</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                  />
                </div>

                <button
                  onClick={calculateVolume}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 hover:opacity-95 btn-glow-cyan cursor-pointer"
                >
                  Calculate Volume
                </button>
              </div>

              {/* Volume Results */}
              <div className="p-8 bg-sky-500/5 border border-sky-500/20 rounded-2xl text-center space-y-4">
                <span className="text-[10px] font-extrabold uppercase text-sky-400 tracking-wider">Estimated Volume</span>
                <div className="space-y-1">
                  <h4 className="text-4xl font-black text-slate-100">{volumeGallons} Gallons</h4>
                  <p className="text-sm font-extrabold text-sky-400">{volumeLiters} Liters</p>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-semibold max-w-xs mx-auto">
                  Volume calculation assumes a rectangular tank. Substrate displacement and decor will decrease actual volume.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* HEATER SIZE */}
        {activeTab === 'heater' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-100">Heater Wattage Calculator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-grow space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tank Volume</label>
                    <input
                      type="number"
                      value={heatVol}
                      onChange={(e) => setHeatVol(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                    />
                  </div>
                  <div className="w-24 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Unit</label>
                    <select
                      value={heatUnit}
                      onChange={(e) => setHeatUnit(e.target.value as any)}
                      className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-2 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
                    >
                      <option value="gallons">Gal</option>
                      <option value="liters">Ltr</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Temperature Rise Needed (°F)</label>
                  <select
                    value={tempDiff}
                    onChange={(e) => setTempDiff(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
                  >
                    <option value="5">5°F (Room ~73°F, Tank 78°F)</option>
                    <option value="10">10°F (Room ~68°F, Tank 78°F)</option>
                    <option value="15">15°F (Room ~63°F, Tank 78°F)</option>
                  </select>
                </div>

                <button
                  onClick={calculateHeater}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 hover:opacity-95 btn-glow-cyan cursor-pointer"
                >
                  Calculate Wattage
                </button>
              </div>

              {/* Heater Results */}
              <div className="p-8 bg-sky-500/5 border border-sky-500/20 rounded-2xl text-center space-y-4">
                <span className="text-[10px] font-extrabold uppercase text-sky-400 tracking-wider">Recommended Wattage</span>
                <h4 className="text-4xl font-black text-slate-100">{heaterWattage} Watts</h4>
                <p className="text-[10px] text-slate-500 leading-normal font-semibold max-w-xs mx-auto">
                  If required wattage is above 200W, consider splitting the load between two smaller heaters for thermal safety.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FILTER FLOW */}
        {activeTab === 'filter' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-100">Filter Flow Rate Calculator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-grow space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tank Volume</label>
                    <input
                      type="number"
                      value={filtVol}
                      onChange={(e) => setFiltVol(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                    />
                  </div>
                  <div className="w-24 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Unit</label>
                    <select
                      value={filtUnit}
                      onChange={(e) => setFiltUnit(e.target.value as any)}
                      className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-2 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
                    >
                      <option value="gallons">Gal</option>
                      <option value="liters">Ltr</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Bioload Level</label>
                  <select
                    value={bioload}
                    onChange={(e) => setBioload(e.target.value as any)}
                    className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
                  >
                    <option value="light">Light (Shrimp, small tetras only)</option>
                    <option value="moderate">Moderate (Community fish)</option>
                    <option value="heavy">Heavy (Oscars, goldfish, cichlids)</option>
                  </select>
                </div>

                <button
                  onClick={calculateFilter}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 hover:opacity-95 btn-glow-cyan cursor-pointer"
                >
                  Calculate Flow Rate
                </button>
              </div>

              {/* Filter Results */}
              <div className="p-8 bg-sky-500/5 border border-sky-500/20 rounded-2xl text-center space-y-4">
                <span className="text-[10px] font-extrabold uppercase text-sky-400 tracking-wider">Recommended Flow Turnover</span>
                <div className="space-y-1">
                  <h4 className="text-3xl font-black text-slate-100">{requiredGPH} GPH</h4>
                  <p className="text-sm font-extrabold text-sky-400">{requiredLPH} LPH</p>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-semibold max-w-xs mx-auto">
                  Filter flow rates indicate turnover frequency (GPH flow should turnover tank water 5-8 times hourly).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STOCKING LIMITS */}
        {activeTab === 'stocking' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-100">Stocking Capacity Calculator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-grow space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tank Volume</label>
                    <input
                      type="number"
                      value={stockVol}
                      onChange={(e) => setStockVol(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                    />
                  </div>
                  <div className="w-24 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Unit</label>
                    <select
                      value={stockUnit}
                      onChange={(e) => setStockUnit(e.target.value as any)}
                      className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-2 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
                    >
                      <option value="gallons">Gal</option>
                      <option value="liters">Ltr</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Planned Fish Count</label>
                  <input
                    type="number"
                    value={fishCount}
                    onChange={(e) => setFishCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Average Adult Size (Inches)</label>
                  <input
                    type="number"
                    value={fishSize}
                    onChange={(e) => setFishSize(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                  />
                </div>

                <button
                  onClick={calculateStocking}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 hover:opacity-95 btn-glow-cyan cursor-pointer"
                >
                  Check Stock Capacity
                </button>
              </div>

              {/* Stocking Results */}
              <div className="p-8 bg-sky-500/5 border border-sky-500/20 rounded-2xl text-center space-y-4">
                <span className="text-[10px] font-extrabold uppercase text-sky-400 tracking-wider">Stocking Load Percentage</span>
                <h4 className={`text-4xl font-black ${stockPercent > 100 ? 'text-rose-400' : 'text-emerald-400'}`}>{stockPercent}%</h4>
                <p className="text-[10px] text-slate-500 leading-normal font-semibold max-w-xs mx-auto">
                  {stockPercent > 100 
                    ? '⚠️ Tank is overstocked. Consider upgrading filter turnover or reducing fish density.'
                    : 'Tank is within a healthy bioload range. Continue regular weekly water changes.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* WATER CHANGE */}
        {activeTab === 'waterchange' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-100">Water Change Calculator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current Nitrate Level (ppm)</label>
                  <input
                    type="number"
                    value={nitrateCurrent}
                    onChange={(e) => setNitrateCurrent(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Target Nitrate Level (ppm)</label>
                  <input
                    type="number"
                    value={nitrateTarget}
                    onChange={(e) => setNitrateTarget(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                  />
                </div>

                <button
                  onClick={calculateWaterChange}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 hover:opacity-95 btn-glow-cyan cursor-pointer"
                >
                  Calculate Water Change
                </button>
              </div>

              {/* Water Change Results */}
              <div className="p-8 bg-sky-500/5 border border-sky-500/20 rounded-2xl text-center space-y-4">
                <span className="text-[10px] font-extrabold uppercase text-sky-400 tracking-wider">Water Change volume</span>
                <h4 className="text-4xl font-black text-slate-100">{waterChangePercent}%</h4>
                <p className="text-[10px] text-slate-500 leading-normal font-semibold max-w-xs mx-auto">
                  Recommended water replacement volume needed immediately to bring nitrate levels down to targeted thresholds.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* LIGHTING WATTS */}
        {activeTab === 'lighting' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-100">Lighting Power Calculator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-grow space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tank Volume</label>
                    <input
                      type="number"
                      value={lightVol}
                      onChange={(e) => setLightVol(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold"
                    />
                  </div>
                  <div className="w-24 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Unit</label>
                    <select
                      value={lightUnit}
                      onChange={(e) => setLightUnit(e.target.value as any)}
                      className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-2 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
                    >
                      <option value="gallons">Gal</option>
                      <option value="liters">Ltr</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plant Demands</label>
                  <select
                    value={plantType}
                    onChange={(e) => setPlantType(e.target.value as any)}
                    className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 font-semibold text-slate-300"
                  >
                    <option value="low">Low Light (Anubias, Java Fern)</option>
                    <option value="medium">Medium Light (Amazon Sword, Crypts)</option>
                    <option value="high">High Light (Carpets, red stem plants)</option>
                  </select>
                </div>

                <button
                  onClick={calculateLighting}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 hover:opacity-95 btn-glow-cyan cursor-pointer"
                >
                  Calculate Lighting Power
                </button>
              </div>

              {/* Lighting Results */}
              <div className="p-8 bg-sky-500/5 border border-sky-500/20 rounded-2xl text-center space-y-4">
                <span className="text-[10px] font-extrabold uppercase text-sky-400 tracking-wider">Estimated LED Power</span>
                <h4 className="text-4xl font-black text-slate-100">{lightWatts} Watts</h4>
                <p className="text-[10px] text-slate-500 leading-normal font-semibold max-w-xs mx-auto">
                  General rule: low-tech tanks need 1-2W/gal, while high-tech/planted systems need 3-5W/gal LED capacities.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
export default Calculators;
