import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Plus
} from "lucide-react";

export default function EmployeeDashboard() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
    if (!authLoading && user && user.role !== "employee" && user.role !== "admin") {
      setLocation("/agency/dashboard");
    }
  }, [user, authLoading, setLocation]);

  const { data: projects, isLoading: projectsLoading } = useQuery<any[]>({
    queryKey: ["/api/projects"],
    enabled: !!user && (user.role === "employee" || user.role === "admin"),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ projectId, status }: { projectId: string; status: string }) => {
      return apiRequest("PATCH", `/api/projects/${projectId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "تم التحديث", description: "تم تحديث حالة المشروع بنجاح" });
    },
  });

  if (authLoading) return <div className="flex h-screen items-center justify-center">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir="rtl">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-white border-l shadow-sm hidden lg:block">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-primary">Qirox Team</h1>
          </div>
          <nav className="p-4 space-y-2">
            <Link href="/employee">
              <div className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded-lg cursor-pointer">
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">لوحة الموظفين</span>
              </div>
            </Link>
            <div className="flex items-center gap-3 p-3 text-muted-foreground hover:bg-muted rounded-lg cursor-pointer transition-colors">
              <Briefcase className="w-5 h-5" />
              <span>مهامي</span>
            </div>
            <div className="pt-8 border-t mt-8">
              <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logout}>
                <LogOut className="w-5 h-5" />
                <span>تسجيل الخروج</span>
              </Button>
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">لوحة الموظفين</h1>
              <p className="text-slate-500 mt-1">إدارة المشاريع والطلبات المسندة إليك</p>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => window.open("https://wa.me/966532441566")}>
              <MessageSquare className="w-4 h-4" />
              الدعم الفني
            </Button>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>قائمة المشاريع</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {projects?.map((p) => (
                      <div key={p.id} className="p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                            <p className="text-sm text-slate-500">{p.type}</p>
                          </div>
                          <Badge className="bg-primary/10 text-primary border-none">
                            {p.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          <Button size="sm" variant="outline" onClick={() => updateStatusMutation.mutate({ projectId: p.id, status: "design" })}>تصميم</Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatusMutation.mutate({ projectId: p.id, status: "development" })}>برمجة</Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatusMutation.mutate({ projectId: p.id, status: "testing" })}>اختبار</Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatusMutation.mutate({ projectId: p.id, status: "completed" })}>مكتمل</Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full">
                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${p.progress}%` }} />
                          </div>
                          <span className="text-sm font-medium">{p.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>إحصائيات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-600">نشط حالياً</span>
                    <span className="font-bold">{projects?.filter(p => p.status !== "completed").length || 0}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-emerald-600">تم الانتهاء</span>
                    <span className="font-bold">{projects?.filter(p => p.status === "completed").length || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
