import { Separator } from '@/components/ui/separator';
import type { AddProductForm } from '../hooks/use-add-product-form';
import { QUANTITY_MIN, productAvailabilitySchema } from '../schemas/product-availability.schema';

const AVAILABILITY_TEXT = {
  available: 'Produkt jest dostępny',
  limited: 'Produkt limitowany',
  stock: 'Ilość na magazynie',
  stockPlaceholder: '0',
  cartLimits: 'Limity koszyka',
  minCartQuantity: 'Minimalna ilość',
  maxCartQuantity: 'Maksymalna ilość',
};

const QUANTITY_STEP = 1;
const STOCK_MIN = 0;

const rules = productAvailabilitySchema.shape;

type AvailabilityStepProps = {
  readonly form: AddProductForm;
};

export const AvailabilityStep = ({ form }: AvailabilityStepProps) => (
  <div className="flex flex-col gap-4">
    <form.AppField name="available" validators={{ onChange: rules.available }}>
      {(field) => <field.SwitchField label={AVAILABILITY_TEXT.available} />}
    </form.AppField>

    <Separator />

    <form.AppField
      name="limited"
      validators={{ onChange: rules.limited }}
      listeners={{
        onChange: ({ value }) => {
          if (!value) form.setFieldValue('stock', null);
        },
      }}
    >
      {(field) => <field.CheckboxField label={AVAILABILITY_TEXT.limited} />}
    </form.AppField>

    <form.Subscribe selector={(state) => state.values.limited}>
      {(limited) =>
        limited ? (
          <form.AppField name="stock" validators={{ onChange: rules.stock }}>
            {(field) => (
              <field.NumberField
                label={AVAILABILITY_TEXT.stock}
                placeholder={AVAILABILITY_TEXT.stockPlaceholder}
                step={QUANTITY_STEP}
                min={STOCK_MIN}
              />
            )}
          </form.AppField>
        ) : null
      }
    </form.Subscribe>

    <Separator />

    <h3 className="text-base font-medium">{AVAILABILITY_TEXT.cartLimits}</h3>

    <div className="grid gap-4 md:grid-cols-2">
      <form.AppField name="minCartQuantity" validators={{ onChange: rules.minCartQuantity }}>
        {(field) => (
          <field.NumberField
            label={AVAILABILITY_TEXT.minCartQuantity}
            step={QUANTITY_STEP}
            min={QUANTITY_MIN}
          />
        )}
      </form.AppField>

      <form.AppField name="maxCartQuantity" validators={{ onChange: rules.maxCartQuantity }}>
        {(field) => (
          <field.NumberField
            label={AVAILABILITY_TEXT.maxCartQuantity}
            step={QUANTITY_STEP}
            min={QUANTITY_MIN}
          />
        )}
      </form.AppField>
    </div>
  </div>
);
