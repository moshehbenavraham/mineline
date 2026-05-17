# Personal Portfolio

Minimal photography portfolio for editorial, commercial, portrait, landscape, architecture, and documentary work. The app is built with Vite, React, TypeScript, Tailwind CSS, shadcn/ui, and local media assets.

## Development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Run lint checks:

```sh
npm run lint
```

To send contact form submissions to a backend, set `VITE_CONTACT_FORM_ENDPOINT` to a standard form endpoint or webhook URL. Without that value, the form validates locally and shows the success state for static demos.

## Project Structure

- `src/pages` - route-level pages for home, portfolio, project detail, about, and contact
- `src/components` - layout, portfolio, form, SEO, and UI components
- `src/data` - portfolio project and photographer profile data
- `public/assets/portfolio` - local portfolio and social preview assets

## Deployment

The production build is emitted to `dist` and can be deployed to any static hosting provider that supports Vite single-page applications.
