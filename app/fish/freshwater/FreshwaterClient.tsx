"use client";

import { useState } from "react";
import { Fish as FishType } from "@/lib/types";
import FishCard from "@/components/ui/FishCard";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FreshwaterClientProps {
  freshwaterFish: FishType[];
}

export default function FreshwaterClient({ freshwaterFish }: FreshwaterClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const filteredFish = freshwaterFish.filter(fish => {
    const matchesSearch = fish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (fish.scientificName && fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase()));
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
                className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
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
                    className="text-cyan-500 focus:ring-cyan-500 bg-background border-border"
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
        
        {/* Above the Fold Header & CTA */}
        <div className="p-6 md:p-8 rounded-3xl bg-cyan-950/20 border border-cyan-500/10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-poppins font-bold tracking-tight text-cyan-400">Freshwater Fish Guide</h1>
            <p className="text-slate-400 max-w-lg leading-relaxed text-sm">
              Discover beautiful species for your planted aquarium. Get profiles, parameters, and stocking compatibility.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/compatibility"
              className="px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/10 hover:shadow-cyan-600/25 transition-all tracking-wider uppercase font-poppins cursor-pointer"
            >
              <span>Check Compatibility</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {filteredFish.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFish.map(fish => (
              <FishCard key={fish.id} fish={fish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border border-dashed">
            <p className="text-muted-foreground">No freshwater fish match your current filters.</p>
            <button 
              onClick={() => { setSearchTerm(""); setDifficultyFilter("All"); }}
              className="mt-4 text-cyan-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
      
    </div>
  );
}
