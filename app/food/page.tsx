"use client";

import { useState, useEffect } from "react";
import { Food as FoodType } from "@/lib/types";
import { Search, Flame, Utensils, Heart } from "lucide-react";
import Image from "next/image";

export default function FoodPage() {
  const [foodList, setFoodList] = useState<FoodType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    async function fetchFood() {
      try {
        const res = await fetch("/api/food");
        if (res.ok) {
          const data = await res.json();
          setFoodList(data);
        }
      } catch (err) {
        console.error("Failed to load food data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFood();
  }, []);

  const categories = ["All", ...Array.from(new Set(foodList.map(e => e.category)))];

  const filteredFood = foodList.filter(food => {
    const matchesSearch = 
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      food.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.suitableFor.some(fish => fish.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = categoryFilter === "All" || food.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-24 glass p-6 rounded-2xl">
          <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-cyan-500" /> Filters
          </h2>
          
          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search food or fish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Type of Food</label>
            <div className="flex flex-col gap-2">
              {categories.map(c => (
                <label key={c} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category" 
                    value={c}
                    checked={categoryFilter === c}
                    onChange={() => setCategoryFilter(c)}
                    className="text-cyan-500 focus:ring-cyan-500 bg-background border-border"
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
          <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-2 text-cyan-500">Fish Diet & Nutrition</h1>
          <p className="text-muted-foreground">Select the best high-performance diet to keep your fish healthy, colorful, and active.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm animate-pulse flex flex-col">
                <div className="h-48 bg-muted w-full shrink-0"></div>
                <div className="p-5 space-y-4 flex-grow flex flex-col">
                  <div className="h-6 bg-muted rounded w-2/3"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-muted rounded w-4/5"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </div>
                  <div className="h-8 bg-muted rounded-lg w-full mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredFood.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFood.map(food => (
              <div key={food.id} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="relative h-48 w-full bg-muted overflow-hidden shrink-0">
                  <Image
                    src={food.image}
                    alt={food.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-foreground border border-border">
                    {food.category}
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-1.5 rounded-md border border-border">
                    <Flame className="w-4 h-4 text-cyan-500" />
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-600 transition-colors">{food.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{food.description}</p>
                  
                  <div className="border-t border-border pt-3 mt-auto space-y-3">
                    <div>
                      <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Key Benefits:</span>
                      <ul className="text-xs space-y-1 text-foreground font-medium pl-1">
                        {food.benefits.map((b, i) => (
                          <li key={i} className="flex items-center gap-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Frequency</span>
                        <span className="font-semibold text-cyan-600 dark:text-cyan-400">{food.frequency}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Suitable Fish</span>
                        <span className="font-semibold text-foreground truncate max-w-[130px] block" title={food.suitableFor.join(", ")}>
                          {food.suitableFor.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border border-dashed">
            <p className="text-muted-foreground">No food matches your filters or search term.</p>
          </div>
        )}
      </main>
      
    </div>
  );
}
