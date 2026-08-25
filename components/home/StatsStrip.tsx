'use client';
import { useStats } from '@/components/home/StatsContext';
import { Fish, Leaf, Settings } from 'lucide-react';

export default function StatsStrip() {
  const { fish, plants, equipment } = useStats();

  const statsItems = [
    {
      label: 'Fish Species',
      value: fish,
      icon: <Fish className="w-6 h-6 text-red-500" />,
      bgGlow: 'from-red-500/5 to-transparent',
    },
    {
      label: 'Live Plants',
      value: plants,
      icon: <Leaf className="w-6 h-6 text-red-500" />,
      bgGlow: 'from-red-500/5 to-transparent',
    },
    {
      label: 'Equipment Guides',
      value: equipment,
      icon: <Settings className="w-6 h-6 text-red-500" />,
      bgGlow: 'from-red-500/5 to-transparent',
    },
  ];

  return (
    <section className="w-full bg-[#030303] border-y border-red-500/10 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.02),transparent_70%)]" />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsItems.map((stat, i) => (
            <div 
              key={i} 
              className="relative overflow-hidden group flex items-center gap-5 p-6 rounded-2xl bg-black/40 border border-red-500/10 hover:bg-black/60 transition-all duration-500 shadow-sm hover:shadow-lg hover:border-red-500/30 transform hover:-translate-y-1"
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              {/* Icon Wrapper */}
              <div className="relative z-10 p-3.5 rounded-xl bg-black border border-red-500/15 group-hover:border-red-500/40 flex items-center justify-center transition-all duration-500 group-hover:rotate-[12deg] shrink-0">
                {stat.icon}
              </div>

              {/* Content */}
              <div className="relative z-10 min-w-0 text-left">
                <span className="text-3xl md:text-4xl font-poppins font-extrabold block leading-none tracking-tight text-white group-hover:scale-105 origin-left transition-transform duration-500">
                  {stat.value}+
                </span>
                <span className="text-xs font-bold tracking-widest text-slate-400 group-hover:text-slate-350 transition-colors uppercase mt-1.5 block truncate">
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
