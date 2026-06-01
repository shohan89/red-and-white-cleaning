# Project Bootstrap Guide
# Red & White Cleaning Services LTD

**Version:** 1.0  
**Date:** June 2026  
**Status:** Ready to Execute  
**Shell:** Run all commands in your terminal (Bash, Git Bash, or PowerShell)  

---

## IMPORTANT BEFORE YOU START

You are currently inside `c:\projects\JS\rw-cleaning`. This folder already contains your planning documents. That is correct — Next.js will be installed directly into this folder.

Read each step fully before running the command. Do not skip ahead.

---

## PHASE 0 — PREREQUISITES VERIFICATION

Before creating any files, confirm your machine has the required tools installed.

---

### STEP 1 — Verify Node.js Version

**Command:**
```bash
node --version
```

**Why this is needed:**
Next.js 15 requires Node.js version 18.18 or higher. Version 20 is recommended. If your version is too old, create-next-app will fail silently or produce unexpected errors.

**Expected output:**
```
v20.11.0
```
(Any v20.x or v22.x is fine. v18.x also works.)

**How to verify success:**
The version number starts with `v20` or higher. If you see `v16` or `v18.0` through `v18.17`, you must upgrade Node.js before continuing.

**If it fails:**
Download Node.js v20 LTS from nodejs.org. On Windows, run the installer, then restart your terminal and run the command again.

---

### STEP 2 — Verify npm Version

**Command:**
```bash
npm --version
```

**Why this is needed:**
npm is the tool that installs all the packages your project needs. Version 9 or higher is required for the install commands in this guide to work correctly.

**Expected output:**
```
10.2.4
```
(Any version 9.x or 10.x is fine.)

**How to verify success:**
The version number is 9 or higher. npm ships bundled with Node.js, so if your Node.js is up to date, npm will be too.

---

### STEP 3 — Verify Git Is Installed

**Command:**
```bash
git --version
```

**Why this is needed:**
Git is required to initialize version control for the project, and Vercel deploys from a Git repository.

**Expected output:**
```
git version 2.43.0.windows.1
```

**How to verify success:**
Any git version is printed. If the command is not found, download Git from git-scm.com.

---

## PHASE 1 — CREATE THE NEXT.JS PROJECT

---

### STEP 4 — Create the Next.js 15 Application

**Command:**
```bash
npx create-next-app@latest .
```

**Why this is needed:**
This is the official Next.js scaffolding tool. It creates the entire project structure — the `src/app` directory, TypeScript configuration, Tailwind CSS, ESLint, and all base config files — in one command. The `.` means "create in the current directory."

**What the command will ask you:**
Answer exactly as shown below.

```
✔ Would you like to use TypeScript?                 Yes
✔ Would you like to use ESLint?                     Yes
✔ Would you like to use Tailwind CSS?               Yes
✔ Would you like your code inside a `src/` directory? Yes
✔ Would you like to use App Router? (recommended)   Yes
✔ Would you like to use Turbopack for `next dev`?   No
✔ Would you like to customize the import alias (@/* by default)? No
```

> **Note:** If it asks "The directory is not empty, would you like to continue?" — answer **Yes**. This is because your planning documents are already in the folder. That is fine.

**Expected output:**
```
Creating a new Next.js app in C:\projects\JS\rw-cleaning.

Using npm.

Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- eslint
- eslint-config-next
- @eslint/eslintrc

✔ All done!
```

**How to verify success:**
Run `ls src/app` — you should see `favicon.ico`, `globals.css`, `layout.tsx`, and `page.tsx`.

---

### STEP 5 — Start the Dev Server (Quick Smoke Test)

**Command:**
```bash
npm run dev
```

**Why this is needed:**
Before installing anything else, confirm the base project works. This catches problems immediately — before you add complexity.

**Expected output:**
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Ready in 2.1s
```

**How to verify success:**
Open your browser and go to `http://localhost:3000`. You should see the default Next.js welcome page with the Next.js logo.

