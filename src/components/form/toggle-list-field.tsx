import { Toggle } from '@/components/ui/toggle';
import { hasFieldError } from '@/lib/form/field-errors';
import { useFieldContext } from '@/lib/form/form-context';
import { FieldFrame } from './field-frame';

type ToggleListFieldProps<T extends string> = {
  readonly label: string;
  readonly options: readonly T[];
  readonly className?: string;
};

const TOGGLE_CLASS =
  'bg-background text-muted-foreground data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary h-6 rounded-full border px-2 text-sm font-normal';

export const ToggleListField = <T extends string>({
  label,
  options,
  className,
}: ToggleListFieldProps<T>) => {
  const field = useFieldContext<T[]>();
  const invalid = hasFieldError(field.state.meta.errors);

  const toggle = (option: T, pressed: boolean) =>
    field.handleChange(
      pressed
        ? [...field.state.value, option]
        : field.state.value.filter((item) => item !== option),
    );

  return (
    <FieldFrame
      name={field.name}
      label={label}
      invalid={invalid}
      errors={field.state.meta.errors}
      className={className}
    >
      <div id={field.name} role="group" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Toggle
            key={option}
            size="sm"
            pressed={field.state.value.includes(option)}
            onPressedChange={(pressed) => toggle(option, pressed)}
            className={TOGGLE_CLASS}
          >
            {option}
          </Toggle>
        ))}
      </div>
    </FieldFrame>
  );
};
