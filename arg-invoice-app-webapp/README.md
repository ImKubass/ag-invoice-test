# Invoice App

Training project — web application for creating, managing, and tracking invoices. Built as part of a developer training program. The full specification (entities, use cases, functions) is located in the [backend repository](https://github.com/argo22com/arg-invoice-app-backend/tree/main/docs).

## Tech Stack

- **React 19**, **Vite** — UI framework & build tool
- **TanStack Router** — file-based routing with code splitting
- **TanStack Query** — server state & caching
- **GraphQL** with generated typed SDK (`@graphql-codegen`)
- **React Hook Form** + **Zod** — forms & validation
- **Tailwind CSS** — styling with custom design tokens
- **Biome** — linting & formatting
- **Storybook** — component docs & visual testing
- **Vitest** — unit testing

## Project Structure

```
src/
├── api/                  # GraphQL client, fetcher, queries, mutations, generated SDK
├── components/
│   ├── app-ui/           # App-aware components (e.g. RouterButton)
│   └── basic-ui/         # Reusable UI primitives (Button, TextField, Icon, Card)
├── layouts/              # App shell (sidebar, drawer, content area)
├── modules/
│   ├── auth/             # Auth token store, user schemas
│   └── invoice/
│       ├── components/   # Invoice UI (InvoiceRow, InvoiceStatus, InvoiceFilter)
│       └── forms/        # Invoice form + create/edit wrappers, schema
├── routes/
│   ├── _public/          # Login, Register (redirects authenticated users)
│   └── app/              # Protected routes: invoice list, invoice detail
└── utils/                # Shared utilities (config)
```

## Getting Started

```bash
corepack install
pnpm install
cp .env.example .env
pnpm run dev
```

## Scripts

| Script      | Description                                    |
| ----------- | ---------------------------------------------- |
| `dev`       | Start dev server                               |
| `build`     | Production build                               |
| `storybook` | Start Storybook                                |
| `codegen`   | Fetch GraphQL schema & generate types          |
| `check-all` | Run type checker, linter, formatter, and tests |

## Implemented Features

- User registration and login (email + password)
- Logout with cross-tab session clearing
- Invoice CRUD (create, view, edit, delete)
- Mark invoice as paid
- Invoice status filter (all / pending / paid) with URL-persisted state
- Responsive layout with sidebar and slide-out drawer for forms
- Form validation with Zod schemas
- Accessible UI (semantic HTML, ARIA attributes, keyboard navigation)

## TODO / Improvements

### UX & Robustness

- [ ] Handle loading states (spinners / skeletons for data fetching)
- [ ] Disable form and submit button during mutation (prevent double submit)
- [ ] Reflect API errors to the user (toast / inline messages) — after backend implements error types
- [ ] Add optimistic updates for mark-as-paid and delete actions
- [ ] Replace `window.confirm` with a proper confirmation modal component
- [ ] Handle network errors and offline state gracefully
- [ ] Make content behind the create/edit invoice forms not tab focusable

### Features (from spec, not yet implemented)

- [ ] Preserve previously applied filters when navigating back to the invoice list (FN0004)
- [ ] Password recovery (UC0004)
- [ ] Dark mode / theme switching (FN0007)
- [ ] Payment terms selection (1 / 7 / 14 / 30 days) with automatic due date calculation (FN0003)
- [ ] Pagination for invoice list (FN0005)
- [ ] Currency selection per invoice (TODO0005)
- [ ] Client catalog — reusable client records (TODO0004)
- [ ] Payment method field (TODO0003)
- [ ] Draft invoice state (TODO0007)
- [ ] Overdue invoice detection (TODO0008)
- [ ] Tax / VAT support (TODO0009)
- [ ] Soft delete for invoices (TODO0006)

### Code Quality

- [ ] Store auth token securely (current localStorage approach is vulnerable to XSS)
- [ ] Convert API prices (halers → crowns) at the API boundary layer
- [ ] Extract shared form-to-API field mapper (reduce duplication between create/edit forms)
- [ ] Add error boundaries for route-level error handling
- [ ] Restrict invoice editing when status is PAID (enforce in form UI)

### Bundle
- [ ] Analyze and optimize bundle size
