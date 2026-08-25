'use client';

import { useState } from "react";
import { Mail, MessageSquare, ArrowRight, CheckCircle2, AlertTriangle, Compass } from "lucide-react";

export default function ContactPage() {
  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Status settings
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailTo = "pakhreroshan@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailTo);
    alert("Email address copied to clipboard!");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "2d7e12ea-1240-4d9f-acbe-db75c3fbbae2",
          name: fullName,
          email: email,
          subject: subject,
          phone: phone,
          message: message,
          from_name: "AquaVersa Contact Form",
        }),
      });

      const resData = await response.json();

      if (response.status === 200 && resData.success) {
        setSubmitStatus("success");
        // Reset form
        setFullName("");
        setEmail("");
        setSubject("");
        setPhone("");
        setMessage("");
      } else {
        throw new Error(resData.message || "Failed to submit contact message.");
      }
    } catch (err: any) {
      console.error("Web3Forms submission error:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-4 flex items-center relative overflow-hidden font-sans">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Clean Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-poppins text-xs font-semibold tracking-wider uppercase mb-6">
                Connect
              </span>
              
              <h1 className="font-poppins font-bold text-4xl sm:text-5xl text-slate-900 dark:text-white leading-[1.15] mb-6 tracking-tight">
                Let's talk about <br />
                your aquarium.
              </h1>
              
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-md">
                Have questions about tank stocking, layout parameters, or calculations? Spotted a database inaccuracy or want to propose a partnership? Send us a note.
              </p>

              {/* Muted info links */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-600 shrink-0">
                    <Mail className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-poppins mb-0.5">Email Support</h4>
                    <button 
                      onClick={handleCopyEmail}
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-455 transition-colors cursor-pointer"
                    >
                      {emailTo}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-600 shrink-0">
                    <MessageSquare className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-poppins mb-0.5">Community Discord</h4>
                    <a 
                      href="https://discord.gg/aquaversa" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-455 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>Join Discord Channel</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Footer info */}
            <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-900 hidden lg:block text-xs font-light text-slate-400 leading-relaxed">
              <span className="font-bold text-[10px] tracking-widest uppercase block mb-1.5 font-poppins">AquaVersa Info</span>
              <p>
                AquaVersa Support Team<br />
                123 Ocean Drive, Suite 400<br />
                Seaside, CA 94000
              </p>
            </div>
          </div>

          {/* RIGHT: Minimal Premium Form */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.01)] text-left">
              <h2 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                Send a Message
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* Status Alert Banners */}
                {submitStatus === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <strong className="block font-semibold mb-0.5">Message sent successfully!</strong>
                      Thanks for reaching out. We will get back to you soon.
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                    <div>
                      <strong className="block font-semibold mb-0.5">Submission failed</strong>
                      {errorMessage}
                    </div>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-poppins">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 placeholder-slate-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-poppins">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. johndoe@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Subject & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-poppins">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Setup question"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 placeholder-slate-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-poppins">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Message TextArea */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-poppins">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what we can help with..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 placeholder-slate-400 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm hover:shadow"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
