export const siteTemplates = {
  landing_page: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow-sm p-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold text-primary">BrandName</h1>
          <div class="space-x-4">
            <a href="#" class="text-gray-600">Home</a>
            <a href="#" class="text-gray-600">About</a>
            <a href="#" class="bg-primary text-white px-4 py-2 rounded-md">Contact</a>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto mt-20 text-center">
        <h2 class="text-5xl font-extrabold text-gray-900 mb-6">Welcome to Your AI Website</h2>
        <p class="text-xl text-gray-600 mb-8">This page was generated locally using QIROX AI Engine.</p>
        <button class="bg-primary text-white text-lg px-8 py-4 rounded-lg hover-elevate active-elevate-2">Get Started</button>
      </main>
    </div>
  `,
  ecommerce: `
    <div class="bg-white">
      <header class="border-b p-6">
        <h1 class="text-2xl font-bold">QIROX Store</h1>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
        {[1,2,3].map(i => (
          <div key={i} class="border rounded-lg p-4 hover-elevate">
            <div class="h-48 bg-gray-200 rounded-md mb-4"></div>
            <h3 class="text-lg font-semibold">Product Name \${i}</h3>
            <p class="text-primary font-bold mt-2">199.00 SAR</p>
            <button class="w-full mt-4 bg-black text-white py-2 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  `
};

export function generateFromPrompt(prompt: string) {
  const p = prompt.toLowerCase();
  if (p.includes("متجر") || p.includes("store") || p.includes("ecommerce")) {
    return siteTemplates.ecommerce;
  }
  return siteTemplates.landing_page;
}