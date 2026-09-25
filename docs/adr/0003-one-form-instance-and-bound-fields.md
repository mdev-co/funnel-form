# 0003. One form instance for the wizard, bound components for the fields

Date: 2026-09-25. Status: accepted.

## Context

The add-product dialog has three steps and fifteen fields. The task requires that "Dalej"
moves on only when the current step is valid, that "Wstecz" keeps the entered values, that
the dialog resets on close, that errors are readable under the fields and that shadcn/ui is
used consistently. Two questions decide the shape of the code: where the values live while
the user moves between steps, and how to avoid repeating the label, control and error block
for every field.

## Decision

1. One TanStack Form instance (`useAddProductForm`) owns the values of every step. A step
   index in React state decides which step component renders. Steps are data (`STEPS`: id,
   title, description, Zod schema). "Dalej" runs the current step's schema with `safeParse`
   and writes the issues into the form's error map under the `onSubmit` key, so the step
   advances only when it is valid and a message disappears as soon as the field becomes
   valid. Submit runs the full schema, including the cross-field rules, and parses the
   working values into `AddProductInput`.
2. The working values have their own type (`AddProductFormValues`): an empty number input is
   `null`, an unselected option is `''`. Zod runs only at the boundary (step check and save),
   never inside the application.
3. Fields are bound components built with TanStack's form composition (`createFormHook`,
   `useFieldContext`): `TextField`, `NumberField`, `SelectField` and the others read their
   field from context and render label, control and error through one `FieldFrame`. A step
   declares a field in one line and the error markup exists once. The context and the hook
   live in two files (`form-context.ts`, `form-hook.ts`) because the hook imports the field
   components and the components import the context.

## Consequences

- Adding a step means one entry in `STEPS`, one schema and one component.
- Errors set by "Dalej" appear only on mounted fields, which is exactly the current step.
  Tests render a field to observe them.
- `useFieldContext<T>()` is a declaration, not a check: nothing stops a `CheckboxField` from
  being bound under a string field at compile time. The schema rejects the value at "Dalej"
  and on save, and the pairing is reviewed where the field is declared.
- A form generated from a configuration array was rejected: the steps differ in layout (two
  columns, separators, a stock field that depends on a checkbox), and explicit JSX per step
  reads better than layout flags in data.
- react-hook-form would give the same result through `Controller`; TanStack Form is a
  requirement of the task.
