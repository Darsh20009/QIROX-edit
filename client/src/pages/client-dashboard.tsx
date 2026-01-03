import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Clock, FileText, Globe, 
  MessageSquare, User, Activity, Calendar,
  ArrowUpRight, Download, ExternalLink, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ClientDashboard() {
  const { user } = useAuth();
  
  const { data: updates } = useQuery<any[]>({
    queryKey: ["/api/daily-updates"],
    enabled: !!user,
  });

  const stages = [
    { name: "التخطيط والتحليل", status: "completed", progress: 100 },
    { name: "هوية المشروع واللوجو", status: "current", progress: 65 },
    { name: "تطوير النظام البرمي", status: "pending", progress: 0 },
    { name: "الاختبار والتحسين", status: "pending", progress: 0 },
    { name: "الإطلاق النهائي", status: "pending", progress: 0 },
  ];

  const userData = user as any;

  return (
    <Layout>
      <div className="min-h-screen p-4 md:p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <div>
              <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-500 to-teal-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                أهلاً بك، {user?.username}
              </h1>
              <p className="text-muted-foreground mt-1 font-medium">مرحباً بك في لوحة تحكم مشروعك: <span className="text-primary font-bold">{userData?.projectName || "قيد المراجعة"}</span></p>
              <div className="mt-2 flex gap-2">
                <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary px-3 py-1 rounded-full">رقم الواتساب: {userData?.whatsapp || userData?.phone || "غير مسجل"}</Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="rounded-2xl border-primary/20 bg-primary/5 backdrop-blur-md hover-elevate active-elevate-2 font-bold px-6 h-12"
                onClick={() => window.open(`https://wa.me/${userData?.assignedEmployeePhone || '966532441566'}`)}
              >
                <MessageSquare className="ml-2 h-5 w-5 text-primary" />
                تواصل مع المسؤول
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-0 bg-background/40 backdrop-blur-xl shadow-2xl rounded-[2.5rem] border border-white/10 overflow-hidden animate-in fade-in slide-in-from-left-4 duration-1000 delay-100">
                <CardHeader className="pb-2 px-8 pt-8">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-black tracking-tight">مراحل التنفيذ</CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 rounded-full px-4 py-1.5 font-bold animate-pulse">
                      المرحلة الثانية نشطة
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 px-8 pb-8">
                  <div className="relative pt-6 pb-2">
                    <Progress value={35} className="h-4 rounded-full bg-primary/5 border border-primary/10 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </Progress>
                  </div>
                  <div className="grid gap-6">
                    {stages.map((stage, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`group flex items-center justify-between p-6 rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 ${stage.status === 'current' ? 'bg-primary/5 border border-primary/20 shadow-[0_15px_40px_rgba(16,185,129,0.12)] scale-[1.03]' : 'bg-white/5 border border-white/5'}`}
                      >
                        <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 ${stage.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500 shadow-inner' : stage.status === 'current' ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/40' : 'bg-muted/20 text-muted-foreground'}`}>
                            {stage.status === 'completed' ? <CheckCircle2 className="h-7 w-7" /> : idx + 1}
                          </div>
                          <div>
                            <p className={`font-black text-xl ${stage.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>{stage.name}</p>
                            <div className="flex items-center gap-3 mt-1.5">
                              <div className="w-32 h-2 rounded-full bg-muted/20 overflow-hidden backdrop-blur-sm">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${stage.progress}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className={`h-full rounded-full relative ${stage.status === 'completed' ? 'bg-emerald-500' : stage.status === 'current' ? 'bg-primary' : 'bg-muted/40'}`}
                                >
                                  {stage.status === 'current' && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />}
                                </motion.div>
                              </div>
                              <p className="text-xs font-black text-primary/70 tracking-wider uppercase">{stage.progress}% مـكتـمل</p>
                            </div>
                          </div>
                        </div>
                        {stage.status === 'current' && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">نشط الآن</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-background/40 backdrop-blur-xl shadow-xl rounded-3xl border border-white/10 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                <CardHeader>
                  <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    التحديثات اليومية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {updates?.length ? updates.map((u: any, idx: number) => (
                    <div key={idx} className="flex gap-4 relative">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 z-10 border-4 border-background">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex-1 hover:bg-white/10 transition-colors">
                        <p className="text-sm leading-relaxed">{u.content}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-10 opacity-50">
                      <p>لا توجد تحديثات حية حتى الآن.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-0 bg-primary/10 backdrop-blur-xl shadow-xl rounded-3xl border border-primary/20 overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-black flex items-center gap-2">
                    <User className="h-5 w-5" />
                    المسؤول عن مشروعك
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    {userData?.assignedEmployeeName ? (
                      <>
                        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-black text-primary-foreground shadow-lg shadow-primary/20">
                          {userData.assignedEmployeeName[0]}
                        </div>
                        <div>
                          <p className="font-black text-lg">{userData.assignedEmployeeName}</p>
                          <p className="text-sm text-primary/80">مدير مشروعك</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-black text-primary-foreground shadow-lg shadow-primary/20">
                          ؟
                        </div>
                        <div>
                          <p className="font-black text-lg">سيتم التعيين قريباً</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-background/40 backdrop-blur-xl shadow-xl rounded-3xl border border-white/10 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
                <CardHeader>
                  <CardTitle className="text-lg font-black flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    بيانات المشروع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">الدومين:</span>
                      <span className="text-sm font-bold flex items-center gap-1">
                        {userData?.domainInfo || "قيد التجهيز"}
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">الباقة:</span>
                      <Badge variant="secondary" className="rounded-lg">{userData?.selectedPlanId || "بيسك"}</Badge>
                    </div>
                  </div>
                  {(userData?.commercialRegisterUrl || userData?.ibanCertificateUrl) && (
                    <div className="space-y-3 mt-4">
                      <h4 className="text-sm font-bold">المستندات المرفوعة</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {userData?.commercialRegisterUrl && (
                          <Button variant="outline" size="sm" className="h-8 text-[10px]" onClick={() => window.open(userData.commercialRegisterUrl)}>
                            <FileText className="h-3 w-3 ml-1" />
                            السجل التجاري
                          </Button>
                        )}
                        {userData?.ibanCertificateUrl && (
                          <Button variant="outline" size="sm" className="h-8 text-[10px]" onClick={() => window.open(userData.ibanCertificateUrl)}>
                            <FileText className="h-3 w-3 ml-1" />
                            شهادة الآيبان
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}