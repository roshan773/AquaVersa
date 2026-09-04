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
  Award
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface StartAquariumClientProps {
  starterGuideSteps: GuideStep[];
}

interface ChecklistItem {
  id: string;
  text: string;
}

// Checklist items mapped to each step (1-indexed)
const stepChecklists: Record<number, ChecklistItem[]> = {
  1: [
    { id: "tank-size", text: "Select a 10 to 20-gallon tank (larger volumes are much more stable)." },
    { id: "tank-stand", text: "Find a level, structural surface that can support the heavy water weight." },
    { id: "tank-lid", text: "Get a secure lid/hood with integrated LED lighting to prevent jumping." }
  ],
  2: [
    { id: "water-substrate", text: "Rinse substrate (gravel/sand) with clean water and layer it in the tank." },
    { id: "water-fill", text: "Fill the tank with water slowly using a plate to avoid disturbing substrate." },
    { id: "water-condition", text: "Add quality water conditioner (like Seachem Prime) to remove toxic chlorine." }
  ],
  3: [
    { id: "cycle-ammonia", text: "Add an ammonia source (fish food or pure liquid ammonia) to begin the cycle." },
    { id: "cycle-test", text: "Use a liquid test kit daily to measure Ammonia, Nitrite, and Nitrate." },
    { id: "cycle-wait", text: "Wait until Ammonia and Nitrite drop to 0 ppm, and Nitrate is present." }
  ]
};

