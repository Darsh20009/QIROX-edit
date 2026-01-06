import { cn } from "@/lib/utils";

export function LogoQ({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full drop-shadow-sm", className)}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      
      {/* Outer Circle/Ring */}
      <path 
        d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C57.4 85 64.24 82.72 69.9 78.8L82 88L85 85L72.9 75.8C77.36 69.1 80 60.9 80 52C80 31.57 63.43 15 43 15" 
        stroke="url(#logo-gradient)" 
        strokeWidth="8" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Abstract Inner Element (Creative Q tail/connector) */}
      <path 
        d="M50 35C41.72 35 35 41.72 35 50C35 58.28 41.72 65 50 65" 
        stroke="url(#logo-gradient)" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      
      <circle cx="65" cy="50" r="4" fill="url(#logo-gradient)" />
    </svg>
  );
}
