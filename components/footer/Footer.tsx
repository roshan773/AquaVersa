import Link from 'next/link';
import { ArrowUpRight, Youtube, Instagram, Facebook } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="w-full bg-[#27187e] text-[#f7f7ff] pt-16 pb-12 border-t border-[#3b28ab] mt-auto font-sans text-left relative overflow-hidden">
      {/* Decorative background subtle wave glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#3b28ab]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">

          {/* Brand & Manifesto Column (4 Cols) */}
          <div className="lg:col-span-4 text-left">
            <BrandLogo theme="dark" size="md" className="mb-5" />

            <p className="text-sm text-[#cfcaf5] mb-6 max-w-sm leading-relaxed font-normal">
              An exhaustive, curated encyclopedia &amp; decision toolset for modern aquarists. We provide systematic species dossiers, planted aquascape chemistry, and hardware engineering guidance.
            </p>

            {/* Social Icons with Lucide */}
            <div className="flex items-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Roshan Aquva World YouTube"
                className="w-9 h-9 rounded-xl bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff] flex items-center justify-center text-[#cfcaf5] hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-all shadow-sm"
              >
                <Youtube className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Roshan Aquva World Instagram"
                className="w-9 h-9 rounded-xl bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff] flex items-center justify-center text-[#cfcaf5] hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-all shadow-sm"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Roshan Aquva World Facebook"
                className="w-9 h-9 rounded-xl bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff] flex items-center justify-center text-[#cfcaf5] hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-all shadow-sm"
              >
                <Facebook className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 1: Species & Flora (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[#f7f7ff] font-condensed font-bold text-sm uppercase mb-4 tracking-widest flex items-center gap-1.5">
              <span>Atlas Archives</span>
            </h4>
            <ul className="space-y-2.5 text-sm font-normal">
              <li>
                <Link href="/fish" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors flex items-center justify-between group">
                  <span>Fish Species Library</span>
                  <span className="text-[11px] text-[#cfcaf5]/60 group-hover:text-[#f7f7ff] font-sans">120+</span>
                </Link>
              </li>
              <li>
                <Link href="/plants" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors flex items-center justify-between group">
                  <span>Aquarium Flora</span>
                  <span className="text-[11px] text-[#cfcaf5]/60 group-hover:text-[#f7f7ff] font-sans">45+</span>
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors flex items-center justify-between group">
                  <span>Hardware Archive</span>
                  <span className="text-[11px] text-[#cfcaf5]/60 group-hover:text-[#f7f7ff] font-sans">60+</span>
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors flex items-center justify-between group">
                  <span>Care Guides &amp; Protocols</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Practical Tools (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#f7f7ff] font-condensed font-bold text-sm uppercase mb-4 tracking-widest">
              Aquarium Tools
            </h4>
            <ul className="space-y-2.5 text-sm font-normal">
              <li>
                <Link href="/compatibility" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors flex items-center gap-1.5 group">
                  <span>Fish Compatibility Matrix</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/tank-size" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors flex items-center gap-1.5 group">
                  <span>Tank Volume &amp; Sizing</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/water-params" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors flex items-center gap-1.5 group">
                  <span>Water Chemistry &amp; Parameters</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/start-aquarium" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors flex items-center gap-1.5 group">
                  <span className="font-semibold text-[#f7f7ff]">Beginner Setup Roadmap</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#3b28ab] text-[10px] text-[#f7f7ff] font-bold">START</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atlas Information (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#f7f7ff] font-condensed font-bold text-sm uppercase mb-4 tracking-widest">
              Information &amp; Trust
            </h4>
            <ul className="space-y-2.5 text-sm font-normal">
              <li>
                <Link href="/about" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors">
                  About Roshan Aquva World
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors">
                  Contact Our Editorial Desk
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#cfcaf5] hover:text-[#f7f7ff] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar matching editorial aesthetic */}
        <div className="border-t border-[#3b28ab] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#cfcaf5] font-sans">
              © 2026 <strong className="text-[#f7f7ff] font-semibold">{siteConfig.name}</strong>. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#cfcaf5] font-sans">
            <span className="tracking-widest uppercase font-condensed font-bold text-[#f7f7ff]">
              Learn • Plan • Build • Care
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

