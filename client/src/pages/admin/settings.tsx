import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">الإعدادات</h1>
            <p className="text-muted-foreground mb-8">إدارة إعدادات النظام العامة</p>
          </div>

          <div className="space-y-8 max-w-2xl">
            {/* Site Settings */}
            <Card data-testid="card-site-settings">
              <CardHeader>
                <CardTitle>إعدادات الموقع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-name">اسم الموقع</Label>
                  <Input 
                    id="site-name" 
                    defaultValue="منصة قيروكس" 
                    data-testid="input-site-name"
                  />
                </div>
                <div>
                  <Label htmlFor="site-url">رابط الموقع</Label>
                  <Input 
                    id="site-url" 
                    defaultValue="https://qirox.com" 
                    data-testid="input-site-url"
                  />
                </div>
                <div>
                  <Label htmlFor="support-email">بريد الدعم</Label>
                  <Input 
                    id="support-email" 
                    defaultValue="support@qirox.com" 
                    data-testid="input-support-email"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card data-testid="card-email-settings">
              <CardHeader>
                <CardTitle>إعدادات البريد الإلكتروني</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input 
                    id="smtp-host" 
                    defaultValue="smtp.gmail.com" 
                    data-testid="input-smtp-host"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input 
                    id="smtp-port" 
                    defaultValue="587" 
                    data-testid="input-smtp-port"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-email">بريد SMTP</Label>
                  <Input 
                    id="smtp-email" 
                    defaultValue="noreply@qirox.com" 
                    data-testid="input-smtp-email"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card data-testid="card-features">
              <CardHeader>
                <CardTitle>الميزات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>تفعيل التسجيل الجديد</Label>
                  <Toggle defaultPressed data-testid="toggle-registration" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>تفعيل الاشتراكات</Label>
                  <Toggle defaultPressed data-testid="toggle-subscriptions" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>تفعيل المتاجر</Label>
                  <Toggle defaultPressed data-testid="toggle-stores" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>وضع الصيانة</Label>
                  <Toggle data-testid="toggle-maintenance" />
                </div>
              </CardContent>
            </Card>

            {/* System */}
            <Card data-testid="card-system">
              <CardHeader>
                <CardTitle>النظام</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">إصدار النظام</p>
                  <p className="font-medium">v2.1.0</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">آخر تحديث</p>
                  <p className="font-medium">2024-12-25</p>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <Button className="w-full" variant="outline" data-testid="button-backup">
                    النسخ الاحتياطي
                  </Button>
                  <Button className="w-full" variant="destructive" data-testid="button-clear-cache">
                    مسح الذاكرة المؤقتة
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" data-testid="button-save-settings">
              <Save className="w-4 h-4 mr-2" />
              حفظ التغييرات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
