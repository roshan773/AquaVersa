"use client";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="container mx-auto px-4 py-24 min-h-[70vh]">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-cyan-500/10 rounded-xl">
            <SearchIcon className="w-8 h-8 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Search Results</h1>
            <p className="text-muted-foreground text-lg">Showing results for: <span className="text-cyan-600 font-semibold">"{query}"</span></p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold mb-4">We're still indexing!</h2>
          <p className="text-muted-foreground mb-8">
            The search functionality is currently being built out. In the meantime, you can explore our comprehensive guides.
          </p>
          <Link href="/guides" className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-full transition-colors">
            Browse All Guides
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
