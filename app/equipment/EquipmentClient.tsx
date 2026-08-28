"use client";

import { useState } from "react";
import { Equipment as EquipmentType } from "@/lib/types";
import { Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EquipmentClientProps {
  eqList: EquipmentType[];
}

export default function EquipmentClient({ eqList }: EquipmentClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(eqList.map(e => e.category)))];

  const filteredEq = eqList.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          eq.description.toLowerCase().includes(searchTerm.toLowerCase());
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
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Category</label>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category" 
                    value={cat}
                    checked={categoryFilter === cat}
                    onChange={() => setCategoryFilter(cat)}
                    className="text-amber-500 focus:ring-amber-500 bg-background border-border"
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Above the Fold Header & CTA */}
        <div className="p-6 md:p-8 rounded-3xl bg-amber-950/20 border border-amber-500/10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-poppins font-bold tracking-tight text-amber-500">Aquarium Equipment Guides</h1>
            <p className="text-slate-400 max-w-lg leading-relaxed text-sm">
              Learn about biological filters, tropical heaters, full-spectrum lights, and aerators. Find the perfect gear specifications.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/equipment-wizard"
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-600/10 hover:shadow-amber-600/25 transition-all tracking-wider uppercase font-poppins cursor-pointer"
            >
              <span>Equipment Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {filteredEq.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEq.map(eq => (
              <div key={eq.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between text-left">
                <div>
                  <div className="relative h-48 w-full bg-muted overflow-hidden shrink-0">
                    <Image 
                      src={eq.image || "/hero_aquarium.jpg"} 
                      alt={`${eq.name} - ${eq.category} Hardware`} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
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
                    className="w-full py-2.5 bg-muted hover:bg-amber-500 hover:text-slate-900 text-center rounded-xl text-sm font-semibold transition-colors block"
                  >
                    View Spec Guide
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border border-dashed">
            <p className="text-muted-foreground">No equipment matches your current filters.</p>
            <button 
              onClick={() => { setSearchTerm(""); setCategoryFilter("All"); }}
              className="mt-4 text-amber-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
      
    </div>
  );
}
