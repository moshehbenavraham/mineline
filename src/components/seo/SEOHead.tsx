import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { photographerInfo } from '@/data/photographer';
import { canonicalUrl, toAbsoluteUrl, SITE_URL } from '@/lib/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  /**
   * Optional JSON-LD structured-data object for the current route.
   * Rendered/replaced via an id-stable <script type="application/ld+json">
   * tag so crawlers always see one canonical entry per page.
   */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  /**
   * Per-route noindex toggle. Defaults to false (index everywhere except
   * routes that pass `noindex`).
   */
  noindex?: boolean;
}

const ROUTE_LD_ID = 'route-jsonld';

/**
 * SEO component for managing per-page meta tags, canonical links, and
 * JSON-LD structured data. Designed to work with the site-wide tags in
 * index.html — every field rendered here overrides the static fallback.
 */
export function SEOHead({
  title,
  description,
  // Photo by Oyemike Princewill on Unsplash
  image = '/assets/portfolio/41-1662333085102-f6ae3be21c91.jpg',
  type = 'website',
  jsonLd,
  noindex = false,
}: SEOHeadProps) {
  const location = useLocation();

  const fullTitle = title
    ? `${title} | ${photographerInfo.name}`
    : `${photographerInfo.name} | ${photographerInfo.tagline}`;

  const defaultDescription = photographerInfo.heroIntroduction;
  const fullDescription = description || defaultDescription;

  const fullUrl = canonicalUrl(location.pathname);
  const absoluteImage = toAbsoluteUrl(image);

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags (name= for standard, property= for OG)
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Update or create <link rel="canonical">
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard meta
    updateMetaTag('description', fullDescription);
    updateMetaTag(
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    );

    // Canonical
    updateLinkTag('canonical', fullUrl);

    // Open Graph
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', absoluteImage, true);
    updateMetaTag('og:site_name', `${photographerInfo.name} Photography`, true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    updateMetaTag('twitter:image', absoluteImage);

    // Identity / keywords
    updateMetaTag('author', photographerInfo.name);
    updateMetaTag(
      'keywords',
      `photography, ${photographerInfo.name}, professional photographer, ${photographerInfo.tagline}, editorial photography, commercial photography`,
    );

    // Inject per-route JSON-LD (replaces any prior route LD so we never stack).
    const head = document.head;
    const existing = document.getElementById(ROUTE_LD_ID);
    if (jsonLd) {
      const script =
        (existing as HTMLScriptElement | null) ??
        (() => {
          const s = document.createElement('script');
          s.type = 'application/ld+json';
          s.id = ROUTE_LD_ID;
          head.appendChild(s);
          return s;
        })();
      script.textContent = JSON.stringify(jsonLd);
    } else if (existing) {
      existing.remove();
    }
  }, [fullTitle, fullDescription, fullUrl, absoluteImage, type, jsonLd, noindex]);

  return null;
}

/**
 * Helpers to build common JSON-LD payloads. Co-located so callers don't
 * have to repeat shape boilerplate.
 */
export const seoJsonLd = {
  person: () => {
    const sameAs = [
      photographerInfo.socialLinks.instagram,
      photographerInfo.socialLinks.linkedin,
      photographerInfo.socialLinks.behance,
    ].filter((u): u is string => Boolean(u));

    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: photographerInfo.name,
      jobTitle: photographerInfo.tagline,
      description: photographerInfo.biography.split('\n\n')[0],
      url: `${SITE_URL}/`,
      image: toAbsoluteUrl(photographerInfo.portraitImage),
      email: `mailto:${photographerInfo.email}`,
      telephone: photographerInfo.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: photographerInfo.location,
      },
      alumniOf: photographerInfo.education,
      knowsAbout: ['Editorial Photography', 'Commercial Photography', 'Portrait Photography'],
      // Only emit sameAs when there are actual profile URLs — an empty
      // array signals "no presence" to crawlers, which is misleading when
      // the truth is "we haven't wired up the links yet".
      ...(sameAs.length > 0 ? { sameAs } : {}),
    };
  },

  contactPage: () => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${photographerInfo.name}`,
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: photographerInfo.name,
      email: `mailto:${photographerInfo.email}`,
      telephone: photographerInfo.phone,
    },
  }),
};
