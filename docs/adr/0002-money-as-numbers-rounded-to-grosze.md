# 0002. Prices are JavaScript numbers rounded to grosze, not a money type

Date: 2026-09-25. Status: accepted.

## Context

Step 2 of the form links three fields: net price, gross price and VAT rate
(`gross = net × (1 + VAT / 100)`, editing one field recalculates the other). JavaScript
numbers are IEEE 754 doubles, so `0.1 + 0.2` is `0.30000000000000004` and
`Math.round(1.005 * 100)` is `100`, because `1.005` is stored slightly below its
decimal value. The task has no backend, no discounts and no currency conversion; amounts
are entered with two decimals and stay in the browser.

## Decision

- Prices travel through the form as numbers. `lib/price.ts` owns the arithmetic:
  `grossFromNet`, `netFromGross` and `roundMoney`, which rounds to two decimals after
  adding `Number.EPSILON` to cancel the representation error of values such as `1.005`.
- The Zod schema rejects inputs with more than two decimals (`multipleOf(0.01)`), so
  rounding only ever happens on values the helpers computed, never on user input.
- The helpers are the only place that multiplies or divides prices; components call them
  and never do arithmetic on their own.

## Consequences

- Correct for the amounts and operations in this task (unit tests cover `1.005`,
  `2.675` and the round trip `9999 / 1.23 → 8129.27 → 9999`).
- Not a money type: a product that adds discounts, currency conversion or totals over
  many lines should store amounts as integers in the smallest unit (grosze) or use a
  decimal library, with an explicit rounding rule per operation. Keeping all arithmetic in
  `lib/price.ts` makes that swap a one-file change.
