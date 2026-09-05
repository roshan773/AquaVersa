'use client';

import { useState } from 'react';
import { HelpCircle, AlertTriangle, CheckCircle2, Info, RefreshCw, ChevronRight, Stethoscope, Activity, ShieldAlert, Check } from 'lucide-react';
import { diseasesData } from '@/data/diseases';
import { unlockAchievement } from '@/lib/storage';
import GlobalCTA from '@/components/ui/GlobalCTA';

interface SymptomGroup {
  category: string;
  symptoms: { id: string; label: string; diseaseMatchKeywords: string[] }[];
}

const symptomGroups: SymptomGroup[] = [
  {
    category: 'Skin, Scales & Fins',
    symptoms: [
      { id: 'white_spots', label: 'Small white spots resembling salt grains on skin, fins, or eyes', diseaseMatchKeywords: ['white spot', 'salt grain'] },
      { id: 'golden_velvet', label: 'Fine dusty golden, yellow, or rust-colored film on body', diseaseMatchKeywords: ['golden', 'rust-colored', 'velvet'] },
      { id: 'frayed_fins', label: 'Fins appearing ragged, frayed, split, or rotting', diseaseMatchKeywords: ['ragged', 'frayed', 'split', 'fin rot'] },
      { id: 'inflamed_fin_base', label: 'Base of fins showing red inflammation or blood streaks', diseaseMatchKeywords: ['inflammation', 'blood streaks', 'red inflammation'] },
      { id: 'cotton_growths', label: 'Fungal cotton-like or fuzzy white growths on skin/fins', diseaseMatchKeywords: ['cotton-like', 'fuzzy', 'fungal'] },
      { id: 'bloated_body', label: 'Severely bloated, swollen, or distended abdomen', diseaseMatchKeywords: ['bloated', 'swollen abdomen', 'distended'] },
      { id: 'pineconing', label: 'Scales sticking straight outward (resembling a pinecone)', diseaseMatchKeywords: ['pinecone', 'sticking out'] },
      { id: 'pop_eye', label: 'Eyes bulging or protruding abnormally outward', diseaseMatchKeywords: ['pop-eye', 'protruding', 'bulging'] }
    ]
  },
  {
    category: 'Gills & Respiration',
    symptoms: [
      { id: 'gasping', label: 'Gasping for air or hovering constantly at the water surface', diseaseMatchKeywords: ['gasping', 'surface', 'breathing'] },
      { id: 'rapid_breathing', label: 'Rapid gill movements or heavy respiration rates', diseaseMatchKeywords: ['rapid breathing', 'heavy breathing', 'respiratory'] },
      { id: 'pale_gills', label: 'Gills appearing pale, brown, or discolored', diseaseMatchKeywords: ['pale gills', 'brown gills'] }
    ]
  },
  {
    category: 'Swimming & Behavioral Indicators',
    symptoms: [
      { id: 'flashing', label: 'Rubbing or scratching body against rocks and decorations', diseaseMatchKeywords: ['scratching', 'rubbing', 'flashing'] },
      { id: 'clamped_fins', label: 'Clamped fins (holding fins tightly pressed against body)', diseaseMatchKeywords: ['clamped fins', 'pressed'] },
      { id: 'loss_appetite', label: 'Lethargy, weakness, or complete refusal of food', diseaseMatchKeywords: ['lethargy', 'loss of appetite', 'weakness', 'refusing food'] },
      { id: 'buoyancy_loss', label: 'Sinking to bottom or floating uncontrollably at surface', diseaseMatchKeywords: ['sinking to the bottom', 'floating uncontrollably'] },
      { id: 'swim_sideways', label: 'Swimming sideways, upside down, or spiraling in water', diseaseMatchKeywords: ['sideways', 'upside down', 'spiraling', 'odd angle'] },
      { id: 'struggle_swim', label: 'Struggling to swim downward or reach bottom food', diseaseMatchKeywords: ['struggling to swim', 'swim down'] }
    ]
  }
];

