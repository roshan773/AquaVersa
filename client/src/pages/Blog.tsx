import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../services/api';
import { Search, Loader2, BookOpen } from 'lucide-react';

export const Blog: React.FC = () => {
  const [search, setSearch] = useState('');

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs', search],
    queryFn: () => fetchBlogs({ search: search || undefined })
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 relative z-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex justify-center mb-1">
          <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800 text-sky-400">
            <BookOpen className="h-8 w-8 text-sky-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-100">
          AquaVersa <span className="bg-gradient-to-r from-sky-400 to-emerald-405 bg-clip-text text-transparent">Blog</span>
        </h1>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Read articles on aquascaping styles, filter maintenance checklists, and community stories.
        </p>
      </div>

      {/* Controls */}
      <div className="glass rounded-2xl p-4 flex gap-3 bg-slate-950/40 border border-slate-900/60 shadow-lg shadow-black/25">
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search blog articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 pl-9 text-xs focus:outline-none focus:border-sky-400 font-semibold text-slate-200"
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-sky-400 py-10 font-bold text-sm">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Fetching blog articles...</span>
        </div>
      )}

      {/* List */}
      {!isLoading && blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: any) => (
            <Link
              key={blog._id}
              to={`/blog/${blog.slug}`}
              className="glass rounded-3xl overflow-hidden block glass-hover flex flex-col h-full bg-slate-950/40 border border-slate-900/60 group"
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden bg-slate-950/20 border-b border-slate-900/60">
                <img
                  src={blog.image || 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600'}
                  alt={blog.title}
                  className="object-cover w-full h-full filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags?.map((t: string) => (
                      <span key={t} className="text-[9px] font-bold px-2 py-0.5 border border-sky-500/20 text-sky-400 bg-sky-500/5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-200 group-hover:text-sky-400 transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider pt-3 border-t border-slate-900/60">
                  <span>Category: {blog.category}</span>
                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center text-xs font-semibold text-slate-500 py-10 bg-slate-950/20 border border-slate-900/60 rounded-3xl p-12 max-w-sm mx-auto space-y-2">
            <BookOpen className="h-8 w-8 text-slate-500 mx-auto animate-pulse" />
            <p>No blogs matching query.</p>
          </div>
        )
      )}

    </div>
  );
};
export default Blog;
