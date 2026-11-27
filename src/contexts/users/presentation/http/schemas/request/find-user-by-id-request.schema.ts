import { z } from 'zod';

export const findUserByIdRequestSchema = z.cuid2();