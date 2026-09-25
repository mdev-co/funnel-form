import { z } from 'zod';

export const QUANTITY_MIN = 1;

export const AVAILABILITY_MESSAGES = {
  stockRequired: 'Podaj ilość na magazynie',
  stockNegative: 'Ilość nie może być ujemna',
  stockInteger: 'Ilość musi być liczbą całkowitą',
  quantityRequired: 'Podaj ilość',
  quantityInteger: 'Ilość musi być liczbą całkowitą',
  quantityTooSmall: `Ilość musi wynosić co najmniej ${QUANTITY_MIN}`,
  minAboveMax: 'Minimalna ilość nie może być większa niż maksymalna',
};

const availabilityShape = {
  available: z.boolean(),
  limited: z.boolean(),
  stock: z
    .number({ error: AVAILABILITY_MESSAGES.stockRequired })
    .int(AVAILABILITY_MESSAGES.stockInteger)
    .nonnegative(AVAILABILITY_MESSAGES.stockNegative)
    .nullable(),
  minCartQuantity: z
    .number({ error: AVAILABILITY_MESSAGES.quantityRequired })
    .int(AVAILABILITY_MESSAGES.quantityInteger)
    .min(QUANTITY_MIN, AVAILABILITY_MESSAGES.quantityTooSmall),
  maxCartQuantity: z
    .number({ error: AVAILABILITY_MESSAGES.quantityRequired })
    .int(AVAILABILITY_MESSAGES.quantityInteger)
    .min(QUANTITY_MIN, AVAILABILITY_MESSAGES.quantityTooSmall),
};

type AvailabilityFields = z.infer<z.ZodObject<typeof availabilityShape>>;

type AvailabilityRuleFields = Pick<
  AvailabilityFields,
  'limited' | 'stock' | 'minCartQuantity' | 'maxCartQuantity'
>;

const stockGivenWhenLimited = (fields: AvailabilityRuleFields) =>
  !fields.limited || fields.stock !== null;

const minNotAboveMax = (fields: AvailabilityRuleFields) =>
  fields.minCartQuantity <= fields.maxCartQuantity;

export const applyAvailabilityRules = <S extends z.ZodType<AvailabilityRuleFields>>(schema: S): S =>
  schema
    .refine(stockGivenWhenLimited, { error: AVAILABILITY_MESSAGES.stockRequired, path: ['stock'] })
    .refine(minNotAboveMax, {
      error: AVAILABILITY_MESSAGES.minAboveMax,
      path: ['minCartQuantity'],
    });

export const productAvailabilitySchema = applyAvailabilityRules(z.object(availabilityShape));

export type ProductAvailability = z.infer<typeof productAvailabilitySchema>;
