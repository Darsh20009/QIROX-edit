import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequestJson, queryClient } from "@/lib/queryClient";
import { Loader2, ArrowLeft, Store, Mail, Phone, MapPin } from "lucide-react";

export default function NewStore() {
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [user, authLoading, setLocation]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameEnChange = (value: string) => {
    setNameEn(value);
    setSlug(generateSlug(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiRequestJson("POST", "/api/stores", {
        name,
        nameEn: nameEn || undefined,
        slug,
        description: description || undefined,
        phone: phone || undefined,
        email: email || undefined,
        address: address || undefined,
      });

      queryClient.invalidateQueries({ queryKey: ["/api/stores"] });

      toast({
        title: "تم بنجاح!",
        description: "تم إنشاء متجرك بنجاح",
      });
      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في إنشاء المتجر",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" data-testid="button-back-dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-foreground" data-testid="text-new-store-title">إنشاء متجر جديد</h1>
            <p className="text-sm text-muted-foreground">أدخل بيانات متجرك</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              بيانات المتجر
            </CardTitle>
            <CardDescription>
              أدخل المعلومات الأساسية لمتجرك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">اسم المتجر (بالعربية) *</Label>
                  <Input
                    id="name"
                    placeholder="متجر أحمد"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    data-testid="input-store-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameEn">اسم المتجر (بالإنجليزية)</Label>
                  <Input
                    id="nameEn"
                    placeholder="Ahmed Store"
                    value={nameEn}
                    onChange={(e) => handleNameEnChange(e.target.value)}
                    dir="ltr"
                    data-testid="input-store-name-en"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">الرابط المختصر *</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">qirox.com/</span>
                  <Input
                    id="slug"
                    placeholder="ahmed-store"
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    required
                    dir="ltr"
                    className="flex-1"
                    data-testid="input-store-slug"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  سيكون رابط متجرك: qirox.com/{slug || "your-store"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف المتجر</Label>
                <Textarea
                  id="description"
                  placeholder="اكتب وصفاً موجزاً عن متجرك ومنتجاتك..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  data-testid="input-store-description"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الجوال</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pr-10"
                      dir="ltr"
                      data-testid="input-store-phone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="store@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-10"
                      dir="ltr"
                      data-testid="input-store-email"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">العنوان</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="الرياض، المملكة العربية السعودية"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="pr-10"
                    data-testid="input-store-address"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading} data-testid="button-create-store">
                  {isLoading ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري الإنشاء...
                    </>
                  ) : (
                    "إنشاء المتجر"
                  )}
                </Button>
                <Link href="/dashboard">
                  <Button type="button" variant="outline" data-testid="button-cancel">
                    إلغاء
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