**After verifying:**
Stop the server by pressing `Ctrl + C` in the terminal. Do not leave it running while installing packages.

---

## PHASE 2 — INSTALL ALL DEPENDENCIES

All packages are installed in two commands — one for production dependencies, one for development-only tools. Installing in groups is faster than one at a time.

---

### STEP 6 — Install Production Dependencies

**Command:**
```bash
npm install @prisma/client @supabase/supabase-js next-auth@beta resend react-email @react-email/components react-hook-form @hookform/resolvers zod framer-motion bcryptjs @marsidev/react-turnstile
```

**Why each package is needed:**

| Package | Purpose |
|---|---|
| `@prisma/client` | The database client — lets your code talk to Supabase |
| `@supabase/supabase-js` | Supabase SDK — used for file/image storage uploads |
| `next-auth@beta` | Auth.js v5 — handles admin login sessions |
| `resend` | The email service SDK — sends admin and customer emails |
| `react-email` | Email template framework — build emails as React components |
| `@react-email/components` | Pre-built email UI blocks (Text, Button, etc.) |
| `react-hook-form` | Form state management — handles the contact form |
| `@hookform/resolvers` | Connects React Hook Form to Zod validation |
| `zod` | Schema validation — validates form data on client AND server |
| `framer-motion` | Animation library — used for page transitions and section animations |
| `bcryptjs` | Password hashing — secures the admin password in the database |
| `@marsidev/react-turnstile` | Cloudflare Turnstile React component — bot protection on the form |

**Expected output:**
```
added 287 packages, and audited 288 packages in 45s
found 0 vulnerabilities
```
(Package count will differ slightly — that is normal.)

**How to verify success:**
Run `npm list @prisma/client next-auth resend zod framer-motion` — each package should print its version number.

---

### STEP 7 — Install Development Dependencies

**Command:**
```bash
npm install --save-dev prisma @types/bcryptjs dotenv-cli ts-node
```

**Why each package is needed:**

| Package | Purpose |
|---|---|
| `prisma` | The Prisma CLI — runs migrations and generates the database client |
| `@types/bcryptjs` | TypeScript type definitions for bcryptjs |
| `dotenv-cli` | Loads `.env.local` when running Prisma CLI commands |
| `ts-node` | Runs TypeScript files directly — needed to execute the seed script |

> **What is `--save-dev`?**
> It means these packages are ONLY used during development (on your machine). They are NOT included in the production build deployed to Vercel. This keeps the production bundle smaller.

**Expected output:**
```
added 4 packages, and audited 292 packages in 8s
found 0 vulnerabilities
```

**How to verify success:**
Run `npm list prisma dotenv-cli ts-node` — each should show its version.

---

### STEP 8 — Add Database Scripts to package.json

**Why this is needed:**
Prisma CLI commands read environment variables from a `.env` file by default. But we are storing all secrets in `.env.local` (Next.js standard). The `dotenv-cli` package lets us tell Prisma to load `.env.local` instead. We wire this up through npm scripts so you never have to remember the long command.

