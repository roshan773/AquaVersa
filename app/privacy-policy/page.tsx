import { ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | AquaGuide",
  description: "Learn how we collect, use, and protect your information at AquaGuide / AquvaGuide.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/privacy-policy`,
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-black text-slate-100 min-h-screen pb-24 text-left font-sans">
      <section className="py-24 bg-slate-950 text-slate-100 border-b border-slate-900">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 mb-6 border border-blue-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-extrabold mb-4 text-white">Privacy Policy</h1>
          <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">
            How we protect, process, and handle your data at {siteConfig.name}.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-invert prose-slate">
          <h2 className="text-xl font-bold text-white mb-4">1. Overview</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">
            At {siteConfig.name} (also referred to as AquvaGuide), we value your trust and prioritize your privacy. This privacy policy describes the types of information we collect through our website, how we use it, and the controls you have over your data.
          </p>
          
          <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-4 font-light">
            We collect only the minimal data necessary to deliver interactive features and understand general site traffic:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-400 space-y-2 mb-6 font-light">
            <li>
              <strong>Contact Form Submissions:</strong> When you send a message through our contact page, we collect your name, email, subject, message, and optional phone number. Submissions are processed securely through <strong>Web3Forms</strong>.
            </li>
            <li>
              <strong>Analytics Data:</strong> If you accept our cookie consent, we collect aggregate, non-personal data through <strong>Google Analytics 4</strong> (such as guides viewed, search inputs used, and button clicks) to help us refine content. IP addresses are anonymized.
            </li>
            <li>
              <strong>Local Browser Storage:</strong> We use your local browser storage (localStorage) to store your cookie consent preferences and progress achievements for interactive tools (like the Aquarium Quiz). This data stays entirely on your device.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-white mb-4">3. Data Sharing & Third Parties</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">
            We do not sell, rent, or distribute your email addresses or personal identification data to third parties. We only share form content with our email submission partner, Web3Forms, to route your message to our support desk.
          </p>

          <h2 className="text-xl font-bold text-white mb-4">4. Cookies & Tracking Control</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">
            We respect your browser choices. Google Analytics 4 is only activated if you click "Accept" on our Cookie Consent banner. If you choose to "Decline" or ignore the banner, no tracking cookies or analytics scripts will load.
          </p>
          
          <h2 className="text-xl font-bold text-white mb-4">5. Contact Information</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-4 font-light">
            If you have questions about this policy or wish to request data deletion, contact us at:
          </p>
          <div className="p-5 bg-slate-950 border border-slate-900 rounded-2xl mb-8 text-xs font-semibold space-y-1">
            <p className="text-white">{siteConfig.name} Support</p>
            <p className="text-slate-400">Email: {siteConfig.contactEmail}</p>
            <p className="text-slate-400">Address: {siteConfig.contactAddress.full}</p>
          </div>

          <div className="border-t border-slate-900 pt-6 text-[11px] text-slate-500 leading-relaxed font-light">
            <p className="mb-2"><strong>Disclaimer:</strong> This Privacy Policy is for educational and informational purposes only. It is not intended to serve as professional legal counsel or binding legal representation. Aquarists are advised to review local jurisdictional laws before adapting templates.</p>
            <p>Last updated: August 28, 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}
