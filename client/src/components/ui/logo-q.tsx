import { cn } from "@/lib/utils";

export function LogoQ({ className }: { className?: string }) {
  return (
    <div className={cn("relative grid grid-cols-3 grid-rows-3 gap-1 p-1 bg-gradient-to-br from-primary via-emerald-500 to-teal-500 rounded-2xl shadow-lg shadow-primary/20", className)}>
      {/* Top row */}
      <div className="bg-white/90 rounded-sm" />
      <div className="bg-white/90 rounded-sm" />
      <div className="bg-white/90 rounded-sm" />
      
      {/* Middle row */}
      <div className="bg-white/90 rounded-sm" />
      <div className="bg-transparent" />
      <div className="bg-white/90 rounded-sm" />
      
      {/* Bottom row */}
      <div className="bg-white/90 rounded-sm" />
      <div className="bg-white/90 rounded-sm" />
      <div className="bg-white/90 rounded-sm h-full w-full relative">
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white/90 rounded-sm" />
      </div>
    </div>
  );
}
