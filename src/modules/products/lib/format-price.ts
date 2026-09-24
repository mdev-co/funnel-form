import { APP_LOCALE } from '@/lib/locale';
import type { Currency } from '../types/product';

const PRICE_FORMAT: Intl.NumberFormatOptions = { style: 'currency', currencyDisplay: 'code' };

export const formatPrice = (amount: number, currency: Currency): string =>
  new Intl.NumberFormat(APP_LOCALE, { ...PRICE_FORMAT, currency }).format(amount);
