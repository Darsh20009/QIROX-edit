import logoImg from "@assets/qirox_without_background_1767779903078.png";

export function LogoQ({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <img 
        src={logoImg} 
        alt="QIROX" 
        className="w-full h-auto object-contain filter brightness-0 invert"
      />
    </div>
  );
}
