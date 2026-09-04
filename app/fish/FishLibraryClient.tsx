"use client";

import { useState, useMemo } from "react";
import { Fish as FishType } from "@/lib/types";
import FishCard from "@/components/ui/FishCard";
import { Search, RotateCcw, Filter, Compass } from "lucide-react";

interface FishLibraryClientProps {
  initialFish: FishType[];
}

export default function FishLibraryClient({ initialFish }: FishLibraryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [waterTypeFilter, setWaterTypeFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [temperamentFilter, setTemperamentFilter] = useState("All");

  const validFish = useMemo(() => initialFish.filter(f => f.slug), [initialFish]);

  const filteredFish = useMemo(() => {
    return validFish.filter(fish => {
      const matchesSearch = 
        fish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (fish.scientificName && fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesWater = 
        waterTypeFilter === "All" || 
        fish.category?.toLowerCase() === waterTypeFilter.toLowerCase();
      
      const matchesDifficulty = 
        difficultyFilter === "All" || 
        fish.difficulty === difficultyFilter;

      const matchesBeginner = 
        !beginnerOnly || 
        fish.beginnerSuitable === true || 
        fish.difficulty === "Beginner";

      const matchesTemperament = 
        temperamentFilter === "All" || 
        fish.temperament?.toLowerCase().includes(temperamentFilter.toLowerCase());

      return matchesSearch && matchesWater && matchesDifficulty && matchesBeginner && matchesTemperament;
    });
  }, [validFish, searchTerm, waterTypeFilter, difficultyFilter, beginnerOnly, temperamentFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setWaterTypeFilter("All");
    setDifficultyFilter("All");
    setBeginnerOnly(false);
    setTemperamentFilter("All");
  };

  const hasActiveFilters = searchTerm !== "" || waterTypeFilter !== "All" || difficultyFilter !== "All" || beginnerOnly || temperamentFilter !== "All";

  return (
    <div className="min-h-screen bg-[#0f0738] py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="mb-10 text-left border-b border-[#27187E] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#27187E]/50 border border-[#3622a6] mb-3 text-[#F7F7FF] text-xs font-condensed uppercase tracking-wider font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#aca1f7]" />
            <span>Species Database</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-normal text-[#F7F7FF] tracking-wide">
            Fish Species Library
          </h1>
          <p className="text-[#F7F7FF]/75 text-sm max-w-2xl mt-2 font-normal leading-relaxed font-sans">
            Search and filter documented freshwater and saltwater species. Review water chemistry requirements, social behavior, minimum tank sizes, and community compatibility.
          </p>
        </div>

        {/* Main Layout: Filters Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-5 text-left">
            <div className="bg-[#1c0e64] border border-[#27187E] rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#27187E]">
                <h2 className="font-condensed uppercase tracking-wider font-bold text-sm text-[#F7F7FF] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#aca1f7]" />
                  <span>Filter Species</span>
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-condensed uppercase tracking-wider text-[#aca1f7] hover:text-[#F7F7FF] flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              <div className="space-y-4 text-xs">
                
                {/* Search input */}
                <div>
                  <label className="text-[11px] font-condensed uppercase tracking-wider font-bold text-[#F7F7FF]/80 mb-1.5 block">Search Species</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aca1f7]" />
                    <input
                      type="text"
                      placeholder="e.g. Neon Tetra, Betta..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#0d0630] border border-[#3622a6] rounded-xl pl-9 pr-3 py-2 text-xs text-[#F7F7FF] placeholder-[#F7F7FF]/40 focus:outline-none focus:border-[#F7F7FF]"
                    />
                  </div>
                </div>

                {/* Water Type Filter */}
                <div>
                  <label className="text-[11px] font-condensed uppercase tracking-wider font-bold text-[#F7F7FF]/80 mb-1.5 block">Water Habitat</label>
                  <div className="grid grid-cols-3 gap-1.5 font-condensed uppercase tracking-wider font-bold text-xs">
                    {["All", "Freshwater", "Saltwater"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setWaterTypeFilter(type)}
                        className={`py-1.5 px-2 rounded-lg text-center transition-colors cursor-pointer text-[11px] ${
                          waterTypeFilter === type
                            ? "bg-[#F7F7FF] text-[#27187E] shadow-sm"
                            : "bg-[#27187E] text-[#F7F7FF]/80 hover:bg-[#3622a6]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="text-[11px] font-condensed uppercase tracking-wider font-bold text-[#F7F7FF]/80 mb-1.5 block">Care Difficulty</label>
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="w-full bg-[#0d0630] border border-[#3622a6] rounded-xl px-3 py-2 text-xs text-[#F7F7FF] focus:outline-none focus:border-[#F7F7FF]"
                  >
                    <option value="All">All Difficulty Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Advanced Beginner">Advanced Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Temperament Filter */}
                <div>
                  <label className="text-[11px] font-condensed uppercase tracking-wider font-bold text-[#F7F7FF]/80 mb-1.5 block">Temperament</label>
                  <select
                    value={temperamentFilter}
                    onChange={(e) => setTemperamentFilter(e.target.value)}
                    className="w-full bg-[#0d0630] border border-[#3622a6] rounded-xl px-3 py-2 text-xs text-[#F7F7FF] focus:outline-none focus:border-[#F7F7FF]"
                  >
                    <option value="All">All Temperaments</option>
                    <option value="Peaceful">Peaceful Community</option>
                    <option value="Semi-Aggressive">Semi-Aggressive</option>
                    <option value="Aggressive">Aggressive / Territorial</option>
                  </select>
                </div>

                {/* Beginner friendly checkbox */}
                <div className="pt-2 border-t border-[#27187E]">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none text-[#F7F7FF]/85 font-condensed uppercase tracking-wider text-xs">
                    <input
                      type="checkbox"
                      checked={beginnerOnly}
                      onChange={(e) => setBeginnerOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-[#3622a6] bg-[#0d0630] text-[#27187E] focus:ring-[#F7F7FF]"
                    />
                    <span>Show beginner-friendly only</span>
                  </label>
                </div>

              </div>
            </div>

            {/* Quick stats note */}
            <div className="p-4 rounded-xl bg-[#14094a] border border-[#27187E] text-xs text-[#F7F7FF]/70">
              <span className="font-condensed uppercase tracking-wider font-bold text-[#F7F7FF] block mb-1">Showing {filteredFish.length} of {validFish.length} Species</span>
              Parameters derived from natural biotope observations and established hobbyist care standards.
            </div>
          </aside>

          {/* Species Results Grid */}
          <main className="flex-1 w-full">
            {filteredFish.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredFish.map(fish => (
                  <FishCard key={fish.id} fish={fish} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-[#1c0e64] border border-[#27187E] rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-[#27187E] border border-[#3622a6] flex items-center justify-center text-[#F7F7FF] mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-normal text-[#F7F7FF] mb-2 tracking-wide">
                  No fish match your current filters.
                </h3>
                <p className="text-xs text-[#F7F7FF]/70 max-w-sm mb-6 leading-relaxed font-sans">
                  Try broadening your search term, resetting water type filters, or switching to all difficulty levels.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-[#F7F7FF] hover:bg-white text-[#27187E] rounded-xl text-xs font-condensed uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
}
