# QIROX Design Guidelines

## Design Approach
**System-Based**: Linear + Vercel hybrid - modern B2B SaaS aesthetic emphasizing clarity, precision, and professional restraint. This aligns with QIROX's human-driven, anti-hype philosophy and complex enterprise workflows.

## Core Design Principles

### 1. Typography
- **Primary**: Inter or similar (SF Pro, Geist)
- **Hierarchy**: 
  - Hero: 48-64px, font-weight-700
  - H1: 36-42px, font-weight-600
  - H2: 28-32px, font-weight-600
  - H3: 20-24px, font-weight-500
  - Body: 15-16px, font-weight-400
  - Small: 13-14px, font-weight-400
- **Line heights**: 1.2 for headings, 1.6 for body
- **Letter spacing**: Tight (-0.02em) for large headings

### 2. Layout System
**Spacing primitives**: Use Tailwind units of **2, 3, 4, 6, 8, 12, 16, 20, 24**
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24 (desktop), py-12 (mobile)
- Card gaps: gap-6 to gap-8
- Container: max-w-7xl with px-6

### 3. Component Library

**Navigation**
- Minimal top nav: Logo left, primary links center, CTA right
- Dashboard sidebar: 240px fixed width, collapsed to 64px icons
- Breadcrumbs for deep navigation
- Tab navigation for section switching

**Buttons**
- Primary: solid, medium weight, px-6 py-2.5
- Secondary: outlined, same padding
- Ghost: text-only for tertiary actions
- Sizes: sm (px-4 py-2), md (px-6 py-2.5), lg (px-8 py-3)

**Cards**
- Border-based (no heavy shadows)
- Subtle hover: border emphasis or slight lift
- Padding: p-6 to p-8
- Rounded: rounded-lg to rounded-xl

**Forms**
- Input height: h-10 to h-11
- Labels above inputs, weight-500
- Helper text: text-sm below
- Error states: border + text indication
- Group related fields visually

**Data Display**
- Tables: minimal borders, hover rows, sticky headers
- Stats cards: large numbers, small labels
- Status badges: small, rounded-full, subtle backgrounds
- Timeline: left-aligned, connected dots

**Dashboard Elements**
- Widget cards with clear titles
- KPI displays: large number + small change indicator
- Quick action buttons group
- Recent activity feeds
- Charts: minimal decoration, clear data

### 4. Marketing Website Specifics

**Home Page**
- Hero: Full-width, centered content, NO large background image (text-focused statement)
- Decision Flow: Interactive section replacing traditional features
- Social proof: Logo grid or stat cards
- Feature sections: 2-column alternating (text + UI screenshot/diagram)
- Pricing: Comparison table
- Final CTA: Centered, high-contrast section

**Visual Approach**
- Product screenshots > stock imagery
- UI diagrams/flowcharts for "How it Works"
- Subtle gradients or mesh backgrounds only
- Monochromatic with strategic accent use

### 5. Multi-Column Usage
- Feature grids: 3 columns desktop, 1 mobile
- Pricing tables: side-by-side comparison
- Dashboard widgets: 2-3 column responsive grid
- Form sections: 2 columns for related fields (desktop only)

### 6. Animations
**Minimal and purposeful only:**
- Micro-interactions: button hovers, checkbox checks
- Page transitions: subtle fade (100ms)
- Loading states: skeleton screens or spinners
- NO scroll animations, parallax, or decorative motion

### 7. Images

**Marketing Site:**
- Hero: NO large hero image - use bold typography statement
- Product sections: Clean UI screenshots with subtle shadow/border
- Team/About: Professional headshots if included
- Case studies: Project preview images

**Dashboard/Platform:**
- Empty states: Simple illustrations or icons
- Avatars: Circle, 32-40px typical
- File previews: Thumbnails in grids

## Page-Specific Layouts

**Marketing Pages**
- Home: Statement hero (text-focused) → Decision flow → Features (2-col) → Pricing → CTA
- Product pages: Hero statement → Visual demo → Feature breakdown → Integration showcase
- Case studies: Hero with client logo → Challenge/Solution → Results (metrics) → Testimonial

**Dashboard**
- Left sidebar nav (collapsible)
- Top bar: Context + actions + profile
- Main: Page title + tabs/filters + content grid/table
- Right panel: Details/context (contextual)

**Builder Interface**
- Three-panel: Left (blocks/pages tree) + Center (canvas) + Right (properties)
- Top toolbar: Save/publish/preview
- Bottom status bar

## Critical Constraints
- No forced viewport heights except hero (80-90vh max)
- Consistent vertical rhythm: py-16/py-20/py-24
- Professional restraint: avoid over-designed elements
- Clarity over cleverness: straightforward patterns
- Mobile-first responsive: stack columns, expand touch targets

**Brand Voice in Design**: Clean, confident, precise - embodying "Build systems. Stay human."