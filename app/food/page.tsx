"use client";

import { useState, useEffect } from "react";
import { Food as FoodType } from "@/lib/types";
import { Search, Utensils, Heart, ArrowRight, Layers } from "lucide-react";
import Image from "next/image";
import GlobalCTA from "@/components/ui/GlobalCTA";
import CareDisclaimer from "@/components/ui/CareDisclaimer";

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
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left font-readable marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] text-xs font-semibold uppercase tracking-wider mb-4">
            <Utensils className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Aquatic Nutrition &amp; Feeding Dynamics</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            FISH DIET &amp; NUTRITION
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 max-w-2xl leading-relaxed font-medium">
            Learn proper protein-to-fiber ratios, sinking vs floating behaviors, and live/frozen supplementation to maintain vibrant fish coloration and longevity.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-3xl relative">
            <Search className="w-5 h-5 text-[#27187e]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search food types or suitable fish (e.g. Pellets, Flakes, Bloodworms, Tetra)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#ffffff] border-2 border-[#cfcaf5] focus:border-[#27187e] text-base text-[#27187e] placeholder:text-[#27187e]/50 focus:outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 mb-10 shadow-sm">
          <span className="text-xs uppercase font-bold text-[#27187e]/80 tracking-wider block mb-3">
            Filter by Diet Category:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  categoryFilter === c
                    ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm'
                    : 'bg-[#edeafc] text-[#27187e] hover:bg-[#cfcaf5]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Food Items Grid */}
        {loading ? (
          <div className="text-center py-16 text-[#27187e] font-semibold">
            Loading nutritional profiles...
          </div>
        ) : filteredFood.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredFood.map((food) => (
              <div
                key={food.id}
                className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="relative w-full h-48 rounded-2xl bg-[#edeafc] overflow-hidden mb-5 flex items-center justify-center p-4">
                    <Image
                      src={food.image || '/hero_aquarium.jpg'}
                      alt={food.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#f7f7ff] text-[#27187e] border border-[#cfcaf5] px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                      {food.category}
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-normal text-[#27187e] mb-2 leading-tight">
                    {food.name}
                  </h2>

                  <p className="text-sm sm:text-base text-[#27187e]/85 leading-relaxed mb-4 font-medium">
                    {food.description}
                  </p>

                  <div className="bg-[#f7f7ff] p-4 rounded-2xl border border-[#cfcaf5] space-y-2 text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-[#27187e] uppercase text-[10px] tracking-wider block">Feeding Frequency:</span>
                      <span className="text-[#27187e]/90 font-medium">{food.frequency}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#27187e] uppercase text-[10px] tracking-wider block">Suitable For:</span>
                      <span className="text-[#27187e]/90 font-medium">{food.suitableFor.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-[#edeafc] text-xs text-[#27187e]/70 font-semibold uppercase tracking-wider">
                  Nutritional Profile &amp; Guidelines
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-12 text-center max-w-xl mx-auto my-12">
            <h3 className="text-3xl font-display font-normal text-[#27187e] mb-2">
              No matching diet records found.
            </h3>
            <p className="text-base text-[#27187e]/75 mb-6 font-medium">
              Try adjusting your spelling or reset the filter.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setCategoryFilter("All"); }}
              className="px-6 py-3 rounded-full bg-[#27187e] text-[#f7f7ff] text-sm font-bold uppercase tracking-wider hover:bg-[#1b1059] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="mt-16">
          <CareDisclaimer />
        </div>

      </div>

      <GlobalCTA
        badge="NUTRITIONAL HUSBANDRY"
        title={
          <>
            Balance feedings with regular <br className="hidden sm:inline" />
            water chemistry testing.
          </>
        }
        description="Excess uneaten food quickly turns into toxic ammonia. Verify your test kit readings with our analyzer."
        primaryAction={{
          label: 'Open Water Analyzer',
          href: '/water-analyzer',
        }}
        secondaryAction={{
          label: 'Stocking Density Planner',
          href: '/stocking-planner',
        }}
      />
    </div>
  );
}
