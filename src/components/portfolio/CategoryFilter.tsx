import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * Category filter component with smooth transitions.
 * Shows active state and animates category changes. Each pill is a real
 * <button type="button"> so keyboard activation (Enter/Space) and screen
 * readers work without extra wiring, and a visible focus-visible ring
 * gives keyboard users a clear landing target.
 */
export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div
      className="flex flex-wrap justify-center gap-3 md:gap-4"
      role="group"
      aria-label="Portfolio category filter"
    >
      {categories.map((category, index) => {
        const isActive = activeCategory === category.id;

        return (
          <motion.button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            aria-pressed={isActive}
            className={cn(
              'relative px-6 py-2.5 text-sm font-light tracking-wide rounded-sm transition-all duration-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              isActive
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20',
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Active background */}
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-primary rounded-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            {/* Text */}
            <span className="relative z-10">{category.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
