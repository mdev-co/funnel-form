import { describe, expect, it } from 'vitest';
import { fieldErrorMessages } from '../field-errors';

describe('fieldErrorMessages', () => {
  it('reads plain strings and schema issues, skips anything else', () => {
    expect(fieldErrorMessages(['za krótko', { message: 'tylko litery' }, undefined, 42])).toEqual([
      'za krótko',
      'tylko litery',
    ]);
  });
});
