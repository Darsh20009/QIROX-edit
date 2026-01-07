import { cn } from "@/lib/utils";
import qiroxLogo from "@assets/QIROX_LOGO_1767780768121.png";

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
