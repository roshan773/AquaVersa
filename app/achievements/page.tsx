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
import SubpageHero from '@/components/ui/SubpageHero';
import GlobalCTA from '@/components/ui/GlobalCTA';

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
    title: 'Water Master Chemist',
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
      <div className="min-h-[80vh] flex items-center justify-center text-[#27187E]/70 bg-[#F7F7FF] font-readable text-base font-semibold">
        Loading keeper achievements...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F7FF] text-[#27187E] min-h-screen">
      <SubpageHero
        badge="KEEPER MILESTONES & BADGES"
        title="AQUARIUM ACHIEVEMENTS"
        description="Track your learning milestones across chemistry, biology, stocking, and aquascaping tools to achieve Master Aquarist status."
      />

      <section className="py-12 md:py-16 px-4 md:px-8 font-readable">
        <div className="container mx-auto max-w-5xl">
          
          {/* Progress dashboard bar */}
          <div className="bg-white border-2 border-[#27187E]/15 p-6 md:p-8 rounded-3xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm text-left">
            <div className="space-y-2 w-full md:w-2/3">
              <div className="flex justify-between items-center text-xs md:text-sm font-bold text-[#27187E]/70 uppercase tracking-wider">
                <span>Achievements Unlocked</span>
                <span className="text-[#27187E] font-black">{unlockedCount} of {achievementsList.length} ({percent}%)</span>
              </div>
              <div className="w-full bg-[#EDEAFC] h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-[#27187E] h-full transition-all duration-500 ease-out rounded-full" 
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto shrink-0 justify-end">
              {unlockedCount > 0 && (
                <button
                  onClick={handleReset}
                  className="py-3 px-6 border-2 border-[#27187E]/20 hover:border-[#27187E] text-[#27187E] rounded-full transition-all font-bold text-xs md:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Badges
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
                  className={`border-2 rounded-3xl p-6 md:p-8 transition-all relative overflow-hidden flex flex-col justify-between ${
                    isUnlocked 
                      ? 'bg-white border-[#27187E] shadow-sm' 
                      : 'bg-white/60 border-[#27187E]/15 opacity-80'
                  }`}
                >
                  <div>
                    {/* Header with Icon & State */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 select-none ${
                        isUnlocked 
                          ? 'bg-[#27187E] border-[#27187E] text-white' 
                          : 'bg-[#EDEAFC] border-[#27187E]/20 text-[#27187E]/60'
                      }`}>
                        {isUnlocked ? (
                          <ach.icon className="w-7 h-7" strokeWidth={2} aria-hidden="true" />
                        ) : (
                          <Lock className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
                        )}
                      </div>

                      {isUnlocked ? (
                        <span className="bg-[#EDEAFC] text-[#27187E] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#27187E]/20 flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                        </span>
                      ) : (
                        <span className="bg-[#F7F7FF] text-[#27187E]/60 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#27187E]/15 flex items-center gap-1 shrink-0">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-bold text-lg md:text-xl text-[#27187E] leading-snug mb-2 font-readable">
                      {ach.title}
                    </h3>

                    <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed mb-4">
                      {isUnlocked ? ach.description : `Criteria: ${ach.description}`}
                    </p>

                    {!isUnlocked && (
                      <div className="p-4 bg-[#EDEAFC]/70 border border-[#27187E]/20 rounded-2xl text-xs md:text-sm text-[#27187E]/90 flex gap-2.5 leading-relaxed mb-4">
                        <HelpCircle className="w-5 h-5 text-[#27187E] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#27187E] block font-black uppercase tracking-wider text-xs mb-0.5">How to unlock:</strong>
                          {ach.unlockHint}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-[#27187E]/10">
                    <Link 
                      href={ach.link}
                      className="text-sm md:text-base font-bold text-[#27187E] hover:underline flex items-center gap-1.5"
                    >
                      {ach.linkLabel} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <GlobalCTA
        badge="CONTINUE YOUR AQUATIC JOURNEY"
        title={
          <>
            Ready to test your knowledge <br className="hidden sm:inline" />
            and unlock more badges?
          </>
        }
        description="Take the science quiz, simulate water parameters, and assemble an aquascape to achieve Master Aquarist ranking."
        primaryAction={{
          label: 'Take Aquarium Quiz',
          href: '/quiz',
        }}
        secondaryAction={{
          label: 'Open Water Analyzer',
          href: '/water-analyzer',
        }}
      />
    </div>
  );
}
