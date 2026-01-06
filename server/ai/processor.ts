/**
 * Smart Processing Logic - Advanced Semantic Analysis
 */

export interface SemanticIntent {
  category: "real_estate" | "ecommerce" | "blog" | "corporate" | "unknown";
  tone: "professional" | "playful" | "minimalist" | "bold";
  features: string[];
}

export function analyzeSemanticIntent(prompt: string): SemanticIntent {
  const p = prompt.toLowerCase();
  
  let intent: SemanticIntent = {
    category: "unknown",
    tone: "professional",
    features: []
  };

  // Category Detection
  if (p.includes("عقار") || p.includes("real estate") || p.includes("بيت") || p.includes("شقة")) {
    intent.category = "real_estate";
  } else if (p.includes("متجر") || p.includes("بيع") || p.includes("تسوق") || p.includes("store")) {
    intent.category = "ecommerce";
  } else if (p.includes("شركة") || p.includes("مؤسسة") || p.includes("business")) {
    intent.category = "corporate";
  }

  // Tone Detection
  if (p.includes("بسيط") || p.includes("هادئ") || p.includes("minimal")) {
    intent.tone = "minimalist";
  } else if (p.includes("جريء") || p.includes("قوي") || p.includes("bold")) {
    intent.tone = "bold";
  }

  // Feature Extraction
  if (p.includes("خريطة") || p.includes("map")) intent.features.push("map-integration");
  if (p.includes("بحث") || p.includes("search")) intent.features.push("advanced-search");
  if (p.includes("دفع") || p.includes("pay")) intent.features.push("payment-gateway");

  return intent;
}

import { performSmartReasoning, getSmartRecommendations } from "./thinking";

/**
 * Smart Processor - Coordinates intent, reasoning, and generation
 */
export function processSmartRequest(prompt: string) {
  console.log(`[Smart Processor] Analyzing: "${prompt}"`);
  const intent = analyzeSemanticIntent(prompt);
  
  // New Thinking Layer
  const reasoning = performSmartReasoning(intent);
  const recommendations = getSmartRecommendations(intent.category);
  
  return {
    intent,
    reasoning,
    recommendations,
    executionPlan: {
      template: intent.category === "unknown" ? "landing_page" : intent.category,
      colorPalette: intent.tone === "bold" ? "vibrant" : "corporate",
      layoutType: "grid-system",
      suggestedComponents: recommendations
    }
  };
}
