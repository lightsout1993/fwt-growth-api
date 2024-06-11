import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@/user/user.module';
import { TokenModule } from '@/token/token.module';

import { AuthService } from './auth.service';
import { JWTProvider } from './jwt/jwt.provider';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    TokenModule,
    JwtModule.registerAsync(JWTProvider),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class AuthModule {}
