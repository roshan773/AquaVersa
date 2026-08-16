import Image from "next/image";
import Link from "next/link";
import { Waves, Heart, Shield, Award, HeartHandshake } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="w-full pb-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-border bg-slate-900 text-slate-50">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
            <Waves className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">Our Mission: AquaGuide</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Helping hobbyists start and maintain healthy, thriving aquatic ecosystems through accurate, science-based, and easy-to-understand education.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground">The principles guiding our work every single day.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-muted/40 border border-border">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-500 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Responsible Care</h3>
              <p className="text-muted-foreground">
                We believe keeping fish is a commitment. We promote ethical practices, proper tank sizing, and strictly discourage short-term impulses.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-muted/40 border border-border">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-500 mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-muted-foreground">
                From absolute beginners looking for their first goldfish to reef-keeping veterans, we exist to guide and support all aquarists.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-muted/40 border border-border">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-500 mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Scientific Accuracy</h3>
              <p className="text-muted-foreground">
                Our guides are built on verified biology, chemistry, and experienced husbandry—dispelling myths like "1 inch of fish per gallon."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-border">
              <Image
                src="/images/angelfish.png"
                alt="Aquarium hobbyist"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-poppins mb-6">How We Started</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                AquaGuide was founded in 2026 by a frustrated beginner fish and aqua hobbyist who grew tired of the sheer volume of conflicting and confusing misinformation online. Too often, beginners are sold mismatched fish and tiny bowls, leading to failed tanks and unhappy hobbyists.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We set out to build an educational platform that feels premium, looks stunning, and teaches the core fundamentals—nitrogen cycle, parameters, and plant compatibility—in a simple, visually engaging way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintain Accuracy Callout */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-cyan-500/5 border border-cyan-500/20 p-8 rounded-3xl text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground font-poppins">Help Us Maintain Scientific Accuracy</h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Aquarium husbandry is an evolving science. If you notice any incorrect species guidelines, inaccurate water parameters, or outdated equipment specifications in our database, please flag them immediately!
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all shadow-md shadow-cyan-500/5 text-sm"
              >
                Report Data Inaccuracy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
