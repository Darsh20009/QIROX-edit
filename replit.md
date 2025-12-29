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
│   │   ├── subscribe.tsx    # Subscription + WhatsApp payment
│   │   ├── store-manage.tsx # Store management (products, categories, orders)
│   │   ├── employee-dashboard.tsx  # Employee dashboard
│   │   ├── admin-dashboard.tsx     # Admin dashboard
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
│   ├── Subscription.ts      # Subscription model with payment confirmation
│   ├── Store.ts             # Store model (ecommerce/restaurant/education)
│   ├── Product.ts           # Product model with pricing, quantity, images
│   ├── Category.ts          # Category model for organizing products
│   └── Order.ts             # Order model with status and payment tracking
├── auth.ts                  # JWT auth, password hashing, middleware
├── routes.ts                # API endpoints
└── storage.ts               # In-memory storage (for contact form)
shared/
├── schema.ts                # Contact message schema
└── constants.ts             # WhatsApp payment number
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
- **/dashboard/stores/:storeId** - Store management (products, categories, orders)
- **/dashboard/subscribe** - Subscription selection with WhatsApp payment
- **/employee** - Employee dashboard (store management, payment confirmation)
- **/admin** - Admin dashboard (statistics, user management)
- **/terms** - Terms of Service
- **/privacy** - Privacy Policy

## Store Management Features
- **Products**: Add, edit, delete products with name, price, quantity, status
- **Categories**: Organize products into categories
- **Orders**: View and manage customer orders, update order status
- **Stats**: View store statistics (products, categories, orders, revenue)

## Payment Flow (Manual via WhatsApp)
1. Customer creates subscription (starts as "trial" status)
2. Customer is shown WhatsApp number (+966532441566) to contact for payment
3. Customer contacts via WhatsApp and completes payment
4. Employee/Admin confirms payment in employee dashboard
5. Subscription status changes from "trial" to "active"

**Note**: No automated payment gateway (Stripe, Tap, Tabby, Tamara) is integrated. All payments are handled manually via WhatsApp contact.

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
- `GET /api/stores/:storeId/stats` - Get store statistics (protected)

### Products
- `GET /api/stores/:storeId/products` - Get store products (protected)
- `POST /api/stores/:storeId/products` - Create product (protected)
- `GET /api/stores/:storeId/products/:productId` - Get product (protected)
- `PATCH /api/stores/:storeId/products/:productId` - Update product (protected)
- `DELETE /api/stores/:storeId/products/:productId` - Delete product (protected)

### Categories
- `GET /api/stores/:storeId/categories` - Get store categories (protected)
- `POST /api/stores/:storeId/categories` - Create category (protected)
- `PATCH /api/stores/:storeId/categories/:categoryId` - Update category (protected)
- `DELETE /api/stores/:storeId/categories/:categoryId` - Delete category (protected)

### Orders
- `GET /api/stores/:storeId/orders` - Get store orders (protected)
- `GET /api/stores/:storeId/orders/:orderId` - Get order (protected)
- `PATCH /api/stores/:storeId/orders/:orderId/status` - Update order status (protected)
- `PATCH /api/stores/:storeId/orders/:orderId/payment` - Update payment status (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/subscriptions` - Get all subscriptions (admin only)
- `GET /api/admin/stores` - Get all stores (admin/employee)
- `PATCH /api/admin/stores/:id/status` - Update store status (admin/employee)
- `PATCH /api/admin/subscriptions/:id/confirm` - Confirm payment (admin/employee)
- `GET /api/admin/stats` - Get platform statistics (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Retrieve messages (admin/employee)

## User Roles
- **customer**: Can manage own subscriptions, stores, products, categories, and orders
- **employee**: Can manage customer stores, confirm payments, view support messages
- **admin**: Full access to all features including statistics

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
- Public storefront for customers to browse and order
- Image upload for products
- Email notifications for orders
- Full Arabic language support throughout
