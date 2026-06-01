# Hero Section Design
# Red & White Cleaning Services LTD

**Version:** 1.0  
**Date:** June 2026  
**Status:** Ready for Implementation Approval  
**Section:** Home Page — Section 1  
**Component:** `src/components/sections/home/HeroSection.tsx`  

---

## STRATEGIC BRIEF

### The One Job This Section Has
A visitor arrives at the site. They have spent 0 seconds reading anything. Within 3 seconds they will decide to stay or leave. The hero has one job: **make staying feel worth it**.

For a contractor or property manager, "worth it" means: *"This company handles exactly what I need, in my area, and looks like they know what they're doing."*

Everything below is engineered to deliver that impression in under 3 seconds.

### Audience Hierarchy
The hero must speak to four audiences simultaneously without feeling generic:

```
PRIORITY 1 — General Contractors
  Pain: Unreliable cleaners who miss deadlines, lack insurance, can't
        handle post-construction debris standards
  Want: A trusted team that shows up, documents completion, passes
        site insurance checks, and doesn't slow the handover

PRIORITY 2 — Property Managers
  Pain: Inconsistent results, cleaners who don't communicate, no
        flexibility for tenant schedules
  Want: A professional service that is accountable, responsive,
        and consistent visit after visit

PRIORITY 3 — Developers
  Pain: Need construction-ready cleaning for occupancy certificates
  Want: A company that understands construction timelines and
        delivers occupancy-ready results

PRIORITY 4 — Commercial Businesses
  Pain: Generic cleaning services that don't understand commercial
        requirements
  Want: A professional company with industry-specific experience
```

---

## 1. HEADLINE

### Recommended Headline (Final Decision)

```
Post-Construction & Commercial Cleaning
Southern Ontario Contractors Trust
```

**Why this headline wins:**

| Criteria | How it's met |
|---|---|
| Identifies service | "Post-Construction & Commercial Cleaning" — no ambiguity |
| Targets primary audience | "Contractors" — the highest-value customer segment |
| Contains location keyword | "Southern Ontario" — critical for local SEO |
| Implies trust track record | "Trust" — not "choose" or "use" — implies established relationship |
| Scannable in 2 seconds | Two short lines — readable at any font size |
| H1 keyword density | Contains primary keyword phrase "Post-Construction & Commercial Cleaning" + "Southern Ontario" |

**What this headline avoids:**

```
✗  "Welcome to Red & White Cleaning" — about you, not the customer
✗  "Professional Cleaning Services" — generic, used by every competitor
✗  "The Best Commercial Cleaners" — unverifiable, reads as desperate
✗  "Serving Southern Ontario Since 2015" — saves the trust signal for subheadline
✗  "Your #1 Cleaning Partner" — superlatives without evidence = distrust
```

---

### Headline Alternatives (For A/B Testing)

**Alternative A — More emotional, less descriptive:**
```
The Cleaning Team Southern Ontario
Contractors and Property Managers Rely On
```
- Pros: Explicitly names two audience types, "rely on" is stronger than "trust"
- Cons: Longer, drops the service keywords — weaker SEO signal in H1
- Best for: Testing after launch if primary headline underperforms

**Alternative B — Service + outcome focused:**
```
Site-Ready Cleaning for Construction
and Commercial Properties in Southern Ontario
```
- Pros: "Site-Ready" is contractor language — instant recognition
- Cons: Technical, less warm, sounds more transactional
- Best for: A/B test on a landing page targeted only to contractors

**Alternative C — Pure SEO version:**
```
Post-Construction & Commercial Cleaning Services
in Kitchener, Waterloo, and Southern Ontario
```
- Pros: Maximum local SEO density — exact match phrase + two cities in H1
- Cons: Reads like a service directory, not a premium brand
- Best for: A dedicated /services page or a local PPC landing page

**Verdict: Use the Recommended Headline.** It is the best balance of persuasion, SEO, and premium brand feel.

---

### Eyebrow Badge (Appears Above the Headline)

```
LICENSED & INSURED  ·  SERVING SOUTHERN ONTARIO
```

