import { describe, expect, it } from 'vitest';
import { pluralize } from '../plural';

const PRODUCT = { one: 'produkt', few: 'produkty', many: 'produktów' };

describe('pluralize', () => {
  it.each([
    [1, '1 produkt'],
    [2, '2 produkty'],
    [4, '4 produkty'],
    [5, '5 produktów'],
    [12, '12 produktów'],
    [22, '22 produkty'],
    [25, '25 produktów'],
    [0, '0 produktów'],
  ])('%i -> %s', (count, expected) => {
    expect(pluralize(count, PRODUCT)).toBe(expected);
  });
});
