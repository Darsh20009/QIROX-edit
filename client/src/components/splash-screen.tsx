import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import organicArt from "@assets/generated_images/organic_fluid_dark_abstract_art.png";
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
        setTimeout(onComplete, 1500);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Abstract Art */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 grayscale"
      >
        <img 
          src={organicArt} 
          alt="Art" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A] to-[#0A0A0A]" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center space-y-12">
        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <img 
            src={qiroxLogo} 
            alt="QIROX" 
            className="h-24 md:h-32 w-auto invert brightness-0 mb-8"
          />
          
          <div className="h-px w-40 bg-white/20 relative overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </motion.div>

        {/* Minimalist Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center space-y-4"
        >
          <p className="text-[10px] tracking-[1em] uppercase opacity-40 font-light">
            Crafting Human Complexity
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-[8px] tracking-[0.5em] uppercase opacity-20">v.26</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[8px] tracking-[0.5em] uppercase opacity-20">2030 Vision</span>
          </div>
        </motion.div>
      </div>

      {/* Exit Transition Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 3, times: [0, 0.8, 1], ease: "linear" }}
        className="absolute inset-0 bg-[#0A0A0A] z-[110] pointer-events-none"
      />
    </div>
  );
}
