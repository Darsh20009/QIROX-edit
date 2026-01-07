import { motion } from "framer-motion";
import { useEffect } from "react";
import { LogoQ } from "@/components/ui/logo-q";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // Reduced time for better UX
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08)_0%,transparent_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Simplified High-Performance Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] // Custom ease-out expo
          }}
          className="relative mb-8"
        >
          <div className="relative p-6 rounded-3xl bg-secondary/30 border border-border/40 backdrop-blur-sm shadow-2xl shadow-primary/10">
            <LogoQ className="w-20 h-20 text-primary animate-pulse-subtle" />
          </div>
          
          {/* Subtle Ring Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.5, 0], scale: 1.5 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute inset-0 rounded-full border border-primary/30"
          />
        </motion.div>

        {/* Text Animation */}
        <div className="text-center space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-black tracking-tighter text-foreground"
          >
            QIROX
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-primary text-[10px] font-black uppercase tracking-[0.6em] ml-[0.6em]"
          >
            Future Tech
          </motion.p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="mt-12 w-32 h-[2px] bg-muted overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}
