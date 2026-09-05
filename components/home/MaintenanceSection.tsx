'use client';

import { useState, useEffect } from 'react';
import { CalendarDays, Droplets, Scissors, FlaskConical, Filter, Check, RotateCcw, Fish, Thermometer, Eye, Sparkles } from 'lucide-react';
import { storage, KEYS, unlockAchievement } from '@/lib/storage';

interface MaintenanceTask {
  name: string;
  icon: React.ReactNode;
}

interface PeriodSchedule {
  period: 'Daily' | 'Weekly' | 'Monthly';
  tasks: MaintenanceTask[];
}

interface MaintenanceState {
  Daily: string[];
  Weekly: string[];
  Monthly: string[];
}

export default function MaintenanceSection() {
  const [checkedState, setCheckedState] = useState<MaintenanceState>({
    Daily: [],
    Weekly: [],
    Monthly: []
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setCheckedState(storage.get<MaintenanceState>(KEYS.MAINTENANCE, {
      Daily: [],
      Weekly: [],
      Monthly: []
    }));
    setIsMounted(true);
  }, []);

  const schedule: PeriodSchedule[] = [
    {
      period: 'Daily',
      tasks: [
        { name: 'Feed fish (1-2 times, only what they consume in 2 mins)', icon: <Fish className="w-4 h-4 text-[#27187e]" /> },
        { name: 'Check thermometer & filter turnover flow', icon: <Thermometer className="w-4 h-4 text-[#27187e]" /> },
        { name: 'Observe fish swimming behavior & respiratory rates', icon: <Eye className="w-4 h-4 text-[#27187e]" /> }
      ]
    },
    {
      period: 'Weekly',
      tasks: [
        { name: 'Change 20–30% of water volume with dechlorinator', icon: <Droplets className="w-4 h-4 text-[#27187e]" /> },
        { name: 'Siphon substrate gravel to remove organic debris', icon: <Droplets className="w-4 h-4 text-[#27187e]" /> },
        { name: 'Scrape glass algae and clean view panels', icon: <Scissors className="w-4 h-4 text-[#27187e]" /> },
        { name: 'Test pH, Ammonia, Nitrite, and Nitrate', icon: <FlaskConical className="w-4 h-4 text-[#27187e]" /> }
      ]
    },
    {
      period: 'Monthly',
      tasks: [
        { name: 'Rinse coarse filter sponge in siphoned tank water', icon: <Filter className="w-4 h-4 text-[#27187e]" /> },
        { name: 'Trim overgrown stem plants & remove dead leaves', icon: <Scissors className="w-4 h-4 text-[#27187e]" /> },
        { name: 'Check expiration on reagent test kits & food packs', icon: <CalendarDays className="w-4 h-4 text-[#27187e]" /> }
      ]
    }
  ];

  const toggleTask = (period: 'Daily' | 'Weekly' | 'Monthly', taskName: string) => {
    const current = checkedState[period];
    const isChecked = current.includes(taskName);
    let updated: string[];

    if (isChecked) {
      updated = current.filter(t => t !== taskName);
    } else {
      updated = [...current, taskName];
    }

    const newState = {
      ...checkedState,
      [period]: updated
    };

    setCheckedState(newState);
    storage.set(KEYS.MAINTENANCE, newState);

    const totalTasks = schedule.reduce((sum, p) => sum + p.tasks.length, 0);
    const totalChecked = newState.Daily.length + newState.Weekly.length + newState.Monthly.length;

    if (totalChecked === totalTasks) {
      unlockAchievement('maintenance-checklist');
    }
  };

  const handleResetPeriod = (period: 'Daily' | 'Weekly' | 'Monthly') => {
    const newState = {
      ...checkedState,
      [period]: []
    };
    setCheckedState(newState);
    storage.set(KEYS.MAINTENANCE, newState);
  };

  return (
    <section className="py-24 bg-[#ffffff] border-t-2 border-b-2 border-[#cfcaf5] text-left marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <CalendarDays className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Aquarium Maintenance Protocol</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#27187e] tracking-tight">
            Husbandry &amp; Care Schedule
          </h2>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl mt-3 leading-relaxed">
            Consistent routine care prevents waste buildup and disease outbreaks. Check off completed items to track your aquarium routine.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-readable">
          {schedule.map((item) => {
            const checkedCount = isMounted ? checkedState[item.period]?.length || 0 : 0;
            const totalCount = item.tasks.length;
            const isAllCompleted = checkedCount === totalCount && totalCount > 0;

            return (
              <div
                key={item.period}
                className="bg-[#f7f7ff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#edeafc]">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display text-2xl sm:text-3xl text-[#27187e]">
                        {item.period} Tasks
                      </span>
                      {isAllCompleted && (
                        <span className="bg-[#27187e] text-[#f7f7ff] text-xs font-bold px-2 py-0.5 rounded-md">
                          Done
                        </span>
                      )}
                    </div>

                    {checkedCount > 0 && (
                      <button
                        onClick={() => handleResetPeriod(item.period)}
                        className="text-xs font-semibold text-[#27187e]/70 hover:text-[#27187e] flex items-center gap-1 cursor-pointer"
                        title="Reset task group"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    {item.tasks.map((task) => {
                      const isChecked = isMounted && checkedState[item.period]?.includes(task.name);

                      return (
                        <button
                          key={task.name}
                          onClick={() => toggleTask(item.period, task.name)}
                          className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer shadow-sm ${
                            isChecked
                              ? 'bg-[#edeafc] border-[#27187e] text-[#27187e]'
                              : 'bg-[#ffffff] border-[#cfcaf5] hover:border-[#27187e] text-[#27187e]'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? 'bg-[#27187e] border-[#27187e] text-[#f7f7ff]'
                                : 'border-[#cfcaf5] bg-[#ffffff]'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                          </div>

                          <div className="flex-1 text-sm font-medium leading-snug">
                            <span className={isChecked ? 'line-through opacity-70' : ''}>
                              {task.name}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#edeafc] flex items-center justify-between text-xs text-[#27187e]/70 font-semibold uppercase tracking-wider">
                  <span>Progress</span>
                  <span>{checkedCount} / {totalCount} completed</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
