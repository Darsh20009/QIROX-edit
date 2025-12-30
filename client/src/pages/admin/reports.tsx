import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Download, FileText } from "lucide-react";

const reports = [
  { id: 1, name: "تقرير المبيعات الشهري", date: "2024-12-30", size: "2.4 MB", status: "جاهز" },
  { id: 2, name: "تقرير المستخدمين النشطين", date: "2024-12-29", size: "1.8 MB", status: "جاهز" },
  { id: 3, name: "تقرير الأداء والنمو", date: "2024-12-28", size: "3.2 MB", status: "جاهز" },
  { id: 4, name: "تقرير الشكاوى والمراجعات", date: "2024-12-27", size: "1.2 MB", status: "جاهز" },
  { id: 5, name: "تقرير المخزون", date: "2024-12-26", size: "2.1 MB", status: "جاهز" },
];

export default function AdminReports() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">التقارير</h1>
              <p className="text-muted-foreground">عرض وتحميل التقارير الدورية</p>
            </div>
            <Button data-testid="button-generate-report">
              <FileText className="w-4 h-4 mr-2" />
              إنشاء تقرير جديد
            </Button>
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id} data-testid={`card-report-${report.id}`}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {report.date} • {report.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-green-600 font-medium">{report.status}</span>
                    <Button variant="outline" size="sm" data-testid={`button-download-report-${report.id}`}>
                      <Download className="w-4 h-4 mr-2" />
                      تحميل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
