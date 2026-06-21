import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig({}),
  // Force webpack bundler — Turbopack generates separate server chunks that
  // cannot be dynamically required in a Cloudflare Worker environment.
  buildCommand: "npm run build -- --webpack",
};
