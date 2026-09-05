"use client";

import { useState, useEffect } from "react";
import { GuideStep } from "@/lib/types";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Info,
  Sparkles,
  Check,
  RotateCcw,
  HelpCircle,
  Activity,
  Fish,
  Leaf,
  Award,
  Layers
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GlobalCTA from "@/components/ui/GlobalCTA";

interface StartAquariumClientProps {
  starterGuideSteps: GuideStep[];
}

interface ChecklistItem {
  id: string;
  text: string;
}

const stepChecklists: Record<number, ChecklistItem[]> = {
  1: [
    { id: "tank-size", text: "Select a 10 to 20-gallon tank (larger water volumes offer significantly greater biological stability)." },
    { id: "tank-stand", text: "Find a level, structural aquarium stand that can support heavy filled water weight." },
    { id: "tank-lid", text: "Acquire a tight-fitting canopy/lid with integrated LED lighting to prevent jump fatalities." }
  ],
  2: [
    { id: "water-substrate", text: "Rinse inert gravel or aquarium sand thoroughly with tap water before placing on the tank floor." },
    { id: "water-fill", text: "Fill the aquarium slowly using a submerged saucer or plate to avoid scattering the substrate bed." },
    { id: "water-condition", text: "Dose a reliable dechlorinator/conditioner (like Seachem Prime) to neutralize chlorine and chloramine." }
  ],
  3: [
    { id: "cycle-ammonia", text: "Introduce an ammonia source (liquid ammonium chloride or fish flakes) to feed initial nitrifying bacteria." },
    { id: "cycle-test", text: "Use a liquid test kit every 24–48 hours to measure Ammonia, Nitrite, and Nitrate conversion curves." },
    { id: "cycle-wait", text: "Wait until 2 ppm dosed Ammonia is fully converted to Nitrate in 24 hours with zero residual Ammonia or Nitrite." }
  ]
};

