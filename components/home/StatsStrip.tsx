'use client';
import { useStats } from '@/components/home/StatsContext';
import { Fish, Leaf, Settings, BookOpen } from 'lucide-react';

export default function StatsStrip() {
  const { fish, plants, equipment, careTopics } = useStats();

  const statsItems = [
    {
      label: 'Fish Species',
      value: fish,
      icon: <Fish className="w-5 h-5 text-cyan-500" />,
      colorClass: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/20',
    },
    {
      label: 'Live Plants',
      value: plants,
      icon: <Leaf className="w-5 h-5 text-emerald-500" />,
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20',
    },
    {
      label: 'Equipment Guides',
      value: equipment,
      icon: <Settings className="w-5 h-5 text-amber-500" />,
      colorClass: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20',
    },
    {
      label: 'Ecosystem Guides',
      value: careTopics,
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
      colorClass: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/20',
    },
  ];

  return (
    <section className="relative z-20 -mt-10 px-4 max-w-5xl mx-auto w-full">
      <div className="glass rounded-3xl p-6 md:p-8 border border-border shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {statsItems.map((stat, i) => (
          <div 
            key={i} 
            className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/60 hover:border-cyan-500/30 hover:shadow-md transition-all duration-300 group transform hover:-translate-y-0.5"
          >
            <div className={`p-3 rounded-xl border flex-shrink-0 transition-transform group-hover:scale-105 duration-300 ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <span className={`text-2xl md:text-3xl font-poppins font-bold block leading-none ${stat.colorClass}`}>
                {stat.value}+
              </span>
              <span className="text-xs md:text-sm font-medium text-muted-foreground mt-1 block">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
