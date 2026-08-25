'use client';

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

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
    <div className="min-h-screen bg-black text-slate-100 py-24 px-4 flex items-center relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: Info Column (Discord Card removed) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
            <div className="flex flex-col gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-800/40 backdrop-blur-md mb-6 text-red-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Connect & Support</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-poppins font-extrabold tracking-tight mb-4 text-white">
                  Let's talk about <br />
                  your aquarium.
                </h1>
                
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                  Have setup questions, partnership ideas, feedback, or need help with a tank calculation? Reach out to our team. We love collaborating with the community.
                </p>
              </div>

              {/* Direct Support Email Card */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm shadow-xl flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-950/85 border border-red-800/30 flex items-center justify-center text-red-400">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Support</h3>
                    <button 
                      onClick={handleCopyEmail}
                      className="text-base font-bold text-white hover:text-red-500 transition-colors cursor-pointer text-left"
                    >
                      {emailTo}
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="w-full mt-2 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-750 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Copy Support Email</span>
                </button>
              </div>
            </div>

            {/* Signature Team Info */}
            <div className="p-6 text-xs text-slate-500 font-light border-t border-slate-900/80 leading-relaxed hidden lg:block">
              <p className="font-bold text-slate-400 uppercase tracking-wider mb-2">AquaVersa HQ</p>
              <p>
                AquaVersa Support Team<br/>
                123 Ocean Drive, Suite 400<br/>
                Seaside, CA 94000
              </p>
            </div>
          </div>

          {/* RIGHT: Contact Form (Web3Forms client-side submit) */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-slate-800/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-between text-left">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                <div className="flex items-center gap-2.5 text-red-500 font-bold uppercase tracking-wider text-xs">
                  <span>Send a Message</span>
                </div>
              </div>

              {/* Status Alert Banners */}
              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-1">Message sent successfully!</strong>
                    Thanks for reaching out. We will get back to you soon.
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-400 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-450 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-1">Submission failed</strong>
                    {errorMessage}
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-2">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-850 bg-slate-955/60 focus:bg-slate-955 focus:border-red-500 text-slate-100 text-sm transition-all focus:outline-none placeholder-slate-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. johndoe@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-855 bg-slate-955/60 focus:bg-slate-955 focus:border-red-500 text-slate-100 text-sm transition-all focus:outline-none placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Subject & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Setup question"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-850 bg-slate-955/60 focus:bg-slate-955 focus:border-red-500 text-slate-100 text-sm transition-all focus:outline-none placeholder-slate-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-850 bg-slate-955/60 focus:bg-slate-955 focus:border-red-500 text-slate-100 text-sm transition-all focus:outline-none placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Message TextArea */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what we can help with..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-850 bg-slate-955/60 focus:bg-slate-955 focus:border-red-500 text-slate-100 text-sm transition-all focus:outline-none placeholder-slate-600 resize-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-850">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-650 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 text-sm flex items-center justify-center gap-2 group cursor-pointer"
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
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
