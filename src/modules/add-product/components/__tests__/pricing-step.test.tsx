import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAddProductForm } from '../../hooks/use-add-product-form';
import { PricingStep } from '../pricing-step';

function Harness() {
  const wizard = useAddProductForm({ onSave: vi.fn() });
  return <PricingStep form={wizard.form} />;
}

const priceInput = (label: string) => screen.getByLabelText<HTMLInputElement>(label);

describe('PricingStep', () => {
  it('recalculates the gross price from the net price and the VAT rate', () => {
    render(<Harness />);
    fireEvent.change(priceInput('Cena netto'), { target: { value: '100' } });
    expect(priceInput('Cena brutto').value).toBe('123');
  });

  it('recalculates the net price from the gross price', () => {
    render(<Harness />);
    fireEvent.change(priceInput('Cena brutto'), { target: { value: '246' } });
    expect(priceInput('Cena netto').value).toBe('200');
  });

  it('clears the gross price when the net price is cleared', () => {
    render(<Harness />);
    fireEvent.change(priceInput('Cena netto'), { target: { value: '100' } });
    fireEvent.change(priceInput('Cena netto'), { target: { value: '' } });
    expect(priceInput('Cena brutto').value).toBe('');
  });
});
