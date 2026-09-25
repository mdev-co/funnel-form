import { z } from 'zod';
import { addProductSchema } from '@/modules/add-product/schemas/add-product.schema';
import { applyAvailabilityRules } from '@/modules/add-product/schemas/product-availability.schema';

export const productSchema = applyAvailabilityRules(
  z.object({ id: z.string().min(1), ...addProductSchema.shape }),
);

export const productListSchema = z.array(productSchema);