export default function SymptomCheckerPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [step, setStep] = useState<number>(1);

  const handleToggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setStep(1);
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length > 0) {
      setStep(2);
      unlockAchievement('symptom-check');
    }
  };

  const getDiagnoses = () => {
    const matchedSymptomsList = symptomGroups.flatMap(g => g.symptoms).filter(s => selectedSymptoms.includes(s.id));
    
    const results = diseasesData.map(disease => {
      let score = 0;
      let matchedNames: string[] = [];

      disease.symptoms.forEach(disSymptom => {
        const text = disSymptom.toLowerCase();
        
        matchedSymptomsList.forEach(userSym => {
          const isMatch = userSym.diseaseMatchKeywords.some(kw => text.includes(kw.toLowerCase()));
          if (isMatch) {
            score += 1;
            matchedNames.push(userSym.label);
          }
        });
      });

      matchedNames = Array.from(new Set(matchedNames));
      
      const totalSymptomCount = disease.symptoms.length;
      const confidence = totalSymptomCount > 0 ? Math.min(Math.round((score / totalSymptomCount) * 100), 100) : 0;

      return {
        disease,
        confidence,
        matchedNames
      };
    }).filter(r => r.confidence > 0).sort((a, b) => b.confidence - a.confidence);

    return results;
  };

  const diagnoses = getDiagnoses();

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Stethoscope className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Aquatic Pathology &amp; Diagnostics</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            FISH SYMPTOM CHECKER
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl leading-relaxed">
            Identify potential fish health issues by matching observed physical and behavioral signs with educational disease profiles.
          </p>
        </div>

        {/* Medical Notice */}
        <div className="mb-10 p-6 rounded-3xl bg-[#ffffff] border-2 border-[#cfcaf5] flex items-start gap-4 shadow-sm font-readable">
          <ShieldAlert className="w-6 h-6 text-[#27187e] shrink-0 mt-0.5" />
          <div className="text-sm sm:text-base leading-relaxed text-[#27187e]/90">
            <strong className="font-bold text-[#27187e] block mb-1 text-base uppercase tracking-wider">Educational Diagnostic Guidance</strong>
            This tool provides educational reference based on aquatic veterinary literature, <strong>not a replacement for professional diagnosis.</strong> Aquatic disease symptoms overlap heavily with ammonia/nitrite stress. Always verify water chemistry with liquid test kits before dosing medications.
          </div>
        </div>

        {step === 1 ? (
          /* Step 1: Checkbox Selection */
          <div className="max-w-4xl mx-auto bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-10 shadow-sm text-left font-readable">
            <h2 className="text-2xl sm:text-3xl font-display text-[#27187e] mb-6">
              Select Observed Symptoms ({selectedSymptoms.length} Selected)
            </h2>
            
            <div className="space-y-8">
              {symptomGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-4">
                  <h3 className="text-sm uppercase font-bold text-[#27187e] tracking-wider border-b border-[#edeafc] pb-2">
                    {group.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {group.symptoms.map((symptom) => {
                      const isChecked = selectedSymptoms.includes(symptom.id);
                      return (
                        <div
                          key={symptom.id}
                          onClick={() => handleToggleSymptom(symptom.id)}
                          className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none h-full shadow-sm ${
                            isChecked
                              ? 'bg-[#edeafc] border-[#27187e] text-[#27187e]'
                              : 'bg-[#f7f7ff] border-[#cfcaf5] hover:border-[#27187e] text-[#27187e]'
                          }`}
                        >
                          <div className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? 'bg-[#27187e] border-[#27187e] text-[#f7f7ff]' : 'border-[#cfcaf5] bg-[#ffffff]'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                          </div>
                          <span className="text-sm sm:text-base font-semibold leading-snug">
                            {symptom.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex gap-4 border-t border-[#edeafc] mt-10 pt-6 flex-wrap">
              <button
                onClick={handleAnalyze}
                disabled={selectedSymptoms.length === 0}
                className="flex-1 min-w-[220px] py-4 bg-[#27187e] hover:bg-[#1b1059] disabled:opacity-40 text-[#f7f7ff] font-bold text-sm sm:text-base uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Analyze Observed Symptoms</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              {selectedSymptoms.length > 0 && (
                <button
                  onClick={handleReset}
                  className="py-4 px-7 border-2 border-[#cfcaf5] text-[#27187e] hover:bg-[#edeafc] font-semibold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Step 2: Diagnostic Results */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left font-readable">
            {/* Left: Matched Diseases */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#cfcaf5] pb-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-display text-[#27187e]">
                    Potential Pathological Matches
                  </h2>
                  <p className="text-sm text-[#27187e]/70 font-semibold">
                    Calculated from {selectedSymptoms.length} user-selected symptoms
                  </p>
                </div>
                <button 
                  onClick={handleReset}
                  className="py-2.5 px-5 border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#27187e] transition-all flex items-center gap-1.5 cursor-pointer bg-[#ffffff]"
                >
                  <RefreshCw className="w-4 h-4" /> Start Over
                </button>
              </div>

              {diagnoses.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-[#cfcaf5] rounded-3xl bg-[#ffffff] p-8">
                  <Info className="w-12 h-12 text-[#27187e]/40 mx-auto mb-4" />
                  <h3 className="font-display text-3xl text-[#27187e] mb-2">No Clear Disease Match</h3>
                  <p className="text-base text-[#27187e]/80 max-w-md mx-auto mb-6">
                    The selected symptoms do not directly match standard bacterial/parasitic diseases. The issue is likely caused by an acute water parameter spike or territorial bullying.
                  </p>
                  <button 
                    onClick={() => setStep(1)}
                    className="px-7 py-3.5 bg-[#27187e] text-[#f7f7ff] font-bold text-sm uppercase tracking-wider rounded-2xl hover:bg-[#1b1059] transition-all cursor-pointer"
                  >
                    Refine Symptoms
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {diagnoses.map(({ disease, confidence, matchedNames }) => (
                    <div key={disease.id} className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
                      <div className="flex justify-between items-start flex-wrap gap-3 border-b border-[#edeafc] pb-4">
                        <div>
                          <span className="text-xs font-bold uppercase bg-[#edeafc] text-[#27187e] px-3 py-1 rounded-md border border-[#cfcaf5] tracking-wider">
                            {disease.type} Pathogen
                          </span>
                          <h3 className="font-display text-2xl sm:text-3xl text-[#27187e] mt-2">
                            {disease.name}
                          </h3>
                        </div>
                        
                        <div className="text-right">
                          <span className="text-xs uppercase font-semibold text-[#27187e]/70 block mb-0.5 tracking-wider">
                            Match Confidence
                          </span>
                          <span className="text-2xl sm:text-3xl font-display font-normal text-[#27187e]">
                            {confidence}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                        <p className="text-[#27187e]/85 font-medium">
                          {disease.description}
                        </p>
                        
                        <div>
                          <strong className="text-xs uppercase tracking-wider font-bold text-[#27187e] block mb-2">
                            Matched Symptoms:
                          </strong>
                          <div className="flex flex-wrap gap-2">
                            {matchedNames.map((name, i) => (
                              <span key={i} className="bg-[#f7f7ff] border border-[#cfcaf5] px-3 py-1 rounded-lg text-xs font-semibold text-[#27187e]">
                                {name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-[#edeafc] pt-4">
                          <strong className="text-xs uppercase tracking-wider font-bold text-[#27187e] block mb-2">
                            Recommended Treatment Protocol:
                          </strong>
                          <ul className="space-y-2 list-disc pl-5 text-[#27187e]/90 font-medium">
                            {disease.treatment.map((t, i) => (
                              <li key={i}>{t}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-t border-[#edeafc] pt-4">
                          <strong className="text-xs uppercase tracking-wider font-bold text-[#27187e] block mb-2">
                            Long-Term Prevention:
                          </strong>
                          <ul className="space-y-1.5 list-disc pl-5 text-[#27187e]/80">
                            {disease.prevention.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Hospital Tank & Checklist */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
                <h3 className="font-display text-2xl text-[#27187e] border-b border-[#edeafc] pb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#27187e]" />
                  <span>Immediate First-Aid Protocols</span>
                </h3>
                
                <div className="space-y-4 text-sm leading-relaxed">
                  <div className="space-y-1.5">
                    <strong className="text-[#27187e] block font-bold uppercase text-xs tracking-wider">
                      1. Test Water Chemistry Immediately
                    </strong>
                    <p className="text-[#27187e]/85 font-medium">
                      Over 80% of fish diseases are secondary infections triggered by toxic ammonia, nitrite, or pH swings. Test with liquid reagents immediately.
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-[#edeafc] pt-4">
                    <strong className="text-[#27187e] block font-bold uppercase text-xs tracking-wider">
                      2. Isolate in Quarantine / Hospital Tank
                    </strong>
                    <p className="text-[#27187e]/85 font-medium">
                      Treating in a bare-bottom 5–10 gallon hospital tank prevents medication from crashing beneficial bacteria in your main aquarium.
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-[#edeafc] pt-4">
                    <strong className="text-[#27187e] block font-bold uppercase text-xs tracking-wider">
                      3. Fast Tank for 24-48 Hours
                    </strong>
                    <p className="text-[#27187e]/85 font-medium">
                      Cease all feeding for 1–2 days to minimize ammonia excretion and allow digestive tract clearance if bloating is present.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <GlobalCTA
        badge="DIAGNOSTIC PATHOLOGY & MEDICATIONS"
        title={
          <>
            Explore full disease profiles <br className="hidden sm:inline" />
            and safe hospital tank protocols.
          </>
        }
        description="Learn proper medication dosing, temperature adjustment guidelines, and quarantine tank establishment procedures."
        primaryAction={{
          label: 'View Disease Archive',
          href: '/diseases',
        }}
        secondaryAction={{
          label: 'Test Water Chemistry',
          href: '/water-analyzer',
        }}
      />
    </div>
  );
}
