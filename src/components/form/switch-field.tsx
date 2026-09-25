import { Field, FieldLabel } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { useFieldContext } from '@/lib/form/form-context';

type SwitchFieldProps = {
  readonly label: string;
};

export const SwitchField = ({ label }: SwitchFieldProps) => {
  const field = useFieldContext<boolean>();

  return (
    <Field orientation="horizontal">
      <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
    </Field>
  );
};
