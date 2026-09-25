import type { z } from 'zod';
import { productAvailabilitySchema } from '../schemas/product-availability.schema';
import { productBasicsSchema } from '../schemas/product-basics.schema';
import { productPricingSchema } from '../schemas/product-pricing.schema';
import type { AddProductField } from './form-values';

export type StepId = 'basics' | 'pricing' | 'availability';

export type FormStep = {
  readonly id: StepId;
  readonly title: string;
  readonly description: string;
  readonly fields: readonly AddProductField[];
  readonly schema: z.ZodType;
};

export const STEPS: readonly FormStep[] = [
  {
    id: 'basics',
    title: 'Informacje',
    description: 'Dane podstawowe',
    fields: ['name', 'sku', 'description', 'manufacturer', 'category', 'features'],
    schema: productBasicsSchema,
  },
  {
    id: 'pricing',
    title: 'Cena',
    description: 'Dane cenowe',
    fields: ['netPrice', 'grossPrice', 'vatRate', 'currency'],
    schema: productPricingSchema,
  },
  {
    id: 'availability',
    title: 'Dostępność',
    description: 'Stany magazynowe',
    fields: ['available', 'limited', 'stock', 'minCartQuantity', 'maxCartQuantity'],
    schema: productAvailabilitySchema,
  },
];

export const FIRST_STEP_INDEX = 0;
export const LAST_STEP_INDEX = STEPS.length - 1;

export const stepAt = (index: number): FormStep => {
  const step = STEPS[index];
  if (!step) {
    throw new Error(`No form step at index ${index}`);
  }
  return step;
};