**Open `package.json`** (it is in the root of the project) and replace the `"scripts"` section with this:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "db:migrate": "dotenv -e .env.local -- npx prisma migrate dev",
  "db:push": "dotenv -e .env.local -- npx prisma db push",
  "db:studio": "dotenv -e .env.local -- npx prisma studio",
  "db:generate": "dotenv -e .env.local -- npx prisma generate",
  "db:seed": "dotenv -e .env.local -- npx ts-node prisma/seed.ts",
  "db:reset": "dotenv -e .env.local -- npx prisma migrate reset"
},
```

> **What each script does:**
> - `db:migrate` — Apply a new schema change to the database
> - `db:push` — Push schema changes without creating a migration file (useful in development)
> - `db:studio` — Open a visual database browser in your browser
> - `db:generate` — Regenerate TypeScript types after a schema change
> - `db:seed` — Insert starter data (admin user, settings) into the database
> - `db:reset` — DANGER: wipes the database and re-runs all migrations (development only)

**How to verify success:**
Run `npm run` — you should see all your custom `db:` scripts listed.

---

## PHASE 3 — INITIALIZE SHADCN UI

Shadcn UI is a component library. Unlike most libraries, it does not get installed as a package. Instead, it copies component source code directly into your project. You own the code — you can edit it freely.

---

### STEP 9 — Initialize Shadcn UI

**Command:**
```bash
npx shadcn@latest init
```

**What the command will ask you:**
Answer exactly as shown below.

```
✔ Which style would you like to use?          Default
✔ Which color would you like to use?          Neutral
✔ Would you like to use CSS variables?        Yes
```

> **Why Neutral?** We are choosing Neutral as the base color, not red. We will override the primary color to our brand red (#CC0000) manually in `globals.css` using CSS variables. This gives us full control.

**What this creates:**
- `components.json` — Shadcn configuration file
- `src/lib/utils.ts` — A `cn()` utility function that merges Tailwind class names
- Updates `tailwind.config.ts` with Shadcn's CSS variable setup
- Updates `src/app/globals.css` with Shadcn color tokens

**Expected output:**
```
✔ Writing components.json...
✔ Initializing project...
✔ Installing dependencies...

Success! Project initialization completed.
```

**How to verify success:**
Check that `components.json` now exists in your project root. Run `cat components.json` to see its contents.

---

### STEP 10 — Install All Shadcn Components

**Command:**
```bash
npx shadcn@latest add accordion avatar badge button card checkbox dialog dropdown-menu form input label select separator sheet skeleton switch table textarea toast toaster
```

**Why this is needed:**
This copies the source code of every Shadcn component we will need into `src/components/ui/`. Each one is a styled, accessible React component built on Radix UI primitives.

**What each component is used for:**

| Component | Used In |
|---|---|
| `accordion` | FAQ page expand/collapse |
| `avatar` | Admin sidebar user display |
| `badge` | Lead status chips (NEW, WON, etc.) |
| `button` | Every button on the site |
| `card` | Service cards, stats cards |
| `checkbox` | Portfolio form (Featured toggle) |
| `dialog` | Delete confirmation modals |
| `dropdown-menu` | Admin navigation dropdowns |
| `form` | Wraps React Hook Form fields |
| `input` | All text inputs |
| `label` | Form field labels |
| `select` | Service dropdown in contact form |
| `separator` | Horizontal divider lines |
| `sheet` | Mobile menu + lead detail slide-out panel |
| `skeleton` | Loading placeholder animations |
| `switch` | FAQ published toggle |
| `table` | Admin leads and portfolio tables |
| `textarea` | Message field in contact form |
| `toast` | Success/error notifications |
| `toaster` | Toast container (renders in root layout) |

**Expected output:**
```
✔ accordion
✔ avatar
✔ badge
...
✔ toaster

Done!
```

**How to verify success:**
Run `ls src/components/ui` — you should see a `.tsx` file for every component you added.

---

## PHASE 4 — CONFIGURE TAILWIND CSS

---

### STEP 11 — Add Brand Colors and Fonts to Tailwind

**Why this is needed:**
The brand colors (`#CC0000` red, `#222222` dark, `#F5F5F5` light gray) and fonts (Montserrat, Inter) need to be added to Tailwind so you can use them as utility classes like `bg-brand-red` or `text-brand-dark` anywhere in the project.

**Open `tailwind.config.ts`** and replace its entire contents with this:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        "brand-red":   "#CC0000",
        "brand-white": "#FFFFFF",
        "brand-dark":  "#222222",
        "brand-gray":  "#F5F5F5",

        // Shadcn CSS Variable Colors (do not remove — Shadcn depends on these)
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body:    ["var(--font-inter)", "sans-serif"],
        sans:    ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

**How to verify success:**
The file saves without TypeScript errors. Run `npm run dev` briefly — no errors in the terminal about Tailwind configuration.

---

### STEP 12 — Update globals.css with Brand Color Variables

