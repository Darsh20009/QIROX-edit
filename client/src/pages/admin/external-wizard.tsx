import { useState } from "react";
  import { useQuery, useMutation } from "@tanstack/react-query";
  import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { useToast } from "@/hooks/use-toast";
  import { Loader2, Copy, Check, Key, Code, Globe, Terminal } from "lucide-react";
  import { apiRequest, queryClient } from "@/lib/queryClient";
  import { ApiKey } from "@shared/schema";

  export default function ExternalMode() {
    const { toast } = useToast();
    const [copyKey, setCopyKey] = useState<string | null>(null);

    const { data: keys, isLoading } = useQuery<ApiKey[]>({
      queryKey: ["/api/keys"],
    });

    const createKeyMutation = useMutation({
      mutationFn: async () => {
        const res = await apiRequest("POST", "/api/keys", { name: "Production Key", tenantId: "default" });
        return res.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/keys"] });
        toast({ title: "تم إنشاء مفتاح جديد", description: "يمكنك الآن استخدامه للربط الخارجي" });
      },
    });

    const copyToClipboard = (text: string, id: string) => {
      navigator.clipboard.writeText(text);
      setCopyKey(id);
      setTimeout(() => setCopyKey(null), 2000);
      toast({ title: "تم النسخ", description: "تم نسخ النص إلى الحافظة" });
    };

    const sdkSnippet = `import { QiroxConnect } from '@qirox/sdk';\n\nconst qirox = new QiroxConnect({\n  apiKey: 'YOUR_API_KEY',\n  baseUrl: '${window.location.origin}'\n});\n\n// Get products\nconst products = await qirox.getProducts();`;

    return (
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">External Mode | الوضع الخارجي</h2>
            <p className="text-muted-foreground">قم بربط موقعك الخاص بنظام QIROX السحابي</p>
          </div>
          <Button onClick={() => createKeyMutation.mutate()} disabled={createKeyMutation.isPending}>
            {createKeyMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Key className="mr-2 h-4 w-4" />}
            إنشاء مفتاح API جديد
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                خطوات الربط السريع
              </CardTitle>
              <CardDescription>اتبع التعليمات لربط متجرك الخارجي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">1. تثبيت الحزمة (SDK)</p>
                <div className="bg-muted p-2 rounded-md flex justify-between items-center">
                  <code className="text-xs">npm install @qirox/connect</code>
                  <Button size="icon" variant="ghost" onClick={() => copyToClipboard("npm install @qirox/connect", "npm")}>
                    {copyKey === "npm" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">2. نموذج الكود الأساسي</p>
                <div className="bg-muted p-2 rounded-md relative group">
                  <pre className="text-xs overflow-x-auto">{sdkSnippet}</pre>
                  <Button size="icon" variant="ghost" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copyToClipboard(sdkSnippet, "code")}>
                    {copyKey === "code" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                مفاتيح الوصول النشطة
              </CardTitle>
              <CardDescription>تحكم في مفاتيح API الخاصة بك</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin" /></div>
              ) : keys?.length === 0 ? (
                <p className="text-sm text-center text-muted-foreground py-8">لا يوجد مفاتيح نشطة حالياً</p>
              ) : (
                <div className="space-y-4">
                  {keys?.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{key.name}</p>
                        <code className="text-xs text-muted-foreground">{key.key.substring(0, 10)}****************</code>
                      </div>
                      <Button size="icon" variant="outline" onClick={() => copyToClipboard(key.key, key.id)}>
                        {copyKey === key.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  