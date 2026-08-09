import Image from "next/image";
import { Waves } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="min-h-screen py-24 bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
            <Waves className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Have questions, feedback, or partnership ideas? Reach out – we love hearing from fellow hobbyists.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-cyan-400">Email</h2>
            <p className="text-slate-200">support@aquaguide.io</p>
            <h2 className="text-2xl font-semibold text-cyan-400 mt-6">Discord</h2>
            <p className="text-slate-200">Join our community at <a href="https://discord.gg/aquaguide" className="underline hover:text-cyan-300">discord.gg/aquaguide</a></p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-cyan-400">Mailing Address</h2>
            <p className="text-slate-200">AquaGuide Team<br/>123 Ocean Drive<br/>Seaside, CA 94000<br/>USA</p>
            <h2 className="text-2xl font-semibold text-cyan-400 mt-6">Social</h2>
            <p className="text-slate-200">
              Follow us on <a href="https://instagram.com/aquaguide" className="underline hover:text-cyan-300">Instagram</a> and <a href="https://twitter.com/aquaguide" className="underline hover:text-cyan-300">Twitter</a> for daily tips.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
