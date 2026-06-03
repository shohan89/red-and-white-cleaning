# Red and White Cleaning Services LTD

A premium, modern, and SEO-optimized commercial and post-construction cleaning service web application built using **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🌟 Key Features

- **Premium UI/UX**: Sleek dark-mode aesthetic featuring deep red accents, harmonious color palettes, fluid entry animations via `framer-motion`, and custom typography.
- **Responsive Navigation & Global Branding**: Interactive, accessibility-minded layout containing the official circular brand logo embedded seamlessly across the main Header navigation, responsive Mobile Drawer menu, and multi-column NAP (Name, Address, Phone) Footer.
- **Dynamic Portfolio & Gallery**: A structured portfolio showcase supporting filtering across project categories:
  - *Post-Construction Cleans*
  - *Commercial Office Cleaning*
  - *Before & After*
  - *Deep Cleans*
- **Interactive Before/After Slider**: A custom, touch-friendly image slider component designed to show side-by-side post-construction cleaning transformations.
- **Technical local SEO & Schema Markup**:
  - **FAQPage Schema**: Automatic server-rendered JSON-LD schema injection for the FAQ accordion to optimize for Google Rich Snippets.
  - **LocalBusiness Schema**: Embedded structured data mapping localized serving areas, operating hours, phone numbers, and NAP details to boost local rankings in KW (Kitchener-Waterloo) & Southern Ontario.
- **Zod-Validated Contact Form**: Full-featured client consultation form using `react-hook-form` and `zod` for robust client-side validation. Includes custom location matching and automatic redirect to a dedicated conversion-tracking `/thank-you` route.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod Validation](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Repository Structure

```text
├── public/
│   ├── images/
│   │   ├── logo.jpg               # Official brand logo
│   │   ├── hero-bg.png            # Hero section cinematic backdrop
│   │   ├── why-choose-us.png      # Feature section spotlight graphic
│   │   ├── portfolio/             # High-quality project snaps
│   │   └── *-header.png           # Header backdrops for secondary pages
├── src/
│   ├── app/                       # Next.js App Router folders and routes
│   │   ├── about/                 # About Page
│   │   ├── contact/               # Contact & Consultation Form Page
│   │   ├── faq/                   # FAQ accordion page (with Schema JSON-LD)
│   │   ├── portfolio/             # Interactive Project Gallery
│   │   ├── services/              # Detailed Service List Page
│   │   ├── thank-you/             # Lead Conversion tracking page
│   │   ├── layout.tsx             # Global HTML layout wrapper
│   │   └── page.tsx               # Main landing index page
│   ├── components/
│   │   ├── layout/                # Global Header, Footer, and Mobile drawer
│   │   ├── sections/              # Isolated, page-specific feature component blocks
│   │   ├── shared/                # Reusable UI primitives (Sliders, wrappers)
│   │   └── ui/                    # Base UI layout blocks (Accordions, buttons)
│   ├── config/                    # Site metadata and global navigation structures
│   ├── data/                      # Decoupled server-safe mock database sets (e.g., FAQs)
│   └── lib/                       # Tailwind merge and utility helpers
```

---

## 🚀 Getting Started

To run the application locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or higher recommended).

### 1. Install Dependencies
Run the install script in the project root directory:
```bash
npm install
```

### 2. Run the Development Server
Launch the local development environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
Generate optimized production bundles:
```bash
npm run build
```

---

## 🌐 Deployment & Hosting

This project is fully ready for deployment as a static site or server-side rendered application. It can be easily deployed to [Vercel](https://vercel.com/) or similar platforms:

1. Push your latest commits to GitHub.
2. Link your repository inside your Vercel Dashboard.
3. Vercel will auto-detect Next.js, configure build commands, and deploy optimized production instances on every push.
