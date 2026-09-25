import { APP_LOCALE } from './locale';

export type PluralForms = {
  readonly one: string;
  readonly few: string;
  readonly many: string;
};

const FORM_BY_CATEGORY: Record<Intl.LDMLPluralRule, keyof PluralForms> = {
  zero: 'many',
  one: 'one',
  two: 'few',
  few: 'few',
  many: 'many',
  other: 'many',
};

const pluralRules = new Intl.PluralRules(APP_LOCALE);

export const pluralize = (count: number, forms: PluralForms): string =>
  `${count} ${forms[FORM_BY_CATEGORY[pluralRules.select(count)]]}`;
