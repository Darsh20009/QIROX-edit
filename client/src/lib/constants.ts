import { Store, Coffee, GraduationCap, ShieldCheck, Zap, Globe, HeartHandshake, CreditCard, Apple, Landmark, Wallet, Layers, Rocket } from "lucide-react";
import { SiGoogle, SiApplepay, SiStc } from "react-icons/si";

export const PARTNERS = [
  { name: "PayTabs", icon: CreditCard, color: "text-blue-600" },
  { name: "Moyasar", icon: Wallet, color: "text-emerald-600" },
  { name: "Tabby", icon: Layers, color: "text-pink-500" },
  { name: "Tamara", icon: Zap, color: "text-orange-500" },
  { name: "Google", icon: SiGoogle, color: "text-blue-500" },
  { name: "Al-Rajhi", icon: Landmark, color: "text-blue-800" },
  { name: "Apple Pay", icon: SiApplepay, color: "text-black dark:text-white" },
  { name: "STC Pay", icon: SiStc, color: "text-purple-600" },
  { name: "التعاونية", icon: ShieldCheck, color: "text-green-700" },
];

export const PRICING_PLANS = {
  stores: {
    title: "المتاجر الإلكترونية",
    icon: Store,
    plans: [
      {
        name: "خطة مدى الحياة",
        price: "4999",
        duration: "مدى الحياة",
        features: [
          "تحديثات وتطويرات مستمرة",
          "التكلفة كاملة علينا",
          "ملكية كاملة للكود",
          "دعم فني VIP",
          "استضافة سحابية فائقة"
        ],
        highlight: true
      },
      {
        name: "الخطة السنوية",
        price: "699",
        duration: "سنوياً",
        features: [
          "الضمان الذهبي",
          "دومين باسم الشركة",
          "تحديثات دورية",
          "دعم فني متكامل",
          "كل المميزات الأساسية"
        ]
      }
    ]
  },
  hospitality: {
    title: "المطاعم والكافيهات",
    icon: Coffee,
    plans: [
      {
        name: "خطة مدى الحياة",
        price: "6999",
        duration: "مدى الحياة",
        features: [
          "نظام نقاط بيع متكامل",
          "إدارة المخزون والموردين",
          "تطويرات مخصصة",
          "دعم فني موقعي",
          "أتمتة كاملة للعمليات"
        ],
        highlight: true
      },
      {
        name: "الخطة السنوية",
        price: "599",
        renewalPrice: "799",
        duration: "للسنة الأولى",
        features: [
          "التجديد بـ 799 ريال",
          "دعم فني 24/7",
          "تقارير ذكاء أعمال",
          "تكامل مع تطبيقات التوصيل",
          "ضمان استمرارية الخدمة"
        ]
      }
    ]
  },
  education: {
    title: "أنظمة التعليم",
    icon: GraduationCap,
    custom: true,
    description: "حلول تعليمية ذكية مخصصة للمدارس والجامعات والمنصات التدريبية.",
    cta: "تواصل لطلب عرض سعر خاص"
  }
};
