import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Sparkles, Code, Play } from "lucide-react";

export default function AIDashboard() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt) {
      toast({ title: "برجاء إدخال وصف للموقع", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    try {
      const res = await apiRequest("POST", "/api/ai/generate-site", { prompt });
      const data = await res.json();
      setGeneratedCode(data.content);
      toast({ title: "تم توليد الموقع بنجاح محلياً" });
    } catch (error) {
      toast({ title: "فشل في توليد الموقع", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="text-primary" />
              QIROX AI Dashboard
            </h1>
            <p className="text-muted-foreground">توليد وإدارة المواقع باستخدام الذكاء الاصطناعي المحلي</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle>موجه الأوامر (AI Prompt)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="مثال: اصنع لي صفحة هبوط لشركة عقارات فاخرة باللون الذهبي..."
                  className="min-h-[200px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button 
                  className="w-full h-12 text-lg font-bold" 
                  disabled={isGenerating}
                  onClick={handleGenerate}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      جاري التوليد محلياً...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      ابدأ التوليد الذكي
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-elevate overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>معاينة الكود (Live Editor)</CardTitle>
                <Code className="text-muted-foreground w-5 h-5" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-slate-950 p-4 font-mono text-sm text-slate-300 min-h-[300px] max-h-[500px] overflow-auto">
                  {generatedCode ? (
                    <pre className="whitespace-pre-wrap">{generatedCode}</pre>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-600 italic">
                      الكود المولد سيظهر هنا...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {generatedCode && (
            <Card className="mt-8 overflow-hidden border-primary/20">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="text-lg">معاينة حية (Live Preview)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div 
                  className="w-full min-h-[400px] bg-white text-black overflow-auto p-4"
                  dangerouslySetInnerHTML={{ __html: generatedCode }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
