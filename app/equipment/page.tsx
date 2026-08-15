"use client";

import { useState, useEffect } from "react";
import { Equipment as EquipmentType } from "@/lib/types";
import { Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EquipmentPage() {
  const [eqList, setEqList] = useState<EquipmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    async function fetchEquipment() {
      try {
        const res = await fetch("/api/equipment");
        if (res.ok) {
          const data = await res.json();
          setEqList(data);
        }
      } catch (err) {
        console.error("Failed to load equipment data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEquipment();
  }, []);

  const categories = ["All", ...Array.from(new Set(eqList.map(e => e.category)))];

  const filteredEq = eqList.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || eq.category === categoryFilter;
    return matchesSearch && matchesCategory;
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
                placeholder="Search gear..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Category</label>
            <div className="flex flex-col gap-2">
              {categories.map(c => (
                <label key={c} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category" 
                    value={c}
                    checked={categoryFilter === c}
                    onChange={() => setCategoryFilter(c)}
                    className="text-amber-500 focus:ring-amber-500 bg-background border-border"
                    disabled={loading}
                  />
                  <span className="text-sm">{c}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-2 text-amber-500">Aquarium Equipment</h1>
          <p className="text-muted-foreground">Essential gear to maintain a healthy and stable ecosystem.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm animate-pulse flex flex-col">
                <div className="h-48 bg-muted w-full shrink-0"></div>
                <div className="p-5 space-y-4 flex-1 flex flex-col">
                  <div className="h-6 bg-muted rounded w-2/3"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-10 bg-muted rounded-xl w-full mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredEq.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEq.map(eq => (
              <div key={eq.id} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="relative h-48 w-full bg-muted overflow-hidden shrink-0">
                  <Image
                    src={eq.image}
                    alt={eq.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-foreground">
                    {eq.category}
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-1.5 rounded-md">
                    <Settings className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-600 transition-colors">{eq.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{eq.description}</p>
                  
                  <Link 
                    href={`/equipment/${eq.slug}`}
                    className="mt-auto w-full py-2.5 bg-muted hover:bg-amber-500 hover:text-white dark:hover:text-black rounded-xl font-medium transition-colors flex items-center justify-center"
                  >
                    View Gear Guide
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border border-dashed">
            <p className="text-muted-foreground">No equipment match your current filters.</p>
          </div>
        )}
      </main>
      
    </div>
  );
}

