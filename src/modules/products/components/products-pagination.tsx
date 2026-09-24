import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PAGINATION_TEXT = {
  label: 'Paginacja',
  previous: 'Wstecz',
  next: 'Dalej',
  summary: (page: number, pageCount: number, total: number) =>
    `Strona ${page} z ${pageCount} · ${total} produktów`,
};

const pageNumbers = (pageCount: number) =>
  Array.from({ length: pageCount }, (_, index) => index + 1);

type PageButtonsProps = {
  readonly page: number;
  readonly pageCount: number;
  readonly onPageChange: (page: number) => void;
};

const PageButtons = ({ page, pageCount, onPageChange }: PageButtonsProps) =>
  pageNumbers(pageCount).map((number) => (
    <Button
      key={number}
      variant={number === page ? 'default' : 'ghost'}
      size="icon"
      aria-current={number === page ? 'page' : undefined}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  ));

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
    className="text-muted-foreground flex items-center justify-between text-sm"
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
