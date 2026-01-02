import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [showCompany, setShowCompany] = useState(false);

  useEffect(() => {
    // Initial delay to show construction before starting the exit sequence
    const timer = setTimeout(() => {
      onComplete();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Q shape using blocks
  const qBlocks = [
    { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
    { x: 0, y: 1 }, { x: 4, y: 1 },
    { x: 0, y: 2 }, { x: 4, y: 2 },
    { x: 0, y: 3 }, { x: 4, y: 3 },
    { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 5 }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient pulse */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-white/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Continuous Loading / Building Animation */}
        <div className="relative w-40 h-40 mb-12">
          {qBlocks.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: block.y * 1.8 * 16, 
                x: block.x * 1.8 * 16,
              }}
              transition={{
                duration: 0.5,
                delay: (i * 0.1),
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              className="absolute w-6 h-6 bg-[#F5F5F5] rounded-[2px]"
              style={{
                left: 0,
                top: 0,
              }}
            />
          ))}
        </div>

        {/* Company Name reveal */}
        <div className="flex items-center overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="text-7xl font-black text-[#F5F5F5] tracking-tighter"
          >
            QIROX
          </motion.span>
        </div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          className="w-48 h-[2px] bg-white/20 mt-8 rounded-full overflow-hidden origin-right"
        >
          <div className="w-full h-full bg-white/60" />
        </motion.div>
      </div>
    </div>
  );
}
