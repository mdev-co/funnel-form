import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';
import { useFieldContext } from '@/lib/form/form-context';

type CheckboxFieldProps = {
  readonly label: string;
};

export const CheckboxField = ({ label }: CheckboxFieldProps) => {
  const field = useFieldContext<boolean>();

  return (
    <Field orientation="horizontal">
      <Checkbox
        id={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
    </Field>
  );
};