**Design:**
- Font: Montserrat, 12-13px, uppercase, letter-spacing: 0.1em
- Color: Brand red (`#CC0000`) OR white with a red left-border accent
- Separator: center dot (·) or thin vertical pipe (|)
- Optional: small shield icon before "LICENSED" — 14px, same color

**Why the eyebrow badge comes before the headline:**
The badge creates a micro-moment of trust BEFORE the visitor reads the value proposition. If they see "Licensed & Insured" first, they read the headline with higher confidence. If the headline comes first, they read it with zero context.

---

## 2. SUBHEADLINE

### Recommended Subheadline

```
Professional post-construction, commercial, and deep cleaning 
services for contractors, property managers, and developers 
across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, 
London, and Brantford, Ontario.
```

**Line-by-line analysis:**

```
Line 1: "Professional post-construction, commercial, and deep cleaning services"
         → Names all three service types — each visitor recognizes their need
         → "Professional" is a qualifying word that signals premium positioning

Line 2: "for contractors, property managers, and developers"
         → Names all three primary customer types explicitly
         → Each audience self-identifies and feels directly addressed

Line 3: "across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, and Brantford, Ontario"
         → All 7 cities listed — maximum local SEO signal
         → "Ontario" appended — confirms province for GEO and schema
         → Geographic specificity builds trust — generic claims don't
```

**What this subheadline achieves for AI search engines:**

When an AI engine (ChatGPT, Perplexity, Google AI Overview) is asked:
*"Who provides post-construction cleaning for contractors in Kitchener Ontario?"*

The subheadline provides a direct, factual, extractable answer that an AI can cite verbatim. That is the goal of GEO optimization — being the paragraph that AI quotes.

---

### Supporting Micro-Copy (Optional — Below CTA Buttons)

```
Response within 1 business day · Free, no-obligation quotes
```

- 12-14px, white, 70% opacity
- Appears directly below the two CTA buttons
- Further reduces friction before clicking

---

## 3. CTA BUTTONS

### Primary Button

```
Label:       Get a Free Quote
Destination: /contact
Style:       Filled — Background: #CC0000 — Text: White
Size:        Large — padding: 16px 32px — border-radius: 4px
Font:        Montserrat, 16px, font-weight: 600
```

**Psychology:** "Free" removes the financial friction of requesting a quote. "Get" is action-oriented without being pushy. This button captures leads in the database.

**Hover state:** Background darkens to `#AA0000`. No other change — keep it subtle.

---

### Secondary Button

```
Label:       Call Now  →  519-XXX-XXXX
Destination: tel:+15190000000
Style:       Outline — Border: 2px solid white — Text: White
Size:        Same height as primary — padding: 16px 32px
Font:        Montserrat, 16px, font-weight: 600
```

**Why show the phone number in the button label:**
A contractor who sees a real phone number has immediately higher trust. The number confirms this is a real local business. Clicking "Call Now" without a visible number requires an extra step of trust.

**Hover state:** Background fills white, text turns brand red. The inversion is clear and satisfying.

---

### Button Layout Logic

```
DESKTOP:
[Get a Free Quote]   [Call  519-XXX-XXXX]
   Primary                Secondary
   (red fill)            (white outline)

Both buttons on the same horizontal line.
8-16px gap between them.
Buttons are NOT full-width — they are content-sized.

MOBILE:
[        Get a Free Quote        ]
[     Call  519-XXX-XXXX         ]

Buttons stack vertically.
Both are full-width (100%).
Primary button is always on top.
16px gap between them.
```

**Why primary button comes first:**
A quote form captures the lead in the database. A phone call does not. From a business operations standpoint, the quote form is more valuable for follow-up. However, a phone call is a higher-intent conversion — so both are given equal visual weight (same height, same font size). The order simply defaults to "preferred action first."

---

### CTA Button Variants to Avoid

```
✗  "Contact Us"     — vague, no value proposition
✗  "Learn More"     — passive, delays commitment
✗  "Get Started"    — no context for what you're starting
✗  "Request Quote"  — dry and corporate — "Get a Free Quote" is warmer
✗  "Submit"         — functional language, zero motivation
```

---

## 4. SUPPORTING TRUST ELEMENTS

### Trust Signal Bar (Below Buttons)

Three trust signals displayed in a single horizontal row:

