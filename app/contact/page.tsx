'use client';

import { useState } from "react";
import { Mail, CheckCircle2, AlertTriangle, User, FileText, Phone, MessageSquare, Send, RotateCcw } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    
    if (!fullName.trim()) {
      tempErrors.fullName = "Please enter your name.";
    } else if (fullName.trim().length < 2) {
      tempErrors.fullName = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      tempErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!subject.trim()) {
      tempErrors.subject = "Please enter a subject.";
    }

    if (!message.trim()) {
      tempErrors.message = "Please enter a message.";
    } else if (message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("submitting");
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
          from_name: `${siteConfig.name} Contact Form`,
        }),
      });

      const resData = await response.json();

      if (response.status === 200 && resData.success) {
        setSubmitStatus("success");
        // Reset form upon confirmed success
        setFullName("");
        setEmail("");
        setSubject("");
        setPhone("");
        setMessage("");
      } else {
        throw new Error(resData.message || "Unable to send message at this time.");
      }
    } catch (err: any) {
      console.error("Web3Forms submission error:", err);
      // Preserve form values so user doesn't lose their input
      setErrorMessage(err.message || "We couldn't send your message right now. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-slate-900 border border-slate-700/80 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl pl-10 pr-4 py-3 text-slate-100 text-xs transition-all focus:outline-none placeholder-slate-500 font-medium";

  return (
    <div className="min-h-[85vh] bg-[#030712] text-slate-100 py-16 px-4 sm:px-6 flex items-center font-sans text-left">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-800/30 text-teal-300 text-xs font-semibold mb-4">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>Contact & Questions</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-white tracking-tight leading-tight mb-4">
                Get in Touch with {siteConfig.name}
              </h1>
              
              <p className="text-sm text-slate-400 font-normal leading-relaxed mb-6">
                Have questions regarding tank stocking, species parameters, equipment setup, or care guides? Send a message and we will respond as soon as possible.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-5 rounded-2xl bg-[#061224] border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">Direct Email</span>
                  <span className="text-sm font-semibold text-white truncate block">{siteConfig.contactEmail}</span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{copiedEmail ? "Email Copied to Clipboard!" : "Copy Contact Email"}</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 pt-2 leading-relaxed">
              <p className="font-semibold text-slate-400 mb-1">Educational Resource Notice</p>
              <p>
                {siteConfig.name} provides educational aquarium hobby guidance. For urgent aquatic animal medical emergencies, consult a local aquatic veterinarian.
              </p>
            </div>
          </div>

          {/* RIGHT: Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#061224] border border-slate-800 shadow-xl text-left">
              
              <h2 className="font-poppins font-bold text-lg text-white mb-5 pb-3 border-b border-slate-800">
                Send a Message
              </h2>

              {/* Status Alert Banners */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/40 text-emerald-300 text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-0.5">Message sent successfully.</strong>
                    Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/50 border border-rose-800/40 text-rose-300 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-0.5">We couldn&apos;t send your message right now.</strong>
                    {errorMessage} Please review your fields and try again.
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="fullName" className="text-[11px] font-semibold text-slate-400 block">
                      Full Name <span className="text-teal-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="Your name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: "" }));
                        }}
                        className={`${inputClass} ${errors.fullName ? "border-rose-500" : ""}`}
                        aria-invalid={errors.fullName ? "true" : "false"}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 pl-1">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-[11px] font-semibold text-slate-400 block">
                      Email Address <span className="text-teal-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                        }}
                        className={`${inputClass} ${errors.email ? "border-rose-500" : ""}`}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 pl-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="subject" className="text-[11px] font-semibold text-slate-400 block">
                      Subject <span className="text-teal-400">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                      <input
                        id="subject"
                        type="text"
                        required
                        placeholder="e.g. Tank stocking question"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          if (errors.subject) setErrors(prev => ({ ...prev, subject: "" }));
                        }}
                        className={`${inputClass} ${errors.subject ? "border-rose-500" : ""}`}
                        aria-invalid={errors.subject ? "true" : "false"}
                      />
                    </div>
                    {errors.subject && (
                      <p className="text-[11px] text-rose-400 pl-1">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-[11px] font-semibold text-slate-400 block">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-[11px] font-semibold text-slate-400 block">
                    Message <span className="text-teal-400">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-slate-500" />
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Describe your question, tank size, or species inquiry..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors(prev => ({ ...prev, message: "" }));
                      }}
                      className={`w-full bg-slate-900 border border-slate-700/80 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl pl-10 pr-4 py-3 text-slate-100 text-xs transition-all focus:outline-none placeholder-slate-500 font-medium resize-none ${errors.message ? "border-rose-500" : ""}`}
                      aria-invalid={errors.message ? "true" : "false"}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 pl-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-xl transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending message…</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
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
