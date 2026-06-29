import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Embed server-only secrets into the Worker bundle at build time.
  // Cloudflare Workers runtime does not expose these via process.env unless
  // they are set as Wrangler secrets; baking them in ensures they're always available.
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
