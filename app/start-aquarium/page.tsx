import { starterGuideSteps } from "@/data/guides";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function StartAquariumPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0 bg-blue-950/20">
           <Image
             src="/images/blue_tang.png"
             alt="Aquarium guide background"
             fill
             className="object-cover opacity-30"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-500 mb-6 border border-cyan-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">Your First Aquarium, <br className="hidden md:block"/> Step by Step.</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A foolproof guide to setting up a healthy, thriving ecosystem. Avoid the common mistakes that kill fish and frustrate beginners.
          </p>
        </div>
      </section>

      {/* Guide Steps */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="space-y-16">
            {starterGuideSteps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-12 relative group">
                
                {/* Step Number Line (Desktop) */}
                <div className="hidden md:flex flex-col items-center shrink-0">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center text-2xl font-bold text-cyan-500 z-10">
                    {step.step}
                  </div>
                  {index !== starterGuideSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-border absolute top-16 bottom-[-4rem] left-[2rem] z-0" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 glass p-8 rounded-3xl border border-border group-hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4 md:hidden">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center text-xl font-bold text-cyan-500">
                      {step.step}
                    </div>
                    <h2 className="text-2xl font-bold font-poppins">{step.title}</h2>
                  </div>
                  
                  <h2 className="hidden md:block text-2xl font-bold font-poppins mb-4">{step.title}</h2>
                  <p className="text-muted-foreground mb-6 text-lg">{step.description}</p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> What to Buy
                      </h4>
                      <p className="text-sm text-muted-foreground">{step.whatToBuy}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Why It's Needed
                      </h4>
                      <p className="text-sm text-muted-foreground">{step.whyNeeded}</p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex gap-4">
                    <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm text-destructive mb-1">Common Beginner Mistake</h4>
                      <p className="text-sm text-muted-foreground">{step.commonMistakes}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                    <span className="text-sm font-semibold">Pro Recommendation:</span>
                    <span className="text-sm text-muted-foreground text-right">{step.recommendation}</span>
                  </div>
                </div>
                
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-6">Ready to choose your first fish?</h3>
            <div className="flex justify-center gap-4">
              <Link href="/fish/freshwater" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2">
                Browse Beginner Fish <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
