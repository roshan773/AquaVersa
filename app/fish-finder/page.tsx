'use client';

import { useState } from 'react';
import { HelpCircle, Check, Sparkles, ArrowRight, ArrowLeft, RefreshCw, Layers, ShieldCheck, Eye } from 'lucide-react';
import { fishData } from '@/data/fish';
import Image from 'next/image';
import Link from 'next/link';
import GlobalCTA from '@/components/ui/GlobalCTA';

interface WizardAnswers {
  tankSize: number;
  waterType: 'freshwater' | 'saltwater';
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  temperament: 'Peaceful' | 'Semi-Aggressive' | 'Aggressive';
  planted: 'yes' | 'no';
  fishSize: 'small' | 'medium' | 'large';
}

const initialAnswers: WizardAnswers = {
  tankSize: 20,
  waterType: 'freshwater',
  experience: 'Beginner',
  temperament: 'Peaceful',
  planted: 'yes',
  fishSize: 'small'
};

export default function FishFinderPage() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<WizardAnswers>(initialAnswers);

  const handleSelectOption = <K extends keyof WizardAnswers>(key: K, value: WizardAnswers[K]) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 7));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
  const handleReset = () => {
    setAnswers(initialAnswers);
    setStep(1);
  };

  // Filter logic
  const getRecommendations = () => {
    return fishData.filter(fish => {
      // 1. Water type
      if (fish.category?.toLowerCase() !== answers.waterType) return false;
      
      // 2. Tank size
      if (fish.minTankSize && fish.minTankSize > answers.tankSize) return false;

      // 3. Experience level filtering
      if (answers.experience === 'Beginner' && fish.difficulty === 'Advanced') return false;
      if (answers.experience === 'Beginner' && fish.difficulty === 'Advanced Beginner' && fish.difficultyScore && fish.difficultyScore > 2) return false;
      if (answers.experience === 'Intermediate' && fish.difficulty === 'Advanced') return false;

      // 4. Temperament
      const temp = fish.temperament?.toLowerCase();
      if (answers.temperament === 'Peaceful' && temp && (temp.includes('aggressive') || temp.includes('semi-aggressive'))) return false;
      if (answers.temperament === 'Semi-Aggressive' && temp && temp.includes('aggressive') && !temp.includes('semi')) return false;

      // 5. Fish Size
      const size = fish.maxSize || 2.0;
      if (answers.fishSize === 'small' && size > 2.5) return false;
      if (answers.fishSize === 'medium' && (size <= 2.5 || size > 6)) return false;
      if (answers.fishSize === 'large' && size <= 6) return false;

      // 6. Planted: oscars and large cichlids destroy plants
      if (answers.planted === 'yes' && ['oscar', 'arowana'].includes(fish.slug || '')) return false;

      return true;
    });
  };

  const recommendations = getRecommendations();

  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Fish Recommendation Wizard</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Find the perfect match for your aquarium. Answer 6 short questions about your setup and experience, and we will filter our library.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background font-sans">
        <div className="container mx-auto px-4 max-w-3xl">
          {step < 7 ? (
            /* Wizard Steps */
            <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-xl text-left space-y-8">
              
              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Question {step} of 6</span>
                  <span className="text-xs font-bold text-cyan-500">{Math.round(((step - 1) / 6) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="bg-cyan-500 h-full transition-all duration-300"
                    style={{ width: `${((step - 1) / 6) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step Renderings */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground font-poppins">What is your aquarium tank size?</h3>
                  <p className="text-xs text-muted-foreground">Volume in US Gallons determines the bioload limits and swimming room available.</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[5, 10, 20, 30, 55, 75].map(size => (
                      <button
                        key={size}
                        onClick={() => handleSelectOption('tankSize', size)}
                        className={`p-4 rounded-2xl border text-left transition-all font-bold font-mono text-sm cursor-pointer flex justify-between items-center ${
                          answers.tankSize === size ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-background border-border text-foreground hover:border-cyan-500/35'
                        }`}
                      >
                        <span>{size} Gallons</span>
                        {answers.tankSize === size && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground font-poppins">Is it a freshwater or saltwater setup?</h3>
                  <p className="text-xs text-muted-foreground">Freshwater is recommended for beginners. Saltwater requires salinity refractometers and has higher equipment costs.</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { key: 'freshwater', label: 'Freshwater', desc: 'Adaptable, classic, planted community' },
                      { key: 'saltwater', label: 'Saltwater (Marine)', desc: 'Vibrant coral reef, fish-only-with-rock' }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption('waterType', opt.key as any)}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-32 ${
                          answers.waterType === opt.key ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-background border-border text-foreground hover:border-cyan-500/35'
                        }`}
                      >
                        <span className="font-bold text-base block">{opt.label}</span>
                        <span className="text-xs text-muted-foreground font-normal mt-2 leading-relaxed">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground font-poppins">What is your fishkeeping experience level?</h3>
                  <p className="text-xs text-muted-foreground">We filter out sensitive species (like Discus) if you are starting your first aquarium.</p>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {[
                      { key: 'Beginner', desc: 'First setup or basic community' },
                      { key: 'Intermediate', desc: 'Comfortable with cycles and testing' },
                      { key: 'Advanced', desc: 'Expert looking for demanding species' }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption('experience', opt.key as any)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-36 ${
                          answers.experience === opt.key ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-background border-border text-foreground hover:border-cyan-500/35'
                        }`}
                      >
                        <span className="font-bold text-sm block">{opt.key}</span>
                        <span className="text-[10px] text-muted-foreground font-normal mt-2 leading-snug">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground font-poppins">What is your temperament preference?</h3>
                  <p className="text-xs text-muted-foreground">Peaceful community setups allow stocking multiple species. Aggressive fish need dedicated species-only tanks.</p>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {[
                      { key: 'Peaceful', label: 'Peaceful Community', desc: 'Harmonious schoolers' },
                      { key: 'Semi-Aggressive', label: 'Semi-Aggressive', desc: 'Territorial but manageable' },
                      { key: 'Aggressive', label: 'Aggressive Predator', desc: 'Single-species centers' }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption('temperament', opt.key as any)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-36 ${
                          answers.temperament === opt.key ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-background border-border text-foreground hover:border-cyan-500/35'
                        }`}
                      >
                        <span className="font-bold text-xs sm:text-sm block leading-tight">{opt.label}</span>
                        <span className="text-[10px] text-muted-foreground font-normal mt-2 leading-snug">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground font-poppins">Will your tank have live plants/corals?</h3>
                  <p className="text-xs text-muted-foreground">Some species (like large Oscars) dig up substrates or eat soft plants, making them unsuitable for detailed aquascapes.</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { key: 'yes', label: 'Yes, planted or reef', desc: 'Need plant/coral-safe tankmates' },
                      { key: 'no', label: 'No, hardscape only', desc: 'Open to plant destroyers or digging species' }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption('planted', opt.key as any)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                          answers.planted === opt.key ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-background border-border text-foreground hover:border-cyan-500/35'
                        }`}
                      >
                        <span className="font-bold text-sm block">{opt.label}</span>
                        <span className="text-xs text-muted-foreground font-normal mt-1 leading-snug">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground font-poppins">What size of fish do you prefer?</h3>
                  <p className="text-xs text-muted-foreground">Note: Smaller fish allow keeping larger schools. Large fish require high volume filtration systems.</p>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {[
                      { key: 'small', label: 'Small (< 2.5")', desc: 'Tetras, Guppies, Nano fish' },
                      { key: 'medium', label: 'Medium (2.5"–6")', desc: 'Mollies, Dwarf cichlids, Tangs' },
                      { key: 'large', label: 'Large (6"+)', desc: 'Angelfish, Oscars, Discus' }
                    ].map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption('fishSize', opt.key as any)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-36 ${
                          answers.fishSize === opt.key ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500' : 'bg-background border-border text-foreground hover:border-cyan-500/35'
                        }`}
                      >
                        <span className="font-bold text-sm block">{opt.label}</span>
                        <span className="text-[10px] text-muted-foreground font-normal mt-2 leading-snug">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-4 border-t border-border pt-6 flex-wrap">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="py-3 px-5 border border-border text-foreground hover:bg-muted font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="flex-1 min-w-[150px] py-3 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer ml-auto"
                >
                  {step === 6 ? 'Show Matches' : 'Next Question'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 text-left">
              <div className="flex justify-between items-center flex-wrap gap-4 border-b border-border pb-4">
                <div>
                  <h2 className="text-3xl font-bold font-poppins text-foreground">Suitable Species Found</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Matching {recommendations.length} species for your {answers.tankSize} Gallon {answers.waterType} setup.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Restart Wizard
                </button>
              </div>

              {recommendations.length === 0 ? (
                <div className="text-center py-20 border border-border border-dashed rounded-3xl bg-muted/20">
                  <HelpCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">No Matching Fish Found</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    We couldn't find any fish in our library that match all selected criteria. Try adjusting your preferences (e.g. choose a larger tank size or different temperament settings).
                  </p>
                  <button onClick={handleReset} className="px-6 py-2.5 border border-border rounded-xl font-bold hover:bg-muted transition-colors cursor-pointer">
                    Adjust Answers
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendations.map(fish => (
                    <div key={fish.id} className="bg-card border border-border rounded-3xl overflow-hidden shadow-md flex flex-col group hover:shadow-lg transition-shadow">
                      {/* Image header */}
                      <div className="relative h-44 w-full bg-muted shrink-0">
                        <Image
                          src={fish.image}
                          alt={fish.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded text-xs font-semibold text-white border border-white/10">
                          {fish.difficulty}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground leading-tight">{fish.name}</h3>
                          <span className="text-xs text-muted-foreground italic block mt-0.5">{fish.scientificName}</span>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-2.5 line-clamp-3">{fish.description}</p>
                        </div>

                        {/* Why this fish checker */}
                        <div className="bg-muted/40 p-4 rounded-2xl border border-border/50 text-xs space-y-2 text-slate-700 dark:text-slate-350">
                          <strong className="text-foreground block text-[10px] uppercase font-bold tracking-wider mb-1.5 text-cyan-600 dark:text-cyan-400">Why this fish?</strong>
                          
                          <div className="flex items-center gap-1.5 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>Category matches {answers.waterType} water.</span>
                          </div>

                          <div className="flex items-center gap-1.5 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>Tank limit is safe (Requires {fish.minTankSize} Gal min).</span>
                          </div>

                          {fish.difficulty === 'Beginner' && (
                            <div className="flex items-center gap-1.5 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>Hardy choice suitable for beginners.</span>
                            </div>
                          )}

                          {fish.temperament === 'Peaceful' && (
                            <div className="flex items-center gap-1.5 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>Peaceful community behavior.</span>
                            </div>
                          )}

                          {answers.planted === 'yes' && (
                            <div className="flex items-center gap-1.5 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>Safe for live plant layouts.</span>
                            </div>
                          )}
                        </div>

                        {/* View guide button */}
                        <Link
                          href={`/fish/${fish.category?.toLowerCase() || 'unknown'}/${fish.slug}`}
                          className="w-full py-2.5 bg-muted hover:bg-cyan-500 hover:text-slate-900 transition-colors text-center text-xs font-semibold rounded-xl block border border-border flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" /> Read Species Guide
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <GlobalCTA
        badge="SPECIES SELECTION & TANK HARMONY"
        title={
          <>
            Calculate community capacity &amp; <br className="hidden sm:inline" />
            schooling bioload limits.
          </>
        }
        description="Add multiple recommended species to our Stocking Planner to verify zero territorial conflicts or parameter clashes."
        primaryAction={{
          label: 'Open Stocking Planner',
          href: '/stocking-planner',
        }}
        secondaryAction={{
          label: 'Explore Complete Fish Index',
          href: '/fish',
        }}
      />
    </div>
  );
}
