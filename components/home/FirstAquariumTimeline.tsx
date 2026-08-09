import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { title: 'Choose Tank', description: 'Select size and type suitable for your fish.' },
  { title: 'Prepare Water', description: 'Treat tap water and set parameters.' },
  { title: 'Substrate & Plants', description: 'Add soil, sand and plant life.' },
  { title: 'Equipment', description: 'Install filter, heater and lighting.' },
  { title: 'Cycle Tank', description: 'Establish beneficial bacteria.' },
  { title: 'Add Fish', description: 'Introduce compatible species gradually.' },
  { title: 'Maintain', description: 'Regular water changes and care.' },
];

export default function FirstAquariumTimeline() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Your First Aquarium Journey</h2>
        <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 md:gap-4">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 min-w-[200px] p-6 bg-muted/30 rounded-xl border border-border hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-foreground">{i + 1}. {s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
              {i < steps.length - 1 && (
                <div className="flex justify-center mt-2">
                  <ArrowRight className="w-6 h-6 text-cyan-500" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/start-aquarium" className="px-8 py-4 bg-cyan-600 text-white font-semibold rounded-full hover:bg-cyan-500 transition">
            Start Your Journey <ArrowRight className="inline-block w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
