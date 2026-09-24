import { describe, expect, it } from 'vitest';
import { addProductSchema } from '../add-product.schema';
import { AVAILABILITY_MESSAGES, productAvailabilitySchema } from '../product-availability.schema';
import { BASICS_MESSAGES, productBasicsSchema } from '../product-basics.schema';
import { PRICING_MESSAGES, productPricingSchema } from '../product-pricing.schema';

const validBasics = {
  name: 'MacBook Pro 14"',
  sku: 'MBP14M3PRO',
  description: '',
  manufacturer: 'Apple',
  category: 'Komputery',
  features: ['WiFi'],
};

const validPricing = { netPrice: 8129.27, grossPrice: 9999, vatRate: 23, currency: 'PLN' };

const validAvailability = {
  available: true,
  limited: false,
  stock: null,
  minCartQuantity: 1,
  maxCartQuantity: 10,
};

const firstIssue = (result: {
  success: boolean;
  error?: { issues: { path: PropertyKey[]; message: string }[] };
}) =>
  result.success
    ? null
    : { path: result.error?.issues[0]?.path.join('.'), message: result.error?.issues[0]?.message };

describe('productBasicsSchema', () => {
  it('accepts the data of a product from the design', () => {
    expect(productBasicsSchema.safeParse(validBasics).success).toBe(true);
  });

  it('rejects a name shorter than three characters', () => {
    expect(firstIssue(productBasicsSchema.safeParse({ ...validBasics, name: 'Ab' }))).toEqual({
      path: 'name',
      message: BASICS_MESSAGES.nameTooShort,
    });
  });

  it('rejects an SKU with characters other than letters and digits', () => {
    expect(firstIssue(productBasicsSchema.safeParse({ ...validBasics, sku: 'MBP-14' }))).toEqual({
      path: 'sku',
      message: BASICS_MESSAGES.skuPattern,
    });
  });

  it('rejects an SKU longer than 24 characters', () => {
    const sku = 'A'.repeat(25);
    expect(firstIssue(productBasicsSchema.safeParse({ ...validBasics, sku }))?.message).toBe(
      BASICS_MESSAGES.skuTooLong,
    );
  });

  it('requires a manufacturer from the list', () => {
    expect(firstIssue(productBasicsSchema.safeParse({ ...validBasics, manufacturer: '' }))).toEqual(
      {
        path: 'manufacturer',
        message: BASICS_MESSAGES.manufacturerRequired,
      },
    );
  });

  it('requires at least one feature', () => {
    expect(firstIssue(productBasicsSchema.safeParse({ ...validBasics, features: [] }))).toEqual({
      path: 'features',
      message: BASICS_MESSAGES.featuresRequired,
    });
  });
});

describe('productPricingSchema', () => {
  it('accepts valid prices', () => {
    expect(productPricingSchema.safeParse(validPricing).success).toBe(true);
  });

  it('rejects a negative price', () => {
    expect(firstIssue(productPricingSchema.safeParse({ ...validPricing, netPrice: -1 }))).toEqual({
      path: 'netPrice',
      message: PRICING_MESSAGES.priceNegative,
    });
  });

  it('rejects a price with more than two decimals', () => {
    expect(
      firstIssue(productPricingSchema.safeParse({ ...validPricing, netPrice: 10.999 })),
    ).toEqual({
      path: 'netPrice',
      message: PRICING_MESSAGES.priceTooPrecise,
    });
  });

  it('accepts prices with two decimals that are awkward in floating point', () => {
    expect(
      productPricingSchema.safeParse({ ...validPricing, netPrice: 0.07, grossPrice: 8129.27 })
        .success,
    ).toBe(true);
  });

  it('rejects a VAT rate outside the list', () => {
    expect(firstIssue(productPricingSchema.safeParse({ ...validPricing, vatRate: 19 }))).toEqual({
      path: 'vatRate',
      message: PRICING_MESSAGES.vatRateRequired,
    });
  });
});

describe('productAvailabilitySchema', () => {
  it('accepts an unlimited product without stock', () => {
    expect(productAvailabilitySchema.safeParse(validAvailability).success).toBe(true);
  });

  it('requires stock when the product is limited', () => {
    const limited = { ...validAvailability, limited: true, stock: null };
    expect(firstIssue(productAvailabilitySchema.safeParse(limited))).toEqual({
      path: 'stock',
      message: AVAILABILITY_MESSAGES.stockRequired,
    });
  });

  it('rejects a minimum cart quantity above the maximum', () => {
    const swapped = { ...validAvailability, minCartQuantity: 5, maxCartQuantity: 2 };
    expect(firstIssue(productAvailabilitySchema.safeParse(swapped))).toEqual({
      path: 'minCartQuantity',
      message: AVAILABILITY_MESSAGES.minAboveMax,
    });
  });
});

describe('addProductSchema', () => {
  it('accepts the three steps together', () => {
    const product = { ...validBasics, ...validPricing, ...validAvailability };
    expect(addProductSchema.safeParse(product).success).toBe(true);
  });

  it('keeps the cross-field rules of the availability step', () => {
    const product = { ...validBasics, ...validPricing, ...validAvailability, limited: true };
    expect(firstIssue(addProductSchema.safeParse(product))?.path).toBe('stock');
  });
});
