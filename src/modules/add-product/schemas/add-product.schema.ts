import { z } from 'zod';
import { applyAvailabilityRules, productAvailabilitySchema } from './product-availability.schema';
import { productBasicsSchema } from './product-basics.schema';
import { productPricingSchema } from './product-pricing.schema';

export const addProductSchema = applyAvailabilityRules(
  z.object({
    ...productBasicsSchema.shape,
    ...productPricingSchema.shape,
    ...productAvailabilitySchema.shape,
  }),
);

export type AddProductInput = z.infer<typeof addProductSchema>;
