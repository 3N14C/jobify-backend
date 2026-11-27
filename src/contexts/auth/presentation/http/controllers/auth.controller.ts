import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { SignUpUseCase } from '../../../application/use-cases/sign-up.use-case.js';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { signUpRequestSchema, type TSignUpRequest } from '../schemas/request/sign-up-request.schema.js';
import { CookiesService } from '../cookies/cookies.service.js';
import { type Response } from 'express';
import { signInRequestSchema, type TSignInRequest } from '../schemas/request/sign-in-request.schema.js';
import { SignInUseCase } from '../../../application/use-cases/sign-in.use-case.js';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly cookies: CookiesService,
  ) {}

  @Post('sign-up')
  @ApiOperation({ operationId: 'signUp', summary: 'Registration user' })
  @ApiOkResponse({ description: 'Sign up' })
  async signUp(
    @Body({ schema: signUpRequestSchema }) dto: TSignUpRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const tokens = await this.signUpUseCase.execute(dto);

    this.cookies.saveTokens(res, tokens);

    return {
      message: 'Authorized successfully',
    };
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'signIn', summary: 'Login user' })
  @ApiOkResponse({ description: 'Sign in' })
  async signIn(
    @Body({ schema: signInRequestSchema }) dto: TSignInRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const tokens = await this.signInUseCase.execute(dto);

    this.cookies.saveTokens(res, tokens);

    return {
      message: 'Authorized successfully',
    };
  }
}