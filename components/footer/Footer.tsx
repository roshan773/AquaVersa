import Link from 'next/link';
import { Waves, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="w-full bg-[#27187e] text-[#f7f7ff] pt-16 pb-12 border-t border-[#3b28ab] mt-auto font-sans text-left">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">

          {/* Left Column: Brand & Description */}
          <div className="lg:col-span-2 text-left">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group inline-flex" aria-label="Roshan Aquva World Home">
              <div className="bg-[#f7f7ff] p-2 rounded-xl group-hover:scale-105 transition-transform shadow-md">
                <Waves className="w-5 h-5 text-[#27187e]" />
              </div>
              <span className="font-display text-2xl font-normal text-[#f7f7ff] tracking-wider">
                {siteConfig.name}
              </span>
            </Link>
            
            <p className="text-xs text-[#f7f7ff]/80 mb-6 max-w-sm leading-relaxed font-normal">
              Practical knowledge for healthier, better-planned aquariums.
            </p>

            <div className="flex items-center gap-2.5 text-xs text-[#f7f7ff]/80">
              <div className="w-7 h-7 rounded-lg bg-[#1f1366] border border-[#3b28ab] flex items-center justify-center shrink-0 text-[#f7f7ff]">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-condensed font-bold text-[#f7f7ff]/70 tracking-wider">Contact Email</span>
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#f7f7ff] hover:underline">
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h4 className="text-[#f7f7ff] font-condensed font-bold uppercase mb-4 text-sm tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-xs font-normal">
              <li><Link href="/fish" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Fish</Link></li>
              <li><Link href="/plants" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Plants</Link></li>
              <li><Link href="/equipment" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Equipment</Link></li>
              <li><Link href="/guides" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Guides</Link></li>
            </ul>
          </div>

          {/* Column 2: Aquarium Tools */}
          <div>
            <h4 className="text-[#f7f7ff] font-condensed font-bold uppercase mb-4 text-sm tracking-wider">Aquarium Tools</h4>
            <ul className="space-y-2.5 text-xs font-normal">
              <li><Link href="/compatibility" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Compatibility Checker</Link></li>
              <li><Link href="/tank-size" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Tank Size Guide</Link></li>
              <li><Link href="/water-params" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Water Chemistry</Link></li>
              <li><Link href="/guides" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Maintenance</Link></li>
              <li><Link href="/start-aquarium" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Beginner Checklist</Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h4 className="text-[#f7f7ff] font-condensed font-bold uppercase mb-4 text-sm tracking-wider">Information</h4>
            <ul className="space-y-2.5 text-xs font-normal">
              <li><Link href="/about" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-[#3b28ab] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-left">
          <p className="text-[11px] text-[#f7f7ff]/70 leading-relaxed max-w-3xl font-sans">
            Roshan Aquva World is an educational aquarium resource. Always research individual species requirements before setting up your habitat.
          </p>
          <p className="text-[11px] text-[#f7f7ff]/90 shrink-0 font-condensed uppercase tracking-wider font-semibold">
            © 2026 {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
