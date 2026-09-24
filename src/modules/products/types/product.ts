export const CATEGORIES = ['Komputery', 'Telefony', 'RTV', 'AGD', 'Akcesoria'] as const;
export const MANUFACTURERS = ['Apple', 'Samsung', 'Sony', 'Bosch', 'Xiaomi'] as const;
export const FEATURES = [
  'Bluetooth',
  'WiFi',
  'USB-C',
  'Wodoodporny',
  'Bezprzewodowy',
  'Ekologiczny',
  'Premium',
] as const;
export const VAT_RATES = [0, 5, 8, 23] as const;
export const CURRENCIES = ['PLN', 'EUR', 'USD'] as const;

export type Category = (typeof CATEGORIES)[number];
export type Manufacturer = (typeof MANUFACTURERS)[number];
export type Feature = (typeof FEATURES)[number];
export type VatRate = (typeof VAT_RATES)[number];
export type Currency = (typeof CURRENCIES)[number];

export type Product = {
  readonly id: string;
  readonly name: string;
  readonly sku: string;
  readonly description: string;
  readonly manufacturer: Manufacturer;
  readonly category: Category;
  readonly features: readonly Feature[];
  readonly netPrice: number;
  readonly grossPrice: number;
  readonly vatRate: VatRate;
  readonly currency: Currency;
  readonly available: boolean;
  readonly limited: boolean;
  readonly stock: number | null;
  readonly minCartQuantity: number;
  readonly maxCartQuantity: number;
};
