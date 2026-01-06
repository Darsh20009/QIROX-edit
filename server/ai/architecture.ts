/**
 * DSL Interpreter - Converts AI-generated JSON into React/Tailwind code
 */
export function interpretDSL(structure: any): string {
  const { type, content, styles } = structure;
  
  if (type === "container") {
    return `<div class="${styles?.join(" ") || ""}">${content.map((child: any) => interpretDSL(child)).join("")}</div>`;
  }
  
  if (type === "text") {
    return `<${structure.tag || "p"} class="${styles?.join(" ") || ""}">${content}</${structure.tag || "p"}>`;
  }
  
  if (type === "button") {
    return `<button class="hover-elevate active-elevate-2 ${styles?.join(" ") || ""}">${content}</button>`;
  }
  
  return "";
}

/**
 * Code Generator - Converts text description into JSON structure (Simulated)
 */
export function generateJSONFromPrompt(prompt: string) {
  // This logic simulates the "Transformer" output
  const p = prompt.toLowerCase();
  
  if (p.includes("عقارات") || p.includes("real estate")) {
    return {
      type: "container",
      styles: ["min-h-screen", "bg-gray-50", "p-8"],
      content: [
        { type: "text", tag: "h1", content: "عقارات كيو روكس المميزة", styles: ["text-4xl", "font-bold", "text-primary", "mb-4"] },
        { type: "text", tag: "p", content: "اعثر على بيت أحلامك بسهولة مع ذكاء QIROX الاصطناعي", styles: ["text-lg", "text-gray-600", "mb-8"] },
        { type: "button", content: "تصفح العقارات الآن", styles: ["bg-primary", "text-white", "px-6", "py-3", "rounded-md"] }
      ]
    };
  }
  
  // Default fallback
  return {
    type: "container",
    styles: ["p-10", "text-center"],
    content: [
      { type: "text", tag: "h2", content: "صفحة ذكية مولدة آلياً", styles: ["text-2xl", "font-bold"] },
      { type: "button", content: "ابدأ الآن", styles: ["mt-4", "bg-black", "text-white", "px-4", "py-2"] }
    ]
  };
}
