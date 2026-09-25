import { useSyncExternalStore } from 'react';
import type { AddProductInput } from '@/modules/add-product/schemas/add-product.schema';
import { MOCK_PRODUCTS } from '../data/mock-products';
import type { Product } from '../model/product';
import { PRODUCTS_STORAGE_KEY, parseStoredProducts, serializeProducts } from './product-storage';

type Listener = () => void;

const listeners = new Set<Listener>();

// useSyncExternalStore needs the same array back while the stored text is unchanged.
let cachedRaw: string | null = null;
let cachedProducts: readonly Product[] = MOCK_PRODUCTS;

const getSnapshot = (): readonly Product[] => {
  const raw = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedProducts = parseStoredProducts(raw) ?? MOCK_PRODUCTS;
  }
  return cachedProducts;
};

const getServerSnapshot = (): readonly Product[] => MOCK_PRODUCTS;

const subscribe = (listener: Listener): (() => void) => {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
};

export const useProducts = (): readonly Product[] =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export const addProduct = (input: AddProductInput): void => {
  const next = [...getSnapshot(), { id: crypto.randomUUID(), ...input }];
  window.localStorage.setItem(PRODUCTS_STORAGE_KEY, serializeProducts(next));
  listeners.forEach((listener) => listener());
};
