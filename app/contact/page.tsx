'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Waves, 
  Mail, 
  ShieldAlert, 
  MessageSquare, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export default function ContactPage() {
  // Form state
  const [itemName, setItemName] = useState("");
  const [incorrectDetail, setIncorrectDetail] = useState("");
  const [correction, setCorrection] = useState("");
  const [sources, setSources] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const emailTo = "pakhreroshan@gmail.com";

  // Build body template
  const mailBody = `AquaVersa Inaccuracy Report
-----------------------------------------
Item / Species Name:
${itemName || "[Enter Name, e.g. Neon Tetra]"}

Incorrect Detail Displayed:
${incorrectDetail || "[What is currently wrong on the page?]"}

Suggested Correction:
${correction || "[What is the correct information?]"}

Scientific Sources / References:
${sources || "[Optional links or references]"}
`;

  const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent("AquaVersa Inaccuracy Report")}&body=${encodeURIComponent(mailBody)}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailTo);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-24 px-4 relative overflow-hidden flex items-center">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-955/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-955/35 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/40 backdrop-blur-md mb-6 text-cyan-400 text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect & Support</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-poppins font-extrabold tracking-tight mb-4 text-white"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Have setup questions, partnership ideas, or spotted a data error? Reach out to our team. We love collaborating with the community.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Contact Info Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Direct Support Card */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm shadow-xl flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/30 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Direct Support</h3>
                    <a 
                      href={`mailto:${emailTo}`} 
                      className="text-base font-bold text-white hover:text-cyan-400 transition-colors"
                    >
                      {emailTo}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="w-full mt-2 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-750 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard</span>
                    </>
                  ) : (
                    <span>Copy Support Email</span>
                  )}
                </button>
              </div>

              {/* Community Card */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm shadow-xl flex flex-col gap-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/30 flex items-center justify-center text-blue-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Discord Server</h3>
                    <a 
                      href="https://discord.gg/aquaversa" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-white hover:text-blue-400 transition-colors inline-flex items-center gap-1 group/link"
                    >
                      discord.gg/aquaversa
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-light mt-1">
                  Connect with fellow keepers, share layout details, get fast troubleshooting, and show off your planted tanks.
                </p>
              </div>

              {/* Socials Card */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm shadow-xl flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Follow Channels</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Follow us for daily care infographics, hardware compatibility updates, and aquascaping tips.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a 
                    href="https://instagram.com/aquaversa" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold hover:text-cyan-400 transition-all justify-center"
                  >
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </a>
                  <a 
                    href="https://twitter.com/aquaversa" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold hover:text-cyan-400 transition-all justify-center"
                  >
                    <TwitterIcon className="w-4 h-4" /> Twitter
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Signature Team Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 text-xs text-slate-500 font-light border-t border-slate-900/80 leading-relaxed hidden lg:block"
            >
              <p className="font-bold text-slate-400 uppercase tracking-wider mb-2">AquaVersa HQ</p>
              <p>
                AquaVersa Support Team<br/>
                123 Ocean Drive, Suite 400<br/>
                Seaside, CA 94000<br/>
                United States
              </p>
            </motion.div>
          </div>

          {/* RIGHT: Inaccuracy Report Interactive Draft Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 bg-slate-900/30 border border-slate-800/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold uppercase tracking-wider text-xs border-b border-slate-850 pb-4">
                <ShieldAlert className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Report Database Inaccuracy</span>
              </div>

              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Aquarium keeping parameters can evolve. If you notice incorrect compatibility listings, outdated hardware requirements, or biology typos, use this dynamic form to auto-draft a report.
              </p>

              {/* Form Input fields */}
              <div className="space-y-4 pt-2">
                
                {/* Species / Item Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Species or Equipment Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Neon Tetra, Java Fern, Canister Filter"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800/80 bg-slate-950/60 focus:bg-slate-950 text-slate-100 text-sm transition-all focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                  />
                </div>

                {/* Incorrect Details */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    What is incorrect currently?
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Minimum tank size says 5 Gallons, should be 10 Gallons."
                    value={incorrectDetail}
                    onChange={(e) => setIncorrectDetail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800/80 bg-slate-950/60 focus:bg-slate-950 text-slate-100 text-sm transition-all focus:outline-none focus:border-cyan-500 placeholder-slate-600 resize-none"
                  />
                </div>

                {/* Suggested Correction */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Suggested Correction / Update
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Change to 10 Gallons because Tetras need active swimming space."
                    value={correction}
                    onChange={(e) => setCorrection(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800/80 bg-slate-950/60 focus:bg-slate-950 text-slate-100 text-sm transition-all focus:outline-none focus:border-cyan-500 placeholder-slate-600 resize-none"
                  />
                </div>

                {/* Reference Sources */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Reference Sources / Links (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Scientific paper link or experienced breeder guide"
                    value={sources}
                    onChange={(e) => setSources(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800/80 bg-slate-950/60 focus:bg-slate-950 text-slate-100 text-sm transition-all focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                  />
                </div>
              </div>

            </div>

            {/* Form Actions */}
            <div className="pt-8 mt-6 border-t border-slate-850">
              <a 
                href={mailtoUrl}
                className="inline-flex w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 text-sm justify-center items-center gap-2 group"
              >
                <Mail className="w-4 h-4" />
                <span>Launch Email Draft Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <p className="text-[10px] text-slate-500 text-center mt-3 font-light">
                Clicking launches your email client with a pre-formatted template using the values above.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
