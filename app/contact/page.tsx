'use client';

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, AlertTriangle, User, FileText, Phone, MessageSquare, Compass } from "lucide-react";

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

  const inputClass = "w-full bg-black/60 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-11 pr-4 py-3.5 text-slate-100 text-sm transition-all focus:outline-none placeholder-slate-650 hover:border-slate-700 font-medium";

  return (
    <div className="min-h-screen bg-black text-slate-100 py-24 px-4 flex items-center relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-955/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-955/30 border border-blue-500/20 backdrop-blur-md mb-8 text-blue-500 text-xs font-bold uppercase tracking-widest animate-float">
                <Compass className="w-4 h-4 text-blue-500" />
                <span>CONNECT WITH US</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-poppins font-extrabold tracking-tight mb-6 text-white leading-[1.12]">
                Let's talk about <br />
                your aquarium.
              </h1>
              
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-8 max-w-sm">
                Have stocking inquiries, hardware setup questions, or partnership ideas? Send a note to our support team and we will reply as soon as possible.
              </p>

              {/* Direct Support Email Box */}
              <div className="p-6 rounded-2xl bg-black border border-slate-800 shadow-xl flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Support Desk</h3>
                    <button 
                      onClick={handleCopyEmail}
                      className="text-base font-bold text-white hover:text-blue-500 transition-colors cursor-pointer text-left font-poppins"
                    >
                      {emailTo}
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-slate-200"
                >
                  <span>Copy Support Email</span>
                </button>
              </div>
            </div>

            {/* Signature Info */}
            <div className="text-xs text-slate-500 font-light leading-relaxed hidden lg:block pt-4 border-t border-slate-900">
              <p className="font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-poppins">AquaVersa Hub</p>
              <p>123 Ocean Drive, Suite 400, Seaside, CA 94000</p>
            </div>
          </div>

          {/* RIGHT: Contact Form (Premium card container with field icons) */}
          <div className="lg:col-span-7">
            <div className="glass p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden text-left border border-blue-500/15">
              
              <h2 className="font-poppins font-bold text-xl text-white mb-6 pb-4 border-b border-slate-900">
                Send Message
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-5">

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
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-450 text-xs flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-455 mt-0.5" />
                    <div>
                      <strong className="block font-semibold mb-1">Submission failed</strong>
                      {errorMessage}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-poppins block">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-poppins block">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          required
                          placeholder="johndoe@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-poppins block">
                        Subject
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Stocking check"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-poppins block">
                        Phone (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message TextArea */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-poppins block">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-[18px] w-4 h-4 text-slate-500" />
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us what we can help with..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-black/60 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-11 pr-4 py-3.5 text-slate-100 text-sm transition-all focus:outline-none placeholder-slate-650 hover:border-slate-700 font-medium resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-650 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 text-sm flex items-center justify-center gap-2 group cursor-pointer tracking-wider uppercase font-poppins"
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
