import { useQuery, useMutation } from "@tanstack/react-query";
import { Deployment, BuildLog, RuntimeHealth } from "@shared/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Rocket, Activity, Terminal, RefreshCcw } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function DeploymentEngine() {
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: stats } = useQuery<{ totalDeployments: number, health: RuntimeHealth }>({
    queryKey: ["/api/stats/overview"],
    refetchInterval: 5000,
  });

  const { data: deployments, isLoading: loadingDeployments } = useQuery<Deployment[]>({
    queryKey: ["/api/deployments"],
  });

  const activeDeployment = deployments?.find(d => d.status === "live");
  const previousDeployments = deployments?.filter(d => d.status !== "live")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const { data: logs } = useQuery<BuildLog[]>({
    queryKey: ["/api/deployments", selectedId, "logs"],
    enabled: !!selectedId,
    refetchInterval: (query) => {
      const deployment = deployments?.find(d => d.id === selectedId);
      return (deployment?.status === "building" || deployment?.status === "deploying") ? 2000 : false;
    }
  });

  const deployMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/deployments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version: `1.0.${(deployments?.length || 0) + 1}` }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/deployments"] });
      setSelectedId(data.id);
      toast({ title: "Deployment Started", description: "Your build is now queued." });
    },
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      live: "default",
      building: "secondary",
      deploying: "secondary",
      failed: "destructive",
      rolled_back: "destructive",
      queued: "outline",
      previous: "outline",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const rollbackMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/deployments/rollback", { 
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Rollback failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/deployments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats/overview"] });
      toast({ title: "Rollback Successful", description: "System has reverted to previous version." });
    },
    onError: (err: Error) => {
      toast({ title: "Rollback Failed", variant: "destructive", description: err.message });
    }
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Deployment Engine</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => rollbackMutation.mutate()}
            disabled={rollbackMutation.isPending}
          >
            Rollback
          </Button>
          <Button 
            onClick={() => deployMutation.mutate()} 
            disabled={deployMutation.isPending}
            className="gap-2"
          >
            <Rocket className="h-4 w-4" />
            New Deployment
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover-elevate border-primary/50 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
            <CardTitle className="text-sm font-medium">Active Version</CardTitle>
            <Rocket className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDeployment?.version || "None"}</div>
            <p className="text-xs text-muted-foreground font-mono">
              {activeDeployment?.commitHash?.substring(0, 7) || "No hash"}
            </p>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{stats?.health?.status || "Unknown"}</div>
            <p className="text-xs text-muted-foreground">Real-time status monitor</p>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <RefreshCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.health?.cpuUsage || 0}%</div>
            <p className="text-xs text-muted-foreground">Average core load</p>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Terminal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.health?.memoryUsage || 0}%</div>
            <p className="text-xs text-muted-foreground">Total memory allocated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Deployment History</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {previousDeployments?.map((d) => (
                  <div 
                    key={d.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${selectedId === d.id ? 'bg-accent' : 'hover:bg-accent/50'}`}
                    onClick={() => setSelectedId(d.id)}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Version {d.version}</p>
                        <span className="text-[10px] font-mono opacity-50">#{d.commitHash?.substring(0, 7) || 'HEAD'}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(d.createdAt).toLocaleString()} • {d.deployedBy}
                      </p>
                    </div>
                    {getStatusBadge(d.status)}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-1 bg-black text-green-500 font-mono">
          <CardHeader className="border-b border-green-900/30">
            <CardTitle className="text-green-500 flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Build Logs {selectedId && ` - ${deployments?.find(d => d.id === selectedId)?.version}`}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] p-4">
              {logs?.length ? (
                logs.map((log) => (
                  <div key={log.id} className="text-sm mb-1">
                    <span className="opacity-50">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{" "}
                    <span className={log.level === 'error' ? 'text-red-500' : ''}>{log.logLine}</span>
                  </div>
                ))
              ) : (
                <div className="text-sm opacity-50 italic">Select a deployment to view logs...</div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
