'use client';
import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';
import Image from 'next/image';
import { fishData } from '@/data/fish';

export default function FishCompatibility() {
  const [fish1, setFish1] = useState(fishData[0].id);
  const [fish2, setFish2] = useState(fishData[1].id);

  const getCompatibility = (id1: string, id2: string) => {
    if (id1 === id2) return { status: 'Warning', message: 'Same species. Some species are territorial with their own kind (e.g., male Bettas or Tangs).', icon: <AlertTriangle className="text-amber-500 w-6 h-6" /> };
    
    const f1 = fishData.find(f => f.id === id1);
    const f2 = fishData.find(f => f.id === id2);
    
    if (!f1 || !f2) return { status: 'Unknown', message: 'Select two fish.', icon: <Info className="text-blue-500 w-6 h-6" /> };

    // Water type check
    if (f1.category !== f2.category) {
      return { status: 'Incompatible', message: `${f1.name} is ${f1.category}, while ${f2.name} is ${f2.category}. They cannot survive in the same water.`, icon: <XCircle className="text-red-500 w-6 h-6" /> };
    }

    // Size / Predator check (Angelfish eat small tetras)
    if ((f1.name.includes('Angelfish') && f2.name.includes('Tetra') && !f2.name.includes('Cardinal')) || 
        (f2.name.includes('Angelfish') && f1.name.includes('Tetra') && !f1.name.includes('Cardinal'))) {
      return { status: 'Incompatible', message: 'Angelfish will eat small, slender fish like Neon Tetras as they grow.', icon: <XCircle className="text-red-500 w-6 h-6" /> };
    }

    // Betta logic
    const hasBetta = f1.name.includes('Betta') || f2.name.includes('Betta');
    if (hasBetta) {
      const other = f1.name.includes('Betta') ? f2 : f1;
      if (other.name.includes('Guppy')) {
        return { status: 'Incompatible', message: 'Bettas may attack colorful, long-finned fish like Guppies.', icon: <XCircle className="text-red-500 w-6 h-6" /> };
      }
      if (other.name.includes('Corydoras')) {
        return { status: 'Compatible', message: 'Corydoras are peaceful bottom-dwellers that Bettas usually ignore.', icon: <CheckCircle2 className="text-emerald-500 w-6 h-6" /> };
      }
      return { status: 'Warning', message: 'Bettas are highly territorial. Keep them alone or monitor them very closely with other fish.', icon: <AlertTriangle className="text-amber-500 w-6 h-6" /> };
    }

    // Tangs logic
    const isTang1 = f1.name.includes('Tang');
    const isTang2 = f2.name.includes('Tang');
    if (isTang1 && isTang2) {
      return { status: 'Warning', message: 'Tangs can be highly aggressive toward other Tangs. Requires a very large tank.', icon: <AlertTriangle className="text-amber-500 w-6 h-6" /> };
    }

    if (f1.difficulty === 'Advanced' || f2.difficulty === 'Advanced') {
      return { status: 'Warning', message: 'One or more of these fish require advanced care and pristine water conditions.', icon: <AlertTriangle className="text-amber-500 w-6 h-6" /> };
    }
    
    return { status: 'Compatible', message: 'Generally peaceful together in an appropriately sized tank.', icon: <CheckCircle2 className="text-emerald-500 w-6 h-6" /> };
  };

  const compResult = getCompatibility(fish1, fish2);
  const f1Data = fishData.find(f => f.id === fish1);
  const f2Data = fishData.find(f => f.id === fish2);

  return (
    <section className="py-24 bg-muted/10 border-y border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-semibold mb-4">
            <Info className="w-4 h-4" /> Quick Check
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-foreground">
            Fish Compatibility Checker
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Not all fish get along. Select two fish to see if they can peacefully co-exist in your aquarium.
          </p>
        </div>

        <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Fish 1 Selector */}
            <div className="flex-1 w-full text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-muted relative">
                 {f1Data?.image ? (
                   <Image src={f1Data.image} alt={f1Data.name} fill className="object-cover" />
                 ) : null}
              </div>
              <select 
                value={fish1} 
                onChange={(e) => setFish1(e.target.value)}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {fishData.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-shrink-0 text-2xl font-bold text-muted-foreground">
              VS
            </div>

            {/* Fish 2 Selector */}
            <div className="flex-1 w-full text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-muted relative">
                 {f2Data?.image ? (
                   <Image src={f2Data.image} alt={f2Data.name} fill className="object-cover" />
                 ) : null}
              </div>
              <select 
                value={fish2} 
                onChange={(e) => setFish2(e.target.value)}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {fishData.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Box */}
          <div className={`mt-10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 ${
            compResult.status === 'Compatible' ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200' :
            compResult.status === 'Warning' ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200' :
            'bg-red-50 dark:bg-red-900/20 border border-red-200'
          }`}>
            <div className="p-3 bg-background rounded-full shadow-sm">
              {compResult.icon}
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-1 text-foreground">{compResult.status}</h3>
              <p className="text-muted-foreground">{compResult.message}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
