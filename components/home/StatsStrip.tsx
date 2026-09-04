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
      icon: <Fish className="w-5 h-5 text-[#F7F7FF]" />,
    },
    {
      label: 'Aquatic Flora',
      value: `${plants} Species`,
      sub: 'Carpeting, Stem & Epiphytes',
      icon: <Leaf className="w-5 h-5 text-[#aca1f7]" />,
    },
    {
      label: 'Hardware Guides',
      value: `${equipment} Guides`,
      sub: 'Filters, Heaters & Lighting',
      icon: <Wrench className="w-5 h-5 text-[#F7F7FF]" />,
    },
    {
      label: 'Care Philosophy',
      value: 'Evidence-Based',
      sub: 'Natural Husbandry Practices',
      icon: <ShieldCheck className="w-5 h-5 text-[#aca1f7]" />,
    },
  ];

  return (
    <section className="w-full bg-[#14094a] border-y border-[#27187E] py-8 relative text-left">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsItems.map((stat, i) => (
            <div 
              key={i} 
              className="flex items-start gap-3.5"
            >
              <div className="p-2.5 rounded-xl bg-[#27187E] border border-[#3622a6] shrink-0 mt-0.5 shadow-sm">
                {stat.icon}
              </div>
              <div className="min-w-0">
                <span className="block text-xl sm:text-2xl font-bold text-[#F7F7FF] font-display tracking-wider leading-none">
                  {stat.value}
                </span>
                <span className="block text-xs font-condensed uppercase tracking-wider text-[#aca1f7] mt-1">
                  {stat.label}
                </span>
                <span className="block text-[11px] text-[#F7F7FF]/60 truncate font-sans">
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
