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
      label: 'Fish Species',
      value: fish,
      icon: <Fish className="w-6 h-6 text-amber-500 group-hover:text-amber-400" />,
      bgGlow: 'from-amber-500/10 to-transparent',
      borderColor: 'group-hover:border-amber-500/30',
      iconBorder: 'border-amber-500/10 group-hover:border-amber-500/30'
    },
    {
      label: 'Live Plants',
      value: plants,
      icon: <Leaf className="w-6 h-6 text-amber-550 group-hover:text-amber-400" />,
      bgGlow: 'from-amber-500/10 to-transparent',
      borderColor: 'group-hover:border-amber-500/30',
      iconBorder: 'border-amber-500/10 group-hover:border-amber-500/30'
    },
    {
      label: 'Equipment Guides',
      value: equipment,
      icon: <Settings className="w-6 h-6 text-amber-500 group-hover:text-amber-400" />,
      bgGlow: 'from-amber-500/10 to-transparent',
      borderColor: 'group-hover:border-amber-500/30',
      iconBorder: 'border-amber-500/10 group-hover:border-amber-500/30'
    },
  ];

  return (
    <section className="w-full bg-[#000000] border-y border-slate-900 py-12 relative overflow-hidden">
      {/* Soft background ambient blurs */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] bg-amber-955/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-amber-955/20 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsItems.map((stat, i) => (
            <div 
              key={i} 
              className={`relative overflow-hidden group flex items-center gap-5 p-6 rounded-2xl bg-slate-950/40 border border-slate-900/80 hover:bg-slate-900/20 transition-all duration-500 shadow-sm hover:shadow-lg ${stat.borderColor} transform hover:-translate-y-1`}
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              {/* Icon Wrapper */}
              <div className={`relative z-10 p-3.5 rounded-xl bg-slate-950/80 border ${stat.iconBorder} flex items-center justify-center transition-all duration-500 group-hover:rotate-[12deg] shrink-0`}>
                {stat.icon}
              </div>

              {/* Content */}
              <div className="relative z-10 min-w-0 text-left">
                <span className="text-3xl md:text-4xl font-poppins font-extrabold block leading-none tracking-tight text-white group-hover:scale-105 origin-left transition-transform duration-500">
                  <AnimatedCounter value={stat.value} />+
                </span>
                <span className="text-xs font-bold tracking-widest text-slate-400 group-hover:text-slate-350 transition-colors uppercase mt-2 block truncate">
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
