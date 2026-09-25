import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Product } from '../model/product';
import { productCell, type ProductCell } from './product-cells';

type ProductColumn = {
  readonly key: string;
  readonly label: string;
  readonly className?: string;
  readonly headClassName?: string;
  readonly render: ProductCell;
};

const COLUMNS: readonly ProductColumn[] = [
  {
    key: 'name',
    label: 'Nazwa',
    className: 'font-medium',
    headClassName: 'lg:w-[357px]',
    render: productCell.name,
  },
  { key: 'sku', label: 'SKU', className: 'text-muted-foreground', render: productCell.sku },
  {
    key: 'category',
    label: 'Kategoria',
    className: 'text-muted-foreground',
    render: productCell.category,
  },
  {
    key: 'grossPrice',
    label: 'Cena Brutto',
    className: 'font-medium',
    render: productCell.grossPrice,
  },
  { key: 'availability', label: 'Status', render: productCell.availability },
  { key: 'stock', label: 'Magazyn', render: productCell.stock },
];

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
