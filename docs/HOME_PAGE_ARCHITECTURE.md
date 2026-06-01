# Home Page Architecture
# Red & White Cleaning Services LTD

**Version:** 1.0  
**Date:** June 2026  
**Status:** Approved — Design Ready  
**Page URL:** /  
**Rendering:** SSG (Static Site Generation — built once at deploy, served from CDN edge)  

---

## PAGE-LEVEL SPECIFICATIONS

### Conversion Priority Order
Every decision on this page is ranked by one metric: **does it move a visitor toward calling or submitting a quote?**

```
HIGHEST CONVERSION VALUE
        │
        ▼
1.  Phone call               → tel: link in Header + Hero + CTA Banner + Footer
2.  Quote form submission     → ContactForm at /contact (driven by CTA buttons)
3.  Service page engagement   → Services section → /services
4.  Trust confirmation        → Trust Bar + Why Choose Us (removes doubt)
5.  Awareness                 → FAQ Preview + Service Areas
        │
        ▼
LOWEST (but still needed for SEO and GEO)
```

### Page-Level SEO Metadata

```
<title>        Post-Construction & Commercial Cleaning | Southern Ontario | Red & White Cleaning
<description>  Licensed and insured post-construction and commercial cleaning services 
               in Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, and Brantford. 
               Get a free quote today.
<canonical>    https://yourdomain.com/
<og:image>     /images/og/og-default.jpg (1200×630px — team on a job site)
<og:title>     Red & White Cleaning Services LTD — Southern Ontario
```

### Schema Markup on This Page

```
1. LocalBusiness / CleaningService   → Company name, address, phone, service area, hours
2. BreadcrumbList                    → Single item: Home (/)
3. WebSite                           → For sitelinks search box eligibility
```

### Performance Targets

```
Hero image:        Preloaded via <link rel="preload"> — LCP target < 2.5s
Fonts:             Loaded via next/font — zero layout shift
Above-fold JS:     < 50kb (Header + Hero are server components — no JS shipped)
First paint:       < 1.2s on 4G mobile
```

---

## SECTION 1 — HERO

---

### Goal
Communicate within 3 seconds what the company does, who it serves, and where it operates. Capture the highest-intent visitors (contractors and property managers actively searching for a cleaning quote) before they bounce.

### Conversion Objective
**Primary:** Drive a phone call or click to the quote form.  
**Secondary:** Establish enough trust that the visitor continues scrolling.

This section is the only section that MUST convert on its own. If a visitor lands, reads the hero, and immediately calls — that is a perfect outcome. The rest of the page exists for visitors who need more convincing.

---

### Content Hierarchy

Content must flow from broad to specific — each line narrows the message and increases relevance.

```
PRIORITY 1 — Eyebrow Tag (establishes credibility before the headline)
────────────────────────────────────────────────────────────────────
"Licensed & Insured · Serving Southern Ontario Since [Year]"

Small text, uppercase, brand-red color. Primes the reader before they
read the headline. Answers: "Can I trust this company?" immediately.

───────────────────────────────────────────────────────────────────

PRIORITY 2 — H1 Headline (the single most important line of text on the site)
────────────────────────────────────────────────────────────────────
"The Cleaning Crew Contractors Rely On in Southern Ontario"

Rules for this headline:
  ✓ Targets the primary audience (contractors) by name
  ✓ Uses "rely on" — implies track record + trust (not just "use")
  ✓ Named location for local SEO
  ✓ Under 65 characters (readable at large size)
  ✗ NOT "Welcome to Red & White Cleaning" (about company, not customer)
  ✗ NOT "Best Cleaning Services" (vague, not credible)

Fallback headline if the above is too specific:
"Post-Construction & Commercial Cleaning in Southern Ontario"

───────────────────────────────────────────────────────────────────

PRIORITY 3 — Subheadline (1-2 sentences — who we serve + what we do)
────────────────────────────────────────────────────────────────────
"Professional post-construction, commercial, and deep cleaning services
 for contractors, developers, and property managers across Kitchener,
 Waterloo, Cambridge, Guelph, Hamilton, London, and Brantford."

Rules:
  ✓ Lists all 7 cities — critical for local SEO and GEO citations
  ✓ Lists 3 customer types — each visitor self-identifies
  ✓ Lists 3 service types — confirms scope
  ✓ Plain, factual language — easy for AI engines to extract and cite

───────────────────────────────────────────────────────────────────

PRIORITY 4 — CTA Buttons (two options — different intent levels)
────────────────────────────────────────────────────────────────────
Button 1 (Primary — red background): "Get a Free Quote"   → /contact
Button 2 (Secondary — white outline): "Call Now"          → tel:[phone]

Button order matters:
  "Get a Free Quote" is first because it captures the lead in the database.
  "Call Now" is second because a call bypasses lead capture — but is still
  the highest-value conversion for a contractor who wants to talk.

───────────────────────────────────────────────────────────────────

PRIORITY 5 — Quick Trust Signals (below buttons — removes final hesitation)
────────────────────────────────────────────────────────────────────
Three inline items with checkmark icons:
  ✓ Fully Licensed & Insured
  ✓ Free Quotes — No Obligation
  ✓ Response Within 1 Business Day
```

