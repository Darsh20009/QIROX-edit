import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [showCompany, setShowCompany] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Q shape using blocks (5x5 grid approximation)
  const qBlocks = [
    { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
    { x: 0, y: 1 }, { x: 4, y: 1 },
    { x: 0, y: 2 }, { x: 4, y: 2 },
    { x: 0, y: 3 }, { x: 4, y: 3 },
    { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 5 }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Animated Q Construction */}
        <div className="relative w-32 h-32 mb-8">
          {qBlocks.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut"
              }}
              className="absolute w-6 h-6 bg-primary rounded-sm shadow-[0_0_15px_rgba(var(--primary),0.5)]"
              style={{
                left: `${block.x * 1.6}rem`,
                top: `${block.y * 1.6}rem`,
              }}
            />
          ))}
        </div>

        {/* Company Name reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          onAnimationComplete={() => setShowCompany(true)}
          className="flex items-center gap-1"
        >
          <span className="text-6xl font-black text-white tracking-tighter">
            <span className="text-primary">Q</span>
            <AnimatePresence>
              {showCompany && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-block"
                >
                  IROX
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="text-white/60 mt-4 font-medium tracking-[0.2em] uppercase text-sm"
        >
          Build systems. Stay human.
        </motion.p>
      </div>

      {/* Background ambient pulse */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full"
      />
    </div>
  );
}
