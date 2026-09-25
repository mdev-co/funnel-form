import type { z } from 'zod';

export type FieldMessages = Record<string, string>;

export const issuesByField = (error: z.ZodError): FieldMessages => {
  const messages: FieldMessages = {};
  for (const issue of error.issues) {
    const field = issue.path.map(String).join('.');
    messages[field] ??= issue.message;
  }
  return messages;
};