---

### Layout Recommendation

**Desktop (≥1024px):**
```
┌─────────────────────────────────────────────────────────────────────┐
│                     FULL-WIDTH HERO                                 │
│  Background: Dark overlay (60% opacity) over job-site photo         │
│  Text color: White                                                  │
│                                                                     │
│   ┌───────────────────────────────────┐                             │
│   │                                   │  ← Left-aligned content     │
│   │  LICENSED & INSURED · SINCE 2015  │  ← Eyebrow (red, uppercase) │
│   │                                   │                             │
│   │  The Cleaning Crew Contractors    │  ← H1 (large, white, bold)  │
│   │  Rely On in Southern Ontario      │     font-size: 56-64px      │
│   │                                   │                             │
│   │  Professional post-construction,  │  ← Subheadline (18-20px,   │
│   │  commercial, and deep cleaning... │     80% white opacity)      │
│   │                                   │                             │
│   │  [Get a Free Quote] [Call Now]    │  ← CTA buttons              │
│   │                                   │                             │
│   │  ✓ Licensed  ✓ Free Quotes        │  ← Inline trust signals     │
│   │  ✓ Same-Day Response              │                             │
│   └───────────────────────────────────┘                             │
│                                                                     │
│  Height: 85-90vh (visible without scrolling on most monitors)       │
└─────────────────────────────────────────────────────────────────────┘
```

**Content position:** Left-aligned, vertically centered. NOT centered — left alignment reads faster, especially for business audiences. Studies show left-aligned text converts better on landing pages.

**Background photo direction:** The background image should have visual weight on the RIGHT side (workers, equipment, clean building) — so the left side where text sits remains visually clean.

**Scroll indicator:** A subtle animated chevron at the bottom center of the hero encourages scrolling.

---

### UX Recommendations

1. **No carousel.** A rotating hero carousel loses 40-60% of engagement compared to a static hero. Static = focused message = more conversions.

2. **Parallax scroll effect on background.** The background image scrolls at 0.5× speed as the user scrolls down. Subtle — adds depth without distraction.

3. **Hero loads instantly.** The background image is preloaded. No blank white flash while the image loads. The overlay and text appear first, then the image fades in.

4. **Phone number visible without clicking.** On desktop, the full phone number should be visible somewhere in the hero — either inline next to "Call Now" or as a small line below the CTA buttons. A contractor who sees the number and dials directly is a conversion.

5. **CTA button hover state:** Primary button darkens to `#AA0000`. Secondary outline button fills white background with dark text.

---

### Mobile Behavior

```
MOBILE (< 768px):
─────────────────────────────────────────────────
┌──────────────────────────┐
│ HERO (full screen height) │
│                           │
│  LICENSED & INSURED       │
│                           │
│  The Cleaning Crew        │
│  Contractors Rely On      │
│  in Southern Ontario      │
│                           │
│  Professional post-       │
│  construction, commercial │
│  cleaning for contractors │
│  and developers across    │
│  Kitchener, Waterloo...   │
│                           │
│  [Get a Free Quote]       │  ← Full width, stacked
│  [Call Now]               │  ← Full width, below
│                           │
│  ✓ Licensed  ✓ Insured    │
└──────────────────────────┘
```

Mobile-specific rules:
- H1 font size drops to 36-40px (from 56-64px)
- Subheadline truncated to 2 lines with key city names retained
- Both CTA buttons stack vertically, full width
- Trust signals reduced to 2 items to avoid crowding
- The sticky MobileCTABar at the bottom of the screen provides persistent CTAs throughout the page — so the hero buttons do not need to be "perfect" on mobile

---

### SEO & GEO Notes

```
H1 must contain:        primary service + geography
                        "cleaning" + "Southern Ontario"

Subheadline must name:  all 7 cities explicitly
                        Kitchener, Waterloo, Cambridge, Guelph,
                        Hamilton, London, Brantford

AI Search signal:       The subheadline answers the AI query
                        "Who provides post-construction cleaning in
                        Kitchener Ontario?" directly and factually.

Schema:                 The H1 content and company name feed into the
                        LocalBusiness schema description field.
```

---

## SECTION 2 — TRUST BAR

---

### Goal
Remove hesitation. A visitor who just read the hero has one remaining question before they scroll: "But can I actually trust this company?" The Trust Bar answers it in 3 seconds with five visual signals.

### Conversion Objective
Prevent bounce. This section does not directly drive conversions — it protects conversions made by the hero and earned by the sections below it. A visitor who doubts your credibility will not scroll to the quote form.

---

### Content Hierarchy

```
Five trust signals displayed as icon + label pairs:

SIGNAL 1: Fully Licensed
           Icon: Certificate/badge icon
           Label: "Fully Licensed"
           Sub:   "Province of Ontario"

SIGNAL 2: Fully Insured
           Icon: Shield icon
           Label: "Fully Insured"
           Sub:   "Liability Coverage"

SIGNAL 3: Years in Business
           Icon: Calendar/star icon
           Label: "10+ Years Experience"
           Sub:   "Commercial Cleaning"

SIGNAL 4: Cities Served
           Icon: Map pin icon
           Label: "7 Cities Served"
           Sub:   "Southern Ontario"

SIGNAL 5: Response Time
           Icon: Clock icon
           Label: "Same-Day Response"
           Sub:   "Quote Within 24 Hours"
```

