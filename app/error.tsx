"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, Compass } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console for debugging without exposing trace to users
    console.error("Global boundary error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] bg-[#030712] text-slate-100 flex items-center justify-center py-16 px-4 font-sans text-center">
      <div className="max-w-md w-full space-y-6 p-8 rounded-2xl bg-[#061224] border border-slate-800 shadow-xl">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-poppins font-bold text-white">Something went wrong</h1>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            We couldn&apos;t load this information right now. Please try again.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 text-xs font-semibold">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="border-t border-slate-800 pt-4 flex justify-center">
          <Link
            href="/fish"
            className="text-xs font-medium text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore Fish Library</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