```
✓  Fully Licensed & Insured     ·     ✓  Free Quotes — No Obligation     ·     ✓  Response Within 1 Business Day
```

**Design spec:**
- Font: Inter, 13px, font-weight: 400
- Color: White, 85% opacity (slightly dimmer than body text)
- Checkmark icon: White, 14px, font-weight: 700 or SVG icon
- Separator: center dot (·) — not a pipe — less aggressive visually
- Spacing: 16px on each side of separator

**Why three signals and not five:**
- On mobile, three signals fit in one line. Five do not.
- Three is the cognitive limit for quick trust scanning.
- The Trust Bar section (Section 2) handles the remaining signals.

---

### Trust Signal Selection Rationale

| Signal | Why Selected |
|---|---|
| Fully Licensed & Insured | #1 requirement for contractors — can't start a job without it |
| Free Quotes — No Obligation | Removes financial friction from clicking the CTA |
| Response Within 1 Business Day | Eliminates the fear of sending a quote and hearing nothing |

---

### Optional Trust Enhancement: Google Review Rating

If the business accumulates Google Reviews, add this above or below the button row:

```
★★★★★  4.9 out of 5  ·  48 Google Reviews
```

- Star icons: Yellow (`#FFB800`) on dark background
- Font: Inter, 13px
- "Google Reviews" links to the Google Maps listing
- This is the highest-trust signal available when it exists

**Placement:** Directly below the eyebrow badge, above the H1 — OR below the trust signal bar. Test both.

---

## 5. HERO IMAGE RECOMMENDATIONS

### Recommended Image Strategy

**Option A (Recommended): Full-Width Background Photograph**
A single, high-quality, authentic photograph that occupies the entire hero background behind a dark overlay.

**Option B: Split-Screen**
Left half = text content, right half = image with no overlay. Clean, modern, but less immersive.

**Recommendation: Option A.** Full-width creates immersion, feels premium, and scales naturally to mobile. A split-screen hero is harder to execute well on mobile and tablet.

---

### Photography Direction — First Choice (Custom Shoot)

**Image 1 — Primary hero background (full-width background):**

```
Subject:    A professional cleaning team (2-3 people) in branded 
            uniforms, actively working inside a large, recently 
            finished commercial building or warehouse space.

Composition: Team positioned in the RIGHT half of the frame. 
             LEFT half should have visual breathing room (sky, 
             wall, or floor) — this is where the text overlay 
             will sit.

Lighting:   Bright, natural light if possible. Clean whites. 
             Professional. NOT dark, moody, or gritty.
             The space should look aspirationally clean — not 
             "in progress."

Angle:      Slightly wide — captures the scale of the space. 
             Viewers should feel the size of the project.

What to include:
  ✓  Branded uniforms (Red & White colours)
  ✓  Professional equipment (commercial-grade)
  ✓  Clean, finished surfaces visible in background
  ✓  Faces visible — human connection builds trust
  
What to avoid:
  ✗  Mops and buckets — looks residential, not commercial
  ✗  Cluttered construction debris in frame
  ✗  Overly posed, awkward body language
  ✗  Compressed into a tight space — need to show scale
```

**Image 2 — Alternative hero (construction site version):**

```
Subject:    A freshly cleaned large open-plan office floor or 
            commercial space — just after a post-construction 
            clean. Minimal or no people. The SPACE is the hero.

Composition: Symmetrical or diagonal leading lines draw the eye 
             into the image. Text goes top-left.

Why this works: Contractors want to see the END RESULT — a 
               handover-ready space. Showing a spotlessly clean 
               large commercial space is more persuasive than 
               showing the cleaning process.
```

---

### Photography Direction — Second Choice (Stock Photography)

If custom photography is not yet available, use stock images from Unsplash, Pexels, or Shutterstock. **Search terms ranked by quality:**

```
Priority 1: "commercial cleaning team office building"
Priority 2: "professional janitors commercial property"
Priority 3: "cleaning crew warehouse industrial"
Priority 4: "post construction building interior clean"

AVOID stock image clichés:
✗  Single person with a mop on white background
✗  Extreme close-ups of surfaces
✗  Overly diverse posed team (looks fake to B2B buyers)
✗  Residential homes (wrong audience signal)
✗  Smiling cleaner pointing at something
```

