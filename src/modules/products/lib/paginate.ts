export type Page<T> = {
  items: T[];
  page: number;
  pageCount: number;
};

const FIRST_PAGE = 1;

export function paginate<T>(items: readonly T[], page: number, pageSize: number): Page<T> {
  const pageCount = Math.max(FIRST_PAGE, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(FIRST_PAGE, page), pageCount);
  const firstItemIndex = (currentPage - FIRST_PAGE) * pageSize;

  return {
    items: items.slice(firstItemIndex, firstItemIndex + pageSize),
    page: currentPage,
    pageCount,
  };
}
