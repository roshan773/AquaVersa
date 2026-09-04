import { ShieldCheck, Mail } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Learn how we collect, process, and protect your information at ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/privacy-policy`,
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#030712] text-slate-100 min-h-screen pb-20 text-left font-sans">
      
      {/* Header Banner */}
      <section className="py-16 bg-[#040a14] border-b border-slate-800/80">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-950/60 text-teal-400 mb-4 border border-teal-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-400 font-normal max-w-xl mx-auto">
            How we collect, use, and protect information when you visit {siteConfig.name}.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
          
          <div className="p-4 rounded-xl bg-[#061224] border border-slate-800 text-xs">
            <p className="text-slate-400">
              <strong className="text-white block mb-1">Effective & Last Updated:</strong>
              September 2026
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">1. Overview & Commitment</h2>
            <p className="font-normal text-slate-400">
              {siteConfig.name} is an educational website built to help aquarium keepers make informed choices about aquatic care. We believe in data minimization: we only collect information necessary to respond to your inquiries and ensure the website operates smoothly.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Contact Form Submissions:</strong> When you submit a message through our Contact page, you voluntarily provide your name, email address, message, and optional phone number. These messages are securely transmitted via our form-processing service, <strong>Web3Forms</strong>, to our email inbox.
              </li>
              <li>
                <strong className="text-slate-200">Local Browser Storage:</strong> We use client-side local storage (<code className="text-teal-300">localStorage</code>) to store your preferences, such as cookie consent acknowledgments or setup checklist progress. This data remains on your device and is never transmitted to external servers.
              </li>
              <li>
                <strong className="text-slate-200">Website Analytics (Opt-In):</strong> If you choose to accept analytics cookies on our cookie banner, anonymized aggregate telemetry may be processed through Google Analytics to understand popular care topics. If you decline, tracking is disabled.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">3. How We Use Information</h2>
            <p className="font-normal text-slate-400 mb-2">
              Information provided to {siteConfig.name} is used strictly to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>Respond directly to your care, compatibility, or general inquiries.</li>
              <li>Maintain and improve the quality of species care guides and interactive tools.</li>
              <li>Prevent spam and maintain website integrity.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">4. Third-Party Services & Form Processing</h2>
            <p className="font-normal text-slate-400">
              Our contact form uses <strong>Web3Forms</strong> as an API endpoint to deliver messages directly to our inbox. We do not sell, rent, monetize, or distribute your email address or personal details to advertisers or third-party marketing brokers.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">5. Data Retention & Security</h2>
            <p className="font-normal text-slate-400">
              We retain contact email correspondence only as long as necessary to answer your questions and resolve inquiries. We employ secure HTTPS encryption across the entire website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3 font-poppins">6. Contact & Data Inquiries</h2>
            <p className="font-normal text-slate-400 mb-3">
              If you have any questions about this Privacy Policy or wish to request the deletion of past correspondence, please contact us directly:
            </p>
            <div className="p-4 bg-[#061224] border border-slate-800 rounded-xl text-xs space-y-1">
              <p className="text-white font-semibold">{siteConfig.name}</p>
              <p className="text-slate-400">Email: <a href={`mailto:${siteConfig.contactEmail}`} className="text-teal-400 hover:underline">{siteConfig.contactEmail}</a></p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
