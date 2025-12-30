import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Terminal, Cpu, HardDrive } from "lucide-react";

export default function AdminLogsPage() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) return null;

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8 text-right">
        <h1 className="text-3xl font-bold mb-8">سجلات النظام العميقة</h1>
        
        <Card className="bg-black text-green-500 font-mono">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 justify-end text-sm">
              <span>Terminal Output</span>
              <Terminal className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-1">
            <p>[2024-12-30 07:15:22] INFO: Server started on port 5000</p>
            <p>[2024-12-30 07:15:25] DEBUG: DB Connection Pool initialized</p>
            <p>[2024-12-30 07:16:01] WARN: Memory usage above 70%</p>
            <p>[2024-12-30 07:16:45] INFO: User Admin logged in from IP 192.168.1.1</p>
            <p>[2024-12-30 07:17:10] ERROR: Request timeout on /api/external/sync</p>
            <p className="animate-pulse">_</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
