import { describe, expect, it } from 'vitest';
import { MOCK_PRODUCTS } from '../../data/mock-products';
import { parseStoredProducts, serializeProducts } from '../product-storage';

describe('product storage', () => {
  it('returns null when nothing was stored yet', () => {
    expect(parseStoredProducts(null)).toBeNull();
  });

  it('reads back what was serialized', () => {
    expect(parseStoredProducts(serializeProducts(MOCK_PRODUCTS))).toEqual(MOCK_PRODUCTS);
  });

  it('returns null for corrupted JSON', () => {
    expect(parseStoredProducts('{not json')).toBeNull();
  });

  it('returns null when the stored data does not match the product schema', () => {
    expect(parseStoredProducts(JSON.stringify([{ id: '1', name: 'x' }]))).toBeNull();
  });
});
