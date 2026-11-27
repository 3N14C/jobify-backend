import { Test } from '@nestjs/testing';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { OpenAPIObject, SchemaObject } from '@nestjs/swagger';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/configure-app.js';
import type { TUser } from '../src/contexts/users/domain/entities/user.entity.js';
import { UsersPort } from '../src/contexts/users/application/ports/users.port.js';
import { userResponseSchema } from '../src/contexts/users/presentation/http/schemas/response/user-response.schema.js';
import { PrismaService } from '../src/shared/infra/prisma/prisma.service.js';

describe('Users HTTP API and OpenAPI', () => {
  let app: NestExpressApplication;
  const findAll = vi.fn<UsersPort['findAll']>();
  const findById = vi.fn<UsersPort['findById']>();
  const user: TUser = {
    id: 'tz4a98xxat96iws9zmbrgj3a',
    name: 'Test User',
    email: 'test@example.com',
    hashedPassword: 'private-password-hash',
    createdAt: new Date('2026-11-27T00:00:00.000Z'),
    updatedAt: new Date('2026-11-27T01:00:00.000Z'),
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersPort)
      .useValue({ findAll, findById })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    configureApp(app);
    await app.init();
  });

  beforeEach(() => {
    findAll.mockReset().mockResolvedValue([user]);
    findById.mockReset().mockResolvedValue(user);
  });

  it('returns only public fields with an ISO date on GET /api/v1/users', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/users').expect(200);

    expect(response.body).toEqual([
      {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
      },
    ]);
    expect(userResponseSchema.array().safeParse(response.body).success).toBe(true);
    expect(response.text).not.toContain(user.hashedPassword);
  });

  it('returns an empty JSON array when there are no users', async () => {
    findAll.mockResolvedValue([]);

    await request(app.getHttpServer()).get('/api/v1/users').expect(200, []);
  });

  it('returns the same public JSON shape for a single user', async () => {
    const response = await request(app.getHttpServer()).get(`/api/v1/users/${user.id}`).expect(200);

    expect(findById).toHaveBeenCalledWith(user.id);
    expect(response.body).toEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    });
    expect(userResponseSchema.safeParse(response.body).success).toBe(true);
    expect(response.text).not.toContain(user.hashedPassword);
  });

  it('keeps the API prefix and URI version', async () => {
    await request(app.getHttpServer()).get('/users').expect(404);
  });

  it('serves Swagger UI', async () => {
    const response = await request(app.getHttpServer()).get('/docs').expect(200);

    expect(response.text).toContain('swagger-ui');
  });

  it('documents the versioned route and the actual JSON response for Orval', async () => {
    const response = await request(app.getHttpServer()).get('/openapi.json').expect(200);
    const document = response.body as OpenAPIObject;
    const operation = document.paths['/api/v1/users'].get!;
    const ok = operation.responses['200'];

    expect(document.openapi).toMatch(/^3\./);
    expect(operation.operationId).toBe('usersList');
    expect(operation.tags).toEqual(['users']);
    expect(ok).toHaveProperty('content.application/json');
    if (!ok || '$ref' in ok) throw new Error('Expected an inline response');
    const schema = ok.content!['application/json'].schema as SchemaObject;
    const itemSchema = schema.items!;
    const item = (
      '$ref' in itemSchema
        ? document.components?.schemas?.[itemSchema.$ref.replace('#/components/schemas/', '')]
        : itemSchema
    ) as SchemaObject;

    expect(schema.type).toBe('array');
    expect(item.required).toEqual(expect.arrayContaining(['id', 'name', 'email', 'createdAt']));
    expect(Object.keys(item.properties!).sort()).toEqual(['createdAt', 'email', 'id', 'name']);
    expect(item.properties!.createdAt).toMatchObject({ type: 'string', format: 'date-time' });
    expect(item.properties!.email).toMatchObject({ type: 'string', format: 'email' });
    expect(JSON.stringify(document)).not.toContain('hashedPassword');
  });

  afterAll(async () => {
    await app.close();
  });
});