**Why this is needed:**
Shadcn components read colors from CSS variables defined in `globals.css`. We need to set the `--primary` variable to our brand red so all Shadcn primary buttons and accents use the correct color.

**Open `src/app/globals.css`** and replace its entire contents with this:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background:   0 0% 100%;
    --foreground:   0 0% 13%;

    --card:         0 0% 100%;
    --card-foreground: 0 0% 13%;

    --popover:      0 0% 100%;
    --popover-foreground: 0 0% 13%;

    /* Primary = Brand Red #CC0000 */
    --primary:      0 100% 40%;
    --primary-foreground: 0 0% 100%;

    --secondary:    0 0% 96%;
    --secondary-foreground: 0 0% 13%;

    --muted:        0 0% 96%;
    --muted-foreground: 0 0% 45%;

    --accent:       0 0% 96%;
    --accent-foreground: 0 0% 13%;

    --destructive:  0 84% 60%;
    --destructive-foreground: 0 0% 98%;

    --border:       0 0% 90%;
    --input:        0 0% 90%;
    --ring:         0 100% 40%;

    --radius:       0.5rem;
  }

  .dark {
    --background:   0 0% 13%;
    --foreground:   0 0% 98%;
    --card:         0 0% 13%;
    --card-foreground: 0 0% 98%;
    --popover:      0 0% 13%;
    --popover-foreground: 0 0% 98%;
    --primary:      0 100% 40%;
    --primary-foreground: 0 0% 100%;
    --secondary:    0 0% 20%;
    --secondary-foreground: 0 0% 98%;
    --muted:        0 0% 20%;
    --muted-foreground: 0 0% 65%;
    --accent:       0 0% 20%;
    --accent-foreground: 0 0% 98%;
    --destructive:  0 62% 30%;
    --destructive-foreground: 0 0% 98%;
    --border:       0 0% 20%;
    --input:        0 0% 20%;
    --ring:         0 100% 40%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-body;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}
```

**How to verify success:**
The file saves. Run `npm run dev` and open `http://localhost:3000`. The page should still render without errors.

---

## PHASE 5 — CONFIGURE NEXT.JS

---

### STEP 13 — Update next.config.ts

**Why this is needed:**
Next.js blocks external images by default for security. We need to explicitly allow images from Supabase Storage (where portfolio photos are hosted). Without this, all `<Image>` components pointing to Supabase will fail with an error.

**Open `next.config.ts`** and replace its entire contents with this:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Supabase Storage — portfolio images
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    // Enables React Server Actions (already on by default in Next.js 15,
    // but explicit for clarity)
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;
```

**How to verify success:**
Run `npm run build` — no TypeScript errors. Then `Ctrl+C` to stop.

> **Note:** You will get warnings about missing pages — that is expected since we have not built any pages yet.

---

## PHASE 6 — SET UP PRISMA

Prisma is the tool that connects your Next.js app to the Supabase database. It reads `prisma/schema.prisma` to understand your tables, and generates TypeScript types so your code is type-safe.

---

### STEP 14 — Initialize Prisma

**Command:**
```bash
npx prisma init --datasource-provider postgresql
```

**Why this is needed:**
This creates two things:
1. `prisma/schema.prisma` — the file where you define your database tables
2. A `.env` file with a `DATABASE_URL` placeholder

We are using `--datasource-provider postgresql` because Supabase is a PostgreSQL database.

**Expected output:**
```
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database.
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client.
4. Done.
```

**How to verify success:**
Run `ls prisma` — you should see `schema.prisma`.

---

### STEP 15 — Delete the `.env` File Created by Prisma

**Why this is needed:**
Prisma creates a `.env` file at the project root. We do NOT want this file — we are using `.env.local` instead (which is already covered by `.gitignore`). If we leave `.env` in place, it could accidentally get committed to git and expose database credentials.

**Command:**
```bash
rm .env
```

**How to verify success:**
Run `ls -la` in the project root — `.env` should no longer be listed.

---

### STEP 16 — Write the Prisma Schema

**Why this is needed:**
`prisma/schema.prisma` is the single source of truth for your entire database structure. Every table, every column, every relationship is defined here. Without this, Prisma cannot create your database tables.

**Open `prisma/schema.prisma`** and replace its entire contents with this:

```prisma
// ─────────────────────────────────────────────────────────────────────────────
// prisma/schema.prisma
// Red & White Cleaning Services LTD
// Full schema — see DATABASE_DESIGN.md for rationale
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

