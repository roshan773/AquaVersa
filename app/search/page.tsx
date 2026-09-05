"use client";

import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, Fish as FishIcon, Leaf as LeafIcon, Settings as SettingsIcon, Sparkles, AlertCircle, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useMemo } from "react";
import { fishData } from "@/data/fish";
import { siteConfig } from "@/config/site";
import { plantData } from "@/data/plants";
import { equipmentData } from "@/data/equipment";
import GlobalCTA from "@/components/ui/GlobalCTA";

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

    // 1. Tank Size Filter
    const gallonMatch = normalizedQuery.match(/(\d+)\s*(?:gallon|gal|g)\b/i);
    if (gallonMatch) {
      const gallons = parseInt(gallonMatch[1]);
      filteredFish = filteredFish.filter(f => f.minTankSize && f.minTankSize <= gallons);
      smartFilters.push(`Tank volume: ≤ ${gallons} Gallons`);
    }

    // 2. Temperament Filter
    if (normalizedQuery.includes("peaceful")) {
      filteredFish = filteredFish.filter(f => f.temperament?.toLowerCase().includes("peaceful"));
      smartFilters.push("Temperament: Peaceful Community");
    } else if (normalizedQuery.includes("aggressive") && !normalizedQuery.includes("semi")) {
      filteredFish = filteredFish.filter(f => f.temperament?.toLowerCase().includes("aggressive") && !f.temperament?.toLowerCase().includes("semi"));
      smartFilters.push("Temperament: Aggressive / Territorial");
    } else if (normalizedQuery.includes("semi-aggressive")) {
      filteredFish = filteredFish.filter(f => f.temperament?.toLowerCase().includes("semi-aggressive"));
      smartFilters.push("Temperament: Semi-Aggressive");
    }

    // 3. Care Level Filter
    if (normalizedQuery.includes("beginner") || normalizedQuery.includes("easy")) {
      filteredFish = filteredFish.filter(f => f.difficulty === "Beginner" || f.beginnerSuitable);
      filteredPlants = filteredPlants.filter(p => p.difficulty?.toLowerCase() === "easy");
      smartFilters.push("Care Level: Beginner Friendly");
    }

    // 4. Plant Lighting Filter
    if (normalizedQuery.includes("low light")) {
      filteredPlants = filteredPlants.filter(p => p.light?.toLowerCase().includes("low"));
      smartFilters.push("Lighting: Low Requirement");
    } else if (normalizedQuery.includes("high light")) {
      filteredPlants = filteredPlants.filter(p => p.light?.toLowerCase().includes("high"));
      smartFilters.push("Lighting: High Requirement");
    }

    // 5. Goldfish Plants
    if (normalizedQuery.includes("goldfish") && (normalizedQuery.includes("plant") || normalizedQuery.includes("flora"))) {
      filteredPlants = filteredPlants.filter(p => p.slug === "java-fern" || p.slug === "anubias-nana");
      smartFilters.push("Flora for Herbivorous Goldfish");
      explanation = "Goldfish eat soft plants. We highlighted tough epiphytes like Java Fern and Anubias that remain attached to wood/rocks.";
    }

    // 6. Compatibility check
    if (normalizedQuery.includes("live with") || normalizedQuery.includes("compatible with") || normalizedQuery.includes("can live with")) {
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
            f.category === targetFish.category
          );
          smartFilters.push(`Compatible with: ${targetFish.name}`);
          explanation = `Showing species that can successfully cohabit with ${targetFish.name} based on water chemistry and temperament.`;
        }
      }
    }

    const hasSmartFilters = smartFilters.length > 0;
    
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
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left font-readable marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b-2 border-[#cfcaf5] pb-8">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-[#edeafc] text-[#27187e] rounded-2xl border border-[#cfcaf5]">
              <SearchIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal tracking-tight">
                SEARCH ARCHIVE
              </h1>
              <p className="text-base text-[#27187e]/80 mt-1 font-medium">
                {normalizedQuery ? (
                  <>Showing {totalResults} documented matches for <strong className="text-[#27187e]">"{query}"</strong></>
                ) : (
                  `Query the complete ${siteConfig.name} natural history database`
                )}
              </p>
            </div>
          </div>
          {normalizedQuery && totalResults > 0 && (
            <div className="text-xs sm:text-sm font-semibold bg-[#ffffff] px-4 py-2 rounded-full border border-[#cfcaf5] shrink-0">
              Found: {searchAnalysis.fish.length} Fish • {searchAnalysis.plants.length} Plants • {searchAnalysis.equipment.length} Hardware
            </div>
          )}
        </div>

        {/* NLP Smart Filter badge */}
        {searchAnalysis.smartFilters.length > 0 && (
          <div className="mb-10 p-5 bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl text-left flex gap-3.5 items-start max-w-4xl shadow-sm">
            <Sparkles className="w-5 h-5 text-[#27187e] shrink-0 mt-0.5" />
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#27187e]">Semantic Query Parsed:</span>
                {searchAnalysis.smartFilters.map((filt, idx) => (
                  <span key={idx} className="bg-[#edeafc] text-[#27187e] text-xs font-bold px-3 py-1 rounded-lg border border-[#cfcaf5]">{filt}</span>
                ))}
              </div>
              {searchAnalysis.explanation && (
                <p className="text-sm text-[#27187e]/85 leading-relaxed font-medium pt-1">{searchAnalysis.explanation}</p>
              )}
            </div>
          </div>
        )}

        {!normalizedQuery ? (
          <div className="text-center py-20 bg-[#ffffff] border-2 border-[#cfcaf5] border-dashed rounded-3xl p-8 max-w-2xl mx-auto shadow-sm">
            <SearchIcon className="w-16 h-16 text-[#27187e]/30 mx-auto mb-4" />
            <h2 className="text-3xl font-display text-[#27187e] mb-2">Search the Field Guide Database</h2>
            <p className="text-base text-[#27187e]/80 max-w-md mx-auto mb-6 font-medium leading-relaxed">
              Enter queries like "peaceful fish for 10 gallon", "low light plants", or "canister filter" to explore matching profiles.
            </p>
            <div className="flex justify-center gap-4 text-sm font-semibold">
              <Link href="/fish" className="hover:underline text-[#27187e]">Fish Atlas</Link>
              <span>•</span>
              <Link href="/plants" className="hover:underline text-[#27187e]">Plant Atlas</Link>
              <span>•</span>
              <Link href="/equipment" className="hover:underline text-[#27187e]">Equipment Archive</Link>
            </div>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-20 bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-8 max-w-2xl mx-auto shadow-sm">
            <SearchIcon className="w-16 h-16 text-[#27187e]/40 mx-auto mb-4" />
            <h2 className="text-3xl font-display text-[#27187e] mb-2">No Records Found</h2>
            <p className="text-base text-[#27187e]/80 max-w-md mx-auto mb-8 font-medium">
              We couldn't locate matching records for "{query}". Try searching for general terms like "tetra", "anubias", or "filter".
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/fish" className="px-6 py-3 bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] font-semibold rounded-2xl transition-colors">
                Browse Species
              </Link>
              <Link href="/plants" className="px-6 py-3 bg-[#ffffff] border-2 border-[#27187e] text-[#27187e] font-semibold rounded-2xl hover:bg-[#edeafc] transition-colors">
                Browse Plants
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-16 text-left">
            {/* Fish Results */}
            {searchAnalysis.fish.length > 0 && (
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#27187e] mb-6 flex items-center gap-2.5">
                  <FishIcon className="w-6 h-6 text-[#27187e]" /> Fish Species Matches ({searchAnalysis.fish.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchAnalysis.fish.map((fish) => (
                    <div key={fish.id} className="rounded-3xl border-2 border-[#cfcaf5] bg-[#ffffff] overflow-hidden hover:border-[#27187e] transition-all flex flex-col justify-between shadow-sm p-6">
                      <div>
                        <div className="relative h-44 w-full bg-[#12093d] rounded-2xl overflow-hidden mb-4">
                          <Image src={fish.image} alt={fish.name} fill className="object-cover" sizes="300px" />
                          <div className="absolute top-3 right-3 bg-[#f7f7ff] text-[#27187e] border border-[#cfcaf5] px-2.5 py-1 rounded-md text-xs font-bold uppercase">
                            {fish.difficulty}
                          </div>
                        </div>
                        <h3 className="text-2xl font-display font-normal text-[#27187e] mb-1">{fish.name}</h3>
                        <p className="text-xs text-[#27187e]/70 italic mb-3">{fish.scientificName}</p>
                        <p className="text-sm text-[#27187e]/85 line-clamp-2 mb-4 font-medium">{fish.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs bg-[#f7f7ff] p-3 rounded-xl border border-[#cfcaf5] font-semibold">
                          <span>Min Tank: {fish.minTankSize} Gal</span>
                          <span>Care: {fish.difficulty}</span>
                        </div>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#edeafc]">
                        <Link
                          href={`/fish/${fish.category?.toLowerCase() || "freshwater"}/${fish.slug}`}
                          className="w-full py-2.5 bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-center rounded-xl text-xs uppercase tracking-wider font-bold transition-all block shadow-sm"
                        >
                          View Species Sheet
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
                <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#27187e] mb-6 flex items-center gap-2.5">
                  <LeafIcon className="w-6 h-6 text-[#27187e]" /> Aquatic Plant Matches ({searchAnalysis.plants.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchAnalysis.plants.map((plant) => (
                    <div key={plant.id} className="rounded-3xl border-2 border-[#cfcaf5] bg-[#ffffff] overflow-hidden hover:border-[#27187e] transition-all flex flex-col justify-between shadow-sm p-6">
                      <div>
                        <div className="relative h-44 w-full bg-[#12093d] rounded-2xl overflow-hidden mb-4">
                          <Image src={plant.image} alt={plant.name} fill className="object-cover" sizes="300px" />
                          <div className="absolute top-3 right-3 bg-[#f7f7ff] text-[#27187e] border border-[#cfcaf5] px-2.5 py-1 rounded-md text-xs font-bold uppercase">
                            {plant.difficulty}
                          </div>
                        </div>
                        <h3 className="text-2xl font-display font-normal text-[#27187e] mb-1">{plant.name}</h3>
                        <p className="text-xs text-[#27187e]/70 italic mb-3">{plant.scientificName}</p>
                        <p className="text-sm text-[#27187e]/85 line-clamp-2 mb-4 font-medium">{plant.description}</p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#edeafc]">
                        <Link
                          href={`/plants/${plant.slug}`}
                          className="w-full py-2.5 bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-center rounded-xl text-xs uppercase tracking-wider font-bold transition-all block shadow-sm"
                        >
                          View Care Profile
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
                <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#27187e] mb-6 flex items-center gap-2.5">
                  <SettingsIcon className="w-6 h-6 text-[#27187e]" /> Equipment Specs ({searchAnalysis.equipment.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchAnalysis.equipment.map((eq) => (
                    <div key={eq.id} className="rounded-3xl border-2 border-[#cfcaf5] bg-[#ffffff] overflow-hidden hover:border-[#27187e] transition-all flex flex-col justify-between shadow-sm p-6">
                      <div>
                        <div className="relative h-44 w-full bg-[#f7f7ff] rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-4">
                          <Image src={eq.image} alt={eq.name} fill className="object-contain p-2" sizes="300px" />
                        </div>
                        <h3 className="text-2xl font-display font-normal text-[#27187e] mb-1">{eq.name}</h3>
                        <p className="text-sm text-[#27187e]/85 line-clamp-2 mb-4 font-medium">{eq.description}</p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#edeafc]">
                        <Link
                          href={`/equipment/${eq.slug}`}
                          className="w-full py-2.5 bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] text-center rounded-xl text-xs uppercase tracking-wider font-bold transition-all block shadow-sm"
                        >
                          Read Hardware Guide
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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7ff] text-[#27187e] font-readable font-semibold">
        Searching digital archive...
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
