import { BRAND } from "@shared/branding";

export function SEO({ title, description, image }: { title?: string; description?: string; image?: string }) {
  const pageTitle = title ? `${title} | ${BRAND.name}` : `${BRAND.name} - ${BRAND.slogan}`;
  const pageDesc = description || BRAND.copy.hero.subtitle;
  const ogImage = image || "https://qirox.replit.app/og-image.png";
  
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={window.location.href} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDesc} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Arabic Support */}
      <meta name="language" content="Arabic" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
}
