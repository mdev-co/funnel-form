'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { AddProductDialog } from '@/modules/add-product/components/add-product-dialog';
import type { AddProductInput } from '@/modules/add-product/schemas/add-product.schema';
import { MOCK_PRODUCTS } from '../data/mock-products';
import { paginate } from '../lib/paginate';
import type { Product } from '../model/product';
import { ProductsPagination } from './products-pagination';
import { ProductsTable } from './products-table';

const PAGE_SIZE = 5;

const VIEW_TEXT = {
  title: 'Produkty',
  addProduct: 'Dodaj produkt',
  productAdded: 'Produkt został dodany',
  catalogSize: (count: number) => `${count} produktów w katalogu`,
};

export function ProductsView() {
  const [products, setProducts] = useState<readonly Product[]>(MOCK_PRODUCTS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );
  const currentPage = paginate(products, page, PAGE_SIZE);

  const addProduct = (input: AddProductInput) => {
    setProducts((list) => [...list, { id: crypto.randomUUID(), ...input }]);
    toast.success(VIEW_TEXT.productAdded);
  };

  return (
    <section className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-foreground text-xl font-semibold">{VIEW_TEXT.title}</h1>
          <p className="text-muted-foreground text-sm">{VIEW_TEXT.catalogSize(products.length)}</p>
        </div>
        <Button size="lg" className="rounded-full px-4" onClick={() => setDialogOpen(true)}>
          <PlusIcon />
          {VIEW_TEXT.addProduct}
        </Button>
      </header>
      <div className="bg-card overflow-hidden rounded-lg border">
        <ProductsTable products={currentPage.items} />
        <footer className="border-t bg-gray-50 p-4">
          <ProductsPagination
            page={currentPage.page}
            pageCount={currentPage.pageCount}
            total={products.length}
            onPageChange={(next) => void setPage(next)}
          />
        </footer>
      </div>
      <AddProductDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={addProduct} />
    </section>
  );
}
