# Nexdiv — Digital Agency Website

Future-ready, mobile-responsive website for **Nexdiv** — a digital agency
offering websites, e-commerce, AI agents, AI tools, SaaS products,
browser extensions and digital marketing.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with custom blue + neon-green futuristic theme
- **Framer Motion** for smooth, futuristic animations
- **lucide-react** icons
- API routes (Next.js Route Handlers) for contact + payment submission

## Pages

| Route        | Description                                              |
| ------------ | -------------------------------------------------------- |
| `/`          | Home — hero video, animated cards, services preview     |
| `/services`  | All services with details + per-service order CTA       |
| `/tools`     | AI agents, SaaS, browser extensions with demo links     |
| `/packages`  | All packages, grouped by category                        |
| `/about`     | About Nexdiv, mission, story, values                    |
| `/team`      | Team members                                             |
| `/contact`   | Contact form + contact info                              |
| `/payment`   | bKash / Nagad / Rocket / Bank — manual TrxID submission |

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Data

All content (services, tools, packages, team) currently lives in
`src/data/*.ts`. Phase 2 will move this to a database (Postgres + Prisma)
controlled by an admin panel, where every detail (name, logo, color,
notice, packages, prices, content, hero video) can be edited via UI.

## Phase 2 — Admin panel (planned)

- Login (NextAuth.js)
- Site name, logo, color theme, favicon — change anytime
- Notice / announcement bar editor
- Service / Package / Tool / Team CRUD
- Order management + payment verification
- Contact inbox
- Hero video / image upload
- Footer + contact info edit
