export type PaginationItem =
  | { readonly kind: 'page'; readonly page: number }
  | { readonly kind: 'gap'; readonly position: 'before' | 'after' };

const MAX_VISIBLE_PAGES = 7;
const EDGE_PAGE_COUNT = 5;
const FIRST_PAGE = 1;

const GAP_BEFORE: PaginationItem = { kind: 'gap', position: 'before' };
const GAP_AFTER: PaginationItem = { kind: 'gap', position: 'after' };

const pageItem = (page: number): PaginationItem => ({ kind: 'page', page });

const pageRange = (from: number, to: number): PaginationItem[] =>
  Array.from({ length: to - from + 1 }, (_, index) => pageItem(from + index));

export function paginationItems(currentPage: number, pageCount: number): PaginationItem[] {
  if (pageCount <= MAX_VISIBLE_PAGES) {
    return pageRange(FIRST_PAGE, pageCount);
  }

  const startBlockEnd = EDGE_PAGE_COUNT;
  const endBlockStart = pageCount - EDGE_PAGE_COUNT + 1;

  if (currentPage < startBlockEnd) {
    return [...pageRange(FIRST_PAGE, startBlockEnd), GAP_AFTER, pageItem(pageCount)];
  }

  if (currentPage > endBlockStart) {
    return [pageItem(FIRST_PAGE), GAP_BEFORE, ...pageRange(endBlockStart, pageCount)];
  }

  return [
    pageItem(FIRST_PAGE),
    GAP_BEFORE,
    ...pageRange(currentPage - 1, currentPage + 1),
    GAP_AFTER,
    pageItem(pageCount),
  ];
}
