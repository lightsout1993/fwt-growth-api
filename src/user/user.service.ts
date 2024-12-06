import * as bcrypt from 'bcrypt';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import type { IUserCreate, IUserRegister } from './user.types';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: IUserCreate) {
    return this.usersRepository.save(user);
  }

  // TODO: убрать метод и создать метод добавления новых пользователей
  async register(user: IUserRegister) {
    const existingUser = await this.findOneByEmail(user.email);

    if (existingUser) {
      throw new UnauthorizedException('Такой email уже существует!');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.password, salt);

    return this.create({ ...user, salt, password: passwordHash });
  }

  async validateUserPassword({ email, password }: IUserRegister) {
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Пользователь с таким email не найден!');
    }

    const passwordHash = await bcrypt.hash(password, user.salt);

    if (user.password !== passwordHash) {
      throw new UnauthorizedException('Неверный пароль!');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: Equal(email) });
  }
}
