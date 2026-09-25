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
- [Add product: validation at the form boundary](docs/diagrams/add-product-validation.svg)
- [Add product: one form instance, steps as data, bound fields](docs/diagrams/add-product-form.svg)

### Products table

Five products from the task, five rows per page. The page number lives in the URL (`?page=2`) through
nuqs, so a refresh or a shared link opens the same page; a number past the end falls back to the last
page. Counts use Polish plural forms (`1 produkt`, `2 produkty`, `5 produktów`) via `Intl.PluralRules`.

![Products table](docs/screenshots/products-table.png)

### Add product dialog

One TanStack Form instance holds the values of all three steps, so "Wstecz" keeps what was typed.
"Dalej" validates only the current step with its Zod schema and shows the messages under the fields;
"Zapisz produkt" validates the whole product, appends it to the table and shows a toast. Closing the
dialog (X or Esc) resets it to step one; clicking outside does not close it. Net price, gross price and
VAT rate keep each other in sync. On small screens the dialog is a full-screen sheet.

![Add product dialog, step 1](docs/screenshots/add-product-step-1.png)

## Validation rules

Every rule from the task, where it lives and the test that proves it (`src/modules/add-product`).

| Requirement from the task                                                       | Rule                                                               | Test                                                                                                   |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Name required, at least 3 characters                                            | `name: min(3)`                                                     | rejects a name shorter than three characters                                                           |
| SKU required, letters and digits only, up to 24 characters                      | `sku: min(1) + max(24) + regex`                                    | rejects an SKU with characters other than letters and digits; rejects an SKU longer than 24 characters |
| Description optional                                                            | `description: string`                                              | accepts the data of a product from the design                                                          |
| Manufacturer and category from predefined lists                                 | `z.enum(MANUFACTURERS)`, `z.enum(CATEGORIES)`                      | requires a manufacturer from the list                                                                  |
| At least one feature from the list                                              | `features: array(enum).min(1)`                                     | requires at least one feature                                                                          |
| Net and gross prices are numbers                                                | `number().nonnegative().multipleOf(0.01)`                          | rejects a negative price; rejects a price with more than two decimals                                  |
| VAT rate from the list; gross = net × (1 + VAT / 100)                           | `z.literal(VAT_RATES)`; `lib/price.ts`                             | rejects a VAT rate outside the list; adds VAT to a net price; removes VAT from a gross price           |
| Currency from a predefined list                                                 | `z.enum(CURRENCIES)`                                               | accepts valid prices                                                                                   |
| Availability as a yes / no switch                                               | `available: boolean`                                               | accepts an unlimited product without stock                                                             |
| Stock visible and required only when "limited" is checked, non-negative integer | `stock: int().nonnegative().nullable()` + `applyAvailabilityRules` | requires stock when the product is limited                                                             |
| Min cart quantity not greater than max, integers                                | `int().min(1)` + `applyAvailabilityRules`                          | rejects a minimum cart quantity above the maximum                                                      |

## Language

User-facing copy is Polish, as in the design. Every string lives in a `*_TEXT` constant next to
the component that renders it, so a translation layer (for example `next-intl`) could replace those
constants later without touching the components. Code, commits and docs are English.

## Design decisions

Architecture decision records live in [`docs/adr`](docs/adr). Start with
[0001](docs/adr/0001-shadcn-theme-over-component-forks.md): how the Figma design is matched
through the shadcn/ui theme instead of forked components, and which 2 px deviations are accepted.
[0003](docs/adr/0003-one-form-instance-and-bound-fields.md) explains why the wizard is one form
instance with steps as data and why fields are bound components.

© 2026 majk-develop. All rights reserved. Published for review purposes only.
