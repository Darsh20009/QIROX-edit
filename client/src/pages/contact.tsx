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
import { Mail, Clock, CheckCircle2, Loader2, Phone } from "lucide-react";
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
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            تحدث معنا
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            أخبرنا عن مشروعك. سنقوم بالرد خلال 24 ساعة بمقترحاتنا والخطوات التالية.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Card>
                <CardContent className="p-8 text-right">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">شكراً لتواصلك معنا!</h3>
                      <p className="text-muted-foreground">لقد استلمنا رسالتك وسنعاود الاتصال بك قريباً.</p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>الاسم</FormLabel>
                                <FormControl>
                                  <Input placeholder="اسمك الكريم" {...field} className="text-right" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>البريد الإلكتروني</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="you@example.com" {...field} className="text-left" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending}>
                          {mutation.isPending ? "جاري الإرسال..." : "إرسال الرسالة"}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <Card>
                <CardContent className="p-6 text-right">
                  <div className="flex items-start gap-4 justify-end">
                    <div>
                      <h3 className="font-medium text-foreground">راسلنا مباشرة</h3>
                      <p className="text-sm text-muted-foreground mt-1">hello@qirox.com</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
