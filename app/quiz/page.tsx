'use client';

import { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle, XCircle, Award, RotateCcw, ArrowRight, BookOpen, AlertCircle, Info } from 'lucide-react';
import { unlockAchievement } from '@/lib/storage';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    topic: 'Nitrogen Cycle',
    question: "What is the first, highly toxic waste product excreted by fish and decaying organic matter?",
    options: ["Nitrate (NO3)", "Nitrite (NO2)", "Ammonia (NH3)", "Chlorine (Cl)"],
    correctAnswer: 2,
    explanation: "Ammonia is the primary waste product excreted by fish gills and decaying organic matter. It is highly toxic and must be processed by beneficial bacteria during the nitrogen cycle."
  },
  {
    id: 2,
    topic: 'Water Chemistry',
    question: "In a fully established, cycled aquarium, what should your Ammonia and Nitrite readings be?",
    options: ["Under 5.0 ppm", "Around 1.0 ppm", "Exactly 0 ppm", "Anything under 20 ppm"],
    correctAnswer: 2,
    explanation: "In a cycled aquarium, beneficial bacteria immediately convert Ammonia to Nitrite, and then Nitrite to Nitrate. Therefore, both Ammonia and Nitrite levels should always be exactly 0 ppm."
  },
  {
    id: 3,
    topic: 'Filtration',
    question: "Why is it dangerous to rinse biological filter media (like sponges) directly under unconditioned tap water?",
    options: [
      "The tap water is usually too cold for filter bacteria.",
      "Chlorine and chloramine in tap water kill the beneficial nitrifying bacteria.",
      "It removes necessary fish food particles trapped in the filter.",
      "Tap water contains mineral salts that clog the filter pores."
    ],
    correctAnswer: 1,
    explanation: "Tap water contains disinfectants like chlorine or chloramine. Rinsing filter media in it kills the beneficial bacteria, crashing your cycle and causing toxic ammonia spikes."
  },
  {
    id: 4,
    topic: 'Plants',
    question: "Which of the following is an epiphyte plant that should NOT have its rhizome buried in substrate?",
    options: ["Amazon Sword", "Java Fern", "Jungle Val", "Dwarf Hairgrass"],
    correctAnswer: 1,
    explanation: "Java Fern (and Anubias) are epiphytes. They grow attached to rocks or driftwood. Burying their thick green stem (rhizome) in gravel or sand will cause them to rot and die."
  },
  {
    id: 5,
    topic: 'Water Chemistry',
    question: "What does Carbonate Hardness (KH) measure in an aquarium?",
    options: [
      "The amount of calcium and magnesium minerals.",
      "The water buffering capacity, which stabilizes pH levels against acid crashes.",
      "The total amount of dissolved oxygen in the water.",
      "The concentration of nitrates and organic pollutants."
    ],
    correctAnswer: 1,
    explanation: "KH measures carbonate and bicarbonate ions. This acts as a pH buffer. If KH is too low (under 3 dKH), pH can crash rapidly, which is lethal to fish."
  },
  {
    id: 6,
    topic: 'Fish Compatibility',
    question: "Why should you avoid housing two male Betta splendens together?",
    options: [
      "They will cross-breed uncontrollably.",
      "They are strongly territorial and will fight aggressively, often to the death.",
      "They require different water temperatures.",
      "They will deplete the tank's dissolved oxygen levels."
    ],
    correctAnswer: 1,
    explanation: "Male Betta fish are notoriously territorial toward conspecifics. They will engage in persistent aggression and fighting, resulting in severe fin damage, stress, or death."
  },
  {
    id: 7,
    topic: 'Tank Size & Stocking',
    question: "Which rule is considered outdated and dangerous for modern stocking plans?",
    options: [
      "Conducting a 10% to 25% weekly partial water change.",
      "Sizing filters for a 5x to 10x volume turnover rate per hour.",
      "The '1 inch of fish per gallon of water' rule.",
      "Testing water parameters at least twice a month."
    ],
    correctAnswer: 2,
    explanation: "The '1 inch per gallon' rule is highly outdated. It ignores biomass shapes, territorial needs, waste production, and swimming zones. A 10-inch fish cannot live in a 10-gallon tank."
  },
  {
    id: 8,
    topic: 'Maintenance',
    question: "What is the primary purpose of conducting weekly partial water changes?",
    options: [
      "To scrub the glass walls and decor clean.",
      "To dilute accumulated nitrates and replenish essential minerals.",
      "To cycle the biological filter from scratch.",
      "To artificially adjust and bounce the water pH."
    ],
    correctAnswer: 1,
    explanation: "Nitrifying bacteria convert waste to Nitrate, which accumulates because it is not processed by standard filters. Water changes dilute nitrates and add clean minerals."
  },
  {
    id: 9,
    topic: 'Fish Health',
    question: "A fish floating upside down or struggling to swim down is likely suffering from what?",
    options: ["Ich white spot disease", "Swim bladder disorder", "Fin rot bacterial infection", "Dropsy pinecone disease"],
    correctAnswer: 1,
    explanation: "The swim bladder regulates a fish's buoyancy. Disruption (due to constipation, injury, or infection) causes abnormal swimming, sinking, or uncontrollable floating."
  },
  {
    id: 10,
    topic: 'Fish Health',
    question: "What is the main cause of the clinical sign known as 'pineconing' (Dropsy) in fish?",
    options: [
      "Poor nutrient intake.",
      "Severe internal fluid accumulation caused by kidney or organ failure.",
      "Parasitic infestation on the scales.",
      "Lack of aquarium lighting."
    ],
    correctAnswer: 1,
    explanation: "Dropsy is not a disease itself, but a symptom of organ (often kidney) failure, which causes fluid to build up inside the fish, forcing scales to protrude outward like a pinecone."
  }
];

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [reviewList, setReviewList] = useState<{ question: string; isCorrect: boolean; explanation: string; topic: string }[]>([]);

  const handleOptionSelect = (optIdx: number) => {
    if (answered) return;
    setSelectedOpt(optIdx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOpt === null || answered) return;
    
    const currentQ = quizQuestions[currentIdx];
    const isCorrect = selectedOpt === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setReviewList(prev => [...prev, {
      question: currentQ.question,
      isCorrect,
      explanation: currentQ.explanation,
      topic: currentQ.topic
    }]);

    setAnswered(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setAnswered(false);
    setScore(0);
    setCompleted(false);
    setReviewList([]);
  };

  // Check achievements on complete
  useEffect(() => {
    if (completed) {
      const finalScorePct = (score / quizQuestions.length) * 100;
      if (finalScorePct >= 80) {
        unlockAchievement('quiz-pass');
      }
    }
  }, [completed, score]);

  const currentQ = quizQuestions[currentIdx];
  const progressPct = Math.round((currentIdx / quizQuestions.length) * 100);

  // Determine Rank
  let rank = "Beginner Aquarist";
  let rankColor = "text-cyan-500 bg-cyan-500/10 border-cyan-500/20";
  if (score >= 9) {
    rank = "Master Aquarist";
    rankColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
  } else if (score >= 7) {
    rank = "Intermediate Aquarist";
    rankColor = "text-amber-500 bg-amber-500/10 border-amber-500/20";
  }

  // Group wrong answers by topic to suggest improvements
  const weakTopics = Array.from(new Set(
    reviewList.filter(r => !r.isCorrect).map(r => r.topic)
  ));

  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <Award className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Aquarium Science Quiz</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Test your knowledge on the nitrogen cycle, water chemistry, species compatibility, and aquarium maintenance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          {!completed ? (
            /* Active Quiz Interface */
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl text-left space-y-6">
              
              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                  <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
                  <span className="text-cyan-500 font-mono">{progressPct}% Done</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
              </div>

              {/* Category banner */}
              <div className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-[10px] uppercase rounded-full tracking-wider border border-cyan-500/20">
                Topic: {currentQ.topic}
              </div>

              {/* Question Text */}
              <h3 className="text-lg font-bold text-foreground leading-snug font-poppins">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 font-sans">
                {currentQ.options.map((opt, optIdx) => {
                  let optColor = "bg-background border-border hover:border-cyan-500/35 text-foreground";
                  
                  if (selectedOpt === optIdx && !answered) {
                    optColor = "bg-cyan-500/5 border-cyan-500 text-cyan-500";
                  }

                  if (answered) {
                    if (optIdx === currentQ.correctAnswer) {
                      optColor = "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold";
                    } else if (selectedOpt === optIdx) {
                      optColor = "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400";
                    } else {
                      optColor = "bg-background border-border text-muted-foreground opacity-55";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(optIdx)}
                      disabled={answered}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all font-medium flex items-center justify-between cursor-pointer ${optColor}`}
                    >
                      <span>{opt}</span>
                      
                      {answered && optIdx === currentQ.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />
                      )}
                      {answered && selectedOpt === optIdx && optIdx !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation panel */}
              {answered && (
                <div className="p-4 bg-muted/60 border border-border rounded-2xl flex gap-3 text-xs leading-relaxed text-muted-foreground font-sans">
                  <Info className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-foreground mb-0.5 font-bold">Explanation</strong>
                    {currentQ.explanation}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-4 border-t border-border/50 flex justify-end">
                {!answered ? (
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={selectedOpt === null}
                    className="py-3 px-6 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-900 font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    Confirm Answer <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="py-3 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    {currentIdx + 1 === quizQuestions.length ? 'Show Results' : 'Next Question'} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Completed Screen */
            <div className="bg-card border border-border rounded-3xl p-8 shadow-xl text-center space-y-6">
              <div className="inline-flex p-4 bg-cyan-500/10 text-cyan-500 rounded-full mb-2">
                <Award className="w-12 h-12" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground font-poppins">Quiz Completed!</h2>
              
              <div className="space-y-2">
                <span className="text-sm font-semibold text-muted-foreground block">Your Score</span>
                <span className="text-5xl font-poppins font-black text-foreground">
                  {score} <span className="text-2xl font-bold text-muted-foreground">/ {quizQuestions.length}</span>
                </span>
              </div>

              {/* Rank Badge */}
              <div className={`inline-block px-4 py-1.5 rounded-full border text-xs font-bold font-sans tracking-wide uppercase ${rankColor}`}>
                Rank: {rank}
              </div>

              {score >= 8 ? (
                <p className="text-emerald-500 font-bold text-xs flex items-center justify-center gap-1.5 animate-pulse">
                  <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Passed! You have unlocked the &quot;Quiz Master&quot; Achievement.</span>
                </p>
              ) : (
                <p className="text-rose-500 font-semibold text-xs">
                  Needs 8/10 to unlock the quiz achievement. Try again to pass!
                </p>
              )}

              {/* Weak topics / review suggestions */}
              {weakTopics.length > 0 && (
                <div className="p-5 bg-muted/50 rounded-2xl border border-border text-left space-y-2 max-w-lg mx-auto">
                  <div className="flex gap-2 items-center text-xs text-amber-500 font-bold uppercase tracking-wider mb-1">
                    <AlertCircle className="w-4 h-4" /> Recommended Study Areas
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">Based on incorrect answers, we recommend reviewing guides related to:</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {weakTopics.map((topic, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-background border border-border text-xs font-semibold text-foreground/80">{topic}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset Action */}
              <div className="pt-6 border-t border-border/50 flex justify-center gap-4">
                <button
                  onClick={handleRestart}
                  className="py-3 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <RotateCcw className="w-4 h-4" /> Restart Quiz
                </button>
              </div>

            </div>
          )}
        </div>
      </section>
    </div>
  );
}
