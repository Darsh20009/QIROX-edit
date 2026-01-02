import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingCart, Layout, Terminal, Users, CheckCircle2, Shield, Zap } from "lucide-react";
import { useLocation } from "wouter";

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-12"
      >
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            QIROX
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Build systems. Stay human.
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground pt-4">
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

        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">What are you trying to build?</h2>
            <p className="text-muted-foreground">Select an option to see tailored solutions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {options.map((option) => (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all duration-300 hover:border-primary group relative overflow-hidden ${
                  selected === option.id ? "border-primary ring-2 ring-primary/20 bg-primary/5" : ""
                }`}
                onClick={() => setSelected(option.id)}
              >
                <CardContent className="p-8 flex flex-col h-full text-left space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-4 rounded-xl ${option.color} transition-transform group-hover:scale-110`}>
                      <option.icon className="w-8 h-8" />
                    </div>
                    {selected === option.id && (
                      <CheckCircle2 className="w-6 h-6 text-primary animate-in zoom-in" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{option.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                  <ul className="grid grid-cols-1 gap-2 pt-4">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
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
                className="min-h-12 px-12 text-lg font-bold group rounded-full"
                onClick={() => setLocation(`/register?type=${selected}`)}
              >
                Start Your {options.find(o => o.id === selected)?.title} Project
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-sm text-muted-foreground">
                No credit card required • 14-day free trial • Human support included
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-12 border-t flex flex-wrap justify-center gap-8">
          <Button variant="ghost" className="hover:bg-transparent hover:text-primary font-semibold" onClick={() => setLocation("/login")}>
            Sign In
          </Button>
          <Button variant="outline" className="border-2 font-semibold" onClick={() => setLocation("/register")}>
            Partner Program
          </Button>
          <Button variant="ghost" className="text-muted-foreground" onClick={() => setLocation("/about")}>
            About QIROX
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
