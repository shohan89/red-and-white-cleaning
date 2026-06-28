import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These vars are available at build time (Cloudflare Workers Builds section)
  // but NOT at Worker runtime. Listing them here embeds their values into the
  // server bundle so they're available via process.env at request time.
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DIRECT_URL: process.env.DIRECT_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
