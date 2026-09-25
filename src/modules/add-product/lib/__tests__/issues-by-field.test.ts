import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { issuesByField } from '../issues-by-field';

const schema = z.object({
  name: z
    .string()
    .min(3, 'too short')
    .regex(/^[a-z]+$/, 'letters only'),
  age: z.number().int('whole number'),
});

describe('issuesByField', () => {
  it('keeps the first message of each field', () => {
    const result = schema.safeParse({ name: 'A1', age: 1.5 });
    if (result.success) throw new Error('expected issues');
    expect(issuesByField(result.error)).toEqual({ name: 'too short', age: 'whole number' });
  });
});
