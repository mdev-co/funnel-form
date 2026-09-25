import { CURRENCIES, VAT_RATES, type VatRate } from '@/modules/products/model/product';
import type { AddProductForm } from '../hooks/use-add-product-form';
import { grossFromNet, netFromGross } from '../lib/price';
import { PRICE_STEP, productPricingSchema } from '../schemas/product-pricing.schema';

const PRICING_TEXT = {
  netPrice: 'Cena netto',
  grossPrice: 'Cena brutto',
  pricePlaceholder: '0,00',
  vatRate: 'Stawka VAT',
  currency: 'Waluta',
  percent: (rate: number) => `${rate}%`,
};

const PRICE_MIN = 0;

const rules = productPricingSchema.shape;

// The recalculated field must not run its own listener, or net and gross would update each other forever.
const SILENT_UPDATE = { dontRunListeners: true } as const;

const syncGross = (form: AddProductForm, netPrice: number | null, vatRate: VatRate) =>
  form.setFieldValue(
    'grossPrice',
    netPrice === null ? null : grossFromNet(netPrice, vatRate),
    SILENT_UPDATE,
  );

const syncNet = (form: AddProductForm, grossPrice: number | null, vatRate: VatRate) =>
  form.setFieldValue(
    'netPrice',
    grossPrice === null ? null : netFromGross(grossPrice, vatRate),
    SILENT_UPDATE,
  );

type PricingStepProps = {
  readonly form: AddProductForm;
};

export const PricingStep = ({ form }: PricingStepProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    <form.AppField
      name="netPrice"
      validators={{ onChange: rules.netPrice }}
      listeners={{ onChange: ({ value }) => syncGross(form, value, form.state.values.vatRate) }}
    >
      {(field) => (
        <field.NumberField
          label={PRICING_TEXT.netPrice}
          placeholder={PRICING_TEXT.pricePlaceholder}
          step={PRICE_STEP}
          min={PRICE_MIN}
        />
      )}
    </form.AppField>

    <form.AppField
      name="grossPrice"
      validators={{ onChange: rules.grossPrice }}
      listeners={{ onChange: ({ value }) => syncNet(form, value, form.state.values.vatRate) }}
    >
      {(field) => (
        <field.NumberField
          label={PRICING_TEXT.grossPrice}
          placeholder={PRICING_TEXT.pricePlaceholder}
          step={PRICE_STEP}
          min={PRICE_MIN}
        />
      )}
    </form.AppField>

    <form.AppField
      name="vatRate"
      validators={{ onChange: rules.vatRate }}
      listeners={{ onChange: ({ value }) => syncGross(form, form.state.values.netPrice, value) }}
    >
      {(field) => (
        <field.SelectField
          label={PRICING_TEXT.vatRate}
          options={VAT_RATES}
          formatOption={PRICING_TEXT.percent}
        />
      )}
    </form.AppField>

    <form.AppField name="currency" validators={{ onChange: rules.currency }}>
      {(field) => <field.SelectField label={PRICING_TEXT.currency} options={CURRENCIES} />}
    </form.AppField>
  </div>
);
