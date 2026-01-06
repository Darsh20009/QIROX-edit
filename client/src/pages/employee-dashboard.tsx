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

  const approveMutation = useMutation({
    mutationFn: async ({ projectId, status }: { projectId: string; status: string }) => {
      return apiRequest("PATCH", `/api/projects/${projectId}/approve`, { status });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ 
        title: variables.status === "yes" ? "تم الاعتماد" : "تم الرفض", 
        description: `تم تحديث حالة الموافقة للمشروع بنجاح` 
      });
    },
  });

  if (authLoading) return <div className="flex h-screen items-center justify-center font-bold text-primary">جاري التحميل...</div>;

  const pendingApproval = projects?.filter(p => p.isApproved === "no") || [];
  const activeProjects = projects?.filter(p => p.isApproved === "yes" && p.status !== "completed") || [];

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir="rtl">
      <div className="flex">
        <aside className="w-72 min-h-screen bg-slate-900 text-white hidden lg:block p-6">
          <div className="pb-8 border-b border-slate-800 mb-8">
            <h1 className="text-2xl font-black text-primary tracking-tighter">QIROX <span className="text-white">TEAM</span></h1>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">إدارة العمليات والإنتاج</p>
          </div>
          <nav className="space-y-2">
            {[
              { label: "لوحة التحكم", icon: LayoutDashboard, href: "/employee", active: true },
              { label: "المشاريع المسندة", icon: Briefcase, href: "#" },
              { label: "المحادثات", icon: MessageSquare, href: "#" },
              { label: "التقارير", icon: Activity, href: "#" }
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-bold">{item.label}</span>
              </div>
            ))}
          </nav>
          <div className="absolute bottom-10 left-6 right-6">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800 h-14 rounded-2xl" onClick={logout}>
              <LogOut className="w-5 h-5" />
              <span className="font-bold">تسجيل الخروج</span>
            </Button>
          </div>
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
            <div className="lg:col-span-2 space-y-8">
              {pendingApproval.length > 0 && (
                <Card className="border-2 border-amber-200 shadow-sm bg-amber-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-700">
                      <Clock className="w-5 h-5" />
                      مشاريع تنتظر الموافقة ({pendingApproval.length})
                    </CardTitle>
                    <CardDescription>هذه المشاريع تحتاج إلى مراجعة واعتماد لبدء العمل</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-amber-100">
                      {pendingApproval.map((p) => (
                        <div key={p.id} className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                              <p className="text-sm text-slate-500">{p.type}</p>
                              {p.crUrl && <a href={p.crUrl} target="_blank" className="text-xs text-primary underline block mt-1">عرض السجل التجاري</a>}
                              {p.ibanUrl && <a href={p.ibanUrl} target="_blank" className="text-xs text-primary underline block">عرض شهادة الآيبان</a>}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="default" 
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => approveMutation.mutate({ projectId: p.id, status: "yes" })}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                اعتماد
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => approveMutation.mutate({ projectId: p.id, status: "rejected" })}
                              >
                                رفض
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>قائمة المشاريع النشطة</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {activeProjects.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground">لا توجد مشاريع نشطة حالياً</div>
                    ) : (
                      activeProjects.map((p) => (
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
                          <div className="flex items-center gap-4">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full">
                              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${p.progress}%` }} />
                            </div>
                            <span className="text-sm font-medium">{p.progress}%</span>
                          </div>
                        </div>
                      ))
                    )}
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
