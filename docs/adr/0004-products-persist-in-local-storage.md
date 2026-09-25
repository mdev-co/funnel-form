# 0004. The product list persists in localStorage, validated on read

Date: 2026-09-25. Status: accepted.

## Context

The task has no backend: the table starts from five mock products and "Zapisz produkt" appends
to a list in the browser. The page number lives in the URL, so a reviewer will reload the page
or type `?page=2` into the address bar. A list kept only in React state is gone after every
full document load, which reads like a bug even though the task never asks for persistence.

## Decision

- The list lives in `localStorage` under one key (`funnel-form.products`). It is read through
  `useSyncExternalStore` (`products/lib/product-store.ts`), which gives the mock products as
  the server snapshot and the stored list on the client, so there is no state update inside
  an effect and no hydration mismatch. Saving a product writes the whole list back and
  notifies subscribers.
- `localStorage` is data from outside the application, so it is parsed with a Zod schema
  (`productListSchema`: the add-product rules plus `id`). Corrupted JSON or a list that does
  not match the schema falls back to the mock products instead of crashing the table.
- Nothing is removed or edited, because the task defines only "add"; the store exposes one
  write operation.

## Consequences

- The list is per browser and per device and is not shared; clearing site data resets it.
- `localStorage` is synchronous and limited to a few megabytes, which is fine for a demo
  list and wrong for anything larger.
- In production the list would live in a database behind an API (a local one such as SQLite
  or Postgres through an ORM, or a hosted one), read and mutated through a data layer such as
  TanStack Query with optimistic updates, and the browser would keep at most UI preferences.
  The boundary would move from `localStorage` to the HTTP response, still validated with the
  same product schema.
