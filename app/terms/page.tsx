import { Scale } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service | AquaGuide",
  description: "Terms and conditions for using the AquaGuide / AquvaGuide website.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/terms`,
  }
};

export default function TermsPage() {
  return (
    <div className="w-full bg-black text-slate-100 min-h-screen pb-24 text-left font-sans">
      <section className="py-24 bg-slate-950 text-slate-100 border-b border-slate-900">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 mb-6 border border-blue-500/30">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-extrabold mb-4 text-white">Terms & Conditions</h1>
          <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">
            The rules and guidelines for using the {siteConfig.name} platform.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-invert prose-slate">
          
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-8">
            <h3 className="font-bold text-amber-400 flex items-center gap-2 text-sm mb-2">
              ⚠️ CRITICAL EDUCATIONAL DISCLAIMER
            </h3>
            <p className="text-xs text-slate-350 leading-relaxed font-light">
              {siteConfig.name} (also referred to as AquvaGuide) provides educational aquarium care and compatibility resources. All information, guidelines, calculator outputs, and diagnostic check suggestions are provided for general hobbyist guidance only. <strong>We do not provide veterinary medicine, professional aquatic consulting, or biological engineering advice.</strong>
            </p>
          </div>

          <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">
            By accessing and browsing the {siteConfig.name} website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
          
          <h2 className="text-xl font-bold text-white mb-4">2. Accuracy of Information & Liability</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">
            While we strive to supply scientifically accurate guidelines, variables such as local water parameters, biological cycling stability, and individual animal temperaments mean that outcomes can vary. {siteConfig.name} is not liable for livestock losses, hardware failures, or water damage resulting from the use of guides or planners on this website.
          </p>

          <h2 className="text-xl font-bold text-white mb-4">3. Intellectual Property</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">
            The design, text, logos, custom illustrations, and interactive planning tools (calculators, planners, wizards) are the intellectual property of {siteConfig.name}. Unauthorized copying, commercial reproduction, or scraping of content is strictly prohibited.
          </p>

          <h2 className="text-xl font-bold text-white mb-4">4. External Linking</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">
            Our platform may link to external services or hardware vendors. We do not inspect, endorse, or assume responsibility for third-party websites or services.
          </p>
          
          <h2 className="text-xl font-bold text-white mb-4">5. Contact & Configuration Details</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-4 font-light">
            For terms inquiries or compliance questions, please contact us at:
          </p>
          <div className="p-5 bg-slate-950 border border-slate-900 rounded-2xl mb-8 text-xs font-semibold space-y-1">
            <p className="text-white">{siteConfig.name} Support</p>
            <p className="text-slate-400">Email: {siteConfig.contactEmail}</p>
            <p className="text-slate-400">Address: {siteConfig.contactAddress.full}</p>
          </div>

          <div className="border-t border-slate-900 pt-6 text-[11px] text-slate-500 leading-relaxed font-light">
            <p>Last updated: August 28, 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}
