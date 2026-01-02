import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [showCompany, setShowCompany] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Q shape using blocks (Matte White Style)
  const qBlocks = [
    { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
    { x: 0, y: 1 }, { x: 4, y: 1 },
    { x: 0, y: 2 }, { x: 4, y: 2 },
    { x: 0, y: 3 }, { x: 4, y: 3 },
    { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 5 }
  ];

  const workers = [
    { id: 1, x: -150, y: -100, delay: 0.2 },
    { id: 2, x: 180, y: 120, delay: 0.8 },
    { id: 3, x: -200, y: 150, delay: 1.4 },
    { id: 4, x: 220, y: -130, delay: 2.0 },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Premium Mesh Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Workers Building the Logo */}
        {workers.map((worker) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              x: [worker.x, worker.x + (worker.id % 2 === 0 ? 20 : -20)],
              y: [worker.y, worker.y - 30],
            }}
            transition={{
              duration: 2,
              delay: worker.delay,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="absolute"
          >
            <div className="w-8 h-12 bg-white/10 blur-[1px] rounded-full relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 rounded-full" />
            </div>
          </motion.div>
        ))}

        {/* Animated Q Construction (Matte White) */}
        <div className="relative w-40 h-40 mb-12">
          {qBlocks.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, y: -100, x: block.x * 20 - 50 }}
              animate={{ opacity: 1, scale: 1, y: block.y * 1.8 * 16, x: block.x * 1.8 * 16 }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              className="absolute w-6 h-6 bg-[#E0E0E0] rounded-[2px] shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              style={{
                left: 0,
                top: 0,
              }}
            />
          ))}
        </div>

        {/* Company Name reveal - Single Unified Flow */}
        <div className="flex items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="text-7xl font-black text-[#F5F5F5] tracking-tighter"
          >
            QIROX
          </motion.span>
        </div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ delay: 4.2, duration: 1 }}
          className="text-white/60 mt-6 font-medium tracking-[0.3em] uppercase text-xs"
        >
          Build systems. Stay human.
        </motion.p>
      </div>

      {/* Finishing Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ delay: 5, duration: 0.5 }}
        className="absolute inset-0 bg-white z-[110] pointer-events-none"
      />
    </div>
  );
}
