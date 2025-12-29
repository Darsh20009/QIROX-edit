import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, CheckCircle2, Store, Coffee, GraduationCap, MessageCircle } from "lucide-react";
import { queryClient, apiRequestJson } from "@/lib/queryClient";
import { WHATSAPP_PAYMENT_LINK, WHATSAPP_PAYMENT_NUMBER } from "@shared/constants";

type PlanType = "stores" | "restaurants" | "education";
type BillingCycle = "monthly" | "6months" | "yearly";

const plans = {
  stores: {
    name: "المتاجر والتطبيقات",
    icon: Store,
    monthly: 100,
    "6months": 500,
    yearly: 899,
  },
  restaurants: {
    name: "الكافيهات والمطاعم",
    icon: Coffee,
    monthly: 179,
    "6months": 599,
    yearly: 1099,
  },
  education: {
    name: "منصات التعليم",
    icon: GraduationCap,
    monthly: 199,
    "6months": 999,
    yearly: 1799,
  },
};

const billingLabels: Record<BillingCycle, string> = {
  monthly: "شهري",
  "6months": "6 أشهر",
  yearly: "سنوي",
};

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [selectedBilling, setSelectedBilling] = useState<BillingCycle>("6months");
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionCreated, setSubscriptionCreated] = useState(false);
  const [createdSubscription, setCreatedSubscription] = useState<{
    planType: string;
    billingCycle: string;
    price: number;
  } | null>(null);
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [user, authLoading, setLocation]);

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار نوع الاشتراك",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await apiRequestJson<{ subscription: { planType: string; billingCycle: string; price: number } }>("POST", "/api/subscriptions", {
        planType: selectedPlan,
        billingCycle: selectedBilling,
      });

      queryClient.invalidateQueries({ queryKey: ["/api", "subscriptions"] });

      setCreatedSubscription({
        planType: selectedPlan,
        billingCycle: selectedBilling,
        price: plans[selectedPlan][selectedBilling],
      });
      setSubscriptionCreated(true);

      toast({
        title: "تم بنجاح!",
        description: "تم إنشاء اشتراكك. تواصل معنا لإتمام الدفع.",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في إنشاء الاشتراك",
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

  const selectedPlanData = selectedPlan ? plans[selectedPlan] : null;

  if (subscriptionCreated && createdSubscription) {
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
              <h1 className="text-xl font-semibold text-foreground" data-testid="text-payment-title">إتمام الدفع</h1>
              <p className="text-sm text-muted-foreground">تواصل معنا عبر الواتساب لإتمام الدفع</p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-6 py-12">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">تم إنشاء اشتراكك بنجاح</CardTitle>
              <CardDescription>
                لديك 14 يوم تجربة مجانية. تواصل معنا لتفعيل الاشتراك الكامل.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">النظام</span>
                  <span className="font-medium">{plans[createdSubscription.planType as PlanType]?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المدة</span>
                  <span className="font-medium">{billingLabels[createdSubscription.billingCycle as BillingCycle]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المبلغ</span>
                  <span className="font-bold text-lg">{createdSubscription.price} ريال</span>
                </div>
              </div>

              <div className="border rounded-lg p-6 text-center space-y-4">
                <MessageCircle className="h-12 w-12 mx-auto text-green-600" />
                <h3 className="font-semibold text-lg">تواصل معنا عبر الواتساب</h3>
                <p className="text-muted-foreground">
                  تواصل معنا على الرقم التالي لإتمام عملية الدفع وتفعيل اشتراكك
                </p>
                <p className="text-xl font-bold direction-ltr" dir="ltr" data-testid="text-whatsapp-number">
                  {WHATSAPP_PAYMENT_NUMBER}
                </p>
                <a
                  href={WHATSAPP_PAYMENT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg" data-testid="button-whatsapp-contact">
                    <MessageCircle className="ml-2 h-5 w-5" />
                    تواصل عبر الواتساب
                  </Button>
                </a>
              </div>

              <div className="flex gap-4">
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full" data-testid="button-go-dashboard">
                    الذهاب للوحة التحكم
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
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
            <h1 className="text-xl font-semibold text-foreground" data-testid="text-subscribe-title">اختر اشتراكك</h1>
            <p className="text-sm text-muted-foreground">ابدأ تجربتك المجانية لمدة 14 يوم</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">1. اختر نوع النظام</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {(Object.entries(plans) as [PlanType, typeof plans.stores][]).map(([key, plan]) => {
                const Icon = plan.icon;
                const isSelected = selectedPlan === key;
                return (
                  <Card
                    key={key}
                    className={`cursor-pointer transition-all ${isSelected ? "ring-2 ring-foreground" : "hover-elevate"}`}
                    onClick={() => setSelectedPlan(key)}
                    data-testid={`card-plan-${key}`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isSelected ? "bg-foreground text-background" : "bg-muted"}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        من {plan.monthly} ريال/شهر
                      </p>
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto mt-3" />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {selectedPlan && (
            <div>
              <h2 className="text-lg font-semibold mb-4">2. اختر مدة الاشتراك</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {(["monthly", "6months", "yearly"] as BillingCycle[]).map((billing) => {
                  const isSelected = selectedBilling === billing;
                  const price = selectedPlanData![billing as keyof typeof selectedPlanData];
                  return (
                    <Card
                      key={billing}
                      className={`cursor-pointer transition-all ${isSelected ? "ring-2 ring-foreground" : "hover-elevate"}`}
                      onClick={() => setSelectedBilling(billing)}
                      data-testid={`card-billing-${billing}`}
                    >
                      <CardContent className="p-6 text-center">
                        <h3 className="font-semibold text-foreground">{billingLabels[billing]}</h3>
                        <p className="text-2xl font-bold text-foreground mt-2">
                          {price} <span className="text-sm font-normal">ريال</span>
                        </p>
                        {billing === "6months" && (
                          <Badge variant="secondary" className="mt-2">الأكثر شعبية</Badge>
                        )}
                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto mt-3" />
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {selectedPlan && (
            <Card>
              <CardHeader>
                <CardTitle>ملخص الاشتراك</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">النظام</span>
                  <span className="font-medium">{selectedPlanData?.name}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">المدة</span>
                  <span className="font-medium">{billingLabels[selectedBilling]}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">السعر</span>
                  <span className="font-bold text-lg">
                    {selectedPlanData![selectedBilling as keyof typeof selectedPlanData]} ريال
                  </span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-4">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>14 يوم تجربة مجانية</span>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleSubscribe}
                    disabled={isLoading}
                    data-testid="button-confirm-subscription"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        جاري التفعيل...
                      </>
                    ) : (
                      "ابدأ التجربة المجانية"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
