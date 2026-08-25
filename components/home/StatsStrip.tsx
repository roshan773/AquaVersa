'use client';
import { useStats } from '@/components/home/StatsContext';
import { Fish, Leaf, Settings } from 'lucide-react';

export default function StatsStrip() {
  const { fish, plants, equipment } = useStats();

  const statsItems = [
    {
      label: 'Fish Species Database',
      value: fish,
      icon: <Fish className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    },
    {
      label: 'Live Plant Library',
      value: plants,
      icon: <Leaf className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    },
    {
      label: 'Hardware & Equip Guides',
      value: equipment,
      icon: <Settings className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    },
  ];

  return (
    <section className="w-full bg-white dark:bg-slate-950 border-b border-slate-200/30 dark:border-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsItems.map((stat, i) => (
            <div 
              key={i} 
              className="group flex items-center gap-5 p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
            >
              {/* Icon Wrapper */}
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/15 transition-colors">
                {stat.icon}
              </div>

              {/* Content */}
              <div className="text-left">
                <span className="text-2xl md:text-3xl font-poppins font-bold block leading-none text-slate-900 dark:text-white">
                  {stat.value}+
                </span>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1 block">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
