"use client";

import { useState, useEffect } from "react";
import { Plant as PlantType } from "@/lib/types";
import { Search, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PlantsPage() {
  const [plantList, setPlantList] = useState<PlantType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [lightFilter, setLightFilter] = useState("All");

  useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await fetch("/api/plants");
        if (res.ok) {
          const data = await res.json();
          setPlantList(data);
        }
      } catch (err) {
        console.error("Failed to load plants data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlants();
  }, []);

  const filteredPlants = plantList.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
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
                disabled={loading}
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
                    disabled={loading}
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-2 text-emerald-500">Aquatic Plants</h1>
          <p className="text-muted-foreground">Discover beautiful, natural filtration for your aquarium.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-muted w-full"></div>
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-muted rounded w-2/3"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-6 bg-muted rounded"></div>
                  </div>
                  <div className="h-10 bg-muted rounded-xl w-full pt-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map(plant => (
              <div key={plant.id} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                  <Image
                    src={plant.image}
                    alt={plant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-foreground">
                    {plant.difficulty}
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-1.5 rounded-md">
                    <Leaf className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-emerald-600 transition-colors">{plant.name}</h3>
                  <p className="text-xs text-muted-foreground italic mb-4">{plant.scientificName}</p>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-5 text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">Light</span>
                      <span className="font-medium">{plant.light}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">CO2</span>
                      <span className="font-medium">{plant.co2}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">Growth</span>
                      <span className="font-medium">{plant.growthRate}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">Placement</span>
                      <span className="font-medium truncate" title={plant.placement}>{plant.placement}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/plants/${plant.slug}`}
                    className="w-full py-2.5 bg-muted hover:bg-emerald-500 hover:text-white dark:hover:text-black rounded-xl font-medium transition-colors flex items-center justify-center"
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
          </div>
        )}
      </main>
      
    </div>
  );
}

