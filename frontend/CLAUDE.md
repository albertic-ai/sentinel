# Sentinel Frontend — AI Context

Next.js 16 dashboard for fleet management.

## Conventions

- App Router with layouts and nested routes
- `@/*` path alias maps to project root
- `LayoutProps<"/route">` for layout typing (full path string)
- `redirect()` from `next/navigation` for route redirects
- Skeleton loading states (no mock data)
- Light theme only
- Google Sans Flex font loaded via `<link>` in root layout
- Responsive: mobile hamburger menu, tablet sidebar, desktop full layout

## Components

- `components/app/` — Shared (AppHeader, AppFooter, AppLayout)
- `components/console/` — Console-specific (ConsoleHeader, ConsoleSidebar, SettingsSidebar)
- `components/ui/` — shadcn/ui primitives (do not edit manually)

## Commands

```bash
npm install
npm run dev       # localhost:3000
npm run build
npm run lint
```
