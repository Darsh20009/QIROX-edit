import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingCart, Layout, Terminal, Users, CheckCircle2, Shield, Zap } from "lucide-react";
import { useLocation } from "wouter";
import stockImage from '@assets/stock_images/professional_dark_ab_8c03aa58.jpg'

const options = [
  {
    id: "company",
    title: "Company Profile",
    description: "Professional website for your business",
    icon: Users,
    color: "bg-blue-500/10 text-blue-500",
    features: ["Custom Design", "SEO Optimized", "Mobile Ready"]
  },
  {
    id: "platform",
    title: "Platform",
    description: "SaaS or complex web application",
    icon: Layout,
    color: "bg-purple-500/10 text-purple-500",
    features: ["Multi-tenant", "User Roles", "API Integration"]
  },
  {
    id: "store",
    title: "E-commerce Store",
    description: "Sell products online with ease",
    icon: ShoppingCart,
    color: "bg-green-500/10 text-green-500",
    features: ["Payment Gateway", "Inventory Mgt", "Order Tracking"]
  },
  {
    id: "custom",
    title: "Custom System",
    description: "Tailored software for your specific needs",
    icon: Terminal,
    color: "bg-orange-500/10 text-orange-500",
    features: ["Scalable Arch", "Secure Data", "Full Support"]
  }
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Hero Background with Dark Wash */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${stockImage})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full space-y-12"
        >
          <div className="space-y-4">
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-white"
            >
              QIROX
            </motion.h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium italic">
              Build systems. Stay human.
            </p>
            <div className="flex justify-center gap-6 text-sm text-white/60 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Human-Driven</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Modular</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Audit-First</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">What are you trying to build?</h2>
              <p className="text-white/60">Select an option to see tailored solutions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {options.map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 group relative overflow-hidden border-white/10 bg-white/5 hover:bg-white/10 ${
                    selected === option.id ? "border-primary ring-2 ring-primary/40 bg-white/20" : ""
                  }`}
                  onClick={() => setSelected(option.id)}
                >
                  <CardContent className="p-8 flex flex-col h-full text-left space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-4 rounded-xl ${option.color} transition-transform group-hover:scale-110 shadow-lg`}>
                        <option.icon className="w-8 h-8" />
                      </div>
                      {selected === option.id && (
                        <CheckCircle2 className="w-6 h-6 text-white animate-in zoom-in" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">{option.title}</h3>
                      <p className="text-white/60 leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                    <ul className="grid grid-cols-1 gap-2 pt-4">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="pt-8 flex flex-col items-center gap-4"
              >
                <Button 
                  size="lg" 
                  className="min-h-12 px-12 text-lg font-bold group rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  onClick={() => setLocation(`/register?type=${selected}`)}
                >
                  Start Your {options.find(o => o.id === selected)?.title} Project
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-sm text-white/60 font-medium">
                  No credit card required • 14-day free trial • Human support included
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-12 border-t border-white/10 flex flex-wrap justify-center gap-8">
            <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 font-semibold" onClick={() => setLocation("/login")}>
              Sign In
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 font-semibold" onClick={() => setLocation("/register")}>
              Partner Program
            </Button>
            <Button variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5" onClick={() => setLocation("/about")}>
              About QIROX
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
