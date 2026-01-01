import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Project, TaxInvoice, Meeting } from "@shared/schema";
import { FileText, Calendar, ExternalLink, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export function ClientDashboard() {
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({ queryKey: ["/api/projects"] });
  const { data: invoices } = useQuery<TaxInvoice[]>({ queryKey: ["/api/invoices"] });
  const { data: meetings } = useQuery<Meeting[]>({ queryKey: ["/api/meetings"] });

  if (projectsLoading) return <div className="p-10 text-center">جاري تحميل البيانات...</div>;

  return (
    <div className="container mx-auto py-10 px-4" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">مركز إدارة المشاريع</h1>
        <Button onClick={() => window.open("https://wa.me/966532441566", "_blank")} variant="outline" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          تواصل مع المبرمج
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-2 h-6 bg-primary rounded-full" />
            المشاريع القائمة
          </h2>
          {projects?.map((project) => (
            <Card key={project.id} className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="bg-muted/30">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">النوع: {project.type}</p>
                  </div>
                    <Badge variant="outline" className="bg-background text-primary border-primary/20">{project.status === "pending" ? "قيد المراجعة" : project.status === "design" ? "مرحلة التصميم" : project.status === "development" ? "مرحلة البرمجة" : project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>مرحلة التنفيذ</span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>
                    <Progress value={Number(project.progress)} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-xs text-muted-foreground">تاريخ البدء</p>
                      <p className="text-sm font-medium">{format(new Date(project.createdAt), "PPP", { locale: ar })}</p>
                    </div>
                    {project.storeUrl && (
                      <Button variant="outline" size="sm" className="w-full mt-auto" asChild>
                        <a href={project.storeUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 ml-2" />
                          رابط المعاينة
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {!projects?.length && (
            <div className="text-center py-20 bg-muted/20 rounded-xl border-2 border-dashed">
              <p className="text-muted-foreground">لا توجد مشاريع قائمة حالياً</p>
              <Button variant="ghost" asChild className="p-0 h-auto text-primary font-bold"><a href="/agency/onboarding">ابدأ مشروعك الأول الآن</a></Button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              الفواتير الضريبية
            </h2>
            <div className="space-y-3">
              {invoices?.map((inv) => (
                <Card key={inv.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm">#{inv.invoiceNumber}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(inv.createdAt), "PP", { locale: ar })}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-primary">{inv.totalAmount} ر.س</p>
                    <Badge className={inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                      {inv.status === "paid" ? "مدفوعة" : "بانتظار الدفع"}
                    </Badge>
                  </div>
                </Card>
              ))}
              {!invoices?.length && <p className="text-sm text-muted-foreground text-center">لا توجد فواتير صادرة</p>}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              الاجتماعات المجدولة
            </h2>
            <div className="space-y-3">
              {meetings?.map((meeting) => (
                <Card key={meeting.id} className="p-4 space-y-2">
                  <p className="font-medium text-sm">{meeting.title}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(meeting.scheduledAt), "PPP p", { locale: ar })}</p>
                  {meeting.link && (
                    <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                      <a href={`https://meet.qirox.com/${meeting.id}`} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="w-4 h-4 ml-2" />
                        QIROX Meet (ZEGO)
                      </a>
                    </Button>
                  )}
                </Card>
              ))}
              {!meetings?.length && (
                <div className="text-center p-4 border rounded-lg bg-muted/10">
                  <p className="text-xs text-muted-foreground mb-3">هل تود مناقشة تفاصيل مشروعك؟</p>
                  <Button size="sm" variant="outline">طلب اجتماع</Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
