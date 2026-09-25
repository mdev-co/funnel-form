import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MOCK_PRODUCTS } from '../../data/mock-products';
import { ProductsCards } from '../products-cards';

describe('ProductsCards', () => {
  it('renders one card per product with name, SKU, availability and the three fields', () => {
    render(<ProductsCards products={MOCK_PRODUCTS.slice(0, 2)} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('MacBook Pro 14"')).toBeInTheDocument();
    expect(screen.getByText('MBP14M3PRO')).toBeInTheDocument();
    expect(screen.getAllByText('Dostępny')).toHaveLength(2);
    expect(screen.getAllByText('Cena brutto')).toHaveLength(2);
    expect(screen.getByText('9999,00 PLN')).toBeInTheDocument();
  });
});
