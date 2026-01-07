import { motion } from "framer-motion";
import { useEffect } from "react";
import logoImg from "@assets/qirox_without_background_1767779903078.png";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
      {/* Creative Background - Cyber Grid + Ambient Light */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Animated Light Streaks */}
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            x: ["-100%", "100%"] 
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            x: ["100%", "-100%"] 
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "brightness(0) invert(1) blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "brightness(0) invert(1) blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <img 
            src={logoImg} 
            alt="QIROX" 
            className="w-[300px] h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          />
          
          {/* Scanning Line Effect */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-primary/40 shadow-[0_0_15px_#22C55E] z-20 pointer-events-none"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center"
        >
          <p className="text-primary font-black uppercase tracking-[1em] text-[11px] ml-[1em] opacity-80">
            Future Technology Solutions
          </p>
        </motion.div>

        {/* Dynamic Loading Indicator */}
        <div className="mt-16 w-64 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>

      {/* Finishing Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 3.7, duration: 0.3 }}
        className="absolute inset-0 bg-white z-[110] pointer-events-none"
      />
    </div>
  );
}
