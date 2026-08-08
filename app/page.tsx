import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Waves } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image Setup (Placeholder for now) */}
        <div className="absolute inset-0 z-0 bg-blue-950">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/90 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=2512&auto=format&fit=crop"
            alt="Beautiful planted aquarium"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <Waves className="w-4 h-4 text-cyan-300" />
            <span className="text-sm font-medium tracking-wide">The Ultimate Aquarium Guide</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-poppins font-bold mb-6 max-w-4xl leading-tight">
            Build an Aquarium That <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Thrives.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-10">
            Discover the right fish, equipment, and plants to create a healthy aquarium — whether you're starting your first tank or improving an existing one.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/fish"
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-full transition-all flex items-center justify-center gap-2 group"
            >
              Explore Fish
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/start-aquarium"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full transition-all flex items-center justify-center"
            >
              Start Your Aquarium
            </Link>
          </div>
        </div>
      </section>

      {/* Beginner Guide Teaser */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-foreground">New to Aquariums?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
            Setting up your first tank doesn't have to be complicated. Follow our simple journey to aquatic success.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {/* We will map out steps here in the next iteration */}
            {[
              "Choose Tank", 
              "Prepare Water", 
              "Substrate & Plants", 
              "Equipment", 
              "Cycle Tank", 
              "Choose Fish", 
              "Maintain"
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-muted/50 border border-border">
                <span className="text-2xl font-bold text-cyan-500 mb-2">0{i + 1}</span>
                <span className="text-sm font-medium">{step}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <Link href="/start-aquarium" className="text-cyan-600 hover:text-cyan-700 font-medium inline-flex items-center gap-1 group">
              Explore Beginner's Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
