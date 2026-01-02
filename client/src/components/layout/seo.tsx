import { BRAND } from "@shared/branding";

export function SEO({ title, description, image }: { title?: string; description?: string; image?: string }) {
  const pageTitle = title ? `${title} | ${BRAND.name}` : `${BRAND.name} - ${BRAND.slogan}`;
  const pageDesc = description || BRAND.copy.hero.subtitle;
  
  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}
