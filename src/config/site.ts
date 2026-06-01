export const SITE = {
  name: "Red & White Cleaning Services LTD",
  shortName: "Red & White Cleaning",
  legalName: "Red & White Cleaning Services LTD",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "519-574-1552",
  phoneHref: "tel:519-574-1552",
  email: "redandwhiteclean@gmail.com",
  address: {
    street: "",
    city: "Kitchener",
    province: "Ontario",
    country: "Canada",
    postalCode: "",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  businessHours: "Monday – Friday: 8:00 AM – 6:00 PM",
  founded: "2015",
} as const;
