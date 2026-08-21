'use client';

import { useState, useEffect } from 'react';
import { CalendarDays, Droplets, Scissors, FlaskConical, Filter, Check, RotateCcw } from 'lucide-react';
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
        { name: 'Feed fish (1-2 times, only what they eat in 2 mins)', icon: <FishIcon className="w-4 h-4 text-cyan-500" /> },
        { name: 'Check temperature and filter flow', icon: <ThermometerIcon className="w-4 h-4 text-orange-500" /> },
        { name: 'Observe fish behavior and health', icon: <Eye className="w-4 h-4 text-emerald-500" /> }
      ]
    },
    {
      period: 'Weekly',
      tasks: [
        { name: 'Change 20-30% of water', icon: <Droplets className="w-4 h-4 text-blue-500" /> },
        { name: 'Siphon gravel to remove waste', icon: <Droplets className="w-4 h-4 text-blue-500" /> },
        { name: 'Scrape algae from glass', icon: <Scissors className="w-4 h-4 text-purple-500" /> },
        { name: 'Test water parameters', icon: <FlaskConical className="w-4 h-4 text-amber-500" /> }
      ]
    },
    {
      period: 'Monthly',
      tasks: [
        { name: 'Rinse filter media in old tank water', icon: <Filter className="w-4 h-4 text-indigo-500" /> },
        { name: 'Trim overgrown plants', icon: <Scissors className="w-4 h-4 text-emerald-500" /> },
        { name: 'Check expiration on test kits & food', icon: <CalendarDays className="w-4 h-4 text-rose-500" /> }
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

    // Calculate total checked across all periods to trigger achievement
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

  if (!isMounted) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          Loading maintenance schedule...
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold mb-4">
            <CalendarDays className="w-4 h-4" /> Routine Care
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-foreground">
            Aquarium Maintenance Schedule
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Consistency is the secret to a crystal clear, algae-free, and healthy aquarium. Spend 20 minutes a week to save hours of headaches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {schedule.map((item, idx) => {
            const periodChecked = checkedState[item.period];
            const percent = Math.round((periodChecked.length / item.tasks.length) * 100);
            
            return (
              <div key={idx} className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl transition-shadow relative overflow-hidden group flex flex-col justify-between">
                <div className="absolute -top-6 -right-6 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:scale-110 pointer-events-none">
                  <CalendarDays className="w-32 h-32 text-foreground" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-foreground">{item.period} Tasks</h3>
                    {periodChecked.length > 0 && (
                      <button 
                        onClick={() => handleResetPeriod(item.period)}
                        className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-0.5 cursor-pointer"
                        title="Reset category tasks"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                      <div 
                        className="bg-cyan-500 h-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {periodChecked.length} of {item.tasks.length} completed
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {item.tasks.map((task, tIdx) => {
                      const isTaskChecked = periodChecked.includes(task.name);
                      return (
                        <li 
                          key={tIdx} 
                          onClick={() => toggleTask(item.period, task.name)}
                          className={`flex items-start gap-3 cursor-pointer p-2 rounded-xl border transition-colors select-none ${
                            isTaskChecked 
                              ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20' 
                              : 'border-transparent hover:bg-muted/40'
                          }`}
                        >
                          <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isTaskChecked 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'border-muted-foreground/30'
                          }`}>
                            {isTaskChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          
                          <div className="flex items-start gap-2.5 min-w-0 flex-1">
                            <div className="mt-0.5 p-1 bg-muted rounded shrink-0">
                              {task.icon}
                            </div>
                            <span className={`text-sm font-medium transition-all ${
                              isTaskChecked ? 'text-muted-foreground line-through' : 'text-slate-700 dark:text-slate-350'
                            }`}>
                              {task.name}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Minimal icons for the missing ones in lucide
function FishIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 1.11 0 2.05.23 3 .5h2c-1.15 2.15-2.02 5.02-2.02 8.5S18.85 21.35 20 23.5h-2c-.95.27-1.89.5-3 .5-3.56 0-7.56-2.54-8.5-6C4.5 18 2 19 2 19s1-3.5 1-7c0-3.5-1-7-1-7s2.5 1 4.5 7z" />
    </svg>
  );
}
function ThermometerIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}
function Eye(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

