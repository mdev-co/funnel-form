import { CATEGORIES, FEATURES, MANUFACTURERS } from '@/modules/products/model/product';
import type { AddProductForm } from '../hooks/use-add-product-form';
import { productBasicsSchema } from '../schemas/product-basics.schema';

const BASICS_TEXT = {
  name: 'Nazwa produktu',
  namePlaceholder: 'np. MacBook Pro 14',
  sku: 'SKU produktu',
  skuPlaceholder: 'np. MBP14M3PRO',
  description: 'Opis produktu',
  descriptionPlaceholder: 'Krótki opis produktu',
  manufacturer: 'Producent',
  manufacturerPlaceholder: 'Wybierz producenta',
  category: 'Kategoria',
  categoryPlaceholder: 'Wybierz kategorię',
  features: 'Cechy produktu',
};

const rules = productBasicsSchema.shape;

type BasicsStepProps = {
  readonly form: AddProductForm;
};

export const BasicsStep = ({ form }: BasicsStepProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    <form.AppField name="name" validators={{ onChange: rules.name }}>
      {(field) => (
        <field.TextField label={BASICS_TEXT.name} placeholder={BASICS_TEXT.namePlaceholder} />
      )}
    </form.AppField>

    <form.AppField name="sku" validators={{ onChange: rules.sku }}>
      {(field) => (
        <field.TextField label={BASICS_TEXT.sku} placeholder={BASICS_TEXT.skuPlaceholder} />
      )}
    </form.AppField>

    <form.AppField name="description" validators={{ onChange: rules.description }}>
      {(field) => (
        <field.TextareaField
          className="md:col-span-2"
          label={BASICS_TEXT.description}
          placeholder={BASICS_TEXT.descriptionPlaceholder}
        />
      )}
    </form.AppField>

    <form.AppField name="manufacturer" validators={{ onChange: rules.manufacturer }}>
      {(field) => (
        <field.SelectField
          label={BASICS_TEXT.manufacturer}
          placeholder={BASICS_TEXT.manufacturerPlaceholder}
          options={MANUFACTURERS}
        />
      )}
    </form.AppField>

    <form.AppField name="category" validators={{ onChange: rules.category }}>
      {(field) => (
        <field.SelectField
          label={BASICS_TEXT.category}
          placeholder={BASICS_TEXT.categoryPlaceholder}
          options={CATEGORIES}
        />
      )}
    </form.AppField>

    <form.AppField name="features" validators={{ onChange: rules.features }}>
      {(field) => (
        <field.ToggleListField
          className="md:col-span-2"
          label={BASICS_TEXT.features}
          options={FEATURES}
        />
      )}
    </form.AppField>
  </div>
);
