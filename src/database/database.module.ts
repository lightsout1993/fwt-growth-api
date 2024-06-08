import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import useFactory from './database.factory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
