import { useMemo, useState } from 'react';
import { projects, getProjectsByCategory } from '@/data/projects';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { CategoryFilter } from '@/components/portfolio/CategoryFilter';
import { SEOHead } from '@/components/seo/SEOHead';
import { SITE_URL, toAbsoluteUrl } from '@/lib/seo';
import { motion } from 'framer-motion';
import type { ProjectCategory } from '@/types';

/**
 * Portfolio page with category filter + masonry grid.
 * Features smooth animations and responsive layout. The CategoryFilter is
 * derived from the actual categories present in the project data so new
 * categories light up automatically when the catalog is extended.
 */
export default function Portfolio() {
  // Derive the category list from data so the filter never drifts from the
  // catalog. Categories are sorted in canonical SPECIFICATION order with
  // any unknown additions appended alphabetically.
  const categories = useMemo(() => {
    const canonicalOrder: ProjectCategory[] = [
      'portraits',
      'landscapes',
      'editorial',
      'architecture',
      'documentary',
    ];
    const present = new Set(projects.map((p) => p.category));
    const ordered = [
      ...canonicalOrder.filter((c) => present.has(c)),
      ...Array.from(present)
        .filter((c) => !canonicalOrder.includes(c))
        .sort(),
    ];
    return [
      { id: 'all', label: 'All Works' },
      ...ordered.map((id) => ({
        id,
        // Capitalize first letter for display ("portraits" -> "Portraits").
        label: id.charAt(0).toUpperCase() + id.slice(1),
      })),
    ];
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Memoize the filtered slice so PortfolioGrid's AnimatePresence sees a
  // stable reference until the filter actually changes.
  const visibleProjects = useMemo(
    () => getProjectsByCategory(activeCategory),
    [activeCategory],
  );

  return (
    <>
      <SEOHead
        title="Portfolio"
        description="Browse my complete photography portfolio featuring portraits, landscapes, editorial work, architecture, and documentary projects."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Portfolio',
          url: `${SITE_URL}/portfolio`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: projects.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE_URL}/project/${p.slug}`,
              name: p.title,
              image: toAbsoluteUrl(p.coverImage),
            })),
          },
        }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
              Portfolio
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
              A curated collection of photography spanning diverse subjects and styles
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section
        className="pt-12 md:pt-16 px-6 lg:px-8"
        aria-label="Filter portfolio by category"
      >
        <div className="max-w-5xl mx-auto">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Portfolio Grid - Edge to edge */}
      <section className="py-8 md:py-12 px-2 md:px-4">
        {visibleProjects.length > 0 ? (
          <PortfolioGrid projects={visibleProjects} />
        ) : (
          <p
            className="text-center text-muted-foreground font-light py-16"
            role="status"
            aria-live="polite"
          >
            No projects in this category yet.
          </p>
        )}
      </section>

        {/* Bottom spacing */}
        <div className="h-24" />
      </div>
    </>
  );
}
