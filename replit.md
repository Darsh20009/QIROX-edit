# QIROX Marketing Website

## Overview
QIROX is a marketing website for a B2B SaaS company that builds custom business systems. The website follows the brand philosophy of "Build systems. Stay human." - emphasizing human-driven development without AI autopilot or magic promises.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI components
- **Backend**: Express.js with TypeScript
- **Routing**: Wouter for client-side routing
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form with Zod validation
- **Storage**: In-memory storage for MVP

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Layout components
│   │   ├── ui/              # Shadcn UI components
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── pages/               # All page components
│   │   ├── home.tsx         # Home with Decision Flow
│   │   ├── how-it-works.tsx
│   │   ├── pricing.tsx
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   ├── terms.tsx
│   │   ├── privacy.tsx
│   │   └── not-found.tsx
│   ├── hooks/
│   ├── lib/
│   └── App.tsx
server/
├── routes.ts                 # API endpoints
├── storage.ts                # In-memory storage
shared/
└── schema.ts                 # Data models and Zod schemas
```

## Pages
- **/** - Home page with Decision Flow (interactive build options)
- **/how-it-works** - 4-step process explanation
- **/pricing** - 3 pricing plans with FAQ accordion
- **/about** - Company values and beliefs
- **/contact** - Contact form with backend submission
- **/terms** - Terms of Service
- **/privacy** - Privacy Policy

## Features
- **Decision Flow**: Interactive section where users select what they want to build (Company Website, Platform/SaaS, Business System, Online Store, Custom Build)
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Contact Form**: Form validation with Zod, backend API submission
- **Responsive Design**: Mobile-first design with collapsible navigation

## API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Retrieve all contact messages (for admin use)

## Brand Guidelines
- Primary colors: Black/White with subtle grayscale
- Accent: Deep green (subtle)
- Typography: Inter font family
- Voice: No AI hype, no autopilot claims, no magic promises
- Tagline: "Build systems. Stay human."

## Running the Project
The project runs using `npm run dev` which starts both the Express backend and Vite frontend dev server on port 5000.
