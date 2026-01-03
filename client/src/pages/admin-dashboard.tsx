import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Loader2,
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Plus,
  MessageSquare,
  LayoutDashboard,
  LogOut,
  Clock,
  ShieldCheck,
  CreditCard
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  projectName?: string;
  assignedEmployeeId?: string;
}

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

  const { data: staff } = useQuery<User[]>({
    queryKey: ["/api/admin/staff"],
    enabled: !!user && (user.role === "admin" || user.role === "system_admin"),
  });

  const { data: projects } = useQuery<any[]>({
    queryKey: ["/api/projects"],
    enabled: !!user && (user.role === "admin" || user.role === "system_admin"),
  });

  const { data: invoices } = useQuery<any[]>({
    queryKey: ["/api/invoices"],
    enabled: !!user && (user.role === "admin" || user.role === "system_admin"),
  });

  const { data: statsData } = useQuery<any>({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
  });

  const assignManagerMutation = useMutation({
    mutationFn: async ({ projectId, employeeId }: { projectId: string, employeeId: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/projects/${projectId}/assign`, { employeeId });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "تم التعيين", description: "تم تعيين مدير للمشروع بنجاح" });
    },
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
    { title: "المشاريع النشطة", value: statsData?.activeProjects || 0, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "طلبات معلقة", value: statsData?.pendingApprovals || 0, icon: ShieldCheck, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "فواتير غير مدفوعة", value: statsData?.unpaidInvoices || 0, icon: CreditCard, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir="rtl">
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

        <main className="flex-1 p-4 md:p-8">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">مركز التحكم الإداري</h1>
              <p className="text-slate-500 mt-1">مرحباً بك مجدداً، {user?.name}</p>
            </div>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none gap-2" onClick={() => window.open("https://wa.me/966532441566")}>
                <MessageSquare className="w-4 h-4" />
                الدعم
              </Button>
              <Button asChild className="flex-1 sm:flex-none gap-2">
                <Link href="/agency/onboarding">
                  <Plus className="w-4 h-4" />
                  مشروع جديد
                </Link>
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
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
                <CardContent className="p-0 overflow-x-auto no-scrollbar">
                  <div className="divide-y min-w-[600px] sm:min-w-0">
                    {projects?.slice(0, 5).map((p: any) => (
                      <div key={p.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                            {p.name?.[0] || 'P'}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{p.name}</p>
                            <p className="text-xs text-slate-500">{p.type}</p>
                            <div className="flex gap-2 mt-1">
                              {p.crUrl && <Badge variant="outline" className="text-[10px] h-4">CR</Badge>}
                              {p.ibanUrl && <Badge variant="outline" className="text-[10px] h-4">IBAN</Badge>}
                            </div>
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
                          <div className="flex items-center gap-4">
                            <select 
                              className="bg-background border rounded px-2 py-1 text-sm h-8"
                              value={p.assignedEmployeeId || ""}
                              onChange={(e) => assignManagerMutation.mutate({ projectId: p.id, employeeId: e.target.value })}
                            >
                              <option value="">تعيين مدير...</option>
                              {staff?.map((s: any) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                              ))}
                            </select>
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">
                              {p.status === "pending" ? "قيد المراجعة" : p.status}
                            </Badge>
                          </div>
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
                  {invoices?.slice(0, 4).map((inv: any) => (
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
