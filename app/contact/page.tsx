'use client';

import { useState } from 'react';
import { Waves, Mail, ShieldAlert, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: '',
    itemName: '',
    incorrectInfo: '',
    correction: '',
    source: '',
    honeypot: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const newErrors: Record<string, string> = {};

    // Form Client-side Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (formData.category === 'general') {
      if (!formData.subject.trim()) {
        newErrors.subject = "Subject is required.";
      }
      if (!formData.message.trim()) {
        newErrors.message = "Message is required.";
      }
    } else {
      if (!formData.itemName.trim()) {
        newErrors.itemName = "Species/Item name is required.";
      }
      if (!formData.incorrectInfo.trim()) {
        newErrors.incorrectInfo = "Incorrect information detail is required.";
      }
      if (!formData.correction.trim()) {
        newErrors.correction = "Suggested correction is required.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error || "We couldn't send your message right now. Please try again.");
      } else {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          category: 'general',
          subject: '',
          message: '',
          itemName: '',
          incorrectInfo: '',
          correction: '',
          source: '',
          honeypot: ''
        });
      }
    } catch (err) {
      setSubmitError("We couldn't send your message right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <section className="min-h-screen py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-6 border border-cyan-500/20 shadow-lg">
            <Waves className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-white">Get in Touch</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Have questions, ideas, or noticed a data error? Reach out to us. We love collaborating with the community.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8 bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-850">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-cyan-400 font-poppins">Direct Support</h2>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>support@aquaguide.io</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-6">
              <h2 className="text-xl font-bold text-cyan-400 font-poppins">Join Our Community</h2>
              <p className="text-slate-300 text-sm">
                Discuss tank builds and parameters on Discord: <br/>
                <a href="https://discord.gg/aquaguide" className="underline hover:text-cyan-300 font-bold block mt-1">discord.gg/aquaguide</a>
              </p>
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-6">
              <h2 className="text-xl font-bold text-cyan-400 font-poppins">Follow Us</h2>
              <p className="text-slate-300 text-sm">
                Stay updated via <a href="https://instagram.com/aquaguide" className="underline hover:text-cyan-300">Instagram</a> and <a href="https://twitter.com/aquaguide" className="underline hover:text-cyan-300">Twitter</a> for daily care tips.
              </p>
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-6 text-xs text-slate-500">
              <p>
                AquaGuide Team<br/>
                123 Ocean Drive<br/>
                Seaside, CA 94000<br/>
                USA
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                {formData.category === 'general' ? (
                  <>
                    <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you! Your message has been sent successfully. Our team will review your inquiry and reply to you shortly.
                    </p>
                    <button 
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-slate-800 hover:bg-slate-750 text-white rounded-xl transition-colors text-xs font-bold mt-4"
                    >
                      Send Another Message
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white">Correction Submitted!</h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for helping us maintain scientific accuracy. Our team will review your suggested edit and update the database shortly.
                    </p>
                    <button 
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-slate-800 hover:bg-slate-750 text-white rounded-xl transition-colors text-xs font-bold mt-4"
                    >
                      Submit Another Report
                    </button>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs border-b border-slate-800 pb-3">
                  {formData.category === 'general' ? (
                    <>
                      <Mail className="w-4 h-4 text-cyan-400" /> Send a Message
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 text-cyan-400" /> Report Data Inaccuracy
                    </>
                  )}
                </div>

                {/* Honeypot anti-spam hidden input */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {submitError && (
                  <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-400 rounded-xl text-xs font-medium">
                    {submitError}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your Name" 
                      className={`w-full bg-slate-950/80 border ${errors.name ? 'border-red-500/50' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@example.com" 
                      className={`w-full bg-slate-950/80 border ${errors.email ? 'border-red-500/50' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Inquiry Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value="general">General Inquiry / Question</option>
                    <option value="fish">Fish Species Detail Inaccuracy</option>
                    <option value="plant">Plant Care Detail Inaccuracy</option>
                    <option value="equipment">Equipment Spec Inaccuracy</option>
                    <option value="water">Water Parameter Inaccuracy</option>
                    <option value="other">General Website Inaccuracy</option>
                  </select>
                </div>

                {formData.category === 'general' ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Subject</label>
                      <input 
                        type="text" 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="What is your message about?" 
                        className={`w-full bg-slate-950/80 border ${errors.subject ? 'border-red-500/50' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500`}
                      />
                      {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Message</label>
                      <textarea 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Write your message here..."
                        rows={6}
                        className={`w-full bg-slate-950/80 border ${errors.message ? 'border-red-500/50' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none`}
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Item / Species Name</label>
                      <input 
                        type="text" 
                        value={formData.itemName}
                        onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                        placeholder="e.g. Neon Tetra, Java Fern" 
                        className={`w-full bg-slate-950/80 border ${errors.itemName ? 'border-red-500/50' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500`}
                      />
                      {errors.itemName && <p className="text-red-400 text-xs mt-1">{errors.itemName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Current Incorrect Information</label>
                      <textarea 
                        value={formData.incorrectInfo}
                        onChange={(e) => setFormData({...formData, incorrectInfo: e.target.value})}
                        placeholder="Describe the inaccurate detail currently displayed on the website."
                        rows={3}
                        className={`w-full bg-slate-950/80 border ${errors.incorrectInfo ? 'border-red-500/50' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none`}
                      />
                      {errors.incorrectInfo && <p className="text-red-400 text-xs mt-1">{errors.incorrectInfo}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Suggested Correction</label>
                      <textarea 
                        value={formData.correction}
                        onChange={(e) => setFormData({...formData, correction: e.target.value})}
                        placeholder="Provide the correct data or species specifications."
                        rows={3}
                        className={`w-full bg-slate-950/80 border ${errors.correction ? 'border-red-500/50' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none`}
                      />
                      {errors.correction && <p className="text-red-400 text-xs mt-1">{errors.correction}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Source / Reference Link (Optional)</label>
                      <input 
                        type="url" 
                        value={formData.source}
                        onChange={(e) => setFormData({...formData, source: e.target.value})}
                        placeholder="e.g. https://www.fishbase.se/summary/... or scientific reference" 
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </>
                )}

                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 disabled:text-slate-400 text-slate-900 font-bold rounded-xl transition-all shadow-md shadow-cyan-500/10 text-sm flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : formData.category === 'general' ? (
                    "Send Message"
                  ) : (
                    "Submit Correction Report"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
