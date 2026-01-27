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
### Creative Redesign
- **Color Scheme**: Purple gradient theme (primary: 262 83% 58%) with pink and purple accents
- **Visual Effects**: Glassmorphism with backdrop-blur and transparent backgrounds
- **Border Radius**: Increased to 1rem for softer, modern appearance
- **Animations**: 
  - `animate-blob`: Morphing background blobs
  - `animate-spin-slow`: Slow orbital rotation effects
  - `gradient-flow`: Animated gradient backgrounds
- **Utility Classes**:
  - `gradient-bg`: Primary gradient background
  - `gradient-text`: Gradient text effect
  - `glass-card`: Glassmorphism card styling
  - `shadow-glow`: Primary color glow effect
  - `shadow-soft`: Subtle shadow for depth
- **Components Updated**: Home page, Login, Register, Client Dashboard, Sidebar Navigation
