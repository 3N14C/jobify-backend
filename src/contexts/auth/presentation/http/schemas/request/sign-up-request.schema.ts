import { z } from 'zod';

export const signUpRequestSchema = z.object({
  name: z.string().nonempty({ error: 'Имя не должно быть пустым' }).max(255).trim(),
  email: z.email({ error: 'Некорректно введен адрес электронной почты' }).toLowerCase().trim(),
  password: z.string().min(6, { error: 'Пароль должен содержать не менее 6 символов' }).trim(),
});

export type TSignUpRequest = z.infer<typeof signUpRequestSchema>;