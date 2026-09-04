import Link from 'next/link';
import { Waves } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="w-full bg-[#27187e] text-[#f7f7ff] pt-14 pb-10 border-t border-[#3b28ab] mt-auto font-sans text-left">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-10">

          {/* Left Column: Brand & Socials */}
          <div className="lg:col-span-2 text-left">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex" aria-label="Roshan Aquva World Home">
              <div className="w-7 h-7 rounded-lg bg-[#f7f7ff] flex items-center justify-center text-[#27187e] shadow-sm">
                <Waves className="w-4 h-4" />
              </div>
              <span className="font-display text-xl sm:text-2xl font-normal text-[#f7f7ff] tracking-wider">
                {siteConfig.name}
              </span>
            </Link>
            
            <p className="text-xs text-[#f7f7ff]/75 mb-5 max-w-xs leading-relaxed font-normal">
              Practical knowledge for healthier, better-planned aquariums.
            </p>

            {/* Social Icons with inline SVGs matching the reference */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#1f1366] border border-[#3b28ab] flex items-center justify-center text-[#f7f7ff]/80 hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#1f1366] border border-[#3b28ab] flex items-center justify-center text-[#f7f7ff]/80 hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#1f1366] border border-[#3b28ab] flex items-center justify-center text-[#f7f7ff]/80 hover:text-[#f7f7ff] hover:bg-[#3b28ab] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h4 className="text-[#f7f7ff] font-sans font-bold text-xs uppercase mb-3.5 tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs font-normal">
              <li><Link href="/fish" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Fish</Link></li>
              <li><Link href="/plants" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Plants</Link></li>
              <li><Link href="/equipment" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Equipment</Link></li>
              <li><Link href="/guides" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Guides</Link></li>
            </ul>
          </div>

          {/* Column 2: Aquarium Tools */}
          <div>
            <h4 className="text-[#f7f7ff] font-sans font-bold text-xs uppercase mb-3.5 tracking-wider">Aquarium Tools</h4>
            <ul className="space-y-2 text-xs font-normal">
              <li><Link href="/compatibility" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Compatibility Checker</Link></li>
              <li><Link href="/tank-size" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Tank Size Guide</Link></li>
              <li><Link href="/water-params" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Water Chemistry</Link></li>
              <li><Link href="/guides" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Maintenance</Link></li>
              <li><Link href="/start-aquarium" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Beginner Checklist</Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h4 className="text-[#f7f7ff] font-sans font-bold text-xs uppercase mb-3.5 tracking-wider">Information</h4>
            <ul className="space-y-2 text-xs font-normal">
              <li><Link href="/about" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[#f7f7ff]/75 hover:text-[#f7f7ff] transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching reference */}
        <div className="border-t border-[#3b28ab] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-left">
          <p className="text-[11px] text-[#f7f7ff]/70 font-sans">
            © 2026 {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-[#f7f7ff]/70 font-sans tracking-wide">
            Learn • Plan • Build • Care
          </p>
        </div>
      </div>
    </footer>
  );
}