export default function StartAquariumClient({ starterGuideSteps }: StartAquariumClientProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("roshanaquva_start_guide_progress");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.checkedItems) setCheckedItems(parsed.checkedItems);
        if (parsed.currentStepIndex !== undefined) setCurrentStepIndex(parsed.currentStepIndex);
        if (parsed.showCelebration !== undefined) setShowCelebration(parsed.showCelebration);
      }
    } catch (e) {
      console.error("Failed to load guide progress", e);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        "roshanaquva_start_guide_progress",
        JSON.stringify({ checkedItems, currentStepIndex, showCelebration })
      );
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  }, [checkedItems, currentStepIndex, showCelebration, mounted]);

  if (!mounted) {
    return (
      <div className="w-full min-h-screen bg-[#f7f7ff] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#27187e] border-t-transparent animate-spin mb-4"></div>
          <span className="text-[#27187e] font-readable font-semibold">Loading Setup Guide...</span>
        </div>
      </div>
    );
  }

  const currentStep = starterGuideSteps[currentStepIndex];
  const stepNumber = currentStepIndex + 1;
  const currentChecklist = stepChecklists[stepNumber] || [];

  const handleToggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isStepCompleted = (stepIndex: number) => {
    const checklist = stepChecklists[stepIndex + 1] || [];
    if (checklist.length === 0) return false;
    return checklist.every(item => checkedItems[item.id]);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your setup progress?")) {
      setCheckedItems({});
      setCurrentStepIndex(0);
      setShowCelebration(false);
      try {
        localStorage.removeItem("roshanaquva_start_guide_progress");
      } catch (e) { }
    }
  };

  const totalItems = Object.values(stepChecklists).flat().length;
  const checkedCount = Object.keys(checkedItems).filter(key => checkedItems[key]).length;
  const progressPercent = Math.round((checkedCount / totalItems) * 100);

  const renderStepper = () => (
    <div className="w-full max-w-4xl mx-auto px-4 mb-10 font-readable">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#edeafc] z-0" />

        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#27187e] transition-all duration-500 z-0"
          style={{ width: `${(currentStepIndex / (starterGuideSteps.length - 1)) * 100}%` }}
        />

        {starterGuideSteps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isDone = isStepCompleted(idx);
          const isVisited = idx < currentStepIndex || isDone;

          return (
            <button
              key={idx}
              onClick={() => {
                setShowCelebration(false);
                setCurrentStepIndex(idx);
              }}
              className="flex flex-col items-center relative z-10 focus:outline-none group cursor-pointer"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 font-display text-xl ${
                  isActive
                    ? "bg-[#27187e] text-[#f7f7ff] border-[#1b1059] shadow-lg scale-110"
                    : isDone
                    ? "bg-[#edeafc] text-[#27187e] border-[#27187e]"
                    : isVisited
                    ? "bg-[#ffffff] text-[#27187e] border-[#cfcaf5]"
                    : "bg-[#f7f7ff] text-[#27187e]/60 border-[#cfcaf5]"
                }`}
              >
                {isDone ? (
                  <Check className="w-6 h-6 stroke-[3]" />
                ) : (
                  <span>{step.step}</span>
                )}
              </div>
              <span className={`text-xs sm:text-sm font-semibold mt-3 transition-colors ${
                isActive ? "text-[#27187e] font-bold" : "text-[#27187e]/70"
              }`}>
                {idx === 0 ? "1. Hardware & Tank" : idx === 1 ? "2. Water & Substrate" : "3. Nitrogen Cycle"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 bg-[#ffffff] rounded-2xl p-2 border-2 border-[#cfcaf5] flex items-center gap-4 px-4 py-2.5 text-xs sm:text-sm shadow-sm">
        <span className="font-semibold text-[#27187e]/80 shrink-0">Setup Progress:</span>
        <div className="flex-1 bg-[#edeafc] rounded-full h-3 overflow-hidden border border-[#cfcaf5]">
          <div
            className="h-full bg-[#27187e] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="font-bold text-[#27187e] shrink-0">{progressPercent}% Completed</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Interactive Beginner Checklist</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            HOW TO START YOUR FIRST AQUARIUM
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl leading-relaxed">
            A step-by-step biological roadmap to establishing a stable aquatic ecosystem. Avoid beginner mistakes and track setup milestones.
          </p>

          {checkedCount > 0 && (
            <button
              onClick={handleReset}
              className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#27187e] hover:bg-[#edeafc] transition-colors border border-[#cfcaf5] bg-[#ffffff] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Guide Progress
            </button>
          )}
        </div>

        {/* Stepper Navigation */}
        <div className="mb-12">
          {renderStepper()}
        </div>

        {/* Active Step Panel / Celebration State */}
        <div>
          <AnimatePresence mode="wait">
            {showCelebration ? (
              <motion.div
                key="celebration"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl mx-auto bg-[#ffffff] p-8 sm:p-12 rounded-3xl border-2 border-[#27187e] shadow-xl text-center relative overflow-hidden font-readable"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#edeafc] text-[#27187e] border-2 border-[#27187e] mb-6 shadow-md animate-bounce">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>

                <h2 className="text-4xl sm:text-5xl font-display text-[#27187e] mb-4">
                  Aquarium Ecosystem Cycled &amp; Ready!
                </h2>
                <p className="text-base sm:text-lg text-[#27187e]/85 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                  Outstanding job! You have assembled the hardware, conditioned the water volume, and completed the nitrogen cycle. Your ecosystem is prepared to welcome fish safely.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto text-left">
                  <Link
                    href="/fish"
                    className="p-6 rounded-3xl bg-[#f7f7ff] border-2 border-[#cfcaf5] hover:border-[#27187e] transition-all flex flex-col justify-between shadow-sm group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-[#edeafc] text-[#27187e] flex items-center justify-center mb-4">
                        <Fish className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-2xl text-[#27187e] mb-1">Choose Starter Fish</h3>
                      <p className="text-xs sm:text-sm text-[#27187e]/80 leading-relaxed font-medium">
                        Browse hardy freshwater community fish selected for peaceful behavior and adaptability.
                      </p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#27187e] mt-4 flex items-center gap-1 group-hover:underline">
                      Explore Species <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>

                  <Link
                    href="/plants"
                    className="p-6 rounded-3xl bg-[#f7f7ff] border-2 border-[#cfcaf5] hover:border-[#27187e] transition-all flex flex-col justify-between shadow-sm group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-[#edeafc] text-[#27187e] flex items-center justify-center mb-4">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-2xl text-[#27187e] mb-1">Select Aquatic Flora</h3>
                      <p className="text-xs sm:text-sm text-[#27187e]/80 leading-relaxed font-medium">
                        Add live plants for natural nitrate absorption and natural biological shelter.
                      </p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#27187e] mt-4 flex items-center gap-1 group-hover:underline">
                      Explore Plants <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>

                <div className="mt-10 pt-8 border-t border-[#edeafc]">
                  <button
                    onClick={() => {
                      setShowCelebration(false);
                      setCurrentStepIndex(0);
                    }}
                    className="px-6 py-3 rounded-full border-2 border-[#cfcaf5] hover:bg-[#edeafc] text-sm font-semibold transition-colors cursor-pointer text-[#27187e]"
                  >
                    Review Setup Steps Again
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentStepIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-readable"
              >
                {/* Left: Step Details & Checkbox */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 border-2 border-[#cfcaf5] shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3.5 py-1 rounded-full bg-[#edeafc] text-[#27187e] text-xs font-bold uppercase tracking-wider border border-[#cfcaf5]">
                        Step {currentStep.step} of 3
                      </span>
                      {isStepCompleted(currentStepIndex) && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-[#27187e] bg-[#edeafc] px-3 py-1 rounded-full border border-[#cfcaf5]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> All Step Actions Checked!
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-display text-[#27187e] mb-3">{currentStep.title}</h2>
                    <p className="text-[#27187e]/85 text-base sm:text-lg mb-8 leading-relaxed font-medium">{currentStep.description}</p>

                    {/* Interactive Checklist */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#f7f7ff] border-2 border-[#cfcaf5] mb-8">
                      <h3 className="text-xs uppercase font-bold tracking-wider text-[#27187e] mb-4 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#27187e]" /> Essential Setup Actions:
                      </h3>

                      <div className="space-y-3">
                        {currentChecklist.map((item) => {
                          const isChecked = !!checkedItems[item.id];
                          return (
                            <div
                              key={item.id}
                              onClick={() => handleToggleCheck(item.id)}
                              className={`flex gap-3.5 items-start p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                isChecked
                                  ? "bg-[#edeafc] border-[#27187e] text-[#27187e]"
                                  : "bg-[#ffffff] border-[#cfcaf5] hover:border-[#27187e] text-[#27187e]"
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-lg border-2 shrink-0 flex items-center justify-center transition-all mt-0.5 ${
                                isChecked
                                  ? "bg-[#27187e] border-[#27187e] text-[#f7f7ff]"
                                  : "border-[#cfcaf5] bg-[#ffffff]"
                              }`}>
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className={`text-sm sm:text-base leading-snug select-none font-medium ${
                                isChecked ? "line-through opacity-70" : ""
                              }`}>
                                {item.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Gear & Why Matters */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {currentStep.whatToBuy && (
                        <div className="p-5 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5]">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-[#27187e] mb-2 flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4" /> Recommended Hardware
                          </h4>
                          <p className="text-xs sm:text-sm text-[#27187e]/85 leading-relaxed font-medium">{currentStep.whatToBuy}</p>
                        </div>
                      )}

                      {currentStep.whyNeeded && (
                        <div className="p-5 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5]">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-[#27187e] mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4" /> Biological Rationale
                          </h4>
                          <p className="text-xs sm:text-sm text-[#27187e]/85 leading-relaxed font-medium">{currentStep.whyNeeded}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Navigation footer */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => {
                        if (currentStepIndex > 0) {
                          setCurrentStepIndex(currentStepIndex - 1);
                        }
                      }}
                      disabled={currentStepIndex === 0}
                      className={`px-6 py-3 rounded-2xl border-2 border-[#cfcaf5] text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                        currentStepIndex === 0
                          ? "opacity-0 cursor-default"
                          : "hover:bg-[#edeafc] bg-[#ffffff] cursor-pointer text-[#27187e]"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous Step
                    </button>

                    {currentStepIndex === starterGuideSteps.length - 1 ? (
                      <button
                        onClick={() => setShowCelebration(true)}
                        className="px-7 py-3.5 rounded-2xl font-semibold flex items-center gap-2 transition-all cursor-pointer bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-sm sm:text-base shadow-md"
                      >
                        Finish Setup Guide <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                        className="px-7 py-3.5 bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] font-semibold rounded-2xl flex items-center gap-1.5 transition-all cursor-pointer text-sm sm:text-base shadow-md"
                      >
                        Next Step <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Right: Danger Warning & Pro Tips */}
                <div className="lg:col-span-4 space-y-6">
                  {currentStep.commonMistakes && (
                    <div className="p-6 rounded-3xl bg-[#ffffff] border-2 border-[#cfcaf5] shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-[#27187e]">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-bold text-xs uppercase tracking-wider">
                          Avoid This Beginner Mistake
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-[#27187e]/85 leading-relaxed font-medium">
                        {currentStep.commonMistakes}
                      </p>
                    </div>
                  )}

                  {currentStep.recommendation && (
                    <div className="p-6 rounded-3xl bg-[#ffffff] border-2 border-[#cfcaf5] shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-[#27187e]">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-bold text-xs uppercase tracking-wider">
                          Veterinary &amp; Keeper Tip
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-[#27187e]/85 leading-relaxed font-medium">
                        {currentStep.recommendation}
                      </p>
                    </div>
                  )}

                  <div className="p-6 rounded-3xl border-2 border-[#cfcaf5] bg-[#ffffff] shadow-sm">
                    <h4 className="font-bold text-xs mb-3 flex items-center gap-1.5 text-[#27187e] uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4" /> Next Reference Guides
                    </h4>
                    <ul className="space-y-2.5 text-sm text-[#27187e] font-medium leading-relaxed">
                      <li>
                        <Link href="/water-params" className="hover:underline text-[#27187e]">
                          → Water chemistry &amp; test parameters
                        </Link>
                      </li>
                      <li>
                        <Link href="/equipment" className="hover:underline text-[#27187e]">
                          → Filtration mechanics &amp; heaters
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <GlobalCTA
        badge="FIRST AQUARIUM BLUEPRINT"
        title={
          <>
            Pick your hardy starter species <br className="hidden sm:inline" />
            and live beginner flora.
          </>
        }
        description="Explore resilient freshwater species and easy low-light plants ideal for newly cycled biological ecosystems."
        primaryAction={{
          label: 'Browse Starter Fish',
          href: '/fish',
        }}
        secondaryAction={{
          label: 'Browse Beginner Plants',
          href: '/plants',
        }}
      />
    </div>
  );
}
