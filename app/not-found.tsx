import Link from "next/link";
import { Home, Compass, Waves } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#030712] text-slate-100 flex items-center justify-center py-16 px-4 relative font-sans text-center">
      <div className="max-w-md w-full flex flex-col items-center gap-6">
        
        {/* Subtle Icon Mark */}
        <div className="w-16 h-16 rounded-3xl bg-teal-950/50 border border-teal-500/20 flex items-center justify-center text-teal-400">
          <Waves className="w-8 h-8 text-teal-400 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-teal-400">404 Error</span>
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-white tracking-tight">
            Looks like this page drifted away.
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center pt-2 text-xs font-semibold">
          <Link
            href="/"
            className="px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back Home</span>
          </Link>

          <Link
            href="/fish"
            className="px-5 py-3 bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-teal-400" />
            <span>Explore Fish</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
