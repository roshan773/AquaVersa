'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
import { equipmentData } from '@/data/equipment';

export default function EquipmentOverview() {
  // Select 3 key equipment items: Canister Filter, Submersible Heater, LED Light
  const featuredEquipment = [
    {
      id: 'canister-filter',
      name: 'Canister Filter',
      category: 'Filtration',
      image: '/hero_aquarium.jpg',
      desc: 'High-capacity external filtration for medium to large aquariums with multi-stage mechanical, biological, and chemical media baskets.',
      href: '/equipment/canister-filter',
    },
    {
      id: 'submersible-aquarium-heater',
      name: 'Aquarium Heater',
      category: 'Heating',
      image: '/hero_aquarium.jpg',
      desc: 'Maintain a stable, safe water temperature with precision electronic thermostats to ensure fish comfort and immunity.',
      href: '/equipment/submersible-aquarium-heater',
    },
    {
      id: 'full-spectrum-led-plant-light',
      name: 'LED Aquarium Light',
      category: 'Lighting',
      image: '/hero_aquarium.jpg',
      desc: 'Energy-efficient spectrum tailored for aquatic plant photosynthesis and vibrant species color rendition.',
      href: '/equipment/full-spectrum-led-plant-light',
    },
  ];

  return (
    <section className="py-20 bg-[#f7f7ff] border-t border-[#cfcaf5] text-left">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-condensed font-bold uppercase tracking-widest text-[#27187e] mb-2 block">
              HARDWARE & GEAR
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
              EQUIPMENT OVERVIEW
            </h2>
            <p className="text-base text-[#27187e]/80 font-normal max-w-xl mt-2 font-sans">
              Explore essential aquarium equipment with practical information to help you choose the right gear.
            </p>
          </div>

          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] hover:text-[#1b1059] transition-colors mt-4 md:mt-0 group"
          >
            <span>View All Equipment</span>
            <ArrowRight className="w-4 h-4 text-[#27187e] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Card Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEquipment.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="editorial-card group flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl"
            >
              <div>
                {/* Equipment Image */}
                <div className="relative w-full aspect-[16/10] bg-[#edeafc] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#f7f7ff]/90 backdrop-blur-sm border border-[#cfcaf5] px-2.5 py-1 rounded-lg text-[10px] font-condensed uppercase tracking-wider font-bold text-[#27187e]">
                    {item.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-2xl font-display font-normal text-[#27187e] group-hover:text-[#1b1059] transition-colors leading-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#27187e]/75 font-sans leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="px-6 pb-6 pt-3 border-t border-[#edeafc] flex items-center justify-between text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e]">
                <span>Read Equipment Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#27187e] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
