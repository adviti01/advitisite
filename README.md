# Adviti Consulting — Marketing Website

Production-ready marketing site for **Adviti Consulting Private Limited** (adviti.in).

Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|---|---|
| `/` | Home — hero, narrative, presence grid |
| `/blog` | Insights — 12-article editorial grid |
| `/contact` | Mandate submission form |
| `/privacy-terms` | Privacy, Engagement Terms & Grievance Redressal |

## Project Structure

```
app/
  layout.tsx              # Root layout — Header, Footer, CookieBanner
  page.tsx                # Home
  blog/page.tsx           # Blog index
  contact/page.tsx        # Contact form (Client Component)
  privacy-terms/page.tsx  # Legal compliance page
components/
  Header.tsx              # Fixed nav with scroll blur
  Footer.tsx              # Corporate footer
  CookieBanner.tsx        # Cookie consent banner (Client Component)
lib/
  posts.ts                # Typed article data (12 posts)
```

## Production Build

```bash
npm run build
npm start
```
