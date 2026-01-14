import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/seo";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Shield, Star, Check, Copy, Zap, Cpu, Rocket, Layout, Sparkles, ChevronRight } from "lucide-react";
import { PARTNERS } from "@/lib/constants";
import qiroxHero from "@assets/qirox_1767360025807.png";
import generatedBg from "@assets/generated_images/futuristic_abstract_digital_technology_background.png";

const FloatingElement = ({ children, delay = 0, duration = 4 }: { children: React.ReactNode, delay?: number, duration?: number }) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] ${className}`}>
    {children}
  </div>
);

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-english overflow-x-hidden selection:bg-primary/30">
      <SEO title="الرئيسية | QIROX Intelligence" description="QIROX - The autonomous technology ecosystem for future-proof enterprises." />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black z-10" />
        <img src={generatedBg} alt="Background" className="w-full h-full object-cover mix-blend-screen" />
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[180px] animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-6">
        <div className="max-w-[1400px] mx-auto">
          <GlassCard className="!p-0 !rounded-3xl h-16 flex items-center justify-between px-8 bg-black/40">
            <div className="flex items-center gap-12">
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-xl font-black tracking-tighter uppercase">QIROX</span>
                </div>
              </Link>
              <div className="hidden lg:flex items-center gap-6">
                {['Intelligence', 'Systems', 'Global', 'DevCenter'].map((item) => (
                  <button key={item} className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-[10px] font-black uppercase tracking-widest text-primary font-arabic border border-primary/20 px-3 py-1 rounded-full">العربية</button>
              <Link href="/login">
                <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white px-4">
                  Access
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-white hover:bg-neutral-200 text-black text-xs font-black uppercase tracking-widest px-6 h-10 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Initialize
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 z-10">
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{ y: y1 }}
            className="text-right lg:text-left flex flex-col items-center lg:items-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-10"
            >
              <Sparkles className="w-3 h-3 animate-spin-slow" />
              Autonomous Enterprise Ecosystem
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8"
            >
              CRAFTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-700">INFINTY.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-neutral-400 max-w-xl mb-12 font-medium leading-relaxed"
            >
              QIROX is the neural network of modern business. We build the systems that define tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary text-black hover:bg-primary/90 text-sm font-black uppercase tracking-widest group">
                Start Deploying <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-sm font-black uppercase tracking-widest backdrop-blur-md">
                View Blueprint
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: 30 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative perspective-1000"
          >
            <FloatingElement>
              <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-3xl p-3 group">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img src={qiroxHero} alt="Hero" className="w-full rounded-[2.5rem] object-cover aspect-square md:aspect-[4/5]" />
                
                {/* HUD Elements */}
                <div className="absolute top-10 right-10 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 animate-pulse">
                  <Cpu className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute bottom-10 left-10 p-6 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl max-w-[200px]">
                  <p className="text-[10px] font-mono text-primary uppercase mb-2 tracking-tighter">Processing Neural Link...</p>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </div>
              </div>
            </FloatingElement>
            <div className="absolute -inset-20 bg-primary/20 blur-[120px] -z-10 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Services Grid - High Creativity */}
      <section className="py-40 px-6 z-10 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8">Specialized <br /><span className="text-neutral-500">Domains.</span></h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'QIROX BUILD', icon: Layout, desc: 'Architecting immersive digital interfaces.', color: 'text-blue-400' },
              { title: 'QIROX SYSTEMS', icon: Cpu, desc: 'Engineering the core of enterprise logic.', color: 'text-purple-400' },
              { title: 'QIROX STORES', icon: Rocket, desc: 'Accelerating modern commerce engines.', color: 'text-orange-400' }
            ].map((domain, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <GlassCard className="h-full flex flex-col justify-between group-hover:bg-primary/5">
                  <div className="space-y-8">
                    <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${domain.color} group-hover:scale-110 transition-transform`}>
                      <domain.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter">{domain.title}</h3>
                    <p className="text-neutral-400 text-lg font-medium leading-relaxed">{domain.desc}</p>
                  </div>
                  <div className="mt-12 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Core Module</span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="py-40 bg-white/5 border-y border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-4 gap-20">
          {[
            { label: 'Uptime', val: '99.9%' },
            { label: 'Partners', val: '2.5k+' },
            { label: 'API Calls', val: '1.2B' },
            { label: 'Deployments', val: '80k' }
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-primary">{stat.val}</p>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer - Minimalist & Bold */}
      <footer className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter">QIROX</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Protocol</Link>
            <Link href="/audit" className="hover:text-white transition-colors">System Audit</Link>
          </div>

          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
              <Globe className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-neutral-800">© 2026 QIROX Intelligence Agency. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
