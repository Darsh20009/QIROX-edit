import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layout } from "@/components/layout/layout";
import { useToast } from "@/hooks/use-toast";
import { Mail, Clock, CheckCircle2, Loader2, Phone, Twitter, Instagram, Linkedin } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  company: z.string().optional(),
  projectType: z.string().min(1, "يرجى اختيار نوع المشروع"),
  budget: z.string().optional(),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const projectTypes = [
  { value: "company", label: "موقع شركة" },
  { value: "platform", label: "منصة / SaaS" },
  { value: "system", label: "نظام أعمال" },
  { value: "store", label: "متجر إلكتروني" },
  { value: "custom", label: "بناء مخصص" },
  { value: "other", label: "أخرى" },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "تم إرسال الرسالة!",
        description: "سنقوم بالرد عليك خلال 24 ساعة.",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Layout>
      <section className="py-24 md:py-32 bg-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight">
            دعنا نبدأ <span className="text-primary text-glow">قصة نجاحك</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            فريقنا من الخبراء جاهز لتحويل رؤيتك إلى واقع رقمي مبهر. تواصل معنا اليوم لنقاش مشروعك.
          </p>
        </div>
      </section>

      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Card className="border-none bg-background shadow-2xl rounded-[3rem] overflow-hidden">
                <CardContent className="p-10 md:p-16 text-right">
                  {submitted ? (
                    <div className="text-center py-24 animate-in fade-in zoom-in duration-500">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 mb-10 shadow-inner">
                        <CheckCircle2 className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-4xl font-black mb-6">تم استلام طلبك بنجاح!</h3>
                      <p className="text-xl text-muted-foreground font-medium">سيتواصل معك أحد مستشارينا التقنيين خلال الـ 24 ساعة القادمة.</p>
                      <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-12 h-14 px-8 rounded-2xl font-black border-2">إرسال رسالة أخرى</Button>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                        <div className="grid sm:grid-cols-2 gap-10">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <FormLabel className="text-lg font-black">الاسم الكامل</FormLabel>
                                <FormControl>
                                  <Input placeholder="أدخل اسمك هنا" {...field} className="h-16 px-6 rounded-2xl bg-secondary/50 border-none focus-visible:ring-primary text-right font-medium text-lg" data-testid="input-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <FormLabel className="text-lg font-black">البريد الإلكتروني</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="email@example.com" {...field} className="h-16 px-6 rounded-2xl bg-secondary/50 border-none focus-visible:ring-primary text-left font-medium text-lg" data-testid="input-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-10">
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <FormLabel className="text-lg font-black">الشركة (اختياري)</FormLabel>
                                <FormControl>
                                  <Input placeholder="اسم شركتك أو مشروعك" {...field} className="h-16 px-6 rounded-2xl bg-secondary/50 border-none focus-visible:ring-primary text-right font-medium text-lg" data-testid="input-company" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="projectType"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <FormLabel className="text-lg font-black">نوع المشروع</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-16 px-6 rounded-2xl bg-secondary/50 border-none focus:ring-primary text-right font-medium text-lg" data-testid="select-project-type">
                                      <SelectValue placeholder="اختر نوع الخدمة" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="rounded-2xl border-border/40">
                                    {projectTypes.map((type) => (
                                      <SelectItem key={type.value} value={type.value} className="text-right p-3 font-bold">{type.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-lg font-black">تفاصيل المشروع</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="اشرح لنا فكرتك أو المتطلبات الأساسية لمشروعك..." 
                                  className="min-h-[200px] p-6 rounded-[2rem] bg-secondary/50 border-none focus-visible:ring-primary text-right font-medium text-lg resize-none" 
                                  {...field} 
                                  data-testid="textarea-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" size="lg" className="w-full h-20 text-2xl font-black rounded-[2rem] shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02]" disabled={mutation.isPending} data-testid="button-submit">
                          {mutation.isPending ? (
                            <div className="flex items-center gap-3 justify-center">
                              <Loader2 className="w-8 h-8 animate-spin" />
                              جاري الإرسال...
                            </div>
                          ) : "أرسل الطلب الآن"}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-10 order-1 lg:order-2">
              <div className="space-y-10">
                <h3 className="text-3xl font-black mb-10 text-right">معلومات التواصل</h3>
                {[
                  { icon: Mail, title: "البريد الإلكتروني", desc: "hello@qirox.com", color: "text-blue-500" },
                  { icon: Phone, title: "واتساب / هاتف", desc: "+966 500 000 000", color: "text-emerald-500" },
                  { icon: Clock, title: "ساعات العمل", desc: "الأحد - الخميس: 9ص - 6م", color: "text-amber-500" }
                ].map((item, i) => (
                  <Card key={i} className="border-none bg-background shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-all group">
                    <CardContent className="p-8 text-right flex items-center gap-6 justify-end">
                      <div className="flex-1">
                        <h4 className="font-black text-lg mb-1">{item.title}</h4>
                        <p className="text-muted-foreground font-medium">{item.desc}</p>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center ${item.color} group-hover:bg-primary group-hover:text-white transition-all`}>
                        <item.icon className="w-7 h-7" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-none bg-primary p-10 rounded-[2.5rem] shadow-2xl shadow-primary/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                <div className="relative z-10 text-white text-right">
                  <h4 className="text-2xl font-black mb-4">انضم إلى مجتمعنا</h4>
                  <p className="text-white/80 font-medium mb-8 leading-relaxed">تابعنا على وسائل التواصل الاجتماعي لتبقى على اطلاع بآخر التحديثات والخدمات.</p>
                  <div className="flex gap-4 justify-end">
                    {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                      <Button key={i} size="icon" variant="ghost" className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white text-white hover:text-primary border-none">
                        <Icon className="w-6 h-6" />
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
