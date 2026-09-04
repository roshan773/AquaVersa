'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EquipmentOverview() {
  const equipment = [
    {
      id: 'canister-filter',
      name: 'Canister Filter',
      image: '/images/canister_filter.png',
      desc: 'High-capacity filtration for larger aquariums with excellent mechanical, biological and chemical filtration.',
      href: '/equipment/canister-filter',
    },
    {
      id: 'aquarium-heater',
      name: 'Aquarium Heater',
      image: '/images/heater.png',
      desc: 'Maintains a stable temperature for healthy and comfortable fish.',
      href: '/equipment/submersible-aquarium-heater',
    },
    {
      id: 'led-aquarium-light',
      name: 'LED Aquarium Light',
      image: '/images/led_light.png',
      desc: 'Energy-efficient lighting for planted and community aquariums.',
      href: '/equipment/full-spectrum-led-plant-light',
    },
  ];

  return (
    <section className="py-20 bg-[#f7f7ff] text-left">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[10px] font-condensed font-bold uppercase tracking-[0.2em] text-[#27187e]/80 mb-2 block">
              EQUIPMENT
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#27187e] tracking-wide">
              Equipment Overview
            </h2>
            <p className="text-xs sm:text-sm text-[#27187e]/80 font-normal max-w-xl mt-1 font-sans">
              Explore essential aquarium equipment with practical information to help you choose the right gear.
            </p>
          </div>

          <Link
            href="/equipment"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-xs font-condensed font-bold uppercase tracking-wider transition-all shadow-sm mt-4 md:mt-0"
          >
            <span>View All Equipment</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#f7f7ff]" />
          </Link>
        </div>

        {/* 3-Column Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <div
              key={item.id}
              className="bg-[#ffffff] border border-[#cfcaf5]/70 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Equipment Product Image */}
                <div className="relative w-full h-44 mb-6 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Body */}
                <h3 className="text-2xl font-display font-normal text-[#27187e] mb-2 leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-[#27187e]/75 font-sans leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Action Link */}
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 text-xs font-condensed font-bold uppercase tracking-wider text-[#27187e] hover:text-[#1b1059]"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#27187e]" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
