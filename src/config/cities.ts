export const SERVICE_CITIES = [
  { name: "Kitchener",  slug: "kitchener",  province: "Ontario" },
  { name: "Waterloo",   slug: "waterloo",   province: "Ontario" },
  { name: "Cambridge",  slug: "cambridge",  province: "Ontario" },
  { name: "Guelph",     slug: "guelph",     province: "Ontario" },
  { name: "Hamilton",   slug: "hamilton",   province: "Ontario" },
  { name: "London",     slug: "london",     province: "Ontario" },
  { name: "Brantford",  slug: "brantford",  province: "Ontario" },
] as const;

export type City = (typeof SERVICE_CITIES)[number];