> **Copy rule:** Every sub-label adds specificity. "Fully Licensed" alone is vague. "Fully Licensed — Province of Ontario" is verifiable and trustworthy.

---

### Layout Recommendation

**Desktop:**
```
┌─────────────────────────────────────────────────────────────────────┐
│                         TRUST BAR                                   │
│          Background: Light Gray (#F5F5F5)  Padding: 24px            │
│                                                                     │
│   [🏅 Fully    ] [🛡️ Fully    ] [⭐ 10+      ] [📍 7 Cities] [⏱️ 24hr  ]│
│   [   Licensed ] [   Insured  ] [   Years   ] [   Served  ] [   Response]│
│   [Province ON ] [Liability   ] [Commercial ] [S. Ontario ] [Free Quote ]│
│                                                                     │
│   5 items — evenly spaced — center aligned — thin dividers between  │
└─────────────────────────────────────────────────────────────────────┘
```

**Visual treatment:**
- Background: `#F5F5F5` — creates a clear visual break between hero and services
- Icons: Brand red (`#CC0000`) — reinforces brand color
- Label text: Dark (`#222222`) — strong, readable
- Sub-text: Medium gray — secondary hierarchy

---

### UX Recommendations

1. **No animation needed.** The trust bar should be instantly visible — no delay, no fade-in. Animations on trust signals suggest the content is loading, which undermines trust.

2. **Thin vertical dividers** between each signal (1px, light gray) improve readability without visual noise.

3. **Non-clickable.** These are statements, not links. Adding links here dilutes focus. The visitor should continue scrolling, not navigate away.

4. **Consider adding a Google Review star rating** if the business has Google Reviews (e.g., "★★★★★ 4.9 — 47 Google Reviews"). This is one of the most powerful trust signals available and should replace or augment one of the five items above when reviews exist.

---

### Mobile Behavior

```
MOBILE:
─────────────────────────────────────────────────
Items wrap to 2-column grid (not 1 column — that
makes it too tall):

┌──────────────────────┐
│  🏅 Fully Licensed   │  🛡️ Fully Insured   │
│  ⭐ 10+ Years        │  📍 7 Cities         │
│  ⏱️ Same-Day Response (spans full width)    │
└──────────────────────┘

Alternatively: horizontal scroll (with gradient
fade on right edge to indicate more content).
Recommended: 2-col wrap — more dignified for
a corporate B2B audience.
```

---

## SECTION 3 — SERVICES OVERVIEW

---

### Goal
Quickly communicate the four service categories so each visitor can self-identify their need. A general contractor needs post-construction cleaning. A property manager needs commercial cleaning. Each person should find their service in under 5 seconds.

### Conversion Objective
Drive visitors to read the relevant service description. The card's CTA ("Learn More" or "Get a Quote") is a secondary conversion — a visitor who clicks a service card is highly qualified and close to converting.

---

### Content Hierarchy

```
SECTION HEADER:
  Eyebrow:   "OUR SERVICES"
  Headline:  "Cleaning Solutions Built for Commercial Work"
  Sub:       "From post-construction site cleanup to ongoing facility
              maintenance, we deliver professional results for 
              contractors and businesses across Southern Ontario."

────────────────────────────────────────────────────────────────────

SERVICE CARD 1: Post-Construction Cleaning
  Icon:       Construction/dust icon (brand red)
  Title:      "Post-Construction Cleaning"
  Body:       "Complete removal of construction dust, debris, adhesive
               residue, and surface marks from newly built or renovated
               properties — ready for occupancy inspection."
  Audience:   "For: General Contractors · Developers · Project Managers"
  CTA:        "Learn More →"
  Link:       /services#post-construction

SERVICE CARD 2: Commercial Cleaning
  Icon:       Building/office icon (brand red)
  Title:      "Commercial Cleaning"
  Body:       "Scheduled professional cleaning for offices, retail
               spaces, warehouses, and commercial facilities across
               Southern Ontario."
  Audience:   "For: Property Managers · Business Owners · Facility Teams"
  CTA:        "Learn More →"
  Link:       /services#commercial

SERVICE CARD 3: Deep Cleaning
  Icon:       Sparkle/clean icon (brand red)
  Title:      "Deep Cleaning"
  Body:       "Comprehensive top-to-bottom cleaning for spaces requiring
               intensive treatment — move-ins, move-outs, seasonal
               cleans, and pre-inspection preparation."
  Audience:   "For: Property Managers · Landlords · Real Estate Agents"
  CTA:        "Learn More →"
  Link:       /services#deep-cleaning

SERVICE CARD 4: Ongoing Maintenance Contracts
  Icon:       Calendar/repeat icon (brand red)
  Title:      "Ongoing Maintenance Contracts"
  Body:       "Customized recurring cleaning programs for commercial
               facilities. Flexible scheduling, consistent teams,
               and transparent pricing — on your schedule."
  Audience:   "For: Facility Managers · Commercial Property Owners"
  CTA:        "Get a Quote →"
  Link:       /contact
  Note:       This card's CTA goes directly to /contact — ongoing
              contracts require a quote conversation, not a page read.
```

