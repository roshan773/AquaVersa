import Link from "next/link";
import { Waves } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 pt-20 pb-10 border-t border-slate-200/50 dark:border-slate-800 mt-auto font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          <div className="lg:col-span-2 text-left">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group inline-flex">
              <div className="bg-cyan-500/10 p-2 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                <Waves className="w-5 h-5 text-cyan-500" />
              </div>
              <span className="font-poppins font-bold text-xl text-slate-900 dark:text-white tracking-tight">AquaVersa</span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-sm leading-relaxed font-light">
              The premier destination for aquarium enthusiasts. We simplify aquatic science so you can build beautiful, thriving underwater ecosystems with confidence.
            </p>
          </div>

          <div className="text-left">
            <h4 className="text-slate-900 dark:text-white font-poppins font-bold mb-5 text-sm tracking-widest uppercase">Ecosystem</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
              <li><Link href="/fish/freshwater" className="hover:text-cyan-500 transition-colors">Freshwater Fish</Link></li>
              <li><Link href="/fish/saltwater" className="hover:text-cyan-500 transition-colors">Saltwater Fish</Link></li>
              <li><Link href="/plants" className="hover:text-cyan-500 transition-colors">Aquatic Plants</Link></li>
              <li><Link href="/equipment" className="hover:text-cyan-500 transition-colors">Equipment Guide</Link></li>
              <li><Link href="/food" className="hover:text-cyan-500 transition-colors">Fish Food</Link></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-slate-900 dark:text-white font-poppins font-bold mb-5 text-sm tracking-widest uppercase">Resources</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
              <li><Link href="/start-aquarium" className="hover:text-cyan-500 transition-colors">Beginner's Guide</Link></li>
              <li><Link href="/compatibility" className="hover:text-cyan-500 transition-colors">Compatibility Checker</Link></li>
              <li><Link href="/tank-size" className="hover:text-cyan-500 transition-colors">Tank Calculator</Link></li>
              <li><Link href="/water-params" className="hover:text-cyan-500 transition-colors">Water Chemistry</Link></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-slate-900 dark:text-white font-poppins font-bold mb-5 text-sm tracking-widest uppercase">Company</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
              <li><Link href="/about" className="hover:text-cyan-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-500 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-cyan-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/50 dark:border-slate-800 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-4xl text-left leading-relaxed font-light">
            <strong className="text-slate-500 dark:text-slate-450 font-semibold">Disclaimer:</strong> AquaVersa provides educational information for aquarium hobbyists.
            Individual fish temperaments, local source water chemistry, and species requirements can vary significantly.
            Always verify specific requirements before making stocking, hardware, or treatment decisions.
            In the event of an animal health crisis, disease outbreak, or aquatic veterinary emergency, professional assistance should be sought immediately.
          </p>
          <p className="text-[11px] font-medium text-slate-450 dark:text-slate-500 shrink-0">
            © {new Date().getFullYear()} AquaVersa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
