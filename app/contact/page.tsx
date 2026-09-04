'use client';

import { useState } from "react";
import { Mail, CheckCircle2, AlertTriangle, User, FileText, Phone, MessageSquare, Send, RotateCcw } from "lucide-react";
import { siteConfig } from "@/config/site";
import GlobalCTA from "@/components/ui/GlobalCTA";

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
      setErrorMessage(err.message || "We couldn't send your message right now. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-[#0d0630] border border-[#3622a6] focus:border-[#F7F7FF] focus:ring-1 focus:ring-[#F7F7FF] rounded-xl pl-10 pr-4 py-3 text-[#F7F7FF] text-xs transition-all focus:outline-none placeholder-[#F7F7FF]/40 font-sans";

  return (
    <div className="min-h-[85vh] bg-[#0f0738] text-[#F7F7FF] py-16 px-4 sm:px-6 flex items-center font-sans text-left">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#27187E]/50 border border-[#3622a6] text-[#F7F7FF] text-xs font-condensed uppercase tracking-wider font-semibold mb-4">
                <Mail className="w-3.5 h-3.5 text-[#aca1f7]" />
                <span>Contact & Inquiries</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-display font-normal text-[#F7F7FF] tracking-wide leading-tight mb-4">
                Get in Touch with {siteConfig.name}
              </h1>
              
              <p className="text-sm text-[#F7F7FF]/75 font-normal leading-relaxed mb-6 font-sans">
                Have questions regarding tank stocking, species parameters, equipment setup, or care guides? Send a message and we will respond as soon as possible.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-5 rounded-2xl bg-[#1c0e64] border border-[#27187E] space-y-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#27187E] border border-[#4a34c9] flex items-center justify-center text-[#F7F7FF] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-condensed uppercase tracking-wider font-bold text-[#aca1f7] block">Direct Email</span>
                  <span className="text-sm font-semibold text-[#F7F7FF] truncate block font-sans">{siteConfig.contactEmail}</span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full py-2 bg-[#27187E] hover:bg-[#3622a6] border border-[#4a34c9] text-[#F7F7FF] text-xs font-condensed uppercase tracking-wider font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{copiedEmail ? "Email Copied to Clipboard!" : "Copy Contact Email"}</span>
              </button>
            </div>

            <div className="text-xs text-[#F7F7FF]/60 pt-2 leading-relaxed font-sans">
              <p className="font-condensed uppercase tracking-wider font-bold text-[#aca1f7] mb-1">Educational Resource Notice</p>
              <p>
                {siteConfig.name} provides educational aquarium hobby guidance. For urgent aquatic animal medical emergencies, consult a local aquatic veterinarian.
              </p>
            </div>
          </div>

          {/* RIGHT: Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1c0e64] border border-[#27187E] shadow-2xl text-left">
              
              <h2 className="font-display font-normal text-2xl text-[#F7F7FF] mb-5 pb-3 border-b border-[#27187E] tracking-wide">
                Send a Message
              </h2>

              {/* Status Alert Banners */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-[#27187E] border border-[#4a34c9] text-[#F7F7FF] text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-[#F7F7FF] mt-0.5" />
                  <div>
                    <strong className="block font-bold mb-0.5 font-condensed uppercase tracking-wider text-sm">Message sent successfully.</strong>
                    Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-200 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-rose-300 mt-0.5" />
                  <div>
                    <strong className="block font-bold mb-0.5 font-condensed uppercase tracking-wider text-sm">We couldn&apos;t send your message right now.</strong>
                    {errorMessage} Please review your fields and try again.
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="fullName" className="text-[11px] font-condensed uppercase tracking-wider font-bold text-[#F7F7FF]/80 block">
                      Full Name <span className="text-[#aca1f7]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aca1f7]" />
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
                      <p className="text-[11px] text-rose-300 pl-1">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-[11px] font-condensed uppercase tracking-wider font-bold text-[#F7F7FF]/80 block">
                      Email Address <span className="text-[#aca1f7]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aca1f7]" />
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
                      <p className="text-[11px] text-rose-300 pl-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="subject" className="text-[11px] font-condensed uppercase tracking-wider font-bold text-[#F7F7FF]/80 block">
                      Subject <span className="text-[#aca1f7]">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aca1f7]" />
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
                      <p className="text-[11px] text-rose-300 pl-1">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-[11px] font-condensed uppercase tracking-wider font-bold text-[#F7F7FF]/80 block">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aca1f7]" />
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
                  <label htmlFor="message" className="text-[11px] font-condensed uppercase tracking-wider font-bold text-[#F7F7FF]/80 block">
                    Message <span className="text-[#aca1f7]">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-[#aca1f7]" />
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
                      className={`w-full bg-[#0d0630] border border-[#3622a6] focus:border-[#F7F7FF] focus:ring-1 focus:ring-[#F7F7FF] rounded-xl pl-10 pr-4 py-3 text-[#F7F7FF] text-xs transition-all focus:outline-none placeholder-[#F7F7FF]/40 font-sans resize-none ${errors.message ? "border-rose-500" : ""}`}
                      aria-invalid={errors.message ? "true" : "false"}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-[11px] text-rose-300 pl-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#F7F7FF] hover:bg-white disabled:bg-[#27187E] disabled:text-[#F7F7FF]/40 text-[#27187E] font-condensed font-bold uppercase tracking-wider text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
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

      <GlobalCTA
        badge="AQUARIUM KNOWLEDGE ARCHIVE"
        title={
          <>
            Explore species parameters, <br className="hidden sm:inline" />
            live plants, and tank calculators.
          </>
        }
        description="Jump directly into our interactive decision tools designed for every stage of your aquarium journey."
        primaryAction={{
          label: 'Explore Fish Species',
          href: '/fish',
        }}
        secondaryAction={{
          label: 'Start Aquarium Guide',
          href: '/start-aquarium',
        }}
      />
    </div>
  );
}
