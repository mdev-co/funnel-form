import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPrice } from '../lib/format-price';
import type { Product } from '../model/product';

type ProductColumn = {
  readonly key: string;
  readonly label: string;
  readonly className?: string;
  readonly headClassName?: string;
  readonly render: (product: Product) => ReactNode;
};

type Availability = 'available' | 'unavailable';

type BadgeContent = {
  readonly label: string;
  readonly variant: 'success' | 'destructive';
};

const AVAILABILITY_BADGE: Record<Availability, BadgeContent> = {
  available: { label: 'Dostępny', variant: 'success' },
  unavailable: { label: 'Niedostępny', variant: 'destructive' },
};

const EMPTY_STOCK = '—';

const COLUMNS: readonly ProductColumn[] = [
  {
    key: 'name',
    label: 'Nazwa',
    className: 'font-medium',
    headClassName: 'lg:w-[357px]',
    render: (product) => product.name,
  },
  {
    key: 'sku',
    label: 'SKU',
    className: 'text-muted-foreground',
    render: (product) => product.sku,
  },
  {
    key: 'category',
    label: 'Kategoria',
    className: 'text-muted-foreground',
    render: (product) => product.category,
  },
  {
    key: 'grossPrice',
    label: 'Cena Brutto',
    className: 'font-medium',
    render: (product) => formatPrice(product.grossPrice, product.currency),
  },
  {
    key: 'availability',
    label: 'Status',
    render: (product) => <AvailabilityBadge available={product.available} />,
  },
  { key: 'stock', label: 'Magazyn', render: (product) => product.stock ?? EMPTY_STOCK },
];

type AvailabilityBadgeProps = {
  readonly available: boolean;
};

function AvailabilityBadge({ available }: AvailabilityBadgeProps) {
  const badge = AVAILABILITY_BADGE[available ? 'available' : 'unavailable'];
  return <Badge variant={badge.variant}>{badge.label}</Badge>;
}

type ProductsTableProps = {
  readonly products: readonly Product[];
};

export const ProductsTable = ({ products }: ProductsTableProps) => (
  <Table className="lg:table-fixed">
    <TableHeader className="bg-gray-50">
      <TableRow>
        {COLUMNS.map((column) => (
          <TableHead key={column.key} className="text-muted-foreground px-4">
            {column.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map((product) => (
        <TableRow key={product.id}>
          {COLUMNS.map((column) => (
            <TableCell key={column.key} className={cn('h-12 px-4 py-2', column.className)}>
              {column.render(product)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
