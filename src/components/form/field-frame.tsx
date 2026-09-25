import type { ReactNode } from 'react';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { toFieldErrors } from '@/lib/form/field-errors';

type FieldFrameProps = {
  readonly name: string;
  readonly label: string;
  readonly invalid: boolean;
  readonly errors: readonly unknown[];
  readonly className?: string;
  readonly children: ReactNode;
};

export const FieldFrame = ({
  name,
  label,
  invalid,
  errors,
  className,
  children,
}: FieldFrameProps) => (
  <Field className={className} data-invalid={invalid || undefined}>
    <FieldLabel htmlFor={name}>{label}</FieldLabel>
    {children}
    <FieldError errors={toFieldErrors(errors)} />
  </Field>
);
