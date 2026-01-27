import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 3;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/25 to-purple-500/15 rounded-full blur-[150px] animate-blob" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/15 to-primary/25 rounded-full blur-[120px] animate-blob" style={{ animationDelay: "-4s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full animate-spin-slow" style={{ animationDuration: "20s" }} />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: 0.1 
            }}
            className="relative"
          >
            <div className="w-28 h-28 rounded-3xl gradient-bg flex items-center justify-center shadow-glow animate-pulse-glow">
              <Sparkles className="w-14 h-14 text-white" />
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -inset-5 border-2 border-primary/20 rounded-[2rem] animate-spin-slow" 
              style={{ animationDuration: "10s" }} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -inset-10 border border-primary/10 rounded-[2.5rem] animate-spin-slow" 
              style={{ animationDuration: "15s", animationDirection: "reverse" }} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center space-y-3"
          >
            <h1 className="text-5xl font-bold gradient-text tracking-tight">QIROX</h1>
            <p className="text-lg text-muted-foreground">ابنِ أنظمتك. ابقَ إنساناً.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 240 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <div className="h-2 w-[240px] bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-bg rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </motion.div>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{progress < 100 ? "جاري التحميل..." : "مرحباً بك"}</span>
              <span className="font-mono">{progress}%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-3 text-xs text-muted-foreground/60"
          >
            <span className="tracking-widest uppercase">v2.0</span>
            <div className="w-1 h-1 rounded-full bg-primary" />
            <span className="tracking-widest uppercase">2026</span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
