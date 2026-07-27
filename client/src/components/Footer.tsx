import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Waves, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { subscribeNewsletter } from '../services/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const mutation = useMutation({
    mutationFn: (emailStr: string) => subscribeNewsletter(emailStr),
    onSuccess: (data) => {
      setToast({ message: data.message || 'Thank you for subscribing!', type: 'success' });
      setEmail('');
      setTimeout(() => setToast(null), 4000);
    },
    onError: (err: any) => {
      setToast({
        message: err.response?.data?.error || 'Failed to subscribe. Please try again.',
        type: 'error',
      });
      setTimeout(() => setToast(null), 4000);
    }
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      mutation.mutate(email.trim());
    }
  };

  return (
    <footer className="bg-slate-950/40 border-t border-slate-900 mt-auto pt-16 pb-8 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 border-b border-slate-900 pb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center space-x-2 text-sky-400">
              <Waves className="h-7 w-7 text-sky-400" />
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                AquaVersa
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-semibold">
              Your ultimate companion in the world of aquariums. Explore species, calculate setup components, and master aquascaping guides.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 bg-slate-900/60 border border-slate-800 text-slate-400 rounded-xl hover:bg-sky-500/10 hover:text-sky-400 transition-all duration-200">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1h-3A4.5 4.5 0 0 0 8.5 5.5V8H9z"/></svg>
              </a>
              <a href="#" className="p-2.5 bg-slate-900/60 border border-slate-800 text-slate-400 rounded-xl hover:bg-sky-500/10 hover:text-sky-400 transition-all duration-200">
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="p-2.5 bg-slate-900/60 border border-slate-800 text-slate-400 rounded-xl hover:bg-sky-500/10 hover:text-sky-400 transition-all duration-200">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.5 6.2c-.3-1.1-1.1-2-2.2-2.3C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.4c-1.1.3-1.9 1.2-2.2 2.3C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.1 2 2.2 2.3 2 .4 9.3.4 9.3.4s7.3 0 9.3-.4c1.1-.3 1.9-1.2 2.2-2.3.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>
              </a>
              <a href="#" className="p-2.5 bg-slate-900/60 border border-slate-800 text-slate-400 rounded-xl hover:bg-sky-500/10 hover:text-sky-400 transition-all duration-200">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.2 2.4h3.3L14.3 11l8.5 11.3h-6.7L10.8 15.4l-6 6.1H1.5L9 13.5 1 2.4h6.9l4.9 6.5 5.4-6.5zm-1.2 17.5h1.8L7.1 4.2H5.1l11.9 15.7z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Explore</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-semibold">
              <li><Link to="/fish" className="hover:text-sky-400 transition-colors">Fish Encyclopedia</Link></li>
              <li><Link to="/equipment" className="hover:text-sky-400 transition-colors">Equipment</Link></li>
              <li><Link to="/plants" className="hover:text-sky-400 transition-colors">Plants</Link></li>
              <li><Link to="/diseases" className="hover:text-sky-400 transition-colors">Diseases</Link></li>
              <li><Link to="/calculators" className="hover:text-sky-400 transition-colors">Calculators</Link></li>
            </ul>
          </div>

          {/* Column 2: Learn */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Learn</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-semibold">
              <li><Link to="/guides" className="hover:text-sky-400 transition-colors">Beginner Guides</Link></li>
              <li><Link to="/guides" className="hover:text-sky-400 transition-colors">Care Guides</Link></li>
              <li><Link to="/guides" className="hover:text-sky-400 transition-colors">Water Quality</Link></li>
              <li><Link to="/guides" className="hover:text-sky-400 transition-colors">Aquascaping</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-semibold">
              <li><Link to="/blog" className="hover:text-sky-400 transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="hover:text-sky-400 transition-colors">Videos</Link></li>
              <li><Link to="/guides" className="hover:text-sky-400 transition-colors">Glossary</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Newsletter</h4>
            <p className="text-xs text-slate-450 leading-relaxed font-semibold">
              Get the latest tips, guides, and updates straight to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-3 pr-10 text-xs focus:outline-none focus:border-sky-400 text-slate-200 shadow-inner"
                required
              />
              <button
                type="submit"
                disabled={mutation.isPending}
                className="absolute right-1 top-1 p-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 rounded-lg text-slate-950 transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-slate-500 font-semibold">
          <p>&copy; {new Date().getFullYear()} AquaVersa. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-sky-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-sky-400 transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-sky-400 transition-colors">Disclaimer</Link>
            <Link to="/contact" className="hover:text-sky-400 transition-colors">Contact</Link>
          </div>
        </div>

      </div>

      {/* Floating Glass Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl border backdrop-blur-lg shadow-2xl ${
            toast.type === 'success' 
              ? 'bg-slate-900/90 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10' 
              : 'bg-slate-900/90 border-rose-500/30 text-rose-400 shadow-rose-500/10'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
            )}
            <span className="text-xs font-bold text-slate-100">{toast.message}</span>
          </div>
        </div>
      )}
    </footer>
  );
};
export default Footer;
