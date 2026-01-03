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
              <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                أهلاً بك، {user?.username}
              </h1>
              <p className="text-muted-foreground mt-1 font-medium">مرحباً بك في لوحة تحكم مشروعك: <span className="text-primary">{userData?.projectName || "قيد المراجعة"}</span></p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-xl border-white/10 backdrop-blur-sm hover-elevate">
                <MessageSquare className="ml-2 h-4 w-4" />
                تواصل مع المسؤول
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-0 bg-background/40 backdrop-blur-xl shadow-xl rounded-3xl border border-white/10 overflow-hidden animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-black">مراحل التنفيذ</CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 rounded-full px-4 py-1">
                      المرحلة الثانية نشطة
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative pt-4 pb-2">
                    <Progress value={35} className="h-3 rounded-full bg-muted/30" />
                  </div>
                  <div className="grid gap-4">
                    {stages.map((stage, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${stage.status === 'current' ? 'bg-primary/5 border border-primary/20 scale-[1.02]' : 'bg-white/5 border border-white/5'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stage.status === 'completed' ? 'bg-green-500/20 text-green-500' : stage.status === 'current' ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-muted/30 text-muted-foreground'}`}>
                            {stage.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                          </div>
                          <div>
                            <p className={`font-bold ${stage.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>{stage.name}</p>
                            <p className="text-xs text-muted-foreground">{stage.progress}% مكتمل</p>
                          </div>
                        </div>
                      </div>
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
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-black text-primary-foreground shadow-lg shadow-primary/20">
                      ؟
                    </div>
                    <div>
                      <p className="font-black text-lg">سيتم التعيين قريباً</p>
                    </div>
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}