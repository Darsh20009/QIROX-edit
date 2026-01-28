# QIROX Project Documentation

## Overview
QIROX is a modular, multi-tenant system built with a security-first and audit-first approach.

## Contact Information
- **Customer Service**: +201155201921
- **Email**: support@qirox.online

## Product Components (QIROX Modules)
- **QIROX Website**: Marketing and Decision Flow.
- **QIROX Core**: Authentication, Tenant Management, and Dashboards.
- **QIROX Build**: Project Kanban and Builder Basic.
- **QIROX Cloud**: Subdomain management and routing logic.
- **QIROX Requests**: Service and development requests.
- **QIROX Ops**: CRM, Support, and Delivery management.
- **QIROX Finance**: Quotes, Invoices, and Payment tracking.
- **QIROX Meet**: Secure internal ZEGO meetings.

## User Roles
- **Visitor**: Unauthenticated user.
- **Client Owner**: Owner of a tenant space.
- **Client Admin/Editor**: Tenant-level management.
- **QIROX Team**: Sales, Support, PM, Specialist, Finance.
- **System Admin**: Platform-wide administrator.

## Principles
- **Human-Driven**: All major actions require human approval (Approval Gate implemented).
- **One System**: Unified design system for Public Site, Platform, and Dashboard.
- **Modular**: Component-based architecture.
- **Multi-Tenant**: Logic-based data isolation per tenant.
- **Audit-First**: Comprehensive logging of all events (USER_LOGIN, PROVISION_PROJECT, etc.).
- **Security-First**: Rate limiting, encryption, and granular permissions.
- **MongoDB Only**: Primary data persistence in MongoDB.
- **Employee-Provisioned**: Projects spaces are created by employees for clients.
- **Internal Meetings**: ZEGO-based internal meetings (QIROX Meet).

## Technical Stack
- **Frontend**: React + Vite + Tailwind CSS + Shadcn UI
- **Backend**: Express + Node.js
- **Database**: MongoDB (Mongoose) + PostgreSQL (Drizzle)
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Animations**: Framer Motion

## Recent Design Updates (January 2026)
### Complete Premium Redesign
- **Hero Section**: Full-screen image banner carousel with 5 rotating slides (6-second intervals)
  - Auto-rotating with customer testimonials on each slide
  - Smooth fade animations with Framer Motion AnimatePresence
  - Slide navigation controls and indicators
- **Color Scheme**: Green/Emerald gradient theme (primary: 160 84% 39% to emerald-600)
- **Visual Effects**: 
  - Dark overlay gradients on hero images
  - Backdrop blur on testimonial cards
  - 3D hover effects on feature cards
  - Gradient stat bars
- **Button Style**: Rounded-full buttons with gradient backgrounds and shadow effects
- **Typography**: Bold 5xl-7xl headings, clear hierarchy with gradient text accents
- **Layout**: Immersive full-screen sections with generous spacing
- **Animations**: 
  - `AnimatePresence`: Smooth slide transitions
  - `animate-marquee`: Partner logos scrolling
  - Staggered card entrance animations
  - Hover scale and shadow effects
- **Key Sections**:
  - Full-screen hero carousel with testimonials
  - Stats bar with animated counters
  - Feature cards with gradient icons
  - 3-step process section
  - Testimonials section (dark theme)
  - CTA section with gradient background
- **Auth Pages**: Split-screen design with hero images and gradient overlays
- **Dashboard**: Gradient stat cards, progress tracking, animated stage indicators
- **Sidebar**: Gradient icons, search bar, notifications panel, upgrade prompt
- **Design Philosophy**: Premium, engaging, impressive - "Build Systems. Stay Human."
