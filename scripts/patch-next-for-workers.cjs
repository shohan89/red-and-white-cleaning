/**
 * Pre-build patches for Cloudflare Workers compatibility.
 *
 * Patch 1 — module.js shim (require-hook crash):
 *   The @opennextjs/cloudflare esbuild bundler aliases `require('module')` to a custom
 *   shims/module.js file that exports an ESM module with `export default Module`.
 *   When require-hook.js (CJS) does `const mod = require('module')`, esbuild wraps the
 *   ESM shim in a namespace object: `{ __esModule: true, default: Module, ... }`.
 *   Accessing `mod.prototype.require` crashes because `.prototype` is not a named export.
 *   Fix: add `export const prototype = Module.prototype` so the namespace wrapper exposes
 *   it. The shim is only used by esbuild, never by `next build`.
 *
 * Patch 2 — normalizeUrl optional chaining (null-normalizer guard):
 *   AppPageRouteModule.normalizeUrl() calls this.normalizers.segmentPrefetchRSC.match()
 *   and this.normalizers.rsc.match() without null-guards. If minimalMode=false on the
 *   base server the normalizers can be undefined, causing a TypeError on RSC navigation.
 *   Fix: replace .match() with ?.match() in the compiled app-page runtime used by esbuild.
 */

const { readFileSync, writeFileSync, existsSync } = require("fs");
const path = require("path");

// ── Patch 1: module.js shim ──────────────────────────────────────────────────

const shimPath = path.join(
  __dirname,
  "../node_modules/@opennextjs/cloudflare/dist/cli/templates/shims/module.js"
);

if (!existsSync(shimPath)) {
  console.warn("⚠️  module.js shim not found, skipping patch 1");
} else {
  const content = readFileSync(shimPath, "utf8");

  if (content.includes("Workers compat patch")) {
    const badVersion = "export const _resolveFilename";
    if (!content.includes(badVersion)) {
      console.log("ℹ️  module.js shim already patched correctly, skipping patch 1");
    } else {
      console.log("⚠️  Old bad patch detected in module.js, re-patching...");
      applyModuleShimPatch(shimPath, content);
    }
  } else {
    applyModuleShimPatch(shimPath, content);
  }
}

function applyModuleShimPatch(filePath, content) {
  const base = content.includes("Workers compat patch")
    ? content.substring(0, content.indexOf("\n// Workers compat patch"))
    : content;
  const patched =
    base +
    `\n// Workers compat patch: expose prototype as a named export so that esbuild's CJS→ESM\n// namespace wrapper satisfies require-hook.js's \`mod.prototype.require\` accessor.\n// Do NOT export _resolveFilename — require-hook.js tries to SET mod._resolveFilename,\n// which would throw if it is a getter-only property on the namespace wrapper.\nexport const prototype = Module.prototype;\n`;
  writeFileSync(filePath, patched, "utf8");
  console.log("✅ Patch 1: module.js shim → added prototype export");
}

// ── Patch 3: worker.js template — catch uncaught exceptions for diagnostics ──

const workerPath = path.join(
  __dirname,
  "../node_modules/@opennextjs/cloudflare/dist/cli/templates/worker.js"
);

if (!existsSync(workerPath)) {
  console.warn("⚠️  worker.js template not found, skipping patch 3");
} else {
  const workerContent = readFileSync(workerPath, "utf8");
  // Wrap the handler call to catch uncaught exceptions.
  // Without this, any unhandled throw becomes a Cloudflare 1101 error with no body.
  // With this, the error message is returned in the 500 response for easy diagnosis.
  const targetLine = "return handler(reqOrResp, env, ctx, request.signal);";
  const replacement = [
    "try {",
    "                return await handler(reqOrResp, env, ctx, request.signal);",
    "            } catch (err) {",
    "                const msg = (err && err.stack) || (err && err.message) || String(err);",
    "                console.error('[Worker crash]', msg);",
    "                return new Response('Worker Error\\n\\n' + msg, { status: 500, headers: { 'content-type': 'text/plain' } });",
    "            }",
  ].join("\n                ");
  if (workerContent.includes("Workers compat patch 3")) {
    console.log("ℹ️  worker.js already patched (patch 3), skipping");
  } else if (!workerContent.includes(targetLine)) {
    console.warn("⚠️  worker.js template: target line not found, skipping patch 3");
  } else {
    const patched = workerContent.replace(targetLine, replacement + "\n            // Workers compat patch 3");
    writeFileSync(workerPath, patched, "utf8");
    console.log("✅ Patch 3: worker.js template → wrapped handler call with error catching");
  }
}

// ── Patch 2: app-page.runtime.prod.js normalizeUrl optional chaining ─────────

const runtimePath = path.join(
  __dirname,
  "../node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js"
);

if (!existsSync(runtimePath)) {
  console.warn("⚠️  app-page.runtime.prod.js not found, skipping patch 2");
} else {
  let runtime = readFileSync(runtimePath, "utf8");
  let changed = false;

  // Guard segmentPrefetchRSC.match() with optional chaining
  const segBefore = 'this.normalizers.segmentPrefetchRSC.match(';
  const segAfter  = 'this.normalizers.segmentPrefetchRSC?.match(';
  if (runtime.includes(segBefore)) {
    runtime = runtime.split(segBefore).join(segAfter);
    changed = true;
  }

  // Guard rsc.match() with optional chaining (only inside normalizeUrl context)
  // Use a narrow replacement to avoid affecting unrelated .match() calls
  const rscBefore = 'this.normalizers.rsc.match(';
  const rscAfter  = 'this.normalizers.rsc?.match(';
  if (runtime.includes(rscBefore)) {
    runtime = runtime.split(rscBefore).join(rscAfter);
    changed = true;
  }

  if (changed) {
    writeFileSync(runtimePath, runtime, "utf8");
    console.log("✅ Patch 2: app-page.runtime.prod.js normalizeUrl → added optional chaining");
  } else {
    console.log("ℹ️  Patch 2: app-page.runtime.prod.js already patched or pattern not found, skipping");
  }
}
