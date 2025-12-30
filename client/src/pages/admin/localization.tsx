import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Globe, Languages, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLocalizationPage() {
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
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-right">الإعدادات الإقليمية واللغات</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>اللغات المفعلة</span>
                <Languages className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">أساسي</span>
                  <span className="font-medium">العربية (Arabic)</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <Button variant="ghost" size="sm" className="text-destructive">تعطيل</Button>
                <span className="font-medium">الإنجليزية (English)</span>
              </div>
              <Button className="w-full" variant="outline">إضافة لغة جديدة</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>إعدادات النطاق</span>
                <Globe className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>النطاق الرئيسي</Label>
                <div className="flex gap-2">
                  <Button variant="outline">تغيير</Button>
                  <Input defaultValue="qirox.com" readOnly className="text-left" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>شهادة SSL</Label>
                <div className="p-3 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 rounded-md text-sm text-center">
                  الشهادة نشطة وتنتهي في 2025-10-15
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>إعدادات المحتوى (SEO)</span>
                <Settings2 className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>العنوان الافتراضي (Title)</Label>
                  <Input defaultValue="قيروكس - الحل المتكامل للأعمال الرقمية" />
                </div>
                <div className="space-y-2">
                  <Label>الوصف الافتراضي (Meta Description)</Label>
                  <Input defaultValue="ابحث عن أفضل الحلول لمشروعك الرقمي مع قيروكس" />
                </div>
              </div>
              <Button className="w-full">حفظ إعدادات SEO</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
