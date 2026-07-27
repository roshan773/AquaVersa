import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 font-semibold text-sm text-slate-350">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-slate-100">Get in Touch</h1>
        <p className="text-slate-400">Have questions about care profiles, settings, or equipment checks? Drop us a line.</p>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 border border-slate-800/80 bg-slate-950/20">
        {submitted ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center font-bold">
            Thank you for reaching out! We will respond to your inquiry shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-semibold"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-semibold"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Message</label>
              <textarea
                rows={5}
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-semibold"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors btn-glow-cyan flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Contact;
