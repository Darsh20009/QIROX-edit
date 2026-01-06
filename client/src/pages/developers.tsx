import { Layout } from "@/components/layout/layout";
import { SEO } from "@/components/layout/seo";
import { motion } from "framer-motion";
import { Code2, Terminal, Cpu, Blocks, Rocket, BookOpen, Key, Webhook, Box, MessageSquareCode, Settings2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const developerTools = [
  {
    title: "واجهة البرمجة التطبيقية (API)",
    desc: "وثائق متكاملة لربط متجرك أو نظامك بتطبيقات خارجية بسهولة.",
    icon: Webhook,
    color: "text-blue-500",
    badge: "v2.0"
  },
  {
    title: "أدوات التطوير (SDKs)",
    desc: "مكتبات جاهزة بلغات متعددة (Node.js, Python, PHP) لبدء التطوير فوراً.",
    icon: Box,
    color: "text-purple-500",
    badge: "متاح"
  },
  {
    title: "مستكشف البيانات",
    desc: "أداة تفاعلية لتجربة الطلبات البرمجية ومعاينة النتائج بشكل حي.",
    icon: Terminal,
    color: "text-emerald-500",
    badge: "جديد"
  }
];

const codeSnippets = {
  javascript: `fetch('https://api.qirox.com/v1/orders', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    productId: 'qr_12345',
    quantity: 1
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
  python: `import requests

url = "https://api.qirox.com/v1/orders"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "productId": "qr_12345",
    "quantity": 1
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`,
  curl: `curl -X POST https://api.qirox.com/v1/orders \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"productId": "qr_12345", "quantity": 1}'`
};

export default function Developers() {
  return (
    <Layout>
      <SEO title="بوابة المطورين" description="أدوات ووثائق QIROX للمطورين والمبدعين" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-8">
            <Badge variant="outline" className="border-primary/50 text-primary py-2 px-4 rounded-full text-sm font-bold bg-primary/10">
              <Code2 className="w-4 h-4 mr-2" />
              بوابة المطورين والمبدعين
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              ابنِ حلولك الخاصة <br />
              على بنية <span className="text-primary">QIROX</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              نحن نوفر لك الأدوات، الوثائق، والـ API القوي الذي تحتاجه لتحويل أفكارك البرمجية إلى حقيقة في دقائق.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-primary text-white hover:bg-primary/90 h-14 px-8 rounded-xl font-bold gap-2">
                <BookOpen className="w-5 h-5" />
                قراءة الوثائق
              </Button>
              <Button variant="outline" className="border-slate-800 text-white hover:bg-slate-900 h-14 px-8 rounded-xl font-bold gap-2">
                <Github className="w-5 h-5" />
                المستودع البرمجي
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools Grid */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {developerTools.map((tool, i) => (
            <Card key={i} className="border-none shadow-xl rounded-[2.5rem] bg-secondary/20 hover-elevate overflow-hidden transition-all">
              <CardContent className="p-12 space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center ${tool.color} shadow-lg`}>
                    <tool.icon className="w-8 h-8" />
                  </div>
                  <Badge variant="secondary" className="rounded-full px-4">{tool.badge}</Badge>
                </div>
                <h3 className="text-2xl font-black">{tool.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{tool.desc}</p>
                <Button variant="ghost" className="p-0 h-auto font-bold text-primary hover:bg-transparent flex items-center gap-2">
                  استكشف الأداة <ArrowLeft className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Code Explorer */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black">ربط تقني <span className="text-primary">فائق السرعة</span></h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                ابدأ رحلتك البرمجية مع أمثلة جاهزة بلغاتك المفضلة. التكامل مع QIROX تم تصميمه ليكون بديهياً للمطورين.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Key, title: "مفاتيح API آمنة", desc: "إدارة صلاحيات وصول دقيقة لكل خدمة." },
                  { icon: Settings2, title: "أتمتة كاملة", desc: "أكثر من 100 نقطة ربط لجميع العمليات." },
                  { icon: MessageSquareCode, title: "دعم المطورين", desc: "مجتمع نشط ودعم تقني مباشر للمطورين." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-primary">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Tabs defaultValue="javascript" className="w-full">
                <TabsList className="bg-slate-900 border-slate-800 h-14 p-1 rounded-xl mb-4">
                  <TabsTrigger value="javascript" className="rounded-lg data-[state=active]:bg-primary">JavaScript</TabsTrigger>
                  <TabsTrigger value="python" className="rounded-lg data-[state=active]:bg-primary">Python</TabsTrigger>
                  <TabsTrigger value="curl" className="rounded-lg data-[state=active]:bg-primary">cURL</TabsTrigger>
                </TabsList>
                <div className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl">
                  <div className="flex gap-2 p-4 bg-slate-800/50 border-b border-slate-800">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <TabsContent value="javascript" className="mt-0">
                    <pre className="p-8 text-sm font-mono overflow-x-auto text-emerald-400">
                      <code>{codeSnippets.javascript}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="python" className="mt-0">
                    <pre className="p-8 text-sm font-mono overflow-x-auto text-blue-400">
                      <code>{codeSnippets.python}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="curl" className="mt-0">
                    <pre className="p-8 text-sm font-mono overflow-x-auto text-orange-400">
                      <code>{codeSnippets.curl}</code>
                    </pre>
                  </TabsContent>
                </div>
              </Tabs>
              <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 container mx-auto px-6 text-center">
        <div className="bg-primary rounded-[3rem] p-20 space-y-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <h2 className="text-4xl md:text-6xl font-black text-white relative z-10 leading-tight">
            هل أنت جاهز <br /> لإظهار مهاراتك؟
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto relative z-10 font-medium">
            سجل الآن كشريك مطور واحصل على إمكانية الوصول المبكر لأدواتنا القادمة والمشاريع المتميزة.
          </p>
          <div className="flex justify-center gap-6 relative z-10 pt-4">
            <Button className="bg-white text-primary hover:bg-white/90 h-16 px-12 rounded-2xl font-black text-xl shadow-2xl">
              ابدأ الآن مجاناً
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ArrowLeft(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
