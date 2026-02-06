# CLAUDE.md

This file provides guidance for Claude Code when working in this repository.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Type-check and build (astro check + astro build)
npm run preview  # Preview production build locally
```

## Architecture

**Astro + React hybrid**: Static pages use `.astro` files, interactive components use `.tsx` with React.

- **React hydration**: Use `client:load` directive on React components in Astro templates
- **Content Collections**: Blog posts and projects in `/src/content/` using MDX with Zod schemas
- **Styling**: Tailwind CSS with shadcn/ui components, dark mode via `class` strategy
- **Static output**: Site generates static HTML (configured in `astro.config.mjs`)

### Path Aliases

- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`

## Component Conventions

**Astro components** (`.astro`): Static content - Header, Footer, Hero, BlogPostCard, SkillBadge, layouts

**React components** (`.tsx`): Interactive features - ContactForm, ThemeToggle, ProjectCard

**UI components** (`/src/components/ui/`): shadcn-style primitives using Radix - button, card, input, label, textarea, badge

## Content Management

### Blog Posts
Location: `/src/content/blog/*.mdx`

Frontmatter schema:
- `title`: string (required)
- `date`: date (required)
- `tags`: string[] (required)
- `excerpt`: string (required)
- `draft`: boolean (default: false)

### Projects
Location: `/src/content/projects/*.mdx`

Frontmatter schema:
- `title`: string (required)
- `description`: string (required)
- `tech`: string[] (required)
- `github`: URL (optional)
- `demo`: URL (optional)
- `image`: string (optional)
- `featured`: boolean (default: false)
- `order`: number (default: 0)

Schema definitions: `/src/content/config.ts`

## Deployment

- **Docker**: Multi-stage build (node:20-alpine → nginx:alpine)
- **K8s**: Traefik IngressRoute for malashikh.in with HTTPS redirect and compression
- **Health endpoint**: `/health` returns 200 OK
