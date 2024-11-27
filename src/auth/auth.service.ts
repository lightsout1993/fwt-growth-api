import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '@/user/user.service';
import { TokenService } from '@/token/token.service';

import type { JwtPayload } from './jwt/jwt-payload.interface';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  // TODO: убрать метод и создать метод добавления новых пользователей
  async register(authCredentials: AuthCredentialsDto) {
    const { email, fingerprint } = authCredentials;

    const user = await this.userService.register(authCredentials);
    const tokens = this.createTokens({ email });

    this.tokenService.create(user.id, { fingerprint, refreshToken: tokens.refreshToken });

    return tokens;
  }

  async login({ fingerprint, email, password }: AuthCredentialsDto) {
    const user = await this.userService.validateUserPassword({ email, password });

    const tokens = this.createTokens({ email });

    await this.tokenService.create(user.id, { fingerprint, refreshToken: tokens.refreshToken });

    return tokens;
  }

  async refresh(fingerprint: string, refreshToken?: string) {
    const isChecked = await this.tokenService.check({ fingerprint, refreshToken });

    if (!isChecked) {
      throw new UnauthorizedException(
        'Аутентифицируйтесь, refresh токен не передан или не найден!',
      );
    }

    let email: string;

    try {
      email = this.jwtService.verify<JwtPayload>(refreshToken!).email;
    } catch {
      throw new UnauthorizedException('Аутентифицируйтесь, refresh токен невалиден или истек!');
    }

    const tokens = this.createTokens({ email });
    await this.tokenService.update(refreshToken!, {
      fingerprint,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async logout(refreshToken: string) {
    await this.tokenService.remove(refreshToken);
  }

  async validateUser({ email }: JwtPayload) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Пользователь не авторизован!');
    }

    return user;
  }

  private createTokens(jwtPayload: JwtPayload): { accessToken: string; refreshToken: string } {
    const accessToken = this.jwtService.sign(jwtPayload, { expiresIn: '1s' });
    const refreshToken = this.jwtService.sign(jwtPayload, { expiresIn: '3d' });

    // Для избежания коллизии токенов регенерируем их, если они одинаковые
    return accessToken !== refreshToken
      ? { accessToken, refreshToken }
      : this.createTokens(jwtPayload);
  }
}
