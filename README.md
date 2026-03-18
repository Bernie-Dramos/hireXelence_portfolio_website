# HireXelence — Portfolio Website

> **"Specialised in Hiring Excellence"**

A premium, single-page marketing website for **HireXelence**, a strategic human resource solutions partner. The site showcases the company's services, mission/vision, engagement models, and provides contact & job application functionality — all wrapped in a rich, animation-first design.

---

## Table of Contents

- [Overview](#overview)
- [Live Preview](#live-preview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Page Sections](#page-sections)
- [Custom Components](#custom-components)
- [Custom Hooks](#custom-hooks)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Overview

HireXelence is a B2B recruitment and HR solutions firm. This website serves as a digital company profile, communicating their value proposition and enabling prospective clients and candidates to get in touch. The codebase is built for visual impact — featuring WebGL backgrounds, Framer Motion scroll animations, glassmorphism UI, and a fully responsive layout across all screen sizes.

---

## Live Preview

Deployed on **Vercel**. A `.vercelignore` file is present for deployment configuration.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) with custom design tokens |
| Component Library | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) primitives |
| Animation | [Framer Motion v11](https://www.framer.com/motion/) |
| 3D / WebGL | [Three.js](https://threejs.org/) (custom shader background) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation |
| Email | [EmailJS](https://www.emailjs.com/) (job applications) + [FormSubmit](https://formsubmit.co/) (contact form) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) + [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) |
| Package Manager | [pnpm](https://pnpm.io/) |

---

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles, Tailwind directives, glassmorphism utilities
│   ├── layout.tsx           # Root layout — metadata, fonts, body wrapper
│   └── page.tsx             # Main single-page application (all sections)
│
├── components/
│   ├── FloatingLines.jsx    # Three.js WebGL animated line/wave background
│   ├── FloatingLines.css    # Styles for canvas overlay
│   ├── hero-carousel.tsx    # 5-slide hero with auto-rotate & swipe support
│   ├── job-application-form.tsx  # Multi-field job application with EmailJS
│   ├── magnetic-button.tsx  # Cursor-following magnetic CTA button
│   ├── particles-background.tsx  # Particle effect component
│   ├── scroll-progress.tsx  # Animated top-of-page scroll progress bar
│   ├── theme-provider.tsx   # next-themes wrapper
│   └── ui/                  # Full shadcn/ui component suite (50+ components)
│
├── hooks/
│   ├── use-in-view.ts       # Intersection Observer for scroll-triggered animations
│   ├── use-mobile.tsx       # Responsive breakpoint detection
│   ├── use-mouse-position.ts # Mouse tracking + magnetic hover
│   ├── use-reduced-motion.ts # Accessibility: prefers-reduced-motion
│   ├── use-scroll-progress.ts # Scroll position as a normalized value
│   └── use-toast.ts         # Toast notification hook
│
├── lib/
│   └── utils.ts             # Tailwind class merger (cn utility)
│
├── public/
│   ├── About Hirexelence - Website Version-1.txt  # Source content brief
│   └── images/              # All static assets
│       ├── hirexelence-logo.png
│       ├── hirexelence 1–5.jpeg  # Hero carousel images
│       ├── business-handshake.jpg
│       ├── business-team-presentation.jpg
│       ├── team-collaboration.jpg
│       └── hero-talent-acquisition.jpg
│
├── styles/
│   └── globals.css          # Auxiliary global styles
│
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── components.json          # shadcn/ui configuration
└── package.json
```

---

## Key Features

- **Animated Pill Navigation** — Fixed floating nav bar with scroll-aware active section highlighting and spring-animated indicator.
- **Hero Carousel** — 5-slide full-screen carousel with 5-second auto-rotation, directional animation, keyboard arrow-key navigation, and touch/swipe support on mobile.
- **WebGL Floating Lines** — Three.js custom shader (`FloatingLines`) renders an interactive, animated wave/line background with mouse interaction, parallax, and configurable zone controls.
- **Framer Motion Scroll Animations** — Every section uses `whileInView` with `viewport={{ once: true }}` for performant, one-shot entrance animations (fade, slide, clip-path reveal, staggered children).
- **Magnetic CTA Buttons** — `MagneticButton` tracks cursor proximity and applies a spring-physics offset, giving a premium interactive feel.
- **Job Application Modal** — Full multi-field form (name, email, phone with country code, DOB, area of interest, role) validated with Zod and submitted via EmailJS.
- **Contact Form** — Integrated with FormSubmit for no-backend email delivery.
- **Scroll Progress Bar** — Thin green progress strip at the top of the viewport driven by Framer Motion's `useScroll`.
- **Glassmorphism UI** — Custom Tailwind utility classes (`.glass`, `.glass-dark`, `.glass-green`) for blur/transparency card effects.
- **Responsive Design** — Fully responsive across mobile (xs: 480px), tablet, laptop, and ultra-wide (3xl: 1920px) screens using custom Tailwind breakpoints.
- **Accessibility** — `useReducedMotion` hook respects the OS `prefers-reduced-motion` preference; semantic HTML; keyboard navigable carousel and mobile menu.

---

## Page Sections

The entire site is a **single-page application** (`app/page.tsx`) with smooth-scroll navigation between anchored sections:

| Section ID | Title | Description |
|---|---|---|
| `#home` | Hero Carousel | 5-slide fullscreen hero with company taglines |
| `#about` | About The Company | Two-column layout: sticky text + horizontal scroll gallery (3 cards) |
| `#mission` | Mission & Vision | Split reveal: image clip-path animation + overlapping vision card |
| `#differentiators` | Strategic Differentiators | Asymmetric Bento grid with stats (15+ yrs, 95% success rate, 24/7) |
| `#services` | Core Services | 6-card grid covering end-to-end recruitment, HR strategy, automation, payroll, and global support |
| `#strengths` | Core Strengths | Expandable flex-panel cards with hover-reveal descriptions |
| `#why-us` | Why Partner with HireXelence | 3D hover-tilt card with CTA buttons (WhatsApp + Apply Now) |
| `#engagement` | Engagement & Delivery Models | Vertical animated timeline with pulse-ring nodes |
| `#contact` | Contact | Split layout: info cards + FormSubmit contact form |
| Footer | — | Logo, quick links, social contact icons |

---

## Custom Components

### `HeroCarousel`
Located at `components/hero-carousel.tsx`. Accepts `currentSlide` and `setCurrentSlide` props (state lifted to the parent). Features:
- 5-second auto-advance interval (cleared on manual interaction via cleanup)
- Directional slide animation via Framer Motion `AnimatePresence`
- Swipe/drag support on mobile (`PanInfo` from Framer Motion)
- Keyboard navigation (`ArrowLeft` / `ArrowRight`)
- Dot pagination indicators

### `JobApplicationForm`
Located at `components/job-application-form.tsx`. Integrated with **EmailJS**. Features:
- Zod schema validation for all fields
- Dynamic role dropdown that updates based on selected area of interest
- Support for custom role input when predefined options don't match
- Country code selector with 9 international codes
- Success state with visual confirmation

### `MagneticButton`
Located at `components/magnetic-button.tsx`. Wraps `shadcn/ui` `Button`. Features:
- Uses `useMagneticHover` hook for cursor-relative spring-physics movement
- Configurable `strength` prop (default `0.3`)
- Shimmer overlay animation on hover

### `ScrollProgress`
Located at `components/scroll-progress.tsx`. Thin bar fixed at the top of the viewport, driven by Framer Motion's `useScroll` + `useSpring` for smooth easing.

### `FloatingLines`
Located at `components/FloatingLines.jsx`. A Three.js `WebGLRenderer` using `OrthographicCamera` and a custom GLSL fragment shader. Supports:
- Three independently configurable wave zones (top, middle, bottom)
- Mouse interaction (`iMouse` uniform)
- Parallax offset
- Configurable line count, spacing, gradient, and animation speed

---

## Custom Hooks

| Hook | File | Purpose |
|---|---|---|
| `useInView` | `hooks/use-in-view.ts` | Intersection Observer wrapper for scroll-triggered state |
| `useMousePosition` | `hooks/use-mouse-position.ts` | Tracks global cursor `x/y` coordinates |
| `useMagneticHover` | `hooks/use-mouse-position.ts` | Returns spring offset from element center for magnetic effect |
| `useIsMobile` | `hooks/use-mobile.tsx` | Returns `true` below the `md` breakpoint (768px) |
| `useReducedMotion` | `hooks/use-reduced-motion.ts` | Returns `true` if `prefers-reduced-motion: reduce` is set |
| `useScrollProgress` | `hooks/use-scroll-progress.ts` | Returns scroll position as a `0–1` normalized value |

---

## Design System

### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `green-primary` | `#10b981` | Primary brand accent — CTAs, highlights, dividers |
| `navy` | `#0f172a` | Primary dark background and text |

Both colors have full Tailwind shade scales (`50–900`).

### Custom Breakpoints

| Name | Width | Use Case |
|---|---|---|
| `xs` | `480px` | Large phones / phablets |
| `3xl` | `1920px` | Full HD monitors and above |

Standard Tailwind breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`) are also in use.

### Typography

| Role | Font |
|---|---|
| Body text | **Inter** (300–900) |
| Headings (`h1`–`h6`) | **Outfit** (300–900), fallback Inter |

### Glassmorphism Utilities

```css
.glass          /* White frosted glass */
.glass-dark     /* Navy frosted glass */
.glass-green    /* Green-tinted frosted glass */
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Bernie-Dramos/hireXelence_portfolio_website.git
cd hireXelence_portfolio_website

# Install dependencies
pnpm install
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Build the production bundle |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint across the project |

---

## Environment Variables

The job application form uses **EmailJS**. To enable email delivery, create a `.env.local` file in the project root and add your EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

> The contact form uses [FormSubmit](https://formsubmit.co/) and requires no configuration — it posts directly to `applyHireXelence@gmail.com`.

---

## Deployment

The project is configured for deployment on **Vercel**:

- A `.vercelignore` file controls which files are excluded from the deployment bundle.
- `next.config.mjs` sets `images.unoptimized: true` for compatibility with static/edge hosting.
- TypeScript build errors are set to non-blocking (`ignoreBuildErrors: true`) to allow rapid iteration.

To deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## Contact

| Channel | Details |
|---|---|
| Phone | +91 90223 74098 |
| Email | applyHireXelence@gmail.com |
| WhatsApp | [Chat on WhatsApp](https://wa.me/919022374098) |

---

*Built with Next.js · Designed for HireXelence · Powered by Funnkar*
