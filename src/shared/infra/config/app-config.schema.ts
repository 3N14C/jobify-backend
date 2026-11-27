import { z } from 'zod';

const positiveInt = z.coerce.number().int().positive();
const secret = z.string().min(32, 'must be at least 32 characters');
const path = z.string().startsWith('/', 'must start with "/"');

export const appConfigSchema = z
  .object({
    // DATABASE
    DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),

    // APPLICATION
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535),
    ORIGIN: z.string(),

    // JWT
    ACCESS_TOKEN_SECRET: secret,
    ACCESS_TOKEN_EXPIRES_IN: positiveInt,
    REFRESH_TOKEN_SECRET: secret,
    REFRESH_TOKEN_EXPIRES_IN: positiveInt,

    // COOKIE
    COOKIE_PATH: path,
    COOKIE_REFRESH_PATH: path,
    COOKIE_SAME_SITE: z.enum(['strict', 'lax', 'none']),
  })
  .superRefine((config, ctx) => {
    if (config.ACCESS_TOKEN_SECRET === config.REFRESH_TOKEN_SECRET) {
      ctx.addIssue({ code: 'custom', path: ['REFRESH_TOKEN_SECRET'], message: 'must differ from JWT_ACCESS_SECRET' });
    }

    if (config.COOKIE_SAME_SITE === 'none' && config.NODE_ENV !== 'production') {
      ctx.addIssue({
        code: 'custom',
        path: ['COOKIE_SAME_SITE'],
        message: '"none" requires secure cookies (NODE_ENV=production)',
      });
    }
  });

export type TEnvConfig = z.infer<typeof appConfigSchema>;