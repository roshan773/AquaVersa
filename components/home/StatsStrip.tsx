'use client';
import { useStats } from '@/components/home/StatsContext';

export default function StatsStrip() {
  const { fish, plants, equipment, careTopics } = useStats();
  return (
    <section className="py-6 bg-gray-100 text-center">
      <div className="container mx-auto">
        <div className="flex justify-center gap-8 text-sm text-gray-700">
          <div>
            <span className="font-bold text-lg text-cyan-600">{fish}+</span><br/>
            <span>Fish Guides</span>
          </div>
          <div>
            <span className="font-bold text-lg text-emerald-600">{plants}+</span><br/>
            <span>Plants</span>
          </div>
          <div>
            <span className="font-bold text-lg text-amber-600">{equipment}+</span><br/>
            <span>Equipment Guides</span>
          </div>
          <div>
            <span className="font-bold text-lg text-indigo-600">{careTopics}+</span><br/>
            <span>Care Topics</span>
          </div>
        </div>
      </div>
    </section>
  );
}

