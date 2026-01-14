export type Language = "ar" | "en";

export interface Translation {
  heroTitle: string;
  heroSubtitle: string;
  exploreWork: string;
  startDialogue: string;
  philosophy: string;
  work: string;
  dialogue: string;
  // Add more as needed
}

export const translations: Record<Language, Translation> = {
  ar: {
    heroTitle: "التعقيد الإنساني.",
    heroSubtitle: "نحن لا نبني برمجيات. نحن نصيغ بيئات تتطور فيها الاستخبارات بشكل طبيعي. ابتعاد عن الضجيج الرقمي.",
    exploreWork: "استكشف أعمالنا",
    startDialogue: "ابدأ حواراً",
    philosophy: "الفلسفة",
    work: "الأعمال",
    dialogue: "الحوار",
  },
  en: {
    heroTitle: "Human Complexity.",
    heroSubtitle: "We don't build software. We craft environments where intelligence evolves naturally. A departure from the digital noise.",
    exploreWork: "Explore our work",
    startDialogue: "Start a Dialogue",
    philosophy: "Philosophy",
    work: "Work",
    dialogue: "Dialogue",
  }
};