> **GEO Note on Card Body Copy:**
> Each body paragraph explicitly answers "What is [service]?" in one sentence. This is the exact format AI search engines extract when answering "What is post-construction cleaning in Ontario?"

---

### Layout Recommendation

**Desktop:**
```
┌───────────────────────────────────────────────────────────────────┐
│  SECTION HEADER — centered, white background                      │
│         "OUR SERVICES"                                            │
│  "Cleaning Solutions Built for Commercial Work"                   │
│                                                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ │
│  │     🏗️        │ │      🏢       │ │     ✨        │ │    📅    │ │
│  │              │ │              │ │              │ │          │ │
│  │Post-Const.   │ │Commercial    │ │Deep          │ │Ongoing   │ │
│  │Cleaning      │ │Cleaning      │ │Cleaning      │ │Contracts │ │
│  │              │ │              │ │              │ │          │ │
│  │[body text]   │ │[body text]   │ │[body text]   │ │[body]    │ │
│  │              │ │              │ │              │ │          │ │
│  │For: Contrac- │ │For: Property │ │For: Property │ │For: Fac- │ │
│  │tors...       │ │Managers...   │ │Managers...   │ │ility Mgr │ │
│  │              │ │              │ │              │ │          │ │
│  │[Learn More→] │ │[Learn More→] │ │[Learn More→] │ │[Get Quote│ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────┘ │
│                                                                   │
│  4 equal columns · white background · subtle border or shadow     │
└───────────────────────────────────────────────────────────────────┘
```

**Card visual treatment:**
- Background: White
- Border: 1px light gray OR subtle box-shadow
- Top border: 4px brand red accent (makes cards feel branded without being loud)
- Icon: 48px, brand red, inside light red tinted circle background
- Hover: Card lifts slightly (translateY(-4px) + deeper shadow) — Framer Motion micro-interaction

---

### UX Recommendations

1. **The "For:" audience line is critical.** A contractor scanning quickly should see "For: General Contractors" and immediately know this card is relevant. This doubles as a targeting mechanism and a trust signal.

2. **Card 4 (Ongoing Contracts) gets a different CTA.** "Get a Quote →" instead of "Learn More →" because the decision to sign an ongoing contract requires a human conversation. Drive them to the form.

3. **Hover state on all cards** reveals a subtle brand-red underline on the title — signals interactivity before the cursor reaches the CTA link.

4. **Equal card heights.** All cards must be the same height regardless of content length. Use CSS grid with `align-items: stretch` to enforce this. Uneven heights look unprofessional and undermine the corporate tone.

5. **Section background: White.** This creates contrast from the gray Trust Bar above and the next section.

---

### Mobile Behavior

```
MOBILE:
─────────────────────────────────────────────────
Cards stack to single column.

Each card is full width. The "For:" audience
line is especially valuable on mobile — the
user can scan quickly and tap only the relevant card.

┌──────────────────────────┐
│  🏗️  Post-Construction   │
│      Cleaning            │
│                          │
│  [body text]             │
│  For: Contractors...     │
│  [Learn More →]          │
└──────────────────────────┘
┌──────────────────────────┐
│  🏢  Commercial Cleaning  │
│  ...                     │
└──────────────────────────┘

Consider: 2-column grid on tablet (768px-1023px)
with 2 cards per row.
```

---

## SECTION 4 — WHY CHOOSE US

---

### Goal
Overcome objections. At this point, a visitor knows what services exist. The question in their mind is: "Why this company and not a competitor?" This section answers that question with specific, verifiable differentiators — not generic claims like "we're the best."

### Conversion Objective
Remove the final barrier to clicking "Get a Free Quote." This section is the last trust-building section before the footer's CTA. A visitor who reaches this section and is still reading is interested — we need to convert them now.

---

### Content Hierarchy

```
SECTION HEADER:
  Eyebrow:   "WHY CHOOSE US"
  Headline:  "Why Contractors and Property Managers Choose Red & White"
  Sub:       "We understand the demands of commercial and construction
              projects — tight deadlines, strict site requirements,
              and zero tolerance for missed details."

────────────────────────────────────────────────────────────────────

DIFFERENTIATOR 1: Licensed & Fully Insured
  Icon:       Shield checkmark
  Title:      "Licensed & Fully Insured"
  Body:       "We carry comprehensive general liability insurance.
               You and your clients are fully protected on every job."
  Why it matters: "Contractors need proof of insurance to pass
                   site safety requirements."

DIFFERENTIATOR 2: Trained Commercial Cleaning Teams
  Icon:       People/team icon
  Title:      "Trained Professional Teams"
  Body:       "Every team member is trained to commercial cleaning
               standards — consistent results, every visit,
               regardless of site size."

DIFFERENTIATOR 3: Contractor-Friendly Scheduling
  Icon:       Calendar with checkmark
  Title:      "Contractor-Friendly Scheduling"
  Body:       "We work around your construction timeline.
               Early mornings, weekends, or tight handover
               windows — we adapt to your schedule."
  Why it matters: "This is a key pain point for contractors.
                   Cleaning companies that can't flex = delays."

DIFFERENTIATOR 4: Responsive Communication
  Icon:       Chat/message icon
  Title:      "Fast, Reliable Communication"
  Body:       "Quote requests receive a response within
               1 business day. We keep you updated — no
               chasing, no waiting, no surprises."

DIFFERENTIATOR 5: Detailed Cleaning Checklists
  Icon:       Clipboard/checklist icon
  Title:      "Documented Cleaning Standards"
  Body:       "Every job is completed against a detailed
               checklist. You receive documentation confirming
               all tasks were completed — useful for handover
               packages and occupancy sign-offs."

DIFFERENTIATOR 6: Serving All of Southern Ontario
  Icon:       Map pin
  Title:      "7 Cities Across Southern Ontario"
  Body:       "We serve Kitchener, Waterloo, Cambridge, Guelph,
               Hamilton, London, and Brantford — one reliable
               team for all your regional projects."
  SEO value:  "Cities mentioned again in body copy = stronger
               local SEO signal."

────────────────────────────────────────────────────────────────────

CLOSING CTA (inside this section):
  "Ready to work with a cleaning team you can rely on?"
  [Get Your Free Quote] button — brand red
```

