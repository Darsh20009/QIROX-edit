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
  ArrowLeft, 
  Loader2,
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Plus,
  MessageSquare,
  LayoutDashboard,
  Settings,
  LogOut,
  Clock,
  ShieldCheck
} from "lucide-react";

export default function AdminDashboard() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
    if (!authLoading && user && user.role !== "admin" && user.role !== "system_admin") {
      setLocation("/agency/dashboard");
    }
  }, [user, authLoading, setLocation]);

  const { data: projects, isLoading: projectsLoading } = useQuery<any[]>({
    queryKey: ["/api/projects"],
    enabled: !!user && user.role === "admin",
  });

  const { data: invoices, isLoading: invoicesLoading } = useQuery<any[]>({
    queryKey: ["/api/invoices"],
    enabled: !!user && user.role === "admin",
  });

  const { data: users, isLoading: usersLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/users"],
    enabled: !!user && user.role === "admin",
  });

  const approveMutation = useMutation({
    mutationFn: async (projectId: string) => {
      return apiRequest("PATCH", `/api/projects/${projectId}/approve`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "تم الاعتماد", description: "تم تفعيل المشروع بنجاح (Approval Gate)" });
    }
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    { title: "إجمالي المشاريع", value: projects?.length || 0, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "الفواتير الضريبية", value: invoices?.length || 0, icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "النشاط المالي", value: `${invoices?.reduce((acc: any, inv: any) => acc + Number(inv.totalAmount), 0).toLocaleString() || 0} ر.س`, icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "فريق العمل", value: users?.filter((u: any) => u.role === "employee").length || 0, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir="rtl">
      {/* Sidebar - Integrated for Admin */}
      <div className="flex">
        <aside className="w-64 min-h-screen bg-white border-l shadow-sm hidden lg:block">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-primary">Qirox Admin</h1>
          </div>
          <nav className="p-4 space-y-2">
            <Link href="/admin">
              <div className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded-lg cursor-pointer">
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">لوحة التحكم</span>
              </div>
            </Link>
            <Link href="/agency/dashboard">
              <div className="flex items-center gap-3 p-3 text-muted-foreground hover:bg-muted rounded-lg cursor-pointer transition-colors">
                <Briefcase className="w-5 h-5" />
                <span>المشاريع</span>
              </div>
            </Link>
            <Link href="/admin/users">
              <div className="flex items-center gap-3 p-3 text-muted-foreground hover:bg-muted rounded-lg cursor-pointer transition-colors">
                <Users className="w-5 h-5" />
                <span>الموظفين</span>
              </div>
            </Link>
            <Link href="/admin/invoices">
              <div className="flex items-center gap-3 p-3 text-muted-foreground hover:bg-muted rounded-lg cursor-pointer transition-colors">
                <FileText className="w-5 h-5" />
                <span>الفواتير</span>
              </div>
            </Link>
            <Link href="/admin/audit-logs">
              <div className="flex items-center gap-3 p-3 text-muted-foreground hover:bg-muted rounded-lg cursor-pointer transition-colors">
                <Clock className="w-5 h-5" />
                <span>سجل الأحداث</span>
              </div>
            </Link>
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
              <h1 className="text-3xl font-bold text-slate-900">مركز التحكم الإداري</h1>
              <p className="text-slate-500 mt-1">مرحباً بك مجدداً، {user?.name}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2" onClick={() => window.open("https://wa.me/966532441566")}>
                <MessageSquare className="w-4 h-4" />
                الدعم الفني
              </Button>
              <Button asChild className="gap-2">
                <Link href="/agency/onboarding">
                  <Plus className="w-4 h-4" />
                  مشروع جديد
                </Link>
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm hover-elevate overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-sm h-full">
                <CardHeader className="border-b bg-white/50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">آخر المشاريع المطلوبة</CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary">عرض الكل</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {projects?.slice(0, 5).map((p) => (
                      <div key={p.id} className="p-4 hover:bg-slate-50 transition-colors flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                            {p.name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{p.name}</p>
                            <p className="text-xs text-slate-500">{p.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {p.isApproved === "no" && (
                            <Button 
                              size="sm" 
                              variant="default" 
                              className="bg-emerald-600 hover:bg-emerald-700"
                              onClick={() => approveMutation.mutate(p.id)}
                              disabled={approveMutation.isPending}
                            >
                              <ShieldCheck className="w-4 h-4 ml-1" />
                              اعتماد
                            </Button>
                          )}
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">
                            {p.status === "pending" ? "قيد المراجعة" : p.status}
                          </Badge>
                          <div className="text-left hidden sm:block">
                            <p className="text-sm font-medium">{p.progress}%</p>
                            <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${p.progress}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!projects?.length && (
                      <div className="p-8 text-center text-slate-400">
                        لا توجد طلبات مشاريع حالياً
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-none shadow-sm">
                <CardHeader className="border-b bg-white/50">
                  <CardTitle className="text-lg">الفواتير الأخيرة</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {invoices?.slice(0, 4).map((inv) => (
                    <div key={inv.id} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 hover:border-primary/20 transition-colors">
                      <div>
                        <p className="font-bold text-sm">#{inv.invoiceNumber}</p>
                        <p className="text-xs text-slate-500">{new Date(inv.createdAt).toLocaleDateString("ar-SA")}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-slate-900">{inv.totalAmount} ر.س</p>
                        <Badge className={inv.status === "paid" ? "bg-emerald-50 text-emerald-600 border-none" : "bg-orange-50 text-orange-600 border-none"}>
                          {inv.status === "paid" ? "مدفوعة" : "معلقة"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {!invoices?.length && (
                    <div className="py-8 text-center text-slate-400">
                      لا توجد فواتير صادرة
                    </div>
                  )}
                  <Button variant="outline" className="w-full mt-2">تحميل التقرير المالي</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
