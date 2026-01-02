import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingCart, Layout, Terminal, Users } from "lucide-react";
import { useLocation } from "wouter";

const options = [
  {
    id: "company",
    title: "Company Profile",
    description: "Professional website for your business",
    icon: Users,
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    id: "platform",
    title: "Platform",
    description: "SaaS or complex web application",
    icon: Layout,
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    id: "store",
    title: "E-commerce Store",
    description: "Sell products online with ease",
    icon: ShoppingCart,
    color: "bg-green-500/10 text-green-500"
  },
  {
    id: "custom",
    title: "Custom System",
    description: "Tailored software for your specific needs",
    icon: Terminal,
    color: "bg-orange-500/10 text-orange-500"
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
        className="max-w-3xl w-full space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            QIROX
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            Build systems. Stay human.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">What are you trying to build?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all duration-200 hover:border-primary group ${
                  selected === option.id ? "border-primary ring-1 ring-primary" : ""
                }`}
                onClick={() => setSelected(option.id)}
              >
                <CardContent className="p-6 flex items-start gap-4 text-left">
                  <div className={`p-3 rounded-lg ${option.color}`}>
                    <option.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4"
            >
              <Button 
                size="lg" 
                className="w-full md:w-auto px-8 py-6 text-lg group"
                onClick={() => setLocation(`/register?type=${selected}`)}
              >
                Start Building Your {options.find(o => o.id === selected)?.title}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-8 flex justify-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/login")}>
            Sign In
          </Button>
          <Button variant="outline" onClick={() => setLocation("/register")}>
            Create Account
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