export default function StartAquariumClient({ starterGuideSteps }: StartAquariumClientProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
    // Load progress from localStorage if available
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

  // Save progress on change
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
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mb-4"></div>
          <span className="text-muted-foreground font-medium">Loading Guide...</span>
        </div>
      </div>
    );
  }

  const currentStep = starterGuideSteps[currentStepIndex];
  const stepNumber = currentStepIndex + 1;
  const currentChecklist = stepChecklists[stepNumber] || [];

  // Toggle checklist items
  const handleToggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Determine if a step is fully checked
  const isStepCompleted = (stepIndex: number) => {
    const checklist = stepChecklists[stepIndex + 1] || [];
    if (checklist.length === 0) return false;
    return checklist.every(item => checkedItems[item.id]);
  };

  // Reset all progress
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your setup progress?")) {
      setCheckedItems({});
      setCurrentStepIndex(0);
      setShowCelebration(false);
      try {
        localStorage.removeItem("aquaversa_start_guide_progress");
      } catch (e) { }
    }
  };

  // Calculate global progress percentage
  const totalItems = Object.values(stepChecklists).flat().length;
  const checkedCount = Object.keys(checkedItems).filter(key => checkedItems[key]).length;
  const progressPercent = Math.round((checkedCount / totalItems) * 100);

  // Stepper Header
  const renderStepper = () => (
    <div className="w-full max-w-4xl mx-auto px-4 mb-10">
      <div className="flex justify-between items-center relative">
        {/* Progress Line Background */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-muted dark:bg-slate-800 z-0" />

        {/* Active Progress Line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500 z-0"
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
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${isActive
                  ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-110"
                  : isDone
                    ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : isVisited
                      ? "bg-background text-cyan-500 border-cyan-500 dark:border-cyan-400"
                      : "bg-muted dark:bg-slate-900 text-muted-foreground border-border dark:border-slate-800"
                  }`}
              >
                {isDone ? (
                  <Check className="w-6 h-6 stroke-[3]" />
                ) : (
                  <span className="text-base font-bold">{step.step}</span>
                )}
              </div>
              <span className={`text-xs md:text-sm font-semibold mt-3 transition-colors ${isActive
                ? "text-cyan-500 dark:text-cyan-400"
                : isDone
                  ? "text-emerald-500"
                  : "text-muted-foreground group-hover:text-foreground"
                }`}>
                {idx === 0 ? "1. Tank" : idx === 1 ? "2. Water" : "3. Cycle"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Global Progress Bar */}
      <div className="mt-8 glass rounded-full p-1 border border-border flex items-center gap-4 px-4 py-2 text-xs md:text-sm shadow-inner">
        <span className="font-semibold text-muted-foreground shrink-0">Setup Progress:</span>
        <div className="flex-1 bg-muted/60 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="font-bold text-cyan-600 dark:text-cyan-400 shrink-0">{progressPercent}% Done</span>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-background min-h-screen pb-20">

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white border-b border-cyan-950 shadow-2xl rounded-b-[2rem] md:rounded-b-[3.5rem]">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#082f49_1px,transparent_1px),linear-gradient(to_bottom,#082f49_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs md:text-sm font-semibold mb-6 animate-pulse">
            <Award className="w-4 h-4" /> Interactive Beginner Checklist
          </div>

          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6 tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Your First Aquarium, <br className="hidden md:block" /> Step by Step.
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            A foolproof guide to setting up a healthy, thriving ecosystem. Avoid the common mistakes that kill fish and frustrate beginners. Track your progress with our step-by-step checklist.
          </p>

          {checkedCount > 0 && (
            <button
              onClick={handleReset}
              className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/50"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Guide Progress
            </button>
          )}
        </div>
      </section>

      {/* Stepper Navigation */}
      <section className="relative -mt-10 z-20">
        {renderStepper()}
      </section>

      {/* Active Step Panel / Celebration State */}
      <section className="container mx-auto px-4 max-w-6xl mt-4">
        <AnimatePresence mode="wait">
          {showCelebration ? (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl mx-auto glass p-8 md:p-12 rounded-3xl border border-emerald-500/30 shadow-2xl text-center relative overflow-hidden"
            >
              {/* Confetti-like ambient glows */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 mb-8 shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-bounce">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Aquarium Ecosystem Prepared!
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10">
                Excellent job! You have chosen a proper tank, conditioned the water, and completed the nitrogen cycle. Your aquatic environment is officially ready to welcome its first inhabitants safely.
              </p>

              <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto text-left">
                {/* Path 1: Fish */}
                <Link
                  href="/fish"
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Fish className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 group-hover:text-cyan-500 transition-colors">Choose Your Fish</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Browse beginner-friendly freshwater species selected for hardiness and ease of care.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-cyan-500 dark:text-cyan-400 mt-4 flex items-center gap-1">
                    Explore Hardy Fish <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </Link>

                {/* Path 2: Plants */}
                <Link
                  href="/plants"
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-emerald-500/40 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Leaf className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 group-hover:text-emerald-500 transition-colors">Select Aquatic Plants</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Add live plants to assist with natural biological filtration and beautify your landscape.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-500 mt-4 flex items-center gap-1">
                    Browse Easy Plants <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <button
                  onClick={() => {
                    setShowCelebration(false);
                    setCurrentStepIndex(0);
                  }}
                  className="px-6 py-2.5 rounded-full border border-border hover:bg-muted text-sm font-semibold transition-colors"
                >
                  View Steps Again
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Details & Interactive Checkbox list */}
              <div className="lg:col-span-8 space-y-6">
                <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 dark:border-white/5 shadow-xl relative overflow-hidden">

                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                      Step {currentStep.step} of 3
                    </span>
                    {isStepCompleted(currentStepIndex) && (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full animate-fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Step Checked!
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-4">{currentStep.title}</h2>
                  <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">{currentStep.description}</p>

                  {/* Interactive Checklist section */}
                  <div className="p-5 md:p-6 rounded-2xl bg-muted/30 dark:bg-slate-900/30 border border-border mb-8 shadow-inner">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-500" /> Complete these actions:
                    </h3>

                    <div className="space-y-3.5">
                      {currentChecklist.map((item) => {
                        const isChecked = !!checkedItems[item.id];
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleToggleCheck(item.id)}
                            className={`flex gap-3.5 items-start p-4 rounded-xl border cursor-pointer transition-all ${isChecked
                              ? "bg-emerald-500/5 border-emerald-500/30 dark:bg-emerald-500/5 dark:border-emerald-500/20"
                              : "bg-card border-border hover:border-cyan-500/30 dark:hover:border-cyan-500/20 hover:shadow-sm"
                              }`}
                          >
                            <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${isChecked
                              ? "bg-emerald-500 border-emerald-400 text-slate-950"
                              : "border-muted-foreground/40 bg-background"
                              }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className={`text-sm md:text-base leading-tight select-none transition-colors ${isChecked
                              ? "text-muted-foreground line-through decoration-emerald-500/40"
                              : "text-foreground"
                              }`}>
                              {item.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Gear & Utility Grid */}
                  <div className="grid gap-5 md:grid-cols-2">
                    {/* What to Buy */}
                    {currentStep.whatToBuy && (
                      <div className="p-5 rounded-2xl bg-cyan-500/5 dark:bg-cyan-950/20 border border-cyan-500/10 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-cyan-600 dark:text-cyan-400 mb-3 flex items-center gap-2">
                            <ShoppingBag className="w-4.5 h-4.5" /> Essential Gear
                          </h4>
                          <p className="text-sm text-foreground/80 leading-relaxed">{currentStep.whatToBuy}</p>
                        </div>
                      </div>
                    )}

                    {/* Why Needed */}
                    {currentStep.whyNeeded && (
                      <div className="p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/10 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
                            <Info className="w-4.5 h-4.5" /> Why It Matters
                          </h4>
                          <p className="text-sm text-foreground/80 leading-relaxed">{currentStep.whyNeeded}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stepper navigation footer */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => {
                      if (currentStepIndex > 0) {
                        setCurrentStepIndex(currentStepIndex - 1);
                      }
                    }}
                    disabled={currentStepIndex === 0}
                    className={`px-5 py-3 rounded-xl border text-sm font-semibold flex items-center gap-1.5 transition-colors ${currentStepIndex === 0
                      ? "opacity-0 cursor-default"
                      : "border-border hover:bg-muted bg-card cursor-pointer"
                      }`}
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous Step
                  </button>

                  {currentStepIndex === starterGuideSteps.length - 1 ? (
                    <button
                      onClick={() => setShowCelebration(true)}
                      className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all cursor-pointer ${isStepCompleted(currentStepIndex)
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:brightness-105"
                        : "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                        }`}
                    >
                      Finish Setup Guide <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                      className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Danger Warnings & Pro Recommendations */}
              <div className="lg:col-span-4 space-y-6">

                {/* Warning Callout */}
                {currentStep.commonMistakes && (
                  <div className="p-6 rounded-3xl bg-amber-500/5 dark:bg-amber-950/10 border border-amber-500/20 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.02] rounded-full blur-xl" />

                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-sm text-amber-600 dark:text-amber-500 uppercase tracking-wider">
                        Beginner Pitfall
                      </span>
                    </div>

                    <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                      {currentStep.commonMistakes}
                    </p>
                  </div>
                )}

                {/* Pro Tips Recommendation */}
                {currentStep.recommendation && (
                  <div className="p-6 rounded-3xl bg-cyan-500/5 dark:bg-cyan-950/10 border border-cyan-500/20 shadow-md relative overflow-hidden">
                    {/* Glowing highlight border */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />

                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                        <Sparkles className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-sm text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                        Pro Recommendation
                      </span>
                    </div>

                    <p className="text-sm text-foreground/80 leading-relaxed font-sans font-medium">
                      {currentStep.recommendation}
                    </p>
                  </div>
                )}

                {/* Helpful tips panel */}
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-1.5 text-muted-foreground uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4" /> Need Extra Help?
                  </h4>
                  <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                    <li>
                      <Link href="/water-params" className="text-cyan-500 dark:text-cyan-400 hover:underline">
                        Learn about water chemistry
                      </Link>
                    </li>
                    <li>
                      <Link href="/equipment" className="text-cyan-500 dark:text-cyan-400 hover:underline">
                        View recommended filters & heaters
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
}
