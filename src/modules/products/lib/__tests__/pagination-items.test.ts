import { describe, expect, it } from 'vitest';
import { paginationItems, type PaginationItem } from '../pagination-items';

const labels = (items: PaginationItem[]) =>
  items.map((item) => (item.kind === 'page' ? item.page : '…'));

describe('paginationItems', () => {
  it('lists every page when there are few of them', () => {
    expect(labels(paginationItems(3, 7))).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('shows the first block and the last page near the start', () => {
    expect(labels(paginationItems(4, 100))).toEqual([1, 2, 3, 4, 5, '…', 100]);
  });

  it('shows the first page and the last block near the end', () => {
    expect(labels(paginationItems(97, 100))).toEqual([1, '…', 96, 97, 98, 99, 100]);
  });

  it('shows both edges and the neighbours in the middle', () => {
    expect(labels(paginationItems(50, 100))).toEqual([1, '…', 49, 50, 51, '…', 100]);
  });

  it('always returns seven items for long lists', () => {
    for (const page of [1, 5, 6, 95, 96, 100]) {
      expect(paginationItems(page, 100)).toHaveLength(7);
    }
  });
});
