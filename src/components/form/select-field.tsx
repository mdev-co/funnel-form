import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { hasFieldError } from '@/lib/form/field-errors';
import { useFieldContext } from '@/lib/form/form-context';
import { FieldFrame } from './field-frame';

type SelectFieldProps<T extends string | number> = {
  readonly label: string;
  readonly placeholder?: string;
  readonly options: readonly T[];
  readonly formatOption?: (option: T) => string;
};

export const SelectField = <T extends string | number>({
  label,
  placeholder,
  options,
  formatOption = String,
}: SelectFieldProps<T>) => {
  const field = useFieldContext<T | ''>();
  const invalid = hasFieldError(field.state.meta.errors);

  const selectOption = (value: string) => {
    const option = options.find((item) => String(item) === value);
    if (option !== undefined) field.handleChange(option);
  };

  return (
    <FieldFrame name={field.name} label={label} invalid={invalid} errors={field.state.meta.errors}>
      <Select value={String(field.state.value)} onValueChange={selectOption}>
        <SelectTrigger id={field.name} className="w-full rounded-full" aria-invalid={invalid}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {formatOption(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldFrame>
  );
};
