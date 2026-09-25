import { useState } from 'react';
import { useAppForm } from '@/lib/form/form-hook';
import { issuesByField } from '../lib/issues-by-field';
import { FORM_DEFAULTS } from '../model/form-values';
import { FIRST_STEP_INDEX, LAST_STEP_INDEX, stepAt, stepIndexOfFields } from '../model/steps';
import { addProductSchema, type AddProductInput } from '../schemas/add-product.schema';

type UseAddProductFormOptions = {
  readonly onSave: (product: AddProductInput) => void;
};

export type AddProductForm = ReturnType<typeof useAddProductForm>['form'];

export function useAddProductForm({ onSave }: UseAddProductFormOptions) {
  const [stepIndex, setStepIndex] = useState(FIRST_STEP_INDEX);

  const form = useAppForm({
    defaultValues: FORM_DEFAULTS,
    validators: { onSubmit: addProductSchema },
    onSubmit: ({ value }) => {
      onSave(addProductSchema.parse(value));
      reset();
    },
    onSubmitInvalid: ({ value }) => {
      const result = addProductSchema.safeParse(value);
      if (result.success) return;
      const invalidFields = new Set(result.error.issues.map((issue) => String(issue.path[0])));
      const index = stepIndexOfFields(invalidFields);
      if (index !== -1) setStepIndex(index);
    },
  });

  const reset = () => {
    form.reset();
    setStepIndex(FIRST_STEP_INDEX);
  };

  const step = stepAt(stepIndex);

  const goNext = (): boolean => {
    const result = step.schema.safeParse(form.state.values);
    if (!result.success) {
      form.setErrorMap({ onSubmit: { form: undefined, fields: issuesByField(result.error) } });
      return false;
    }
    setStepIndex((index) => Math.min(index + 1, LAST_STEP_INDEX));
    return true;
  };

  const goBack = () => setStepIndex((index) => Math.max(index - 1, FIRST_STEP_INDEX));

  return {
    form,
    step,
    stepIndex,
    isFirstStep: stepIndex === FIRST_STEP_INDEX,
    isLastStep: stepIndex === LAST_STEP_INDEX,
    goNext,
    goBack,
    reset,
  };
}
