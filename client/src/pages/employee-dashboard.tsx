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

        <main className="flex-1 p-8 bg-slate-50/50">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">لوحة العمليات</h1>
              <p className="text-slate-500 mt-2 font-medium">إدارة تدفق المشاريع وضمان الجودة</p>
            </div>
            <div className="flex gap-4">
              <Button className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5 ml-2" />
                مشروع جديد
              </Button>
              <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold bg-white" onClick={() => window.open("https://wa.me/966532441566")}>
                <MessageSquare className="w-5 h-5 ml-2 text-primary" />
                الدعم الفني
              </Button>
            </div>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {pendingApproval.length > 0 && (
                <Card className="border-0 shadow-2xl shadow-amber-500/10 bg-amber-50/50 rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="flex items-center gap-3 text-amber-700 text-2xl font-black">
                      <div className="p-2 bg-amber-500/20 rounded-xl">
                        <Clock className="w-6 h-6" />
                      </div>
                      طلبات الاعتماد ({pendingApproval.length})
                    </CardTitle>
                    <CardDescription className="text-amber-600/80 font-bold">مراجعة بيانات العميل والموافقة المبدئية</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-4">
                      {pendingApproval.map((p) => (
                        <div key={p.id} className="p-6 bg-white rounded-[2rem] shadow-sm border border-amber-100/50 flex flex-col md:flex-row justify-between items-center gap-6">
                          <div className="flex items-center gap-4 text-center md:text-right">
                            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-black text-2xl">
                              {p.name[0]}
                            </div>
                            <div>
                              <h3 className="text-xl font-black text-slate-900">{p.name}</h3>
                              <p className="text-sm text-slate-500 font-bold">{p.type}</p>
                              <div className="flex gap-3 mt-2">
                                {p.crUrl && <Badge variant="outline" className="text-[10px] cursor-pointer" onClick={() => window.open(p.crUrl)}>السجل التجاري</Badge>}
                                {p.ibanUrl && <Badge variant="outline" className="text-[10px] cursor-pointer" onClick={() => window.open(p.ibanUrl)}>الآيبان</Badge>}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 w-full md:w-auto">
                            <Button 
                              className="flex-1 md:flex-none rounded-xl h-12 px-8 bg-emerald-600 hover:bg-emerald-700 font-black"
                              onClick={() => approveMutation.mutate({ projectId: p.id, status: "yes" })}
                            >
                              <CheckCircle2 className="w-5 h-5 ml-2" />
                              اعتماد المشروع
                            </Button>
                            <Button 
                              variant="ghost"
                              className="flex-1 md:flex-none rounded-xl h-12 px-6 text-red-500 hover:bg-red-50 font-bold"
                              onClick={() => approveMutation.mutate({ projectId: p.id, status: "rejected" })}
                            >
                              رفض
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-0 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] bg-white overflow-hidden">
                <CardHeader className="p-8">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-black">المشاريع القائمة</CardTitle>
                    <Badge variant="secondary" className="rounded-full px-4 py-1">{activeProjects.length} مشروع</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    {activeProjects.length === 0 ? (
                      <div className="p-20 text-center text-slate-400 font-bold">لا توجد مشاريع نشطة حالياً</div>
                    ) : (
                      activeProjects.map((p) => (
                        <div key={p.id} className="p-6 rounded-[2rem] border border-slate-100 hover:bg-slate-50 transition-all group">
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Briefcase className="w-7 h-7" />
                              </div>
                              <div>
                                <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{p.name}</h3>
                                <p className="text-sm text-slate-500 font-bold">{p.type}</p>
                              </div>
                            </div>
                            <div className="text-left">
                              <Badge className="bg-emerald-500 text-white border-none rounded-full px-4 font-bold">
                                {p.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                              <span>نسبة الإنجاز</span>
                              <span className="text-primary">{p.progress}%</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${p.progress}%` }}
                                className="h-full bg-primary rounded-full relative shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                              </motion.div>
                            </div>
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
