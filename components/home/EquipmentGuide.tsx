'use client';
import { useState } from 'react';
import { equipmentData } from '@/data/equipment';
import { Check, Cpu, PackageSearch } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EquipmentGuide() {
  const [tankSize, setTankSize] = useState('Small (5-10g)');
  const [tankType, setTankType] = useState('Freshwater');

  const getRecommendedEquipment = () => {
    const isSmall = tankSize.includes('Small');
    const isMedium = tankSize.includes('Medium');
    const isLarge = tankSize.includes('Large');
    
    let slugs: string[] = [];
    
    if (tankType === 'Saltwater') {
      slugs.push('protein-skimmer');
      slugs.push('led-reef-light');
      if (isLarge) {
        slugs.push('titanium-heater');
        slugs.push('aquarium-chiller');
      } else {
        slugs.push('submersible-aquarium-heater');
        slugs.push('canister-filter');
      }
    } else if (tankType === 'Planted') {
      slugs.push('full-spectrum-led-plant-light');
      if (isSmall) {
        slugs.push('sponge-filter');
        slugs.push('submersible-aquarium-heater');
        slugs.push('air-pump');
      } else if (isMedium) {
        slugs.push('hang-on-back-filter');
        slugs.push('submersible-aquarium-heater');
        slugs.push('inline-heater');
      } else { // Large
        slugs.push('canister-filter');
        slugs.push('inline-heater');
        slugs.push('uv-sterilizer');
      }
    } else { // Freshwater
      if (isSmall) {
        slugs.push('sponge-filter');
        slugs.push('submersible-aquarium-heater');
        slugs.push('air-pump');
        slugs.push('check-valve');
      } else if (isMedium) {
        slugs.push('hang-on-back-filter');
        slugs.push('submersible-aquarium-heater');
        slugs.push('air-pump');
        slugs.push('air-stone');
      } else { // Large
        slugs.push('canister-filter');
        slugs.push('submersible-aquarium-heater');
        slugs.push('air-pump');
        slugs.push('uv-sterilizer');
      }
    }
    
    return slugs
      .map(slug => equipmentData.find(eq => eq.slug === slug))
      .filter((eq): eq is typeof equipmentData[0] => !!eq)
      .slice(0, 4);
  };

  const recommendations = getRecommendedEquipment();

  return (
    <section className="py-24 bg-muted/10 border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold mb-4">
            <Cpu className="w-4 h-4" /> Smart Guide
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-foreground">
            Equipment Recommender
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your setup, and we'll recommend the essential hardware you need to get started.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Controls */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">1. Tank Size</h3>
              <div className="space-y-3">
                {['Small (5-10g)', 'Medium (20-40g)', 'Large (55g+)'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setTankSize(size)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      tankSize === size 
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' 
                        : 'border-border bg-background hover:border-amber-300'
                    }`}
                  >
                    <span className="font-medium">{size}</span>
                    {tankSize === size && <Check className="w-5 h-5 text-amber-500" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">2. Tank Type</h3>
              <div className="space-y-3">
                {['Freshwater', 'Saltwater', 'Planted'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTankType(type)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      tankType === type 
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' 
                        : 'border-border bg-background hover:border-amber-300'
                    }`}
                  >
                    <span className="font-medium">{type}</span>
                    {tankType === type && <Check className="w-5 h-5 text-amber-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations Display */}
          <div className="lg:w-2/3">
            <div className="bg-card rounded-3xl p-8 border border-border shadow-sm min-h-full">
              <div className="flex items-center gap-3 mb-8">
                <PackageSearch className="w-6 h-6 text-amber-500" />
                <h3 className="text-2xl font-bold">Recommended For You</h3>
              </div>
              
              {recommendations.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {recommendations.map((item) => (
                    <Link key={item.id} href={`/equipment/${item.slug}`} className="flex gap-4 p-4 rounded-2xl bg-muted/50 border border-border hover:border-amber-500/30 hover:bg-muted transition-all block group">
                      <div className="w-20 h-20 rounded-xl bg-background border border-border flex-shrink-0 relative overflow-hidden">
                        <Image src={item.image || "/hero_aquarium.jpg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors">{item.name}</h4>
                        <span className="text-xs font-semibold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full mb-2 inline-block">
                          {item.category}
                        </span>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.purpose}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No specific recommendations found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
