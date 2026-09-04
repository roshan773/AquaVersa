'use client';

import { useState, useEffect } from 'react';
import { HelpCircle, AlertTriangle, CheckCircle2, Info, RefreshCw, ChevronRight, Stethoscope } from 'lucide-react';
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
    category: 'Gills & Breathing',
    symptoms: [
      { id: 'gasping', label: 'Gasping for air or hovering constantly at the water surface', diseaseMatchKeywords: ['gasping', 'surface', 'breathing'] },
      { id: 'rapid_breathing', label: 'Rapid gill movements or heavy breathing/respiration', diseaseMatchKeywords: ['rapid breathing', 'heavy breathing', 'respiratory'] },
      { id: 'pale_gills', label: 'Gills appearing pale, brown, or discolored', diseaseMatchKeywords: ['pale gills', 'brown gills'] }
    ]
  },
  {
    category: 'Swimming & Behavior',
    symptoms: [
      { id: 'flashing', label: 'Rubbing or scratching body against rocks and decorations', diseaseMatchKeywords: ['scratching', 'rubbing', 'flashing'] },
      { id: 'clamped_fins', label: 'Clamped fins (holding fins tightly pressed against body)', diseaseMatchKeywords: ['clamped fins', 'pressed'] },
      { id: 'loss_appetite', label: 'Lethargy, weakness, or complete loss of appetite', diseaseMatchKeywords: ['lethargy', 'loss of appetite', 'weakness', 'refusing food'] },
      { id: 'buoyancy_loss', label: 'Sinking to bottom or floating uncontrollably at surface', diseaseMatchKeywords: ['sinking to the bottom', 'floating uncontrollably'] },
      { id: 'swim_sideways', label: 'Swimming sideways, upside down, or spiraling', diseaseMatchKeywords: ['sideways', 'upside down', 'spiraling', 'odd angle'] },
      { id: 'struggle_swim', label: 'Struggling to swim downward or reach bottom food', diseaseMatchKeywords: ['struggling to swim', 'swim down'] }
    ]
  }
];

