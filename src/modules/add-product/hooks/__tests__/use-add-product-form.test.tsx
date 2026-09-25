import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { fieldErrorMessages } from '@/lib/form/field-errors';
import { BASICS_MESSAGES } from '../../schemas/product-basics.schema';
import { useAddProductForm } from '../use-add-product-form';

type Wizard = ReturnType<typeof useAddProductForm>;

type HarnessProps = {
  readonly onSave: () => void;
  readonly expose: (wizard: Wizard) => void;
};

function Harness({ onSave, expose }: HarnessProps) {
  const wizard = useAddProductForm({ onSave });
  expose(wizard);
  return (
    <wizard.form.Field name="name">
      {(field) => (
        <label>
          Nazwa
          <input
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
          />
          <p data-testid="name-error">{fieldErrorMessages(field.state.meta.errors).join(' ')}</p>
        </label>
      )}
    </wizard.form.Field>
  );
}

const mount = () => {
  let wizard: Wizard | undefined;
  render(
    <Harness
      onSave={vi.fn()}
      expose={(value) => {
        wizard = value;
      }}
    />,
  );
  const current = () => {
    if (!wizard) throw new Error('wizard not mounted');
    return wizard;
  };
  return current;
};

const fillBasics = (wizard: Wizard) => {
  wizard.form.setFieldValue('name', 'Sony WH-1000XM5');
  wizard.form.setFieldValue('sku', 'SNWH1000XM5');
  wizard.form.setFieldValue('manufacturer', 'Sony');
  wizard.form.setFieldValue('category', 'RTV');
  wizard.form.setFieldValue('features', ['Bluetooth']);
};

describe('useAddProductForm', () => {
  it('starts on the first step with the design defaults', () => {
    const wizard = mount();
    expect(wizard().stepIndex).toBe(0);
    expect(wizard().isFirstStep).toBe(true);
    expect(wizard().form.state.values.vatRate).toBe(23);
    expect(wizard().form.state.values.currency).toBe('PLN');
  });

  it('does not advance while the current step is invalid and shows the message under the field', () => {
    const wizard = mount();
    let advanced = true;
    act(() => {
      advanced = wizard().goNext();
    });
    expect(advanced).toBe(false);
    expect(wizard().stepIndex).toBe(0);
    expect(screen.getByTestId('name-error')).toHaveTextContent(BASICS_MESSAGES.nameTooShort);
  });

  it('advances when the current step is valid', () => {
    const wizard = mount();
    act(() => {
      fillBasics(wizard());
    });
    act(() => {
      wizard().goNext();
    });
    expect(wizard().stepIndex).toBe(1);
    expect(wizard().step.id).toBe('pricing');
  });

  it('keeps the entered values when going back', () => {
    const wizard = mount();
    act(() => {
      fillBasics(wizard());
    });
    act(() => {
      wizard().goNext();
    });
    act(() => {
      wizard().goBack();
    });
    expect(wizard().stepIndex).toBe(0);
    expect(wizard().form.state.values.name).toBe('Sony WH-1000XM5');
  });

  it('reset returns to the first step with the defaults', () => {
    const wizard = mount();
    act(() => {
      fillBasics(wizard());
    });
    act(() => {
      wizard().goNext();
    });
    act(() => {
      wizard().reset();
    });
    expect(wizard().stepIndex).toBe(0);
    expect(wizard().form.state.values.name).toBe('');
  });
});
