import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/layout";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, Mail, Lock, User, Phone, ArrowLeft, 
  CheckCircle2, Briefcase, FileText, Lightbulb, 
  ChevronRight, ChevronLeft, Upload, Check
} from "lucide-react";

const benefits = [
  "دعم فني متواصل",
  "لوحة تحكم احترافية",
  "متابعة يومية للمشروع",
  "تجهيز الدومين والاستضافة",
];

const steps = [
  { id: 1, title: "الحساب", icon: User },
  { id: 2, title: "المشروع", icon: Briefcase },
  { id: 3, title: "المستندات", icon: FileText },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    projectName: "",
    projectIdea: "",
    commercialRegister: null as File | null,
    ibanCertificate: null as File | null,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'commercialRegister' | 'ibanCertificate') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const metadataObj = {
        projectName: formData.projectName,
        projectIdea: formData.projectIdea,
        hasFiles: !!(formData.commercialRegister || formData.ibanCertificate)
      };

      await register({
        email: formData.email, 
        password: formData.password, 
        name: formData.name, 
        phone: formData.phone,
        projectName: formData.projectName,
        projectIdea: formData.projectIdea,
        role: "visitor",
        tenantId: "default",
        metadata: JSON.stringify(metadataObj)
      });

      toast({
        title: "مرحباً بك في QIROX!",
        description: "تم إنشاء حسابك بنجاح وجاري مراجعة بيانات مشروعك.",
      });
      
      setLocation("/agency/dashboard");
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في إنشاء الحساب",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
        <div className="w-full max-w-2xl relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700" />

          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary animate-bounce">
              ابدأ رحلة النجاح الآن
            </Badge>
            <h1 className="text-4xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50">
              انضم إلى عائلة QIROX
            </h1>
            <p className="text-muted-foreground text-lg">
              خطوات بسيطة تفصلك عن تحويل فكرتك إلى واقع ملموس
            </p>
          </div>

          <div className="flex justify-between mb-12 relative px-10">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500 z-0" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            {steps.map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                    step >= s.id ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110' : 'bg-background border-muted text-muted-foreground'
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <span className={`mt-2 text-xs font-bold transition-colors ${step >= s.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>

          <Card className="border-0 bg-background/40 backdrop-blur-xl shadow-2xl overflow-hidden rounded-3xl border border-white/10">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold mr-1">الاسم الكامل</Label>
                        <div className="relative group">
                          <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="name"
                            placeholder="أحمد محمد"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pr-11 h-12 rounded-xl bg-background/50 border-white/10 focus:border-primary/50 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold mr-1">رقم الواتساب (إجباري)</Label>
                        <div className="relative group">
                          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="phone"
                            placeholder="05xxxxxxxx"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pr-11 h-12 rounded-xl bg-background/50 border-white/10 focus:border-primary/50"
                            required
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold mr-1">البريد الإلكتروني</Label>
                      <div className="relative group">
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pr-11 h-12 rounded-xl bg-background/50 border-white/10 focus:border-primary/50"
                          required
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold mr-1">كلمة المرور</Label>
                        <div className="relative group">
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pr-11 h-12 rounded-xl bg-background/50 border-white/10 focus:border-primary/50"
                            required
                            minLength={6}
                            dir="ltr"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold mr-1">تأكيد كلمة المرور</Label>
                        <div className="relative group">
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="pr-11 h-12 rounded-xl bg-background/50 border-white/10 focus:border-primary/50"
                            required
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold mr-1">اسم المشروع</Label>
                      <div className="relative group">
                        <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="projectName"
                          placeholder="مثلاً: متجر كيو روكس"
                          value={formData.projectName}
                          onChange={handleInputChange}
                          className="pr-11 h-12 rounded-xl bg-background/50 border-white/10 focus:border-primary/50"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold mr-1">اشرح لنا فكرة مشروعك</Label>
                      <div className="relative group">
                        <Lightbulb className="absolute right-3 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <textarea
                          id="projectIdea"
                          placeholder="اكتب هنا ما يدور في ذهنك..."
                          value={formData.projectIdea}
                          onChange={(e) => setFormData(prev => ({ ...prev, projectIdea: e.target.value }))}
                          className="w-full min-h-[150px] pr-11 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary/50 focus:ring-0 resize-none transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="grid gap-6">
                      <div className="space-y-4">
                        <Label className="text-sm font-bold block mb-2">السجل التجاري (إن وجد)</Label>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 hover:border-primary/30 transition-all group">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className={`h-8 w-8 mb-2 ${formData.commercialRegister ? 'text-green-500' : 'text-muted-foreground group-hover:text-primary'}`} />
                            <p className="text-sm text-muted-foreground">
                              {formData.commercialRegister ? formData.commercialRegister.name : "اضغط لرفع الملف"}
                            </p>
                          </div>
                          <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'commercialRegister')} />
                        </label>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-sm font-bold block mb-2">شهادة الآيبان (IBAN)</Label>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 hover:border-primary/30 transition-all group">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className={`h-8 w-8 mb-2 ${formData.ibanCertificate ? 'text-green-500' : 'text-muted-foreground group-hover:text-primary'}`} />
                            <p className="text-sm text-muted-foreground">
                              {formData.ibanCertificate ? formData.ibanCertificate.name : "اضغط لرفع الملف"}
                            </p>
                          </div>
                          <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'ibanCertificate')} />
                        </label>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        بمجرد إنشاء الحساب، سيتم تعيين مسؤول خاص لمشروعك لمتابعة كافة التفاصيل والتواصل معك عبر الواتساب لتنفيذ الخطة.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  {step > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1 h-14 rounded-2xl font-bold border-white/10 hover:bg-white/5"
                      onClick={prevStep}
                    >
                      <ChevronRight className="ml-2 h-5 w-5" />
                      السابق
                    </Button>
                  )}
                  
                  {step < 3 ? (
                    <Button 
                      type="button" 
                      className="flex-[2] h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
                      onClick={nextStep}
                    >
                      التالي
                      <ChevronLeft className="mr-2 h-5 w-5" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="flex-[2] h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/30"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                          جاري التنفيذ...
                        </>
                      ) : (
                        <>
                          إطلاق مشروعي الآن
                          <Check className="mr-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}