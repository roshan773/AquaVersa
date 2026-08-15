"use client";

import { useState, useEffect } from "react";
import { Fish as FishType } from "@/lib/types";
import FishCard from "@/components/ui/FishCard";
import { Search } from "lucide-react";

export default function FishLibraryPage() {
  const [fishList, setFishList] = useState<FishType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [waterTypeFilter, setWaterTypeFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  useEffect(() => {
    async function fetchFish() {
      try {
        const res = await fetch("/api/fish");
        if (res.ok) {
          const data = await res.json();
          setFishList(data);
        }
      } catch (err) {
        console.error("Failed to load fish data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFish();
  }, []);

  const validFish = fishList.filter(f => f.slug);

  const totalCount = validFish.length;
  const fwCount = validFish.filter(f => f.category?.toLowerCase() === "freshwater").length;
  const swCount = validFish.filter(f => f.category?.toLowerCase() === "saltwater").length;
  const begCount = validFish.filter(f => f.difficulty === "Beginner").length;
  const advBegCount = validFish.filter(f => f.difficulty === "Advanced Beginner").length;
  const intCount = validFish.filter(f => f.difficulty === "Intermediate").length;
  const advCount = validFish.filter(f => f.difficulty === "Advanced").length;

  const filteredFish = validFish.filter(fish => {
    const matchesSearch = fish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWater = waterTypeFilter === "All" || fish.category?.toLowerCase() === waterTypeFilter.toLowerCase();
    const matchesDifficulty = difficultyFilter === "All" || fish.difficulty === difficultyFilter;
    return matchesSearch && matchesWater && matchesDifficulty;
  });

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Filters */}
      <aside className="w-full md:w-72 shrink-0 space-y-6">
        <div className="glass p-6 rounded-2xl">
          <h2 className="font-semibold text-lg mb-6 font-poppins">Library Summary</h2>
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-muted rounded-xl"></div>
                <div className="h-16 bg-muted rounded-xl"></div>
                <div className="h-12 bg-muted rounded-xl col-span-2"></div>
              </div>
              <div className="space-y-2 border-t border-border pt-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="bg-muted p-3 rounded-xl text-center">
                  <span className="block text-2xl font-bold">{totalCount}</span>
                  <span className="text-muted-foreground text-xs">Total Fish</span>
                </div>
                <div className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 p-3 rounded-xl text-center">
                  <span className="block text-2xl font-bold">{fwCount}</span>
                  <span className="text-xs">Freshwater</span>
                </div>
                <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-xl text-center col-span-2">
                  <span className="block text-2xl font-bold">{swCount}</span>
                  <span className="text-xs">Saltwater</span>
                </div>
              </div>

              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Beginner</span>
                  <span className="font-semibold">{begCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Advanced Beginner</span>
                  <span className="font-semibold">{advBegCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Intermediate</span>
                  <span className="font-semibold">{intCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Advanced</span>
                  <span className="font-semibold">{advCount}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="sticky top-24 glass p-6 rounded-2xl">
          <h2 className="font-semibold text-lg mb-6">Filters</h2>
          
          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search fish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Water Type</label>
            <div className="flex flex-col gap-2">
              {["All", "Freshwater", "Saltwater"].map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="watertype" 
                    value={type}
                    checked={waterTypeFilter === type}
                    onChange={() => setWaterTypeFilter(type)}
                    className="text-primary focus:ring-primary bg-background border-border"
                    disabled={loading}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Difficulty</label>
            <div className="flex flex-col gap-2">
              {["All", "Beginner", "Advanced Beginner", "Intermediate", "Advanced"].map(diff => (
                <label key={diff} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="difficulty" 
                    value={diff}
                    checked={difficultyFilter === diff}
                    onChange={() => setDifficultyFilter(diff)}
                    className="text-primary focus:ring-primary bg-background border-border"
                    disabled={loading}
                  />
                  <span className="text-sm">{diff}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-2">Fish Library</h1>
          <p className="text-muted-foreground">Explore our complete database of freshwater and saltwater fish.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-muted w-full"></div>
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-muted rounded w-2/3"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-8 bg-muted rounded"></div>
                    <div className="h-8 bg-muted rounded"></div>
                    <div className="h-8 bg-muted rounded"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </div>
                  <div className="h-10 bg-muted rounded-xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredFish.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFish.map(fish => (
              <FishCard key={fish.id} fish={fish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border border-dashed">
            <p className="text-muted-foreground">No fish match your current filters.</p>
            <button 
              onClick={() => { setSearchTerm(""); setDifficultyFilter("All"); setWaterTypeFilter("All"); }}
              className="mt-4 text-primary font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
      
    </div>
  );
}

