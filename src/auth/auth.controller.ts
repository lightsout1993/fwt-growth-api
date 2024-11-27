import type { FastifyRequest, FastifyReply } from 'fastify';
import { Req, Res, Body, Post, Controller, ValidationPipe, HttpCode } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { clearCookie, COOKIE_KEY, setCookie } from './token.cookie';
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
    setCookie(reply, refreshToken);

    return { accessToken };
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body(ValidationPipe) loginCredentials: AuthCredentialsDto,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(loginCredentials);
    setCookie(reply, refreshToken);

    return { accessToken };
  }

  @Post('refresh')
  async refresh(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body(ValidationPipe) { fingerprint }: RefreshCredentialsDto,
  ) {
    const token = request.cookies[COOKIE_KEY];

    const { accessToken, refreshToken } = await this.authService.refresh(fingerprint, token);
    setCookie(reply, refreshToken);

    return { accessToken };
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() request: FastifyRequest, @Res({ passthrough: true }) reply: FastifyReply) {
    const token = request.cookies[COOKIE_KEY];

    clearCookie(reply);
    if (token) await this.authService.logout(token);
  }
}
