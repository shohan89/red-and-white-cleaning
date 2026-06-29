import { createClient, type SupabaseClient } from "@supabase/supabase-js"

function lazyClient(getKey: () => [string, string]): SupabaseClient {
  let client: SupabaseClient | undefined
  return new Proxy({} as SupabaseClient, {
    get(_, prop) {
      if (!client) client = createClient(...getKey())
      const val = (client as any)[prop]
      return typeof val === "function" ? val.bind(client) : val
    },
  })
}

// Clients are created on first property access so missing secrets at module
// load time (e.g. during Worker cold-start before env bindings are mapped)
// do not crash the entire Worker.
export const supabaseAdmin = lazyClient(() => [
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
])

export const supabase = lazyClient(() => [
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
])
