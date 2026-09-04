import Link from 'next/link';
import { Waves, ArrowUpRight, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
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
            <Link href="/" className="flex items-center gap-3 mb-5 group inline-flex focus:outline-none" aria-label="Roshan Aquva World Home">
              <div className="w-9 h-9 rounded-xl bg-[#f7f7ff] flex items-center justify-center text-[#27187e] shadow-md group-hover:scale-105 transition-transform">
                <Waves className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-normal text-[#f7f7ff] tracking-wider leading-none">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#cfcaf5] font-semibold mt-1">
                  The Aquarium Atlas
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-[#cfcaf5] mb-6 max-w-sm leading-relaxed font-normal">
              An exhaustive, curated encyclopedia &amp; decision toolset for modern aquarists. We provide systematic species dossiers, planted aquascape chemistry, and hardware engineering guidance.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Roshan Aquva World YouTube"
                className="w-9 h-9 rounded-xl bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff] flex items-center justify-center text-[#cfcaf5] hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Roshan Aquva World Instagram"
                className="w-9 h-9 rounded-xl bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff] flex items-center justify-center text-[#cfcaf5] hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Roshan Aquva World Facebook"
                className="w-9 h-9 rounded-xl bg-[#1f1366] border border-[#3b28ab] hover:border-[#f7f7ff] flex items-center justify-center text-[#cfcaf5] hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
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

