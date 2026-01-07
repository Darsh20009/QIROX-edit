import { motion } from "framer-motion";

export function LogoQ({ className = "w-10 h-10" }: { className?: string }) {
  // The Creative Q-Shape Layout matching the splash screen
  const qBlocks = [
    { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
    { x: 0, y: 1 }, { x: 4, y: 1 },
    { x: 0, y: 2 }, { x: 4, y: 2 },
    { x: 0, y: 3 }, { x: 4, y: 3 },
    { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 5 }
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-[10%]">
        {qBlocks.map((block, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ 
              opacity: 1,
              scale: 1,
            }}
            className="rounded-[15%] bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]"
            style={{
              gridColumnStart: block.x + 1,
              gridRowStart: block.y + 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
