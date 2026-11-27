export type TDomainKindError = 'unauthorized' | 'not_found' | 'conflict' | 'invalid'

export abstract class DomainError extends Error {
  protected constructor(
    message: string,
    readonly kind: TDomainKindError,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = new.target.name
  }
}