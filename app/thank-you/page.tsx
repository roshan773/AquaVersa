import Link from "next/link";
import { ArrowLeft, CheckCircle2, Waves } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Thank You | AquaGuide",
  description: "Thank you for reaching out to AquaGuide. We have received your message.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-black text-slate-100 flex items-center justify-center py-16 px-4 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-955/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-8 glass p-8 md:p-10 rounded-3xl border border-blue-500/10 shadow-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 mb-2 animate-float">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-poppins font-extrabold tracking-tight text-white leading-tight">Thanks for Reaching Out.</h1>
          <p className="text-sm text-slate-400 leading-relaxed font-light">
            We've successfully received your message. Our team will read your inquiry and get back to you shortly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 text-xs font-bold tracking-wider uppercase font-poppins">
          <Link
            href="/"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/10"
          >
            <span>Back to Home →</span>
          </Link>
          <Link
            href="/fish"
            className="px-6 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore AquaGuide →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
