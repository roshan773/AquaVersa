"use client";

import { useState } from "react";
import { fishData } from "@/data/fish";
import FishCard from "@/components/ui/FishCard";
import { Search } from "lucide-react";

export default function SaltwaterPage() {
  const saltwaterFish = fishData.filter(f => f.category?.toLowerCase() === "saltwater");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const filteredFish = saltwaterFish.filter(fish => {
    const matchesSearch = fish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "All" || fish.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
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
                placeholder="Search fish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Difficulty</label>
            <div className="flex flex-col gap-2">
              {["All", "Beginner", "Intermediate", "Advanced"].map(diff => (
                <label key={diff} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="difficulty" 
                    value={diff}
                    checked={difficultyFilter === diff}
                    onChange={() => setDifficultyFilter(diff)}
                    className="text-blue-500 focus:ring-blue-500 bg-background border-border"
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
          <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-2">Saltwater Fish</h1>
          <p className="text-muted-foreground">Discover exotic marine life for your reef aquarium.</p>
        </div>

        {filteredFish.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFish.map(fish => (
              <FishCard key={fish.id} fish={fish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border border-dashed">
            <p className="text-muted-foreground">No fish match your current filters.</p>
            <button 
              onClick={() => { setSearchTerm(""); setDifficultyFilter("All"); }}
              className="mt-4 text-blue-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
      
    </div>
  );
}
