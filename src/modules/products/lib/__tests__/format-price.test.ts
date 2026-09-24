import { describe, expect, it } from 'vitest';
import { formatPrice } from '../format-price';

describe('formatPrice', () => {
  it('formats PLN with a decimal comma and the currency code', () => {
    expect(formatPrice(9999, 'PLN')).toMatch(/^9999,00\sPLN$/);
  });

  it('keeps two decimals for whole amounts', () => {
    expect(formatPrice(179, 'PLN')).toMatch(/^179,00\sPLN$/);
  });

  it('groups thousands from five digits', () => {
    expect(formatPrice(12345.5, 'EUR')).toMatch(/^12\s345,50\sEUR$/);
  });
});
