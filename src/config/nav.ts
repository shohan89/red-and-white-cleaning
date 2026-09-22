export const SERVICE_LINKS = [
  { label: "Post-Construction Cleaning", href: "/services/post-construction-cleaning" },
  { label: "Commercial Cleaning", href: "/services/commercial-cleaning" },
  { label: "Deep Cleaning", href: "/services/deep-cleaning" },
  { label: "Ongoing Maintenance Cleaning", href: "/services/ongoing-maintenance-cleaning" },
  { label: "Residential Cleaning", href: "/services/residential" },
] as const;

export const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "Services",  href: "/services", children: SERVICE_LINKS },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog",      href: "/blog" },
  { label: "About",     href: "/about" },
  { label: "FAQ",       href: "/faq" },
  { label: "Contact",   href: "/contact" },
] as const;
