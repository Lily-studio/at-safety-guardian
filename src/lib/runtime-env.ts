/**
 * Environment resolution that works in every runtime we deploy to.
 *
 * - Lovable Cloud / node dev: values arrive on `process.env`.
 * - Cloudflare Workers (GitHub -> Workers deploy): `process.env` is empty unless
 *   the user declared `vars`/secrets, so we fall back to the `VITE_*` values that
 *   Vite inlines into BOTH the client and the server bundle at build time.
 *   These must be accessed statically so the bundler can replace them.
 * - Last resort: the project's public (publishable) backend config. These values
 *   are safe in source — they are the same ones shipped in the browser bundle —
 *   and they keep the site working if a CI build runs without any env file.
 */

const BUILD_SUPABASE_URL = import.meta.env['VITE_SUPABASE_URL'] as string | undefined;
const BUILD_SUPABASE_PUBLISHABLE_KEY = import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] as
  | string
  | undefined;

const FALLBACK_SUPABASE_URL = 'https://spqxkqretbwikianofcj.supabase.co';
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_J7_UBFXjgedLcYNsouTLTQ_DwPOK6rf';

function fromProcess(name: string): string | undefined {
  try {
    return typeof process !== 'undefined' ? process.env?.[name] : undefined;
  } catch {
    return undefined;
  }
}

export function supabaseUrl(): string {
  return fromProcess('SUPABASE_URL') || BUILD_SUPABASE_URL || FALLBACK_SUPABASE_URL;
}

export function supabasePublishableKey(): string {
  return (
    fromProcess('SUPABASE_PUBLISHABLE_KEY') ||
    BUILD_SUPABASE_PUBLISHABLE_KEY ||
    FALLBACK_SUPABASE_PUBLISHABLE_KEY
  );
}
