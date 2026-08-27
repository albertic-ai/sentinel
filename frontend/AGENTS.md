<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Sentinel Frontend — Agent Rules

## Rules

- Use TypeScript for all new code
- Follow existing patterns and conventions
- Use `@/*` import alias
- Components in PascalCase, files in kebab-case for non-components
- No mock data — use Skeleton components for loading states
- Light theme only
- Responsive: mobile-first, then tablet and desktop breakpoints
- Run `npm run lint` before committing

## Structure

- Pages: `app/` (App Router)
- Shared components: `components/app/`
- Console components: `components/console/`
- UI primitives: `components/ui/` (shadcn — do not edit manually)
- Utilities: `lib/`