export default function SymptomCheckerPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [step, setStep] = useState<number>(1); // Step 1: Select symptoms, Step 2: Show results

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

  // Diagnostic algorithm matching keywords in selected symptoms against diseases Data
  const getDiagnoses = () => {
    const matchedSymptomsList = symptomGroups.flatMap(g => g.symptoms).filter(s => selectedSymptoms.includes(s.id));
    
    const results = diseasesData.map(disease => {
      let score = 0;
      let matchedNames: string[] = [];

      disease.symptoms.forEach(disSymptom => {
        const text = disSymptom.toLowerCase();
        
        matchedSymptomsList.forEach(userSym => {
          // Check if any match keywords occur in the disease symptom description
          const isMatch = userSym.diseaseMatchKeywords.some(kw => text.includes(kw.toLowerCase()));
          if (isMatch) {
            score += 1;
            matchedNames.push(userSym.label);
          }
        });
      });

      // Deduplicate matched names
      matchedNames = Array.from(new Set(matchedNames));
      
      const totalSymptomCount = disease.symptoms.length;
      // Match percentage relative to the disease symptoms
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
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <Stethoscope className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Fish Symptom Checker</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Identify potential fish health issues using our diagnostic tracker. Check off symptoms to match against known aquatic diseases.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Medical Disclaimer Banner */}
          <div className="mb-8 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-left flex gap-4 items-start max-w-4xl mx-auto">
            <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-700 dark:text-rose-400 leading-relaxed font-sans">
              <strong className="block text-sm mb-1 font-bold text-foreground">Critical Medical Disclaimer</strong>
              This tool provides educational guidance based on general aquarist literature, <strong>not a medical diagnosis.</strong> Aquatic disease symptoms overlap heavily with general stress and bad water parameters. Never dose heavy chemical medications blindly. If fish show progressive distress, consult a qualified aquatic veterinarian.
            </div>
          </div>

          {step === 1 ? (
            /* Step 1: Selection Form */
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-6 md:p-8 shadow-md text-left">
              <h2 className="text-xl font-bold text-foreground mb-6 font-poppins">Select Observed Symptoms</h2>
              
              <div className="space-y-8 font-sans">
                {symptomGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-4">
                    <h3 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider border-b border-border/40 pb-1.5">{group.category}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {group.symptoms.map((symptom) => {
                        const isChecked = selectedSymptoms.includes(symptom.id);
                        return (
                          <div
                            key={symptom.id}
                            onClick={() => handleToggleSymptom(symptom.id)}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none h-full ${
                              isChecked
                                ? 'bg-cyan-500/5 border-cyan-500/40 shadow-sm text-foreground'
                                : 'bg-background border-border hover:border-cyan-500/35'
                            }`}
                          >
                            <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked ? 'bg-cyan-500 border-cyan-500 text-slate-900' : 'border-muted-foreground/30'
                            }`}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />}
                            </div>
                            <span className="text-xs font-semibold leading-snug">{symptom.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action footer */}
              <div className="flex gap-4 border-t border-border mt-8 pt-6 flex-wrap">
                <button
                  onClick={handleAnalyze}
                  disabled={selectedSymptoms.length === 0}
                  className="flex-1 min-w-[200px] py-3.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Analyze Symptoms <ChevronRight className="w-4.5 h-4.5" />
                </button>
                {selectedSymptoms.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="py-3.5 px-6 border border-border text-muted-foreground hover:bg-muted rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" /> Reset
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Step 2: Diagnostic Results */
            <div className="grid lg:grid-cols-12 gap-8 items-start text-left">
              {/* Left Column: Potential Causes */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4 border-b border-border pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground font-poppins">Possible Causes</h2>
                    <p className="text-xs text-muted-foreground">Based on {selectedSymptoms.length} selected symptoms</p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="py-2 px-4 border border-border rounded-xl text-xs font-bold hover:bg-muted transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" /> Start Over
                  </button>
                </div>

                {diagnoses.length === 0 ? (
                  <div className="text-center py-16 border border-border border-dashed rounded-3xl bg-muted/20">
                    <Info className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">No Disease Matches Found</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                      The selected symptoms do not match our database of common diseases. The issue could be related to environmental stress, injury, or parameter spikes.
                    </p>
                    <button 
                      onClick={() => setStep(1)}
                      className="px-6 py-2.5 bg-cyan-500 text-slate-900 font-bold rounded-xl hover:bg-cyan-400 transition-colors cursor-pointer"
                    >
                      Refine Symptoms
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {diagnoses.map(({ disease, confidence, matchedNames }, idx) => (
                      <div key={disease.id} className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
                        <div className="flex justify-between items-start flex-wrap gap-3 border-b border-border/40 pb-4">
                          <div>
                            <span className="text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20 shrink-0">
                              {disease.type} Disease
                            </span>
                            <h3 className="font-bold text-xl text-foreground mt-1.5">{disease.name}</h3>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-xs font-bold text-muted-foreground block mb-0.5">Match Confidence</span>
                            <span className={`text-xl font-poppins font-black ${
                              confidence > 60 ? 'text-rose-500' : confidence > 30 ? 'text-amber-500' : 'text-cyan-500'
                            }`}>
                              {confidence}%
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground space-y-3 leading-relaxed">
                          <p className="font-sans text-sm text-foreground/80">{disease.description}</p>
                          
                          <div>
                            <strong className="text-foreground text-xs block mb-1">Matched Symptoms:</strong>
                            <div className="flex flex-wrap gap-2">
                              {matchedNames.map((name, i) => (
                                <span key={i} className="bg-muted border border-border px-2.5 py-1 rounded text-foreground/70 font-semibold">{name}</span>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-border/40 pt-4">
                            <strong className="text-foreground text-xs block mb-2">Recommended Treatments:</strong>
                            <ul className="space-y-2 list-disc pl-4 text-foreground/80 font-medium">
                              {disease.treatment.map((t, i) => (
                                <li key={i}>{t}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="border-t border-border/40 pt-4">
                            <strong className="text-foreground text-xs block mb-2">Prevention Protocols:</strong>
                            <ul className="space-y-1.5 list-disc pl-4 text-foreground/70">
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

              {/* Right Column: General Care & Checklist */}
              <div className="lg:col-span-5 space-y-6 self-stretch">
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg text-foreground font-poppins border-b border-border/40 pb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-cyan-500" /> Immediate Checklists
                  </h3>
                  
                  <div className="space-y-4 text-xs leading-relaxed font-sans">
                    <div className="space-y-1.5 text-slate-700 dark:text-slate-350">
                      <strong className="text-foreground block text-sm font-semibold mb-1">1. Test Water Quality</strong>
                      <p>Over 80% of fish illnesses are directly caused by stress from poor water quality. Test Ammonia, Nitrite, and Nitrates immediately.</p>
                      <ul className="list-disc pl-4 space-y-1 text-slate-500">
                        <li>Ammonia must be 0 ppm</li>
                        <li>Nitrite must be 0 ppm</li>
                        <li>Nitrate should be &lt; 20 ppm</li>
                      </ul>
                    </div>

                    <div className="space-y-1.5 text-slate-700 dark:text-slate-350 border-t border-border/40 pt-4">
                      <strong className="text-foreground block text-sm font-semibold mb-1">2. Verify Equipment</strong>
                      <p>Check that your heater is operating stable (no temperature shifts) and filter flow is strong. Sudden drops weaken immune systems.</p>
                    </div>

                    <div className="space-y-1.5 text-slate-700 dark:text-slate-350 border-t border-border/40 pt-4">
                      <strong className="text-foreground block text-sm font-semibold mb-1">3. Check Feedings & Bioload</strong>
                      <p>Overfeeding causes chemical spikes. Fast the tank for 24-48 hours if swim bladder bloat or constipation is suspected.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

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
