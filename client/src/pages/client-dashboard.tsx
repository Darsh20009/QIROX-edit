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
  Star, Settings, Zap, Rocket
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
      <div className="min-h-screen p-6 md:p-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <Badge className="bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm font-medium rounded-full mb-3">
                <Zap className="w-4 h-4 ml-2" />
                لوحة التحكم
              </Badge>
              <h1 className="text-4xl font-bold">
                أهلاً بك، <span className="text-primary">{user?.username}</span>
              </h1>
              <p className="text-muted-foreground mt-2">يسعدنا متابعة تطور مشروعك: <span className="text-primary font-semibold">{userData?.projectName || "قيد المراجعة"}</span></p>
            </div>
            <div className="flex gap-3">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/25 h-12 px-6"
                onClick={() => window.open(`https://wa.me/${userData?.assignedEmployeePhone || '966532441566'}`)}
              >
                <MessageSquare className="ml-2 h-5 w-5" />
                تحدث مع مدير مشروعك
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-primary text-white rounded-2xl border-0 shadow-xl shadow-primary/20 h-44 flex flex-col justify-between p-6 group hover:scale-[1.02] transition-transform">
                <p className="font-medium text-white/80 text-sm uppercase tracking-wider">الحالة العامة</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-4xl font-bold">نشط</h3>
                  <Activity className="w-12 h-12 text-white/20 group-hover:scale-110 transition-transform" />
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border border-border rounded-2xl shadow-lg h-44 flex flex-col justify-between p-6 group hover:shadow-xl hover:border-primary/20 transition-all">
                <p className="font-medium text-muted-foreground text-sm uppercase tracking-wider">اكتمال المشروع</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-4xl font-bold text-primary">35%</h3>
                  <CheckCircle2 className="w-12 h-12 text-primary/20 group-hover:scale-110 transition-transform" />
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border border-border rounded-2xl shadow-lg h-44 flex flex-col justify-between p-6 group hover:shadow-xl hover:border-primary/20 transition-all">
                <p className="font-medium text-muted-foreground text-sm uppercase tracking-wider">المرحلة الحالية</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-primary">الهوية البصرية</h3>
                  <Star className="w-12 h-12 text-primary/20 group-hover:scale-110 transition-transform" />
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border border-border rounded-2xl shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-primary" />
                        مراحل التنفيذ
                      </CardTitle>
                      <Badge className="bg-primary/10 text-primary border-0 rounded-full px-4 py-1.5 font-medium">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse ml-2 inline-block"></span>
                        المرحلة الثانية نشطة
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative">
                      <Progress value={35} className="h-3 rounded-full" />
                    </div>
                    <div className="grid gap-4">
                      {stages.map((stage, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className={`group flex items-center justify-between p-5 rounded-xl transition-all duration-200 ${
                            stage.status === 'current' 
                              ? 'bg-primary/10 border border-primary/20' 
                              : 'bg-muted/50 hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                              stage.status === 'completed' 
                                ? 'bg-emerald-500/10 text-emerald-500' 
                                : stage.status === 'current' 
                                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                                  : 'bg-muted text-muted-foreground'
                            }`}>
                              {stage.status === 'completed' ? <CheckCircle2 className="h-6 w-6" /> : idx + 1}
                            </div>
                            <div>
                              <p className={`font-semibold text-lg ${stage.status === 'pending' ? 'text-muted-foreground' : ''}`}>
                                {stage.name}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <div className="w-28 h-2 rounded-full bg-muted overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stage.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={`h-full rounded-full ${
                                      stage.status === 'completed' 
                                        ? 'bg-emerald-500' 
                                        : stage.status === 'current' 
                                          ? 'bg-primary' 
                                          : 'bg-muted-foreground/30'
                                    }`}
                                  />
                                </div>
                                <p className="text-xs font-medium text-muted-foreground">{stage.progress}%</p>
                              </div>
                            </div>
                          </div>
                          {stage.status === 'current' && (
                            <Badge className="bg-primary/20 text-primary border-0 text-xs">
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
                transition={{ delay: 0.6 }}
              >
                <Card className="border border-border rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      التحديثات اليومية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {updates?.length ? updates.map((u: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <div className="bg-muted p-4 rounded-xl flex-1 hover:bg-muted/80 transition-colors">
                          <p className="text-sm leading-relaxed">{u.content}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Activity className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>لا توجد تحديثات حية حتى الآن.</p>
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
                transition={{ delay: 0.5 }}
              >
                <Card className="border border-primary/20 bg-primary/5 rounded-2xl shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      المسؤول عن مشروعك
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      {userData?.assignedEmployeeName ? (
                        <>
                          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/25">
                            {userData.assignedEmployeeName[0]}
                          </div>
                          <div>
                            <p className="font-bold text-lg">{userData.assignedEmployeeName}</p>
                            <p className="text-sm text-muted-foreground">مدير مشروعك</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/25">
                            ?
                          </div>
                          <div>
                            <p className="font-bold text-lg">سيتم التعيين قريباً</p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="border border-border rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      بيانات المشروع
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-muted space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">الدومين:</span>
                        <span className="text-sm font-semibold flex items-center gap-1">
                          {userData?.domainInfo || "قيد التجهيز"}
                          <ExternalLink className="h-3 w-3 opacity-50" />
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">الباقة:</span>
                        <Badge className="rounded-lg bg-primary/10 text-primary border-0">
                          {userData?.selectedPlanId || "بيسك"}
                        </Badge>
                      </div>
                    </div>
                    {(userData?.commercialRegisterUrl || userData?.ibanCertificateUrl) && (
                      <div className="space-y-3 mt-4">
                        <h4 className="text-sm font-bold">المستندات المرفوعة</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {userData?.commercialRegisterUrl && (
                            <Button variant="outline" size="sm" className="h-9 text-xs rounded-lg" onClick={() => window.open(userData.commercialRegisterUrl)}>
                              <FileText className="h-3 w-3 ml-1" />
                              السجل التجاري
                            </Button>
                          )}
                          {userData?.ibanCertificateUrl && (
                            <Button variant="outline" size="sm" className="h-9 text-xs rounded-lg" onClick={() => window.open(userData.ibanCertificateUrl)}>
                              <FileText className="h-3 w-3 ml-1" />
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
