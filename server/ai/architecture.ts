/**
 * DSL Interpreter - Converts AI-generated JSON into React/Tailwind code
 */
export function interpretDSL(structure: any): string {
  const { type, content, styles, attributes } = structure;
  
  if (type === "container") {
    return `<div class="${styles?.join(" ") || ""}" ${attributes?.join(" ") || ""}>${content.map((child: any) => interpretDSL(child)).join("")}</div>`;
  }
  
  if (type === "section") {
    return `<section class="py-16 ${styles?.join(" ") || ""}" ${attributes?.join(" ") || ""}>${content.map((child: any) => interpretDSL(child)).join("")}</section>`;
  }
  
  if (type === "grid") {
    return `<div class="grid ${styles?.join(" ") || ""}" ${attributes?.join(" ") || ""}>${content.map((child: any) => interpretDSL(child)).join("")}</div>`;
  }

  if (type === "flex") {
    return `<div class="flex ${styles?.join(" ") || ""}" ${attributes?.join(" ") || ""}>${content.map((child: any) => interpretDSL(child)).join("")}</div>`;
  }
  
  if (type === "text") {
    return `<${structure.tag || "p"} class="${styles?.join(" ") || ""}">${content}</${structure.tag || "p"}>`;
  }
  
  if (type === "button") {
    return `<button class="hover-elevate active-elevate-2 px-6 py-2 rounded-md transition-all font-medium ${styles?.join(" ") || ""}">${content}</button>`;
  }
  
  if (type === "image") {
    return `<img src="${attributes?.src || ""}" alt="${attributes?.alt || ""}" class="rounded-xl shadow-lg object-cover ${styles?.join(" ") || ""}" />`;
  }

  if (type === "card") {
    return `<div class="bg-card text-card-foreground rounded-xl border shadow-sm p-6 hover-elevate transition-all ${styles?.join(" ") || ""}">
      ${content.map((child: any) => interpretDSL(child)).join("")}
    </div>`;
  }

  if (type === "badge") {
    return `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary ${styles?.join(" ") || ""}">${content}</span>`;
  }
  
  return "";
}

/**
 * Code Generator - Converts text description into JSON structure
 */
