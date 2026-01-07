import { motion } from "framer-motion";
import { useEffect } from "react";
import saudiHeroImage from "@assets/generated_images/saudi_man_with_flag_splash_screen_image.png";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Cinematic Wash */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${saudiHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </motion.div>
      
      {/* Integrated Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 w-full px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Brand Name & Identity */}
          <div className="text-center space-y-2">
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              QIROX
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-12 bg-primary/50" />
              <p className="text-primary font-black text-xs tracking-[0.6em] uppercase ml-[0.6em]">
                Future Tech
              </p>
              <div className="h-[1px] w-12 bg-primary/50" />
            </div>
          </div>

          {/* Slogan / Vision */}
          <div className="bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            <p className="text-white/80 text-sm md:text-base font-bold tracking-tight">
              بكل فخر.. نصنع المستقبل
            </p>
          </div>

          {/* Saudi Vision 2030 Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/20"
          >
            <span className="text-[10px] text-primary font-black uppercase tracking-widest">Saudi Vision 2030</span>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-full mt-4">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
        </motion.div>
      </div>

      {/* Final Fade Out Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 4.5, times: [0, 0.8, 1], ease: "linear" }}
        className="absolute inset-0 bg-black z-50 pointer-events-none"
      />
    </div>
  );
}
