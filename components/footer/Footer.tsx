import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="w-full bg-[#27187e] text-[#f7f7ff] pt-16 pb-12 border-t border-[#3b28ab] mt-auto text-left relative overflow-hidden">
      {/* Decorative background subtle wave glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#3b28ab]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">

          {/* Brand & Manifesto Column (4 Cols) */}
          <div className="lg:col-span-4 text-left">
            <BrandLogo theme="dark" size="md" className="mb-5" />

            <p className="font-readable text-sm sm:text-base text-[#cfcaf5] mb-6 max-w-sm leading-relaxed font-normal">
              An educational aquarium knowledge library and practical planning toolset for fishkeepers. Explore species care profiles, planted aquascape chemistry, and hardware guidance.
            </p>

            {/* Social Icons with Lucide Outline Style */}
            <div className="flex items-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Roshan Aquva World YouTube"
                className="w-10 h-10 rounded-xl bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff] flex items-center justify-center text-[#cfcaf5] hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-all shadow-sm cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Roshan Aquva World Instagram"
                className="w-10 h-10 rounded-xl bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff] flex items-center justify-center text-[#cfcaf5] hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-all shadow-sm cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Roshan Aquva World Facebook"
                className="w-10 h-10 rounded-xl bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff] flex items-center justify-center text-[#cfcaf5] hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-all shadow-sm cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Species & Flora (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[#ffffff] font-sans font-bold text-sm sm:text-base uppercase mb-4 tracking-wider">
              Atlas Archives
            </h4>
            <ul className="space-y-3 font-readable text-sm sm:text-base font-normal">
              <li>
                <Link href="/fish" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors flex items-center justify-between group">
                  <span>Fish Library</span>
                  <span className="text-xs text-[#cfcaf5]/80 font-mono">120+</span>
                </Link>
              </li>
              <li>
                <Link href="/plants" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors flex items-center justify-between group">
                  <span>Aquarium Flora</span>
                  <span className="text-xs text-[#cfcaf5]/80 font-mono">45+</span>
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors flex items-center justify-between group">
                  <span>Hardware Archive</span>
                  <span className="text-xs text-[#cfcaf5]/80 font-mono">60+</span>
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors flex items-center justify-between group">
                  <span>Care Guides</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Practical Tools (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#ffffff] font-sans font-bold text-sm sm:text-base uppercase mb-4 tracking-wider">
              Aquarium Tools
            </h4>
            <ul className="space-y-3 font-readable text-sm sm:text-base font-normal">
              <li>
                <Link href="/compatibility" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors flex items-center gap-1.5 group">
                  <span>Compatibility Matrix</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/tank-size" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors flex items-center gap-1.5 group">
                  <span>Tank Volume &amp; Sizing</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/water-analyzer" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors flex items-center gap-1.5 group">
                  <span>Water Chemistry Analyzer</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/start-aquarium" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors flex items-center gap-2 group">
                  <span className="font-semibold text-[#ffffff]">Beginner Setup Roadmap</span>
                  <span className="px-2 py-0.5 rounded bg-[#3b28ab] text-xs text-[#ffffff] font-bold">START</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atlas Information (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#ffffff] font-sans font-bold text-sm sm:text-base uppercase mb-4 tracking-wider">
              Information &amp; Trust
            </h4>
            <ul className="space-y-3 font-readable text-sm sm:text-base font-normal">
              <li>
                <Link href="/about" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors">
                  About Roshan Aquva World
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors">
                  Contact Editorial Desk
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#cfcaf5] hover:text-[#ffffff] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar matching editorial aesthetic */}
        <div className="border-t border-[#3b28ab] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-left font-readable text-sm sm:text-base text-[#cfcaf5]">
          <div className="flex items-center gap-3">
            <span>
              © 2026 <strong className="text-[#ffffff] font-semibold">{siteConfig.name}</strong>. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="tracking-widest uppercase font-sans font-bold text-[#ffffff] text-xs sm:text-sm">
              Learn • Plan • Build • Care
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}


