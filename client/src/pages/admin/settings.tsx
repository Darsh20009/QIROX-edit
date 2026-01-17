import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>مفاتيح الربط (API Keys)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <Label className="text-[10px] tracking-widest uppercase opacity-40 mb-2 block">Google Cloud API Key</Label>
                    <div className="flex gap-2">
                      <Input type="password" value="********************************" readOnly className="bg-background" />
                      <Button variant="outline">تعديل</Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <Label className="text-[10px] tracking-widest uppercase opacity-40 mb-2 block">GitHub OAuth Secret</Label>
                    <div className="flex gap-2">
                      <Input type="password" value="********************************" readOnly className="bg-background" />
                      <Button variant="outline">تعديل</Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <Label className="text-[10px] tracking-widest uppercase opacity-40 mb-2 block">QIROX Internal System Key</Label>
                    <div className="flex gap-2">
                      <Input value="qx_7f2a1b9c3d4e5f6g7h8i9j0k" readOnly className="bg-background" />
                      <Button variant="outline">نسخ</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>حماية الحساب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-xl bg-muted/20">
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <div className="text-right">
                      <p className="font-bold text-sm">المصادقة الثنائية (2FA)</p>
                      <p className="text-xs text-muted-foreground">إضافة طبقة حماية إضافية لحسابك</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2 text-right">
                  <Label>تغيير كلمة المرور</Label>
                  <Input type="password" placeholder="كلمة المرور الحالية" />
                  <Input type="password" placeholder="كلمة المرور الجديدة" />
                  <Button variant="outline" className="w-full">تحديث كلمة المرور</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الأجهزة المسجلة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { device: "MacBook Pro", location: "الرياض، السعودية", status: "نشط حالياً", current: true },
                    { device: "iPhone 15", location: "جدة، السعودية", status: "نشط منذ ساعتين", current: false }
                  ].map((device, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-xl flex-row-reverse">
                      <div className="text-right">
                        <p className="font-bold text-sm">{device.device} {device.current && <Badge className="text-[8px] h-4 px-1">هذا الجهاز</Badge>}</p>
                        <p className="text-xs text-muted-foreground">{device.location} • {device.status}</p>
                      </div>
                      {!device.current && <Button variant="ghost" size="sm" className="text-destructive">إلغاء الارتباط</Button>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
