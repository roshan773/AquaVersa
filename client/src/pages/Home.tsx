import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useMutation } from '@tanstack/react-query';
import { subscribeNewsletter } from '../services/api';
import { 
  Fish, BookOpen, Leaf, ShieldAlert, Calculator, Wrench,
  CheckCircle, Play, ChevronRight, Compass, Heart, Users, Star, BookOpenText,
  Send, CheckCircle2, AlertCircle
} from 'lucide-react';

export const Home: React.FC = () => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const newsletterMutation = useMutation({
    mutationFn: (emailStr: string) => subscribeNewsletter(emailStr),
    onSuccess: (data) => {
      setToast({ message: data.message || 'Successfully joined the newsletter!', type: 'success' });
      setNewsletterEmail('');
      setTimeout(() => setToast(null), 4000);
    },
    onError: (err: any) => {
      setToast({
        message: err.response?.data?.error || 'Failed to subscribe. Please try again.',
        type: 'error',
      });
      setTimeout(() => setToast(null), 4000);
    }
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      newsletterMutation.mutate(newsletterEmail.trim());
    }
  };

  useEffect(() => {
    // GSAP Reveal Animations
    gsap.fromTo('.hero-subtitle-badge',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out', delay: 0.2 }
    );
    gsap.fromTo('.hero-subtitle', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out', delay: 0.4 }
    );
    gsap.fromTo('.hero-buttons', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out', delay: 0.6 }
    );
  }, []);

  const categories = [
    {
      title: 'Fish Encyclopedia',
      desc: '500+ species with detailed care requirements.',
      icon: Fish,
      href: '/fish',
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Equipment',
      desc: 'Expert reviews on filtration, lighting & heaters.',
      icon: Wrench,
      href: '/equipment',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Learn',
      desc: 'Master the chemistry of aquascaping and cycles.',
      icon: BookOpenText,
      href: '/guides',
      image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Plants',
      desc: 'Discover growth parameters for aquatic flora.',
      icon: Leaf,
      href: '/plants',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Diseases',
      desc: 'Identify symptoms & implement medication cures.',
      icon: ShieldAlert,
      href: '/diseases',
      image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Calculators',
      desc: 'Automated dimension, heater & volume sizing tools.',
      icon: Calculator,
      href: '/calculators',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600',
    },
  ];

  const featuredGuides = [
    {
      title: 'How to Cycle Your Aquarium',
      badge: 'BEGINNER',
      badgeColor: 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20',
      excerpt: 'Step-by-step guide to establishing the biological filter in your new tank.',
      readTime: '7 min read',
      level: 'Beginner',
      slug: 'how-to-cycle-your-aquarium',
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Betta Fish Care Complete Guide',
      badge: 'CARE GUIDE',
      badgeColor: 'bg-sky-500/10 text-sky-450 border-sky-500/20',
      excerpt: 'Everything you need to know about Betta fish care and compatibility.',
      readTime: '10 min read',
      level: 'All Levels',
      slug: 'betta-fish-care-complete-guide',
      image: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Top 10 Easy Aquarium Plants',
      badge: 'PLANTS',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      excerpt: 'Best low-maintenance plants for beginners setting up low-tech aquariums.',
      readTime: '6 min read',
      level: 'Beginner',
      slug: 'top-10-easy-aquarium-plants',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Water Parameters Explained',
      badge: 'WATER QUALITY',
      badgeColor: 'bg-amber-500/10 text-amber-450 border-amber-500/20',
      excerpt: 'Understand ammonia, nitrite, nitrate, pH, and water chemistry.',
      readTime: '8 min read',
      level: 'All Levels',
      slug: 'water-parameters-explained',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Aquarium Setup Checklist',
      badge: 'SETUP',
      badgeColor: 'bg-orange-500/10 text-orange-450 border-orange-500/20',
      excerpt: 'Ensure everything is perfectly configured before stocking fish.',
      readTime: '5 min read',
      level: 'Beginner',
      slug: 'aquarium-setup-checklist',
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Aquascaping Design Principles',
      badge: 'DESIGN',
      badgeColor: 'bg-purple-500/10 text-purple-450 border-purple-500/20',
      excerpt: 'Create depth and focal elements using rocks, wood, and layouts.',
      readTime: '8 min read',
      level: 'Intermediate',
      slug: 'aquascaping-design-principles',
      image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="pb-24 space-y-36 relative z-10">
      
      {/* ----------------- Section 1: Hero Section ----------------- */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden border-b border-slate-900/60">
        
        {/* Underwater Background Image Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=1920" 
            alt="Underwater Aquascape" 
            className="w-full h-full object-cover opacity-15 filter blur-[3px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/50 to-[#030712]" />
        </div>

        {/* Subtle grid accent */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ 
               backgroundImage: `radial-gradient(circle, #38bdf8 1px, transparent 1px)`, 
               backgroundSize: '32px 32px' 
             }} 
        />

        <div className="z-10 max-w-4xl space-y-6 pt-12">
          {/* Logo icon header */}
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800/80 hero-subtitle-badge shadow-lg">
              <Compass className="h-6 w-6 text-sky-400" />
            </div>
          </div>

          <div className="hero-subtitle-badge text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
            Explore. Learn. Build.
          </div>

          <h1 className="hero-title text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-slate-550">
            Dive Into the World <br/> of <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Aquatic Life</span>
          </h1>

          <p className="hero-subtitle text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold">
            Your ultimate guide to freshwater aquariums. Learn species parameters, verify compatibility, and build your perfect underwater world.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              to="/fish"
              className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold rounded-full transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg border border-sky-400/25 btn-glow-cyan cursor-pointer"
            >
              <span>Start Exploring</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/guides"
              className="w-full sm:w-auto px-8 py-4 border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:text-sky-400 text-slate-300 font-bold rounded-full transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <Play className="h-4 w-4 fill-current text-sky-400" />
              <span>Learn More</span>
            </Link>
          </div>
        </div>

        {/* Decorative Right dot navigation index */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className={`h-2.5 w-2.5 rounded-full border border-slate-800 transition-colors ${i === 1 ? 'bg-sky-400 border-sky-400' : 'bg-transparent'}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 flex flex-col items-center space-y-2 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] animate-bounce">
          <div className="w-6 h-10 rounded-full border border-slate-800 flex justify-center p-1.5 bg-slate-950/40">
            <div className="w-1 h-2 bg-slate-500 rounded-full" />
          </div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ----------------- Section 2: Explore Categories ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Explore Categories</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 relative pb-4 inline-block">
            <span>What are you looking for?</span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-sky-500 rounded shadow-md shadow-sky-500/20" />
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 pt-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <Link
                  to={cat.href}
                  className="glass rounded-3xl block overflow-hidden glass-hover relative group flex flex-col h-full bg-slate-950/40 border border-slate-900/60"
                >
                  {/* Category Image */}
                  <div className="relative h-32 overflow-hidden bg-slate-950/40 border-b border-slate-900/60">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="object-cover w-full h-full filter brightness-75 group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* Badged overlapping icon */}
                  <div className="flex justify-center -mt-6 z-10 relative">
                    <div className="p-3 bg-sky-500 border-4 border-slate-950 text-slate-950 rounded-full shadow-lg shadow-black/45">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-grow text-center space-y-2 pt-3">
                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-sky-400 transition-colors leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 leading-normal font-semibold">
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ----------------- Section 3: Learn & Grow ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Learn & Grow</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-100 leading-tight">
              Start Your Aquatic <br/> Journey Today
            </h2>
            <p className="text-sm text-slate-405 leading-relaxed max-w-lg font-semibold">
              Whether you're a beginner or an experienced aquarist, we provide everything you need to create and maintain a thriving aquarium.
            </p>
            
            <ul className="space-y-3.5 font-bold text-xs text-slate-300">
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <span>Beginner to advanced guides</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <span>Expert tips & best practices</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <span>Beautiful plant & scape ideas</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <span>Healthy fish, healthy aquarium</span>
              </li>
            </ul>

            <div className="pt-4">
              <Link
                to="/guides"
                className="inline-flex items-center space-x-2 px-8 py-3.5 border border-slate-800 text-sky-400 bg-slate-900/40 hover:bg-slate-900 font-bold rounded-full text-xs transition-colors cursor-pointer"
              >
                <span>Begin Learning</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Video Thumbnail */}
          <div className="relative group rounded-3xl overflow-hidden border border-slate-900/60 shadow-2xl aspect-video bg-slate-950/40">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800"
              alt="Aquascaping Introduction Video"
              className="object-cover w-full h-full filter brightness-75 group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play overlay button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-[2px]">
              <button className="p-5 rounded-full bg-sky-500 text-slate-950 shadow-xl transform group-hover:scale-110 transition-transform duration-300 cursor-pointer shadow-sky-500/25">
                <Play className="h-6 w-6 fill-current" />
              </button>
              <span className="text-xs font-bold text-white uppercase tracking-widest mt-4">Watch Introduction</span>
              <span className="text-[10px] text-slate-400 mt-1 font-semibold">2:49 min</span>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- Section 4: Featured Guides ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex justify-between items-end border-b border-slate-900 pb-4">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Featured Guides</p>
            <h2 className="text-3xl font-extrabold text-slate-100">Handpicked for You</h2>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={scrollLeft}
              className="p-2.5 rounded-full border border-slate-800 bg-slate-900/60 text-slate-350 hover:text-sky-400 hover:border-sky-450 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2.5 rounded-full border border-slate-800 bg-slate-900/60 text-slate-350 hover:text-sky-400 hover:border-sky-450 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div 
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto scroll-smooth py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredGuides.map((guide) => (
            <div 
              key={guide.title}
              className="w-[280px] sm:w-[320px] flex-shrink-0"
            >
              <Link
                to={`/guides/${guide.slug}`}
                className="glass rounded-3xl overflow-hidden block hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full bg-slate-950/40 border border-slate-900/60"
              >
                <div className="relative h-44 overflow-hidden bg-slate-950/20 border-b border-slate-900/60">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="object-cover w-full h-full filter brightness-90"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-md border tracking-wider uppercase inline-block ${guide.badgeColor}`}>
                      {guide.badge}
                    </span>
                    <h3 className="font-bold text-sm text-slate-200 line-clamp-2 hover:text-sky-400 transition-colors leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-semibold line-clamp-2">
                      {guide.excerpt}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider pt-2 border-t border-slate-900/60">
                    <span>{guide.readTime}</span>
                    <span>{guide.level}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- Section 5: Premium Newsletter Card ----------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden border border-slate-900 shadow-2xl bg-gradient-to-b from-slate-950/80 to-slate-950/40">
          {/* Ambient light source */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex p-3 bg-sky-500/10 rounded-2xl border border-sky-500/20 text-sky-400">
              <Send className="h-6 w-6 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Join the FishVersa Circle
            </h2>
            <p className="text-sm text-slate-405 leading-relaxed font-semibold">
              Subscribe to get expert aquascaping layouts, water quality checklists, and tropical fish care sheets delivered straight to your email inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow bg-slate-900/60 border border-slate-800 focus:border-sky-400 text-slate-250 px-4 py-3 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sky-450/40 font-semibold"
                required
              />
              <button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md border border-sky-400/25 btn-glow-cyan cursor-pointer transition-all duration-200"
              >
                <span>Subscribe</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ----------------- Section 6: Quality Matters ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Quality Matters</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-100 leading-tight">
              The Right Equipment <br/> Makes All the Difference
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg font-semibold">
              Discover top-quality aquarium equipment recommended by experts and trusted by thousands of aquarists.
            </p>
            
            <div className="pt-4">
              <Link
                to="/equipment"
                className="inline-flex items-center space-x-2 px-8 py-3.5 border border-slate-800 text-sky-400 bg-slate-900/40 hover:bg-slate-900 font-bold rounded-full text-xs transition-colors cursor-pointer"
              >
                <span>Shop Equipment</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Product Shots Image (Filters, canisters) */}
          <div className="relative rounded-3xl overflow-hidden aspect-video border border-slate-900 shadow-2xl bg-slate-950/40">
            <img
              src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800"
              alt="Professional aquarium canister filter and heater setups"
              className="object-cover w-full h-full filter brightness-90 group-hover:scale-103 transition-transform duration-500"
            />
          </div>

        </div>
      </section>

      {/* ----------------- Section 7: Statistics ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950/20 backdrop-blur-sm rounded-3xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center border border-slate-900/80 divide-y md:divide-y-0 md:divide-x divide-slate-900 shadow-2xl">
          <div className="pt-4 md:pt-0 flex flex-col items-center justify-center">
            <Fish className="h-6 w-6 text-sky-400 mb-2" />
            <h3 className="text-2xl font-black text-slate-100 leading-none">500+</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Fish Species</p>
          </div>
          <div className="pt-4 md:pt-0 flex flex-col items-center justify-center">
            <BookOpen className="h-6 w-6 text-sky-400 mb-2" />
            <h3 className="text-2xl font-black text-slate-100 leading-none">120+</h3>
            <p className="text-[10px] font-bold text-slate-455 uppercase tracking-widest mt-2">Guides & Articles</p>
          </div>
          <div className="pt-4 md:pt-0 flex flex-col items-center justify-center">
            <Users className="h-6 w-6 text-sky-400 mb-2" />
            <h3 className="text-2xl font-black text-slate-100 leading-none">15K+</h3>
            <p className="text-[10px] font-bold text-slate-455 uppercase tracking-widest mt-2">Happy Aquarists</p>
          </div>
          <div className="pt-4 md:pt-0 flex flex-col items-center justify-center">
            <Star className="h-6 w-6 text-sky-400 mb-2" />
            <h3 className="text-2xl font-black text-slate-100 leading-none">50+</h3>
            <p className="text-[10px] font-bold text-slate-455 uppercase tracking-widest mt-2">Expert Contributors</p>
          </div>
          <div className="pt-4 md:pt-0 flex flex-col items-center justify-center">
            <Heart className="h-6 w-6 text-rose-500 mb-2" />
            <h3 className="text-2xl font-black text-slate-100 leading-none">4.9/5</h3>
            <p className="text-[10px] font-bold text-slate-455 uppercase tracking-widest mt-2">User Rating</p>
          </div>
        </div>
      </section>

      {/* Floating Inline Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl border backdrop-blur-lg shadow-2xl ${
              toast.type === 'success' 
                ? 'bg-slate-900/90 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10' 
                : 'bg-slate-900/90 border-rose-500/30 text-rose-400 shadow-rose-500/10'
            }`}>
              {toast.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
              )}
              <span className="text-xs font-bold text-slate-100">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default Home;
