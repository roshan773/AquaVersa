'use client';

import { useStats } from '@/components/home/StatsContext';
import { Fish, Leaf, Wrench, ShieldCheck } from 'lucide-react';

export default function StatsStrip() {
  const { fish, plants, equipment } = useStats();

  const statsItems = [
    {
      label: 'Documented Species',
      value: `${fish} Profiles`,
      sub: 'Freshwater & Marine',
      icon: <Fish className="w-5 h-5 text-teal-400" />,
    },
    {
      label: 'Aquatic Flora',
      value: `${plants} Species`,
      sub: 'Carpeting, Stem & Epiphytes',
      icon: <Leaf className="w-5 h-5 text-emerald-400" />,
    },
    {
      label: 'Hardware Guides',
      value: `${equipment} Guides`,
      sub: 'Filters, Heaters & Lighting',
      icon: <Wrench className="w-5 h-5 text-sky-400" />,
    },
    {
      label: 'Care Philosophy',
      value: 'Evidence-Based',
      sub: 'Natural Husbandry Practices',
      icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
    },
  ];

  return (
    <section className="w-full bg-[#040a14] border-y border-slate-800/80 py-8 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsItems.map((stat, i) => (
            <div 
              key={i} 
              className="flex items-start gap-3.5 text-left"
            >
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                {stat.icon}
              </div>
              <div className="min-w-0">
                <span className="block text-sm sm:text-base font-bold text-white font-poppins">
                  {stat.value}
                </span>
                <span className="block text-xs font-medium text-slate-300">
                  {stat.label}
                </span>
                <span className="block text-[11px] text-slate-500 truncate">
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
