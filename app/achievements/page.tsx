'use client';

import { useState, useEffect } from 'react';
import {
  Award,
  Lock,
  CheckCircle2,
  RotateCcw,
  HelpCircle,
  ArrowRight,
  GraduationCap,
  FlaskConical,
  Fish,
  Layers,
  Ruler,
  CalendarDays,
  type LucideIcon
} from 'lucide-react';
import { storage, KEYS } from '@/lib/storage';
import Link from 'next/link';

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockHint: string;
  icon: LucideIcon;
  link: string;
  linkLabel: string;
}

const achievementsList: Achievement[] = [
  {
    id: 'first-setup',
    title: 'Completed First Setup',
    description: 'Checked off all items in either the Freshwater or Saltwater starter checklist.',
    unlockHint: 'Go to the setup checklist and check off all essential hardware items.',
    icon: Award,
    link: '/#checklist',
    linkLabel: 'Go to Setup Checklist'
  },
  {
    id: 'quiz-pass',
    title: 'Quiz Science Expert',
    description: 'Scored 8/10 or higher on the Aquarium Science Quiz.',
    unlockHint: 'Study up on nitrogen cycling and testing, then complete the quiz with 80% accuracy.',
    icon: GraduationCap,
    link: '/quiz',
    linkLabel: 'Take the Quiz'
  },
  {
    id: 'water-check',
    title: 'Water Master chemist',
    description: 'Checked and analyzed water chemistry levels using the Water Analyzer.',
    unlockHint: 'Go to the Water Parameter Analyzer and submit your water readings.',
    icon: FlaskConical,
    link: '/water-analyzer',
    linkLabel: 'Use Water Analyzer'
  },
  {
    id: 'stocking-plan',
    title: 'Stocking Master Architect',
    description: 'Built a safe stocking layout in the Stocking Planner with 0 errors.',
    unlockHint: 'Add at least 2 compatible species to the Stocking Planner without overstocking.',
    icon: Fish,
    link: '/stocking-planner',
    linkLabel: 'Go to Stocking Planner'
  },
  {
    id: 'aquascape-plan',
    title: 'Aquascaping Artist',
    description: 'Placed at least 5 different layout elements in the Aquascape Planner.',
    unlockHint: 'Open the Aquascape Planner and add 5 plants, hardscapes, or fish to the canvas.',
    icon: Layers,
    link: '/aquascape-planner',
    linkLabel: 'Open Aquascape Planner'
  },
  {
    id: 'tank-calc',
    title: 'Aquarium Math Scholar',
    description: 'Calculated tank dimensions and reviewed gear specs in the Volume Calculator.',
    unlockHint: 'Enter your tank dimensions in the Aquarium Calculator.',
    icon: Ruler,
    link: '/tank-size',
    linkLabel: 'Open Volume Calculator'
  },
  {
    id: 'maintenance-checklist',
    title: 'Routine Care Specialist',
    description: 'Checked off and completed all care tasks in the Maintenance Planner.',
    unlockHint: 'Complete the maintenance checklist for daily, weekly, and monthly tasks.',
    icon: CalendarDays,
    link: '/#maintenance',
    linkLabel: 'Go to Maintenance Planner'
  }
];

export default function AchievementsPage() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setUnlockedIds(storage.get<string[]>(KEYS.ACHIEVEMENTS, []));
    setIsMounted(true);
  }, []);

  const handleReset = () => {
    storage.remove(KEYS.ACHIEVEMENTS);
    setUnlockedIds([]);
  };

  const unlockedCount = achievementsList.filter(a => unlockedIds.includes(a.id)).length;
  const percent = Math.round((unlockedCount / achievementsList.length) * 100);

  if (!isMounted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-muted-foreground bg-background">
        Loading achievements...
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <Award className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Aquarium Achievements</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Track your learning milestones. Complete tool tasks and pass quizzes to unlock awards and advance your ranking.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background font-sans">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Progress dashboard bar */}
          <div className="bg-card border border-border p-6 rounded-3xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md text-left">
            <div className="space-y-1.5 w-full md:w-2/3">
              <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <span>Achievements Unlocked</span>
                <span className="text-cyan-500 font-mono">{unlockedCount} of {achievementsList.length} ({percent}%)</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full transition-all duration-500 ease-out" 
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto shrink-0 justify-end">
              {unlockedCount > 0 && (
                <button
                  onClick={handleReset}
                  className="py-3 px-5 border border-border hover:bg-muted text-muted-foreground hover:text-destructive rounded-xl transition-all font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Awards
                </button>
              )}
            </div>
          </div>

          {/* Grid of achievement cards */}
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {achievementsList.map((ach) => {
              const isUnlocked = unlockedIds.includes(ach.id);
              return (
                <div 
                  key={ach.id}
                  className={`border rounded-3xl p-6 shadow-sm flex gap-4 transition-all relative overflow-hidden ${
                    isUnlocked 
                      ? 'bg-card border-emerald-500/35 hover:shadow-md' 
                      : 'bg-muted/30 border-border opacity-70'
                  }`}
                >
                  {/* Backdrop flare */}
                  {isUnlocked && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent pointer-events-none rounded-bl-3xl"></div>
                  )}

                  {/* Icon section */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border select-none ${
                    isUnlocked 
                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-background border-border text-muted-foreground opacity-60'
                  }`}>
                    {isUnlocked ? (
                      <ach.icon className="w-7 h-7" strokeWidth={1.8} aria-hidden="true" />
                    ) : (
                      <Lock className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
                    )}
                  </div>

                  {/* Copy content */}
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`font-bold text-base leading-snug ${isUnlocked ? 'text-foreground font-poppins' : 'text-muted-foreground'}`}>
                        {ach.title}
                      </h3>
                      {isUnlocked ? (
                        <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-0.5 shrink-0">
                          <CheckCircle2 className="w-3 h-3" /> Unlocked
                        </span>
                      ) : (
                        <span className="bg-slate-200 dark:bg-slate-800 text-muted-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-border flex items-center gap-0.5 shrink-0">
                          <Lock className="w-2.5 h-2.5" /> Locked
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                      {isUnlocked ? ach.description : `Unlocked by completing actions: ${ach.description}`}
                    </p>

                    {!isUnlocked ? (
                      <div className="p-3 bg-background border border-border rounded-2xl text-[11px] text-muted-foreground flex gap-1.5 leading-relaxed font-sans mt-2">
                        <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-foreground block font-bold mb-0.5 uppercase tracking-wider text-[9px]">How to unlock:</strong>
                          {ach.unlockHint}
                        </div>
                      </div>
                    ) : null}

                    {/* Quick navigation link */}
                    <div className="pt-2">
                      <Link 
                        href={ach.link}
                        className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-0.5 mt-1"
                      >
                        {ach.linkLabel} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
