import Link from "next/link";
import { Waves } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-slate-350 pt-20 pb-10 border-t border-slate-900 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          <div className="lg:col-span-2 text-left">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="bg-cyan-500 p-2 rounded-xl group-hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                <Waves className="w-6 h-6 text-slate-900" />
              </div>
              <span className="font-poppins font-bold text-2xl text-white tracking-tight">AquaVersa</span>
            </Link>
            <p className="text-sm text-slate-405 mb-8 max-w-sm leading-relaxed font-light">
              The premier destination for aquarium enthusiasts. We simplify aquatic science so you can build beautiful, thriving underwater ecosystems with confidence.
            </p>
          </div>

          <div className="text-left">
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Ecosystem</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/fish/freshwater" className="text-slate-400 hover:text-red-500 transition-colors">Freshwater Fish</Link></li>
              <li><Link href="/fish/saltwater" className="text-slate-400 hover:text-red-500 transition-colors">Saltwater Fish</Link></li>
              <li><Link href="/plants" className="text-slate-400 hover:text-red-500 transition-colors">Aquatic Plants</Link></li>
              <li><Link href="/equipment" className="text-slate-400 hover:text-red-500 transition-colors">Equipment Guide</Link></li>
              <li><Link href="/food" className="text-slate-400 hover:text-red-500 transition-colors">Fish Food</Link></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/start-aquarium" className="text-slate-400 hover:text-red-500 transition-colors">Beginner's Guide</Link></li>
              <li><Link href="/compatibility" className="text-slate-400 hover:text-red-500 transition-colors">Compatibility Checker</Link></li>
              <li><Link href="/tank-size" className="text-slate-400 hover:text-red-500 transition-colors">Tank Calculator</Link></li>
              <li><Link href="/water-params" className="text-slate-400 hover:text-red-500 transition-colors">Water Chemistry</Link></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="text-slate-400 hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-red-500 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-red-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-red-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 max-w-3xl text-center md:text-left leading-relaxed">
            <strong className="text-slate-400 font-semibold">Disclaimer:</strong> AquaVersa provides educational information for aquarium hobbyists.
            Individual fish temperaments, local source water chemistry, and species requirements can vary significantly.
            Always verify specific requirements before making stocking, hardware, or treatment decisions.
            In the event of an animal health crisis, disease outbreak, or aquatic veterinary emergency, professional assistance should be sought immediately.
          </p>
          <p className="text-xs font-semibold text-slate-600 shrink-0">
            © {new Date().getFullYear()} AquaVersa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
