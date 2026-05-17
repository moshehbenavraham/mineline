import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Camera, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getAdjacentProjects, getProjectBySlug } from '@/data/projects';
import { ImageWithLightbox } from '@/components/portfolio/ImageWithLightbox';
import { Lightbox } from '@/components/portfolio/Lightbox';
import { ProjectNavigation } from '@/components/portfolio/ProjectNavigation';
import NotFound from './NotFound';
import { SITE_URL, toAbsoluteUrl } from '@/lib/seo';
import { photographerInfo } from '@/data/photographer';

/**
 * Project detail page with hero image, gallery, and full-screen lightbox.
 * Features smooth animations, immersive image viewing, and adjacent
 * prev/next project navigation.
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Render NotFound in place rather than redirecting to "/404" — the router
  // has no `/404` route, so the previous `<Navigate to="/404" />` polluted
  // history with an unknown URL while still landing on the catch-all NotFound.
  if (!project) {
    return <NotFound />;
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const { prev, next } = getAdjacentProjects(project.slug);

  const projectUrl = `${SITE_URL}/project/${project.slug}`;
  // ImageGallery / CreativeWork structured data so crawlers can index project
  // pages with rich result eligibility (images, author, client).
  const projectJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: project.title,
    description: project.description,
    url: projectUrl,
    image: project.images.map((img) => toAbsoluteUrl(img.src)),
    associatedMedia: project.images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: toAbsoluteUrl(img.src),
      name: img.alt,
      ...(img.caption ? { caption: img.caption } : {}),
    })),
    author: {
      '@type': 'Person',
      name: photographerInfo.name,
      url: `${SITE_URL}/`,
    },
    creator: {
      '@type': 'Person',
      name: photographerInfo.name,
      url: `${SITE_URL}/`,
    },
    dateCreated: project.year,
    keywords: project.category,
    ...(project.location ? { contentLocation: project.location } : {}),
    ...(project.client
      ? {
          sponsor: {
            '@type': 'Organization',
            name: project.client,
          },
        }
      : {}),
  };

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.description}
        image={project.coverImage}
        type="article"
        jsonLd={projectJsonLd}
      />

      <div className="min-h-screen">
        {/* Hero Image - 70vh */}
      <motion.div
        className="relative w-full h-[70vh] overflow-hidden bg-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </motion.div>

      {/* Project Info Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Title and Category */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-light">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2 capitalize">
                <span>•</span>
                <span>{project.category}</span>
              </div>
              {project.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>{project.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl font-light leading-relaxed text-foreground">
              {project.description}
            </p>
          </div>

          {/* Technical Details */}
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            {project.camera && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-light tracking-wide uppercase text-muted-foreground">
                  <Camera className="size-4" />
                  <span>Camera</span>
                </div>
                <p className="font-light text-foreground">{project.camera}</p>
              </div>
            )}
            {project.client && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-light tracking-wide uppercase text-muted-foreground">
                  <User className="size-4" />
                  <span>Client</span>
                </div>
                <p className="font-light text-foreground">{project.client}</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

        {/* Image Gallery - Edge to edge */}
        <section className="py-12 md:py-16">
          <div className="space-y-8 md:space-y-12">
            {project.images.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 0.1}>
                <ImageWithLightbox
                  image={image}
                  onClick={() => openLightbox(index)}
                  priority={index === 0}
                  index={0}
                  className="w-full"
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Prev / Next project navigation */}
        <ProjectNavigation prev={prev} next={next} />

        {/* Lightbox */}
        <Lightbox
          images={project.images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNavigate={setCurrentImageIndex}
        />
      </div>
    </>
  );
}
