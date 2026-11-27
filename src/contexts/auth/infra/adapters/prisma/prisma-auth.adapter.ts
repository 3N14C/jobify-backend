import { Injectable } from '@nestjs/common';
import { AuthPort } from '../../../application/ports/auth.port.js';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service.js';

@Injectable()
export class PrismaAuthAdapter implements AuthPort {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(): Promise<void> {}

  async signIn(): Promise<void> {}
}