"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Waves, 
  Heart, 
  Shield, 
  Award, 
  Sparkles, 
  BookOpen, 
  Compass, 
  ArrowRight,
  TrendingUp,
  Fish,
  Leaf,
  Settings
} from "lucide-react";
import { useStats } from "@/components/home/StatsContext";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutUsPage() {
  const { fish, plants, equipment, careTopics } = useStats();

  const stats = [
    { label: "Fish Species", value: `${fish}+`, icon: Fish },
    { label: "Live Plants", value: `${plants}+`, icon: Leaf },
    { label: "Gear Profiles", value: `${equipment}+`, icon: Settings },
    { label: "Total Guides", value: `${careTopics}+`, icon: BookOpen }
  ];
  return (
    <div className="w-full bg-[#020617] text-slate-100 min-h-screen relative overflow-hidden pb-24">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-950/45 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-950/45 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-emerald-950/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative pt-28 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            {/* Branded pill */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/40 backdrop-blur-md mb-8 text-cyan-400 text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Discover Our Story</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-poppins font-extrabold tracking-tight mb-8 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent"
            >
              Our Mission: AquaVersa
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light"
            >
              We believe building an aquarium shouldn't be a guessing game. Our mission is to help hobbyists start and maintain healthy, thriving aquatic ecosystems through accurate, science-based, and easy-to-understand education.
            </motion.p>

            {/* Quick Metrics Grid */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
            >
              {stats.map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div 
                    key={i}
                    variants={fadeInUp}
                    className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/60 backdrop-blur-sm flex flex-col items-center hover:border-cyan-500/20 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-cyan-400 border border-slate-850 group-hover:text-cyan-300 transition-colors mb-3">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1 text-center">{stat.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* WHAT WE STAND FOR (VALUES) */}
        <section className="py-20 px-4 bg-slate-950/40 border-y border-slate-900/80">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-poppins font-bold tracking-tight text-white mb-4"
              >
                What We Stand For
              </motion.h2>
              <p className="text-slate-400 font-light">The core principles guiding our platform every single day.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <motion.div 
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 shadow-xl hover:shadow-cyan-955/20 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/30 flex items-center justify-center text-cyan-400 mb-6 shadow-lg shadow-cyan-950/50">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Responsible Care</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    We believe keeping aquatic life is a privilege and a commitment. We promote ethical care standards, realistic tank sizing, and strictly discourage impulse purchases.
                  </p>
                </div>
                <div className="h-1.5 w-12 bg-cyan-500 rounded-full mt-6 opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              {/* Value 2 */}
              <motion.div 
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm hover:border-rose-500/30 transition-all duration-300 shadow-xl hover:shadow-rose-955/20 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-800/30 flex items-center justify-center text-rose-400 mb-6 shadow-lg shadow-rose-950/50">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Community First</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    From absolute beginners launching their first 10-gallon planted tank to advanced reef-keeping experts, we are building a supportive harbor for every hobbyist.
                  </p>
                </div>
                <div className="h-1.5 w-12 bg-rose-500 rounded-full mt-6 opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              {/* Value 3 */}
              <motion.div 
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 shadow-xl hover:shadow-emerald-955/20 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/30 flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-950/50">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Scientific Husbandry</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    Our database and articles are built on real biology, water chemistry, and species requirements—debunking persistent aquarium myths with proven facts.
                  </p>
                </div>
                <div className="h-1.5 w-12 bg-emerald-500 rounded-full mt-6 opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOUNDER'S STORY SECTION */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              
              {/* Asymmetric Image Wrapper */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-5 relative aspect-square md:aspect-auto md:h-[450px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group"
              >
                <Image
                  src="/images/angelfish.png"
                  alt="Beautiful Discus Angelfish"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 bg-slate-950/70 border border-slate-800 backdrop-blur-md px-3 py-1.5 rounded-xl">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">Interactive Catalog</span>
                  </div>
                </div>
              </motion.div>

              {/* Story Content */}
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-7 space-y-6"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs">
                  <Waves className="w-4 h-4" />
                  <span>The Spark</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white tracking-tight">How We Started</h2>
                
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  AquaVersa was founded in 2026 by a beginner aquarist who grew tired of the sheer volume of conflicting, outdated, and confusing misinformation online. Too often, beginners are sold mismatched species or miniature fishbowls, leading to failed tanks and disappointed keepers.
                </p>

                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  We set out to build an educational platform that looks stunning, feels premium, and teaches the core fundamentals—nitrogen cycle, parameters, and plant compatibility—in a simple, interactive, and visually engaging format.
                </p>

                <div className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl" />
                  <p className="text-xs text-slate-400 italic leading-relaxed font-light">
                    "Aquarium keeping is a beautiful blend of art, biology, and chemistry. When we understand the science, we build ecosystems that thrive instead of struggle."
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mt-3">— AquaVersa Philosophy</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION ACCURACY */}
        <section className="py-12 px-4 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8"
          >
            {/* Background glow blob */}
            <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-cyan-950/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="space-y-3 max-w-2xl">
              <h3 className="text-2xl font-bold text-white font-poppins tracking-tight">Help Us Maintain Scientific Accuracy</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Aquarium science is constantly evolving. If you notice any outdated water parameters, incorrect compatibility reports, or species listing errors in our database, please let us know immediately.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 text-sm group"
              >
                Report Data Inaccuracy
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
