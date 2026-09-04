import Link from "next/link";
import { Waves, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="w-full bg-[#02050c] text-slate-400 pt-16 pb-12 border-t border-slate-800/80 mt-auto font-sans text-left">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-2 text-left">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group inline-flex" aria-label="Roshan Aquva World Home">
              <div className="bg-teal-600/20 border border-teal-500/30 p-2 rounded-xl group-hover:bg-teal-500/30 transition-colors">
                <Waves className="w-5 h-5 text-teal-400" />
              </div>
              <span className="font-poppins font-bold text-xl text-white tracking-tight group-hover:text-teal-200 transition-colors">
                {siteConfig.name}
              </span>
            </Link>
            
            <p className="text-xs text-slate-400 mb-6 max-w-sm leading-relaxed font-normal">
              An educational aquarium care platform built for hobbyists. We provide practical guidance on species requirements, tank setups, water chemistry, and biological compatibility.
            </p>

            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-teal-400">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Contact Email</span>
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-slate-300 hover:text-teal-300 transition-colors">
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider font-poppins">Explore</h4>
            <ul className="space-y-2.5 text-xs font-normal">
              <li><Link href="/fish" className="text-slate-400 hover:text-teal-300 transition-colors">Fish Catalog</Link></li>
              <li><Link href="/fish/freshwater" className="text-slate-400 hover:text-teal-300 transition-colors">Freshwater Fish</Link></li>
              <li><Link href="/fish/saltwater" className="text-slate-400 hover:text-teal-300 transition-colors">Saltwater & Reef</Link></li>
              <li><Link href="/plants" className="text-slate-400 hover:text-teal-300 transition-colors">Aquatic Plants</Link></li>
              <li><Link href="/equipment" className="text-slate-400 hover:text-teal-300 transition-colors">Equipment Guide</Link></li>
              <li><Link href="/guides" className="text-slate-400 hover:text-teal-300 transition-colors">Care Guides</Link></li>
            </ul>
          </div>

          {/* Aquarium Tools Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider font-poppins">Aquarium Tools</h4>
            <ul className="space-y-2.5 text-xs font-normal">
              <li><Link href="/compatibility" className="text-slate-400 hover:text-teal-300 transition-colors">Compatibility Checker</Link></li>
              <li><Link href="/tank-size" className="text-slate-400 hover:text-teal-300 transition-colors">Tank Size Guide</Link></li>
              <li><Link href="/water-params" className="text-slate-400 hover:text-teal-300 transition-colors">Water Chemistry</Link></li>
              <li><Link href="/start-aquarium" className="text-slate-400 hover:text-teal-300 transition-colors">Beginner Checklist</Link></li>
              <li><Link href="/guides" className="text-slate-400 hover:text-teal-300 transition-colors">Maintenance Schedule</Link></li>
            </ul>
          </div>

          {/* Information & Legal Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider font-poppins">Information</h4>
            <ul className="space-y-2.5 text-xs font-normal">
              <li><Link href="/about" className="text-slate-400 hover:text-teal-300 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-teal-300 transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-slate-400 hover:text-teal-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-teal-300 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-slate-900/90 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-left">
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-3xl">
            <strong className="text-slate-400 font-medium">Disclaimer:</strong> {siteConfig.name} is an educational resource for aquarium hobbyists. Individual animal temperament, local tap water chemistry, and tank conditions vary. Always monitor parameters and verify species requirements before introducing livestock.
          </p>
          <p className="text-[11px] text-slate-500 shrink-0">
            © 2026 {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
