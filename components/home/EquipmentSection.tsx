'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Settings2 } from 'lucide-react';
import { equipmentData } from '@/data/equipment';
import { useStats } from '@/components/home/StatsContext';

export default function EquipmentSection() {
  const { setEquipmentCount } = useStats();

  useEffect(() => {
    if (typeof setEquipmentCount === 'function') {
      setEquipmentCount(equipmentData.length);
    }
  }, []);

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold mb-4">
              <Settings2 className="w-4 h-4" /> Essential Gear
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-foreground">
              Equipment Overview
            </h2>
            <p className="text-lg text-muted-foreground">
              From filtration to lighting, discover the necessary hardware to keep your aquatic ecosystem thriving and stable.
            </p>
          </div>
          <Link 
            href="/equipment" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-amber-500 hover:text-amber-600 transition-colors font-medium whitespace-nowrap shrink-0"
          >
            View All Equipment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipmentData.slice(0, 3).map((item) => (
            <div key={item.id} className="group rounded-3xl p-6 bg-card border border-border hover:shadow-xl transition-all flex flex-col h-full">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 bg-muted">
                {/* Fallback to generic image if specific not found */}
                <Image src={item.image || "/hero_aquarium.jpg"} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/90 backdrop-blur-md rounded-full text-xs font-bold shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{item.name}</h3>
              <p className="text-muted-foreground mb-6 flex-grow line-clamp-3">
                {item.description}
              </p>
              <Link href={`/equipment/${item.slug}`} className="font-semibold text-amber-600 group-hover:text-amber-500 inline-flex items-center gap-1 mt-auto">
                Read Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
