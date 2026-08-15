'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';
import { plantData } from '@/data/plants';
import { useStats } from '@/components/home/StatsContext';

export default function PlantsSection() {
  const { setPlantsCount } = useStats();

  useEffect(() => {
    if (typeof setPlantsCount === 'function') {
      setPlantsCount(plantData.length);
    }
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold mb-4">
              <Leaf className="w-4 h-4" /> Live Plants
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-foreground">
              Aquatic Flora
            </h2>
            <p className="text-lg text-muted-foreground">
              Adding live plants is the best thing you can do for your aquarium. Discover beginner-friendly species that require no CO2.
            </p>
          </div>
          <Link 
            href="/plants" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 transition-colors font-semibold whitespace-nowrap shrink-0"
          >
            Browse All Plants <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plantData.slice(0, 4).map((plant) => (
            <div key={plant.id} className="group rounded-3xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full bg-muted">
                   <Image src={plant.image || '/hero_aquarium.jpg'} alt={plant.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                   <div className="absolute top-4 right-4">
                     <span className="px-3 py-1 bg-background/90 backdrop-blur-md rounded-full text-xs font-bold shadow-sm text-foreground">
                       {plant.placement}
                     </span>
                   </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-1 group-hover:text-emerald-600 transition-colors">{plant.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{plant.description}</p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0 mt-auto">
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                    Light: {plant.light}
                  </div>
                  <Link href={`/plants/${plant.slug}`} className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 inline-flex items-center gap-1">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
