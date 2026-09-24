import { z } from 'zod';
import { CATEGORIES, FEATURES, MANUFACTURERS } from '@/modules/products/model/product';

const NAME_MIN_LENGTH = 3;
const SKU_MAX_LENGTH = 24;
const SKU_PATTERN = /^[A-Za-z0-9]+$/;
const FEATURES_MIN_COUNT = 1;

export const BASICS_MESSAGES = {
  nameTooShort: `Nazwa musi mieć co najmniej ${NAME_MIN_LENGTH} znaki`,
  skuRequired: 'SKU jest wymagane',
  skuTooLong: `SKU może mieć najwyżej ${SKU_MAX_LENGTH} znaki`,
  skuPattern: 'SKU może zawierać tylko litery i cyfry',
  manufacturerRequired: 'Wybierz producenta',
  categoryRequired: 'Wybierz kategorię',
  featuresRequired: 'Wybierz co najmniej jedną cechę',
};

export const productBasicsSchema = z.object({
  name: z.string().trim().min(NAME_MIN_LENGTH, BASICS_MESSAGES.nameTooShort),
  sku: z
    .string()
    .trim()
    .min(1, BASICS_MESSAGES.skuRequired)
    .max(SKU_MAX_LENGTH, BASICS_MESSAGES.skuTooLong)
    .regex(SKU_PATTERN, BASICS_MESSAGES.skuPattern),
  description: z.string().trim(),
  manufacturer: z.enum(MANUFACTURERS, { error: BASICS_MESSAGES.manufacturerRequired }),
  category: z.enum(CATEGORIES, { error: BASICS_MESSAGES.categoryRequired }),
  features: z.array(z.enum(FEATURES)).min(FEATURES_MIN_COUNT, BASICS_MESSAGES.featuresRequired),
});

export type ProductBasics = z.infer<typeof productBasicsSchema>;
