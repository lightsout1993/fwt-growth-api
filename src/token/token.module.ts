import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Token } from './token.entity';
import { TokenService } from './token.service';

@Module({
  exports: [TokenService],
  providers: [TokenService],
  imports: [TypeOrmModule.forFeature([Token])],
})
export class TokenModule {}
