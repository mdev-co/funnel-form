import type {
  Category,
  Currency,
  Feature,
  Manufacturer,
  VatRate,
} from '@/modules/products/model/product';

export type AddProductFormValues = {
  name: string;
  sku: string;
  description: string;
  manufacturer: Manufacturer | '';
  category: Category | '';
  features: Feature[];
  netPrice: number | null;
  grossPrice: number | null;
  vatRate: VatRate;
  currency: Currency;
  available: boolean;
  limited: boolean;
  stock: number | null;
  minCartQuantity: number | null;
  maxCartQuantity: number | null;
};

export type AddProductField = keyof AddProductFormValues;

export const FORM_DEFAULTS: AddProductFormValues = {
  name: '',
  sku: '',
  description: '',
  manufacturer: '',
  category: '',
  features: [],
  netPrice: null,
  grossPrice: null,
  vatRate: 23,
  currency: 'PLN',
  available: true,
  limited: false,
  stock: null,
  minCartQuantity: 1,
  maxCartQuantity: 10,
};
