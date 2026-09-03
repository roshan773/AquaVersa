'use client';

import { useState, useEffect, useRef } from 'react';
import { useStats } from '@/components/home/StatsContext';
import { Fish, Leaf, Settings } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 1200 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isIntersecting, value, duration]);

  return <span ref={elementRef}>{count}</span>;
};

export default function StatsStrip() {
  const { fish, plants, equipment } = useStats();

  const statsItems = [
    {
      label: 'Fish Species Profiles',
      value: fish,
      code: 'DB_SPECIES',
      icon: <Fish className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />,
      bgGlow: 'from-cyan-500/15 to-transparent',
      borderColor: 'group-hover:border-cyan-400/40',
      iconBorder: 'border-cyan-500/20 group-hover:border-cyan-400/40 bg-cyan-950/40'
    },
    {
      label: 'Live Aquatic Plants',
      value: plants,
      code: 'FLORA_PARAMS',
      icon: <Leaf className="w-6 h-6 text-teal-400 group-hover:text-teal-300" />,
      bgGlow: 'from-teal-500/15 to-transparent',
      borderColor: 'group-hover:border-teal-400/40',
      iconBorder: 'border-teal-500/20 group-hover:border-teal-400/40 bg-teal-950/40'
    },
    {
      label: 'Hardware & Spec Guides',
      value: equipment,
      code: 'GEAR_AUDIT',
      icon: <Settings className="w-6 h-6 text-rose-400 group-hover:text-rose-300" />,
      bgGlow: 'from-rose-500/15 to-transparent',
      borderColor: 'group-hover:border-rose-400/40',
      iconBorder: 'border-rose-500/20 group-hover:border-rose-400/40 bg-rose-950/40'
    },
  ];

  return (
    <section className="w-full bg-[#020610] border-y border-cyan-500/15 py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-rose-500/10 rounded-full blur-[90px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsItems.map((stat, i) => (
            <div 
              key={i} 
              className={`relative overflow-hidden group flex items-center justify-between p-6 rounded-3xl bg-[#061224]/70 border border-cyan-500/15 hover:bg-[#071830]/90 transition-all duration-500 shadow-xl ${stat.borderColor} transform hover:-translate-y-1 backdrop-blur-md`}
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              {/* Content */}
              <div className="relative z-10 min-w-0 text-left space-y-1">
                <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-400/80 uppercase">
                  // {stat.code}
                </div>
                <span className="text-3xl sm:text-4xl font-poppins font-extrabold block leading-none tracking-tight text-white group-hover:text-cyan-100 transition-colors">
                  <AnimatedCounter value={stat.value} />+
                </span>
                <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase block truncate">
                  {stat.label}
                </span>
              </div>

              {/* Icon Wrapper */}
              <div className={`relative z-10 p-3.5 rounded-2xl border ${stat.iconBorder} flex items-center justify-center transition-all duration-500 group-hover:scale-110 shrink-0`}>
                {stat.icon}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
