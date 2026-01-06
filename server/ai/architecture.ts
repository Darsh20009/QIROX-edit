/**
 * DSL Interpreter - Converts AI-generated JSON into React/Tailwind code
 */
export function interpretDSL(structure: any): string {
  const { type, content, styles, attributes } = structure;
  
  if (type === "container") {
    return `<div class="${styles?.join(" ") || ""}" ${attributes?.join(" ") || ""}>${content.map((child: any) => interpretDSL(child)).join("")}</div>`;
  }
  
  if (type === "section") {
    return `<section class="py-12 ${styles?.join(" ") || ""}" ${attributes?.join(" ") || ""}>${content.map((child: any) => interpretDSL(child)).join("")}</section>`;
  }
  
  if (type === "grid") {
    return `<div class="grid ${styles?.join(" ") || ""}" ${attributes?.join(" ") || ""}>${content.map((child: any) => interpretDSL(child)).join("")}</div>`;
  }
  
  if (type === "text") {
    return `<${structure.tag || "p"} class="${styles?.join(" ") || ""}">${content}</${structure.tag || "p"}>`;
  }
  
  if (type === "button") {
    return `<button class="hover-elevate active-elevate-2 px-6 py-2 rounded-md transition-all ${styles?.join(" ") || ""}">${content}</button>`;
  }
  
  if (type === "image") {
    return `<img src="${attributes?.src || ""}" alt="${attributes?.alt || ""}" class="rounded-lg shadow-md ${styles?.join(" ") || ""}" />`;
  }
  
  return "";
}

/**
 * Code Generator - Converts text description into JSON structure (Simulated Transformer Output)
 */
export function generateJSONFromPrompt(prompt: string) {
  const p = prompt.toLowerCase();
  
  if (p.includes("عقارات") || p.includes("real estate")) {
    return {
      type: "container",
      styles: ["min-h-screen", "bg-gray-50"],
      content: [
        {
          type: "section",
          styles: ["bg-white", "border-b"],
          content: [
            {
              type: "container",
              styles: ["max-w-7xl", "mx-auto", "px-4", "flex", "justify-between", "items-center", "h-16"],
              content: [
                { type: "text", tag: "span", content: "QIROX Real Estate", styles: ["text-xl", "font-bold", "text-primary"] },
                { type: "button", content: "Contact Us", styles: ["bg-primary", "text-white"] }
              ]
            }
          ]
        },
        {
          type: "section",
          styles: ["text-center", "py-20"],
          content: [
            { type: "text", tag: "h1", content: "Find Your Dream Home", styles: ["text-5xl", "font-extrabold", "text-gray-900", "mb-6"] },
            { type: "text", tag: "p", content: "Explore the best properties managed by QIROX AI architecture.", styles: ["text-xl", "text-gray-600", "max-w-2xl", "mx-auto", "mb-10"] },
            { type: "button", content: "Browse Listings", styles: ["bg-primary", "text-white", "text-lg", "px-8", "py-4"] }
          ]
        },
        {
          type: "grid",
          styles: ["max-w-7xl", "mx-auto", "grid-cols-1", "md:grid-cols-3", "gap-8", "px-4"],
          content: [
            { type: "container", styles: ["bg-white", "p-4", "rounded-xl", "shadow-sm", "hover-elevate"], content: [{ type: "text", tag: "h3", content: "Luxury Villa", styles: ["font-bold"] }] },
            { type: "container", styles: ["bg-white", "p-4", "rounded-xl", "shadow-sm", "hover-elevate"], content: [{ type: "text", tag: "h3", content: "Modern Apartment", styles: ["font-bold"] }] },
            { type: "container", styles: ["bg-white", "p-4", "rounded-xl", "shadow-sm", "hover-elevate"], content: [{ type: "text", tag: "h3", content: "Family House", styles: ["font-bold"] }] }
          ]
        }
      ]
    };
  }
  
  // Default fallback for other requests
  return {
    type: "container",
    styles: ["p-10", "text-center"],
    content: [
      { type: "text", tag: "h2", content: "Smart Page Generated Successfully", styles: ["text-3xl", "font-bold", "mb-4"] },
      { type: "text", tag: "p", content: `Your request for "${prompt}" has been processed by the DSL Interpreter.`, styles: ["text-gray-600", "mb-6"] },
      { type: "button", content: "Back to Dashboard", styles: ["bg-primary", "text-white"] }
    ]
  };
}
