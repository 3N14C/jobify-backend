import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllUsersUseCase } from '../../../application/use-cases/find-all-users.use-case.js';
import type { TUserResponse } from '../schemas/user-response.schema.js';
import { userResponseSchema } from '../schemas/user-response.schema.js';
import { FindUserByIdUseCase } from '../../../application/use-cases/find-user-by-id.use-case.js';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly findAllUseCase: FindAllUsersUseCase,
    private readonly findByIdUseCase: FindUserByIdUseCase,
  ) {}

  @Get()
  @ApiOperation({ operationId: 'usersList', summary: 'List users' })
  @ApiOkResponse({
    description: 'Users with public fields only.',
    standardSchema: userResponseSchema,
    isArray: true,
  })
  async findAll(): Promise<TUserResponse[]> {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'userById', summary: 'Get user by id' })
  @ApiOkResponse({
    description: 'User with given id',
    standardSchema: userResponseSchema,
  })
  async findById(@Param('id') id: string): Promise<TUserResponse> {
    return this.findByIdUseCase.execute(id);
  }
}
