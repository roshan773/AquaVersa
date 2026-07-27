import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGuideBySlug } from '../services/api';
import { ArrowLeft, Clock, Compass, AlertTriangle } from 'lucide-react';

export const GuideDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: guide, isLoading, error } = useQuery({
    queryKey: ['guide-detail', slug],
    queryFn: () => fetchGuideBySlug(slug || '')
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-2 text-sky-400 font-bold">
        <Compass className="h-7 w-7 animate-spin" />
        <span>Loading guide article...</span>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <AlertTriangle className="h-12 w-12 text-rose-400 mx-auto" />
        <h3 className="text-xl font-extrabold text-slate-100">Guide Not Found</h3>
        <Link to="/guides" className="inline-block px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-slate-950 rounded-xl text-xs font-bold transition-colors">
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
        <Link to="/guides" className="hover:text-sky-400 transition-colors flex items-center space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Guides</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{guide.title}</span>
      </div>

      {/* Main card article content */}
      <article className="glass rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950/20">
        
        {/* Banner image */}
        <div className="relative h-64 md:h-[400px] overflow-hidden bg-slate-900 border-b border-slate-800/80">
          <img
            src={guide.image || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600'}
            alt={guide.title}
            className="object-cover w-full h-full"
          />
          <span className="absolute top-4 left-4 text-[10px] font-extrabold px-3 py-1.5 rounded-lg border border-sky-400/20 bg-sky-500/10 text-sky-400 tracking-wider uppercase">
            {guide.category}
          </span>
        </div>

        {/* Content body */}
        <div className="p-6 md:p-10 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4" />
              <span>{guide.readTime}</span>
            </span>
            <span>&bull;</span>
            <span>Difficulty: {guide.difficulty}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-100 leading-tight">
            {guide.title}
          </h1>

          <p className="text-sm text-slate-400 font-semibold leading-relaxed border-l-4 border-sky-400 pl-4 py-1 italic">
            {guide.excerpt}
          </p>

          <div className="text-sm text-slate-350 leading-relaxed font-semibold space-y-4 whitespace-pre-line pt-4 border-t border-slate-800/40">
            {guide.content}
          </div>
        </div>

      </article>

    </div>
  );
};
export default GuideDetail;
