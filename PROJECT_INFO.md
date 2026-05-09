# Inde AI Landing Page

Production-ready landing page for Inde AI - AI Intake & Lead Qualification Assistants for Service Businesses.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **Animations**: framer-motion
- **Fonts**: Geist Sans & Geist Mono

## Brand Colors

- Primary Purple: `#635bff`
- Dark Navy Text: `#0f172a`
- Light Lavender: `#f1efff`, `#f5f3ff`
- Border Gray: `#e5e7eb`

## Project Structure

```
inde-ai/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx           # Main landing page
│   └── globals.css        # Global styles + Tailwind config
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── ChatWidget.tsx
│   ├── Navbar.tsx         # Sticky navigation with mobile menu
│   ├── Hero.tsx           # Hero section with chat widget
│   ├── Problem.tsx        # Problem statement section
│   ├── Solution.tsx       # Solution workflow diagram
│   ├── Industries.tsx     # Industry-specific features
│   ├── Pricing.tsx        # Three pricing tiers
│   ├── HowItWorks.tsx     # 4-step process
│   ├── LeadSummary.tsx    # Lead summary visual
│   ├── Guardrails.tsx     # Safety features grid
│   ├── FAQ.tsx            # Accordion FAQ
│   ├── CTA.tsx            # Call-to-action section
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Site footer
└── public/                # Static assets

## Features

✅ Fully responsive (mobile, tablet, desktop)
✅ Smooth scroll navigation
✅ Sticky navbar with scroll shadow
✅ Mobile hamburger menu with slide-in drawer
✅ Subtle entrance animations with framer-motion
✅ Interactive FAQ accordion
✅ Contact form with client-side validation
✅ SEO optimized with metadata
✅ Clean, reusable component architecture
✅ TypeScript for type safety
✅ Premium B2B SaaS design aesthetic

## Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Editing Content

All content is defined within the components, making it easy to update:

- **Navigation links**: `components/Navbar.tsx`
- **Hero content**: `components/Hero.tsx`
- **Pricing plans**: `components/Pricing.tsx`
- **FAQ items**: `components/FAQ.tsx`
- **Contact form fields**: `components/Contact.tsx`
- **Industry features**: `components/Industries.tsx`

## Customization

### Colors

Update brand colors in `app/globals.css` under the `:root` and `@theme inline` sections.

### Typography

The project uses Geist Sans as the primary font. To change fonts, update `app/layout.tsx`.

### Animations

Animation timing and effects are configured in each component using framer-motion. Adjust the `initial`, `animate`, and `transition` props as needed.

## Deployment

This project is ready to deploy to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Next.js

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Notes

- The contact form currently shows a success message client-side only. Connect it to your backend API or email service (like Resend, SendGrid, or Nodemailer) for actual form submissions.
- All sections use semantic HTML and proper heading hierarchy for SEO.
- Images are optimized using Next.js Image component where applicable.
- The chat widget in the hero is a static mockup - not a functional chat interface.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Inde AI. All rights reserved.