> **Copy rule:** Every differentiator answers a specific contractor objection.
> - "Licensed" → answers: "Can you pass our site insurance requirements?"
> - "Scheduling" → answers: "Will you hold up my project timeline?"
> - "Documented" → answers: "How do I prove to my client the job was done?"

---

### Layout Recommendation

**Desktop — Two-column layout:**
```
┌───────────────────────────────────────────────────────────────────┐
│                   WHY CHOOSE US                                   │
│         "Why Contractors Choose Red & White"                      │
│                                                                   │
│  ┌─────────────────────┐   ┌─────────────────────────────────┐   │
│  │                     │   │                                 │   │
│  │  [LARGE PHOTO]      │   │  🛡️ Licensed & Fully Insured    │   │
│  │                     │   │     [body text]                 │   │
│  │  Professional team  │   │                                 │   │
│  │  on a clean site    │   │  👥 Trained Professional Teams  │   │
│  │                     │   │     [body text]                 │   │
│  │  Background: brand  │   │                                 │   │
│  │  red tint overlay   │   │  📅 Contractor-Friendly Schedule │   │
│  │  on photo           │   │     [body text]                 │   │
│  │                     │   │                                 │   │
│  │                     │   │  💬 Fast Communication          │   │
│  │                     │   │     [body text]                 │   │
│  │                     │   │                                 │   │
│  │                     │   │  📋 Documented Standards        │   │
│  │                     │   │     [body text]                 │   │
│  │                     │   │                                 │   │
│  │                     │   │  📍 7 Cities — Southern Ontario │   │
│  │                     │   │     [body text]                 │   │
│  └─────────────────────┘   └─────────────────────────────────┘   │
│                                                                   │
│              [Get Your Free Quote] — centered below               │
└───────────────────────────────────────────────────────────────────┘
```

**Background:** Light gray (`#F5F5F5`) — creates alternating rhythm with white sections.

**Photo recommendation:** A photo of a clean, finished commercial space (or team working professionally). NOT stock photography — authentic job-site photos are significantly more persuasive to contractors.

---

### UX Recommendations

1. **Feature items use a left icon + right text layout** (not cards). Cards here would compete visually with the Service cards in Section 3. A clean icon-list reads faster and feels more editorial.

2. **Differentiator #3 (Contractor-Friendly Scheduling) should be highlighted.** This is the most powerful differentiator for the primary audience. Consider giving it a subtle red left-border accent or a slightly different background to draw the eye.

3. **Animate items in on scroll** using Framer Motion `viewport={{ once: true }}` — items fade in and slide slightly from left as they enter the viewport. This draws the eye down the list and rewards scrolling.

4. **No testimonials here yet.** If the client adds Google Reviews later, a testimonial quote can be inserted between items 3 and 4. Space is reserved for this.

---

### Mobile Behavior

```
MOBILE:
─────────────────────────────────────────────────
Photo is hidden (replaced by section header only).
Feature list becomes single column — full width.

Each feature item:
┌──────────────────────────┐
│  🛡️  Licensed & Insured  │
│                          │
│  [body text]             │
└──────────────────────────┘

Items animate in sequentially with a slight
stagger delay (0.1s between each) — creates
the impression of a "loading" checklist,
which reads as thorough and systematic.
```

---

## SECTION 5 — SERVICE AREAS

---

### Goal
Tell search engines AND AI engines exactly which cities this company serves. This section is the most important local SEO element on the page. It also confirms to visitors from specific cities that the company will come to them.

### Conversion Objective
This section does not directly convert. Its job is to prevent the visitor from thinking "they probably don't come to my city" and leaving. A confirmed service area removes a hidden objection.

For SEO: every city mentioned in readable text (not just metadata) contributes to local search ranking for that city.

---

### Content Hierarchy

