# DSW - Enterprise AI Operating System

Corporate website for **Data Science Wizards (DSW)**, showcasing their Enterprise AI Operating System platform.

**Live Site:** [datasciencewizards.ai](https://www.datasciencewizards.ai/)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP + ScrollTrigger
- **Smooth Scroll:** Lenis
- **CMS:** WordPress (Headless) + WPGraphQL
- **Forms:** React Hook Form + Zod
- **Email:** Resend

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Create a `.env.local` file with:

```env
WORDPRESS_GRAPHQL_ENDPOINT=https://your-wp-site.com/graphql
RESEND_API_KEY=your_resend_api_key
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `ANALYZE=true npm run build` | Analyze bundle size |

## Project Structure

```
app/                  # Next.js pages (App Router)
components/           # React components
├── Layout/           # Header, Footer, Layout
├── Homepage/         # Homepage sections
├── Animations/       # GSAP animation utilities
├── ui/               # shadcn/ui components
└── Svg/              # SVG icon components
data/                 # GraphQL queries
lib/                  # Utilities & configs
public/               # Static assets
```

## Typography Classes

| Class | Usage |
|-------|-------|
| `text-110` | Hero headings |
| `text-76` | Section headings |
| `text-56` | Subheadings |
| `text-44` | Card titles |
| `text-32` | Large body |
| `text-24` | Body text |
| `text-22` | Buttons |
| `text-20` | Small text |

## Documentation

For detailed documentation, see:
- **[HANDOVER.md](./HANDOVER.md)** - Comprehensive developer guide
- **[CLAUDE.md](./CLAUDE.md)** - AI assistant instructions

## Deployment

Deployed on **Vercel**. Pushes to `master` trigger automatic deployments.
