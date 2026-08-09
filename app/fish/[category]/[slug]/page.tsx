import { fishData } from "@/data/fish";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Droplets, Thermometer, Info, Leaf, Activity } from "lucide-react";

export async function generateStaticParams() {
  return fishData
    .filter(fish => fish.category && fish.slug)
    .map((fish) => ({
      category: fish.category!.toLowerCase(),
      slug: fish.slug,
    }));
}

export default async function FishDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const fish = fishData.find((f) => f.slug === slug && f.category?.toLowerCase() === category.toLowerCase());

  if (!fish) {
    notFound();
  }

  const isFreshwater = fish.category === "freshwater";
  const themeColor = isFreshwater ? "cyan" : "blue";

  return (
    <div className="w-full pb-24">
      {/* Hero */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <Image
            src={fish.image}
            alt={fish.name}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pb-12">
          <Link href={`/fish/${fish.category}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to {fish.category}
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className={`px-3 py-1 rounded-full bg-${themeColor}-500/20 text-${themeColor}-500 text-sm font-semibold border border-${themeColor}-500/30 capitalize`}>
              {fish.difficulty} Care
            </div>
            <div className={`px-3 py-1 rounded-full bg-${themeColor}-500/20 text-${themeColor}-500 text-sm font-semibold border border-${themeColor}-500/30 capitalize`}>
              {fish.category}
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-2">{fish.name}</h1>
          <p className="text-xl text-muted-foreground italic">{fish.scientificName}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Difficulty & Guidance */}
            <section className="glass p-8 rounded-3xl border border-border bg-card/50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    Experience Level: {fish.difficulty}
                  </h2>
                  <p className="text-lg font-medium text-primary mt-1">
                    {fish.difficulty === "Beginner" && "Beginner-friendly"}
                    {fish.difficulty === "Advanced Beginner" && "Good for beginners who are ready for additional care"}
                    {fish.difficulty === "Intermediate" && "Recommended for aquarists with some experience"}
                    {fish.difficulty === "Advanced" && "Recommended for experienced aquarists"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Difficulty Score</div>
                  <div className="text-3xl font-bold text-primary">{fish.difficultyScore} <span className="text-xl text-muted-foreground">/ 4</span></div>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl border border-border">
                <p className="text-muted-foreground italic text-sm">
                  <strong className="text-foreground not-italic mr-1">Why this difficulty?</strong>
                  {fish.difficultyReason}
                </p>
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-cyan-500" /> About the {fish.name}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{fish.description}</p>
            </section>

            {/* Care Guide */}
            <section className="glass p-8 rounded-3xl border border-border">
              <h2 className="text-2xl font-bold mb-8">Comprehensive Care Guide</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-400" /> Water Parameters & Setup
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <span className="text-sm text-muted-foreground block mb-1">Water Type</span>
                      <span className="font-semibold capitalize">{fish.category}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <span className="text-sm text-muted-foreground block mb-1">Temperature</span>
                      <span className="font-semibold">{fish.temperature || 'Varies'}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <span className="text-sm text-muted-foreground block mb-1">pH Level</span>
                      <span className="font-semibold">{fish.ph || 'Varies'}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <span className="text-sm text-muted-foreground block mb-1">Min Tank Size</span>
                      <span className="font-semibold">{fish.minimumTankSize || (fish.minTankSize ? `${fish.minTankSize} gal` : 'Varies')}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <span className="text-sm text-muted-foreground block mb-1">Adult Size</span>
                      <span className="font-semibold">{fish.adultSize || (fish.maxSize ? `${fish.maxSize} inches` : 'Varies')}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <span className="text-sm text-muted-foreground block mb-1">Lifespan</span>
                      <span className="font-semibold">{fish.lifespan || 'Unknown'}</span>
                    </div>
                  </div>
                </div>

                {fish.careGuide && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-green-500" /> Care Instructions
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{fish.careGuide}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-500" /> Diet & Feeding
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {Array.isArray(fish.diet) ? fish.diet.map((item, i) => (
                      <li key={i}>{item}</li>
                    )) : fish.diet ? <li>{fish.diet}</li> : <li>Varies</li>}
                  </ul>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Compatibility Sidebar */}
          <aside className="space-y-8">
            <div className="glass p-6 rounded-3xl border border-border sticky top-24">
              <h3 className="text-xl font-bold mb-6">Compatibility</h3>
              
              <div className="mb-6">
                <span className="text-sm text-muted-foreground block mb-2">Temperament</span>
                <span className="inline-flex px-3 py-1 rounded-full bg-muted border border-border font-medium">
                  {fish.temperament}
                </span>
              </div>

              {fish.compatibility && fish.compatibility.length > 0 && (
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground block mb-3">Good Tank Mates</span>
                  <ul className="space-y-3">
                    {fish.compatibility.map((mate, i) => (
                      <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {mate}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {fish.plants && fish.plants.length > 0 && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-3">Recommended Plants</span>
                  <ul className="space-y-2">
                    {fish.plants.map((plant, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Leaf className="w-4 h-4 text-emerald-500" /> {plant}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