```
SECTION HEADER:
  Eyebrow:   "SERVICE AREAS"
  Headline:  "Proudly Serving Southern Ontario"
  Sub:       "Red & White Cleaning Services LTD provides professional
              post-construction and commercial cleaning across
              Southern Ontario. Contact us for service in your area."

────────────────────────────────────────────────────────────────────

CITY LIST (7 cities — each links to future /service-area/[city] page):

  Kitchener    →  /service-area/kitchener
  Waterloo     →  /service-area/waterloo
  Cambridge    →  /service-area/cambridge
  Guelph       →  /service-area/guelph
  Hamilton     →  /service-area/hamilton
  London       →  /service-area/london
  Brantford    →  /service-area/brantford

────────────────────────────────────────────────────────────────────

SUPPORTING COPY (below cities — for GEO):
  "Operating across the Waterloo Region, Hamilton-Halton,
   and surrounding areas of Southern Ontario. Not sure if we
   service your location? Contact us — we may be able to help."

  This paragraph does two things:
  1. Groups cities by region (stronger local SEO signal)
  2. Opens the door for leads outside the listed cities
```

> **Critical GEO Rule:** The city names must appear as readable text in the HTML — not just in metadata or alt text. AI search engines extract city names from visible body copy when answering "Who provides [service] in [city]?"

---

### Layout Recommendation

**Desktop — City grid with subtle map background:**
```
┌───────────────────────────────────────────────────────────────────┐
│                    SERVICE AREAS                                  │
│             "Proudly Serving Southern Ontario"                    │
│                                                                   │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐     │
│  │ 📍         │  │ 📍         │  │ 📍         │  │ 📍         │     │
│  │ Kitchener  │  │ Waterloo   │  │ Cambridge  │  │ Guelph     │     │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘     │
│                                                                   │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐                    │
│  │ 📍         │  │ 📍         │  │ 📍         │                    │
│  │ Hamilton   │  │ London     │  │ Brantford  │                    │
│  └───────────┘  └───────────┘  └───────────┘                    │
│                                                                   │
│  "Operating across the Waterloo Region, Hamilton-Halton,         │
│   and surrounding areas of Southern Ontario..."                   │
│                                                                   │
│  Background: White with subtle Ontario map watermark image        │
└───────────────────────────────────────────────────────────────────┘
```

**City card design:**
- Each city is a clickable card (links to future service area page)
- When the /service-area/[city] page doesn't exist yet: cards do NOT have links (or link to /contact with a pre-filled city)
- City name + map pin icon + province label "Ontario"
- Hover: subtle red border appears on the card

**Alternative layout (simpler):** A 4-column grid of plain text links with a map pin icon. Less visual but still perfectly effective for SEO and conversion.

---

### UX Recommendations

1. **Every city is a link** even before service-area pages are built. Link to `/contact?city=kitchener` so the contact form pre-fills the Location field. This is a micro-conversion — a visitor who clicks "Kitchener" is pre-qualifying themselves.

2. **Subtle Ontario map in the background.** A light watermark-style SVG of Southern Ontario gives visual context and makes the section feel less like a list. Keep it at 5-10% opacity — purely decorative.

3. **"And surrounding areas" note.** Always include this. Many leads will come from cities NOT on the list (e.g., Burlington, Milton). Without this note, those visitors assume the company won't serve them and leave.

---

### Mobile Behavior

```
MOBILE:
─────────────────────────────────────────────────
2-column grid of city cards.

┌────────────┐ ┌────────────┐
│ 📍 Kitchener│ │ 📍 Waterloo │
└────────────┘ └────────────┘
┌────────────┐ ┌────────────┐
│ 📍 Cambridge│ │ 📍 Guelph   │
└────────────┘ └────────────┘
┌────────────┐ ┌────────────┐
│ 📍 Hamilton │ │ 📍 London   │
└────────────┘ └────────────┘
┌────────────┐
│ 📍 Brantford│
└────────────┘
```

---

## SECTION 6 — FAQ PREVIEW

---

### Goal
Answer the 3-4 most common pre-purchase questions that would otherwise prevent a visitor from submitting a quote. This section also feeds the FAQPage schema markup and directly targets AI search engine queries.

### Conversion Objective
Resolve final objections so visitors are ready to click "Get a Free Quote" in the CTA Banner below. Every FAQ answer should end with an implicit invitation to take action.

---

### Content Hierarchy

```
SECTION HEADER:
  Eyebrow:   "FREQUENTLY ASKED QUESTIONS"
  Headline:  "Common Questions About Our Services"
  Sub:       "Can't find your answer here? Contact us directly."

────────────────────────────────────────────────────────────────────

FAQ 1: What areas do you service?
  Answer:   "Red & White Cleaning Services LTD provides commercial
             and post-construction cleaning in Kitchener, Waterloo,
             Cambridge, Guelph, Hamilton, London, and Brantford,
             Ontario. Contact us if your location is not listed —
             we may be able to accommodate your project."

  Why first: Most common question. Answers it definitively.
             Mentions all cities again — strong GEO signal.

FAQ 2: Are you licensed and insured?
  Answer:   "Yes. Red & White Cleaning Services LTD is fully
             licensed and carries comprehensive general liability
             insurance for all commercial and post-construction
             cleaning work in Ontario. Insurance documentation
             is available upon request."

  Why second: Critical for contractors — insurance is a site
              requirement. "Upon request" signals professionalism.

FAQ 3: What does post-construction cleaning include?
  Answer:   "Our post-construction cleaning service includes
             removal of construction dust, debris, adhesive
             residue, paint overspray, and surface marks from
             all surfaces including floors, windows, fixtures,
             and cabinetry. The space is cleaned to occupancy-
             ready standard."

  Why third: Most searched service — defines the scope clearly.
             Directly answers AI query: "What is included in
             post-construction cleaning?"

FAQ 4: How do I get a quote?
  Answer:   "Submit your project details through our online
             quote form or call us directly. We respond to all
             quote requests within 1 business day with a
             customized price based on your location, property
             size, and service type."

  Why fourth: Answers the final action question. Reinforces
              the 1-business-day response promise.

────────────────────────────────────────────────────────────────────

FOOTER LINK (below accordion):
  "Have more questions?"
  [View All FAQs →]    → /faq
```

