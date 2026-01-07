import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Trash2, 
  Copy, 
  Type, 
  CaseSensitive, 
  Search,
  Hash
} from "lucide-react";

export default function TextProcessingTool() {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const handleAction = (action: string) => {
    let result = text;
    switch (action) {
      case "uppercase":
        result = text.toUpperCase();
        break;
      case "lowercase":
        result = text.toLowerCase();
        break;
      case "capitalize":
        result = text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        break;
      case "remove-spaces":
        result = text.replace(/\s+/g, ' ').trim();
        break;
      case "remove-newlines":
        result = text.replace(/\n+/g, ' ');
        break;
      case "count-chars":
        toast({ title: "Character Count", description: `Length: ${text.length} characters` });
        return;
      case "count-words":
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        toast({ title: "Word Count", description: `Words: ${words.length}` });
        return;
      case "clear":
        setText("");
        return;
      case "copy":
        navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard" });
        return;
    }
    setText(result);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black flex items-center gap-3">
                <FileText className="text-primary" />
                Text Processing Tool
              </h1>
              <p className="text-muted-foreground font-medium">Professional text manipulation and analysis utility</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleAction("copy")} className="gap-2">
                <Copy className="w-4 h-4" /> Copy
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleAction("clear")} className="gap-2 text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4" /> Clear
              </Button>
            </div>
          </header>

          <Card className="border-border/50 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <Textarea
                placeholder="Paste or type your text here..."
                className="min-h-[400px] border-0 focus-visible:ring-0 p-6 text-base resize-none bg-background font-mono"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="secondary" className="justify-start gap-2 h-11" onClick={() => handleAction("uppercase")}>
              <Type className="w-4 h-4" /> UPPERCASE
            </Button>
            <Button variant="secondary" className="justify-start gap-2 h-11" onClick={() => handleAction("lowercase")}>
              <CaseSensitive className="w-4 h-4" /> lowercase
            </Button>
            <Button variant="secondary" className="justify-start gap-2 h-11" onClick={() => handleAction("capitalize")}>
              <Type className="w-4 h-4" /> Capitalize
            </Button>
            <Button variant="secondary" className="justify-start gap-2 h-11" onClick={() => handleAction("remove-spaces")}>
              <Search className="w-4 h-4" /> Trim Spaces
            </Button>
            <Button variant="outline" className="justify-start gap-2 h-11" onClick={() => handleAction("count-chars")}>
              <Hash className="w-4 h-4" /> Count Chars
            </Button>
            <Button variant="outline" className="justify-start gap-2 h-11" onClick={() => handleAction("count-words")}>
              <Hash className="w-4 h-4" /> Count Words
            </Button>
            <Button variant="outline" className="justify-start gap-2 h-11" onClick={() => handleAction("remove-newlines")}>
              <FileText className="w-4 h-4" /> One Line
            </Button>
          </div>

          <div className="flex items-center gap-6 p-4 bg-muted/30 rounded-xl border border-border/50 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Characters: {text.length}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Words: {text.trim() === "" ? 0 : text.trim().split(/\s+/).length}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Lines: {text.trim() === "" ? 0 : text.split('\n').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
