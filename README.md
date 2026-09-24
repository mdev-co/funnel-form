# Funnel form

Three-step "add product" form inside a dialog, backed by a paginated product table.
Built as a recruitment assignment.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui,
TanStack Form, Zod, nuqs.

## Run

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Scripts

| Command      | What it does                  |
| ------------ | ----------------------------- |
| `pnpm check` | typecheck, lint, format check |
| `pnpm test`  | unit tests (Vitest)           |
| `pnpm build` | production build              |

## How it works

Data flow diagrams live in [`docs/diagrams`](docs/diagrams) (`.d2` sources rendered to SVG):

- [Products table: page number in the URL](docs/diagrams/products-table.svg)

## Language

User-facing copy is Polish, as in the design. Every string lives in a `*_TEXT` constant next to
the component that renders it, so a translation layer (for example `next-intl`) could replace those
constants later without touching the components. Code, commits and docs are English.

## Design decisions

Architecture decision records live in [`docs/adr`](docs/adr). Start with
[0001](docs/adr/0001-shadcn-theme-over-component-forks.md): how the Figma design is matched
through the shadcn/ui theme instead of forked components, and which 2 px deviations are accepted.

© 2026 majk-develop. All rights reserved. Published for review purposes only.
