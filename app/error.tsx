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
    // Log the error to console (excluding sensitive trace info to user)
    console.error("Global boundary error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-slate-100 flex items-center justify-center py-16 px-4 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-955/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-8 glass p-8 md:p-10 rounded-3xl border border-rose-500/10 shadow-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-2">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-poppins font-extrabold tracking-tight text-white">Something Went Wrong</h1>
          <p className="text-sm text-slate-400 leading-relaxed font-light">
            We ran into an unexpected issue trying to display this page. Rest assured, your aquarium is safe, and we are working to resolve the issue.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs tracking-wider uppercase font-poppins transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold rounded-xl text-xs tracking-wider uppercase font-poppins transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="border-t border-slate-900 pt-6 flex justify-center">
          <Link
            href="/fish"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 hover:underline"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Fish Species</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
