"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { Disease as DiseaseType } from "@/lib/types";

export default function Diseases() {
  const [diseases, setDiseases] = useState<DiseaseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiseases() {
      try {
        const res = await fetch("/api/diseases");
        if (res.ok) {
          const data = await res.json();
          setDiseases(data);
        }
      } catch (err) {
        console.error("Failed to load diseases data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDiseases();
  }, []);

  return (
    <div className="flex flex-col w-full py-12 bg-background">
      <section className="container mx-auto px-4 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 font-semibold mb-4 border border-red-500/20">
          <ShieldAlert className="w-4 h-4" /> Fish Health Guide
        </div>
        <h1 className="text-5xl font-poppins font-bold mb-4 text-foreground">
          Fish Diseases & Cures
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Identify common aquarium ailments, learn which species are most susceptible, and get step-by-step diagnostic and cure guides.
        </p>
      </section>

      {loading ? (
        <section className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-48 mb-4 rounded-xl bg-muted w-full"></div>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-2/3"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-4/5"></div>
                <div className="h-10 bg-muted rounded-xl w-full pt-2"></div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diseases.map((d, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-muted">
                  <Image 
                    src={d.image} 
                    alt={d.name} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-foreground">{d.name}</h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{d.description}</p>
                
                <div className="space-y-2 mb-6 border-t border-border pt-4 text-sm">
                  <p><span className="font-semibold text-muted-foreground">Susceptible:</span> {d.susceptible.join(", ")}</p>
                  <p><span className="font-semibold text-muted-foreground">Affected Groups:</span> {d.affected.join(", ")}</p>
                  <p className="bg-red-500/5 dark:bg-red-950/10 p-3 rounded-lg border border-red-500/10 text-red-600 dark:text-red-400">
                    <span className="font-bold">Cure Summary:</span> {d.cure}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Link 
                  href={`/diseases/${d.slug}`} 
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  View Treatment Details <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href={`/search?q=${encodeURIComponent(d.name.split(" ")[0])}`} 
                  className="w-full py-2.5 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-xl transition-colors text-center text-xs"
                >
                  Find Susceptible Fish in database
                </Link>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
