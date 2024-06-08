import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import ConfigModule from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [ConfigModule, DatabaseModule],
})
export class AppModule {}
