export abstract class PasswordVerifierPort {
  abstract verify(hash: string, password: string): Promise<boolean>
}