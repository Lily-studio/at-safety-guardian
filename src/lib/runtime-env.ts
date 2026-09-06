/**
 * Environment resolution that works in every runtime we deploy to.
 *
 * - Lovable Cloud / node dev: values arrive on `process.env`.
 * - Cloudflare Workers (GitHub -> Workers deploy): `process.env` is empty unless
 *   the user declared `vars`/secrets, so we fall back to the `VITE_*` values that
 *   Vite inlines into BOTH the client and the server bundle at build time.
 */
const BUILD_ENV = import.meta.env as Record<string, string | undefined>;

function fromProcess(name: string): string | undefined {
  try {
    return typeof process !== "undefined" ? process.env?.[name] : undefined;
  } catch {
    return undefined;
  }
}

export function readEnv(...names: string[]): string | undefined {
  for (const name of names) {
    const value = fromProcess(name) || BUILD_ENV[name];
    if (value) return value;
  }
  return undefined;
}

export function supabaseUrl(): string | undefined {
  return readEnv("SUPABASE_URL", "VITE_SUPABASE_URL");
}

export function supabasePublishableKey(): string | undefined {
  return readEnv("SUPABASE_PUBLISHABLE_KEY", "VITE_SUPABASE_PUBLISHABLE_KEY");
}
