import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { CreditCard, Wallet, Receipt } from "lucide-react";

export default function AdminFinancialsPage() {
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
        <h1 className="text-3xl font-bold mb-8">الإدارة المالية</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2M ر.س</div>
              <p className="text-xs text-muted-foreground">+15% من الشهر الماضي</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">صافي الأرباح</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">450K ر.س</div>
              <p className="text-xs text-muted-foreground">+5% زيادة سنوية</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">المدفوعات المعلقة</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25K ر.س</div>
              <p className="text-xs text-muted-foreground">تتطلب المراجعة</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>سجل العمليات المالية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "INV-001", customer: "مؤسسة الحلول الذكية", amount: "4,500 ر.س", status: "مدفوع", date: "2024-01-01" },
                  { id: "INV-002", customer: "شركة الإمداد", amount: "12,200 ر.س", status: "معلق", date: "2024-01-02" },
                  { id: "INV-003", customer: "متجر الرواد", amount: "3,150 ر.س", status: "مدفوع", date: "2024-01-03" }
                ].map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center pb-3 border-b last:border-0 hover:bg-muted/30 p-2 rounded-lg transition-colors">
                    <div>
                      <p className="font-bold text-sm">{inv.id}</p>
                      <p className="text-xs text-muted-foreground">{inv.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-primary text-sm">{inv.amount}</p>
                      <p className={`text-[10px] font-bold ${inv.status === "مدفوع" ? "text-green-500" : "text-amber-500"}`}>{inv.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>توزيع المصروفات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { category: "السيرفرات", amount: "1,200 ر.س", percentage: "30%" },
                  { category: "التسويق", amount: "2,500 ر.س", percentage: "55%" },
                  { category: "الدعم الفني", amount: "800 ر.س", percentage: "15%" }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold">{item.category}</span>
                      <span className="text-muted-foreground">{item.amount} ({item.percentage})</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full" 
                        style={{ width: item.percentage }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
