"use client";

import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, Fish as FishIcon, Leaf as LeafIcon, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useMemo } from "react";
import { fishData } from "@/data/fish";
import { plantData } from "@/data/plants";
import { equipmentData } from "@/data/equipment";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const normalizedQuery = query.toLowerCase().trim();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return { fish: [], plants: [], equipment: [] };
    }

    const matchedFish = fishData.filter(
      (f) =>
        f.name.toLowerCase().includes(normalizedQuery) ||
        (f.scientificName && f.scientificName.toLowerCase().includes(normalizedQuery)) ||
        (f.description && f.description.toLowerCase().includes(normalizedQuery)) ||
        (f.category && f.category.toLowerCase().includes(normalizedQuery))
    );

    const matchedPlants = plantData.filter(
      (p) =>
        p.name.toLowerCase().includes(normalizedQuery) ||
        (p.scientificName && p.scientificName.toLowerCase().includes(normalizedQuery)) ||
        (p.description && p.description.toLowerCase().includes(normalizedQuery))
    );

    const matchedEquipment = equipmentData.filter(
      (e) =>
        e.name.toLowerCase().includes(normalizedQuery) ||
        (e.description && e.description.toLowerCase().includes(normalizedQuery)) ||
        (e.purpose && e.purpose.toLowerCase().includes(normalizedQuery)) ||
        (e.category && e.category.toLowerCase().includes(normalizedQuery))
    );

    return {
      fish: matchedFish,
      plants: matchedPlants,
      equipment: matchedEquipment,
    };
  }, [normalizedQuery]);

  const totalResults = results.fish.length + results.plants.length + results.equipment.length;

  return (
    <div className="container mx-auto px-4 py-16 min-h-[85vh]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border pb-8">
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
                  "Explore AquaVersa's library database"
                )}
              </p>
            </div>
          </div>
          {normalizedQuery && totalResults > 0 && (
            <div className="text-sm font-semibold bg-muted px-4 py-2 rounded-full border border-border">
              Found: {results.fish.length} Fish | {results.plants.length} Plants | {results.equipment.length} Gear
            </div>
          )}
        </div>

        {!normalizedQuery ? (
          <div className="text-center py-16 bg-muted/20 border border-border border-dashed rounded-3xl">
            <SearchIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Search the Database</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Enter a query in the search bar above to look for tropical fish, aquatic plants, or essential aquarium equipment.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/fish" className="text-sm font-medium hover:underline text-cyan-600 animate-pulse">Fish Catalog</Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/plants" className="text-sm font-medium hover:underline text-emerald-600 animate-pulse">Plants Catalog</Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/equipment" className="text-sm font-medium hover:underline text-amber-600 animate-pulse">Gear Catalog</Link>
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
          <div className="space-y-16">
            {/* Fish Results */}
            {results.fish.length > 0 && (
              <div>
                <h2 className="text-2xl font-poppins font-bold mb-6 flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
                  <FishIcon className="w-6 h-6 text-cyan-500" /> Fish Library ({results.fish.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.fish.map((fish) => (
                    <div key={fish.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col">
                      <div className="relative h-44 w-full bg-muted overflow-hidden shrink-0">
                        <Image src={fish.image} alt={fish.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-md px-2 py-0.5 rounded text-xs font-semibold">
                          {fish.difficulty}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-cyan-500 transition-colors line-clamp-1">{fish.name}</h3>
                          <p className="text-xs text-muted-foreground italic mb-3">{fish.scientificName}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{fish.description}</p>
                        </div>
                        <Link
                          href={`/fish/${fish.category?.toLowerCase() || "unknown"}/${fish.slug}`}
                          className="w-full py-2 bg-muted hover:bg-cyan-500 hover:text-slate-900 text-center rounded-xl text-sm font-semibold transition-colors block mt-auto"
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
            {results.plants.length > 0 && (
              <div>
                <h2 className="text-2xl font-poppins font-bold mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
                  <LeafIcon className="w-6 h-6 text-emerald-500" /> Aquatic Plants ({results.plants.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.plants.map((plant) => (
                    <div key={plant.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col">
                      <div className="relative h-44 w-full bg-muted overflow-hidden shrink-0">
                        <Image src={plant.image} alt={plant.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-md px-2 py-0.5 rounded text-xs font-semibold">
                          {plant.difficulty} Care
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-emerald-600 transition-colors line-clamp-1">{plant.name}</h3>
                          <p className="text-xs text-muted-foreground italic mb-3">{plant.scientificName}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{plant.description}</p>
                        </div>
                        <Link
                          href={`/plants/${plant.slug}`}
                          className="w-full py-2 bg-muted hover:bg-emerald-500 hover:text-slate-900 text-center rounded-xl text-sm font-semibold transition-colors block mt-auto"
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
            {results.equipment.length > 0 && (
              <div>
                <h2 className="text-2xl font-poppins font-bold mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-3">
                  <SettingsIcon className="w-6 h-6 text-amber-500" /> Equipment & Hardware ({results.equipment.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.equipment.map((eq) => (
                    <div key={eq.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col">
                      <div className="relative h-44 w-full bg-muted overflow-hidden shrink-0">
                        <Image src={eq.image || "/hero_aquarium.jpg"} alt={eq.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 right-3 bg-black/60 text-white backdrop-blur-md px-2 py-0.5 rounded text-xs font-semibold">
                          {eq.category}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-amber-500 transition-colors line-clamp-1">{eq.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 mt-2">{eq.description}</p>
                        </div>
                        <Link
                          href={`/equipment/${eq.slug}`}
                          className="w-full py-2 bg-muted hover:bg-amber-500 hover:text-slate-900 text-center rounded-xl text-sm font-semibold transition-colors block mt-auto"
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
