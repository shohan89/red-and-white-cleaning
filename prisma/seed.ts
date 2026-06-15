import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding database…\n")

  // ─── Super Admin ────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 12)
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@redandwhitecleaning.ca" },
    update: {},
    create: {
      email: "admin@redandwhitecleaning.ca",
      password: hashedPassword,
      name: "Super Admin",
      role: "SUPER_ADMIN",
    },
  })
  console.log("✓ Super admin:", superAdmin.email)

  // ─── FAQ Categories ──────────────────────────────────────────────────────────
  const [generalCat, postConCat, commercialCat] = await Promise.all([
    prisma.faqCategory.upsert({
      where: { slug: "general" },
      update: {},
      create: { name: "General", slug: "general", icon: "MessageCircleQuestion", sortOrder: 0 },
    }),
    prisma.faqCategory.upsert({
      where: { slug: "post-construction" },
      update: {},
      create: { name: "Post-Construction Cleaning", slug: "post-construction", icon: "HardHat", sortOrder: 1 },
    }),
    prisma.faqCategory.upsert({
      where: { slug: "commercial" },
      update: {},
      create: { name: "Commercial Cleaning", slug: "commercial", icon: "Building2", sortOrder: 2 },
    }),
  ])
  console.log("✓ FAQ categories seeded")

  // ─── FAQs ────────────────────────────────────────────────────────────────────
  const existingFaqCount = await prisma.faq.count()
  if (existingFaqCount === 0) {
    const faqs = [
      // General
      { question: "What is Red and White Cleaning Services LTD?", answer: "Red and White Cleaning Services LTD is a commercial and construction cleaning company based in Kitchener, Ontario. We specialize in post-construction cleaning, commercial cleaning, deep cleaning, and ongoing maintenance cleaning contracts across the KW Region, Guelph, Hamilton, London, and Brantford.", categoryId: generalCat.id, sortOrder: 0 },
      { question: "What areas do you serve?", answer: "We serve the KW Region (Kitchener, Waterloo, Cambridge), Guelph, Hamilton, London, Brantford, and surrounding areas in Southern Ontario.", categoryId: generalCat.id, sortOrder: 1 },
      { question: "Are you insured?", answer: "Yes, we are fully licensed and insured. We take site safety seriously and carry appropriate liability insurance for all the work we do.", categoryId: generalCat.id, sortOrder: 2 },
      { question: "How do I get a quote?", answer: "You can request a free quote by filling out our contact form, calling us at 519-574-1552, or emailing redandwhiteclean@gmail.com. We typically respond within 1 business day.", categoryId: generalCat.id, sortOrder: 3 },
      // Post-Construction
      { question: "What is post-construction cleaning?", answer: "Post-construction cleaning is the process of cleaning a newly built or renovated space after construction work is complete. It involves removing construction debris, dust, adhesive residue, and preparing the space for occupancy or final inspection.", categoryId: postConCat.id, sortOrder: 0 },
      { question: "Do you do both rough and final cleans?", answer: "Yes. We handle all three phases: Phase 1 (post-construction clean — heavy debris and dust removal), Phase 2 (PDI/pre-delivery inspection clean), and Phase 3 (occupancy clean — final polish before handover).", categoryId: postConCat.id, sortOrder: 1 },
      { question: "How long does a post-construction clean take?", answer: "Timeline depends on the size and type of the project. A typical residential unit takes 4–8 hours. Large commercial spaces may take a full day or multiple days. We'll provide a specific timeline in your quote.", categoryId: postConCat.id, sortOrder: 2 },
      { question: "What does a post-construction clean include?", answer: "Our post-construction cleaning includes: removal of construction debris, dust cleaning on all surfaces (ceilings, walls, fixtures, trim), window and glass cleaning, floor cleaning and polishing, kitchen and bathroom scrub-out, and a final walk-through clean.", categoryId: postConCat.id, sortOrder: 3 },
      { question: "Can you work with general contractors directly?", answer: "Absolutely. We work directly with general contractors, developers, and project managers. We understand construction timelines and can schedule cleans to fit your project schedule.", categoryId: postConCat.id, sortOrder: 4 },
      // Commercial
      { question: "What types of commercial spaces do you clean?", answer: "We clean offices, retail spaces, warehouses, medical facilities, common areas, Airbnbs, and more.", categoryId: commercialCat.id, sortOrder: 0 },
      { question: "Do you offer recurring cleaning contracts?", answer: "Yes. We offer weekly, bi-weekly, and monthly cleaning contracts for commercial spaces. Recurring clients receive priority scheduling and consistent service.", categoryId: commercialCat.id, sortOrder: 1 },
      { question: "Can you clean after hours?", answer: "Yes, we offer after-hours and weekend cleaning to minimize disruption to your business operations.", categoryId: commercialCat.id, sortOrder: 2 },
      { question: "What is the difference between commercial cleaning and deep cleaning?", answer: "Commercial cleaning is regular, scheduled maintenance cleaning. Deep cleaning is a more intensive, one-time or periodic clean that covers areas not typically addressed in routine cleaning — think behind appliances, inside vents, grout lines, and thorough sanitization.", categoryId: commercialCat.id, sortOrder: 3 },
    ]
    await prisma.faq.createMany({ data: faqs })
  }
  console.log("✓ FAQs seeded")

  // ─── Portfolio Categories ─────────────────────────────────────────────────────
  const portfolioCategories = [
    { name: "Post Construction", slug: "post-construction", sortOrder: 0 },
    { name: "Commercial", slug: "commercial", sortOrder: 1 },
    { name: "Residential", slug: "residential", sortOrder: 2 },
    { name: "Before & After", slug: "before-after", sortOrder: 3 },
    { name: "Deep Cleans", slug: "deep-clean", sortOrder: 4 },
    { name: "Specialty Cleans", slug: "specialty", sortOrder: 5 },
  ]
  for (const cat of portfolioCategories) {
    await prisma.portfolioCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log("✓ Portfolio categories seeded")

  // ─── Portfolio Items ──────────────────────────────────────────────────────────
  const portCatRows = await prisma.portfolioCategory.findMany({ select: { id: true, slug: true } })
  const catBySlug: Record<string, string> = {}
  for (const c of portCatRows) catBySlug[c.slug] = c.id

  const portfolioItems = [
    // Post-Construction
    { id: "tricar-1",       slug: "post-construction", title: "Tricar — 1882 Gordon Street",                   desc: "Multi-phase post-construction clean for Tricar's residential development. Full dust extraction, window film removal, floor polishing, and suite-by-suite occupancy prep.",                                           location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-common.jpeg",    alt: "Team cleaning the common area corridor at Tricar 1882 Gordon Street Guelph Ontario" },
    { id: "tricar-const-1", slug: "post-construction", title: "Tricar — Phase 1 Construction Clean",           desc: "Phase 1 post-construction clean underway — debris cleared, drywall dust extracted, and surfaces prepped before PDI.",                                                                                              location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-const-1.jpeg",   alt: "Phase 1 post-construction clean in progress at Tricar 1882 Gordon Street Guelph" },
    { id: "tricar-const-2", slug: "post-construction", title: "Tricar — Construction Debris Removal",          desc: "Bathroom scrub-out during Phase 1 clean — construction debris, concrete dust, and surface residue fully removed before handoff.",                                                                                 location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-const-2.jpeg",   alt: "Bathroom construction debris removal during Phase 1 clean at Tricar Guelph" },
    { id: "tricar-pdi-2",   slug: "post-construction", title: "Tricar — PDI Clean in Progress",                desc: "Phase 2 PDI clean — LVP floors swept and detailed, suite fully prepped for owner walkthrough.",                                                                                                                  location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-pdi-2.jpg",      alt: "PDI clean in progress at Tricar 1882 Gordon Street Guelph Ontario" },
    { id: "tricar-pdi-3",   slug: "post-construction", title: "Tricar — Pre-Delivery Inspection Ready",        desc: "Suite prepped and cleaned for the pre-delivery inspection — every surface spotless before the new owner's walkthrough.",                                                                                         location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-pdi-3.jpg",      alt: "Suite ready for pre-delivery inspection at Tricar 1882 Gordon Street Guelph" },
    { id: "tricar-pdi-4",   slug: "post-construction", title: "Tricar — Exterior Window Clean",                desc: "Exterior window cleaning from the balcony level — construction film and adhesive removed for a crystal-clear finish.",                                                                                           location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-pdi-4.jpeg",     alt: "Worker cleaning exterior windows at Tricar 1882 Gordon Street Guelph" },
    { id: "tricar-1b",      slug: "post-construction", title: "Tricar — Occupancy Clean (Bathroom)",           desc: "Phase 3 occupancy clean — bathroom and suite interiors prepped and sanitized before handover to new residents.",                                                                                                 location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-occupancy.jpeg", alt: "Pristine bathroom after occupancy clean at Tricar 1882 Gordon Street Guelph Ontario" },
    { id: "tricar-occ-1",   slug: "post-construction", title: "Tricar — Suite Ready for Move-In",              desc: "Phase 3 occupancy clean complete — suite entry and living area spotless and move-in ready.",                                                                                                                     location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-occ-1.jpeg",     alt: "Clean suite entry ready for move-in at Tricar 1882 Gordon Street Guelph" },
    { id: "tricar-occ-2",   slug: "post-construction", title: "Tricar — Laundry Area After Occupancy Clean",   desc: "Laundry room detailed and sanitized as part of the Phase 3 occupancy clean — appliances wiped down, floors polished.",                                                                                          location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-occ-2.jpeg",     alt: "Clean laundry room with stacked washer dryer after occupancy clean at Tricar Guelph" },
    { id: "tricar-occ-3",   slug: "post-construction", title: "Tricar — Bedroom Ready for Handover",           desc: "Master bedroom with floor-to-ceiling windows cleaned and polished — spotless and staged for the new resident.",                                                                                                  location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-occ-3.jpeg",     alt: "Clean bedroom with large window view after occupancy clean at Tricar Guelph" },
    { id: "tricar-2",       slug: "post-construction", title: "Tricar — 25 Sportsworld Tower 2",               desc: "Phase 1, 2, and 3 cleans coordinated with the Tricar project schedule. Construction debris removal, PDI cleaning, and final occupancy prep completed on time.",                                                location: "Kitchener, ON", image: "/images/portfolio/tricar-sportsworld.png",       alt: "Tricar 25 Sportsworld Tower 2 Kitchener Ontario post-construction cleaning" },
    { id: "sylk-1",         slug: "post-construction", title: "Zehr Group — Sylk Towers",                      desc: "Full post-construction cleaning program for the Sylk Towers development by Zehr Group. Coordinated all three phases across multiple floors and unit types.",                                                     location: "3241 King Street East, Kitchener, ON", image: "/images/portfolio/zehr-sylk.png", alt: "Zehr Group Sylk Towers Kitchener Ontario post-construction cleaning" },
    // Commercial
    { id: "tricar-area-1",  slug: "commercial",        title: "Tricar — Lobby Corridor After Clean",           desc: "Finished common area lobby corridor — marble-finish tile floors polished, walls wiped, and lighting surrounds detailed.",                                                                                        location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-area-1.jpeg",    alt: "Clean modern lobby corridor at Tricar 1882 Gordon Street Guelph Ontario" },
    { id: "tricar-area-2",  slug: "commercial",        title: "Tricar — Common Area Clean in Progress",        desc: "Crew working through the common area corridor — floor scrubbing, wall wipe-down, and wet-floor safety protocol in place.",                                                                                      location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-area-2.jpeg",    alt: "Worker cleaning common area corridor at Tricar 1882 Gordon Street Guelph Ontario" },
    { id: "tricar-area-3",  slug: "commercial",        title: "Tricar — Corridor Completed",                   desc: "Long common area hallway after a thorough clean — every surface wiped, floors polished edge-to-edge.",                                                                                                          location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-area-3.jpeg",    alt: "Long clean corridor at Tricar 1882 Gordon Street Guelph Ontario" },
    { id: "tricar-win-1",   slug: "commercial",        title: "Tricar — Window Clean Team (Interior)",         desc: "Full window cleaning crew tackling high-rise balcony glazing from inside — three cleaners working simultaneously on floor-to-ceiling windows.",                                                                  location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-win-1.jpeg",     alt: "Three cleaners cleaning large balcony windows from inside at Tricar Guelph high-rise" },
    { id: "tricar-win-2",   slug: "commercial",        title: "Tricar — Exterior Window Crew",                 desc: "Window cleaning team working the exterior balcony level with squeegees — construction film removed for a spotless finish.",                                                                                      location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-win-2.jpg",      alt: "Window cleaning crew on exterior balcony at Tricar 1882 Gordon Street Guelph" },
    { id: "tricar-win-3",   slug: "commercial",        title: "Tricar — Balcony & Sliding Door Clean",         desc: "Pressure washing and detail cleaning of balcony tiles and sliding door track — thorough post-construction clean of all exterior surfaces.",                                                                      location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-win-3.jpg",      alt: "Worker pressure washing balcony at Tricar 1882 Gordon Street Guelph" },
    { id: "tricar-win-4",   slug: "commercial",        title: "Tricar — Full Window Cleaning Team",            desc: "Four-person crew cleaning floor-to-ceiling windows in a high-rise suite — construction adhesive removed, glass polished to crystal clarity.",                                                                    location: "Guelph, ON",    image: "/images/portfolio/tricar-guelph-win-4.jpg",      alt: "Four cleaners working floor-to-ceiling windows at Tricar Guelph" },
    { id: "colonia-1",      slug: "commercial",        title: "Colonia Treuhand — Commercial Unit",            desc: "Ongoing commercial cleaning contract for CTPM's commercial unit. Regular scheduled maintenance keeping the space presentable and professionally clean.",                                                         location: "609 Kumpf Drive, Unit 106, Kitchener, ON", image: "/images/portfolio/ctpm-commercial.jpeg", alt: "Commercial cleaning at 609 Kumpf Drive Unit 106 Kitchener Ontario" },
    { id: "ctpm-2",         slug: "commercial",        title: "CTPM — Office Space After Clean",               desc: "LVP floors cleaned and polished, industrial-window glass wiped down — clean and professional workspace ready for use.",                                                                                          location: "609 Kumpf Drive, Kitchener, ON", image: "/images/portfolio/ctpm-2.jpeg",         alt: "Clean commercial office space with LVP floors at CTPM Kitchener" },
    { id: "ctpm-3",         slug: "commercial",        title: "CTPM — Post-Construction Office Clean",         desc: "Commercial unit after construction — debris removed, surfaces cleaned, and floors restored to working condition.",                                                                                               location: "609 Kumpf Drive, Kitchener, ON", image: "/images/portfolio/ctpm-3.jpeg",         alt: "Post-construction clean of commercial office space at CTPM 609 Kumpf Drive Kitchener" },
    { id: "ctpm-4",         slug: "commercial",        title: "CTPM — Epoxy Floor Commercial Space",           desc: "Commercial unit with epoxy-coated floors cleaned and buffed — a two-zone layout detailed end to end.",                                                                                                           location: "609 Kumpf Drive, Kitchener, ON", image: "/images/portfolio/ctpm-4.jpeg",         alt: "Clean commercial space with epoxy floor at CTPM Kitchener Ontario" },
    { id: "ctpm-5",         slug: "commercial",        title: "CTPM — Kitchenette & Break Room",               desc: "Commercial kitchenette area cleaned top to bottom — cabinets wiped, sink sanitized, and speckled floors polished.",                                                                                             location: "609 Kumpf Drive, Kitchener, ON", image: "/images/portfolio/ctpm-5.jpeg",         alt: "Clean commercial kitchenette with dark cabinets at CTPM 609 Kumpf Drive Kitchener" },
    // Residential
    { id: "res-bathroom",   slug: "residential",       title: "Residential Deep Clean — Bathroom",             desc: "Complete before-and-after bathroom transformation. Tile scrub-out, tub restoration, toilet sanitization, and full surface wipe-down.",                                                                           location: "Southern Ontario", image: "/images/portfolio/residential-bathroom-ba.png",  alt: "Before and after bathroom deep clean by Red and White Cleaning Services" },
    { id: "res-kitchen",    slug: "residential",       title: "Residential Deep Clean — Kitchen",              desc: "Full kitchen deep clean — cabinets degreased and wiped down, appliances scrubbed, counters restored, and floors cleaned to a spotless finish.",                                                                 location: "Southern Ontario", image: "/images/portfolio/residential-kitchen-ba.png",   alt: "Before and after kitchen deep clean by Red and White Cleaning Services" },
    { id: "res-sink",       slug: "residential",       title: "Residential Deep Clean — Under-Sink",           desc: "Even the spaces no one sees — under-sink cabinet completely cleaned out and sanitized as part of a full residential deep clean.",                                                                               location: "Southern Ontario", image: "/images/portfolio/residential-sink-ba.png",      alt: "Before and after under-sink cabinet clean by Red and White Cleaning Services" },
    // Specialty
    { id: "gen-1",          slug: "specialty",         title: "71 Wyndham — Generator Room Clean",             desc: "Mechanical room deep clean — generator units detailed, floors swept and mopped, and all surfaces wiped around active equipment.",                                                                               location: "71 Wyndham Street, Guelph, ON", image: "/images/portfolio/generator-1.jpg",  alt: "Worker cleaning generator equipment in mechanical room at 71 Wyndham Guelph" },
    { id: "gen-2",          slug: "specialty",         title: "71 Wyndham — Mechanical Room Piping",           desc: "Industrial piping system cleaned — white PVC pipes, red pump motors, and surrounding concrete floor all detailed.",                                                                                             location: "71 Wyndham Street, Guelph, ON", image: "/images/portfolio/generator-2.jpg",  alt: "Clean white industrial piping and red pump in mechanical room at 71 Wyndham Guelph" },
    { id: "gen-3",          slug: "specialty",         title: "71 Wyndham — Industrial Chiller Units",         desc: "Two large industrial chillers cleaned and detailed — surrounding floors swept and mopped, all surfaces dust-free.",                                                                                             location: "71 Wyndham Street, Guelph, ON", image: "/images/portfolio/generator-3.jpg",  alt: "Two industrial chiller units in clean mechanical room at 71 Wyndham Guelph" },
    { id: "gen-4",          slug: "specialty",         title: "71 Wyndham — Full Mechanical Room",             desc: "Entire mechanical room cleaned from floor to ceiling — generators, fire suppression systems, piping, and epoxy floors all restored to pristine condition.",                                                     location: "71 Wyndham Street, Guelph, ON", image: "/images/portfolio/generator-4.jpg",  alt: "Full clean mechanical room with generators and fire suppression at 71 Wyndham Guelph" },
  ]

  for (let i = 0; i < portfolioItems.length; i++) {
    const item = portfolioItems[i]
    const categoryId = catBySlug[item.slug]
    if (!categoryId) continue
    await prisma.portfolioItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        description: item.desc,
        location: item.location,
        imageUrl: item.image,
        imageAlt: item.alt,
        categoryId,
        sortOrder: i,
      },
    })
  }
  console.log(`✓ Portfolio items seeded (${portfolioItems.length})`)

  // ─── Services ─────────────────────────────────────────────────────────────────
  const services = [
    { name: "Post-Construction Cleaning", slug: "post-construction", label: "Service 1", title: "Post-Construction Cleaning", description: "We specialize in all three phases of post-construction cleaning — from rough clean through PDI and final occupancy clean. Trusted by general contractors and developers across Southern Ontario.", icon: "hard-hat", sortOrder: 0 },
    { name: "Commercial Cleaning", slug: "commercial", label: "Service 2", title: "Commercial Cleaning", description: "Professional commercial cleaning services for offices, retail, warehouses, and more — scheduled to fit your operations.", icon: "building-2", sortOrder: 1 },
    { name: "Deep Cleaning", slug: "deep-cleaning", label: "Service 3", title: "Deep Cleaning", description: "Intensive, top-to-bottom deep cleaning services for spaces that need more than routine maintenance.", icon: "sparkles", sortOrder: 2 },
    { name: "Ongoing Maintenance Cleaning", slug: "maintenance", label: "Service 4", title: "Ongoing Maintenance Cleaning Contracts", description: "Flexible weekly, bi-weekly, or monthly cleaning contracts for commercial clients who need consistent, reliable service.", icon: "calendar-clock", sortOrder: 3 },
    { name: "Residential Cleaning", slug: "residential", label: "Service 5", title: "Residential Cleaning", description: "Professional residential cleaning services — from move-in/move-out cleans to regular home maintenance.", icon: "home", sortOrder: 4 },
  ]
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
  }
  console.log("✓ Services seeded")

  // ─── Site Settings (singleton) ─────────────────────────────────────────────
  const settingsCount = await prisma.siteSettings.count()
  if (settingsCount === 0) {
    await prisma.siteSettings.create({
      data: {
        companyName: "Red & White Cleaning Services LTD",
        legalName: "Red & White Cleaning Services LTD",
        phone: "519-574-1552",
        email: "redandwhiteclean@gmail.com",
        addressCity: "Kitchener",
        addressProvince: "Ontario",
        businessHours: "Monday – Friday: 8:00 AM – 6:00 PM",
        foundedYear: 2015,
        updatedAt: new Date(),
      },
    })
  }
  console.log("✓ Site settings seeded")

  // ─── Global SEO (singleton) ────────────────────────────────────────────────
  const seoCount = await prisma.globalSeo.count()
  if (seoCount === 0) {
    await prisma.globalSeo.create({
      data: {
        siteName: "Red & White Cleaning Services LTD",
        siteUrl: "https://redandwhitecleaning.ca",
        defaultTitleTemplate: "%s | Red & White Cleaning Services LTD",
        defaultMetaDesc: "Professional commercial and construction cleaning services across KW Region, Guelph, Hamilton, London, and Brantford. Licensed, insured, fast response.",
        brandName: "Red & White Cleaning",
        businessPhone: "519-574-1552",
        businessEmail: "redandwhiteclean@gmail.com",
        businessAddress: "Kitchener, Ontario, Canada",
        updatedAt: new Date(),
      },
    })
  }
  console.log("✓ Global SEO seeded")

  // ─── Schema Configs ────────────────────────────────────────────────────────
  const schemaTypes = [
    "LocalBusiness",
    "CleaningService",
    "FAQPage",
    "WebSite",
    "Organization",
    "BreadcrumbList",
    "ImageObject",
  ]
  for (const type of schemaTypes) {
    await prisma.schemaConfig.upsert({
      where: { type },
      update: {},
      create: { type, enabled: ["LocalBusiness", "CleaningService", "FAQPage", "WebSite", "Organization"].includes(type), config: {}, updatedAt: new Date() },
    })
  }
  console.log("✓ Schema configs seeded")

  // ─── Robots Config (singleton) ─────────────────────────────────────────────
  const robotsCount = await prisma.robotsConfig.count()
  if (robotsCount === 0) {
    await prisma.robotsConfig.create({
      data: {
        content: "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /auth/\n\nSitemap: https://redandwhitecleaning.ca/sitemap.xml",
        updatedAt: new Date(),
      },
    })
  }
  console.log("✓ Robots config seeded")

  // ─── Page SEO defaults ─────────────────────────────────────────────────────
  const pageKeys = ["home", "about", "services", "portfolio", "faq", "contact", "privacy"]
  for (const pageKey of pageKeys) {
    await prisma.pageSeo.upsert({
      where: { pageKey },
      update: {},
      create: { pageKey, robots: "index,follow", updatedAt: new Date() },
    })
  }
  console.log("✓ Page SEO defaults seeded")

  // ─── Service Cities ────────────────────────────────────────────────────────
  const cities = [
    { name: "Kitchener", slug: "kitchener", province: "Ontario", sortOrder: 0 },
    { name: "Waterloo", slug: "waterloo", province: "Ontario", sortOrder: 1 },
    { name: "Cambridge", slug: "cambridge", province: "Ontario", sortOrder: 2 },
    { name: "Guelph", slug: "guelph", province: "Ontario", sortOrder: 3 },
    { name: "Hamilton", slug: "hamilton", province: "Ontario", sortOrder: 4 },
    { name: "London", slug: "london", province: "Ontario", sortOrder: 5 },
    { name: "Brantford", slug: "brantford", province: "Ontario", sortOrder: 6 },
  ]
  for (const city of cities) {
    await prisma.serviceCity.upsert({
      where: { slug: city.slug },
      update: {},
      create: city,
    })
  }
  console.log("✓ Service cities seeded")

  // ─── Page Content Defaults ────────────────────────────────────────────────────
  const pageContentDefaults = [
    {
      pageKey: "home", sectionKey: "hero",
      content: {
        heading: "Commercial & Construction Cleaning Done Right — Across KW, Guelph, Hamilton, London and Brantford",
        subheading: "We clean construction sites, commercial spaces, and everything in between. Fast, thorough, and built for contractors and property managers who need it done properly.",
        cta1Text: "Get a Free Quote",
        cta2Text: "See Our Work",
      },
    },
    {
      pageKey: "home", sectionKey: "trust",
      content: {
        signal1: "Fully Licensed & Insured",
        signal2: "Free Quotes — No Obligation",
        signal3: "Response Within 1 Business Day",
      },
    },
    {
      pageKey: "home", sectionKey: "cta",
      content: {
        heading: "Ready to Get a Clean Site?",
        subheading: "Whether it's a one-time post-construction clean or an ongoing commercial contract — we're ready when you are.",
      },
    },
    {
      pageKey: "about", sectionKey: "hero",
      content: {
        heading: "We're a Commercial and Construction Cleaning Company That Gets It Done",
        subheading: "Red and White Cleaning Services LTD is a locally operated cleaning company based in the KW Region, serving contractors, property managers, and businesses across Southern Ontario.",
      },
    },
    {
      pageKey: "about", sectionKey: "story",
      content: {
        title: "Our Story",
        body: "Red and White Cleaning Services was built on a simple idea: do the job properly, treat clients with respect, and show up when you say you will.\n\nOur team founded the company after seeing firsthand how many cleaning contractors cut corners — leaving construction sites with hidden dust, smeared windows, and missed areas that caused problems down the line.\n\nToday, we specialize in post-construction and commercial cleaning across the KW Region, Guelph, Hamilton, London, Brantford, and the communities around them. Our clients include general contractors, developers, commercial property managers, and business owners who need reliable, professional service.",
      },
    },
    {
      pageKey: "services", sectionKey: "hero",
      content: {
        heading: "Professional Cleaning Services for Contractors & Commercial Clients",
        subheading: "We handle everything from rough-clean on active construction sites to ongoing janitorial services for commercial spaces. Here's what we do:",
      },
    },
    {
      pageKey: "contact", sectionKey: "hero",
      content: {
        heading: "Get a Free Quote — We'll Get Back to You Fast",
        subheading: "Fill out the form below, call us, or send an email. We respond to all inquiries within the same business day.",
      },
    },
  ]

  for (const pc of pageContentDefaults) {
    await prisma.pageContent.upsert({
      where: { pageKey_sectionKey: { pageKey: pc.pageKey, sectionKey: pc.sectionKey } },
      update: {},
      create: { pageKey: pc.pageKey, sectionKey: pc.sectionKey, content: pc.content },
    })
  }
  console.log(`✓ Page content defaults seeded (${pageContentDefaults.length} sections)`)

  console.log("\n✅ Database seeded successfully!\n")
  console.log("Admin login credentials:")
  console.log("  Email:    admin@redandwhitecleaning.ca")
  console.log("  Password: admin123")
  console.log("\n⚠️  Change the password immediately after first login!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
