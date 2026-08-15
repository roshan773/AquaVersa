import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';

const articles = [
  {
    title: "The Nitrogen Cycle Explained for Beginners",
    category: "Water Chemistry",
    image: "/hero_aquarium.jpg",
    readTime: "5 min read",
    link: "/guides/nitrogen-cycle"
  },
  {
    title: "How to Cure Ich (White Spot Disease)",
    category: "Fish Health",
    image: "/hero_aquarium.jpg",
    readTime: "8 min read",
    link: "/guides/curing-ich"
  },
  {
    title: "Aquascaping 101: Creating Depth and Scale",
    category: "Design",
    image: "/hero_aquarium.jpg",
    readTime: "6 min read",
    link: "/guides/aquascaping-101"
  }
];

export default function LearningHub() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-semibold mb-4">
              <BookOpen className="w-4 h-4" /> Knowledge Base
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-foreground">
              Learning Hub
            </h2>
            <p className="text-lg text-muted-foreground">
              Deep dive into specialized topics, from breeding techniques to advanced aquascaping and disease treatment.
            </p>
          </div>
          <Link 
            href="/guides" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-cyan-500 hover:text-cyan-600 transition-colors font-medium whitespace-nowrap shrink-0"
          >
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <Link key={idx} href={article.link} className="group flex flex-col rounded-3xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all h-full">
              <div className="relative h-56 w-full overflow-hidden">
                <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/90 backdrop-blur-md rounded-full text-xs font-bold shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-cyan-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                  <span className="font-medium">{article.readTime}</span>
                  <span className="font-bold flex items-center gap-1 group-hover:text-cyan-600">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
