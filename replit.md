# QIROX SaaS Platform

## Overview
QIROX is a multi-tenant SaaS platform competing with Zid, Odoo, and Salla. The platform enables users to create and manage e-commerce stores, restaurant/cafe systems, and education platforms. Features include customer/employee/admin dashboards with role-based access control.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI components
- **Backend**: Express.js with TypeScript
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Authentication**: JWT with bcrypt password hashing
- **Routing**: Wouter for client-side routing
- **Data Fetching**: TanStack React Query with auth headers
- **Forms**: React Hook Form with Zod validation

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Layout components
│   │   ├── ui/              # Shadcn UI components
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── pages/
│   │   ├── home.tsx         # Home with Decision Flow
│   │   ├── how-it-works.tsx
│   │   ├── pricing.tsx      # 3 plan categories with Arabic pricing
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   ├── login.tsx        # User login
│   │   ├── register.tsx     # User registration
│   │   ├── dashboard.tsx    # Customer dashboard
│   │   ├── new-store.tsx    # Store creation
│   │   ├── terms.tsx
│   │   ├── privacy.tsx
│   │   └── not-found.tsx
│   ├── lib/
│   │   ├── auth.tsx         # AuthProvider context
│   │   └── queryClient.ts   # React Query with auth headers
│   └── App.tsx
server/
├── models/
│   ├── User.ts              # User model (customer/employee/admin)
│   ├── Subscription.ts      # Subscription model with plan pricing
│   └── Store.ts             # Store model (ecommerce/restaurant/education)
├── auth.ts                  # JWT auth, password hashing, middleware
├── routes.ts                # API endpoints
└── storage.ts               # In-memory storage (for contact form)
shared/
└── schema.ts                # Contact message schema
```

## Pages
- **/** - Home page with Decision Flow (interactive build options)
- **/how-it-works** - 4-step process explanation
- **/pricing** - 3 pricing plans (Stores, Restaurants, Education) with SAR pricing
- **/about** - Company values and beliefs
- **/contact** - Contact form with backend submission
- **/login** - User login
- **/register** - User registration with 14-day free trial
- **/dashboard** - Customer dashboard (subscriptions, stores)
- **/dashboard/stores/new** - Create new store
- **/terms** - Terms of Service
- **/privacy** - Privacy Policy

## Pricing Plans (SAR)
### Stores (E-commerce)
- Monthly: 100 SAR
- 6 Months: 500 SAR
- Yearly: 899 SAR

### Restaurants/Cafes
- Monthly: 179 SAR
- 6 Months: 599 SAR
- Yearly: 1099 SAR

### Education Platforms
- Monthly: 199 SAR
- 6 Months: 999 SAR
- Yearly: 1799 SAR

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Subscriptions
- `POST /api/subscriptions` - Create subscription (protected)
- `GET /api/subscriptions` - Get user subscriptions (protected)
- `GET /api/subscriptions/:id` - Get specific subscription (protected)

### Stores
- `POST /api/stores` - Create store (protected, requires active subscription)
- `GET /api/stores` - Get user stores (protected)
- `GET /api/stores/:id` - Get specific store (protected)
- `PATCH /api/stores/:id` - Update store (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/subscriptions` - Get all subscriptions (admin only)
- `GET /api/admin/stores` - Get all stores (admin/employee)
- `PATCH /api/admin/stores/:id/status` - Update store status (admin/employee)
- `GET /api/admin/stats` - Get platform statistics (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Retrieve messages (admin/employee)

## User Roles
- **customer**: Can manage own subscriptions and stores
- **employee**: Can manage customer stores and support
- **admin**: Full access to all features

## Environment Variables
- `MONGODB_URI` - MongoDB Atlas connection string
- `SESSION_SECRET` - JWT secret key

## Brand Guidelines
- Primary colors: Black/White with subtle grayscale
- Accent: Deep green (subtle)
- Typography: Inter font family
- Language: Arabic (RTL support)
- Currency: SAR (Saudi Riyal)
- Voice: No AI hype, no autopilot claims, no magic promises
- Tagline: "Build systems. Stay human."

## Running the Project
The project runs using `npm run dev` which starts both the Express backend and Vite frontend dev server on port 5000.

## Next Steps (Planned)
- Employee dashboard (customer support, store management)
- Admin dashboard (statistics, user management)
- Payment gateway integration (Tap, Tabby, Tamara)
- Store templates (ecommerce, restaurant, education)
- Arabic language support throughout
