import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, ShieldCheck, Zap, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CloudStatus() {
  const { data: status, isLoading } = useQuery<{
    slug: string;
    subdomain: string;
    status: string;
    ssl: string;
    dns: string;
  }>({
    queryKey: ["/api/cloud/tenant-status"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">QIROX Cloud</h2>
        <Badge variant="outline" className="px-3 py-1">
          <Zap className="w-3 h-3 mr-1 text-primary fill-primary" />
          Auto SSL Enabled
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subdomain</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">{status?.subdomain}</div>
            <p className="text-xs text-muted-foreground pt-1">Automatic tenant routing</p>
            <Button variant="link" className="p-0 h-auto text-xs mt-2 group" asChild>
              <a href={`https://${status?.subdomain}`} target="_blank" rel="noreferrer">
                Visit Site <ExternalLink className="w-3 h-3 ml-1 inline group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SSL Certificate</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold uppercase">{status?.ssl}</div>
            <p className="text-xs text-muted-foreground pt-1">Powered by QIROX Edge</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DNS Status</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">READY</div>
            <p className="text-xs text-muted-foreground pt-1">Propagated globally</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-dashed">
        <CardContent className="p-8 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Custom Domain</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Ready to use your own domain? Point your CNAME to our edge servers.
            </p>
          </div>
          <Button variant="outline" disabled>Connect Custom Domain (Phase 2)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
