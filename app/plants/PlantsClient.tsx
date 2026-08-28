"use client";

import { useState } from "react";
import { Plant as PlantType } from "@/lib/types";
import { Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PlantsClientProps {
  plantList: PlantType[];
}

export default function PlantsClient({ plantList }: PlantsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [lightFilter, setLightFilter] = useState("All");

  const filteredPlants = plantList.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (plant.scientificName && plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLight = lightFilter === "All" || plant.light === lightFilter;
    return matchesSearch && matchesLight;
  });

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-24 glass p-6 rounded-2xl">
          <h2 className="font-semibold text-lg mb-6">Filters</h2>
          
          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Lighting Need</label>
            <div className="flex flex-col gap-2">
              {["All", "Low", "Medium", "High"].map(l => (
                <label key={l} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="light" 
                    value={l}
                    checked={lightFilter === l}
                    onChange={() => setLightFilter(l)}
                    className="text-emerald-500 focus:ring-emerald-500 bg-background border-border"
                  />
                  <span className="text-sm">{l}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Above the Fold Header & CTA */}
        <div className="p-6 md:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-poppins font-bold tracking-tight text-emerald-400">Aquatic Plants Guide</h1>
            <p className="text-slate-400 max-w-lg leading-relaxed text-sm">
              Discover beautiful live plants for natural filtration, structural depth, and fish shelter in your aquarium.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/aquascape-planner"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/25 transition-all tracking-wider uppercase font-poppins cursor-pointer"
            >
              <span>Design Layout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map(plant => (
              <div key={plant.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between text-left">
                <div>
                  <div className="relative h-48 w-full bg-muted overflow-hidden shrink-0">
                    <Image 
                      src={plant.image} 
                      alt={`${plant.name} (${plant.scientificName || 'Live Aquatic Plant'})`} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-md px-2 py-0.5 rounded text-xs font-semibold">
                      {plant.difficulty} Care
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold group-hover:text-emerald-500 transition-colors line-clamp-1">{plant.name}</h3>
                    <p className="text-xs text-muted-foreground italic mb-3">{plant.scientificName}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{plant.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <span>Light: <strong>{plant.light}</strong></span>
                      <span>CO2: <strong>{plant.co2 || 'Optional'}</strong></span>
                      <span className="col-span-2 truncate">Placement: <strong>{plant.placement}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <Link
                    href={`/plants/${plant.slug}`}
                    className="w-full py-2.5 bg-muted hover:bg-emerald-600 hover:text-slate-900 text-center rounded-xl text-sm font-semibold transition-colors block"
                  >
                    View Plant Guide
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border border-dashed">
            <p className="text-muted-foreground">No plants match your current filters.</p>
            <button 
              onClick={() => { setSearchTerm(""); setLightFilter("All"); }}
              className="mt-4 text-emerald-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
      
    </div>
  );
}
