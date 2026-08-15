'use client';
import { useStats } from '@/components/home/StatsContext';
import { Fish, Leaf, Settings, BookOpen } from 'lucide-react';

export default function StatsStrip() {
  const { fish, plants, equipment, careTopics } = useStats();

  const statsItems = [
    {
      label: 'Fish Species',
      value: fish,
      icon: <Fish className="w-6 h-6 text-cyan-400" />,
      colorClass: 'text-cyan-400',
      shadowClass: 'hover:shadow-cyan-500/10',
      borderClass: 'hover:border-cyan-500/30',
      bgGlow: 'from-cyan-500/10 to-transparent',
    },
    {
      label: 'Live Plants',
      value: plants,
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      colorClass: 'text-emerald-400',
      shadowClass: 'hover:shadow-emerald-500/10',
      borderClass: 'hover:border-emerald-500/30',
      bgGlow: 'from-emerald-500/10 to-transparent',
    },
    {
      label: 'Equipment Guides',
      value: equipment,
      icon: <Settings className="w-6 h-6 text-amber-400" />,
      colorClass: 'text-amber-400',
      shadowClass: 'hover:shadow-amber-500/10',
      borderClass: 'hover:border-amber-500/30',
      bgGlow: 'from-amber-500/10 to-transparent',
    },
    {
      label: 'Ecosystem Guides',
      value: careTopics,
      icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      colorClass: 'text-indigo-400',
      shadowClass: 'hover:shadow-indigo-500/10',
      borderClass: 'hover:border-indigo-500/30',
      bgGlow: 'from-indigo-500/10 to-transparent',
    },
  ];

  return (
    <section className="relative z-20 -mt-12 px-4 max-w-6xl mx-auto w-full">
      <div className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsItems.map((stat, i) => (
          <div 
            key={i} 
            className={`relative overflow-hidden group flex items-center gap-4 p-5 rounded-2xl bg-slate-900/40 dark:bg-slate-950/20 border border-slate-850 hover:bg-slate-900/70 transition-all duration-500 shadow-sm hover:shadow-lg ${stat.shadowClass} ${stat.borderClass} transform hover:-translate-y-1`}
          >
            {/* Background Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            
            {/* Icon Wrapper */}
            <div className="relative z-10 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 group-hover:border-slate-700/60 flex items-center justify-center transition-all duration-500 group-hover:rotate-[12deg] shrink-0">
              {stat.icon}
            </div>

            {/* Content */}
            <div className="relative z-10 min-w-0">
              <span className={`text-3xl md:text-4xl font-poppins font-bold block leading-none tracking-tight ${stat.colorClass} group-hover:scale-105 origin-left transition-transform duration-500`}>
                {stat.value}+
              </span>
              <span className="text-xs font-semibold tracking-wide text-slate-400 group-hover:text-slate-300 transition-colors uppercase mt-1 block truncate">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
