import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Share2, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSocialPage() {
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
        <h1 className="text-3xl font-bold mb-8 text-right">التواصل الاجتماعي</h1>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <span>روابط الحسابات</span>
                <Share2 className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 justify-end">
                  <span>فيسبوك</span>
                  <Facebook className="h-4 w-4" />
                </Label>
                <Input defaultValue="https://facebook.com/qirox" className="text-left" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 justify-end">
                  <span>تويتر / X</span>
                  <Twitter className="h-4 w-4" />
                </Label>
                <Input defaultValue="https://twitter.com/qirox" className="text-left" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 justify-end">
                  <span>إنستغرام</span>
                  <Instagram className="h-4 w-4" />
                </Label>
                <Input defaultValue="https://instagram.com/qirox" className="text-left" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 justify-end">
                  <span>لينكد إن</span>
                  <Linkedin className="h-4 w-4" />
                </Label>
                <Input defaultValue="https://linkedin.com/company/qirox" className="text-left" />
              </div>
              <Button className="w-full mt-4">حفظ الروابط</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
