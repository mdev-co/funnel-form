import type { VatRate } from '@/modules/products/model/product';

const PERCENT = 100;
const MONEY_SCALE = 100;

export const roundMoney = (amount: number): number =>
  Math.round((amount + Number.EPSILON) * MONEY_SCALE) / MONEY_SCALE;

const vatMultiplier = (vatRate: VatRate): number => 1 + vatRate / PERCENT;

export const grossFromNet = (netPrice: number, vatRate: VatRate): number =>
  roundMoney(netPrice * vatMultiplier(vatRate));

export const netFromGross = (grossPrice: number, vatRate: VatRate): number =>
  roundMoney(grossPrice / vatMultiplier(vatRate));
