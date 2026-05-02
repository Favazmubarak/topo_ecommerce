# Topo — Premium Aluminum Windows & Doors

A production client website built for **Topo**, a premium aluminum window and door company established in 2016, Kerala.

A fully custom CMS where the client controls every section of their website — hero images, products, gallery, testimonials, FAQs — without touching a single line of code. Changes go live in **10–15 seconds**.

---

## Live

[![Live](https://img.shields.io/badge/Live-topo--ecommerce.vercel.app-16A34A?style=for-the-badge&logo=vercel&logoColor=white)](https://topo-ecommerce.vercel.app/)
[![Repo](https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Favazmubarak/topo_ecommerce)

---

## What It Does

Topo needed more than a brochure website. They needed to update their hero banner for seasonal promotions, add new products as their catalog grew, upload gallery images from completed projects, and manage customer testimonials — all without a developer.

The result is a **live-synced CMS website** where admin panel changes propagate to the public site automatically. No redeploys. No cache clearing. Just update and done.

---

## Key Features

- Full custom CMS — hero, about, products, gallery, testimonials, FAQ, all editable
- Real-time live sync — public site reflects admin changes within 10–15 seconds
- JWT-protected admin portal with edge middleware — unauthenticated users can't even download the JS bundles
- Cloudinary image management — automated WebP/AVIF delivery, admin upload & delete
- Physics-based scroll animations and parallax effects via Framer Motion
- Premium page loader with cinematic logo reveal
- Interactive hotspot overlays on the hero section
- Glassmorphism UI patterns with WCAG-compliant contrast
- Complex CSS Grid image galleries with custom col-span mappings
- Fully responsive across all screen sizes
- SSR on public pages for SEO — serverless API routes for admin operations
- Paginated gallery and product pages

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)

---

## Architecture

```
Public Site (SSR + Client Polling)
        │
        ├── GET /api/hero        ──► MongoDB (force-dynamic, no cache)
        ├── GET /api/products    ──► MongoDB (force-dynamic, no cache)
        ├── GET /api/gallery     ──► MongoDB (force-dynamic, no cache)
        ├── GET /api/testimonials──► MongoDB (force-dynamic, no cache)
        └── GET /api/faq         ──► MongoDB (force-dynamic, no cache)

Admin Portal (/admin/*)
        │
        ├── Next.js Edge Middleware (JWT verify → reject before JS bundle served)
        │
        ├── POST /api/hero       ──► MongoDB upsert
        ├── POST /api/gallery    ──► Cloudinary upload → MongoDB
        ├── POST /api/products   ──► Cloudinary upload → MongoDB
        └── DELETE /api/gallery/:id ──► MongoDB delete
```

**How live sync works:** All public API routes are configured with `export const dynamic = "force-dynamic"` to bypass Next.js caching. Key components run a `useEffect` polling loop with `setInterval` — fetching fresh JSON every 10–15 seconds using `fetch(url, { cache: 'no-store' })`. When the payload differs from current state, React updates the UI with a Framer Motion transition.

---

## CMS Sections

| Section | What the Admin Controls |
|---|---|
| Hero & Banner | Background image, headline text, title color |
| About | Two content images |
| Why Choose | Feature section image |
| Products | Add / delete products with title, description, image |
| Gallery | Upload / delete gallery images with titles |
| Testimonials | Add / delete client reviews with name, text, photo |
| FAQ | Add / delete questions and answers |

---

## Security

- **JWT via `jose`** — minted on login, stored as HTTP-only secure cookie
- **Next.js Edge Middleware** — intercepts all `/admin/*` requests at the edge; invalid or missing JWT redirects to login before any JS is served
- **Cloudinary unsigned preset** — client uploads go directly to Cloudinary; API keys never exposed to the browser
- Admin password stored as environment variable, never in codebase

---

## Animations & UI

Built with Framer Motion for a premium feel:

- Cinematic page loader — logo and subtext reveal with cubic-bezier spring easing
- Hero image parallax zoom on scroll via `useScroll` + `useTransform`
- Interactive hotspot overlays on the hero with SVG connector lines
- Staggered section reveals with `whileInView` — each tied to viewport entry
- Testimonials auto-carousel with `AnimatePresence` slide transitions
- Gallery lightbox with keyboard navigation (arrow keys + Escape)
- Parallax image effect inside every gallery card using `useScroll`

---

## Status

**Live in production.**

Running actively for the Topo client. Content is fully managed by the client through the admin portal with zero developer involvement after handoff.

*Screenshots coming soon.*
