import { describe, expect, it } from 'vitest';
import { paginate } from '../paginate';

const SEVEN = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

describe('paginate', () => {
  it('returns the first page with the page count', () => {
    expect(paginate(SEVEN, 1, 5)).toEqual({
      items: ['a', 'b', 'c', 'd', 'e'],
      page: 1,
      pageCount: 2,
    });
  });

  it('returns the remaining items on the last page', () => {
    expect(paginate(SEVEN, 2, 5).items).toEqual(['f', 'g']);
  });

  it('clamps a page number above the last page', () => {
    expect(paginate(SEVEN, 9, 5).page).toBe(2);
  });

  it('clamps a page number below one', () => {
    expect(paginate(SEVEN, 0, 5).page).toBe(1);
  });

  it('has one empty page for an empty list', () => {
    expect(paginate([], 1, 5)).toEqual({ items: [], page: 1, pageCount: 1 });
  });
});