**Stock image selection criteria checklist:**
```
□  Looks like Southern Ontario (not obviously US/European)
□  Scale implies commercial/industrial (not residential)
□  Professional equipment visible (not consumer-grade)
□  People look confident, not servile
□  Lighting is bright and professional
□  Resolution minimum 2400×1600px (for retina displays)
□  File size after optimization: under 200kb (WebP format)
```

---

### Overlay Treatment

The overlay sits between the photograph and the text, ensuring readability regardless of the image content.

**Recommended overlay:**
```
Type:     CSS linear gradient
Value:    linear-gradient(
            to right,
            rgba(0, 0, 0, 0.78) 0%,      ← Dark left side (text sits here)
            rgba(0, 0, 0, 0.55) 50%,     ← Transitions
            rgba(0, 0, 0, 0.35) 100%     ← Lighter right side (image shows through)
          )

Alternative for mobile (full coverage):
          rgba(0, 0, 0, 0.65)            ← Uniform overlay
```

**Why a gradient overlay (not uniform):**
- Text sits on the dark left side — always readable regardless of image
- The right side shows through more — the photograph breathes
- Creates a modern, editorial feel compared to a uniform flat overlay

**Brand color overlay option:**
```
linear-gradient(
  to right,
  rgba(180, 0, 0, 0.75) 0%,      ← Brand red, dark
  rgba(0, 0, 0, 0.55) 60%,
  rgba(0, 0, 0, 0.30) 100%
)
```
Use this if the photo has warm tones and the gradient looks off. The red overlay reinforces brand identity strongly.

---

### Technical Image Specifications

```
Format:         WebP (primary) with JPEG fallback
Dimensions:     2400 × 1350px minimum (16:9 ratio)
File size:      < 200kb (after WebP compression quality 85)
Loading:        priority={true} on <Image> component — preloaded
Alt text:       "Professional commercial cleaning team at work in 
                 Southern Ontario — Red & White Cleaning Services"
                 (includes service type + location + company name)
Responsive:     Use Next.js <Image> sizes prop:
                sizes="100vw" (hero is always full width)
Placeholder:    blur — generate with Next.js blurDataURL
```

---

## 6. DESKTOP LAYOUT