> **GEO Writing Rules for FAQ Answers:**
> - First sentence always answers the question directly
> - Include the company's full legal name in at least one answer
> - Include "Ontario" in location-related answers
> - Answers are 40-100 words — long enough to be cited, short enough to scan

---

### Layout Recommendation

**Desktop:**
```
┌───────────────────────────────────────────────────────────────────┐
│                   FREQUENTLY ASKED QUESTIONS                      │
│              "Common Questions About Our Services"                │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Q: What areas do you service?                        [+]  │  │
│  │  ─────────────────────────────────────────────────────────  │  │
│  │  A: Red & White Cleaning Services LTD provides...    [-]  │  │
│  │     (expanded — full answer visible)                       │  │
│  └─────────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Q: Are you licensed and insured?                     [+]  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Q: What does post-construction cleaning include?     [+]  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Q: How do I get a quote?                             [+]  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                   │
│              Have more questions?  [View All FAQs →]              │
└───────────────────────────────────────────────────────────────────┘
```

**Background:** White. Clean, simple. The accordion provides enough visual structure.

**First FAQ is open by default.** Visitors can see that the section is interactive and the answers contain useful content. This prevents the section from looking like a locked wall of questions.

**Accordion behavior:** Opening one FAQ does NOT close others — visitors may want to read multiple answers without re-clicking.

---

### UX Recommendations

1. **Open the first item by default.** An accordion where all items are closed looks like a wall of unanswered questions. Show the content — it builds confidence in the section's value.

2. **Question text is the click target** — not just the `+/-` icon. The entire row is clickable. This improves mobile usability dramatically.

3. **Smooth expand animation.** Shadcn Accordion handles this natively. Keep the animation short (200ms) — long animations are annoying.

4. **Schema is applied here.** The FAQ section generates a `FAQPage` JSON-LD schema block that Google and AI engines can directly extract. This is the highest-value SEO element on the home page after the H1.

5. **No pagination.** All 4 FAQs are visible. The "View All FAQs" link drives visitors who want more to the full /faq page.

---

### Mobile Behavior

```
MOBILE:
─────────────────────────────────────────────────
Accordion works identically on mobile.
Full-width items, larger tap target (min 48px height).

Question text wraps to 2 lines on narrow screens.
That is acceptable — do not truncate questions.

The "View All FAQs →" link becomes a full-width
outlined button on mobile for better tap target.
```

---

## SECTION 7 — CTA BANNER

---

### Goal
Give every visitor who has scrolled to the bottom one final, high-contrast invitation to contact the company. This is the last chance to convert a visitor before they leave. Make the action obvious and the friction zero.

### Conversion Objective
**Drive a quote form submission.** At this point, a visitor who has read the full page is informed, interested, and trust-confirmed. The CTA Banner closes the loop. It requires only a single click.

---

### Content Hierarchy

```
HEADLINE (the most urgent line on the page):
  "Ready to Get Started? Request Your Free Quote Today."

  Rules:
  ✓ Action-oriented ("Ready to Get Started")
  ✓ Zero commitment implied ("Free Quote")
  ✓ Urgency without pressure ("Today" — not "Now" which reads aggressive)

SUPPORTING LINE:
  "We respond to all quote requests within 1 business day.
   No obligation. No pressure."

  Rules:
  ✓ Removes two remaining objections: "will they be slow?" and "will they pressure me?"
  ✓ Short — two sentences maximum at this point in the page

PRIMARY CTA:
  Button: "Get Your Free Quote"  → /contact
  Style: White button with brand-red text
         (reversal of normal button — white button stands out on red background)

SECONDARY LINE:
  "Or call us directly: [Phone Number]"
  The phone number is a tel: link — tappable on mobile

  Why phone here: Some visitors (especially older contractors)
  prefer to call. Showing the number in the CTA banner captures them.
```

---

### Layout Recommendation

**Desktop:**
```
┌─────────────────────────────────────────────────────────────────────┐
│                    FULL-WIDTH RED BACKGROUND                        │
│                      Background: #CC0000                            │
│                                                                     │
│                                                                     │
│         Ready to Get Started? Request Your Free Quote Today.        │
│                  (H2 — white — large — centered)                    │
│                                                                     │
│       We respond within 1 business day. No obligation.              │
│                  (Subtext — white, 80% opacity)                     │
│                                                                     │
│                  [Get Your Free Quote]                               │
│               (White button — red text — large)                     │
│                                                                     │
│             Or call us directly: +1 (519) 000-0000                  │
│                  (Small white text — tel: link)                      │
│                                                                     │
│                                                                     │
│  Padding: 80px vertical minimum. This section must feel spacious.   │
└─────────────────────────────────────────────────────────────────────┘
```

