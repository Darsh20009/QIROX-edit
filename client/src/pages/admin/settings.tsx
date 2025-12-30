import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, User, Settings2, Bell, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function AdminSettings() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8 text-right">
        <h1 className="text-3xl font-bold mb-8">إعدادات النظام</h1>

        <Tabs defaultValue="general" dir="rtl" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="general" className="gap-2">
              <Settings2 className="h-4 w-4" />
              الإعدادات العامة
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              الملف الشخصي
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              التنبيهات
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              الأمان
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات المنصة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اسم الموقع</Label>
                    <Input defaultValue="منصة قيروكس" />
                  </div>
                  <div className="space-y-2">
                    <Label>رابط الموقع</Label>
                    <Input defaultValue="https://qirox.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>الوصف التعريفي (SEO)</Label>
                  <Input defaultValue="أفضل منصة لإدارة المتاجر الإلكترونية في الوطن العربي" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>خيارات التشغيل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-2 border rounded-lg">
                  <Switch defaultChecked />
                  <Label>تفعيل التسجيل الجديد للعملاء</Label>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-lg">
                  <Switch defaultChecked />
                  <Label>وضع الصيانة النشط</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تعديل بياناتي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-w-xl">
                <div className="space-y-2">
                  <Label>الاسم الكامل</Label>
                  <Input defaultValue="مدير النظام" />
                </div>
                <div className="space-y-2">
                  <Label>البريد الإلكتروني</Label>
                  <Input defaultValue="admin@qirox.com" />
                </div>
                <Button className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  حفظ البيانات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