### Layout Architecture (Recommended: Full-Width Background)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  STICKY HEADER (64px height — transparent at top, fills on scroll)      │
│  [Logo]     Home · Services · Portfolio · FAQ · Contact    [Get Quote]  │
└─────────────────────────────────────────────────────────────────────────┘
│                                                                         │
│  HERO SECTION — 100vh height (full viewport height)                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │  BACKGROUND PHOTOGRAPH  +  GRADIENT OVERLAY                    │   │
│  │  (dark-to-lighter, left-to-right)                               │   │
│  │                                                                 │   │
│  │  ┌──────────────────────────────────────┐                      │   │
│  │  │                                      │  ← MAX-WIDTH         │   │
│  │  │  Content block — left-aligned        │     CONTAINER        │   │
│  │  │  max-width: 660px                    │     1280px           │   │
│  │  │  padding-left: 80px (or container    │                      │   │
│  │  │  left edge)                          │                      │   │
│  │  │                                      │                      │   │
│  │  │  LICENSED & INSURED · SINCE [YEAR]   │  ← Eyebrow badge     │   │
│  │  │  (red, uppercase, 13px)              │                      │   │
│  │  │                                      │                      │   │
│  │  │  Post-Construction &                 │  ← H1                │   │
│  │  │  Commercial Cleaning                 │     White            │   │
│  │  │  Southern Ontario                    │     56–64px          │   │
│  │  │  Contractors Trust                   │     font-weight: 700 │   │
│  │  │                                      │     line-height: 1.1 │   │
│  │  │  Professional post-construction,     │  ← Subheadline       │   │
│  │  │  commercial, and deep cleaning       │     White, 18–20px   │   │
│  │  │  services for contractors, property  │     80% opacity      │   │
│  │  │  managers, and developers across     │     max-width: 560px │   │
│  │  │  Kitchener, Waterloo, Cambridge,     │                      │   │
│  │  │  Guelph, Hamilton, London, and       │                      │   │
│  │  │  Brantford, Ontario.                 │                      │   │
│  │  │                                      │                      │   │
│  │  │  [Get a Free Quote] [☎ 519-000-0000] │  ← CTA buttons       │   │
│  │  │   ← Red fill →      ← White outline →│     48px height      │   │
│  │  │                                      │                      │   │
│  │  │  ✓ Licensed & Insured  ·             │  ← Trust signals     │   │
│  │  │  ✓ Free Quotes  ·                    │     13px, 85% white  │   │
│  │  │  ✓ Response Within 1 Business Day    │                      │   │
│  │  └──────────────────────────────────────┘                      │   │
│  │                                                                 │   │
│  │                          ↓ (scroll indicator — animated)        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
```

### Desktop Typography Scale

```
Eyebrow badge:    13px  /  Montserrat  /  700 weight  /  uppercase  /  1.5 letter-spacing
H1 headline:      58px  /  Montserrat  /  800 weight  /  white  /  line-height: 1.1
Subheadline:      19px  /  Inter       /  400 weight  /  white  /  80% opacity  /  line-height: 1.6
CTA button:       16px  /  Montserrat  /  600 weight
Trust signals:    13px  /  Inter       /  400 weight  /  white  /  85% opacity
```

### Desktop Spacing

```
Section height:       100vh — viewport height ensures hero fills screen
Content padding-top:  ~120px (below header height)
Content padding-left: 80px OR container gutter
Gap between eyebrow and H1:   12px
Gap between H1 and sub:       20px
Gap between sub and buttons:  32px
Gap between buttons and trust: 20px
Button gap:                   12px
```

---

## 7. MOBILE LAYOUT

### Mobile Architecture (< 768px)

```
┌────────────────────────────────┐
│  HEADER (56px, transparent)    │
│  [☰ Logo]            [Quote]   │
└────────────────────────────────┘
│                                │
│  HERO SECTION                  │
│  min-height: 100svh            │
│  (svh = small viewport height, │
│  accounts for browser chrome)  │
│                                │
│  BACKGROUND: Uniform overlay   │
│  rgba(0,0,0,0.65) across full  │
│  width — no gradient on mobile │
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │  Content block           │  │
│  │  padding: 24px           │  │
│  │  padding-top: ~100px     │  │
│  │                          │  │
│  │  LICENSED & INSURED      │  ← Eyebrow
│  │                          │
│  │  Post-Construction &     │  ← H1
│  │  Commercial Cleaning     │     White
│  │  Southern Ontario        │     36–40px
│  │  Contractors Trust       │     font-weight: 800
│  │                          │
│  │  Professional cleaning   │  ← Subheadline
│  │  for contractors and     │     18px
│  │  property managers across│
│  │  Kitchener, Waterloo,    │
│  │  Cambridge, Guelph,      │
│  │  Hamilton, London, and   │
│  │  Brantford, Ontario.     │
│  │                          │
│  │  [  Get a Free Quote  ]  │  ← Full-width primary CTA
│  │                          │
│  │  [  ☎ 519-000-0000    ]  │  ← Full-width secondary CTA
│  │                          │
│  │  ✓ Licensed & Insured    │  ← Trust (2 items on mobile)
│  │  ✓ Free Quotes           │
│  │                          │
│  └──────────────────────────┘  │
│                                │
│  [↓ scroll chevron centered]   │
│                                │
└────────────────────────────────┘

STICKY BOTTOM: MobileCTABar (always visible)
┌────────────────────────────────┐
│ [📞 Call Now] [Get Free Quote] │  ← Fixed to viewport bottom
└────────────────────────────────┘
```

### Mobile-Specific Rules

```
1. H1 FONT SIZE
   Mobile:  36-40px (readable, not oversized)
   Tablet:  48px
   Desktop: 56-64px

2. SUBHEADLINE LENGTH
   Mobile:  Keep all 7 cities listed — they are critical for SEO
             and trust. Do not truncate. The user will scroll.

3. CTA BUTTONS
   Mobile:  Full width (100%), stacked vertically
            Primary on top, 16px gap between buttons
            Height: 52px minimum (accessibility tap target)