**Why white button on red background:**
The standard rule is "use a brand-colored button." But when the BACKGROUND is brand red, the button must invert to remain visible. White on red = maximum contrast = maximum click rate.

---

### UX Recommendations

1. **Zero distractions.** No icons, no supporting images, no decorative elements. The red background IS the design. The only elements are text, the button, and the phone number. Clean = focused = converts.

2. **Large button with generous padding.** The button should feel substantial — not a small pill. Minimum 200px wide, 52px tall. Large buttons signal importance and are easier to click on mobile.

3. **Subtle texture option.** A very subtle noise texture or geometric pattern on the red background (5-10% opacity) prevents the section from looking flat. This is optional — evaluate with design.

4. **Framer Motion entrance animation.** When this section scrolls into view, the headline fades in from below, then the button scales up slightly from 0.9 to 1.0. Total animation: 600ms. This draws the eye to the CTA at the exact moment the visitor is most receptive.

5. **The MobileCTABar at the bottom of the screen ALREADY shows "Get Free Quote."** On mobile, there is some redundancy here — that is intentional. Redundant CTAs on mobile increase total conversion rate.

---

### Mobile Behavior

```
MOBILE:
─────────────────────────────────────────────────
Everything centers and stacks.

┌──────────────────────────┐
│  RED BACKGROUND          │
│                          │
│  Ready to Get Started?   │
│  Request Your Free       │
│  Quote Today.            │
│                          │
│  We respond within 1     │
│  business day. No        │
│  obligation.             │
│                          │
│  [Get Your Free Quote]   │  ← Full width
│                          │
│  Or call: 519-000-0000   │  ← tel: link, tappable
└──────────────────────────┘

Note: The sticky MobileCTABar at the bottom
overlaps this section slightly. Ensure the
CTA Banner content clears the CTABar height
with enough bottom padding (80px+).
```

---

## COMPLETE PAGE FLOW SUMMARY

```
VISITOR LANDS ON PAGE
        │
        ▼
HERO (Section 1)
"I understand what they do and who they serve."
"I see two clear ways to contact them."
High-intent visitors: click CTA → /contact
        │
        ▼
TRUST BAR (Section 2)
"They're licensed, insured, and experienced."
Hesitant visitors: reassured enough to scroll
        │
        ▼
SERVICES OVERVIEW (Section 3)
"They offer exactly what I need."
Service-aware visitors: click service card → /services
        │
        ▼
WHY CHOOSE US (Section 4)
"They understand my specific situation as a contractor."
Comparison visitors: convinced this is the right company
        │
        ▼
SERVICE AREAS (Section 5)
"They come to my city."
Location-uncertain visitors: confirmed, stay engaged
        │
        ▼
FAQ PREVIEW (Section 6)
"My last 3 questions are answered."
Research-mode visitors: objections removed
        │
        ▼
CTA BANNER (Section 7)
"There is one obvious thing to do: get a quote."
All remaining visitors: click → /contact
        │
        ▼
CONTACT FORM → LEAD SAVED → EMAILS SENT → THANK YOU PAGE
```

---

## CONVERSION ELEMENTS SUMMARY

| Element | Section | Type | Target Audience |
|---|---|---|---|
| "Get a Free Quote" button | Hero | Primary CTA | All visitors |
| "Call Now" button | Hero | Phone CTA | High-intent contractors |
| Service card CTAs | Services | Secondary CTA | Service-specific leads |
| "Get Your Free Quote" | Why Choose Us | Inline CTA | Warmed-up visitors |
| City links | Service Areas | Micro-CTA | Location-checking visitors |
| "View All FAQs" | FAQ Preview | Soft CTA | Research-mode visitors |
| "Get Your Free Quote" | CTA Banner | Final CTA | All remaining visitors |
| Phone number | CTA Banner | Phone CTA | Call-preferring visitors |
| MobileCTABar | Site-wide (mobile) | Persistent CTA | All mobile visitors |

---

## COMPONENTS TO BUILD (from this architecture)

```
src/components/sections/home/
├── HeroSection.tsx           (Server Component — static content)
├── TrustBar.tsx              (Server Component — static signals)
├── ServicesOverview.tsx      (Server Component)
├── ServiceCard.tsx           (Server Component — child of above)
├── WhyChooseUs.tsx           (Server Component)
├── FeatureItem.tsx           (Server Component — child of above)
├── ServiceAreasSection.tsx   (Server Component)
├── CityCard.tsx              (Server Component — child of above)
├── FAQPreview.tsx            (Client Component — accordion needs useState)
└── CTABanner.tsx             (Server Component — static content)
```

> **Note:** FAQPreview is the ONLY client component in this list. All other home page sections are server components — no JavaScript is shipped to the browser for them, making the page extremely fast.

---

*End of Home Page Architecture v1.0*  
*Status: Awaiting implementation approval*  
*Next: Phase 3 — Core Layout (Header + Footer + MobileCTABar)*
