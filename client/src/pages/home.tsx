import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/seo";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Shield, Star, Check, Copy } from "lucide-react";
import { PARTNERS } from "@/lib/constants";
import qiroxHero from "@assets/qirox_1767360025807.png";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText("QX-992-LIVE-KEY");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white font-english overflow-x-hidden">
      <SEO title="الرئيسية | QIROX" description="QIROX - المنظومة التقنية المتكاملة لمستقبل أعمالك" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/">
              <span className="text-2xl font-black tracking-tighter cursor-pointer">QIROX</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {['About', 'Products', 'Solutions', 'Resources'].map((item) => (
                <button key={item} className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors font-arabic">العربية</button>
            <Link href="/login">
              <Button className="bg-[#1A1A1A] hover:bg-[#252525] text-white rounded-xl px-6 h-11 border border-white/10">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white hover:bg-neutral-200 text-black rounded-xl px-6 h-11">
                Start Today
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:rounded-b-[100px] rounded-b-[50px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/landing-hero-ltr.webp')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#010101]" />
        
        <div className="relative max-w-[1300px] mx-auto px-6 pt-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            The Future of Digital Enterprise
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8"
          >
            Empowering <br />
            <span className="text-neutral-500">Innovation</span> Globally
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12"
          >
            QIROX is the specialized technology ecosystem designed for scale. 
            We provide modular solutions for building, managing, and growing your digital presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            <Button size="lg" className="h-14 px-8 rounded-2xl bg-white text-black hover:bg-neutral-200 text-lg font-bold">
              Explore Services
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-lg font-bold backdrop-blur-sm">
              View Documentation
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-5xl rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group"
          >
            <img src={qiroxHero} alt="Hero" className="w-full object-cover aspect-video" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Floating Terminal Snippet */}
            <div className="absolute bottom-8 left-8 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl max-w-xs hidden md:block">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">System Status</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                <p className="text-green-400">$ qirox init --project-id 772</p>
                <p className="text-neutral-400">Initializing ecosystem...</p>
                <p className="text-primary">✓ All modules active</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Built for <br /><span className="text-neutral-500">Excellence.</span></h2>
              <p className="text-neutral-400 text-lg">We've broken down the ecosystem into specialized pillars to ensure focus and performance across every touchpoint.</p>
            </div>
            <Link href="/solutions">
              <Button variant="ghost" className="text-white hover:bg-white/5 gap-2 px-0">
                All Solutions <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'QIROX Build', desc: 'Custom frontend architectures and mobile experiences.', color: 'from-blue-500/20' },
              { title: 'QIROX Systems', desc: 'Scalable ERP/CRM backbones for complex operations.', color: 'from-purple-500/20' },
              { title: 'QIROX Stores', desc: 'High-performance e-commerce engines for modern retail.', color: 'from-orange-500/20' }
            ].map((s, i) => (
              <div key={i} className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]`} />
                <div className="relative space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-neutral-300" />
                  </div>
                  <h3 className="text-2xl font-bold">{s.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{s.desc}</p>
                  <Button variant="ghost" className="p-0 text-white h-auto font-bold group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-[1300px] mx-auto px-6">
          <p className="text-center text-neutral-500 text-sm font-bold uppercase tracking-[0.3em] mb-12">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-16 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {PARTNERS.slice(0, 5).map((P, i) => (
              <P.icon key={i} className="w-10 h-10" />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-12 px-6 sm:rounded-t-[100px] rounded-t-[50px] bg-neutral-900/20 border-t border-white/5 mt-20">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid md:grid-cols-2 justify-between items-start gap-20 pb-20 border-b border-white/5">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-8">Ready to transform <br />Your Experience?</h2>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-2xl px-8 bg-white text-black font-bold h-14">Get Started</Button>
                <Button size="lg" variant="outline" className="rounded-2xl px-8 border-white/10 text-white font-bold h-14">Contact Sales</Button>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-neutral-500 text-lg">Join 2,500+ businesses scaling with QIROX.</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
              </div>
            </div>
          </div>
          
          <div className="pt-12 flex flex-col md:flex-row justify-between gap-8 text-neutral-500 text-sm">
            <div className="flex gap-8">
              <p>© 2026 QIROX Technologies</p>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
            <div className="flex gap-6">
              <Globe className="w-5 h-5" />
              <span>Global Operations</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
