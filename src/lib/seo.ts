/**
 * Centralized SEO configuration.
 *
 * SITE_URL is the canonical production origin used for:
 *   - <link rel="canonical">
 *   - Absolute Open Graph / Twitter image URLs
 *   - JSON-LD structured data
 *   - sitemap.xml entries
 *
 * Defaults to https://sarahmitchell.com (derived from the email domain in
 * src/data/photographer.ts). Override at build time with VITE_SITE_URL when
 * the production host is finalized.
 */
const RAW_SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.trim() ||
  'https://sarahmitchell.com';

// Normalize: strip trailing slash so concatenation is predictable.
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, '');

/**
 * Resolve any path/URL to an absolute URL using SITE_URL.
 * - Pass-through for absolute http(s) URLs.
 * - Prefixes site origin for root-relative paths ("/foo").
 * - Falls back gracefully for relative paths.
 */
export function toAbsoluteUrl(pathOrUrl: string | undefined | null): string {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith('/')) return `${SITE_URL}${pathOrUrl}`;
  return `${SITE_URL}/${pathOrUrl}`;
}

/** Build a canonical URL for a given route path. */
export function canonicalUrl(pathname: string): string {
  if (!pathname || pathname === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}
