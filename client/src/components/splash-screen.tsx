import { motion } from "framer-motion";
import { useEffect } from "react";
import qiroxFullLogo from "@assets/qirox_without_background_1767780745614.png";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_70%)]" />
        <motion.div 
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" 
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Main Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-[280px] md:max-w-[400px]"
        >
          <img 
            src={qiroxFullLogo} 
            alt="QIROX" 
            className="w-full h-auto brightness-0 invert drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
          />
          
          {/* Elegant Scanline Effect */}
          <motion.div
            initial={{ top: "-100%" }}
            animate={{ top: "200%" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-[1px]"
          />
        </motion.div>

        {/* Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 flex flex-col items-center gap-4"
        >
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.8em] ml-[0.8em]">
            Build systems. Stay human.
          </p>
          
          {/* Premium Progress Bar */}
          <div className="w-32 h-[1px] bg-white/5 relative overflow-hidden rounded-full">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
        </motion.div>
      </div>

      {/* Ambient Glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" 
      />
    </div>
  );
}
