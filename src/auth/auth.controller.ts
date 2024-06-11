import type { FastifyRequest, FastifyReply } from 'fastify';
import { Req, Res, Body, Post, Controller, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RefreshCredentialsDto } from './dto/refresh-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO: убрать метод и создать метод добавления новых пользователей
  @Post('register')
  async register(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body(ValidationPipe) authCredentials: AuthCredentialsDto,
  ) {
    const { accessToken, refreshToken } = await this.authService.register(authCredentials);

    this.cookie(reply, refreshToken);

    return { accessToken };
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body(ValidationPipe) loginCredentials: AuthCredentialsDto,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(loginCredentials);

    this.cookie(reply, refreshToken);

    return { accessToken };
  }

  @Post('refresh')
  async refresh(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body(ValidationPipe) { fingerprint }: RefreshCredentialsDto,
  ) {
    const oldRefreshToken = request.cookies.refreshToken;

    const { accessToken, refreshToken } = await this.authService.refresh(
      fingerprint,
      oldRefreshToken,
    );

    this.cookie(reply, refreshToken);

    return { accessToken };
  }

  @Post('logout')
  async logout(@Req() request: FastifyRequest, @Res({ passthrough: true }) reply: FastifyReply) {
    const refreshToken = request.cookies.refreshToken as string;

    this.authService.logout(refreshToken);

    reply.clearCookie('refreshToken', { httpOnly: true });
  }

  private cookie(reply: FastifyReply, refreshToken: string) {
    reply.cookie('refreshToken', refreshToken, { httpOnly: true });
  }
}
