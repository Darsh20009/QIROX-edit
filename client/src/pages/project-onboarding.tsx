import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function ProjectOnboarding() {
  return (
    <div className="container mx-auto py-10" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">ابدأ مشروعك الاحترافي</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-8">نحن هنا لتحويل فكرتك إلى واقع. املأ البيانات التالية لنبدأ فوراً.</p>
          {/* Form placeholder */}
          <div className="flex justify-center">
            <Button size="lg" className="w-full max-w-md">إرسال المتطلبات</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
