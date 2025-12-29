# QIROX Design Guidelines

## Design Approach
**System-Based**: Linear + Vercel hybrid with premium polish - modern B2B/B2C SaaS aesthetic emphasizing clarity, sophistication, and professional restraint. Competes with Shopify and Zid while maintaining "Build systems. Stay human." philosophy.

## Color System
- **Deep Black**: #0A0A0A (backgrounds, primary text)
- **Pure White**: #FFFFFF (contrast elements, cards)
- **Emerald Accent**: #047857 (primary actions, highlights)
- **Emerald Variants**: #065F46 (hover), #10B981 (success states)
- **Grays**: #F9FAFB (subtle backgrounds), #E5E7EB (borders), #6B7280 (secondary text)
- **Subtle Gradients**: Linear gradients from deep black to #1A1A1A for premium depth

## Typography (Inter Font Family)
**Hierarchy**:
- Hero: 56-72px, font-weight-700, tracking-tight, leading-none
- H1: 40-48px, font-weight-600, tracking-tight
- H2: 32-36px, font-weight-600
- H3: 24-28px, font-weight-500
- Body Large: 18px, font-weight-400, leading-relaxed
- Body: 16px, font-weight-400, leading-normal
- Small: 14px, font-weight-400
- Captions: 12px, font-weight-500, uppercase, tracking-wide

**RTL Support**: Full bidirectional text support, mirrored layouts for Arabic (flip navigation, sidebars, icons)

## Layout System
**Spacing**: Tailwind units of **2, 3, 4, 6, 8, 12, 16, 20, 24, 32**
- Hero sections: py-24 to py-32
- Content sections: py-16 to py-20
- Component padding: p-6 to p-8
- Card gaps: gap-6 to gap-8
- Container: max-w-7xl, px-6 lg:px-8

## Component Library

**Navigation**
- Top bar: Backdrop blur, border-b with subtle shadow
- Logo left/right (RTL), primary links center, CTA + profile right/left
- Sticky on scroll with elevated shadow
- Mobile: Slide-in drawer with backdrop overlay

**Buttons**
- Primary: Emerald bg, white text, rounded-lg, px-6 py-3, medium shadow
- Secondary: Border emerald, emerald text, same sizing
- Ghost: Emerald text only, hover bg emerald/10
- On images: Backdrop blur-lg, bg-white/90, text-black, no special hover (inherent states)

**Cards**
- Sophisticated borders with subtle inner shadow
- Hover: Lift (translate-y-1) + shadow-xl, 200ms transition
- Padding: p-8
- Rounded: rounded-xl
- Premium variant: Gradient border (emerald to transparent)

**Forms**
- Input height: h-12
- Rounded: rounded-lg
- Border focus: emerald ring
- Labels: font-weight-500, mb-2
- Multi-column desktop: 2-col for related fields

**Data Display**
- Tables: Hover rows with emerald/5 bg, sticky headers
- Stats: Large numbers (32-40px), emerald accent for changes
- Badges: rounded-full, emerald/10 bg, emerald text, px-3 py-1
- Charts: Emerald primary color, minimal decoration

## Marketing Website Structure

**Home Page** (7-8 sections):
1. **Hero**: Full-width premium image (subtle gradient overlay), centered content, large heading, subheading, dual CTAs (Primary emerald + Secondary ghost), trust indicators below (logo grid or stats)
2. **Platform Overview**: 3-column feature grid with icons, titles, descriptions
3. **Visual Product Demo**: 2-column alternating sections with UI screenshots + descriptions
4. **Target Industries**: E-commerce, Restaurant, Education cards with imagery
5. **Multi-Tenant Showcase**: Dashboard preview emphasizing tenant management
6. **Social Proof**: Customer logos, testimonial cards with avatars
7. **Pricing**: Comparison table with emerald highlights
8. **Final CTA**: Gradient background section, centered, high contrast

**Visual Treatment**:
- Hero: Premium lifestyle/platform imagery with 40% black gradient overlay
- Product sections: Clean UI screenshots with elegant drop shadows
- Industry cards: Representative imagery (storefront, restaurant, classroom)
- Background: Subtle mesh gradients (black to dark gray) for depth

## Images Strategy
- **Hero Image**: Large, premium, professional - represents platform sophistication
- **Feature Sections**: UI screenshots showing actual platform interfaces
- **Industry Cards**: High-quality photography representing each vertical
- **Team/About**: Professional photography with emerald accent overlays
- **Empty States**: Minimalist illustrations in emerald monochrome

## Animations
**Strategic and Smooth**:
- Page elements: Fade-in with slide-up (staggered 50ms), 300ms ease-out
- Buttons: Scale 1.02 on hover, 200ms
- Cards: Lift + shadow on hover, 200ms
- Loading: Emerald gradient spinner
- NO scroll-triggered animations, keep performance-focused

## RTL Considerations
- Mirror all layouts: Navigation, sidebars, card layouts, forms
- Text alignment: right for Arabic, left for English
- Icons: Flip directional icons (arrows, chevrons)
- Reading flow: Right-to-left content consumption
- Spacing: Maintain consistent gaps regardless of direction

## Dashboard Platform
- **Sidebar**: 260px, dark bg (#0A0A0A), emerald active states, collapsible to icons
- **Top Bar**: Tenant switcher, breadcrumbs, search, profile (with RTL support)
- **Main Area**: White bg, page title + actions, responsive content grid
- **Widgets**: 2-3 column grid, elevated cards, emerald accents for KPIs

## Critical Quality Standards
- Generous whitespace for premium feel
- Consistent emerald accent usage (never overuse)
- Professional imagery throughout
- Subtle gradients for depth, not decoration
- Mobile-first responsive with elevated touch targets
- Complete, polished sections - no sparse layouts
- Sophisticated without being flashy
- Trustworthy, modern, innovative aesthetic

**Brand Essence**: Premium clarity, human-centered technology, sophisticated restraint