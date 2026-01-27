import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import qiroxLogo from "@assets/qirox_without_background_1767780745614.png";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const fullText = "QIROX";

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current <= fullText.length) {
        setText(fullText.slice(0, current));
        current++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <img 
            src={qiroxLogo} 
            alt="QIROX" 
            className="h-20 md:h-28 w-auto mb-8"
          />
          
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center space-y-3"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-slate-500 font-medium">
            Build Systems. Stay Human.
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-[10px] tracking-widest uppercase text-slate-400">v.26</span>
            <div className="w-1 h-1 rounded-full bg-blue-400" />
            <span className="text-[10px] tracking-widest uppercase text-slate-400">2030 Vision</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 2.5, times: [0, 0.85, 1], ease: "linear" }}
        className="absolute inset-0 bg-white z-[110] pointer-events-none"
      />
    </div>
  );
}
