# Technical Specification Document
# Red & White Cleaning Services LTD

**Version:** 1.0  
**Date:** June 2026  
**Status:** Approved — Development Ready  
**Architect:** Senior Full Stack Architect  

---

## TABLE OF CONTENTS

1. [Application Architecture](#1-application-architecture)
2. [Frontend Architecture](#2-frontend-architecture)
3. [Backend Architecture](#3-backend-architecture)
4. [Database Architecture](#4-database-architecture)
5. [Authentication Flow](#5-authentication-flow)
6. [Email Flow](#6-email-flow)
7. [Lead Management Flow](#7-lead-management-flow)
8. [Admin Dashboard Architecture](#8-admin-dashboard-architecture)
9. [SEO Architecture](#9-seo-architecture)
10. [GEO Architecture](#10-geo-architecture)
11. [Security Architecture](#11-security-architecture)
12. [Deployment Architecture](#12-deployment-architecture)

---

## 1. APPLICATION ARCHITECTURE

### 1.1 System Overview

The application is a monolithic Next.js 15 application that handles both the public-facing website and the admin dashboard within a single codebase. It follows the **Server-First** rendering model using the App Router.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        INTERNET / USERS                             │
└──────────────┬──────────────────────────────┬───────────────────────┘
               │                              │
       Public Visitors                   Admin Users
               │                              │
               ▼                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        CLOUDFLARE                                   │
│              (DNS + DDoS Protection + Turnstile)                    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          VERCEL EDGE                                │
│                     (CDN + Edge Network)                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    NEXT.JS 15 APP                           │   │
│  │                                                             │   │
│  │  ┌──────────────────┐    ┌──────────────────────────────┐  │   │
│  │  │   PUBLIC PAGES   │    │      ADMIN DASHBOARD         │  │   │
│  │  │                  │    │   (Auth-Protected Routes)    │  │   │
│  │  │  / (Home)        │    │                              │  │   │
│  │  │  /about          │    │  /admin (Dashboard)          │  │   │
│  │  │  /services       │    │  /admin/leads                │  │   │
│  │  │  /portfolio      │    │  /admin/portfolio            │  │   │
│  │  │  /faq            │    │  /admin/faq                  │  │   │
│  │  │  /contact        │    │  /admin/settings             │  │   │
│  │  │  /thank-you      │    │  /admin/seo                  │  │   │
│  │  │  /service-area/* │    │                              │  │   │
│  │  └──────────────────┘    └──────────────────────────────┘  │   │
│  │                                                             │   │
│  │  ┌──────────────────────────────────────────────────────┐  │   │
│  │  │                  API ROUTE HANDLERS                  │  │   │
│  │  │  /api/leads  /api/portfolio  /api/faq  /api/auth/*   │  │   │
│  │  └──────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
   │   SUPABASE   │   │    RESEND    │   │   GOOGLE     │
   │  PostgreSQL  │   │    Email     │   │  Analytics   │
   │  + Storage   │   │   Service    │   │      4       │
   └──────────────┘   └──────────────┘   └──────────────┘
```

### 1.2 Rendering Strategy Per Page

| Page | Rendering Strategy | Reason |
|---|---|---|
| Home `/` | SSG (Static Site Generation) | Content rarely changes, max performance |
| About `/about` | SSG | Static content |
| Services `/services` | SSG | Static content |
| Portfolio `/portfolio` | ISR (60s revalidate) | Changes when admin adds photos |
| FAQ `/faq` | ISR (60s revalidate) | Changes when admin adds FAQs |
| Contact `/contact` | SSG | Form is client-side |
| Thank You `/thank-you` | SSG | Static |
| Service Area `/service-area/[city]` | SSG | Pre-generated for all 7 cities |
| Admin `/admin/*` | SSR (Dynamic) | Real-time data, auth required |

**Key Terms for Beginners:**
- **SSG** = Page built once at deploy time. Super fast. Best for content that doesn't change.
- **ISR** = Page rebuilds automatically every 60 seconds in the background. Content stays fresh.
- **SSR** = Page built fresh every time a user visits. Used when data must be real-time (admin dashboard).

---

## 2. FRONTEND ARCHITECTURE

### 2.1 Component Hierarchy

```
RootLayout (src/app/layout.tsx)
│
│── Fonts (Montserrat + Inter loaded via next/font)
│── Google Analytics Script
│── Providers (SessionProvider for Auth.js)
│
├── PUBLIC LAYOUT (src/components/layout/)
│   ├── Header.tsx
│   │   ├── Logo
│   │   ├── Navigation Links
│   │   └── Mobile Hamburger Menu (Shadcn Sheet)
│   │
│   ├── Footer.tsx
│   │   ├── Company NAP (Name, Address, Phone)
│   │   ├── Navigation Links
│   │   ├── Service Areas List
│   │   └── Social Media Links
│   │
│   ├── MobileCTABar.tsx         ← Fixed bottom bar on mobile only
│   │   ├── Call Now Button (tel: link)
│   │   └── Get Free Quote Button (→ /contact)
│   │
│   └── FloatingContactButton.tsx ← Visible on all pages
│
├── HOME PAGE (src/app/page.tsx)
│   ├── HeroSection.tsx
│   │   ├── Headline + Subheadline
│   │   ├── Two CTA Buttons
│   │   └── Hero Background Image
│   ├── TrustBar.tsx
│   ├── ServicesOverview.tsx
│   ├── WhyChooseUs.tsx
│   ├── ServiceAreas.tsx
│   ├── FAQPreview.tsx
│   └── CTABanner.tsx
│
├── PORTFOLIO PAGE (src/app/portfolio/page.tsx)
│   ├── PortfolioFilter.tsx      ← Client Component (needs interactivity)
│   ├── PortfolioGrid.tsx        ← Client Component
│   │   └── PortfolioCard.tsx (×N)
│   └── PortfolioLightbox.tsx    ← Client Component
│
├── FAQ PAGE (src/app/faq/page.tsx)
│   ├── FAQSearch.tsx            ← Client Component
│   └── FAQAccordion.tsx         ← Client Component (Shadcn Accordion)
│
├── CONTACT PAGE (src/app/contact/page.tsx)
│   ├── ContactForm.tsx          ← Client Component
│   │   ├── React Hook Form
│   │   ├── Zod Validation
│   │   ├── Cloudflare Turnstile Widget
│   │   ├── Loading State
│   │   ├── Error State
│   │   └── Success State → redirect /thank-you
│   └── Google Map Embed
│
└── ADMIN LAYOUT (src/app/admin/layout.tsx)
    ├── AdminSidebar.tsx
    └── [Page Content]
```

### 2.2 Server vs Client Components

A critical concept in Next.js 15: every component is a **Server Component by default** (rendered on the server, faster, no JavaScript sent to browser). Only components that need interactivity become **Client Components** (marked with `"use client"` at the top).

```
SERVER COMPONENTS (default — no "use client")     CLIENT COMPONENTS ("use client" required)
─────────────────────────────────────────────     ─────────────────────────────────────────
Layout.tsx                                        ContactForm.tsx
Header.tsx                                        PortfolioFilter.tsx
Footer.tsx                                        PortfolioGrid.tsx
HeroSection.tsx                                   PortfolioLightbox.tsx
TrustBar.tsx                                      FAQSearch.tsx
ServicesOverview.tsx                              FAQAccordion.tsx
WhyChooseUs.tsx                                   MobileCTABar.tsx
ServiceAreas.tsx                                  FloatingContactButton.tsx
CTABanner.tsx                                     AdminSidebar.tsx
All Admin Pages (data fetching)                   LeadsTable.tsx (sorting/filtering)
SchemaMarkup.tsx                                  LeadStatusBadge.tsx
```

**Rule of thumb:** If the component uses `onClick`, `onChange`, `useState`, `useEffect`, or browser APIs — it must be a Client Component.

### 2.3 State Management Strategy

No global state library (no Redux, no Zustand) — this project uses:

```
┌─────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Form State       → React Hook Form (local to form)    │
│  Server Data      → Next.js Server Components          │
│                     (fetch directly in component)       │
│  Auth State       → Auth.js Session (SessionProvider)  │
│  UI State         → React useState (local only)        │
│  Filter State     → React useState (portfolio/faq)     │
│  Mutations        → Server Actions + useTransition     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2.4 Animation Strategy (Framer Motion)

Framer Motion animations are **performance-controlled** — they only run on elements entering the viewport.

| Element | Animation | Duration |
|---|---|---|
| Hero headline | Fade in + slide up | 0.6s |
| Service cards | Staggered fade in | 0.1s each |
| Trust bar logos | Fade in | 0.4s |
| Portfolio cards | Scale + fade on hover | 0.2s |
| FAQ accordion | Height expand | 0.3s |
| CTA buttons | Scale on hover | 0.15s |
| Mobile CTA bar | Slide up on load | 0.5s delay |

**Performance rule:** All Framer Motion components will use `viewport={{ once: true }}` so animations only trigger once, preventing re-animation on scroll back.

---

## 3. BACKEND ARCHITECTURE

### 3.1 API Layer Overview

The backend is split into two patterns:

```
┌────────────────────────────────────────────────────────────────┐
│                     BACKEND PATTERNS                           │
├────────────────────────────┬───────────────────────────────────┤
│   ROUTE HANDLERS           │   SERVER ACTIONS                  │
│   (src/app/api/*)          │   (src/actions/*)                 │
├────────────────────────────┼───────────────────────────────────┤
│                            │                                   │
│  Used for:                 │  Used for:                        │
│  • Form submission         │  • Admin CRUD operations          │
│    (POST /api/leads)       │  • Mutations from admin forms     │
│  • External webhooks       │  • Settings updates               │
│  • Auth.js callbacks       │  • FAQ/Portfolio management       │
│                            │                                   │
│  Why: External services    │  Why: Simpler for admin UI,       │
│  need a real HTTP URL      │  no need for fetch() calls,       │
│  to call (e.g. Turnstile   │  built-in CSRF protection         │
│  verification)             │                                   │
└────────────────────────────┴───────────────────────────────────┘
```

### 3.2 API Routes Map

```
/api
├── /auth
│   └── /[...nextauth]
│       └── route.ts          GET, POST — Auth.js session handler
│
├── /leads
│   └── route.ts              POST — Create new lead (public form)
│                             GET  — Get all leads (admin only)
│
├── /portfolio
│   ├── route.ts              GET  — List portfolio items
│   │                         POST — Create portfolio item (admin)
│   └── /[id]
│       └── route.ts          PUT    — Update portfolio item
│                             DELETE — Delete portfolio item
│
├── /faq
│   ├── route.ts              GET  — List FAQs
│   │                         POST — Create FAQ (admin)
│   └── /[id]
│       └── route.ts          PUT    — Update FAQ
│                             DELETE — Delete FAQ
│
└── /settings
    └── route.ts              GET — Get site settings
                              PUT — Update site settings (admin)
```

### 3.3 Server Actions Map

```
/actions
├── leads.ts
│   ├── submitLead(formData)           Called from ContactForm
│   ├── getLeads(filters)             Called from admin leads page
│   ├── updateLeadStatus(id, status)  Called from leads table
│   ├── deleteLead(id)                Called from leads table
│   └── exportLeadsCSV()              Called from export button
│
├── portfolio.ts
│   ├── getPortfolioItems(category?)  Called from portfolio page
│   ├── createPortfolioItem(data)     Called from admin form
│   ├── updatePortfolioItem(id, data) Called from admin edit form
│   └── deletePortfolioItem(id)       Called from admin list
│
├── faq.ts
│   ├── getFAQs()                     Called from FAQ page + admin
│   ├── createFAQ(data)               Called from admin form
│   ├── updateFAQ(id, data)           Called from admin edit form
│   ├── deleteFAQ(id)                 Called from admin list
│   └── reorderFAQs(orderedIds)       Called from drag interface
│
└── settings.ts
    ├── getSettings()                 Called from footer, contact page
    └── updateSettings(data)          Called from admin settings form
```

### 3.4 Middleware Architecture

Next.js middleware runs at the Edge (before the page loads) and handles route protection.

```
Request comes in
       │
       ▼
┌─────────────────────────────────────┐
│         middleware.ts               │
│                                     │
│  Is the path /admin/* ?             │
│         │                           │
│    YES ─┤                           │
│         ▼                           │
│  Does a valid session exist?        │
│         │                           │
│   NO ───┼──→ Redirect to           │
│         │    /admin/login           │
│         │                           │
│   YES ──┼──→ Allow through         │
│         │                           │
│    NO ──┼──→ Allow through         │
│  (not   │   (public route)          │
│  admin) │                           │
└─────────────────────────────────────┘
```

---

## 4. DATABASE ARCHITECTURE

### 4.1 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       LEAD                                  │
├──────────────┬──────────────────┬──────────────────────────-┤
│ id           │ String (cuid)    │ PRIMARY KEY                │
│ name         │ String           │ NOT NULL                   │
│ companyName  │ String?          │ NULLABLE                   │
│ email        │ String           │ NOT NULL                   │
│ phone        │ String?          │ NULLABLE                   │
│ serviceType  │ String           │ NOT NULL                   │
│ location     │ String           │ NOT NULL                   │
│ message      │ String           │ NOT NULL (TEXT)            │
│ hearAboutUs  │ String?          │ NULLABLE                   │
│ status       │ Enum LeadStatus  │ DEFAULT: NEW               │
│ createdAt    │ DateTime         │ DEFAULT: now()             │
│ updatedAt    │ DateTime         │ AUTO-UPDATE                │
└─────────────────────────────────────────────────────────────┘

LeadStatus ENUM: NEW | CONTACTED | QUOTED | WON | LOST


┌─────────────────────────────────────────────────────────────┐
│                      PORTFOLIO                              │
├──────────────┬──────────────────┬───────────────────────────┤
│ id           │ String (cuid)    │ PRIMARY KEY                │
│ title        │ String           │ NOT NULL                   │
│ slug         │ String           │ UNIQUE, NOT NULL           │
│ category     │ String           │ NOT NULL                   │
│ description  │ String?          │ NULLABLE (TEXT)            │
│ imageUrl     │ String           │ NOT NULL                   │
│ altText      │ String           │ NOT NULL (for SEO/a11y)    │
│ featured     │ Boolean          │ DEFAULT: false             │
│ createdAt    │ DateTime         │ DEFAULT: now()             │
│ updatedAt    │ DateTime         │ AUTO-UPDATE                │
└─────────────────────────────────────────────────────────────┘

category VALUES: "post-construction" | "commercial" | "deep-cleaning" | "before-after"


┌─────────────────────────────────────────────────────────────┐
│                         FAQ                                 │
├──────────────┬──────────────────┬───────────────────────────┤
│ id           │ String (cuid)    │ PRIMARY KEY                │
│ question     │ String           │ NOT NULL                   │
│ answer       │ String           │ NOT NULL (TEXT)            │
│ sortOrder    │ Int              │ DEFAULT: 0                 │
│ createdAt    │ DateTime         │ DEFAULT: now()             │
│ updatedAt    │ DateTime         │ AUTO-UPDATE                │
└─────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                       SETTINGS                              │
├──────────────┬──────────────────┬───────────────────────────┤
│ id           │ String (cuid)    │ PRIMARY KEY                │
│ companyName  │ String           │ NOT NULL                   │
│ phone        │ String           │ NOT NULL                   │
│ email        │ String           │ NOT NULL                   │
│ serviceAreas │ String           │ Comma-separated list       │
│ googleMap    │ String?          │ Embed code NULLABLE        │
│ facebook     │ String?          │ NULLABLE                   │
│ instagram    │ String?          │ NULLABLE                   │
│ linkedin     │ String?          │ NULLABLE                   │
│ createdAt    │ DateTime         │ DEFAULT: now()             │
│ updatedAt    │ DateTime         │ AUTO-UPDATE                │
└─────────────────────────────────────────────────────────────┘

NOTE: Only ONE Settings row will ever exist (singleton pattern)


┌─────────────────────────────────────────────────────────────┐
│                        USER                                 │
├──────────────┬──────────────────┬───────────────────────────┤
│ id           │ String (cuid)    │ PRIMARY KEY                │
│ email        │ String           │ UNIQUE, NOT NULL           │
│ name         │ String?          │ NULLABLE                   │
│ password     │ String           │ HASHED (bcrypt), NOT NULL  │
│ role         │ String           │ DEFAULT: "admin"           │
│ createdAt    │ DateTime         │ DEFAULT: now()             │
│ updatedAt    │ DateTime         │ AUTO-UPDATE                │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Database Indexes

```
TABLE: Lead
├── INDEX on (status)           → Fast filtering by lead status
├── INDEX on (createdAt DESC)   → Fast sorting by newest first
└── INDEX on (email)            → Fast lookup by email

TABLE: Portfolio
├── UNIQUE INDEX on (slug)      → Enforced by Prisma @unique
├── INDEX on (category)         → Fast filtering by category
└── INDEX on (featured)         → Fast query for featured items

TABLE: FAQ
└── INDEX on (sortOrder)        → Fast ordered retrieval

TABLE: User
└── UNIQUE INDEX on (email)     → Enforced by Prisma @unique
```

### 4.3 Connection Architecture

```
Next.js App
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│                    lib/prisma.ts                        │
│                                                         │
│  Singleton pattern — only ONE Prisma client instance   │
│  exists regardless of how many requests come in.       │
│                                                         │
│  In development: reuses instance across hot reloads    │
│  In production:  single instance per serverless fn     │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼ (CONNECTION_POOL_URL)
                  ┌──────────────────┐
                  │  Supabase        │
                  │  Connection      │
                  │  Pooler          │  ← Handles many concurrent
                  │  (PgBouncer)     │    connections efficiently
                  └────────┬─────────┘
                           │
                           ▼ (DATABASE_URL)
                  ┌──────────────────┐
                  │  Supabase        │
                  │  PostgreSQL      │
                  │  Database        │
                  └──────────────────┘
```

**Why two URLs?**
- `DATABASE_URL` = goes through connection pooler — used by the app (many requests)
- `DIRECT_URL` = direct connection — used only by Prisma migrations (schema changes)

---

## 5. AUTHENTICATION FLOW

### 5.1 Overview

Authentication is **admin-only**. No public user registration exists. There is exactly one admin account.

```
Admin visits /admin/*
        │
        ▼
┌───────────────────────────────┐
│      middleware.ts            │
│  Checks for valid session     │
└──────────┬──────────────────--┘
           │
    ┌──────┴──────┐
    │             │
 No Session    Has Session
    │             │
    ▼             ▼
Redirect to   Allow access to
/admin/login  /admin/* pages
```

### 5.2 Login Flow (Detailed)

```
Admin enters email + password on /admin/login
              │
              ▼
┌─────────────────────────────────────────────────────┐
│           Auth.js signIn() called                   │
│           Provider: Credentials                     │
└─────────────────────────────┬───────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────┐
│         Credentials Provider authorize()            │
│                                                     │
│  1. Find user by email in database (Prisma)         │
│  2. User not found? → return null (login fails)     │
│  3. Compare password with bcrypt.compare()          │
│  4. Password wrong? → return null (login fails)     │
│  5. Password correct? → return user object          │
└─────────────────────────────┬───────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                 Fail              Success
                    │                   │
                    ▼                   ▼
           Show error message    Auth.js creates
           on login form         signed session
                                        │
                                        ▼
                               Session stored in
                               encrypted HTTP-only
                               cookie (JWT)
                                        │
                                        ▼
                               Redirect to /admin
```

### 5.3 Session Validation Flow

```
Every request to /admin/* goes through this:

Request → middleware.ts
                │
                ▼
         getToken(request)
                │
         ┌──────┴──────┐
         │             │
      No JWT       Valid JWT
         │             │
         ▼             ▼
    Redirect to    Extract user
    /admin/login   from token
                        │
                        ▼
                   Continue to
                   requested page
```

### 5.4 Logout Flow

```
Admin clicks "Logout"
        │
        ▼
signOut() called (Auth.js)
        │
        ▼
Session cookie destroyed
        │
        ▼
Redirect to /admin/login
```

### 5.5 Auth.js Configuration

```
Strategy:    JWT (JSON Web Token in cookie)
Provider:    Credentials (email + password)
Secret:      NEXTAUTH_SECRET (32-char random string)
Cookie:      HttpOnly + Secure + SameSite=Lax
Session:     30 days expiry
Password:    bcrypt (12 salt rounds)
```

---

## 6. EMAIL FLOW

### 6.1 Email System Overview

```
┌──────────────────────────────────────────────────────────────┐
│                      EMAIL SYSTEM                            │
│                                                              │
│  Provider: Resend                                            │
│  From Domain: Must be a verified domain you own             │
│  Two email types triggered by every form submission:        │
│    1. Admin Notification (to you, the business owner)       │
│    2. Customer Auto-Reply (to the person who submitted)     │
└──────────────────────────────────────────────────────────────┘
```

### 6.2 Admin Notification Email Flow

```
Form submitted
      │
      ▼
Lead saved to database
      │
      ▼
resend.emails.send({
  from: "noreply@yourdomain.com",
  to:   ADMIN_EMAIL (env variable),
  subject: "New Quote Request - [Service Name]"
  html: AdminEmailTemplate(leadData)
})
      │
      ├── Success → Continue to customer email
      └── Failure → Log error, do NOT crash the request
                    Lead is already saved to DB — that is
                    the source of truth, email is secondary
```

**Admin Email Content:**
```
Subject: New Quote Request - Post Construction Cleaning

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW LEAD RECEIVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:         John Smith
Company:      ABC Contractors
Email:        john@abccontractors.com
Phone:        519-555-0123
Service:      Post Construction Cleaning
Location:     Kitchener, ON
Heard Via:    Google Search

Message:
"We need cleaning after a renovation job at 
123 Main Street..."

Submitted: June 1, 2026 at 2:34 PM

[View in Admin Dashboard →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 6.3 Customer Auto-Reply Email Flow

```
Admin email sent (or attempted)
      │
      ▼
resend.emails.send({
  from: "noreply@yourdomain.com",
  to:   customer's email address,
  subject: "Thank You For Contacting Red & White Cleaning"
  html: CustomerReplyTemplate(leadData)
})
      │
      ├── Success → Continue to GA4 conversion
      └── Failure → Log error, continue — do not crash
```

**Customer Auto-Reply Content:**
```
Subject: Thank You For Contacting Red & White Cleaning Services

Dear John,

Thank you for reaching out to Red & White Cleaning Services LTD.

We have received your inquiry regarding Post Construction Cleaning 
in Kitchener and will respond within 1 business day.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your inquiry summary:
Service: Post Construction Cleaning
Location: Kitchener, ON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If you require immediate assistance, please contact us directly:

📞 Phone: [company phone]
✉  Email: [company email]

We look forward to serving you.

Red & White Cleaning Services LTD
```

### 6.4 Email Error Handling Policy

```
Email Failure Strategy:
─────────────────────────────────────────────────────────
RULE: Email failure must NEVER cause lead data loss.

Order of operations:
  1. Validate form data          ← If fails: show user error, stop
  2. Verify Turnstile token      ← If fails: show user error, stop
  3. Save lead to database       ← If fails: show user error, stop
  4. Send admin email            ← If fails: log to console, CONTINUE
  5. Send customer reply         ← If fails: log to console, CONTINUE
  6. Trigger GA4 event           ← If fails: log to console, CONTINUE
  7. Redirect to /thank-you      ← Always happens if step 3 succeeds

This means: even if emails fail to send, the lead is saved
and the user sees success. You can always re-send manually
from the admin dashboard.
─────────────────────────────────────────────────────────
```

---

## 7. LEAD MANAGEMENT FLOW

### 7.1 Complete Form Submission Flow

```
USER FILLS CONTACT FORM
         │
         ▼
React Hook Form validates client-side (Zod)
         │
    ┌────┴────┐
    │         │
  PASS      FAIL
    │         │
    │         └──→ Show inline error messages
    │               User corrects and resubmits
    ▼
Cloudflare Turnstile challenge completes
         │
    ┌────┴────┐
    │         │
  PASS      FAIL
    │         │
    │         └──→ Show "Verification failed" error
    │               (bot detected)
    ▼
POST /api/leads (form data + turnstile token)
         │
         ▼
SERVER: Validate Turnstile token with Cloudflare API
         │
    ┌────┴────┐
    │         │
  VALID    INVALID
    │         │
    │         └──→ Return 400 error to client
    ▼
SERVER: Validate form data with Zod (server-side)
         │
    ┌────┴────┐
    │         │
  VALID    INVALID
    │         │
    │         └──→ Return 422 error to client
    ▼
SERVER: Save lead to Supabase via Prisma
         │
    ┌────┴────┐
    │         │
 SUCCESS   FAILURE
    │         │
    │         └──→ Return 500 error to client
    ▼
SERVER: Send admin notification email (Resend)
         │ (non-blocking — failure logged but ignored)
         ▼
SERVER: Send customer auto-reply email (Resend)
         │ (non-blocking — failure logged but ignored)
         ▼
Return 200 { success: true } to client
         │
         ▼
CLIENT: Fire GA4 conversion event
         │
         ▼
CLIENT: router.push('/thank-you')
         │
         ▼
THANK YOU PAGE displayed to user
```

### 7.2 Lead Lifecycle in Admin Dashboard

```
Lead Created → Status: NEW
                    │
                    │  Admin reviews lead
                    ▼
             Status: CONTACTED  ← Admin has reached out
                    │
                    │  Admin sends quote
                    ▼
              Status: QUOTED    ← Quote has been sent
                    │
               ┌────┴────┐
               │         │
           Client     Client
           accepts    declines
               │         │
               ▼         ▼
           Status:    Status:
            WON        LOST
```

### 7.3 Lead Data Flow Diagram

```
Public Website          Database              Admin Dashboard
─────────────           ────────              ───────────────

ContactForm
    │
    │── POST /api/leads ──→  Lead table
                              (status: NEW)
                                  │
                                  │◄────────── GET /api/leads
                                  │            (with filters)
                                  │
                                  │◄────────── PATCH (update status)
                                  │
                                  │◄────────── DELETE (remove lead)
                                  │
                                  │◄────────── GET (export CSV)
```

### 7.4 CSV Export Format

When admin exports leads, the CSV file will contain:

```
id, name, company, email, phone, service, location, message, 
hearAboutUs, status, submittedAt
```

---

## 8. ADMIN DASHBOARD ARCHITECTURE

### 8.1 Admin Section Map

```
/admin (Dashboard Overview)
├── /admin/login              ← Public (no auth required)
├── /admin                    ← Protected
├── /admin/leads              ← Protected
├── /admin/portfolio          ← Protected
├── /admin/portfolio/new      ← Protected
├── /admin/portfolio/[id]     ← Protected (edit)
├── /admin/faq                ← Protected
├── /admin/faq/new            ← Protected
├── /admin/faq/[id]           ← Protected (edit)
├── /admin/seo                ← Protected
└── /admin/settings           ← Protected
```

### 8.2 Admin Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  ADMIN LAYOUT                                               │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────────────────────┐ │
│  │   SIDEBAR        │  │         PAGE CONTENT             │ │
│  │                  │  │                                  │ │
│  │  🏠 Dashboard    │  │  [Dynamic content changes here]  │ │
│  │  📋 Leads        │  │                                  │ │
│  │  🖼️ Portfolio    │  │                                  │ │
│  │  ❓ FAQ          │  │                                  │ │
│  │  🔍 SEO          │  │                                  │ │
│  │  ⚙️  Settings    │  │                                  │ │
│  │                  │  │                                  │ │
│  │  ─────────────   │  │                                  │ │
│  │  🚪 Logout       │  │                                  │ │
│  └──────────────────┘  └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 8.3 Dashboard Overview Page

```
┌────────────────────────────────────────────────────────────┐
│  DASHBOARD STATS (4 cards)                                 │
│                                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Total    │  │   New    │  │ Monthly  │  │Portfolio │  │
│  │ Leads    │  │  Leads   │  │  Leads   │  │  Items   │  │
│  │   42     │  │    5     │  │    12    │  │    18    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                            │
│  RECENT LEADS (last 5)                                     │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Name        │ Service          │ Date    │ Status  │   │
│  │ John Smith  │ Post-Construction│ Jun 1   │ NEW     │   │
│  │ Jane Doe    │ Commercial       │ May 31  │ QUOTED  │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

### 8.4 Leads Management Page

```
LEADS PAGE FEATURES:
┌───────────────────────────────────────────────────────────────┐
│ [Search by name/email]  [Filter: Status ▼]  [Export CSV]      │
├───────────────────────────────────────────────────────────────┤
│ Name      │ Email          │ Service      │ Date   │ Status    │
├───────────────────────────────────────────────────────────────┤
│ J. Smith  │ j@email.com   │ Post-Const.  │ Jun 1  │ [NEW ▼]  │
│ J. Doe    │ d@email.com   │ Commercial   │ May 31 │ [QUOTED▼]│
├───────────────────────────────────────────────────────────────┤
│                                          [← Prev] [Next →]   │
└───────────────────────────────────────────────────────────────┘

STATUS DROPDOWN OPTIONS per row: NEW | CONTACTED | QUOTED | WON | LOST
ACTION per row: View Details | Delete
```

### 8.5 Portfolio Management Page

```
PORTFOLIO LIST PAGE:
┌──────────────────────────────────────────────────────────────┐
│  [+ Add New Portfolio Item]                                  │
├──────────────────────────────────────────────────────────────┤
│ [Image] │ Title           │ Category     │ Featured │ Actions │
├──────────────────────────────────────────────────────────────┤
│  [img]  │ Office Tower A  │ Commercial   │   YES    │ Edit Del│
│  [img]  │ Warehouse B     │ Post-Const.  │   NO     │ Edit Del│
└──────────────────────────────────────────────────────────────┘

CREATE/EDIT FORM FIELDS:
  • Title (text input)
  • Slug (auto-generated from title, editable)
  • Category (select dropdown)
  • Description (textarea)
  • Image Upload (→ Supabase Storage)
  • Alt Text (text input — required for SEO/accessibility)
  • Featured toggle (checkbox)
```

### 8.6 Image Upload Flow (Portfolio)

```
Admin selects image file
        │
        ▼
Client-side: Preview image before upload
        │
        ▼
Server Action: Upload to Supabase Storage
        │
        ├── Generate unique filename (cuid + extension)
        ├── Upload to bucket: "portfolio-images"
        ├── Get public URL from Supabase
        └── Save URL to Portfolio.imageUrl in database
        │
        ▼
Image now served via Supabase CDN URL
Next.js Image component displays it with optimization
```

---

## 9. SEO ARCHITECTURE

### 9.1 Metadata System

Every page generates its own metadata using Next.js Metadata API.

```
Metadata Hierarchy:
─────────────────────────────────────────────────────────────

Root Layout (default fallback for all pages)
    └── app/layout.tsx
        ├── metadataBase: process.env.NEXT_PUBLIC_SITE_URL
        ├── default title template: "%s | Red & White Cleaning"
        ├── default description
        └── default OG image

    Each page overrides with its own:
    └── app/[page]/page.tsx
        └── export const metadata = {
              title: "Page Title",
              description: "Page description",
              openGraph: { ... },
              twitter: { ... },
              alternates: { canonical: "/page-url" }
            }
```

### 9.2 Page-by-Page SEO Targets

| Page | Title | Primary Keyword |
|---|---|---|
| Home | Post Construction & Commercial Cleaning in Southern Ontario | commercial cleaning Southern Ontario |
| About | About Us — Red & White Cleaning Services LTD | cleaning company Kitchener Ontario |
| Services | Cleaning Services — Post Construction, Commercial, Deep Clean | post construction cleaning Ontario |
| Portfolio | Cleaning Portfolio — Before & After Gallery | cleaning company portfolio Ontario |
| FAQ | Frequently Asked Questions — Cleaning Services | commercial cleaning FAQ |
| Contact | Get a Free Quote — Red & White Cleaning Services | cleaning company quote |

### 9.3 Schema Markup Architecture

```
JSON-LD Schema Implementation:

/  (Home Page)
├── LocalBusiness Schema
│   ├── @type: CleaningService
│   ├── name: Red & White Cleaning Services LTD
│   ├── telephone: [phone]
│   ├── email: [email]
│   ├── address: { ... }
│   ├── areaServed: [Kitchener, Waterloo, Cambridge ...]
│   ├── priceRange: "$$"
│   └── openingHours: [...]
│
└── Organization Schema
    ├── name, logo, url
    └── sameAs: [Facebook, Instagram, LinkedIn URLs]

/services
└── Service Schema (×4 — one per service)
    ├── @type: Service
    ├── name: Post Construction Cleaning
    ├── provider: { @type: LocalBusiness }
    └── areaServed: [...]

/faq
└── FAQPage Schema
    └── mainEntity: Array of Question objects
        ├── @type: Question
        ├── name: "question text"
        └── acceptedAnswer: { @type: Answer, text: "answer" }

/portfolio
└── ImageGallery Schema
    └── image: Array of ImageObject

Every page:
└── BreadcrumbList Schema
    └── itemListElement: Array of steps
        Example for /faq:
        1. Home (/)
        2. FAQ (/faq)
```

### 9.4 Sitemap Architecture

```
/sitemap.ts (auto-generated by Next.js)

Static URLs (always included):
├── / (priority: 1.0, changefreq: monthly)
├── /about (priority: 0.8, changefreq: yearly)
├── /services (priority: 0.9, changefreq: monthly)
├── /contact (priority: 0.9, changefreq: yearly)
├── /faq (priority: 0.7, changefreq: monthly)
├── /portfolio (priority: 0.8, changefreq: weekly)
└── /service-area/[7 cities] (priority: 0.8, changefreq: monthly)

Dynamic URLs (fetched from database):
└── /portfolio/[slug] — if individual portfolio pages added later

Output: https://yourdomain.com/sitemap.xml
```

### 9.5 robots.txt Architecture

```
/robots.ts

Content:
User-agent: *
Allow: /

Disallow: /admin
Disallow: /admin/*
Disallow: /api/*
Disallow: /thank-you

Sitemap: https://yourdomain.com/sitemap.xml
```

### 9.6 Core Web Vitals Strategy

```
LCP (Largest Contentful Paint) < 2.5s
─────────────────────────────────────
Target element: Hero section image
Solution:
  • Use next/image with priority={true} on hero image
  • Pre-generate image at correct size (WebP)
  • Serve from Vercel CDN (edge cached)
  • No layout shift on load (set explicit width + height)

CLS (Cumulative Layout Shift) < 0.1
─────────────────────────────────────
Solution:
  • All images have explicit width + height attributes
  • Fonts loaded via next/font (no FOUT — Flash Of Unstyled Text)
  • No dynamic content injection above the fold
  • Skeleton loaders for async content in admin

INP (Interaction to Next Paint) < 200ms
─────────────────────────────────────
Solution:
  • Minimal JavaScript on public pages
  • Heavy interactivity (lightbox, portfolio filter) lazy-loaded
  • Framer Motion animations use CSS transforms (GPU-accelerated)
  • No blocking third-party scripts (GA4 loaded with strategy="afterInteractive")
```

---

## 10. GEO ARCHITECTURE

GEO = Generative Engine Optimization — making content readable and citable by AI search engines (ChatGPT, Gemini, Perplexity, Google AI Overviews).

### 10.1 Content Strategy for AI Engines

```
TRADITIONAL SEO               GEO (AI Search)
────────────────              ───────────────
Targets: Keywords             Targets: Questions + Answers
Format: Keyword density       Format: Clear factual statements
Goal: Rank in Google SERP     Goal: Be cited in AI responses
Metric: Position #1           Metric: Cited in AI answer
```

### 10.2 Content Structure Requirements

Every public page must answer these questions in plain, factual language:

```
For each service page section:

┌─────────────────────────────────────────────────────────────┐
│  QUESTION 1: What is this service?                          │
│  → Clear 1-2 sentence definition                            │
│  Example: "Post-construction cleaning is the professional   │
│  removal of construction debris, dust, adhesives, and       │
│  surface residue from newly built or renovated properties." │
├─────────────────────────────────────────────────────────────┤
│  QUESTION 2: Who needs this service?                        │
│  → Specific customer types                                  │
│  Example: "General contractors, project managers, property  │
│  developers, and building owners in Ontario require         │
│  post-construction cleaning before occupancy inspections."  │
├─────────────────────────────────────────────────────────────┤
│  QUESTION 3: Why hire Red & White Cleaning?                 │
│  → Specific, verifiable differentiators (no fluff)         │
│  Example: "Red & White Cleaning Services LTD is a licensed │
│  and insured commercial cleaning company serving Kitchener, │
│  Waterloo, Cambridge, Guelph, Hamilton, London, and         │
│  Brantford, Ontario since [year]."                          │
└─────────────────────────────────────────────────────────────┘
```

### 10.3 Structured Data for AI Citability

```
Content signals AI engines look for:
─────────────────────────────────────────────────────────────

1. NAMED ENTITY CLARITY
   ✓ Always refer to company by full legal name in first mention
   ✓ "Red & White Cleaning Services LTD" not "we" or "us"

2. LOCATION SPECIFICITY
   ✓ Always include province: "Kitchener, Ontario" not just "Kitchener"
   ✓ List service areas in structured format (ul/ol lists)

3. FACTUAL SPECIFICITY
   ✓ Use numbers: "serving 7 cities across Southern Ontario"
   ✓ Avoid vague claims: NOT "the best" → YES "licensed and insured"

4. FAQ CONTENT
   ✓ FAQ answers directly answer the question in the first sentence
   ✓ Ideal length: 40–100 words per answer
   ✓ Use complete sentences (not bullet points in FAQ answers)

5. SCHEMA MARKUP
   ✓ FAQPage schema makes FAQ directly extractable by AI
   ✓ LocalBusiness schema confirms location/contact data
   ✓ CleaningService schema identifies service types

6. CONSISTENT NAP
   ✓ Company name, phone, email, location identical everywhere
   ✓ Footer on every page
   ✓ Contact page
   ✓ Schema markup
```

### 10.4 FAQ Content Guidelines

FAQs are the highest-value GEO content. Target questions that AI engines are asked:

```
Example target AI queries → FAQ questions to answer:

"Who does post-construction cleaning in Kitchener Ontario?"
→ FAQ: "Do you provide post-construction cleaning in Kitchener?"

"How much does commercial cleaning cost in Waterloo Ontario?"
→ FAQ: "How do I get a price for commercial cleaning in Waterloo?"

"Is Red & White Cleaning insured?"
→ FAQ: "Are you licensed and insured?"

"What is included in post-construction cleaning?"
→ FAQ: "What does post-construction cleaning include?"
```

---

## 11. SECURITY ARCHITECTURE

### 11.1 Threat Model

```
THREAT                         MITIGATION
─────────────────────────────────────────────────────────────────
Form spam / bot submissions    Cloudflare Turnstile
Brute force admin login        Rate limiting on /api/auth
SQL injection                  Prisma ORM (parameterized queries)
XSS attacks                    Next.js JSX auto-escaping
CSRF attacks                   Auth.js CSRF tokens + SameSite cookies
Unauthorized admin access      Middleware session check
Secrets exposed in code        Environment variables only
DDoS attacks                   Cloudflare proxy (DNS-level)
Sensitive data in logs         No PII logged to console in production
```

### 11.2 Cloudflare Turnstile Flow

```
Contact Form loads
      │
      ▼
Turnstile widget renders in form
(invisible to human users, visible challenge for bots)
      │
      ▼
Human completes interaction naturally
      │
      ▼
Turnstile issues a one-time TOKEN to the browser
      │
      ▼
Token included in form POST data
      │
      ▼
SERVER (/api/leads):
  POST https://challenges.cloudflare.com/turnstile/v0/siteverify
  Body: { secret: TURNSTILE_SECRET_KEY, response: token }
      │
  ┌───┴───┐
  │       │
VALID  INVALID
  │       │
  │       └──→ Return 400 Bad Request
  │             "Bot verification failed"
  ▼
Continue processing form
```

### 11.3 Input Validation Layers

```
LAYER 1: Client-Side (UX only — NOT security)
─────────────────────────────────────────────
React Hook Form + Zod
Purpose: Instant feedback to user
Where: Browser (ContactForm.tsx)
Trust level: ZERO — can be bypassed by anyone

LAYER 2: Server-Side (ACTUAL security)
─────────────────────────────────────────────
Zod schema validation in /api/leads route handler
Purpose: Reject invalid/malicious data
Where: Server — cannot be bypassed
Trust level: FULL — this is the real guard

LAYER 3: Database Layer
─────────────────────────────────────────────
Prisma ORM generates parameterized SQL queries
Purpose: Prevent SQL injection
Where: All database operations
Trust level: FULL — no raw SQL anywhere
```

### 11.4 Zod Validation Schema (Contact Form)

```
LeadSchema = z.object({
  name:         z.string().min(2).max(100),
  companyName:  z.string().max(100).optional(),
  email:        z.string().email().max(254),
  phone:        z.string().regex(/^\+?[\d\s\-().]{7,20}$/).optional(),
  serviceType:  z.enum([
                  "post-construction",
                  "commercial",
                  "deep-cleaning",
                  "ongoing-contract",
                  "other"
                ]),
  location:     z.string().min(2).max(100),
  message:      z.string().min(10).max(2000),
  hearAboutUs:  z.string().max(100).optional(),
  turnstileToken: z.string().min(1)
})
```

### 11.5 Rate Limiting Strategy

```
Rate limits applied at the API route level:

/api/leads (form submission):
  └── Max 5 requests per IP per 10 minutes
  └── Implementation: Upstash Redis OR Vercel KV
  └── On exceed: Return 429 Too Many Requests

/api/auth (login attempts):
  └── Auth.js built-in protections apply
  └── Lockout after repeated failures

Implementation library: Upstash Ratelimit (free tier available)
Fallback if Upstash not set up: Vercel's built-in edge protection
```

### 11.6 Environment Variable Security

```
RULE: No secret ever appears in code, git commits, or client bundles.

Variables prefixed with NEXT_PUBLIC_:
  → Safe to expose to browser
  → Example: NEXT_PUBLIC_GA_MEASUREMENT_ID
  → ONLY put truly public values here

Variables WITHOUT NEXT_PUBLIC_:
  → Server-only — never sent to browser
  → Example: RESEND_API_KEY, TURNSTILE_SECRET_KEY
  → These are the dangerous ones to protect

.gitignore must include:
  .env.local
  .env.production.local
  .env.development.local

.env.example IS committed to git:
  → Contains key names with placeholder values
  → No real secrets — safe to share
```

---

## 12. DEPLOYMENT ARCHITECTURE

### 12.1 Infrastructure Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCTION INFRASTRUCTURE                    │
└─────────────────────────────────────────────────────────────────┘

Developer Machine
      │
      │ git push
      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      GITHUB                                     │
│  Repository: github.com/[username]/rw-cleaning                  │
│  Branch: main (production)                                      │
└───────────────────────────────┬─────────────────────────────────┘
                                │ Automatic deploy trigger
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       VERCEL                                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  BUILD PROCESS                           │  │
│  │  1. npm install (install dependencies)                   │  │
│  │  2. prisma generate (generate database client)           │  │
│  │  3. next build (compile and optimize)                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  SERVERLESS FUNCTIONS                    │  │
│  │  Each API route → independent serverless function        │  │
│  │  Region: US-East (closest to Ontario Canada)             │  │
│  │  Timeout: 10 seconds per function                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  EDGE NETWORK (CDN)                      │  │
│  │  Static assets served from nearest CDN node             │  │
│  │  SSG pages cached at edge                                │  │
│  │  ISR pages cached with 60s TTL                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Environment Variables: Set in Vercel Dashboard                 │
│  Custom Domain: Connected in Vercel Dashboard                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE                                   │
│  Region: us-east-1 (match Vercel region for low latency)        │
│  Plan: Free tier (upgrade when traffic grows)                   │
│                                                                 │
│  ├── PostgreSQL Database (leads, portfolio, faq, settings)      │
│  └── Storage Bucket (portfolio images)                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                             │
│                                                                 │
│  Resend        → Email delivery (admin + customer emails)       │
│  Cloudflare    → DNS + Turnstile bot protection                 │
│  Google        → Analytics 4 + Search Console                  │
└─────────────────────────────────────────────────────────────────┘
```

### 12.2 CI/CD Pipeline

```
CODE CHANGE WORKFLOW:

1. Developer edits code locally
        │
        ▼
2. Test locally: npm run dev (http://localhost:3000)
        │
        ▼
3. git add [files] && git commit -m "message"
        │
        ▼
4. git push origin main
        │
        ▼
5. Vercel AUTOMATICALLY detects push to main
        │
        ▼
6. Vercel runs build (npm run build)
        │
   ┌────┴────┐
   │         │
 PASS      FAIL
   │         │
   │         └──→ Build fails, Vercel sends email alert
   │               Previous version stays live
   ▼
7. New version deployed to production
   (zero downtime — instant swap)
        │
        ▼
8. Test production URL
```

### 12.3 Environment Environments

```
ENVIRONMENT     URL                    Database              Branch
────────────    ───────────────────    ────────────────────  ──────
Development     localhost:3000         Supabase (same DB)    any
Production      yourdomain.com         Supabase              main
Preview         [hash].vercel.app      Supabase (same DB)    PR branches
```

**Note:** For simplicity at this project scale, all environments share the same Supabase database. For future scaling, separate dev/prod databases can be created.

### 12.4 Domain Configuration

```
DNS SETUP (managed in Cloudflare):

yourdomain.com
├── A Record → Vercel IP (Vercel provides this)
├── CNAME www → cname.vercel-dns.com
└── MX Records → Your email provider (for Resend domain verification)

Cloudflare Proxy Settings:
├── DNS only mode → For initial Vercel SSL certificate generation
└── Proxied mode → After SSL is confirmed working
```

### 12.5 Vercel Environment Variables Checklist

```
MUST BE SET IN VERCEL DASHBOARD BEFORE GOING LIVE:

┌─────────────────────────────────┬────────────────────────────────┐
│ Variable Name                   │ Where to get it                │
├─────────────────────────────────┼────────────────────────────────┤
│ DATABASE_URL                    │ Supabase > Settings > Database │
│ DIRECT_URL                      │ Supabase > Settings > Database │
│ NEXT_PUBLIC_SUPABASE_URL        │ Supabase > Settings > API      │
│ NEXT_PUBLIC_SUPABASE_ANON_KEY   │ Supabase > Settings > API      │
│ NEXTAUTH_SECRET                 │ Generate with openssl command  │
│ NEXTAUTH_URL                    │ https://yourdomain.com         │
│ RESEND_API_KEY                  │ Resend Dashboard               │
│ ADMIN_EMAIL                     │ Your email address             │
│ FROM_EMAIL                      │ noreply@yourdomain.com         │
│ NEXT_PUBLIC_TURNSTILE_SITE_KEY  │ Cloudflare Dashboard           │
│ TURNSTILE_SECRET_KEY            │ Cloudflare Dashboard           │
│ NEXT_PUBLIC_GA_MEASUREMENT_ID   │ Google Analytics               │
│ NEXT_PUBLIC_SITE_URL            │ https://yourdomain.com         │
└─────────────────────────────────┴────────────────────────────────┘
```

### 12.6 Post-Deployment Verification Checklist

```
AFTER EVERY PRODUCTION DEPLOYMENT, VERIFY:

□ Home page loads at yourdomain.com
□ Navigation works on all pages
□ Contact form submits successfully
□ Admin email notification received
□ Customer auto-reply received
□ Lead appears in /admin/leads
□ Admin login works at /admin/login
□ /admin is blocked without login (redirects to /admin/login)
□ Portfolio images load correctly
□ FAQ accordion works
□ Mobile CTA bar visible on mobile devices
□ Google Analytics receiving events (check Realtime view)
□ No console errors in browser
□ Lighthouse score run on home page (target: 95+)
```

---

## APPENDIX A — TECHNOLOGY DECISION RATIONALE

| Decision | Alternative Considered | Why We Chose This |
|---|---|---|
| Next.js App Router | Pages Router | Better performance, Server Components, future-proof |
| Prisma ORM | Direct SQL / Drizzle | Best TypeScript integration, auto-generated types |
| Auth.js Credentials | Clerk / Supabase Auth | No per-seat pricing, full control, admin-only need |
| Resend | SendGrid / Nodemailer | Modern API, excellent developer experience, free tier |
| Cloudflare Turnstile | reCAPTCHA | Privacy-friendly, no user friction, free |
| Supabase | PlanetScale / Railway | PostgreSQL + Storage + free tier in one platform |
| Vercel | Railway / Netlify | Best Next.js support (same company), global CDN |
| Shadcn UI | MUI / Ant Design | Copy-paste components, full ownership, Tailwind native |

---

## APPENDIX B — PERFORMANCE BUDGET

```
HOME PAGE (most important):
─────────────────────────────────
Total JavaScript:     < 150kb (gzipped)
Total CSS:            < 30kb (gzipped)
Total images above fold: < 200kb (WebP)
Total page weight:    < 500kb (initial load)
Time to First Byte:   < 200ms (Vercel Edge)
First Contentful Paint: < 1.5s
LCP:                  < 2.5s
```

---

*End of Technical Specification Document v1.0*  
*Next document: Phase 0 Setup Guide (Account Creation & Configuration)*
