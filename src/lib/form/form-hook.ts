import { createFormHook } from '@tanstack/react-form';
import { CheckboxField } from '@/components/form/checkbox-field';
import { NumberField } from '@/components/form/number-field';
import { SelectField } from '@/components/form/select-field';
import { SwitchField } from '@/components/form/switch-field';
import { TextField } from '@/components/form/text-field';
import { TextareaField } from '@/components/form/textarea-field';
import { ToggleListField } from '@/components/form/toggle-list-field';
import { fieldContext, formContext } from './form-context';

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    NumberField,
    SelectField,
    SwitchField,
    CheckboxField,
    ToggleListField,
  },
  formComponents: {},
});
