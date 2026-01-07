import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import saudiHeroImage from "@assets/generated_images/saudi_man_with_flag_splash_screen_image.png";
import qiroxLogo from "@assets/QIROX_LOGO_1767780768121.png";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const stage1Timer = setTimeout(() => setStage(2), 2500);
    const completeTimer = setTimeout(() => onComplete(), 5500);
    return () => {
      clearTimeout(stage1Timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === 1 ? (
          <motion.div
            key="saudi-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            {/* Background Image with Dark Wash */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${saudiHeroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            {/* National Message */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-4"
              >
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
                  بكل فخر.. نصنع المستقبل
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-[2px] w-12 bg-primary" />
                  <p className="text-primary font-bold text-lg tracking-widest uppercase">
                    Saudi Vision 2030
                  </p>
                  <div className="h-[2px] w-12 bg-primary" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="brand-stage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div 
              className="relative p-8"
              animate={{ 
                boxShadow: ["0 0 0px rgba(34,197,94,0)", "0 0 50px rgba(34,197,94,0.1)", "0 0 0px rgba(34,197,94,0)"] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img 
                src={qiroxLogo} 
                alt="QIROX Logo" 
                className="w-48 h-auto brightness-0 invert" 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center mt-6"
            >
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.8em] ml-[0.8em]">
                Build systems. Stay human.
              </p>
              
              <div className="mt-8 w-48 h-[2px] bg-white/10 relative overflow-hidden rounded-full mx-auto">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-primary"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Green Glow for both stages */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0" />
    </div>
  );
}