4. TRUST SIGNALS
   Mobile:  Reduce to 2 items:
            ✓ Licensed & Insured  ·  ✓ Free Quotes
            (3rd item moves to Trust Bar section below)

5. SAFE VIEWPORT HEIGHT
   Mobile:  Use 100svh (Small Viewport Height) instead of 100vh
            100vh on iOS Safari includes the browser URL bar,
            causing content to be hidden. 100svh is correct.

6. BACKGROUND IMAGE
   Mobile:  Uniform dark overlay (no gradient) — ensures all text
            remains readable regardless of scroll position or
            device pixel density

7. STICKY CTA BAR
   The MobileCTABar renders at the bottom of the viewport on mobile.
   The hero's own CTA buttons remain visible on load, then the
   sticky bar takes over as the user scrolls. There is intentional
   redundancy — it increases total conversion rate.
```

### Tablet Layout (768px–1023px)

```
Intermediate layout:
- H1 font: 48px
- Content block: centered, max-width 600px
- Buttons: side-by-side (not stacked)
- Trust signals: all 3 visible in one row
- Gradient overlay (same as desktop)
- Padding sides: 40px
```

---

## 8. SEO OPTIMIZED COPY

### H1 Tag — Final SEO Analysis

```
TARGET H1:
"Post-Construction & Commercial Cleaning Southern Ontario Contractors Trust"

SEO breakdown:
┌────────────────────────────────────────────────────────────────────┐
│ Keyword                          │ Position  │ Intent              │
├────────────────────────────────────────────────────────────────────┤
│ "post-construction cleaning"     │ Start     │ Primary service     │
│ "commercial cleaning"            │ Middle    │ Secondary service   │
│ "Southern Ontario"               │ Middle    │ Geographic target   │
│ "contractors"                    │ End       │ Primary audience    │
└────────────────────────────────────────────────────────────────────┘

Google reads H1 content with high weight for relevance.
Having both service types AND location in the H1 maximizes
organic visibility for both "post construction cleaning Kitchener"
AND "commercial cleaning Southern Ontario" type queries.
```

### Subheadline — LSI Keyword Coverage

```
TARGET SUBHEADLINE:
"Professional post-construction, commercial, and deep cleaning 
services for contractors, property managers, and developers 
across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, 
London, and Brantford, Ontario."

LSI (Latent Semantic Index) keywords covered:
┌────────────────────────────────────────────────────────────────────┐
│ Term                       │ SEO Role                              │
├────────────────────────────────────────────────────────────────────┤
│ "post-construction"        │ Primary service keyword               │
│ "commercial cleaning"      │ Primary service keyword               │
│ "deep cleaning"            │ Secondary service keyword             │
│ "contractors"              │ Audience keyword                      │
│ "property managers"        │ Audience keyword                      │
│ "developers"               │ Audience keyword                      │
│ "Kitchener"                │ City-level local SEO                  │
│ "Waterloo"                 │ City-level local SEO                  │
│ "Cambridge"                │ City-level local SEO                  │
│ "Guelph"                   │ City-level local SEO                  │
│ "Hamilton"                 │ City-level local SEO                  │
│ "London"                   │ City-level local SEO                  │
│ "Brantford"                │ City-level local SEO                  │
│ "Ontario"                  │ Province-level SEO signal             │
│ "services"                 │ Service entity confirmation           │
└────────────────────────────────────────────────────────────────────┘
```

### Schema Markup Feeding From Hero Content

```json
{
  "@type": "CleaningService",
  "name": "Red & White Cleaning Services LTD",
  "description": "Professional post-construction, commercial, and deep cleaning services for contractors, property managers, and developers across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, and Brantford, Ontario.",
  "areaServed": [
    "Kitchener", "Waterloo", "Cambridge", "Guelph",
    "Hamilton", "London", "Brantford"
  ],
  "knowsAbout": [
    "Post-Construction Cleaning",
    "Commercial Cleaning",
    "Deep Cleaning"
  ]
}
```

The H1 and subheadline copy feeds DIRECTLY into this schema. The schema reinforces the page text — they say the same thing in two formats (visible text + machine-readable JSON).

---

## 9. AI SEARCH OPTIMIZED COPY

### What AI Engines Do With Hero Content

When someone asks an AI search engine:
- *"Who does post-construction cleaning in Kitchener Ontario?"*
- *"Best commercial cleaning company in Southern Ontario for contractors"*
- *"Is Red & White Cleaning Services insured?"*

The AI extracts the most relevant, factual paragraph from the page and quotes or paraphrases it in the answer. The hero subheadline is the highest-probability paragraph to be extracted because it is:
1. Near the top of the page (high positional weight)
2. Factual and specific (AI prefers facts over marketing language)
3. Contains all key entities (company type, location, audience, services)

### GEO Content Rules Applied to Hero

```
RULE 1: Named Entity Precision
The company name "Red & White Cleaning Services LTD" appears once 
in the hero — in the eyebrow badge or the alt text. The full legal 
name (including "LTD") must be consistent everywhere on the page 
and in the schema.

