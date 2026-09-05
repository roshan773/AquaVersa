'use client';

import { useState } from "react";
import { Mail, CheckCircle2, AlertTriangle, User, FileText, Phone, MessageSquare, Send, RotateCcw, Compass, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import GlobalCTA from "@/components/ui/GlobalCTA";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  
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
      setSubmitStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left font-readable marine-pattern-light">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-12 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Keeper Support &amp; Inquiries</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            GET IN TOUCH
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 max-w-2xl leading-relaxed font-medium">
            Have questions about species care sheets, water chemistry diagnostics, or feedback for our digital field guide? Send us a message.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-10 shadow-sm">
            <h2 className="font-display text-2xl sm:text-3xl text-[#27187e] mb-6">
              Send a Direct Inquiry
            </h2>

            {submitStatus === "success" ? (
              <div className="p-8 rounded-3xl bg-[#edeafc] border-2 border-[#27187e] text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#27187e] mx-auto" />
                <h3 className="font-display text-3xl text-[#27187e]">Message Delivered</h3>
                <p className="text-base text-[#27187e]/85 font-medium max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. We have received your message and our team will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#27187e] text-[#f7f7ff] text-sm font-semibold uppercase tracking-wider hover:bg-[#1b1059] transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {submitStatus === "error" && (
                  <div className="p-4 rounded-2xl bg-[#edeafc] border border-[#27187e] text-sm text-[#27187e] flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Roshan Sharma"
                      className={`w-full bg-[#f7f7ff] border-2 rounded-2xl px-4 py-3 text-base text-[#27187e] font-medium focus:outline-none transition-all ${
                        errors.fullName ? 'border-red-500' : 'border-[#cfcaf5] focus:border-[#27187e]'
                      }`}
                    />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full bg-[#f7f7ff] border-2 rounded-2xl px-4 py-3 text-base text-[#27187e] font-medium focus:outline-none transition-all ${
                        errors.email ? 'border-red-500' : 'border-[#cfcaf5] focus:border-[#27187e]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                      Subject Line *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Care Sheet Question"
                      className={`w-full bg-[#f7f7ff] border-2 rounded-2xl px-4 py-3 text-base text-[#27187e] font-medium focus:outline-none transition-all ${
                        errors.subject ? 'border-red-500' : 'border-[#cfcaf5] focus:border-[#27187e]'
                      }`}
                    />
                    {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91..."
                      className="w-full bg-[#f7f7ff] border-2 border-[#cfcaf5] focus:border-[#27187e] rounded-2xl px-4 py-3 text-base text-[#27187e] font-medium focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#27187e]/80 mb-2 tracking-wider">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need help with..."
                    className={`w-full bg-[#f7f7ff] border-2 rounded-2xl px-4 py-3 text-base text-[#27187e] font-medium focus:outline-none transition-all ${
                      errors.message ? 'border-red-500' : 'border-[#cfcaf5] focus:border-[#27187e]'
                    }`}
                  ></textarea>
                  {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#27187e] hover:bg-[#1b1059] disabled:opacity-50 text-[#f7f7ff] font-bold text-sm sm:text-base uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Delivering Message..." : "Transmit Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="font-display text-2xl sm:text-3xl text-[#27187e] border-b border-[#edeafc] pb-3">
                Direct Contact Details
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5] space-y-1">
                  <span className="text-xs uppercase font-bold text-[#27187e]/70 block tracking-wider">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-bold text-base text-[#27187e] hover:underline block"
                  >
                    {siteConfig.contactEmail}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="text-xs text-[#27187e]/80 hover:underline pt-1 cursor-pointer block"
                  >
                    {copiedEmail ? "✓ Copied to clipboard" : "Click to copy email address"}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5] space-y-1">
                  <span className="text-xs uppercase font-bold text-[#27187e]/70 block tracking-wider">
                    Location &amp; Operations
                  </span>
                  <p className="font-medium text-sm sm:text-base text-[#27187e]">
                    India (Global English Platform)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f7f7ff] border border-[#cfcaf5] space-y-1">
                  <span className="text-xs uppercase font-bold text-[#27187e]/70 block tracking-wider">
                    Live Response Window
                  </span>
                  <p className="font-medium text-sm sm:text-base text-[#27187e]">
                    Monday – Saturday: 9:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <GlobalCTA
        badge="DIGITAL AQUARIUM ATLAS"
        title={
          <>
            Explore complete care sheets <br className="hidden sm:inline" />
            for all aquarium species.
          </>
        }
        description="Search fish profiles, low-light plants, and water test kit interpretation guides."
        primaryAction={{
          label: 'Open Species Atlas',
          href: '/fish',
        }}
        secondaryAction={{
          label: 'Calculate Tank Dimensions',
          href: '/tank-size',
        }}
      />
    </div>
  );
}
