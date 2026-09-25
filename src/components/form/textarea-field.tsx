import { Textarea } from '@/components/ui/textarea';
import { hasFieldError } from '@/lib/form/field-errors';
import { useFieldContext } from '@/lib/form/form-context';
import { FieldFrame } from './field-frame';

type TextareaFieldProps = {
  readonly label: string;
  readonly placeholder?: string;
  readonly className?: string;
};

export const TextareaField = ({ label, placeholder, className }: TextareaFieldProps) => {
  const field = useFieldContext<string>();
  const invalid = hasFieldError(field.state.meta.errors);

  return (
    <FieldFrame
      name={field.name}
      label={label}
      invalid={invalid}
      errors={field.state.meta.errors}
      className={className}
    >
      <Textarea
        id={field.name}
        className="min-h-16 rounded-lg"
        placeholder={placeholder}
        value={field.state.value}
        aria-invalid={invalid}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
      />
    </FieldFrame>
  );
};
