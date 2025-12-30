import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequestJson } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "review" | "done";
  assignedTo?: { _id: string; name: string; email: string };
  dueDate?: string;
}

const statusLabels = {
  todo: "قائمة المهام",
  in_progress: "قيد الإنجاز",
  review: "قيد المراجعة",
  done: "مكتملة",
};

const statusColors = {
  todo: "bg-gray-100 dark:bg-gray-900",
  in_progress: "bg-blue-100 dark:bg-blue-900",
  review: "bg-yellow-100 dark:bg-yellow-900",
  done: "bg-green-100 dark:bg-green-900",
};

export default function KanbanBoard() {
  const { toast } = useToast();
  const projectId = "default-project"; // Example: hardcoded for demo
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: [`/api/projects/${projectId}/tasks`],
  });

  const createMutation = useMutation({
    mutationFn: async (title: string) => {
      return apiRequestJson<Task>("POST", `/api/projects/${projectId}/tasks`, {
        title,
        status: "todo",
      });
    },
    onSuccess: () => {
      setNewTaskTitle("");
      toast({ description: "تم إنشاء المهمة بنجاح" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      taskId,
      status,
    }: {
      taskId: string;
      status: string;
    }) => {
      return apiRequestJson<Task>("PATCH", `/api/projects/${projectId}/tasks/${taskId}`, {
        status,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: string) => {
      return apiRequestJson("DELETE", `/api/projects/${projectId}/tasks/${taskId}`);
    },
    onSuccess: () => {
      toast({ description: "تم حذف المهمة" });
    },
  });

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: string) => {
    if (draggedTask) {
      updateMutation.mutate({ taskId: draggedTask._id, status });
      setDraggedTask(null);
    }
  };

  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    review: tasks.filter((t) => t.status === "review"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <div className="p-6 bg-background min-h-screen" data-testid="page-kanban">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">
          لوحة مهام المشروع
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="أضف مهمة جديدة..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            data-testid="input-new-task"
          />
          <Button
            onClick={() => {
              if (newTaskTitle.trim()) {
                createMutation.mutate(newTaskTitle);
              }
            }}
            disabled={createMutation.isPending}
            data-testid="button-create-task"
          >
            <Plus className="w-4 h-4 mr-2" />
            إضافة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(statusLabels) as Array<keyof typeof statusLabels>).map(
          (status) => (
            <div
              key={status}
              className={`rounded-lg p-4 min-h-96 ${statusColors[status]}`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(status)}
              data-testid={`column-${status}`}
            >
              <h2 className="font-semibold mb-4 text-lg">
                {statusLabels[status]} ({tasksByStatus[status].length})
              </h2>
              <div className="space-y-3">
                {tasksByStatus[status].map((task) => (
                  <Card
                    key={task._id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    className="p-3 cursor-move hover:shadow-md transition-shadow"
                    data-testid={`card-task-${task._id}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">{task.title}</h3>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteMutation.mutate(task._id)}
                        data-testid={`button-delete-task-${task._id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {task.description && (
                      <p className="text-xs text-muted-foreground mb-2">
                        {task.description}
                      </p>
                    )}
                    {task.assignedTo && (
                      <Badge variant="outline" className="text-xs">
                        {task.assignedTo.name}
                      </Badge>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