RULE 2: Geographic Specificity
"Southern Ontario" alone is not enough. AI engines need specific 
city names to match against user queries. All 7 cities appear 
in the subheadline.

RULE 3: Service Type Precision  
"Cleaning services" is too vague. "Post-construction cleaning" 
and "commercial cleaning" are exact service types that AI engines 
match against specific queries.

RULE 4: Audience Specificity
"For contractors, property managers, and developers" signals to 
AI that this business serves B2B clients — not residential. This 
prevents the company from appearing in "house cleaning" results 
and improves relevance scoring for commercial queries.

RULE 5: No Fluff
Words that provide zero factual value:
✗  "industry-leading"    → unverifiable
✗  "best-in-class"       → unverifiable
✗  "world-class"         → false and vague
✗  "we pride ourselves"  → about you, not the customer
✗  "passionate about"    → irrelevant to a contractor's decision

AI engines give zero weight to marketing language. Every sentence
should be verifiable or at minimum measurable.
```

### AI Citation-Ready Paragraph

This is the exact paragraph structure that AI engines extract most reliably:

```
"Red & White Cleaning Services LTD provides professional 
post-construction, commercial, and deep cleaning services 
for contractors, property managers, and developers in 
Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, 
and Brantford, Ontario. The company is fully licensed 
and insured and responds to quote requests within 
1 business day."
```

This paragraph:
- Opens with the company's full legal name (named entity)
- States service types clearly (entity classification)
- Lists audiences (intent matching)
- Names all cities (geographic matching)
- Names the province (jurisdiction signal)
- States a verifiable credential (licensed, insured)
- States a verifiable operational promise (1 business day)

**Where this appears:** This paragraph is the `description` field in the LocalBusiness JSON-LD schema AND the `og:description` meta tag. The hero subheadline is a shorter version of the same content.

---

## COMPLETE HERO COPY — FINAL VERSION

```
┌─────────────────────────────────────────────────────────────────────┐
│  EYEBROW:     LICENSED & INSURED  ·  SERVING SOUTHERN ONTARIO       │
│                                                                     │
│  H1:          Post-Construction & Commercial Cleaning               │
│               Southern Ontario Contractors Trust                    │
│                                                                     │
│  SUB:         Professional post-construction, commercial, and deep  │
│               cleaning services for contractors, property managers, │
│               and developers across Kitchener, Waterloo, Cambridge, │
│               Guelph, Hamilton, London, and Brantford, Ontario.     │
│                                                                     │
│  CTA 1:       Get a Free Quote                 → /contact           │
│  CTA 2:       Call  519-XXX-XXXX              → tel:[number]        │
│                                                                     │
│  TRUST:       ✓ Fully Licensed & Insured  ·  ✓ Free Quotes          │
│               ✓ Response Within 1 Business Day                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ANIMATION SPECIFICATION

All animations use Framer Motion with `viewport={{ once: true }}`.

```
TIMELINE (from page load):

0ms       Background image fades in          duration: 800ms, ease: easeOut
0ms       Overlay appears                    instant
200ms     Eyebrow badge fades in + slides up  duration: 400ms
400ms     H1 fades in + slides up            duration: 500ms, ease: easeOut
650ms     Subheadline fades in              duration: 400ms
850ms     CTA buttons fade in + slide up    duration: 400ms, stagger: 100ms
1050ms    Trust signals fade in             duration: 300ms
1200ms    Scroll chevron appears + bounces  animation: infinite bounce

TOTAL TIME TO FULLY RENDERED: ~1.5 seconds
```

