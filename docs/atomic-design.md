# Atomic Design Architecture

This storefront follows [Brad Frost’s Atomic Design](https://atomicdesign.bradfrost.com/) adapted for a Vite + React SPA.

## Layers

```
src/
  app/                 # Bootstrap: providers, router, global styles
  components/
    atoms/             # Smallest UI primitives (Button, Input, Label, …)
    molecules/         # Simple combinations (BookCard, Search controls, …)
    organisms/         # Complex sections (Header, CartPanel, Admin panels, …)
    templates/         # Page layouts without route data (Storefront/Panel/Admin)
    pages/             # Route screens: templates + organisms + data hooks
  lib/                 # Non-UI: API client, domain hooks, i18n, config, utils
```

## Dependency rule (strict)

```
atoms ← molecules ← organisms ← templates ← pages
```

- A layer may import from the same layer or **lower** UI layers only.
- Lower layers must **not** import from higher layers
  (e.g. atoms must not import molecules/organisms/pages).
- `app/` may compose templates, organisms, and pages (router wiring).
- Any layer may import from `lib/` (non-UI). Atoms should only need `lib/utils` (e.g. `cn`).

## Where API & hooks live

Domain data access is **not** placed inside atoms/molecules:

| Concern                                   | Location                                                  |
| ----------------------------------------- | --------------------------------------------------------- |
| HTTP client, `ApiError`                   | `lib/api/`                                                |
| Env, themes                               | `lib/config/`                                             |
| i18n bootstrap                            | `lib/i18n/`                                               |
| Cross-cutting hooks (`usePreferences`, …) | `lib/hooks/`                                              |
| `cn`, formatters                          | `lib/utils/`                                              |
| Auth store                                | `lib/auth/`                                               |
| Books, cart, orders, reviews, …           | `lib/<domain>/` (API modules + React Query hooks + types) |

Organisms and pages **consume** those hooks; they do not embed raw `fetch` for domain APIs.

## Public exports

Each of `components/{atoms,molecules,organisms,templates}` and each `lib/<domain>` exposes an `index.ts` barrel. Prefer:

```ts
import { Button } from '@/components/atoms';
import { BookCard } from '@/components/molecules';
import { Header } from '@/components/organisms';
import { useBooksQuery } from '@/lib/book';
```

## Enforcement

```bash
pnpm check:architecture
```

Fails on upward UI imports and leftover FSD paths (`entities/`, `features/`, `widgets/`, top-level `pages/`, `shared/`).

## Path aliases

- `@/*` → `src/*` (Vite + TypeScript)
- Prefer `@/components/*`, `@/lib/*`, `@/app/*`
