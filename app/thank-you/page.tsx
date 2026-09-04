import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Thank You | ${siteConfig.name}`,
  description: `Thank you for reaching out to ${siteConfig.name}. We have received your message.`,
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#F7F7FF] text-[#27187E] flex items-center justify-center py-24 px-4 font-sans marine-pattern-light">
      <div className="relative z-10 max-w-lg w-full text-center space-y-8 bg-[#FFFFFF] p-8 md:p-10 rounded-3xl border-2 border-[#CFCAF5] shadow-xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#EDEAFC] border border-[#CFCAF5] text-[#27187E] mb-2">
          <CheckCircle className="w-8 h-8" strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-display font-normal text-[#27187E] leading-tight">
            Thanks for Reaching Out.
          </h1>
          <p className="text-sm text-[#27187E]/80 leading-relaxed">
            We've successfully received your message. Our team will review your inquiry and get back to you shortly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 text-xs font-condensed font-bold tracking-wider uppercase">
          <Link
            href="/"
            className="px-6 py-3.5 bg-[#27187E] hover:bg-[#1B1059] text-[#F7F7FF] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/fish"
            className="px-6 py-3.5 bg-[#EDEAFC] hover:bg-[#CFCAF5] text-[#27187E] rounded-xl transition-colors flex items-center justify-center gap-2 border border-[#CFCAF5]"
          >
            <span>Explore Species Library</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
