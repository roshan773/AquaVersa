"use client";

import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, Fish as FishIcon, Leaf as LeafIcon, Settings as SettingsIcon, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useMemo } from "react";
import { fishData } from "@/data/fish";
import { siteConfig } from "@/config/site";
import { plantData } from "@/data/plants";
import { equipmentData } from "@/data/equipment";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const normalizedQuery = query.toLowerCase().trim();

  const searchAnalysis = useMemo(() => {
    if (!normalizedQuery) {
      return { 
        fish: [], 
        plants: [], 
        equipment: [], 
        smartFilters: [], 
        explanation: "" 
      };
    }

    let filteredFish = [...fishData];
    let filteredPlants = [...plantData];
    let filteredEquipment = [...equipmentData];
    const smartFilters: string[] = [];
    let explanation = "";

    // 1. Tank Size Filter (e.g. "10 gallon", "20g")
    const gallonMatch = normalizedQuery.match(/(\d+)\s*(?:gallon|gal|g)\b/i);
    if (gallonMatch) {
      const gallons = parseInt(gallonMatch[1]);
      filteredFish = filteredFish.filter(f => f.minTankSize && f.minTankSize <= gallons);
      smartFilters.push(`Tank capacity: ≤ ${gallons} Gallons`);
    }

    // 2. Temperament Filter (e.g. "peaceful")
    if (normalizedQuery.includes("peaceful")) {
      filteredFish = filteredFish.filter(f => f.temperament?.toLowerCase().includes("peaceful"));
      smartFilters.push("Temperament: Peaceful");
    } else if (normalizedQuery.includes("aggressive") && !normalizedQuery.includes("semi")) {
      filteredFish = filteredFish.filter(f => f.temperament?.toLowerCase().includes("aggressive") && !f.temperament?.toLowerCase().includes("semi"));
      smartFilters.push("Temperament: Aggressive");
    } else if (normalizedQuery.includes("semi-aggressive")) {
      filteredFish = filteredFish.filter(f => f.temperament?.toLowerCase().includes("semi-aggressive"));
      smartFilters.push("Temperament: Semi-Aggressive");
    }

    // 3. Difficulty/Beginner Filter (e.g. "beginner", "for beginners")
    if (normalizedQuery.includes("beginner") || normalizedQuery.includes("easy")) {
      filteredFish = filteredFish.filter(f => f.difficulty === "Beginner" || f.beginnerSuitable);
      filteredPlants = filteredPlants.filter(p => p.difficulty?.toLowerCase() === "easy");
      smartFilters.push("Care Level: Beginner Friendly");
    }

    // 4. Plant Lighting Filter (e.g. "low light")
    if (normalizedQuery.includes("low light")) {
      filteredPlants = filteredPlants.filter(p => p.light?.toLowerCase().includes("low"));
      smartFilters.push("Plant Light: Low Requirement");
    } else if (normalizedQuery.includes("high light")) {
      filteredPlants = filteredPlants.filter(p => p.light?.toLowerCase().includes("high"));
      smartFilters.push("Plant Light: High Requirement");
    }

    // 5. Goldfish Plants (epiphyte plants goldfish won't eat)
    if (normalizedQuery.includes("goldfish") && (normalizedQuery.includes("plant") || normalizedQuery.includes("flora"))) {
      // Goldfish destroy soft plants, return Java Fern / Anubias Nana
      filteredPlants = filteredPlants.filter(p => p.slug === "java-fern" || p.slug === "anubias-nana");
      smartFilters.push("Plants for Goldfish");
      explanation = "Goldfish are herbivorous and dig/eat soft-leaved vegetation. We have highlighted tough-leaved epiphytes like Java Fern and Anubias which can be attached to hardscape and are usually left alone.";
    }

    // 6. Compatibility check (e.g. "live with guppies", "compatible with guppy")
    if (normalizedQuery.includes("live with") || normalizedQuery.includes("compatible with") || normalizedQuery.includes("can live with")) {
      // Extract target fish name
      let targetSlug = "";
      if (normalizedQuery.includes("gupp")) targetSlug = "guppy";
      else if (normalizedQuery.includes("neon") || normalizedQuery.includes("tetra")) targetSlug = "neon-tetra";
      else if (normalizedQuery.includes("betta")) targetSlug = "betta-fish";
      else if (normalizedQuery.includes("corydoras") || normalizedQuery.includes("catfish")) targetSlug = "corydoras-catfish";
      else if (normalizedQuery.includes("angelfish")) targetSlug = "angelfish";
      else if (normalizedQuery.includes("oscar")) targetSlug = "oscar";
      else if (normalizedQuery.includes("danio")) targetSlug = "zebra-danio";
      else if (normalizedQuery.includes("barb")) targetSlug = "cherry-barb";

      if (targetSlug) {
        const targetFish = fishData.find(f => f.slug === targetSlug);
        if (targetFish) {
          filteredFish = filteredFish.filter(f => 
            f.slug !== targetSlug && 
            (
              targetFish.compatibleWith?.includes(f.slug || "") ||
              f.compatibleWith?.includes(targetSlug) ||
              f.temperament === "Peaceful" && targetFish.temperament === "Peaceful"
            ) &&
            f.category === targetFish.category // must share freshwater/saltwater
          );
          smartFilters.push(`Compatible with: ${targetFish.name}`);
          explanation = `Showing species that can successfully share an aquarium with the ${targetFish.name} based on water chemistry, size, and peaceful temperament.`;
        }
      }
    }

    // Fallback search logic if no specific smart filters are triggered, or in addition to them
    const hasSmartFilters = smartFilters.length > 0;
    
    // If we have no smart filters, perform standard keyword searches
    if (!hasSmartFilters) {
      filteredFish = fishData.filter(
        (f) =>
          f.name.toLowerCase().includes(normalizedQuery) ||
          (f.scientificName && f.scientificName.toLowerCase().includes(normalizedQuery)) ||
          (f.description && f.description.toLowerCase().includes(normalizedQuery)) ||
          (f.category && f.category.toLowerCase().includes(normalizedQuery))
      );

      filteredPlants = plantData.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          (p.scientificName && p.scientificName.toLowerCase().includes(normalizedQuery)) ||
          (p.description && p.description.toLowerCase().includes(normalizedQuery)) ||
          (p.light && p.light.toLowerCase().includes(normalizedQuery))
      );

      filteredEquipment = equipmentData.filter(
        (e) =>
          e.name.toLowerCase().includes(normalizedQuery) ||
          (e.description && e.description.toLowerCase().includes(normalizedQuery)) ||
          (e.purpose && e.purpose.toLowerCase().includes(normalizedQuery)) ||
          (e.category && e.category.toLowerCase().includes(normalizedQuery))
      );
    } else {
      // If smart filters are active, we also filter equipment to empty since it is livestock-focused
      filteredEquipment = [];
    }

    return {
      fish: filteredFish.filter(f => f.slug),
      plants: filteredPlants.filter(p => p.slug),
      equipment: filteredEquipment.filter(e => e.slug),
      smartFilters,
      explanation
    };
  }, [normalizedQuery]);

  const totalResults = searchAnalysis.fish.length + searchAnalysis.plants.length + searchAnalysis.equipment.length;

  return (
    <div className="container mx-auto px-4 py-16 min-h-[85vh] font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border pb-8 text-left">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-2xl border border-cyan-500/20">
              <SearchIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-poppins font-bold">Search Results</h1>
              <p className="text-muted-foreground mt-1">
                {normalizedQuery ? (
                  <>Showing {totalResults} matches for <span className="text-cyan-600 dark:text-cyan-400 font-semibold">"{query}"</span></>
                ) : (
                  `Explore ${siteConfig.name}'s library database`
                )}
              </p>
            </div>
          </div>
          {normalizedQuery && totalResults > 0 && (
            <div className="text-sm font-semibold bg-muted px-4 py-2 rounded-full border border-border shrink-0">
              Found: {searchAnalysis.fish.length} Fish | {searchAnalysis.plants.length} Plants | {searchAnalysis.equipment.length} Gear
            </div>
          )}
        </div>

        {/* NLP Smart Filter badge */}
        {searchAnalysis.smartFilters.length > 0 && (
          <div className="mb-8 p-5 bg-cyan-500/5 border border-cyan-500/25 rounded-2xl text-left flex gap-3 items-start max-w-4xl">
            <Sparkles className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Smart Filters Applied:</span>
                {searchAnalysis.smartFilters.map((filt, idx) => (
                  <span key={idx} className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-455 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/20">{filt}</span>
                ))}
              </div>
              {searchAnalysis.explanation && (
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">{searchAnalysis.explanation}</p>
              )}
            </div>
          </div>
        )}

        {!normalizedQuery ? (
          <div className="text-center py-16 bg-muted/20 border border-border border-dashed rounded-3xl">
            <SearchIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Search the Database</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Enter a query in the search bar above to look for tropical fish, aquatic plants, or essential aquarium equipment. Try natural queries like "peaceful fish for 10 gallon" or "low light plants".
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/fish" className="text-sm font-medium hover:underline text-cyan-600">Fish Catalog</Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/plants" className="text-sm font-medium hover:underline text-emerald-600">Plants Catalog</Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/equipment" className="text-sm font-medium hover:underline text-amber-600">Gear Catalog</Link>
            </div>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-16 bg-muted/20 border border-border border-dashed rounded-3xl">
            <SearchIcon className="w-16 h-16 text-destructive/40 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No Results Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              We couldn't find matches for "{query}". Try checking your spelling or searching for general categories like "tetra", "anubias", or "filter".
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/fish" className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-colors">
                Browse Fish
              </Link>
              <Link href="/plants" className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-colors">
                Browse Plants
              </Link>
              <Link href="/equipment" className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-colors">
                Browse Equipment
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-16 text-left">
            {/* Fish Results */}
            {searchAnalysis.fish.length > 0 && (
              <div>
                <h2 className="text-2xl font-poppins font-bold mb-6 flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
                  <FishIcon className="w-6 h-6 text-cyan-500" /> Fish Library ({searchAnalysis.fish.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchAnalysis.fish.map((fish) => (
                    <div key={fish.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between">
                      <div>
                        <div className="relative h-44 w-full bg-muted overflow-hidden shrink-0">
                          <Image src={fish.image} alt={fish.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-md px-2 py-0.5 rounded text-xs font-semibold">
                            {fish.difficulty}
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-bold group-hover:text-cyan-500 transition-colors line-clamp-1">{fish.name}</h3>
                          <p className="text-xs text-muted-foreground italic mb-3">{fish.scientificName}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{fish.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                            <span>Min Tank: <strong>{fish.minTankSize} Gal</strong></span>
                            <span>Adult Size: <strong>{fish.maxSize}"</strong></span>
                            <span>pH: <strong>{fish.ph}</strong></span>
                            <span className="truncate">Behavior: <strong>{fish.temperament}</strong></span>
                          </div>
                        </div>
                      </div>
                      <div className="px-5 pb-5">
                        <Link
                          href={`/fish/${fish.category?.toLowerCase() || "unknown"}/${fish.slug}`}
                          className="w-full py-2 bg-muted hover:bg-cyan-500 hover:text-slate-900 text-center rounded-xl text-sm font-semibold transition-colors block"
                        >
                          View Fish Guide
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Plant Results */}
            {searchAnalysis.plants.length > 0 && (
              <div>
                <h2 className="text-2xl font-poppins font-bold mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
                  <LeafIcon className="w-6 h-6 text-emerald-500" /> Aquatic Plants ({searchAnalysis.plants.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchAnalysis.plants.map((plant) => (
                    <div key={plant.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between">
                      <div>
                        <div className="relative h-44 w-full bg-muted overflow-hidden shrink-0">
                          <Image src={plant.image} alt={plant.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-md px-2 py-0.5 rounded text-xs font-semibold">
                            {plant.difficulty} Care
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-bold group-hover:text-emerald-600 transition-colors line-clamp-1">{plant.name}</h3>
                          <p className="text-xs text-muted-foreground italic mb-3">{plant.scientificName}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{plant.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                            <span>Light: <strong>{plant.light}</strong></span>
                            <span>CO2: <strong>{plant.co2}</strong></span>
                            <span className="col-span-2 truncate">Placement: <strong>{plant.placement}</strong></span>
                          </div>
                        </div>
                      </div>
                      <div className="px-5 pb-5">
                        <Link
                          href={`/plants/${plant.slug}`}
                          className="w-full py-2 bg-muted hover:bg-emerald-500 hover:text-slate-900 text-center rounded-xl text-sm font-semibold transition-colors block"
                        >
                          View Plant Guide
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment Results */}
            {searchAnalysis.equipment.length > 0 && (
              <div>
                <h2 className="text-2xl font-poppins font-bold mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-3">
                  <SettingsIcon className="w-6 h-6 text-amber-500" /> Equipment & Hardware ({searchAnalysis.equipment.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchAnalysis.equipment.map((eq) => (
                    <div key={eq.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between">
                      <div>
                        <div className="relative h-44 w-full bg-muted overflow-hidden shrink-0">
                          <Image src={eq.image || "/hero_aquarium.jpg"} alt={eq.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-md px-2 py-0.5 rounded text-xs font-semibold">
                            {eq.category}
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-bold group-hover:text-amber-500 transition-colors line-clamp-1">{eq.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 mt-2">{eq.description}</p>
                        </div>
                      </div>
                      <div className="px-5 pb-5">
                        <Link
                          href={`/equipment/${eq.slug}`}
                          className="w-full py-2 bg-muted hover:bg-amber-500 hover:text-slate-900 text-center rounded-xl text-sm font-semibold transition-colors block"
                        >
                          View Equipment Guide
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-muted-foreground">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}

