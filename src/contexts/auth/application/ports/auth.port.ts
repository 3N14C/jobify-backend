export abstract class AuthPort {
  abstract signUp(): Promise<void>
  abstract signIn(): Promise<void>
}