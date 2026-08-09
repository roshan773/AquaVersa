'use client';
import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const popularQuestions = [
  "How many fish can I put in a 10-gallon tank?",
  "Why is my aquarium water cloudy?",
  "How often should I feed my Betta fish?",
  "What is the best way to get rid of algae?",
  "Do I really need a heater?"
];

export default function QuickQuestions() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(query.trim()) {
      // In a real app, route to search page: router.push(`/search?q=${query}`)
      console.log('Searching for:', query);
    }
  };

  return (
    <section className="py-24 bg-muted/10 border-y border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-sm text-center">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 text-foreground">
            Have a Question?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Search our extensive database of beginner questions and expert answers.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-12">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'cloudy water' or 'betta fish care'"
              className="w-full bg-background border-2 border-border focus:border-cyan-500 rounded-full py-4 pl-14 pr-32 text-lg text-foreground placeholder:text-muted-foreground transition-colors outline-none"
            />
            <button 
              type="submit"
              className="absolute inset-y-2 right-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 rounded-full transition-colors"
            >
              Search
            </button>
          </form>

          <div className="text-left max-w-2xl mx-auto">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Popular Questions</h3>
            <ul className="space-y-3">
              {popularQuestions.map((q, idx) => (
                <li key={idx}>
                  <Link href={`/search?q=${encodeURIComponent(q)}`} className="group flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-cyan-300 transition-colors">
                    <span className="font-medium text-foreground group-hover:text-cyan-700 dark:group-hover:text-cyan-400">{q}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-cyan-500 transition-transform group-hover:translate-x-1" />
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
