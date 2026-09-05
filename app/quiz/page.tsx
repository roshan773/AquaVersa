'use client';

import { useState, useEffect } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle, AlertCircle, Info } from 'lucide-react';
import { unlockAchievement } from '@/lib/storage';
import SubpageHero from '@/components/ui/SubpageHero';
import GlobalCTA from '@/components/ui/GlobalCTA';

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
  const progressPct = Math.round(((currentIdx + (answered ? 1 : 0)) / quizQuestions.length) * 100);

  // Determine Rank
  let rank = "Beginner Aquarist";
  if (score >= 9) {
    rank = "Master Aquarist";
  } else if (score >= 7) {
    rank = "Intermediate Aquarist";
  }

  // Group wrong answers by topic to suggest improvements
  const weakTopics = Array.from(new Set(
    reviewList.filter(r => !r.isCorrect).map(r => r.topic)
  ));

  return (
    <div className="w-full bg-[#F7F7FF] text-[#27187E] min-h-screen">
      <SubpageHero
        badge="AQUATIC KNOWLEDGE ASSESSMENT"
        title="AQUARIUM SCIENCE QUIZ"
        description="Test your understanding of the nitrogen cycle, aquatic chemistry, filtration, species compatibility, and disease pathology."
      />

      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          {!completed ? (
            /* Active Quiz Card */
            <div className="bg-white border-2 border-[#27187E]/15 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
              
              {/* Progress Header */}
              <div>
                <div className="flex justify-between items-center text-xs md:text-sm font-bold text-[#27187E]/70 mb-2 uppercase tracking-wider font-readable">
                  <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
                  <span className="text-[#27187E] font-black">{progressPct}% Complete</span>
                </div>
                <div className="w-full bg-[#EDEAFC] h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#27187E] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Topic Badge */}
              <div className="inline-block px-3.5 py-1 bg-[#EDEAFC] text-[#27187E] font-bold text-xs uppercase rounded-full tracking-wider border border-[#27187E]/20 font-readable">
                Topic: {currentQ.topic}
              </div>

              {/* Question Text */}
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] leading-snug font-readable">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 font-readable">
                {currentQ.options.map((opt, optIdx) => {
                  let optStyle = "bg-[#F7F7FF] border-[#27187E]/15 hover:border-[#27187E] text-[#27187E]";
                  
                  if (selectedOpt === optIdx && !answered) {
                    optStyle = "bg-[#27187E] border-[#27187E] text-white shadow-sm";
                  }

                  if (answered) {
                    if (optIdx === currentQ.correctAnswer) {
                      optStyle = "bg-[#27187E] border-[#27187E] text-white font-bold";
                    } else if (selectedOpt === optIdx) {
                      optStyle = "bg-[#EDEAFC] border-[#27187E] text-[#27187E] line-through opacity-80";
                    } else {
                      optStyle = "bg-[#F7F7FF] border-[#27187E]/10 text-[#27187E]/40 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(optIdx)}
                      disabled={answered}
                      className={`w-full p-4 md:p-5 rounded-2xl border-2 text-left text-sm md:text-base transition-all font-semibold flex items-center justify-between cursor-pointer ${optStyle}`}
                    >
                      <span>{opt}</span>
                      
                      {answered && optIdx === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-6 h-6 text-white shrink-0 ml-3" />
                      )}
                      {answered && selectedOpt === optIdx && optIdx !== currentQ.correctAnswer && (
                        <XCircle className="w-6 h-6 text-[#27187E] shrink-0 ml-3" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation panel */}
              {answered && (
                <div className="p-5 bg-[#EDEAFC] border border-[#27187E]/20 rounded-2xl flex gap-3 text-sm md:text-base leading-relaxed text-[#27187E]/90 font-readable">
                  <Info className="w-6 h-6 text-[#27187E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#27187E] mb-1 font-bold">Scientific Explanation</strong>
                    {currentQ.explanation}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-4 border-t border-[#27187E]/10 flex justify-end">
                {!answered ? (
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={selectedOpt === null}
                    className="py-3.5 px-8 bg-[#27187E] hover:bg-[#1B1059] disabled:opacity-40 text-white font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer text-sm md:text-base font-readable shadow-sm"
                  >
                    Confirm Answer <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="py-3.5 px-8 bg-[#27187E] hover:bg-[#1B1059] text-white font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer text-sm md:text-base font-readable shadow-sm"
                  >
                    {currentIdx + 1 === quizQuestions.length ? 'View Final Results' : 'Next Question'} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Completed Screen */
            <div className="bg-white border-2 border-[#27187E]/15 rounded-3xl p-8 md:p-12 shadow-sm text-center space-y-6">
              <div className="inline-flex p-5 bg-[#EDEAFC] text-[#27187E] rounded-full mb-2 border border-[#27187E]/20">
                <Award className="w-14 h-14" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-[#27187E] font-readable tracking-tight">Quiz Complete!</h2>
              
              <div className="space-y-2">
                <span className="text-sm md:text-base font-bold text-[#27187E]/70 block font-readable uppercase tracking-wider">Your Final Score</span>
                <span className="text-6xl font-black text-[#27187E] font-readable">
                  {score} <span className="text-3xl font-bold text-[#27187E]/50">/ {quizQuestions.length}</span>
                </span>
              </div>

              {/* Rank Badge */}
              <div className="inline-block px-5 py-2 rounded-full border-2 border-[#27187E] bg-[#EDEAFC] text-sm md:text-base font-black text-[#27187E] font-readable tracking-wider uppercase">
                Field Rank: {rank}
              </div>

              {score >= 8 ? (
                <div className="p-4 bg-[#EDEAFC] rounded-2xl border border-[#27187E]/20 text-sm md:text-base font-bold text-[#27187E] flex items-center justify-center gap-2 font-readable">
                  <Award className="w-5 h-5 shrink-0" />
                  <span>Passed with Distinction! You have unlocked the &quot;Quiz Science Expert&quot; Achievement award.</span>
                </div>
              ) : (
                <p className="text-sm md:text-base font-semibold text-[#27187E]/80 font-readable">
                  Score 8/10 or higher to unlock the Aquarium Science Expert achievement award.
                </p>
              )}

              {/* Weak topics / review suggestions */}
              {weakTopics.length > 0 && (
                <div className="p-6 bg-[#EDEAFC]/60 rounded-2xl border border-[#27187E]/15 text-left space-y-3 max-w-lg mx-auto font-readable">
                  <div className="flex gap-2 items-center text-xs md:text-sm text-[#27187E] font-bold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" /> Recommended Study Topics
                  </div>
                  <p className="text-sm text-[#27187E]/80 leading-relaxed">
                    Based on questions missed, review field guides related to:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {weakTopics.map((topic, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-white border border-[#27187E]/20 text-xs md:text-sm font-bold text-[#27187E]">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset Action */}
              <div className="pt-6 border-t border-[#27187E]/10 flex justify-center gap-4">
                <button
                  onClick={handleRestart}
                  className="py-3.5 px-8 bg-[#27187E] hover:bg-[#1B1059] text-white font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer text-sm md:text-base font-readable shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Science Quiz
                </button>
              </div>

            </div>
          )}
        </div>
      </section>

      <GlobalCTA
        badge="AQUARIUM ATLAS MILESTONES"
        title={
          <>
            Track your completed setup <br className="hidden sm:inline" />
            and water testing milestones.
          </>
        }
        description="Unlock achievement awards as you master nitrogen cycling, build stocking plans, and calculate hardware specs."
        primaryAction={{
          label: 'View My Achievements',
          href: '/achievements',
        }}
        secondaryAction={{
          label: 'Start 5-Step Tank Guide',
          href: '/start-aquarium',
        }}
      />
    </div>
  );
}
