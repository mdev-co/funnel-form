import { z } from 'zod';
import { CURRENCIES, VAT_RATES } from '@/modules/products/model/product';

const PRICE_STEP = 0.01;

export const PRICING_MESSAGES = {
  priceTooPrecise: 'Cena może mieć najwyżej dwa miejsca po przecinku',
  netRequired: 'Podaj cenę netto',
  grossRequired: 'Podaj cenę brutto',
  priceNegative: 'Cena nie może być ujemna',
  vatRateRequired: 'Wybierz stawkę VAT',
  currencyRequired: 'Wybierz walutę',
};

export const productPricingSchema = z.object({
  netPrice: z
    .number({ error: PRICING_MESSAGES.netRequired })
    .nonnegative(PRICING_MESSAGES.priceNegative)
    .multipleOf(PRICE_STEP, PRICING_MESSAGES.priceTooPrecise),
  grossPrice: z
    .number({ error: PRICING_MESSAGES.grossRequired })
    .nonnegative(PRICING_MESSAGES.priceNegative)
    .multipleOf(PRICE_STEP, PRICING_MESSAGES.priceTooPrecise),
  vatRate: z.literal(VAT_RATES, { error: PRICING_MESSAGES.vatRateRequired }),
  currency: z.enum(CURRENCIES, { error: PRICING_MESSAGES.currencyRequired }),
});

export type ProductPricing = z.infer<typeof productPricingSchema>;
