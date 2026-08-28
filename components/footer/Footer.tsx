import Link from "next/link";
import { Waves } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-slate-400 pt-20 pb-10 border-t border-slate-900 mt-auto font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          <div className="lg:col-span-2 text-left">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <span className="font-poppins font-bold text-2xl text-white tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-slate-500 mb-8 max-w-sm leading-relaxed font-light">
              The premier destination for aquarium enthusiasts. We simplify aquatic science so you can build beautiful, thriving underwater ecosystems with confidence.
            </p>
            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-500 uppercase tracking-widest text-[10px]">Headquarters Address</p>
              <p>{siteConfig.contactAddress.full}</p>
              <p>Email: {siteConfig.contactEmail}</p>
            </div>
          </div>

          <div className="text-left">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest font-poppins">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/fish" className="text-slate-400 hover:text-blue-500 transition-colors">Fish Catalog</Link></li>
              <li><Link href="/fish/freshwater" className="text-slate-400 hover:text-blue-500 transition-colors">Freshwater Fish</Link></li>
              <li><Link href="/fish/saltwater" className="text-slate-400 hover:text-blue-500 transition-colors">Saltwater Fish</Link></li>
              <li><Link href="/plants" className="text-slate-400 hover:text-blue-500 transition-colors">Aquatic Plants</Link></li>
              <li><Link href="/equipment" className="text-slate-400 hover:text-blue-500 transition-colors">Equipment Guide</Link></li>
              <li><Link href="/guides" className="text-slate-400 hover:text-blue-500 transition-colors">All Guides</Link></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest font-poppins">Learn</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/start-aquarium" className="text-slate-400 hover:text-blue-500 transition-colors">Start Aquarium</Link></li>
              <li><Link href="/compatibility" className="text-slate-400 hover:text-blue-500 transition-colors">Fish Compatibility</Link></li>
              <li><Link href="/tank-size" className="text-slate-400 hover:text-blue-500 transition-colors">Tank Size Guide</Link></li>
              <li><Link href="/guides" className="text-slate-400 hover:text-blue-500 transition-colors">Maintenance Guide</Link></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest font-poppins">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="text-slate-400 hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-blue-500 transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-slate-400 hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-blue-500 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-650 max-w-3xl text-center md:text-left leading-relaxed">
            <strong className="text-slate-500 font-semibold">Disclaimer:</strong> {siteConfig.name} provides educational information for aquarium hobbyists.
            Individual fish temperaments, local source water chemistry, and species requirements can vary significantly.
            Always verify specific requirements before making stocking, hardware, or treatment decisions.
            In the event of an animal health crisis, disease outbreak, or aquatic veterinary emergency, professional veterinary assistance should be sought immediately.
          </p>
          <p className="text-xs font-semibold text-slate-600 shrink-0">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
