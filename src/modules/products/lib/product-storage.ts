import type { Product } from '../model/product';
import { productListSchema } from '../schemas/product.schema';

export const PRODUCTS_STORAGE_KEY = 'funnel-form.products';

const parseJson = (raw: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const parseStoredProducts = (raw: string | null): readonly Product[] | null => {
  if (raw === null) return null;
  const result = productListSchema.safeParse(parseJson(raw));
  return result.success ? result.data : null;
};

export const serializeProducts = (products: readonly Product[]): string => JSON.stringify(products);