**Performance note:** Text content renders immediately (server component). The animation layers are applied via Framer Motion on mount — the text is readable before animations complete. Never hide critical text behind animations.

---

## ACCESSIBILITY REQUIREMENTS

```
COLOR CONTRAST
  White text on dark overlay:
  Overlay at 0.65 opacity on typical dark photo background
  achieves contrast ratio > 7:1 (WCAG AAA)
  
  White text on brand red (CTA button):
  #FFFFFF on #CC0000 = contrast ratio 4.8:1 (WCAG AA)

FOCUS STATES
  CTA buttons must have visible focus ring:
  outline: 3px solid white + outline-offset: 3px

KEYBOARD NAVIGATION
  Tab order: Skip-to-content link → Logo → CTA button 1 → CTA button 2

SCREEN READER
  H1 must be the first heading on the page
  Background image has decorative alt="" (not read aloud)
  CTA buttons have aria-label if the label alone is ambiguous

MOTION
  Framer Motion animations must respect prefers-reduced-motion:
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  → skip all animations, render final state immediately

TAP TARGETS (mobile)
  All interactive elements minimum 44×44px (Apple HIG)
  CTA buttons: 52px height minimum
  Phone number link: full line height tappable
```

---

## COMPONENT BREAKDOWN

```
HeroSection.tsx  (Server Component)
│
├── HeroBackground/
│   ├── next/image (priority, full viewport, WebP)
│   └── CSS overlay (gradient via Tailwind)
│
├── HeroContent/
│   ├── EyebrowBadge.tsx       "LICENSED & INSURED · SINCE [YEAR]"
│   ├── <h1>                   Headline (Montserrat, 700/800)
│   ├── <p>                    Subheadline (Inter, 400)
│   ├── HeroCTAButtons.tsx     (Client Component — needs onClick for tel:)
│   │   ├── Button (primary)   Get a Free Quote
│   │   └── Button (secondary) Call 519-XXX-XXXX
│   └── TrustSignals.tsx       ✓ checkmark + text items
│
└── ScrollChevron.tsx          (Client Component — animated bounce)
```

> **Why HeroCTAButtons is a Client Component:**
> The "Call Now" button uses a `tel:` href which requires JavaScript on some browsers for proper handling. Additionally, if we add any click-tracking (GA4 event on button click), that requires client-side JavaScript. The rest of the hero is a pure server component — fast, no JavaScript shipped.

---

## IMPLEMENTATION NOTES FOR DEVELOPER

```
1. next/image priority
   <Image priority={true} ... />
   Must use priority flag on hero image — it is the Largest
   Contentful Paint (LCP) element. Without priority, Next.js
   lazy-loads it, destroying the Core Web Vitals score.

2. Viewport height unit
   Use min-height: 100svh on mobile (not 100vh)
   100svh in Tailwind: not built-in — use style={{ minHeight: '100svh' }}
   or add a custom class in globals.css:
   .hero-height { min-height: 100svh; }

3. Font loading
   Montserrat and Inter are loaded via next/font/google in layout.tsx
   Both are available as CSS variables: --font-montserrat, --font-inter
   Tailwind config maps these to font-heading and font-body classes

4. Text shadow
   White text on photo backgrounds benefits from a subtle text shadow
   on mobile where overlay opacity may vary:
   text-shadow: 0 2px 8px rgba(0,0,0,0.3)
   Add this to H1 and subheadline only

5. Background image blur placeholder
   Use Next.js blurDataURL to prevent blank flash on slow connections:
   blurDataURL={...} placeholder="blur"
   Generate with: next-placeholder or sharp

6. Parallax effect
   Implement via Framer Motion useScroll + useTransform:
   Image translateY: [0, 80px] as scroll goes from 0 to 1
   This creates a subtle parallax without performance cost
   Apply only on desktop (useMediaQuery hook)
```

---

*End of Hero Section Design v1.0*  
*Status: Awaiting implementation approval*  
*Next: Trust Bar Section Design OR begin coding this section*
