import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
