import { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Trash2, Clock, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "1", title: "تنبيه أمني", message: "تم اكتشاف محاولة تسجيل دخول مريبة من IP غير معروف", type: "error", time: "منذ 5 دقائق", read: false },
  { id: "2", title: "تحديث النظام", message: "تم تحديث موديول QIROX Cloud إلى الإصدار v2.4.0", type: "info", time: "منذ ساعة", read: false },
  { id: "3", title: "فاتورة جديدة", message: "تم إصدار فاتورة شهر يناير لمؤسسة الحلول الذكية", type: "success", time: "منذ 3 ساعات", read: true },
  { id: "4", title: "انخفاض المخزون", message: "تنبيه: مخزون 'خادم برو' أقل من الحد الأدنى", type: "warning", time: "منذ 5 ساعات", read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "error": return <AlertCircle className="w-5 h-5 text-destructive" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "success": return <Check className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-right">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center mb-8 flex-row-reverse">
          <div>
            <h1 className="text-3xl font-black text-primary mb-2">مركز التنبيهات</h1>
            <p className="text-muted-foreground">إدارة جميع إشعارات وتنبيهات النظام</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}>تحديد الكل كمقروء</Button>
            <Button variant="destructive" size="sm" onClick={() => setNotifications([])}>مسح الكل</Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {notifications.length === 0 ? (
            <Card className="p-12 text-center bg-muted/20 border-dashed">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <p className="text-muted-foreground font-bold">لا توجد تنبيهات حالياً</p>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card key={notification.id} className={`hover-elevate transition-all ${!notification.read ? 'border-r-4 border-r-primary bg-primary/5' : ''}`}>
                <CardContent className="p-4 flex items-center justify-between flex-row-reverse">
                  <div className="flex gap-4 items-start flex-row-reverse">
                    <div className="mt-1">{getTypeIcon(notification.type)}</div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 flex-row-reverse mb-1 justify-end">
                        <h3 className="font-bold text-sm">{notification.title}</h3>
                        {!notification.read && <Badge className="text-[8px] h-4 px-1">جديد</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground flex-row-reverse justify-end">
                        <Clock className="w-3 h-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button size="icon" variant="ghost" onClick={() => markAsRead(notification.id)} title="تحديد كمقروء">
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
