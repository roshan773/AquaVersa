'use client';

import { useState } from 'react';
import { Settings, HelpCircle, CheckCircle2, RefreshCw, Layers, Wrench, ShieldAlert } from 'lucide-react';

interface WizardInputs {
  tankSize: number;
  tankType: 'rimmed' | 'rimless' | 'acrylic';
  waterType: 'freshwater' | 'saltwater';
  planted: 'planted' | 'fish-only';
  tempType: 'tropical' | 'coldwater';
  fishType: 'nano' | 'high-waste' | 'discus-delicate';
  experience: 'beginner' | 'experienced';
}

const initialInputs: WizardInputs = {
  tankSize: 20,
  tankType: 'rimmed',
  waterType: 'freshwater',
  planted: 'planted',
  tempType: 'tropical',
  fishType: 'nano',
  experience: 'beginner'
};

export default function EquipmentWizardPage() {
  const [inputs, setInputs] = useState<WizardInputs>(initialInputs);

  const handleInputChange = <K extends keyof WizardInputs>(key: K, val: WizardInputs[K]) => {
    setInputs(prev => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setInputs(initialInputs);
  };

  // Recommender logic
  const getRecommendations = () => {
    const recs: { category: string; spec: string; why: string }[] = [];

    // 1. Filter
    let filterSpec = "Hang-On-Back (HOB) Power Filter";
    let filterWhy = "";
    if (inputs.tankSize <= 10) {
      if (inputs.experience === 'beginner' || inputs.fishType === 'nano') {
        filterSpec = "Air-Driven Sponge Filter (with air pump)";
        filterWhy = "For nano tanks (under 10g) with small fish, a sponge filter provides gentle water flow, excellent biological filtration, and cannot suck in small fry or delicate species.";
      } else {
        filterSpec = "Mini HOB Power Filter (50-100 GPH)";
        filterWhy = "A mini Hang-On-Back filter is suitable for small tanks with higher bioloads, saving internal space while providing mechanical and chemical options.";
      }
    } else if (inputs.tankSize > 40) {
      filterSpec = "Canister Filter (300-500 GPH)";
      filterWhy = "Large tanks (40g+) require massive media volumes and flow rates to keep parameters stable. Canister filters sit hidden underneath the stand and provide maximum mechanical, chemical, and biological media capacity.";
    } else {
      // 10-40 gallons
      if (inputs.fishType === 'high-waste') {
        filterSpec = "Large Canister Filter or Dual HOB Filters";
        filterWhy = "High-waste fish (like Goldfish or Cichlids) produce high ammonia loads. Over-filtering with a canister or dual filters is highly recommended to keep parameters at safe levels.";
      } else {
        filterSpec = "Hang-On-Back (HOB) Power Filter (150-250 GPH)";
        filterWhy = "The classic choice for medium tanks (10-40g). Easy to maintain, reliable, and provides oxygenation via surface agitation.";
      }
    }
    recs.push({ category: "Filter & Media", spec: filterSpec, why: filterWhy });

    // 2. Heater
    let heaterSpec = "Submersible Heater";
    let heaterWhy = "";
    if (inputs.tempType === 'coldwater') {
      heaterSpec = "No Heater Required";
      heaterWhy = "You selected a coldwater setup (e.g. Goldfish or temperate fish). These species are comfortable at standard room temperatures (60-70°F) and a heater is unnecessary.";
    } else {
      const watts = inputs.tankSize * 4; // approx 4W per gallon
      let roundedWatts = 50;
      if (watts > 250) roundedWatts = 300;
      else if (watts > 175) roundedWatts = 200;
      else if (watts > 125) roundedWatts = 150;
      else if (watts > 75) roundedWatts = 100;

      heaterSpec = `Submersible ${roundedWatts}W Glass/Titanium Heater (Adjustable)`;
      heaterWhy = `Tropical fish require warm, stable water. At a standard 4 watts per gallon, a ${roundedWatts}W adjustable heater will comfortably maintain 75-80°F. For rimless tanks, consider a sleek titanium model.`;
    }
    recs.push({ category: "Heater", spec: heaterSpec, why: heaterWhy });

    // 3. Lighting
    let lightSpec = "Standard Full-Spectrum LED Light";
    let lightWhy = "";
    if (inputs.waterType === 'saltwater') {
      lightSpec = "Reef-Spectrum High-PAR LED Light (with blue control)";
      lightWhy = "Marine aquariums and corals require high-intensity light in the actinic blue spectrum (450-470nm) to support photosynthesis and bring out coral fluorescence.";
    } else if (inputs.planted === 'planted') {
      lightSpec = "Planted LED Fixture (6500K color temp, dimmable)";
      lightWhy = "Live aquarium plants require full spectrum light with peaks in red and blue wavelengths, and a color temperature of approx 6500K (simulating natural sunlight).";
    } else {
      lightSpec = "Low-Output Basic Aquarium LED Strip";
      lightWhy = "For fish-only setups, high-intensity lighting will only fuel nuisance green algae. A low-output LED is perfect for viewing fish without promoting algae.";
    }
    recs.push({ category: "Lighting", spec: lightSpec, why: lightWhy });

    // 4. Substrate
    let subSpec = "Natural Gravel or Inert Sand";
    let subWhy = "";
    if (inputs.waterType === 'saltwater') {
      subSpec = "Aragonite Reef Sand (1.0 - 2.0 mm grain size)";
      subWhy = "Marine systems rely on calcium carbonate aragonite sand to naturally buffer pH levels to the 8.1-8.4 range and support saltwater mineral demands.";
    } else if (inputs.planted === 'planted') {
      subSpec = "Active Clay Aquasoap or Nutrient-Rich Active Soil";
      subWhy = "Live plants require nutrients at their roots. Active soil has a high Cation Exchange Capacity (CEC), storing and transferring nutrients to plant roots over time.";
    } else if (inputs.fishType === 'nano') {
      subSpec = "Fine Silica Sand (Inert)";
      subWhy = "Small nano bottom dwellers (like Corydoras or Pygmy Catfish) have delicate whiskers (barbels). Smooth fine sand prevents scratches and barbel infections.";
    } else {
      subSpec = "Natural Inert River Gravel (3-5 mm size)";
      subWhy = "Standard gravel is inert (does not change pH), easy to clean using a vacuum siphon, and suitable for general freshwater setups.";
    }
    recs.push({ category: "Substrate", spec: subSpec, why: subWhy });

    // 5. Air Pump
    let airSpec = "Not strictly necessary";
    let airWhy = "HOB filters and canister outlets provide sufficient oxygen through surface ripple.";
    if (inputs.tankSize <= 10 && (inputs.experience === 'beginner' || inputs.fishType === 'nano')) {
      airSpec = "Whisper-Quiet Mini Air Pump (with check valve)";
      airWhy = "Required to drive the sponge filter. It pumps air through airline tubing into the sponge, drawing water with it to filter biologically.";
    } else if (inputs.fishType === 'high-waste' || inputs.tempType === 'tropical') {
      airSpec = "Medium Air Pump with Air Stone or Bubbler";
      airWhy = "High-waste species consume more oxygen, and warm water holds less gas. Added aeration via an air stone keeps dissolved oxygen high.";
    }
    recs.push({ category: "Air Pump & Aeration", spec: airSpec, why: airWhy });

    // 6. Test Kit
    let testSpec = "API Freshwater Master Test Kit (Liquid)";
    let testWhy = "Liquid tests are far more accurate than paper test strips. Crucial for monitoring Ammonia, Nitrite, Nitrate, and pH during cycling.";
    if (inputs.waterType === 'saltwater') {
      testSpec = "API Marine Master Test Kit + Salinity Refractometer";
      testWhy = "Saltwater requires measuring high-range pH and marine salinity. An optical refractometer is highly accurate compared to cheap plastic hydrometers.";
    }
    recs.push({ category: "Water Test Kit", spec: testSpec, why: testWhy });

    // 7. Water Conditioner
    let condSpec = "Seachem Prime Dechlorinator & Tap Water Conditioner";
    let condWhy = "Instantly detoxifies chlorine, chloramine, heavy metals, and temporarily binds toxic ammonia and nitrite for 24-48 hours during spikes.";
    if (inputs.waterType === 'saltwater') {
      condSpec = "Marine Synthetic Salt Mix (e.g. Instant Ocean) + Dechlorinator";
      condWhy = "Marine tanks require pure water conditioned and mixed with synthetic ocean salt to reach correct specific gravity (1.023-1.025).";
    }
    recs.push({ category: "Water Conditioner", spec: condSpec, why: condWhy });

    return recs;
  };

  const recommendations = getRecommendations();

  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <Wrench className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Equipment Recommendation Wizard</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Answer questions about your aquarium configuration, and our calculator will recommend filters, heaters, substrate, and test kits tailored to your parameters.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background font-sans">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form Column */}
            <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-lg space-y-5 text-left">
              <h2 className="font-bold text-xl text-foreground border-b border-border pb-3 font-poppins">Wizard Settings</h2>
              
              <div className="space-y-4 text-xs font-semibold text-muted-foreground">
                
                {/* Tank Size */}
                <div>
                  <label className="block uppercase tracking-wider mb-2">Tank Size (Gallons)</label>
                  <select 
                    value={inputs.tankSize} 
                    onChange={e => handleInputChange('tankSize', Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm font-medium"
                  >
                    <option value="5">5 Gallons Nano</option>
                    <option value="10">10 Gallons</option>
                    <option value="20">20 Gallons (Standard/Long)</option>
                    <option value="29">29 Gallons</option>
                    <option value="40">40 Gallons Breeder</option>
                    <option value="55">55 Gallons Showcase</option>
                    <option value="75">75+ Gallons Large</option>
                  </select>
                </div>

                {/* Tank Type */}
                <div>
                  <label className="block uppercase tracking-wider mb-2">Tank Material / Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['rimmed', 'rimless', 'acrylic'].map((t) => (
                      <button
                        key={t}
                        onClick={() => handleInputChange('tankType', t as any)}
                        className={`py-2 px-1 text-xs font-bold rounded-lg border capitalize transition-all cursor-pointer truncate ${
                          inputs.tankType === t ? 'bg-amber-500/10 text-amber-500 border-amber-550' : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Water Type */}
                <div>
                  <label className="block uppercase tracking-wider mb-2">Water Environment</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'freshwater', label: 'Freshwater' },
                      { key: 'saltwater', label: 'Saltwater' }
                    ].map((w) => (
                      <button
                        key={w.key}
                        onClick={() => handleInputChange('waterType', w.key as any)}
                        className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          inputs.waterType === w.key ? 'bg-amber-500/10 text-amber-500 border-amber-550' : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Planted Status */}
                <div>
                  <label className="block uppercase tracking-wider mb-2">Aquatic Plants / Reef Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'planted', label: 'Planted / Coral Reef' },
                      { key: 'fish-only', label: 'Fish-Only / Hardscape' }
                    ].map((p) => (
                      <button
                        key={p.key}
                        onClick={() => handleInputChange('planted', p.key as any)}
                        className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          inputs.planted === p.key ? 'bg-amber-500/10 text-amber-500 border-amber-550' : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Temp Type */}
                <div>
                  <label className="block uppercase tracking-wider mb-2">Water Temperature Class</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'tropical', label: 'Tropical (Warm)' },
                      { key: 'coldwater', label: 'Coldwater (Room temp)' }
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => handleInputChange('tempType', t.key as any)}
                        className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          inputs.tempType === t.key ? 'bg-amber-500/10 text-amber-500 border-amber-550' : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fish Type */}
                <div>
                  <label className="block uppercase tracking-wider mb-2">Stocking Bioload Target</label>
                  <select 
                    value={inputs.fishType} 
                    onChange={e => handleInputChange('fishType', e.target.value as any)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm font-medium"
                  >
                    <option value="nano">Small Slender Fish / Shrimp (Light Bioload)</option>
                    <option value="high-waste">High Waste Fish / Cichlids / Goldfish</option>
                    <option value="discus-delicate">Sensitive Species / Discus / Reef Reef</option>
                  </select>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block uppercase tracking-wider mb-2">User Experience Level</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'beginner', label: 'Beginner' },
                      { key: 'experienced', label: 'Experienced' }
                    ].map((ex) => (
                      <button
                        key={ex.key}
                        onClick={() => handleInputChange('experience', ex.key as any)}
                        className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          inputs.experience === ex.key ? 'bg-amber-500/10 text-amber-500 border-amber-550' : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 bg-slate-850 hover:bg-slate-800 border border-border text-foreground font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mt-6 text-sm"
              >
                <RefreshCw className="w-4 h-4" /> Reset Wizard Settings
              </button>
            </div>

            {/* Recommendations Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="bg-card border border-border rounded-3xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-foreground border-b border-border/40 pb-3 font-poppins mb-6">Recommended Gear List</h3>
                
                <div className="space-y-6">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="flex gap-4 items-start font-sans">
                      <div className="p-2.5 bg-amber-500/10 text-amber-555 rounded-xl border border-amber-500/20 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{rec.category}</span>
                        <h4 className="font-bold text-base text-foreground">{rec.spec}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">{rec.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
