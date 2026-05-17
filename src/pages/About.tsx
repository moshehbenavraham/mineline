import { motion } from 'framer-motion';
import { Award, Briefcase, Instagram, Linkedin } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';
import { SEOHead, seoJsonLd } from '@/components/seo/SEOHead';

/**
 * About page with photographer biography and professional information.
 * Renders the full must-have surface from SPECIFICATION §2.6:
 *   - Professional portrait + biography
 *   - Photography philosophy / approach
 *   - Awards
 *   - Selected clients
 *   - Education
 *   - Social links (only when handles are populated in data)
 */
export default function About() {
  const { approach, awards, clients, education } = photographerInfo;
  const approachParagraphs = approach ? approach.split('\n\n') : [];

  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${photographerInfo.name}, ${photographerInfo.tagline}. ${photographerInfo.biography.split('\n\n')[0]}`}
        image={photographerInfo.portraitImage}
        type="profile"
        jsonLd={seoJsonLd.person()}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0.8, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
              About
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
              Photographer & Visual Storyteller
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portrait and Biography - Split Layout */}
      <section className="py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Portrait Image */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0.8, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-muted">
                <img
                  src="/assets/portfolio/43-afro-hair-fashion-model-3888252.jpg"
                  alt={`${photographerInfo.name} portrait`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {photographerInfo.socialLinks.instagram && (
                  <a
                    href={photographerInfo.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="size-5" />
                  </a>
                )}
                {photographerInfo.socialLinks.linkedin && (
                  <a
                    href={photographerInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="size-5" />
                  </a>
                )}
                {photographerInfo.socialLinks.behance && (
                  <a
                    href={photographerInfo.socialLinks.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                    aria-label="Behance"
                  >
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8h6a3 3 0 0 1 0 6H3V8z" />
                      <path d="M3 14h7a3 3 0 0 1 0 6H3v-6z" />
                      <path d="M14 7h7" />
                      <path d="M17 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Biography and Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0.8, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Name and Tagline */}
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                  {photographerInfo.name}
                </h2>
                <p className="text-xl text-muted-foreground font-light tracking-wide">
                  {photographerInfo.tagline}
                </p>
              </div>

              <Separator />

              {/* Biography */}
              <div className="space-y-4">
                {photographerInfo.biography.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Contact Info */}
              <div className="pt-4 space-y-2">
                <div className="text-sm font-light tracking-wide">
                  <span className="text-muted-foreground">Email: </span>
                  <a
                    href={`mailto:${photographerInfo.email}`}
                    className="text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {photographerInfo.email}
                  </a>
                </div>
                <div className="text-sm font-light tracking-wide">
                  <span className="text-muted-foreground">Location: </span>
                  <span className="text-foreground">{photographerInfo.location}</span>
                </div>
                {education && (
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">Education: </span>
                    <span className="text-foreground">{education}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Approach / Philosophy */}
      {approachParagraphs.length > 0 && (
        <section
          className="py-16 md:py-24 px-6 lg:px-8 border-t border-border bg-accent/30"
          aria-labelledby="approach-heading"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-center"
            >
              <p className="text-xs font-light tracking-[0.3em] uppercase text-muted-foreground">
                Philosophy
              </p>
              <h2
                id="approach-heading"
                className="text-3xl md:text-4xl font-light tracking-wide"
              >
                My Approach
              </h2>
            </motion.div>

            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {approachParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Awards + Selected Clients */}
      {(awards.length > 0 || clients.length > 0) && (
        <section
          className="py-16 md:py-24 px-6 lg:px-8 border-t border-border"
          aria-labelledby="recognition-heading"
        >
          <div className="max-w-6xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-center"
            >
              <p className="text-xs font-light tracking-[0.3em] uppercase text-muted-foreground">
                Recognition
              </p>
              <h2
                id="recognition-heading"
                className="text-3xl md:text-4xl font-light tracking-wide"
              >
                Awards &amp; Clients
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Awards */}
              {awards.length > 0 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <Award
                      className="size-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <h3 className="text-xs font-light tracking-[0.3em] uppercase text-muted-foreground">
                      Awards
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {awards.map((award, index) => (
                      <li
                        key={index}
                        className="text-base md:text-lg font-light leading-relaxed text-foreground border-b border-border/60 pb-3 last:border-b-0 last:pb-0"
                      >
                        {award}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Selected Clients */}
              {clients.length > 0 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <div className="flex items-center gap-3">
                    <Briefcase
                      className="size-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <h3 className="text-xs font-light tracking-[0.3em] uppercase text-muted-foreground">
                      Selected Clients
                    </h3>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {clients.map((client, index) => (
                      <li
                        key={index}
                        className="text-base md:text-lg font-light tracking-wide text-foreground"
                      >
                        {client}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}
      </div>
    </>
  );
}
