import { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Lock, Calendar, Plus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MeetingsPage() {
  const [activeTab, setActiveTab] = useState("active");

  const meetings = [
    { id: 1, title: "اجتماع الفريق الأسبوعي", host: "م. أحمد", time: "10:00 ص", participants: 8, status: "active", security: "E2EE" },
    { id: 2, title: "مراجعة مشروع QIROX Build", host: "سارة محمد", time: "01:30 م", participants: 3, status: "scheduled", security: "E2EE" },
    { id: 3, title: "مقابلة مرشح جديد", host: "إدارة الموارد", time: "04:00 م", participants: 2, status: "scheduled", security: "Standard" },
  ];

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8 text-right">
        <div className="flex justify-between items-center mb-8 flex-row-reverse">
          <div>
            <h1 className="text-3xl font-black text-primary mb-2">QIROX Meet</h1>
            <p className="text-muted-foreground">اجتماعات فيديو مؤمنة ومشفرة بتقنية ZEGO</p>
          </div>
          <Button className="gap-2 bg-primary hover-elevate">
            <Plus className="w-4 h-4" />
            بدء اجتماع جديد
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2 text-right">
              <CardTitle className="text-xs font-bold">اجتماعات نشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-right">1</div>
              <p className="text-[10px] text-muted-foreground mt-1">8 مشاركين حالياً</p>
            </CardContent>
          </Card>
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader className="pb-2 text-right">
              <CardTitle className="text-xs font-bold">مستوى التشفير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-right flex items-center justify-end gap-2 text-primary">
                <span>AES-256</span>
                <Lock className="w-5 h-5" />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 text-right">تشفير من الطرف إلى الطرف</p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/5 border-secondary/20">
            <CardHeader className="pb-2 text-right">
              <CardTitle className="text-xs font-bold">التوافر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-right text-green-500">99.99%</div>
              <p className="text-[10px] text-muted-foreground mt-1">خوادم ZEGO تعمل بكفاءة</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-2 justify-end mb-4">
              <Button 
                variant={activeTab === "active" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setActiveTab("active")}
              >النشطة والمجدولة</Button>
              <Button 
                variant={activeTab === "history" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setActiveTab("history")}
              >السجل</Button>
            </div>

            {meetings.map((meeting) => (
              <Card key={meeting.id} className="hover-elevate transition-all">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center flex-row-reverse">
                    <div className="flex gap-4 items-center flex-row-reverse">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Video className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <h3 className="font-bold text-lg">{meeting.title}</h3>
                        <p className="text-sm text-muted-foreground">المضيف: {meeting.host} • {meeting.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{meeting.participants} مشاركين</span>
                      </div>
                      <Badge variant={meeting.security === "E2EE" ? "default" : "secondary"} className="text-[10px]">
                        {meeting.security}
                      </Badge>
                      <Button size="sm" className={meeting.status === "active" ? "bg-green-600 hover:bg-green-700" : ""}>
                        {meeting.status === "active" ? "انضمام الآن" : "دخول الغرفة"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-right flex items-center justify-end gap-2 text-sm">
                  <span>التقويم السريع</span>
                  <Calendar className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center text-xs pb-2 border-b last:border-0 flex-row-reverse">
                      <span className="font-bold">يناير {10 + i}</span>
                      <span className="text-muted-foreground">اجتماع مجدول</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-right">
                <h4 className="font-bold mb-2">غرفة اجتماعات خاصة؟</h4>
                <p className="text-xs opacity-90 mb-4">يمكنك إنشاء غرف محمية بكلمة مرور ودعوة الضيوف من خارج النظام.</p>
                <Button variant="secondary" size="sm" className="w-full">إنشاء غرفة سريعة</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
