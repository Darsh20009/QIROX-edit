import { motion } from "framer-motion";
import { useEffect } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // Optimized for best flow
    return () => clearTimeout(timer);
  }, [onComplete]);

  // The Creative Q-Shape Layout
  const qBlocks = [
    { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
    { x: 0, y: 1 }, { x: 4, y: 1 },
    { x: 0, y: 2 }, { x: 4, y: 2 },
    { x: 0, y: 3 }, { x: 4, y: 3 },
    { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 5 }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic Background with Modern Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Creative Block Animation (The Q-Build) */}
        <div className="relative w-[180px] h-[180px] mb-12 flex items-center justify-center">
          {qBlocks.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: 0,
                x: block.x * 28 - 70, // Centering logic
                y: block.y * 28 - 70,
                backgroundColor: ["#111", "#22C55E", "#111"],
                borderColor: ["#222", "#22C55E", "#222"],
              }}
              transition={{
                duration: 2,
                delay: i * 0.04,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute w-[24px] h-[24px] rounded-[4px] border border-white/5 shadow-[0_0_15px_rgba(34,197,94,0)]"
              style={{
                boxShadow: "inset 0 0 10px rgba(255,255,255,0.02)"
              }}
            />
          ))}
        </div>

        {/* Brand Identity Section */}
        <div className="text-center relative">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-7xl font-black tracking-tighter text-white">
              QIROX
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/50" />
              <p className="text-primary font-black uppercase tracking-[0.6em] text-[10px] whitespace-nowrap">
                Future Tech
              </p>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </motion.div>
        </div>

        {/* Loading Indicator */}
        <div className="mt-16 w-40 h-[1px] bg-white/5 relative overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>

      {/* Final Flash Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{ delay: 3.5, duration: 0.5 }}
        className="absolute inset-0 bg-white z-50 pointer-events-none"
      />
    </div>
  );
}
