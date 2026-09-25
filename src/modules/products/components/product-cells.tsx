import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '../lib/format-price';
import type { Product } from '../model/product';

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

type AvailabilityBadgeProps = {
  readonly available: boolean;
};

export function AvailabilityBadge({ available }: AvailabilityBadgeProps) {
  const badge = AVAILABILITY_BADGE[available ? 'available' : 'unavailable'];
  return <Badge variant={badge.variant}>{badge.label}</Badge>;
}

export type ProductCell = (product: Product) => ReactNode;

// One renderer per product field, shared by the table (desktop) and the cards (phones).
export const productCell = {
  name: (product) => product.name,
  sku: (product) => product.sku,
  category: (product) => product.category,
  grossPrice: (product) => formatPrice(product.grossPrice, product.currency),
  availability: (product) => <AvailabilityBadge available={product.available} />,
  stock: (product) => product.stock ?? EMPTY_STOCK,
} satisfies Record<string, ProductCell>;
