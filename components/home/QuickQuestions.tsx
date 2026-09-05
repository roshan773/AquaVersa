'use client';
import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const popularQuestions = [
  "How many fish can I put in a 10-gallon tank?",
  "Why is my aquarium water cloudy?",
  "How often should I feed my Betta fish?",
  "What is the best way to get rid of algae?",
  "Do I really need a heater?"
];

export default function QuickQuestions() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="py-20 bg-[#f7f7ff] border-t-2 border-[#cfcaf5]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[#ffffff] rounded-3xl p-8 md:p-12 border-2 border-[#cfcaf5] shadow-sm text-center">
          <h2 className="text-3xl md:text-5xl font-display font-normal mb-4 text-[#27187e]">
            HAVE AN AQUARIUM QUESTION?
          </h2>
          <p className="text-base sm:text-lg text-[#27187e]/80 mb-8 font-readable max-w-xl mx-auto">
            Search our collection of beginner questions, water chemistry tips, and educational care answers.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-12">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#27187e]/60" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'cloudy water' or 'betta fish care'..."
              className="w-full bg-[#ffffff] border-2 border-[#cfcaf5] focus:border-[#27187e] rounded-full py-4 pl-12 pr-32 text-base text-[#27187e] font-readable placeholder:text-[#27187e]/50 transition-colors outline-none shadow-sm"
            />
            <button 
              type="submit"
              className="absolute inset-y-2 right-2 bg-[#27187e] hover:bg-[#1b1059] text-[#f7f7ff] font-readable font-bold px-6 rounded-full transition-colors cursor-pointer text-sm"
            >
              Search
            </button>
          </form>

          <div className="text-left max-w-2xl mx-auto font-readable">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#27187e]/70 mb-4">Frequently Explored Questions</h3>
            <ul className="space-y-3">
              {popularQuestions.map((q, idx) => (
                <li key={idx}>
                  <Link href={`/search?q=${encodeURIComponent(q)}`} className="group flex items-center justify-between p-4 rounded-2xl border-2 border-[#cfcaf5] bg-[#f7f7ff] hover:border-[#27187e] transition-colors">
                    <span className="font-semibold text-sm sm:text-base text-[#27187e]">{q}</span>
                    <ChevronRight className="w-5 h-5 text-[#27187e]/60 group-hover:text-[#27187e] transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
