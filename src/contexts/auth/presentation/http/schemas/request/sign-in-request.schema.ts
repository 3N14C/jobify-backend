import { z } from 'zod';

export const signInRequestSchema = z.object({
  email: z.email({ error: 'Некорректно введен адрес электронной почты' }).toLowerCase().trim(),
  password: z.string().min(6, { error: 'Пароль должен содержать не менее 6 символов' }).trim(),
});

export type TSignInRequest = z.infer<typeof signInRequestSchema>;