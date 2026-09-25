import { cn } from '@/lib/utils';
import type { Product } from '../model/product';
import { productCell, type ProductCell } from './product-cells';

type CardField = {
  readonly key: string;
  readonly label: string;
  readonly className?: string;
  readonly render: ProductCell;
};

const CARD_FIELDS: readonly CardField[] = [
  { key: 'category', label: 'Kategoria', render: productCell.category },
  {
    key: 'grossPrice',
    label: 'Cena brutto',
    className: 'font-medium',
    render: productCell.grossPrice,
  },
  { key: 'stock', label: 'Magazyn', render: productCell.stock },
];

type ProductsCardsProps = {
  readonly products: readonly Product[];
  readonly className?: string;
};

export const ProductsCards = ({ products, className }: ProductsCardsProps) => (
  <ul className={cn('flex flex-col gap-4', className)}>
    {products.map((product) => (
      <li key={product.id} className="bg-card flex flex-col gap-4 rounded-lg border p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium">{productCell.name(product)}</span>
            <span className="text-muted-foreground text-sm">{productCell.sku(product)}</span>
          </div>
          {productCell.availability(product)}
        </div>
        <dl className="grid grid-cols-3 gap-4 rounded-md bg-gray-50 p-3">
          {CARD_FIELDS.map((field) => (
            <div key={field.key} className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{field.label}</dt>
              <dd className={cn('text-sm', field.className)}>{field.render(product)}</dd>
            </div>
          ))}
        </dl>
      </li>
    ))}
  </ul>
);
