'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, 
  Shield, 
  Award, 
  ArrowRight, 
  Fish, 
  Leaf, 
  Wrench, 
  Compass, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  Sparkles,
  FlaskConical,
  Scale,
  Users,
  ShieldCheck,
  Globe2,
  ChevronRight
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import GlobalCTA from '@/components/ui/GlobalCTA';
import CareDisclaimer from '@/components/ui/CareDisclaimer';

export default function AboutUsClient() {
  const stats = [
    { value: '120+', label: 'Species Care Profiles', desc: 'Freshwater & saltwater verified profiles' },
    { value: '45+', label: 'Botanical Guides', desc: 'Low-tech & high-light aquatic flora' },
    { value: '6+', label: 'Interactive Calculators', desc: 'Bioload, water parameters, volume & compatibility' },
    { value: '100%', label: 'Independent & Open', desc: 'Science-backed animal welfare first' }
  ];

  const pillars = [
    {
      title: 'Scientific Care Accuracy',
      desc: 'Care parameters, thermal boundaries, and minimum aquarium volume requirements derived from wild biological biotope data and established veterinary guidelines—never scaled down for commercial sales convenience.',
      icon: FlaskConical,
      badge: 'Data Integrity'
    },
    {
      title: 'Animal Welfare & Ethics First',
      desc: 'We advocate strictly for complete biological nitrogen cycle establishment, generous horizontal swimming footprints, and zero stress-inducing territorial cohabitation.',
      icon: Heart,
      badge: 'Fauna Protection'
    },
    {
      title: 'Actionable Practical Guidance',
      desc: 'Demystifying complex water chemistry, pH carbonate buffering (KH/GH), and microbial filtration mechanics into actionable, clear step-by-step guidance for beginners and advanced keepers alike.',
      icon: BookOpen,
      badge: 'Accessible Education'
    },
    {
      title: 'Zero Commercial Bias',
      desc: 'Our compatibility algorithms and hardware recommendations are 100% independent. We do not promote inadequate micro-tanks or uncycled starter kits that compromise aquatic life.',
      icon: ShieldCheck,
      badge: 'Independent Standard'
    }
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Biotope Environmental Research',
      desc: 'Every species profile begins with wild native habitat analysis: Amazonian blackwater, African rift lake alkaline basins, Southeast Asian peat swamps, or Indo-Pacific coral reefs.'
    },
    {
      step: '02',
      title: 'Husbandry Parameter Cross-Verification',
      desc: 'We synthesize temperature tolerances, pH ranges, dGH water hardness, adult growth sizes, and dietary requirements from vetted ichthyological registries.'
    },
    {
      step: '03',
      title: 'Social & Behavioral Testing',
      desc: 'Temperaments are mapped across vertical swimming layers (Surface, Mid-Water, Substrate) to identify territorial boundaries, fin-nipping hazards, and schooling requirements.'
    },
    {
      step: '04',
      title: 'Continuous Peer Review & Keeper Updates',
      desc: 'Our editorial board continually refines recommendations based on evolving aquatic science, biological filtration advancements, and verified hobbyist feedback.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 text-left font-sans marine-pattern-light">
      <div className="site-container pb-20 sm:pb-24">
        
        {/* Editorial Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#27187e]/70 mb-6">
          <Link href="/" className="hover:text-[#27187e] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[#27187e]">About Us</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16 pb-12 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-[#27187e]" />
            <span>The Aquarium Atlas Mission</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-extrabold text-[#27187e] tracking-tight mb-6 leading-[0.95]">
            About Roshan Aquva World
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[#27187e]/90 font-medium max-w-3xl leading-relaxed">
            An independent educational knowledge platform and digital field guide dedicated to empowering aquarists with scientific species profiles, water chemistry tools, and biotope planning resources.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 font-semibold text-sm sm:text-base">
            <Link
              href="/fish"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Species Library</span>
              <ArrowRight className="w-4 h-4 text-[#f7f7ff]" />
            </Link>
            <Link
              href="/compatibility"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] hover:bg-[#edeafc] text-[#27187e] transition-all cursor-pointer"
            >
              <span>Test Compatibility Engine</span>
            </Link>
          </div>
        </div>

        {/* Live Atlas Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#27187e] transition-colors"
            >
              <span className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-[#27187e] leading-none mb-2">
                {s.value}
              </span>
              <div>
                <h3 className="font-sans text-base sm:text-lg font-bold text-[#27187e] mb-1">
                  {s.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#27187e]/75 font-medium leading-snug">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          <div className="lg:col-span-7 bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edeafc] text-[#27187e] text-xs font-bold uppercase tracking-wider mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Origin &amp; Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#27187e] tracking-tight mb-6">
              Why We Built The Aquarium Atlas
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-[#27187e]/85 leading-relaxed font-normal">
              <p>
                Aquarium keeping is one of the most rewarding branches of applied biology. However, beginner and experienced fishkeepers are routinely misled by commercial marketing claims, uncycled miniature tanks, and incompatible stocking combinations sold without warnings.
              </p>
              <p>
                <strong className="text-[#27187e] font-semibold">{siteConfig.name}</strong> was created to replace guesswork with verified science. We provide comprehensive, accessible data on water chemistry tolerances, behavioral temperaments, vertical swimming zones, and sustainable habitat design.
              </p>
              <p>
                Whether you are setting up your very first 10-gallon planted community tank or managing a high-tech Amazonian Discus biotope, our mission is to ensure every aquatic organism in your care thrives in healthy, stable conditions.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#27187e] text-[#f7f7ff] rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b28ab] text-[#f7f7ff] text-xs font-bold uppercase tracking-wider mb-6">
                <Shield className="w-3.5 h-3.5 text-[#cfcaf5]" />
                <span>Core Ethical Commitment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#ffffff] tracking-tight mb-4">
                The 3 Golden Rules of Roshan Aquva World
              </h3>
              <ul className="space-y-4 text-sm sm:text-base text-[#cfcaf5] leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Fishless Cycling Always:</strong> Never subject live fish to toxic ammonia or nitrite spikes during initial tank establishment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Realistic Adult Footprints:</strong> Stocking sizes are calculated from full adult maturity, not store juvenile sizes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Incompatible Cohabitation:</strong> We never recommend pairings that risk fin-nipping, territorial harassment, or predation.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-[#3b28ab] mt-6 text-xs text-[#cfcaf5]/80">
              Published by the Roshan Aquva World Editorial Desk • Updated for 2026 Standards
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#27187e]/70 block mb-2">
              FOUNDATIONAL STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#27187e] tracking-tight mb-3">
              The 4 Pillars of Our Editorial Standards
            </h2>
            <p className="text-base text-[#27187e]/80 leading-relaxed">
              Every species profile, chemistry tool, and care guide adheres to rigorous criteria designed around long-term biological stability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#ffffff] border-2 border-[#cfcaf5] hover:border-[#27187e] rounded-3xl p-8 flex flex-col justify-between shadow-sm transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] flex items-center justify-center text-[#27187e] shadow-xs group-hover:scale-105 transition-transform">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#edeafc] text-[#27187e] text-xs font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-sans font-bold text-[#27187e] mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#27187e]/85 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editorial & Verification Methodology */}
        <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-8 sm:p-12 mb-16 shadow-sm">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#27187e]/70 block mb-2">
              SCIENTIFIC RIGOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#27187e] tracking-tight mb-3">
              How We Research &amp; Verify Care Data
            </h2>
            <p className="text-base text-[#27187e]/80 leading-relaxed">
              Our 4-stage publication protocol ensures that care requirements are accurate, safe, and up to date.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((m) => (
              <div key={m.step} className="bg-[#f7f7ff] border border-[#cfcaf5] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-3xl font-black text-[#27187e]/40 block mb-3">
                    {m.step}
                  </span>
                  <h3 className="font-sans text-lg font-bold text-[#27187e] mb-2 leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#27187e]/80 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Care Disclaimer */}
        <div className="mt-12">
          <CareDisclaimer />
        </div>

      </div>

      <GlobalCTA
        badge="GET IN TOUCH WITH OUR EDITORS"
        title={
          <>
            Have a question or suggestions <br className="hidden sm:inline" />
            for our species archive?
          </>
        }
        description="Our editorial team welcomes keeper corrections, scientific inquiries, and species contribution submissions."
        primaryAction={{
          label: 'Contact Us',
          href: '/contact',
        }}
        secondaryAction={{
          label: 'Explore Species Catalog',
          href: '/fish',
        }}
      />
    </div>
  );
}
