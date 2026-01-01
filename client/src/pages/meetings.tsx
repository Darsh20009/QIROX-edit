import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Calendar, Plus, Loader2, ExternalLink } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function MeetingsPage() {
  const { toast } = useToast();
  const { data: meetings, isLoading } = useQuery<any[]>({
    queryKey: ["/api/meetings"],
  });

  const createMeetingMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/meetings", {
        title: "اجتماع جديد",
        scheduledAt: new Date().toISOString(),
        projectId: "default"
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
      toast({ title: "تم جدولة الاجتماع بنجاح" });
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 py-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">اجتماعات QIROX Meet</h1>
            <p className="text-muted-foreground">إدارة وجدولة اجتماعات الفيديو الخاصة بمشاريعك</p>
          </div>
          <Button onClick={() => createMeetingMutation.mutate()} disabled={createMeetingMutation.isPending}>
            <Plus className="ml-2 h-4 w-4" /> جدولة اجتماع
          </Button>
        </div>

        <div className="grid gap-6">
          {meetings?.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Video className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">لا توجد اجتماعات مجدولة حالياً</p>
              </CardContent>
            </Card>
          ) : (
            meetings?.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle>{meeting.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="ml-2 h-4 w-4" />
                      {format(new Date(meeting.scheduledAt), "PPP p", { locale: ar })}
                    </div>
                  </div>
                  <Button asChild variant="outline">
                    <a href={meeting.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="ml-2 h-4 w-4" /> دخول الاجتماع
                    </a>
                  </Button>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}