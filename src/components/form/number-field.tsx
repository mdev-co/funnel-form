import { Input } from '@/components/ui/input';
import { hasFieldError } from '@/lib/form/field-errors';
import { useFieldContext } from '@/lib/form/form-context';
import { FieldFrame } from './field-frame';

type NumberFieldProps = {
  readonly label: string;
  readonly placeholder?: string;
  readonly step: number;
  readonly min: number;
};

const numberOrNull = (input: HTMLInputElement): number | null =>
  input.value === '' ? null : input.valueAsNumber;

export const NumberField = ({ label, placeholder, step, min }: NumberFieldProps) => {
  const field = useFieldContext<number | null>();
  const invalid = hasFieldError(field.state.meta.errors);

  return (
    <FieldFrame name={field.name} label={label} invalid={invalid} errors={field.state.meta.errors}>
      <Input
        id={field.name}
        type="number"
        inputMode={Number.isInteger(step) ? 'numeric' : 'decimal'}
        step={step}
        min={min}
        className="rounded-full"
        placeholder={placeholder}
        value={field.state.value ?? ''}
        aria-invalid={invalid}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(numberOrNull(event.target))}
      />
    </FieldFrame>
  );
};
