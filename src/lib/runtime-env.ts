/**
 * Environment resolution that works in every runtime we deploy to.
 *
 * - Lovable Cloud / node dev: values arrive on `process.env`.
 * - Cloudflare Workers (GitHub -> Workers deploy): `process.env` is empty unless
 *   the user declared `vars`/secrets, so we fall back to the `VITE_*` values that
 *   Vite inlines into BOTH the client and the server bundle at build time.
 *   These must be accessed statically so the bundler can replace them.
 */

const BUILD_SUPABASE_URL = import.meta.env['VITE_SUPABASE_URL'] as string | undefined;
const BUILD_SUPABASE_PUBLISHABLE_KEY = import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] as
  | string
  | undefined;

function fromProcess(name: string): string | undefined {
  try {
    return typeof process !== "undefined" ? process.env?.[name] : undefined;
  } catch {
    return undefined;
  }
}

export function supabaseUrl(): string | undefined {
  return fromProcess("SUPABASE_URL") || BUILD_SUPABASE_URL;
}

export function supabasePublishableKey(): string | undefined {
  return fromProcess("SUPABASE_PUBLISHABLE_KEY") || BUILD_SUPABASE_PUBLISHABLE_KEY;
}
