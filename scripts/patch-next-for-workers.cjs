/**
 * Pre-build patch for Cloudflare Workers compatibility.
 *
 * The @opennextjs/cloudflare esbuild bundler aliases `require('module')` to a custom
 * shims/module.js file that exports an ESM module with `export default Module`.
 *
 * Problem: when require-hook.js (CJS) does `const mod = require('module')`, esbuild
 * wraps the ESM shim in a namespace object: `{ __esModule: true, default: Module, ... }`.
 * The code then does `mod.prototype.require` which is `undefined.require` → crash.
 *
 * Fix: add `export const prototype = Module.prototype` to the shim so that the
 * namespace wrapper's `.prototype.require` resolves to the noop function.
 * This shim is ONLY used by the esbuild bundler step, not by `next build`, so it is
 * safe to patch before opennextjs-cloudflare runs.
 */

const { readFileSync, writeFileSync, existsSync } = require("fs");
const path = require("path");

const shimPath = path.join(
  __dirname,
  "../node_modules/@opennextjs/cloudflare/dist/cli/templates/shims/module.js"
);

if (!existsSync(shimPath)) {
  console.warn("⚠️  module.js shim not found, skipping patch");
  process.exit(0);
}

const content = readFileSync(shimPath, "utf8");

if (content.includes("Workers compat patch")) {
  // Already patched — overwrite anyway to ensure correct version (removes old bad patch)
  const badVersion = "export const _resolveFilename";
  if (!content.includes(badVersion)) {
    console.log("ℹ️  module.js shim already patched correctly, skipping");
    process.exit(0);
  }
  console.log("⚠️  Old bad patch detected, re-patching...");
}

// Strip any previous (possibly incorrect) patch and re-apply the correct one.
const base = content.includes("Workers compat patch")
  ? content.substring(0, content.indexOf("\n// Workers compat patch"))
  : content;

const patched =
  base +
  `
// Workers compat patch: expose prototype as a named export so that esbuild's CJS→ESM
// namespace wrapper satisfies require-hook.js's \`mod.prototype.require\` accessor.
// Do NOT export _resolveFilename — require-hook.js tries to SET mod._resolveFilename,
// which would throw if it is a getter-only property on the namespace wrapper.
export const prototype = Module.prototype;
`;

writeFileSync(shimPath, patched, "utf8");
console.log(
  "✅ Patched @opennextjs/cloudflare shims/module.js → added prototype export"
);
