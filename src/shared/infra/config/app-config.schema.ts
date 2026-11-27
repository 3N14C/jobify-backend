import { z } from 'zod';

export const appConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // DATABASE
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),

  // APPLICATION
  PORT: z.coerce.number().int().min(1).max(65535),
  ORIGIN: z.string(),
});

export type TEnvConfig = z.infer<typeof appConfigSchema>;