import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import type { AddProductInput } from '@/modules/add-product/schemas/add-product.schema';
import { MOCK_PRODUCTS } from '../../data/mock-products';
import { PRODUCTS_STORAGE_KEY } from '../product-storage';
import { addProduct, useProducts } from '../product-store';

const NEW_PRODUCT: AddProductInput = {
  name: 'Sony WH-1000XM5',
  sku: 'SNWH1000XM5',
  description: '',
  manufacturer: 'Sony',
  category: 'RTV',
  features: ['Bluetooth'],
  netPrice: 1300,
  grossPrice: 1599,
  vatRate: 23,
  currency: 'PLN',
  available: true,
  limited: false,
  stock: null,
  minCartQuantity: 1,
  maxCartQuantity: 10,
};

describe('product store', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('starts with the mock products when nothing is stored', () => {
    const { result } = renderHook(() => useProducts());
    expect(result.current).toEqual(MOCK_PRODUCTS);
  });

  it('appends a product, persists it and updates subscribers', () => {
    const { result } = renderHook(() => useProducts());
    act(() => {
      addProduct(NEW_PRODUCT);
    });
    expect(result.current).toHaveLength(MOCK_PRODUCTS.length + 1);
    expect(result.current.at(-1)).toMatchObject(NEW_PRODUCT);
    expect(window.localStorage.getItem(PRODUCTS_STORAGE_KEY)).toContain('SNWH1000XM5');
  });

  it('ignores stored data that does not match the schema', () => {
    window.localStorage.setItem(PRODUCTS_STORAGE_KEY, '[{"id":"1"}]');
    const { result } = renderHook(() => useProducts());
    expect(result.current).toEqual(MOCK_PRODUCTS);
  });
});
