import { ShieldCheck, Mail } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import SubpageHero from "@/components/ui/SubpageHero";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Learn how we collect, process, and protect your information at ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/privacy-policy`,
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#F7F7FF] text-[#27187E] min-h-screen font-readable">
      <SubpageHero
        badge="LEGAL & DATA GOVERNANCE"
        title="PRIVACY POLICY"
        description={`Learn how we collect, use, and protect information when you visit and use ${siteConfig.name}.`}
      />

      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl space-y-8 text-left">
          
          <div className="p-6 rounded-3xl bg-white border-2 border-[#27187E]/15 text-sm md:text-base shadow-sm">
            <p className="text-[#27187E]/80">
              <strong className="text-[#27187E] block mb-1 font-bold">Effective & Last Updated:</strong>
              September 2026
            </p>
          </div>

          <div className="bg-white border-2 border-[#27187E]/15 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">1. Overview & Commitment</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                {siteConfig.name} is an educational knowledge platform and digital field guide built to help aquarium keepers make informed choices about aquatic care. We believe in data minimization: we only collect information necessary to respond to your inquiries and ensure the website operates smoothly.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">2. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-3 text-sm md:text-base text-[#27187E]/80 leading-relaxed">
                <li>
                  <strong className="text-[#27187E]">Contact Form Submissions:</strong> When you submit a message through our Contact page, you voluntarily provide your name, email address, message, and optional phone number. These messages are securely transmitted via our form-processing service, <strong>Web3Forms</strong>, to our email inbox.
                </li>
                <li>
                  <strong className="text-[#27187E]">Local Browser Storage:</strong> We use client-side local storage (<code className="px-2 py-0.5 rounded bg-[#EDEAFC] text-[#27187E] font-bold">localStorage</code>) to store your preferences, such as achievement unlocks, quiz scores, or setup checklist progress. This data remains on your device and is never transmitted to external servers.
                </li>
                <li>
                  <strong className="text-[#27187E]">Website Analytics (Opt-In):</strong> If you choose to accept analytics cookies on our cookie banner, anonymized aggregate telemetry may be processed through Google Analytics to understand popular care topics. If you decline, tracking is disabled.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">3. How We Use Information</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal mb-3">
                Information provided to {siteConfig.name} is used strictly to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-[#27187E]/80 leading-relaxed">
                <li>Respond directly to your care, compatibility, or general inquiries.</li>
                <li>Maintain and improve the quality of species care guides and interactive tools.</li>
                <li>Prevent spam and maintain website integrity.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">4. Third-Party Services & Form Processing</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                Our contact form uses <strong>Web3Forms</strong> as an API endpoint to deliver messages directly to our inbox. We do not sell, rent, monetize, or distribute your email address or personal details to advertisers or third-party marketing brokers.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">5. Data Retention & Security</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                We retain contact email correspondence only as long as necessary to answer your questions and resolve inquiries. We employ secure HTTPS encryption across the entire website.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">6. Contact & Data Inquiries</h2>
              <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal mb-4">
                If you have any questions about this Privacy Policy or wish to request the deletion of past correspondence, please contact us directly:
              </p>
              <div className="p-5 bg-[#EDEAFC] border border-[#27187E]/20 rounded-2xl text-sm md:text-base space-y-1">
                <p className="text-[#27187E] font-bold">{siteConfig.name}</p>
                <p className="text-[#27187E]/80">Email: <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#27187E] font-bold underline hover:opacity-80">{siteConfig.contactEmail}</a></p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
