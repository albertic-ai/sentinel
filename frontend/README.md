# Sentinel — Frontend

Fleet management dashboard built with Next.js 16.

## Tech Stack

- Next.js 16 (App Router)
- React + TypeScript
- Tailwind CSS v4
- shadcn/ui (base-nova style)
- Lucide React (icons)
- Google Sans Flex (font)
- Light theme only

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Structure

```
frontend/
├── app/
│   ├── auth/                         # Authentication pages
│   │   ├── login/page.tsx            # Sign in
│   │   ├── signup/page.tsx           # Create account
│   │   ├── forgot/page.tsx           # Forgot password
│   │   ├── reset/page.tsx            # Reset password
│   │   ├── verify/page.tsx           # Email verification
│   │   ├── layout.tsx                # Auth layout (header + footer)
│   │   └── page.tsx                  # Redirects to /auth/login
│   ├── console/                      # Console pages
│   │   ├── dashboard/page.tsx        # Fleet overview
│   │   ├── agents/page.tsx           # Agent management
│   │   ├── agents/[agent_name]/page.tsx  # Agent detail
│   │   ├── registry/page.tsx         # Agent Registry browser
│   │   ├── memory/page.tsx           # Memory Explorer
│   │   ├── observability/
│   │   │   ├── logs/page.tsx         # Structured logs
│   │   │   └── traces/page.tsx       # Reasoning traces
│   │   ├── connectors/page.tsx       # Data source connections
│   │   ├── settings/
│   │   │   ├── profile/page.tsx      # Profile settings
│   │   │   ├── organization/page.tsx # Organization settings
│   │   │   ├── security/page.tsx     # Security settings
│   │   │   ├── api-keys/page.tsx     # API key management
│   │   │   ├── notifications/page.tsx # Notification preferences
│   │   │   ├── layout.tsx            # Settings layout + sidebar
│   │   │   └── page.tsx              # Redirects to profile
│   │   ├── help/page.tsx             # Help & getting started
│   │   ├── layout.tsx                # Console layout
│   │   └── page.tsx                  # Redirects to dashboard
│   ├── legal/                        # Legal pages
│   │   ├── terms/page.tsx            # Terms of Service
│   │   ├── privacy/page.tsx          # Privacy Policy
│   │   ├── cookies/page.tsx          # Cookie Policy
│   │   ├── layout.tsx                # Legal layout
│   │   └── page.tsx                  # Redirects to terms
│   ├── globals.css                   # Tailwind + theme
│   ├── layout.tsx                    # Root layout (font, tooltip provider)
│   └── page.tsx                      # Redirects to /auth/login
├── components/
│   ├── app/                          # Shared app components
│   │   ├── app-header.tsx            # Sticky header with logo
│   │   ├── app-footer.tsx            # Footer with legal links
│   │   ├── app-layout.tsx            # Header + main + footer wrapper
│   │   └── index.ts                  # Barrel export
│   ├── console/                      # Console-specific components
│   │   ├── console-header.tsx        # Sticky header + mobile menu
│   │   ├── console-layout.tsx        # Header + sidebar + content
│   │   ├── console-sidebar.tsx       # Desktop sidebar (hidden on mobile)
│   │   ├── settings-sidebar.tsx      # Settings nav (vertical/horizontal)
│   │   └── index.ts                  # Barrel export
│   └── ui/                           # shadcn/ui primitives
│       ├── alert.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       └── tooltip.tsx
├── lib/
│   └── utils.ts                      # cn() utility (clsx + tailwind-merge)
├── public/
│   └── icons/app/
│       ├── dark.png                  # App logo (used in headers)
│       ├── light.png                 # App logo (light variant)
│       └── favicon.png               # Browser favicon
├── components.json                   # shadcn/ui config
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Responsive Design

- **Mobile (< md):** Hamburger menu, slide-out navigation overlay, stacked layouts
- **Tablet (md):** Sidebar visible, responsive grids
- **Desktop (lg+):** Full layout with all sidebars, 4-column dashboard grids

## Routing

- `/` → redirects to `/auth/login`
- `/auth` → redirects to `/auth/login`
- `/legal` → redirects to `/legal/terms`
- `/console` → redirects to `/console/dashboard`
- `/console/settings` → redirects to `/console/settings/profile`
