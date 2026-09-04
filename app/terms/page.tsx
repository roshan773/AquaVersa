import { Scale, AlertCircle } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Terms and conditions for using the educational aquarium guides on ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/terms`,
  }
};

export default function TermsPage() {
  return (
    <div className="w-full bg-[#030712] text-slate-100 min-h-screen pb-20 text-left font-sans">
      
      {/* Header Banner */}
      <section className="py-16 bg-[#040a14] border-b border-slate-800/80">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-950/60 text-teal-400 mb-4 border border-teal-500/30">
            <Scale className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-white mb-2">Terms & Conditions</h1>
          <p className="text-sm text-slate-400 font-normal max-w-xl mx-auto">
            Guidelines and educational care disclaimers for using {siteConfig.name}.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
          
          {/* Important Educational Disclaimer Alert */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30 text-amber-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold mb-1">Aquarium & Animal Care Disclaimer</strong>
              All guidelines, compatibility checks, water chemistry parameters, and tank sizing rules on {siteConfig.name} are provided solely for general hobbyist educational guidance. Aquarium keepers are responsible for testing their own source water and monitoring their livestock. We do not provide veterinary medicine or commercial engineering warranties.
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">1. Acceptance of Terms</h2>
            <p className="font-normal text-slate-400">
              By accessing and using {siteConfig.name}, you accept and agree to be bound by these Terms & Conditions. If you do not agree, please discontinue using this website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">2. Educational Purpose & Accuracy Limitations</h2>
            <p className="font-normal text-slate-400">
              Aquarium husbandry outcomes depend on numerous biological variables including individual animal temperament, local water chemistry, bacterial colony stability, and daily feeding routines. While we strive to ensure species care profiles reflect accurate hobby standards, parameters may vary for specific strains or biotopes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">3. Limitation of Liability</h2>
            <p className="font-normal text-slate-400">
              {siteConfig.name} and its contributors are not liable for any livestock losses, aquatic plant mortality, water damage, or equipment malfunctions resulting from the use or interpretation of the articles, tools, or checklists published on this platform.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">4. Intellectual Property</h2>
            <p className="font-normal text-slate-400">
              The layout, species guides, custom compatibility algorithms, illustrations, and original editorial content on {siteConfig.name} are protected by copyright. You may view and reference information for personal, non-commercial aquarium keeping.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">5. External Resources & Links</h2>
            <p className="font-normal text-slate-400">
              This site may include reference links to external resources or scientific sources. We do not control or endorse external third-party content.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">6. Contact Information</h2>
            <p className="font-normal text-slate-400 mb-3">
              For questions regarding these terms, please contact us:
            </p>
            <div className="p-4 bg-[#061224] border border-slate-800 rounded-xl text-xs space-y-1">
              <p className="text-white font-semibold">{siteConfig.name}</p>
              <p className="text-slate-400">Email: <a href={`mailto:${siteConfig.contactEmail}`} className="text-teal-400 hover:underline">{siteConfig.contactEmail}</a></p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
            Last updated: September 2026
          </div>

        </div>
      </section>

    </div>
  );
}
