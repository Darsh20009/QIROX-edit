import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { SiWhatsapp } from "react-icons/si";

export function ProjectOnboarding() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const form = useForm({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      name: "",
      type: "ecommerce",
      description: "",
      requirements: "",
      referenceUrls: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      await apiRequest("POST", "/api/projects", data);
      toast({ title: "تم إرسال الطلب بنجاح", description: "سيتواصل معك فريقنا قريباً" });
      setLocation("/agency/dashboard");
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في إرسال الطلب", variant: "destructive" });
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl" dir="rtl">
      <Card className="border-2">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">ابدأ رحلتك الرقمية</CardTitle>
          <CardDescription className="text-lg">حوّل رؤيتك إلى واقع احترافي مع فريقنا المبدع</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المشروع / المنشأة</FormLabel>
                    <FormControl><Input placeholder="مثال: متجر عبق للقهوة" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع الحل الرقمي</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="اختر نوع المشروع" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ecommerce">متجر إلكتروني (سلة، زد، خاص)</SelectItem>
                        <SelectItem value="corporate">موقع شركة تعريفي</SelectItem>
                        <SelectItem value="saas">منصة برمجية (SaaS)</SelectItem>
                        <SelectItem value="app">تطبيق جوال</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم البراند / الهوية البصرية</FormLabel>
                    <FormControl><Input placeholder="أدخل اسم البراند المعتمد" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شرح فكرة الموقع وصفحاته</FormLabel>
                    <FormControl><Textarea placeholder="اشرح لنا بالتفصيل ماذا تريد في كل صفحة..." className="min-h-[120px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referenceUrls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مواقع ملهمة (روابط)</FormLabel>
                    <FormControl><Input placeholder="أدخل الروابط هنا تفصلها فاصلة" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" size="lg">تأكيد وإرسال الطلب</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open("https://wa.me/966532441566", "_blank")}
                  className="gap-2"
                >
                  <SiWhatsapp className="w-5 h-5 text-green-600" />
                  دعم واتساب
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
