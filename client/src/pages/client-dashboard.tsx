import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Clock, FileText, Globe, 
  MessageSquare, User, Activity, Calendar,
  ArrowUpRight, Download, ExternalLink, ShieldCheck,
  Star, Settings, Zap, Rocket, TrendingUp, Target, Award, Sparkles, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ClientDashboard() {
  const { user } = useAuth();
  
  const { data: updates } = useQuery<any[]>({
    queryKey: ["/api/daily-updates"],
    enabled: !!user,
  });

  const stages = [
    { name: "التخطيط والتحليل", status: "completed", progress: 100, icon: Target },
    { name: "هوية المشروع واللوجو", status: "current", progress: 65, icon: Star },
    { name: "تطوير النظام البرمي", status: "pending", progress: 0, icon: Rocket },
    { name: "الاختبار والتحسين", status: "pending", progress: 0, icon: Settings },
    { name: "الإطلاق النهائي", status: "pending", progress: 0, icon: Zap },
  ];

  const userData = user as any;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          
          <div className="container mx-auto px-6 md:px-8 py-10 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
            >
              <div>
                <Badge className="bg-gradient-to-r from-primary to-emerald-600 text-white border-0 px-4 py-1.5 text-sm font-medium rounded-full mb-4 shadow-lg shadow-primary/25">
                  <Sparkles className="w-4 h-4 ml-2" />
                  لوحة التحكم
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  أهلاً بك، <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">{user?.username}</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  يسعدنا متابعة تطور مشروعك: <span className="text-primary font-semibold">{userData?.projectName || "قيد المراجعة"}</span>
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white rounded-full shadow-xl shadow-primary/25 h-14 px-8 text-base font-semibold"
                  onClick={() => window.open(`https://wa.me/${userData?.assignedEmployeePhone || '966532441566'}`)}
                >
                  <MessageSquare className="ml-2 h-5 w-5" />
                  تحدث مع مدير مشروعك
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-8 pb-12 -mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { title: "الحالة العامة", value: "نشط", icon: Activity, gradient: "from-primary to-emerald-600" },
              { title: "اكتمال المشروع", value: "35%", icon: TrendingUp, gradient: "from-blue-500 to-indigo-600" },
              { title: "المرحلة الحالية", value: "الهوية البصرية", icon: Award, gradient: "from-purple-500 to-pink-600" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`relative overflow-hidden border-0 shadow-xl group hover:scale-[1.02] transition-all duration-300 h-full`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-90`} />
                  <CardContent className="relative z-10 p-8 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">{stat.title}</p>
                        <h3 className="text-4xl font-bold">{stat.value}</h3>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <stat.icon className="w-7 h-7" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-xl bg-card">
                  <CardHeader className="pb-4 border-b border-border/50">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/25">
                          <Rocket className="w-5 h-5 text-white" />
                        </div>
                        مراحل التنفيذ
                      </CardTitle>
                      <Badge className="bg-primary/10 text-primary border-0 rounded-full px-4 py-2 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse ml-2 inline-block"></span>
                        المرحلة الثانية
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative mb-8">
                      <Progress value={35} className="h-4 rounded-full" />
                      <div className="absolute -top-8 left-[35%] transform -translate-x-1/2">
                        <Badge className="bg-primary text-white border-0 shadow-lg">35%</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {stages.map((stage, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className={`group flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${
                            stage.status === 'current' 
                              ? 'bg-gradient-to-r from-primary/10 to-emerald-500/10 border-2 border-primary/30 shadow-lg' 
                              : stage.status === 'completed'
                                ? 'bg-emerald-500/5 border border-emerald-500/20'
                                : 'bg-muted/50 hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all ${
                              stage.status === 'completed' 
                                ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25' 
                                : stage.status === 'current' 
                                  ? 'bg-gradient-to-br from-primary to-emerald-600 text-white shadow-lg shadow-primary/25' 
                                  : 'bg-muted text-muted-foreground'
                            }`}>
                              {stage.status === 'completed' ? <CheckCircle2 className="h-7 w-7" /> : <stage.icon className="h-6 w-6" />}
                            </div>
                            <div>
                              <p className={`font-bold text-lg ${stage.status === 'pending' ? 'text-muted-foreground' : ''}`}>
                                {stage.name}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <div className="w-32 h-2.5 rounded-full bg-muted overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stage.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={`h-full rounded-full ${
                                      stage.status === 'completed' 
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
                                        : stage.status === 'current' 
                                          ? 'bg-gradient-to-r from-primary to-emerald-600' 
                                          : 'bg-muted-foreground/30'
                                    }`}
                                  />
                                </div>
                                <p className="text-sm font-semibold text-muted-foreground">{stage.progress}%</p>
                              </div>
                            </div>
                          </div>
                          {stage.status === 'current' && (
                            <Badge className="bg-gradient-to-r from-primary to-emerald-600 text-white border-0 shadow-lg">
                              <Sparkles className="w-3 h-3 ml-1" />
                              نشط الآن
                            </Badge>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-0 shadow-xl bg-card">
                  <CardHeader className="border-b border-border/50">
                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      التحديثات اليومية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {updates?.length ? updates.map((u: any, idx: number) => (
                      <div key={idx} className="flex gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/25">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        <div className="bg-muted/50 p-5 rounded-2xl flex-1 hover:bg-muted transition-colors border border-border/50">
                          <p className="leading-relaxed">{u.content}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
                          <Activity className="w-10 h-10 text-muted-foreground/50" />
                        </div>
                        <p className="text-lg text-muted-foreground">لا توجد تحديثات حية حتى الآن</p>
                        <p className="text-sm text-muted-foreground/70 mt-2">سنبقيك على اطلاع بكل جديد</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/10 via-emerald-500/5 to-transparent border border-primary/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/25">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      المسؤول عن مشروعك
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50">
                      {userData?.assignedEmployeeName ? (
                        <>
                          <Avatar className="w-16 h-16 ring-2 ring-primary ring-offset-2 ring-offset-background">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-2xl font-bold">
                              {userData.assignedEmployeeName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-lg">{userData.assignedEmployeeName}</p>
                            <p className="text-sm text-muted-foreground">مدير مشروعك</p>
                            <Badge className="mt-2 bg-emerald-500/10 text-emerald-600 border-0">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 ml-2 animate-pulse"></span>
                              متاح الآن
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <>
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="bg-muted text-muted-foreground text-2xl font-bold">?</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-lg">سيتم التعيين قريباً</p>
                            <p className="text-sm text-muted-foreground">نعمل على تخصيص أفضل مدير لمشروعك</p>
                          </div>
                        </>
                      )}
                    </div>
                    <Button className="w-full h-12 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white rounded-xl font-semibold shadow-lg shadow-primary/25">
                      <MessageSquare className="w-5 h-5 ml-2" />
                      تواصل الآن
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-0 shadow-xl bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      بيانات المشروع
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-5 rounded-2xl bg-muted/50 space-y-4 border border-border/50">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">الدومين</span>
                        <span className="font-bold flex items-center gap-2">
                          {userData?.domainInfo || "قيد التجهيز"}
                          <ExternalLink className="h-4 w-4 text-primary" />
                        </span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">الباقة</span>
                        <Badge className="rounded-full bg-gradient-to-r from-primary to-emerald-600 text-white border-0 shadow-sm">
                          {userData?.selectedPlanId || "بيسك"}
                        </Badge>
                      </div>
                    </div>
                    
                    {(userData?.commercialRegisterUrl || userData?.ibanCertificateUrl) && (
                      <div className="space-y-3">
                        <h4 className="font-bold text-sm">المستندات المرفوعة</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {userData?.commercialRegisterUrl && (
                            <Button variant="outline" size="sm" className="h-11 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all" onClick={() => window.open(userData.commercialRegisterUrl)}>
                              <FileText className="h-4 w-4 ml-2" />
                              السجل التجاري
                            </Button>
                          )}
                          {userData?.ibanCertificateUrl && (
                            <Button variant="outline" size="sm" className="h-11 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all" onClick={() => window.open(userData.ibanCertificateUrl)}>
                              <FileText className="h-4 w-4 ml-2" />
                              شهادة الآيبان
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
