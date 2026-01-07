import { cn } from "@/lib/utils";
import qiroxLogo from "@assets/qirox_without_background_1767002019509.png";

export function LogoQ({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden flex items-center justify-center", className)}>
      <img 
        src={qiroxLogo} 
        alt="QIROX Logo" 
        className="w-full h-full object-contain brightness-0 invert" 
      />
    </div>
  );
}
