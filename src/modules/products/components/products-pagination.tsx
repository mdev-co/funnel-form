import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaginationEllipsis } from '@/components/ui/pagination';
import { paginationItems } from '../lib/pagination-items';
import { formatProductCount } from '../lib/format-product-count';

const PAGINATION_TEXT = {
  label: 'Paginacja',
  previous: 'Wstecz',
  next: 'Dalej',
  summary: (page: number, pageCount: number, total: number) =>
    `Strona ${page} z ${pageCount} · ${formatProductCount(total)}`,
};

type PageButtonsProps = {
  readonly page: number;
  readonly pageCount: number;
  readonly onPageChange: (page: number) => void;
};

const PageButtons = ({ page, pageCount, onPageChange }: PageButtonsProps) =>
  paginationItems(page, pageCount).map((item) =>
    item.kind === 'gap' ? (
      <PaginationEllipsis key={item.position} />
    ) : (
      <Button
        key={item.page}
        variant={item.page === page ? 'default' : 'ghost'}
        size="icon"
        aria-current={item.page === page ? 'page' : undefined}
        onClick={() => onPageChange(item.page)}
      >
        {item.page}
      </Button>
    ),
  );

type ProductsPaginationProps = PageButtonsProps & {
  readonly total: number;
};

export const ProductsPagination = ({
  page,
  pageCount,
  total,
  onPageChange,
}: ProductsPaginationProps) => (
  <nav
    aria-label={PAGINATION_TEXT.label}
    className="flex flex-col items-center gap-3 text-sm md:flex-row md:justify-between"
  >
    <span className="text-muted-foreground text-xs">
      {PAGINATION_TEXT.summary(page, pageCount, total)}
    </span>
    <div className="flex items-center gap-0.5">
      <Button variant="ghost" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeftIcon />
        {PAGINATION_TEXT.previous}
      </Button>
      <PageButtons page={page} pageCount={pageCount} onPageChange={onPageChange} />
      <Button variant="ghost" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
        {PAGINATION_TEXT.next}
        <ChevronRightIcon />
      </Button>
    </div>
  </nav>
);
