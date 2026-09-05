'use client';

import { useState } from 'react';
import { Settings, HelpCircle, CheckCircle2, RefreshCw, Layers, Wrench, ShieldAlert, Sparkles, Check } from 'lucide-react';
import GlobalCTA from '@/components/ui/GlobalCTA';

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

  const getRecommendations = () => {
    const recs: { category: string; spec: string; why: string }[] = [];

    // 1. Filter
    let filterSpec = "Hang-On-Back (HOB) Power Filter";
    let filterWhy = "";
    if (inputs.tankSize <= 10) {
      if (inputs.experience === 'beginner' || inputs.fishType === 'nano') {
        filterSpec = "Air-Driven Biological Sponge Filter";
        filterWhy = "For nano tanks (under 10g) with small fish, a sponge filter provides gentle water flow, excellent biological filtration, and cannot suck in small fry or delicate species.";
      } else {
        filterSpec = "Mini HOB Power Filter (50–100 GPH)";
        filterWhy = "A mini Hang-On-Back filter is suitable for small tanks with higher bioloads, saving internal space while providing mechanical and chemical options.";
      }
    } else if (inputs.tankSize > 40) {
      filterSpec = "Pressurized Canister Filter (300–500 GPH)";
      filterWhy = "Large tanks (40g+) require massive media volumes and flow rates to keep parameters stable. Canister filters provide maximum biological and chemical media capacity.";
    } else {
      if (inputs.fishType === 'high-waste') {
        filterSpec = "High-Capacity Canister Filter or Dual HOB Units";
        filterWhy = "High-waste fish (like Goldfish or Cichlids) produce high ammonia loads. Over-filtering with a canister or dual filters is essential to prevent spikes.";
      } else {
        filterSpec = "Hang-On-Back (HOB) Power Filter (150–250 GPH)";
        filterWhy = "The classic choice for medium tanks (10–40g). Reliable, simple to maintain, and provides healthy oxygenation via surface agitation.";
      }
    }
    recs.push({ category: "Filtration & Turnover", spec: filterSpec, why: filterWhy });

    // 2. Heater
    let heaterSpec = "Submersible Electronic Heater";
    let heaterWhy = "";
    if (inputs.tempType === 'coldwater') {
      heaterSpec = "No Heater Required";
      heaterWhy = "You selected a coldwater setup (e.g. Goldfish or temperate hillstream species). These species thrive at standard room temperatures (60–70°F).";
    } else {
      const watts = inputs.tankSize * 4;
      let roundedWatts = 50;
      if (watts > 250) roundedWatts = 300;
      else if (watts > 175) roundedWatts = 200;
      else if (watts > 125) roundedWatts = 150;
      else if (watts > 75) roundedWatts = 100;

      heaterSpec = `Submersible ${roundedWatts}W Adjustable Glass/Titanium Heater`;
      heaterWhy = `Tropical fish require warm, stable water. At a standard 4 watts per gallon, a ${roundedWatts}W adjustable heater will comfortably maintain 75–80°F.`;
    }
    recs.push({ category: "Thermal Regulation", spec: heaterSpec, why: heaterWhy });

    // 3. Lighting
    let lightSpec = "Full-Spectrum LED Fixture";
    let lightWhy = "";
    if (inputs.waterType === 'saltwater') {
      lightSpec = "Reef-Spectrum High-PAR Actinic LED (450–470nm)";
      lightWhy = "Marine aquariums and corals require high-intensity light in the actinic blue spectrum to support coral zooxanthellae photosynthesis.";
    } else if (inputs.planted === 'planted') {
      lightSpec = "Plant-Growth Full-Spectrum LED (6500K with red/blue diodes)";
      lightWhy = "Live aquatic plants require balanced PAR output with peaks in red (660nm) and blue (450nm) wavelengths for robust stem and root growth.";
    } else {
      lightSpec = "Low-Output Viewing LED Strip";
      lightWhy = "For fish-only setups, high-intensity lighting only fuels nuisance green hair algae. A basic LED strip provides vibrant viewing without algae issues.";
    }
    recs.push({ category: "Photoperiod & Lighting", spec: lightSpec, why: lightWhy });

    // 4. Substrate
    let substrateSpec = "Inert Aquarium Sand or Rounded Gravel";
    let substrateWhy = "";
    if (inputs.waterType === 'saltwater') {
      substrateSpec = "Aragonite / Oolitic Reef Sand (1.5–2 inches)";
      substrateWhy = "Aragonite sand acts as a natural marine buffer, slowly releasing calcium and carbonate ions to maintain high pH (~8.2) and alkalinity.";
    } else if (inputs.planted === 'planted') {
      substrateSpec = "Active Aqua Soil (or root tabs under inert gravel)";
      substrateWhy = "Active clay-based aqua soils store macro and micronutrients for root-feeding plants (like Amazon Swords and Cryptocorynes) while slightly buffering pH.";
    } else {
      substrateSpec = "Inert Natural Quartz Gravel or Soft Sand";
      substrateWhy = "Inert substrate does not alter water chemistry and is easy to vacuum with a standard gravel siphon during weekly water changes.";
    }
    recs.push({ category: "Substrate Layer", spec: substrateSpec, why: substrateWhy });

    return recs;
  };

  const recommendations = getRecommendations();

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Wrench className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Hardware Sizing &amp; Selection Wizard</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            EQUIPMENT SELECTION WIZARD
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl leading-relaxed">
            Answer a few quick specifications about your target aquarium setup to generate an engineered hardware ledger tailored to your volume.
          </p>
        </div>

        {/* Wizard Form & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 font-readable">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-[#edeafc] pb-4">
              <h2 className="font-display text-2xl sm:text-3xl text-[#27187e]">
                Setup Specifications
              </h2>
              <button
                onClick={handleReset}
                className="text-xs sm:text-sm font-semibold text-[#27187e]/70 hover:text-[#27187e] flex items-center gap-1 cursor-pointer underline"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {/* Tank Size Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase font-semibold text-[#27187e]/80 tracking-wider">
                  Target Tank Volume
                </label>
                <span className="font-bold text-base text-[#27187e]">{inputs.tankSize} Gallons</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={inputs.tankSize}
                onChange={(e) => handleInputChange('tankSize', Number(e.target.value))}
                className="w-full h-2 bg-[#edeafc] rounded-lg appearance-none cursor-pointer accent-[#27187e]"
              />
            </div>

            {/* Water Type */}
            <div>
              <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                Water Environment
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'freshwater', label: 'Freshwater' },
                  { id: 'saltwater', label: 'Marine / Saltwater' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleInputChange('waterType', item.id as any)}
                    className={`p-3 rounded-2xl border-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      inputs.waterType === item.id
                        ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]'
                        : 'bg-[#f7f7ff] text-[#27187e] border-[#cfcaf5] hover:border-[#27187e]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Planted vs Fish Only */}
            <div>
              <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                Aquarium Flora
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'planted', label: 'Live Planted' },
                  { id: 'fish-only', label: 'Fish Only / Hardscape' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleInputChange('planted', item.id as any)}
                    className={`p-3 rounded-2xl border-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      inputs.planted === item.id
                        ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]'
                        : 'bg-[#f7f7ff] text-[#27187e] border-[#cfcaf5] hover:border-[#27187e]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Thermal Profile */}
            <div>
              <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                Thermal Regime
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'tropical', label: 'Tropical (75–80°F)' },
                  { id: 'coldwater', label: 'Coldwater (60–70°F)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleInputChange('tempType', item.id as any)}
                    className={`p-3 rounded-2xl border-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      inputs.tempType === item.id
                        ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]'
                        : 'bg-[#f7f7ff] text-[#27187e] border-[#cfcaf5] hover:border-[#27187e]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fish Bioload Profile */}
            <div>
              <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                Stocking Biomass Profile
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'nano', label: 'Nano School' },
                  { id: 'high-waste', label: 'High Waste' },
                  { id: 'discus-delicate', label: 'Delicate' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleInputChange('fishType', item.id as any)}
                    className={`p-2.5 rounded-xl border-2 text-xs font-semibold transition-all cursor-pointer truncate ${
                      inputs.fishType === item.id
                        ? 'bg-[#27187e] text-[#f7f7ff] border-[#27187e]'
                        : 'bg-[#f7f7ff] text-[#27187e] border-[#cfcaf5] hover:border-[#27187e]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations Output */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-2xl sm:text-3xl text-[#27187e] mb-2">
                Engineered Hardware Recommendations
              </h3>
              <p className="text-sm text-[#27187e]/75 mb-6 font-medium">
                Tailored for a {inputs.tankSize} Gallon {inputs.tempType} {inputs.waterType} setup ({inputs.planted}).
              </p>

              <div className="space-y-4">
                {recommendations.map((rec, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-[#f7f7ff] border-2 border-[#cfcaf5] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-[#27187e] px-2.5 py-0.5 rounded-md bg-[#edeafc] border border-[#cfcaf5] tracking-wider">
                        {rec.category}
                      </span>
                    </div>
                    <h4 className="font-display text-xl sm:text-2xl text-[#27187e] pt-1">
                      {rec.spec}
                    </h4>
                    <p className="text-sm sm:text-base text-[#27187e]/85 leading-relaxed font-medium">
                      {rec.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      <GlobalCTA
        badge="HARDWARE CATALOG & REVIEWS"
        title={
          <>
            Read full engineering guides <br className="hidden sm:inline" />
            for filtration &amp; life support.
          </>
        }
        description="Learn how canister filters, protein skimmers, and titanium heaters operate with detailed maintenance protocols."
        primaryAction={{
          label: 'Browse Equipment Archive',
          href: '/equipment',
        }}
        secondaryAction={{
          label: 'Calculate Tank Volume',
          href: '/tank-size',
        }}
      />
    </div>
  );
}
