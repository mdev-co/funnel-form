'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { AddProductDialog } from '@/modules/add-product/components/add-product-dialog';
import type { AddProductInput } from '@/modules/add-product/schemas/add-product.schema';
import { paginate } from '../lib/paginate';
import { ProductsPagination } from './products-pagination';
import { ProductsCards } from './products-cards';
import { ProductsTable } from './products-table';
import { formatProductCount } from '../lib/format-product-count';
import { addProduct, useProducts } from '../lib/product-store';

const PAGE_SIZE = 5;

const VIEW_TEXT = {
  title: 'Produkty',
  addProduct: 'Dodaj produkt',
  productAdded: 'Produkt został dodany',
  catalogSize: (count: number) => `${formatProductCount(count)} w katalogu`,
};

export function ProductsView() {
  const products = useProducts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );
  const currentPage = paginate(products, page, PAGE_SIZE);

  const saveProduct = (input: AddProductInput) => {
    addProduct(input);
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
      <div className="md:bg-card md:overflow-hidden md:rounded-lg md:border">
        <ProductsCards products={currentPage.items} className="md:hidden" />
        <div className="hidden md:block">
          <ProductsTable products={currentPage.items} />
        </div>
        <footer className="py-6 md:border-t md:bg-gray-50 md:p-4">
          <ProductsPagination
            page={currentPage.page}
            pageCount={currentPage.pageCount}
            total={products.length}
            onPageChange={(next) => void setPage(next)}
          />
        </footer>
      </div>
      <AddProductDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={saveProduct} />
    </section>
  );
}
