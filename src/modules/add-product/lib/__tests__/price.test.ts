import { describe, expect, it } from 'vitest';
import { grossFromNet, netFromGross, roundMoney } from '../price';

describe('price', () => {
  it('adds VAT to a net price', () => {
    expect(grossFromNet(100, 23)).toBe(123);
    expect(grossFromNet(8129.27, 23)).toBe(9999);
  });

  it('removes VAT from a gross price', () => {
    expect(netFromGross(9999, 23)).toBe(8129.27);
    expect(netFromGross(123, 23)).toBe(100);
  });

  it('leaves the price unchanged at zero VAT', () => {
    expect(grossFromNet(49.99, 0)).toBe(49.99);
    expect(netFromGross(49.99, 0)).toBe(49.99);
  });

  it('rounds to full grosze without floating point drift', () => {
    expect(roundMoney(1.005)).toBe(1.01);
    expect(roundMoney(2.675)).toBe(2.68);
  });
});
