import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function ClientDashboard() {
  return (
    <div className="container mx-auto py-10" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">لوحة تحكم مشاريعي</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>مشروع المتجر الإلكتروني</CardTitle>
            <Badge>قيد التنفيذ</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">نسبة الإنجاز</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">الفواتير</p>
                  <p className="text-xl font-bold">12,500 ر.س</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">المدفوع</p>
                  <p className="text-xl font-bold text-green-600">5,000 ر.س</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
