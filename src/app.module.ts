import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';
import { TokenModule } from '@/token/token.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [ConfigModule, DatabaseModule, TokenModule, UserModule, AuthModule],
})
export class AppModule {}