export function generateJSONFromPrompt(prompt: string) {
  const p = prompt.toLowerCase();
  
  if (p.includes("عقارات") || p.includes("real estate")) {
    return {
      type: "container",
      styles: ["min-h-screen", "bg-background"],
      content: [
        {
          type: "section",
          styles: ["bg-white/80", "backdrop-blur-md", "sticky", "top-0", "z-50", "border-b"],
          content: [
            {
              type: "container",
              styles: ["max-w-7xl", "mx-auto", "px-6", "flex", "justify-between", "items-center", "h-20"],
              content: [
                { type: "flex", styles: ["items-center", "gap-2"], content: [
                  { type: "text", tag: "span", content: "QIROX", styles: ["text-2xl", "font-black", "tracking-tighter", "text-primary"] },
                  { type: "badge", content: "AI Powered" }
                ]},
                { type: "flex", styles: ["gap-4"], content: [
                  { type: "button", content: "Sign In", styles: ["variant-ghost"] },
                  { type: "button", content: "List Property", styles: ["bg-primary", "text-white", "shadow-lg", "shadow-primary/20"] }
                ]}
              ]
            }
          ]
        },
        {
          type: "section",
          styles: ["relative", "overflow-hidden", "bg-slate-900", "text-white", "py-32"],
          content: [
            {
              type: "container",
              styles: ["max-w-7xl", "mx-auto", "px-6", "relative", "z-10"],
              content: [
                { type: "text", tag: "h1", content: "The Future of Real Estate is Here", styles: ["text-6xl", "md:text-7xl", "font-black", "tracking-tight", "mb-8", "leading-tight"] },
                { type: "text", tag: "p", content: "Discover premium properties with QIROX's autonomous search engine. Precise, fast, and entirely local.", styles: ["text-xl", "text-slate-300", "max-w-2xl", "mb-12", "leading-relaxed"] },
                { type: "flex", styles: ["gap-4"], content: [
                  { type: "button", content: "Start Exploring", styles: ["bg-primary", "text-white", "text-lg", "px-10", "py-5", "rounded-xl"] },
                  { type: "button", content: "How it Works", styles: ["bg-white/10", "backdrop-blur-sm", "text-white", "text-lg", "px-10", "py-5", "rounded-xl", "border", "border-white/20"] }
                ]}
              ]
            }
          ]
        },
        {
          type: "section",
          styles: ["bg-slate-50"],
          content: [
            {
              type: "container",
              styles: ["max-w-7xl", "mx-auto", "px-6"],
              content: [
                { type: "text", tag: "h2", content: "Featured Collections", styles: ["text-3xl", "font-bold", "mb-12"] },
                {
                  type: "grid",
                  styles: ["grid-cols-1", "md:grid-cols-3", "gap-10"],
                  content: [
                    { type: "card", content: [
                      { type: "image", attributes: { src: "https://images.unsplash.com/photo-1600585154340-be6199f7d009", alt: "Luxury Villa" }, styles: ["h-64", "w-full", "mb-6"] },
                      { type: "badge", content: "Featured", styles: ["mb-3"] },
                      { type: "text", tag: "h3", content: "The Glass House", styles: ["text-xl", "font-bold", "mb-2"] },
                      { type: "text", tag: "p", content: "Modern architecture meets nature in this stunning retreat.", styles: ["text-gray-500", "text-sm", "mb-6"] },
                      { type: "flex", styles: ["justify-between", "items-center"], content: [
                        { type: "text", tag: "span", content: "$4,250,000", styles: ["text-xl", "font-black", "text-primary"] },
                        { type: "button", content: "View Details", styles: ["variant-outline", "size-sm"] }
                      ]}
                    ]},
                    { type: "card", content: [
                      { type: "image", attributes: { src: "https://images.unsplash.com/photo-1600607687940-4ad236f617a1", alt: "Skyline Penthouse" }, styles: ["h-64", "w-full", "mb-6"] },
                      { type: "badge", content: "New", styles: ["mb-3", "bg-green-100", "text-green-700"] },
                      { type: "text", tag: "h3", content: "Skyline Penthouse", styles: ["text-xl", "font-bold", "mb-2"] },
                      { type: "text", tag: "p", content: "Experience the city from the highest point of luxury.", styles: ["text-gray-500", "text-sm", "mb-6"] },
                      { type: "flex", styles: ["justify-between", "items-center"], content: [
                        { type: "text", tag: "span", content: "$8,900,000", styles: ["text-xl", "font-black", "text-primary"] },
                        { type: "button", content: "View Details", styles: ["variant-outline", "size-sm"] }
                      ]}
                    ]},
                    { type: "card", content: [
                      { type: "image", attributes: { src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b", alt: "Coastal Retreat" }, styles: ["h-64", "w-full", "mb-6"] },
                      { type: "badge", content: "Ocean Front", styles: ["mb-3", "bg-blue-100", "text-blue-700"] },
                      { type: "text", tag: "h3", content: "Coastal Retreat", styles: ["text-xl", "font-bold", "mb-2"] },
                      { type: "text", tag: "p", content: "Wake up to the sound of waves in this serene paradise.", styles: ["text-gray-500", "text-sm", "mb-6"] },
                      { type: "flex", styles: ["justify-between", "items-center"], content: [
                        { type: "text", tag: "span", content: "$2,100,000", styles: ["text-xl", "font-black", "text-primary"] },
                        { type: "button", content: "View Details", styles: ["variant-outline", "size-sm"] }
                      ]}
                    ]}
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  }
  
  return {
    type: "container",
    styles: ["p-20", "text-center", "bg-background", "min-h-screen", "flex", "flex-col", "justify-center", "items-center"],
    content: [
      { type: "badge", content: "Generation Successful", styles: ["mb-6"] },
      { type: "text", tag: "h2", content: "Design Engine Online", styles: ["text-5xl", "font-black", "tracking-tight", "mb-4"] },
      { type: "text", tag: "p", content: `System is ready to build: "${prompt}"`, styles: ["text-xl", "text-muted-foreground", "mb-10", "max-w-md"] },
      { type: "button", content: "Return to Console", styles: ["bg-primary", "text-white", "px-8", "py-4", "rounded-xl", "shadow-xl", "shadow-primary/20"] }
    ]
  };
}
