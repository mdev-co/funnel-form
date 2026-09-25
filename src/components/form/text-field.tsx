import { Input } from '@/components/ui/input';
import { hasFieldError } from '@/lib/form/field-errors';
import { useFieldContext } from '@/lib/form/form-context';
import { FieldFrame } from './field-frame';

type TextFieldProps = {
  readonly label: string;
  readonly placeholder?: string;
};

export const TextField = ({ label, placeholder }: TextFieldProps) => {
  const field = useFieldContext<string>();
  const invalid = hasFieldError(field.state.meta.errors);

  return (
    <FieldFrame name={field.name} label={label} invalid={invalid} errors={field.state.meta.errors}>
      <Input
        id={field.name}
        className="rounded-full"
        placeholder={placeholder}
        value={field.state.value}
        aria-invalid={invalid}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
      />
    </FieldFrame>
  );
};
