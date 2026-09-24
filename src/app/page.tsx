import { Suspense } from 'react';
import { ProductsView } from '@/modules/products/components/products-view';

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-310 px-4 pt-12.5 pb-12">
      <Suspense>
        <ProductsView />
      </Suspense>
    </main>
  );
}
