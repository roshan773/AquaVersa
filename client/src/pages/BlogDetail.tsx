import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogBySlug } from '../services/api';
import { ArrowLeft, Calendar, Compass, AlertTriangle } from 'lucide-react';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog-detail', slug],
    queryFn: () => fetchBlogBySlug(slug || '')
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-2 text-sky-400 font-bold">
        <Compass className="h-7 w-7 animate-spin" />
        <span>Loading blog post...</span>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4 relative z-10">
        <AlertTriangle className="h-12 w-12 text-rose-450 mx-auto" />
        <h3 className="text-xl font-extrabold text-slate-200">Blog Post Not Found</h3>
        <Link to="/blog" className="inline-block px-5 py-2.5 bg-sky-500 hover:bg-sky-605 text-slate-950 rounded-xl text-xs font-bold transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative z-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
        <Link to="/blog" className="hover:text-sky-400 transition-colors flex items-center space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Blog</span>
        </Link>
        <span>/</span>
        <span className="text-slate-400">{blog.title}</span>
      </div>

      {/* Blog cover banner */}
      {blog.image && (
        <div className="relative h-64 md:h-[400px] rounded-3xl overflow-hidden border border-slate-900/60 shadow-2xl bg-slate-950/20">
          <img
            src={blog.image}
            alt={blog.title}
            className="object-cover w-full h-full filter brightness-[0.85]"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        </div>
      )}

      <article className="glass rounded-3xl p-6 md:p-10 border border-slate-900/60 bg-slate-950/40 space-y-6 shadow-2xl">
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span className="flex items-center space-x-1.5 text-sky-400">
            <Calendar className="h-4 w-4" />
            <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
          </span>
          <span>&bull;</span>
          <span>Category: {blog.category}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-50 leading-tight tracking-tight">
          {blog.title}
        </h1>

        <p className="text-sm text-slate-350 leading-relaxed border-l-4 border-sky-400 pl-4 py-1 italic font-semibold">
          {blog.excerpt}
        </p>

        <div className="text-sm text-slate-200 leading-relaxed font-medium space-y-6 whitespace-pre-line pt-6 border-t border-slate-900/60">
          {blog.content}
        </div>

        <div className="flex flex-wrap gap-2 pt-6">
          {blog.tags?.map((t: string) => (
            <span key={t} className="text-xs font-bold px-3 py-1 border border-slate-900 rounded-lg text-slate-400 bg-slate-900/30">
              #{t}
            </span>
          ))}
        </div>

      </article>

    </div>
  );
};
export default BlogDetail;