model User {
  id        String   @id @default(cuid())
  email     String   @unique @db.VarChar(254)
  name      String?  @db.VarChar(100)
  password  String   @db.VarChar(100)
  role      UserRole @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

**How to verify success:**
Run `npx prisma validate` — you should see:

```
The schema at prisma/schema.prisma is valid 🚀
```

If you see errors, check for any typos in the schema file.

---

## PHASE 7 — CREATE ENVIRONMENT VARIABLES

---

### STEP 17 — Generate the Auth.js Secret

**Why this is needed:**
Auth.js encrypts your admin session cookie using a secret key. Without this key, sessions cannot be created. This must be a random 32-character string — never reuse a password or write one by hand.

**Command:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Expected output:**
A long random string like:
```
K8mP3xQvR7nL2wJ5yD9tB4cF1eA6sH0iG...
```

**How to verify success:**
A base64-encoded string is printed. Copy this entire string — you will paste it into `.env.local` in the next step.

---

### STEP 18 — Create the `.env.local` File

**Why this is needed:**
`.env.local` is where all your secret credentials live. Next.js automatically loads this file and makes its contents available to your code as `process.env.VARIABLE_NAME`. This file is already excluded from git by `.gitignore` — it will never be committed.

**Create a new file at the project root called `.env.local`** with this exact content. Fill in the values you collected from each service:

```bash
# ─── DATABASE (from Supabase > Settings > Database) ─────────────────────────
# Use the "Connection pooling" URL for DATABASE_URL
# Use the "Direct connection" URL for DIRECT_URL
DATABASE_URL="postgresql://postgres.XXXX:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.XXXX:[PASSWORD]@aws-0-us-east-1.supabase.com:5432/postgres"

# ─── SUPABASE (from Supabase > Settings > API) ───────────────────────────────
NEXT_PUBLIC_SUPABASE_URL="https://XXXX.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# ─── AUTH.JS ─────────────────────────────────────────────────────────────────
# Paste the output from Step 17 here
NEXTAUTH_SECRET="PASTE_YOUR_GENERATED_SECRET_HERE"
NEXTAUTH_URL="http://localhost:3000"

# ─── EMAIL (from Resend Dashboard) ───────────────────────────────────────────
RESEND_API_KEY="re_XXXXXXXXXXXX"
ADMIN_EMAIL="your-admin-email@example.com"
FROM_EMAIL="noreply@yourdomain.com"

# ─── CLOUDFLARE TURNSTILE (from Cloudflare Dashboard > Turnstile) ────────────
NEXT_PUBLIC_TURNSTILE_SITE_KEY="0x4AAAAAAA..."
TURNSTILE_SECRET_KEY="0x4AAAAAAA..."

# ─── GOOGLE ANALYTICS ────────────────────────────────────────────────────────
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# ─── APP ─────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> **IMPORTANT — Two database URLs:**
> Supabase provides two connection strings. You must use both:
> - `DATABASE_URL` — the "Transaction" or "Session" pooling URL (port 6543). Used by your live app for all requests.
> - `DIRECT_URL` — the direct connection URL (port 5432). Used ONLY by Prisma migrations. Prisma needs a direct connection (not pooled) to run `CREATE TABLE` statements.
>
> Both URLs come from: **Supabase Dashboard → Your Project → Settings → Database → Connection string**

**How to verify success:**
Run `ls -la` and confirm `.env.local` appears in the file list. It should NOT appear in `git status` (it is gitignored).

---

### STEP 19 — Create `.env.example` (Safe Template)

**Why this is needed:**
`.env.example` is a copy of `.env.local` but with all the values removed. It IS committed to git. When a new developer (or you on a new machine) clones the project, they see exactly which variables they need to fill in.

**Create a new file at the project root called `.env.example`** with this content:

```bash
# ─── DATABASE ────────────────────────────────────────────────────────────────
DATABASE_URL=""
DIRECT_URL=""

# ─── SUPABASE ────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""

# ─── AUTH.JS ─────────────────────────────────────────────────────────────────
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

# ─── EMAIL ───────────────────────────────────────────────────────────────────
RESEND_API_KEY=""
ADMIN_EMAIL=""
FROM_EMAIL=""

# ─── CLOUDFLARE TURNSTILE ────────────────────────────────────────────────────
NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
TURNSTILE_SECRET_KEY=""

# ─── GOOGLE ANALYTICS ────────────────────────────────────────────────────────
NEXT_PUBLIC_GA_MEASUREMENT_ID=""

# ─── APP ─────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=""
```

**How to verify success:**
Run `git status` — `.env.local` should NOT appear (it is gitignored). `.env.example` SHOULD appear as an untracked file.

---

## PHASE 8 — RUN THE FIRST DATABASE MIGRATION

> **STOP — Before running this step:**
> You must have filled in the `DATABASE_URL` and `DIRECT_URL` values in `.env.local` with real Supabase credentials. If you have not created a Supabase project yet, do that first and come back here.

---

### STEP 20 — Run the Initial Migration

**Command:**
```bash
npm run db:migrate -- --name init
```

**What this command does step by step:**
1. `dotenv -e .env.local` loads your `.env.local` variables into the terminal session
2. `prisma migrate dev` reads `prisma/schema.prisma`
3. Generates a SQL file at `prisma/migrations/[timestamp]_init/migration.sql`
4. Connects to your Supabase database using `DIRECT_URL`
5. Runs the SQL to create all tables, enums, and indexes
6. Generates an updated Prisma Client with TypeScript types for your schema

**Expected output:**
```
Environment variables loaded from .env.local
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database at "aws-0-..."

Applying migration `20260601_init`

The following migration(s) have been applied:

migrations/
  └─ 20260601_init/
    └─ migration.sql

Your database is now in sync with your schema.

Running generate... (Use --skip-generate to skip the generators)

✔ Generated Prisma Client (v5.x.x) to ./node_modules/@prisma/client
```

**How to verify success:**
Run `npm run db:studio` — this opens Prisma Studio (a visual database browser) at `http://localhost:5555`. You should see all your tables listed on the left: `leads`, `lead_notes`, `portfolio`, `faqs`, `seo_pages`, `settings`, `users`. All tables should be empty (0 rows). Press `Ctrl+C` to close Studio.

---

### STEP 21 — Create the Prisma Client Singleton

**Why this is needed:**
Prisma Client is the object that connects to your database. In Next.js development, the server restarts on every file save (hot reload). If you create a new Prisma Client on every restart, you will exhaust the database connection pool and get `Too many database connections` errors. The singleton pattern reuses the same client instance.

**Create a new file at `src/lib/prisma.ts`** with this content:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

**How to verify success:**
TypeScript should not show any errors on this file (hover over `prisma` in VS Code — it should show the Prisma Client type, not `any`).

---

## PHASE 9 — INITIALIZE GIT

---

### STEP 22 — Initialize Git Repository

**Command:**
```bash
git init
```

**Why this is needed:**
Git tracks every change you make to the project. Without git, you have no ability to undo changes, collaborate with others, or deploy to Vercel (which deploys from a git repository).

**Expected output:**
```
Initialized empty Git repository in C:/projects/JS/rw-cleaning/.git/
```

**How to verify success:**
Run `git status` — you should see a long list of untracked files.

---

### STEP 23 — Verify `.gitignore` is Correct

**Command:**
```bash
cat .gitignore
```

**Why this is needed:**
Confirm that `.env.local` and `node_modules` are both gitignored. If `.env.local` is not gitignored, your secrets would be committed to git — a critical security risk.

**Expected output should include these lines:**
```
# dependencies
/node_modules

# local env files
.env*.local

# next.js
/.next/
/out/
```

**How to verify success:**
Run `git status` — `node_modules/` and `.env.local` should NOT appear in the untracked files list.

---

### STEP 24 — Make the First Git Commit

**Command:**
```bash
git add .
git commit -m "chore: initial project bootstrap"
```

**Why this is needed:**
This saves a snapshot of your project at this point. From now on, every meaningful change will be committed with a descriptive message. If anything goes wrong later, you can always return to this known-good state.

**Expected output:**
```
[main (root-commit) a1b2c3d] chore: initial project bootstrap
 XX files changed, XXX insertions(+)
```

**How to verify success:**
Run `git log --oneline` — you should see your commit listed.

---

## PHASE 10 — FINAL VERIFICATION

---

### STEP 25 — Run the Dev Server and Check for Errors

**Command:**
```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Ready in 2.1s
```

**How to verify success:**
1. Open `http://localhost:3000` — the default Next.js page should appear
2. No red errors in the terminal
3. No TypeScript errors

---

### STEP 26 — Verify the Full Setup Checklist

Run through this checklist before declaring Phase 0 complete:

```
□ node --version shows v20+
□ npm --version shows 9+
□ npx create-next-app ran successfully
□ src/app/layout.tsx exists
□ src/components/ui/ folder exists with .tsx files
□ tailwind.config.ts has brand-red color defined
□ src/app/globals.css has --primary CSS variable set to red
□ next.config.ts allows Supabase image hostnames
□ prisma/schema.prisma exists with all 8 models
□ prisma/migrations/ folder exists with the init migration
□ .env.local exists with all variables filled in
□ .env.example exists with empty values
□ .env.local does NOT appear in git status
□ node_modules/ does NOT appear in git status
□ src/lib/prisma.ts exists (Prisma singleton)
□ npm run db:studio opens Prisma Studio at localhost:5555 with all tables visible
□ npm run dev starts without errors
□ First git commit exists (git log --oneline shows 1 entry)
```

If every box is checked — **Phase 0 and Phase 1 (Project Initialization) are complete.**

---

## WHAT YOU HAVE NOW

At this point, your project has:

| ✓ | What's Set Up |
|---|---|
| ✓ | Next.js 15 with TypeScript, Tailwind, App Router |
| ✓ | All npm dependencies installed |
| ✓ | Shadcn UI initialized + all components installed |
| ✓ | Brand colors (#CC0000) and fonts configured in Tailwind |
| ✓ | Prisma schema with all 8 tables created in Supabase |
| ✓ | Environment variables configured |
| ✓ | Prisma Client singleton created |
| ✓ | Git initialized with first commit |

**What is NOT set up yet (comes in Phase 2):**
- Header and Footer layout
- Home page content
- Contact form
- Admin dashboard
- Auth.js login system
- Email sending

---

## COMMON ERRORS AND FIXES

| Error | Cause | Fix |
|---|---|---|
| `Cannot find module '@prisma/client'` | Prisma Client not generated | Run `npm run db:generate` |
| `Environment variable not found: DATABASE_URL` | .env.local missing or wrong path | Check .env.local is in project root, not inside src/ |
| `Error: P1001 — Can't reach database server` | Wrong DATABASE_URL or Supabase paused | Check Supabase project is active, verify the URL |
| `TypeError: Cannot read properties of undefined` | Wrong Supabase URL format | Must include https:// at the start |
| `The table 'public.leads' does not exist` | Migration not run | Run `npm run db:migrate -- --name init` |
| `Module not found: Can't resolve 'react-email'` | Install failed | Run `npm install resend react-email @react-email/components` again |
| Shadcn components not found | Components not added | Run `npx shadcn@latest add [component-name]` |

---

*End of Bootstrap Guide v1.0*  
*Next phase: Phase 2 — Core Layout (Header, Footer, MobileCTABar)*
