import { Injectable } from '@nestjs/common';
import { UsersPort } from '../../../application/ports/users.port.js';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service.js';
import type { TUser } from '../../../domain/entities/user.entity.js';

@Injectable()
export class PrismaUsersAdapter implements UsersPort {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<TUser[]> {
    return this.prisma.user.findMany();
  }

  findById(id: string): Promise<TUser | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}