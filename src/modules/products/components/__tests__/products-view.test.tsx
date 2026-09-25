import { render, screen } from '@testing-library/react';
import { NuqsTestingAdapter } from 'nuqs/adapters/testing';
import { describe, expect, it } from 'vitest';
import { ProductsView } from '../products-view';

const renderWithUrl = (search: string) =>
  render(
    <NuqsTestingAdapter searchParams={search}>
      <ProductsView />
    </NuqsTestingAdapter>,
  );

describe('ProductsView', () => {
  it('shows the last page when the URL asks for a page past the end', () => {
    renderWithUrl('?page=99');
    expect(screen.getByText('Strona 1 z 1 · 5 produktów')).toBeInTheDocument();
  });

  it('shows the first page when the URL has no page number', () => {
    renderWithUrl('');
    expect(screen.getByText('5 produktów w katalogu')).toBeInTheDocument();
  });
});
