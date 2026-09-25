const hasMessage = (error: unknown): error is { readonly message: string } =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  typeof error.message === 'string';

export const fieldErrorMessages = (errors: readonly unknown[]): string[] =>
  errors.flatMap((error) => {
    if (typeof error === 'string') return [error];
    if (hasMessage(error)) return [error.message];
    return [];
  });

export const toFieldErrors = (errors: readonly unknown[]): { message: string }[] =>
  fieldErrorMessages(errors).map((message) => ({ message }));

export const hasFieldError = (errors: readonly unknown[]): boolean =>
  fieldErrorMessages(errors).length > 0;
