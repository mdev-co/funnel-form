import { pluralize } from '@/lib/plural';

const PRODUCT_FORMS = { one: 'produkt', few: 'produkty', many: 'produktów' };

export const formatProductCount = (count: number): string => pluralize(count, PRODUCT_FORMS);
