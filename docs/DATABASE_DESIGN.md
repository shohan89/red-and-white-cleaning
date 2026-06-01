# Database Design Document
# Red & White Cleaning Services LTD

**Version:** 1.0  
**Date:** June 2026  
**Status:** Pending Approval  
**Scope:** Complete Prisma schema, ERD, and migration plan  

---

## TABLE OF CONTENTS

1. [Design Decisions](#1-design-decisions)
2. [Enums](#2-enums)
3. [Entity Relationship Diagram (ERD)](#3-entity-relationship-diagram-erd)
4. [Model Specifications](#4-model-specifications)
5. [Prisma Schema](#5-prisma-schema)
6. [Index Strategy](#6-index-strategy)
7. [Constraints & Rules](#7-constraints--rules)
8. [Future Scalability](#8-future-scalability)
9. [Migration Plan](#9-migration-plan)
10. [Seed Data Plan](#10-seed-data-plan)

---

## 1. DESIGN DECISIONS

Before looking at the schema, here is WHY each decision was made.

### 1.1 Why PostgreSQL (via Supabase)?
- Full ACID compliance — no data loss if server crashes mid-transaction
- Native ENUM types — enforced at the database level, not just application level
- Full-text search built in — useful for lead/FAQ search later
- Free tier on Supabase includes 500MB storage + file storage

### 1.2 Why Prisma ORM?
- Auto-generates TypeScript types from the schema — zero type mismatches
- All queries are parameterized — SQL injection is impossible
- Migration history is tracked in version control
- Schema is the single source of truth for the database structure

### 1.3 Why `cuid()` for IDs instead of auto-increment numbers?
- `cuid()` generates IDs like `clh3x4y5z0000abc123def456`
- Safe to expose in URLs (not sequential — attackers can't guess `/leads/2`, `/leads/3`)
- Works across distributed systems (no collision if you ever add a second database)
- Example: `/admin/portfolio/clh3x4y5z0000abc123def456`

### 1.4 Why separate `LeadNote` model instead of a notes text field on Lead?
- One lead can have multiple follow-up notes over time
- Notes are timestamped individually — you can see the history
- If you only had one text field, you'd overwrite previous notes

### 1.5 Why separate `PortfolioImage` model instead of a single imageUrl?
- Future: each portfolio project can have multiple photos (gallery per project)
- Supports before/after image pairing within the same project
- Does not break anything today — start with one image, expand later

### 1.6 Why a `SeoPage` model instead of hardcoding SEO in the code?
- Admin can update meta titles and descriptions from the dashboard without a developer
- Critical for a client handoff — they can manage their own SEO content
- Fallback: if no row exists for a page, the code falls back to sensible defaults

### 1.7 Why a `Settings` model as a singleton?
- Company phone, email, address, and social links appear in the footer on every page
- Admin updates them once — they update everywhere automatically
- "Singleton" means exactly ONE row will ever exist in this table

---

## 2. ENUMS

Enums are fixed lists of allowed values. PostgreSQL enforces them at the database level — it is impossible to save an invalid value.

### LeadStatus
Tracks where a lead is in the sales pipeline.

```
NEW          → Just submitted. Not yet reviewed by admin.
CONTACTED    → Admin has reached out to the prospect.
QUOTED       → A formal quote has been sent.
WON          → Client accepted. Job booked.
LOST         → Client declined or went with a competitor.
```

### ServiceType
The exact services offered. Matches the dropdown on the contact form.

```
POST_CONSTRUCTION  → Post construction cleaning
COMMERCIAL         → Commercial cleaning
DEEP_CLEANING      → Deep cleaning
ONGOING_CONTRACT   → Ongoing maintenance contract
OTHER              → Other / not listed
```

### PortfolioCategory
Categories for filtering the portfolio gallery.

```
POST_CONSTRUCTION  → Post construction jobs
COMMERCIAL         → Commercial cleaning jobs
DEEP_CLEANING      → Deep cleaning jobs
BEFORE_AFTER       → Before and after comparison photos
```

### UserRole
Admin access levels. Only ADMIN exists now. SUPER_ADMIN reserved for future use.

```
ADMIN        → Can manage leads, portfolio, FAQ, settings
SUPER_ADMIN  → Future: can also manage other admin users
```

---

## 3. ENTITY RELATIONSHIP DIAGRAM (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CURRENT DATABASE SCHEMA                                │
└─────────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────────────┐
                    │            LEAD              │
                    ├─────────────────────────────┤
                    │ PK  id          cuid         │
                    │     name        varchar(100) │
                    │     companyName varchar(100) │  ← optional
                    │     email       varchar(254) │
                    │     phone       varchar(20)  │  ← optional
                    │ FK  serviceType ServiceType  │  ← enum
                    │     location    varchar(100) │
                    │     message     text         │
                    │     hearAboutUs varchar(100) │  ← optional
                    │     status      LeadStatus   │  ← enum, default: NEW
                    │     createdAt   timestamp    │
                    │     updatedAt   timestamp    │
                    └──────────────┬──────────────┘
                                   │ 1
                                   │ has many
                                   │ ∞
                    ┌──────────────▼──────────────┐
                    │          LEAD_NOTE           │
                    ├─────────────────────────────┤
                    │ PK  id        cuid           │
                    │ FK  leadId    → leads.id     │  ← CASCADE DELETE
                    │     content   text           │
                    │     createdAt timestamp      │
                    │     updatedAt timestamp      │
                    └─────────────────────────────┘


                    ┌─────────────────────────────┐
                    │          PORTFOLIO           │
                    ├─────────────────────────────┤
                    │ PK  id          cuid         │
                    │     title       varchar(200) │
                    │ UQ  slug        varchar(200) │  ← unique URL-safe key
                    │ FK  category    PortfolioCat │  ← enum
                    │     description text         │  ← optional
                    │     imageUrl    varchar(500) │  ← primary/cover image
                    │     altText     varchar(200) │
                    │     featured    boolean      │  ← show on home page
                    │     sortOrder   int          │  ← manual ordering
                    │     createdAt   timestamp    │
                    │     updatedAt   timestamp    │
                    └──────────────┬──────────────┘
                                   │ 1
                                   │ has many
                                   │ ∞
                    ┌──────────────▼──────────────┐
                    │       PORTFOLIO_IMAGE        │
                    ├─────────────────────────────┤
                    │ PK  id          cuid         │
                    │ FK  portfolioId → portfolio  │  ← CASCADE DELETE
                    │     imageUrl    varchar(500) │
                    │     altText     varchar(200) │
                    │     isBefore    boolean      │  ← for before/after
                    │     isAfter     boolean      │  ← for before/after
                    │     sortOrder   int          │
                    │     createdAt   timestamp    │
                    └─────────────────────────────┘


                    ┌─────────────────────────────┐
                    │             FAQ              │
                    ├─────────────────────────────┤
                    │ PK  id        cuid           │
                    │     question  varchar(500)   │
                    │     answer    text           │
                    │     sortOrder int            │  ← drag to reorder
                    │     published boolean        │  ← show/hide without delete
                    │     createdAt timestamp      │
                    │     updatedAt timestamp      │
                    └─────────────────────────────┘


                    ┌─────────────────────────────┐
                    │           SEO_PAGE           │
                    ├─────────────────────────────┤
                    │ PK  id              cuid     │
                    │ UQ  pageSlug        varchar  │  ← "home", "about", etc.
                    │     metaTitle       varchar  │  ← max 60 chars
                    │     metaDescription varchar  │  ← max 160 chars
                    │     ogImage         varchar  │  ← URL to image
                    │     createdAt       timestamp│
                    │     updatedAt       timestamp│
                    └─────────────────────────────┘


                    ┌─────────────────────────────┐
                    │           SETTINGS           │
                    ├─────────────────────────────┤
                    │ PK  id             cuid      │  ← only 1 row ever exists
                    │     companyName    varchar   │
                    │     phone          varchar   │
                    │     email          varchar   │
                    │     address        varchar   │  ← optional
                    │     serviceAreas   text      │  ← comma-separated cities
                    │     googleMapEmbed text      │  ← optional embed HTML
                    │     facebook       varchar   │  ← optional URL
                    │     instagram      varchar   │  ← optional URL
                    │     linkedin       varchar   │  ← optional URL
                    │     businessHours  varchar   │  ← optional text
                    │     createdAt      timestamp │
                    │     updatedAt      timestamp │
                    └─────────────────────────────┘


                    ┌─────────────────────────────┐
                    │             USER             │
                    ├─────────────────────────────┤
                    │ PK  id        cuid           │
                    │ UQ  email     varchar(254)   │
                    │     name      varchar(100)   │  ← optional
                    │     password  varchar(100)   │  ← bcrypt hash ONLY
                    │     role      UserRole       │  ← enum, default: ADMIN
                    │     createdAt timestamp      │
                    │     updatedAt timestamp      │
                    └─────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                       FUTURE MODELS (scaffold only)                         │
└─────────────────────────────────────────────────────────────────────────────┘

  SERVICE_AREA                TESTIMONIAL               BLOG_POST
  ─────────────               ───────────               ─────────
  id                          id                        id
  city                        clientName                title
  province                    company                   slug
  slug (/service-area/*)      serviceType               excerpt
  headline                    quote                     content
  description                 rating (1-5)              category
  metaTitle                   approved                  published
  metaDescription             createdAt                 publishedAt
  createdAt                   updatedAt                 createdAt
  updatedAt                                             updatedAt
```

---

## 4. MODEL SPECIFICATIONS

Detailed breakdown of every model, field, and decision.

---

### 4.1 Lead

**Purpose:** Stores every contact form submission from the public website.

| Field | Type | Required | Constraint | Notes |
|---|---|---|---|---|
| id | String | YES | PK, cuid() | Never sequential — safe in URLs |
| name | String | YES | max 100 chars | Full name |
| companyName | String? | NO | max 100 chars | Optional — many are individuals |
| email | String | YES | max 254 chars | RFC 5321 max email length |
| phone | String? | NO | max 20 chars | Optional — stored as string, not number |
| serviceType | ServiceType | YES | ENUM | Validated against allowed values |
| location | String | YES | max 100 chars | City / area they're in |
| message | String | YES | TEXT | No length limit |
| hearAboutUs | String? | NO | max 100 chars | Marketing attribution |
| status | LeadStatus | YES | ENUM, default: NEW | Pipeline tracking |
| createdAt | DateTime | YES | default: now() | Auto-set on insert |
| updatedAt | DateTime | YES | @updatedAt | Auto-set on every update |

**Relationships:**
- Has many `LeadNote` (one lead → many notes)

**Indexes:**
- `status` — for filtering "show me all NEW leads"
- `createdAt DESC` — for sorting "newest first"
- `email` — for searching by email

---

### 4.2 LeadNote

**Purpose:** Admin notes added to a lead over time. Tracks the sales conversation history.

| Field | Type | Required | Constraint | Notes |
|---|---|---|---|---|
| id | String | YES | PK, cuid() | |
| leadId | String | YES | FK → Lead.id | |
| content | String | YES | TEXT | The note content |
| createdAt | DateTime | YES | default: now() | |
| updatedAt | DateTime | YES | @updatedAt | |

**Relationships:**
- Belongs to `Lead` (CASCADE DELETE — deleting a lead deletes all its notes)

**Indexes:**
- `leadId` — for fetching all notes for a given lead

---

### 4.3 Portfolio

**Purpose:** Stores portfolio projects shown in the gallery.

| Field | Type | Required | Constraint | Notes |
|---|---|---|---|---|
| id | String | YES | PK, cuid() | |
| title | String | YES | max 200 chars | Display name |
| slug | String | YES | UNIQUE, max 200 | URL-safe version of title |
| category | PortfolioCategory | YES | ENUM | For gallery filtering |
| description | String? | NO | TEXT | Optional project description |
| imageUrl | String | YES | max 500 chars | Supabase Storage URL (cover image) |
| altText | String | YES | max 200 chars | Required — SEO + accessibility |
| featured | Boolean | YES | default: false | Show on home page |
| sortOrder | Int | YES | default: 0 | Manual ordering in admin |
| createdAt | DateTime | YES | default: now() | |
| updatedAt | DateTime | YES | @updatedAt | |

**Relationships:**
- Has many `PortfolioImage` (one project → multiple photos)

**Indexes:**
- `category` — for filtering gallery by type
- `featured` — for fast query of featured items on home page
- `sortOrder` — for ordered display

---

### 4.4 PortfolioImage

**Purpose:** Additional images for a portfolio project. Currently optional — used when a project has multiple photos or before/after pairs.

| Field | Type | Required | Constraint | Notes |
|---|---|---|---|---|
| id | String | YES | PK, cuid() | |
| portfolioId | String | YES | FK → Portfolio.id | |
| imageUrl | String | YES | max 500 chars | Supabase Storage URL |
| altText | String | YES | max 200 chars | Required |
| isBefore | Boolean | YES | default: false | Tag as "before" photo |
| isAfter | Boolean | YES | default: false | Tag as "after" photo |
| sortOrder | Int | YES | default: 0 | Order within project gallery |
| createdAt | DateTime | YES | default: now() | |

**Relationships:**
- Belongs to `Portfolio` (CASCADE DELETE)

**Indexes:**
- `portfolioId` — for fetching all images for a project

---

### 4.5 FAQ

**Purpose:** Frequently asked questions displayed on the /faq page and /faq preview on home page.

| Field | Type | Required | Constraint | Notes |
|---|---|---|---|---|
| id | String | YES | PK, cuid() | |
| question | String | YES | max 500 chars | The question text |
| answer | String | YES | TEXT | Supports longer answers |
| sortOrder | Int | YES | default: 0 | Admin drags to reorder |
| published | Boolean | YES | default: true | Hide without deleting |
| createdAt | DateTime | YES | default: now() | |
| updatedAt | DateTime | YES | @updatedAt | |

**Indexes:**
- `sortOrder` — for ordered display
- `published` — for filtering to only show published FAQs

---

### 4.6 SeoPage

**Purpose:** Per-page SEO metadata that admin can update from the dashboard without touching code.

| Field | Type | Required | Constraint | Notes |
|---|---|---|---|---|
| id | String | YES | PK, cuid() | |
| pageSlug | String | YES | UNIQUE | e.g., "home", "about", "services" |
| metaTitle | String? | NO | max 60 chars | Google truncates at ~60 |
| metaDescription | String? | NO | max 160 chars | Google truncates at ~160 |
| ogImage | String? | NO | max 500 chars | URL to Open Graph image |
| createdAt | DateTime | YES | default: now() | |
| updatedAt | DateTime | YES | @updatedAt | |

**Seeded page slugs:**
`home`, `about`, `services`, `portfolio`, `faq`, `contact`

**Fallback behavior:** If a SeoPage row doesn't exist for a given slug, the code falls back to hardcoded default metadata. This model only overrides defaults.

**Indexes:**
- `pageSlug` (UNIQUE) — for fast lookup by page slug

---

### 4.7 Settings

**Purpose:** Site-wide settings. Only ONE row ever exists (singleton pattern).

| Field | Type | Required | Constraint | Notes |
|---|---|---|---|---|
| id | String | YES | PK, cuid() | |
| companyName | String | YES | max 200 chars | |
| phone | String | YES | max 20 chars | |
| email | String | YES | max 254 chars | |
| address | String? | NO | max 300 chars | Optional street address |
| serviceAreas | String | YES | TEXT | Comma-separated city list |
| googleMapEmbed | String? | NO | TEXT | Full iframe embed HTML |
| facebook | String? | NO | max 500 chars | Full URL |
| instagram | String? | NO | max 500 chars | Full URL |
| linkedin | String? | NO | max 500 chars | Full URL |
| businessHours | String? | NO | max 200 chars | e.g., "Mon–Fri 8am–6pm" |
| createdAt | DateTime | YES | default: now() | |
| updatedAt | DateTime | YES | @updatedAt | |

**Singleton enforcement:** The application code uses `upsert` to create or update the single row. There is no way to create a second row through the admin dashboard.

---

### 4.8 User

**Purpose:** Admin login accounts. Typically just one user (the business owner).

| Field | Type | Required | Constraint | Notes |
|---|---|---|---|---|
| id | String | YES | PK, cuid() | |
| email | String | YES | UNIQUE | Login identifier |
| name | String? | NO | max 100 chars | Display name |
| password | String | YES | max 100 chars | bcrypt hash ONLY — never plaintext |
| role | UserRole | YES | ENUM, default: ADMIN | |
| createdAt | DateTime | YES | default: now() | |
| updatedAt | DateTime | YES | @updatedAt | |

**Security note:** The `password` field stores ONLY the bcrypt hash. The raw password is never stored or logged anywhere.

---

## 5. PRISMA SCHEMA

This is the exact content that will go into `prisma/schema.prisma`.

```prisma
// ─────────────────────────────────────────────────────────────────────────────
// prisma/schema.prisma
// Red & White Cleaning Services LTD
// ─────────────────────────────────────────────────────────────────────────────

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ─── ENUMS ────────────────────────────────────────────────────────────────────

enum LeadStatus {
  NEW
  CONTACTED
  QUOTED
  WON
  LOST
}

enum ServiceType {
  POST_CONSTRUCTION
  COMMERCIAL
  DEEP_CLEANING
  ONGOING_CONTRACT
  OTHER
}

enum PortfolioCategory {
  POST_CONSTRUCTION
  COMMERCIAL
  DEEP_CLEANING
  BEFORE_AFTER
}

enum UserRole {
  ADMIN
  SUPER_ADMIN
}

// ─── MODELS ───────────────────────────────────────────────────────────────────

// Lead: every contact form submission from the public website
model Lead {
  id          String      @id @default(cuid())
  name        String      @db.VarChar(100)
  companyName String?     @db.VarChar(100)
  email       String      @db.VarChar(254)
  phone       String?     @db.VarChar(20)
  serviceType ServiceType
  location    String      @db.VarChar(100)
  message     String      @db.Text
  hearAboutUs String?     @db.VarChar(100)
  status      LeadStatus  @default(NEW)
  notes       LeadNote[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([status])
  @@index([createdAt(sort: Desc)])
  @@index([email])
  @@map("leads")
}

// LeadNote: admin notes on a lead (sales follow-up history)
model LeadNote {
  id        String   @id @default(cuid())
  leadId    String
  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  content   String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([leadId])
  @@map("lead_notes")
}

// Portfolio: project gallery items shown on the /portfolio page
model Portfolio {
  id          String            @id @default(cuid())
  title       String            @db.VarChar(200)
  slug        String            @unique @db.VarChar(200)
  category    PortfolioCategory
  description String?           @db.Text
  imageUrl    String            @db.VarChar(500)
  altText     String            @db.VarChar(200)
  featured    Boolean           @default(false)
  sortOrder   Int               @default(0)
  images      PortfolioImage[]
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  @@index([category])
  @@index([featured])
  @@index([sortOrder])
  @@map("portfolio")
}

// PortfolioImage: additional images per portfolio project (before/after support)
model PortfolioImage {
  id          String    @id @default(cuid())
  portfolioId String
  portfolio   Portfolio @relation(fields: [portfolioId], references: [id], onDelete: Cascade)
  imageUrl    String    @db.VarChar(500)
  altText     String    @db.VarChar(200)
  isBefore    Boolean   @default(false)
  isAfter     Boolean   @default(false)
  sortOrder   Int       @default(0)
  createdAt   DateTime  @default(now())

  @@index([portfolioId])
  @@map("portfolio_images")
}

// FAQ: questions and answers shown on the /faq page
model FAQ {
  id        String   @id @default(cuid())
  question  String   @db.VarChar(500)
  answer    String   @db.Text
  sortOrder Int      @default(0)
  published Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([sortOrder])
  @@index([published])
  @@map("faqs")
}

// SeoPage: per-page SEO metadata managed from admin dashboard
model SeoPage {
  id              String   @id @default(cuid())
  pageSlug        String   @unique @db.VarChar(100)
  metaTitle       String?  @db.VarChar(60)
  metaDescription String?  @db.VarChar(160)
  ogImage         String?  @db.VarChar(500)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([pageSlug])
  @@map("seo_pages")
}

// Settings: singleton row — site-wide configuration
model Settings {
  id             String   @id @default(cuid())
  companyName    String   @default("Red & White Cleaning Services LTD") @db.VarChar(200)
  phone          String   @default("") @db.VarChar(20)
  email          String   @default("") @db.VarChar(254)
  address        String?  @db.VarChar(300)
  serviceAreas   String   @default("") @db.Text
  googleMapEmbed String?  @db.Text
  facebook       String?  @db.VarChar(500)
  instagram      String?  @db.VarChar(500)
  linkedin       String?  @db.VarChar(500)
  businessHours  String?  @db.VarChar(200)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@map("settings")
}

// User: admin login accounts
model User {
  id        String   @id  @default(cuid())
  email     String   @unique @db.VarChar(254)
  name      String?  @db.VarChar(100)
  password  String   @db.VarChar(100)
  role      UserRole @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

// ─── FUTURE MODELS (commented out — do not uncomment until needed) ─────────────

// model ServiceArea {
//   id              String   @id @default(cuid())
//   city            String   @db.VarChar(100)
//   province        String   @default("Ontario") @db.VarChar(100)
//   slug            String   @unique @db.VarChar(100)
//   headline        String   @db.VarChar(200)
//   description     String   @db.Text
//   metaTitle       String?  @db.VarChar(60)
//   metaDescription String?  @db.VarChar(160)
//   published       Boolean  @default(false)
//   createdAt       DateTime @default(now())
//   updatedAt       DateTime @updatedAt
//   @@map("service_areas")
// }

// model Testimonial {
//   id          String   @id @default(cuid())
//   clientName  String   @db.VarChar(100)
//   company     String?  @db.VarChar(100)
//   serviceType ServiceType?
//   quote       String   @db.Text
//   rating      Int      @default(5)
//   approved    Boolean  @default(false)
//   sortOrder   Int      @default(0)
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   @@map("testimonials")
// }

// model BlogPost {
//   id          String   @id @default(cuid())
//   title       String   @db.VarChar(200)
//   slug        String   @unique @db.VarChar(200)
//   excerpt     String   @db.VarChar(300)
//   content     String   @db.Text
//   published   Boolean  @default(false)
//   publishedAt DateTime?
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   @@map("blog_posts")
// }
```

---

## 6. INDEX STRATEGY

Indexes make database queries faster. Each index adds a small cost to INSERT operations but makes SELECT (read) queries dramatically faster.

```
TABLE: leads
┌──────────────────────────────────────────────────────────────────┐
│ Index          │ Columns              │ Query it speeds up       │
├──────────────────────────────────────────────────────────────────┤
│ idx_leads_1    │ status               │ WHERE status = 'NEW'     │
│ idx_leads_2    │ createdAt DESC       │ ORDER BY createdAt DESC  │
│ idx_leads_3    │ email                │ WHERE email = '...'      │
└──────────────────────────────────────────────────────────────────┘

TABLE: lead_notes
┌──────────────────────────────────────────────────────────────────┐
│ idx_notes_1    │ leadId               │ WHERE leadId = '...'     │
└──────────────────────────────────────────────────────────────────┘

TABLE: portfolio
┌──────────────────────────────────────────────────────────────────┐
│ idx_port_1     │ category             │ WHERE category = '...'   │
│ idx_port_2     │ featured             │ WHERE featured = true     │
│ idx_port_3     │ sortOrder            │ ORDER BY sortOrder        │
│ UNIQUE         │ slug                 │ WHERE slug = '...'        │
└──────────────────────────────────────────────────────────────────┘

TABLE: portfolio_images
┌──────────────────────────────────────────────────────────────────┐
│ idx_pimg_1     │ portfolioId          │ WHERE portfolioId = '...' │
└──────────────────────────────────────────────────────────────────┘

TABLE: faqs
┌──────────────────────────────────────────────────────────────────┐
│ idx_faq_1      │ sortOrder            │ ORDER BY sortOrder        │
│ idx_faq_2      │ published            │ WHERE published = true    │
└──────────────────────────────────────────────────────────────────┘

TABLE: seo_pages
┌──────────────────────────────────────────────────────────────────┐
│ UNIQUE         │ pageSlug             │ WHERE pageSlug = 'home'   │
└──────────────────────────────────────────────────────────────────┘

TABLE: users
┌──────────────────────────────────────────────────────────────────┐
│ UNIQUE         │ email                │ WHERE email = '...'       │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. CONSTRAINTS & RULES

### 7.1 Referential Integrity (Foreign Key Behavior)

```
RELATIONSHIP: Lead → LeadNote
  onDelete: Cascade
  Meaning: Delete a lead → ALL its notes are automatically deleted too
  Why: Orphaned notes (notes with no parent lead) make no sense

RELATIONSHIP: Portfolio → PortfolioImage
  onDelete: Cascade
  Meaning: Delete a portfolio item → ALL its images are deleted too
  Why: Orphaned images waste storage and cause broken image URLs
```

### 7.2 Field-Level Constraints

```
email fields:     VarChar(254)  — RFC 5321 max length for email addresses
phone fields:     VarChar(20)   — Enough for international format (+1 519 555 0123)
URL fields:       VarChar(500)  — Long enough for any Supabase Storage URL
password field:   VarChar(100)  — bcrypt hashes are always 60 chars; 100 gives headroom
metaTitle:        VarChar(60)   — Google truncates titles at approximately 60 characters
metaDescription:  VarChar(160)  — Google truncates descriptions at approximately 160 characters
```

### 7.3 Business Rules (Enforced in Application Code)

These rules cannot be enforced by the database — they are enforced in the server actions:

```
RULE 1: Settings singleton
  Only one Settings row may exist.
  Enforced by: Using prisma.settings.upsert() instead of create()
  
RULE 2: Portfolio slug uniqueness
  Slug is auto-generated from title and must be URL-safe.
  Enforced by: Slug generation function + @unique constraint on column

RULE 3: LeadNote can only be created by admin
  Enforced by: Auth.js session check on all admin API routes

RULE 4: Lead status can only move forward (NEW → CONTACTED → QUOTED → WON/LOST)
  NOTE: This rule is NOT currently enforced at DB level.
  Current approach: UI only shows valid transitions. Simple. Revisit if needed.

RULE 5: Portfolio cover imageUrl must not be empty
  Enforced by: Zod validation in the server action — rejects empty string
```

---

## 8. FUTURE SCALABILITY

### 8.1 Phase 2 Tables (Ready to Add)

These tables are designed but commented out in the schema. They follow the same conventions and will slot in without changes to existing tables.

```
ServiceArea
─────────────────────────────────────────────────────────────────
Purpose: Power /service-area/[city] pages for local SEO
When to add: Phase 10 (SEO) or after launch
Impact on existing tables: None — completely separate

Testimonial
─────────────────────────────────────────────────────────────────
Purpose: Display client reviews on home page and service pages
When to add: After first few jobs are completed
Impact on existing tables: None — completely separate

BlogPost
─────────────────────────────────────────────────────────────────
Purpose: Content marketing blog for SEO
When to add: Future expansion — not in current scope
Impact on existing tables: None
```

### 8.2 Schema Migrations That Will Be Needed Later

The following changes are anticipated. They are NOT breaking changes — they add to the schema, not modify existing fields.

```
Migration: Add soft delete to Lead
  ADD COLUMN deletedAt DateTime? to leads table
  Purpose: Admin can "archive" leads without permanent deletion
  Breaking change: NO

Migration: Add assigned admin to Lead
  ADD COLUMN assignedTo String? FK → users.id to leads table
  Purpose: If multiple admin users are added in the future
  Breaking change: NO

Migration: Add full-text search index on leads
  CREATE INDEX leads_search ON leads USING gin(to_tsvector('english', name || email || message))
  Purpose: Fast full-text search across all lead fields
  Breaking change: NO — index only, no column changes

Migration: Add image storage bucket reference to Portfolio
  ADD COLUMN storagePath String? to portfolio table
  Purpose: Track Supabase Storage path for deletion management
  Breaking change: NO
```

### 8.3 Scalability Limits on Current Free Tier

```
Supabase Free Tier Limits:
  Database size:    500 MB      → Sufficient for 1M+ leads
  Storage:          1 GB        → Approximately 500–1000 portfolio images
  Bandwidth:        5 GB/month  → Sufficient for moderate traffic
  Connections:      60          → More than enough with Prisma connection pooler

When to upgrade:
  → Database approaching 400 MB
  → Storage approaching 800 MB
  → Monthly active users > 10,000
  Upgrade cost: $25/month (Pro plan)
```

---

## 9. MIGRATION PLAN

A "migration" is a versioned file that records every change to the database structure. Think of it as a git commit, but for the database.

### 9.1 Migration Sequence

```
MIGRATION 001 — Initial Schema (run once at project start)
─────────────────────────────────────────────────────────────
Creates tables: leads, lead_notes, portfolio, portfolio_images,
                faqs, seo_pages, settings, users
Creates enums:  LeadStatus, ServiceType, PortfolioCategory, UserRole
Creates indexes: all indexes defined in schema
Command: npx prisma migrate dev --name init

MIGRATION 002 — (Reserved for future changes)
─────────────────────────────────────────────────────────────
Not planned. Migrations are only created when the schema changes.
```

### 9.2 Migration Environments

```
Development (local machine):
  Command: npx prisma migrate dev
  Effect: Creates migration file + applies it to your local database
  Safe to run: YES — development database only

Production (Supabase):
  Command: npx prisma migrate deploy  (run by Vercel on deployment)
  Effect: Applies pending migrations to the production database
  Safe to run: YES for additive changes — CAREFUL for destructive changes
  
IMPORTANT RULE:
  Never run "migrate dev" against the production database.
  Never run "migrate reset" at all (this DELETES all data).
```

### 9.3 Migration Workflow

```
You make a change to prisma/schema.prisma
              │
              ▼
npx prisma migrate dev --name describe_the_change
              │
              ▼
Prisma creates: prisma/migrations/[timestamp]_describe_the_change/migration.sql
              │
              ▼
Prisma applies the migration to your local database
              │
              ▼
Prisma regenerates the Prisma Client (TypeScript types update)
              │
              ▼
git add prisma/migrations/
git commit -m "db: add [change description]"
              │
              ▼
git push → Vercel deploys → runs npx prisma migrate deploy
              │
              ▼
Production database updated — zero downtime
```

### 9.4 How to Handle Destructive Changes Safely

A "destructive change" means removing or renaming a column/table that already has data.

```
WRONG (will lose data):
  Delete the column from schema.prisma
  Run migrate dev
  ← Prisma will DROP the column and all its data

RIGHT (safe approach):
  Step 1: Deploy code that no longer USES the column
  Step 2: Verify in production that nothing reads the column
  Step 3: Create a migration to DROP the column
  Step 4: Deploy

This 2-step approach ensures you never lose data while code
still depends on the column.
```

---

## 10. SEED DATA PLAN

"Seeding" means inserting starter data into the database so the site isn't empty when first launched.

### 10.1 Required Seed Data (Must exist before launch)

```
1. Admin User (1 row in users table)
   ─────────────────────────────────
   email:    tofa.kuet@gmail.com (or chosen admin email)
   password: [bcrypt-hashed version of chosen password]
   name:     Admin
   role:     ADMIN
   
   How: Run a one-time seed script (prisma/seed.ts)

2. Settings (1 row in settings table)
   ─────────────────────────────────
   companyName:  Red & White Cleaning Services LTD
   phone:        [actual phone number]
   email:        [actual business email]
   serviceAreas: Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, Brantford
   
   How: Run seed script OR use admin dashboard Settings page after launch

3. SeoPage rows (6 rows in seo_pages table)
   ─────────────────────────────────────────
   Rows for: home, about, services, portfolio, faq, contact
   Fields: left empty — admin fills in from dashboard
   
   How: Seed script OR admin fills in from SEO module
```

### 10.2 Optional Seed Data (Makes development easier)

```
4. Sample FAQs (5–10 rows)
   ─────────────────────────────────
   So the FAQ page is not empty during development/testing
   
5. Sample Portfolio Items (4–6 rows)
   ─────────────────────────────────
   With placeholder images so the gallery page is visible
   Covers all 4 categories (one per category minimum)
```

### 10.3 Seed Script Location

```
prisma/
└── seed.ts       ← The seed script
                     Run with: npx prisma db seed
```

### 10.4 Sample FAQ Content for Seeding

```
1. Q: What areas do you service?
   A: We service Kitchener, Waterloo, Cambridge, Guelph, Hamilton, 
      London, and Brantford in Southern Ontario.

2. Q: Are you licensed and insured?
   A: Yes. Red & White Cleaning Services LTD is fully licensed and 
      carries comprehensive liability insurance for all commercial 
      and post-construction cleaning work.

3. Q: What is included in post-construction cleaning?
   A: Our post-construction cleaning includes removal of construction 
      dust and debris, cleaning of all surfaces, windows, fixtures, 
      floors, and final inspection to ensure the space is ready for 
      occupancy.

4. Q: How do I get a quote?
   A: Submit your project details through our contact form or call us 
      directly. We will respond within 1 business day with a customized 
      quote.

5. Q: Do you offer ongoing maintenance contracts?
   A: Yes. We offer customized recurring cleaning contracts for 
      commercial properties. Contact us to discuss frequency and pricing.
```

---

## SUMMARY — WHAT WE ARE BUILDING

```
TABLES:         8 (6 current + 2 future-ready supporting tables)
ENUMS:          4 (LeadStatus, ServiceType, PortfolioCategory, UserRole)
RELATIONSHIPS:  2 (Lead→LeadNote, Portfolio→PortfolioImage)
INDEXES:        12 total
MIGRATIONS:     1 initial migration

Current scope tables:
  leads             ← Core business — every form submission
  lead_notes        ← Admin follow-up notes per lead
  portfolio         ← Project gallery
  portfolio_images  ← Multiple images per project
  faqs              ← FAQ content
  seo_pages         ← Per-page SEO metadata
  settings          ← Site-wide configuration (singleton)
  users             ← Admin login
```

---

*End of Database Design Document v1.0*  
*Status: Awaiting approval — no files have been created yet*  
*Next step after approval: Create prisma/schema.prisma and run first migration*
