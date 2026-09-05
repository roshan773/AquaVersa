import { Scale, AlertCircle } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import SubpageHero from "@/components/ui/SubpageHero";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Terms and conditions for using the educational aquarium guides on ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/terms`,
  }
};

export default function TermsPage() {
  return (
    <div className="w-full bg-[#F7F7FF] text-[#27187E] min-h-screen font-readable">
      <SubpageHero
        badge="LEGAL & CARE DISCLAIMERS"
        title="TERMS & CONDITIONS"
        description={`Guidelines, educational care disclaimers, and terms of service for using ${siteConfig.name}.`}
      />

      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl space-y-8 text-left">
          
          {/* Important Educational Disclaimer Alert */}
          <div className="p-6 rounded-3xl bg-[#EDEAFC] border-2 border-[#27187E]/20 text-[#27187E] text-sm md:text-base flex items-start gap-4 shadow-sm">
            <AlertCircle className="w-6 h-6 shrink-0 text-[#27187E] mt-0.5" />
            <div>
              <strong className="block text-[#27187E] font-black mb-1 text-base md:text-lg">Aquarium Husbandry & Animal Care Disclaimer</strong>
              All guidelines, compatibility checks, water chemistry parameters, and tank sizing calculations on {siteConfig.name} are provided solely for general hobbyist educational guidance. Aquarium keepers are responsible for testing their own source water and monitoring their individual livestock. We do not provide veterinary medicine, chemical engineering, or commercial warranties.
            </div>
          </div>

          <div className="bg-white border-2 border-[#27187E]/15 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">1. Acceptance of Terms</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                By accessing and using {siteConfig.name}, you accept and agree to be bound by these Terms & Conditions. If you do not agree with any portion of these terms, please discontinue using this website.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">2. Educational Purpose & Accuracy Limitations</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                Aquarium husbandry outcomes depend on numerous biological variables including individual animal temperament, local source water chemistry, bacterial colony stability, and daily feeding routines. While we strive to ensure species care profiles reflect accurate hobby standards, parameters may vary for specific wild or captive-bred strains.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">3. Limitation of Liability</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                {siteConfig.name} and its contributors are not liable for any livestock losses, aquatic plant mortality, water damage, or equipment malfunctions resulting from the use or interpretation of the articles, tools, or checklists published on this platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">4. Intellectual Property</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                The layout, species guides, custom compatibility algorithms, illustrations, and original editorial content on {siteConfig.name} are protected by copyright. You may view and reference information for personal, non-commercial aquarium keeping.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">5. External Resources & Links</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                This site may include reference links to external resources or scientific sources. We do not control or endorse external third-party content.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">6. Contact Information</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal mb-4">
                For questions regarding these terms, please contact us:
              </p>
              <div className="p-5 bg-[#EDEAFC] border border-[#27187E]/20 rounded-2xl text-sm md:text-base space-y-1">
                <p className="text-[#27187E] font-bold">{siteConfig.name}</p>
                <p className="text-[#27187E]/80">Email: <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#27187E] font-bold underline hover:opacity-80">{siteConfig.contactEmail}</a></p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#27187E]/10 text-xs md:text-sm text-[#27187E]/60">
              Effective & Last Updated: September 2026
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
