export interface IAuthUserEntity {
  id: string;
  name: string;
  email: string;
}

export interface IAuthUserCredentials {
  id: string;
  email: string;
  hashedPassword: string;
}