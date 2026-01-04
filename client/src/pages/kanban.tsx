import { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in_progress" | "review" | "done";
}

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "تصميم واجهة المستخدم", description: "إنشاء نماذج واجهة المستخدم الأولية لنظام QIROX", priority: "high", status: "done" },
  { id: "2", title: "إعداد قاعدة البيانات", description: "تكوين جداول PostgreSQL و MongoDB", priority: "high", status: "in_progress" },
  { id: "3", title: "نظام التذاكر", description: "تطوير منطق العمل لتذاكر الدعم الفني", priority: "medium", status: "todo" },
  { id: "4", title: "توثيق API", description: "كتابة توثيق Swagger لنقاط النهاية", priority: "low", status: "todo" },
];

export default function KanbanPage() {
  const [tasks] = useState<Task[]>(INITIAL_TASKS);

  const columns = [
    { id: "todo", title: "قيد الانتظار" },
    { id: "in_progress", title: "قيد التنفيذ" },
    { id: "review", title: "قيد المراجعة" },
    { id: "done", title: "مكتمل" },
  ];

  const priorityColors = {
    high: "destructive",
    medium: "default",
    low: "secondary",
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-primary mb-2">QIROX Build</h1>
            <p className="text-muted-foreground">إدارة مشاريع التطوير والمهام البرمجية</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            مهمة جديدة
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="font-bold flex items-center gap-2">
                  {column.title}
                  <Badge variant="secondary" className="text-[10px]">
                    {tasks.filter((t) => t.status === column.id).length}
                  </Badge>
                </h2>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-col gap-3 min-h-[500px] bg-muted/30 p-2 rounded-lg border-2 border-dashed border-muted">
                {tasks
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <Card key={task.id} className="hover-elevate cursor-grab active:cursor-grabbing">
                      <CardHeader className="p-3 pb-2">
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-sm font-bold leading-tight">{task.title}</CardTitle>
                          <Badge variant={priorityColors[task.priority] as any} className="text-[8px] h-4 px-1 uppercase">
                            {task.priority === "high" ? "عاجل" : task.priority === "medium" ? "متوسط" : "عادي"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                          {task.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex -space-x-2 rtl:space-x-reverse">
                            <div className="w-6 h-6 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[8px] font-bold">
                              QA
                            </div>
                            <div className="w-6 h-6 rounded-full border-2 border-background bg-accent/20 flex items-center justify-center text-[8px] font-bold">
                              DE
                            </div>
                          </div>
                          <span className="text-[10px] text-muted-foreground">#QI-{task.id}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
