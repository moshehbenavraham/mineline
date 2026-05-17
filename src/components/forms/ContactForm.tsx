import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, CheckCircle2, Mail } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { photographerInfo } from '@/data/photographer';

// Validation schema with security best practices
const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
  projectType: z.enum(['editorial', 'commercial', 'personal'], {
    required_error: 'Please select a project type',
  }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be less than 1000 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
const contactFormEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim();

/**
 * Contact form component with validation, toast feedback, and a safe
 * mailto fallback. Two delivery modes:
 *
 *  1. POST → VITE_CONTACT_FORM_ENDPOINT when configured (e.g. Formspree,
 *     a serverless function, etc.).
 *  2. mailto fallback when no endpoint is configured — the form composes a
 *     prefilled email in the visitor's mail client, so the form never
 *     silently swallows submissions.
 */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: undefined,
      message: '',
    },
  });

  const openMailto = (data: ContactFormValues) => {
    const subject = `New ${data.projectType} inquiry from ${data.name}`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Project type: ${data.projectType}`,
      '',
      data.message,
    ].join('\n');
    const href = `mailto:${photographerInfo.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    // Use location.href so the browser handles unknown mail-client edge cases gracefully.
    window.location.href = href;
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      if (contactFormEndpoint) {
        const response = await fetch(contactFormEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            projectType: data.projectType,
            message: data.message,
            subject: `New ${data.projectType} inquiry from ${data.name}`,
          }),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        setIsSuccess(true);
        toast.success('Message sent', {
          description: "I'll get back to you within 24–48 hours.",
        });
        form.reset();

        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        // No backend configured — open the user's mail client with everything pre-filled.
        // This keeps the form honest: nothing is silently dropped.
        openMailto(data);
        toast.message('Opening your email app', {
          description: `Your message has been pre-filled for ${photographerInfo.email}. Hit send to complete.`,
        });
        form.reset();
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to send message.';
      form.setError('root', {
        message: 'Failed to send message. Please try again or email me directly.',
      });
      toast.error("Couldn't send message", {
        description: `${message}. You can also email ${photographerInfo.email} directly.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message
  if (isSuccess) {
    return (
      <motion.div
        className="bg-accent border border-border rounded-sm p-8 text-center space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="size-16 mx-auto text-green-600 dark:text-green-400" />
        </motion.div>
        <h3 className="text-2xl font-light tracking-wide">Message Sent!</h3>
        <p className="text-muted-foreground font-light leading-relaxed">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your full name"
                  autoComplete="name"
                  className="font-light"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  className="font-light"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        {/* Project Type Select */}
        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">
                Project Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="font-light">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="editorial" className="font-light">
                    Editorial
                  </SelectItem>
                  <SelectItem value="commercial" className="font-light">
                    Commercial
                  </SelectItem>
                  <SelectItem value="personal" className="font-light">
                    Personal
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        {/* Message Textarea */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me about your project..."
                  className="min-h-32 font-light resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        {/* Root Error Message */}
        {form.formState.errors.root && (
          <div
            className="text-sm text-destructive font-light"
            role="alert"
            aria-live="assertive"
          >
            {form.formState.errors.root.message}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-6 text-base font-light tracking-wide"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-5 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : contactFormEndpoint ? (
            'Send Message'
          ) : (
            <>
              <Mail className="mr-2 size-5" aria-hidden="true" />
              Send via Email
            </>
          )}
        </Button>

        {!contactFormEndpoint && (
          <p className="text-xs text-muted-foreground font-light text-center">
            Submitting opens your email app with this message pre-filled for{' '}
            <a
              href={`mailto:${photographerInfo.email}`}
              className="underline underline-offset-2 hover:text-foreground"
            >
              {photographerInfo.email}
            </a>
            .
          </p>
        )}
      </form>
    </Form>
  );
}
