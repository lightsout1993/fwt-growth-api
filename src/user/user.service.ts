import * as bcrypt from 'bcrypt';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import type { IUser } from './user.interface';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: IUser) {
    const user = Object.assign(new User(), userData);

    return this.usersRepository.save(user);
  }

  // TODO: убрать метод и создать метод добавления новых пользователей
  async register(userData: IUser) {
    const { email, password } = userData;

    const user = await this.findOneByEmail(email);

    if (user) {
      throw new UnauthorizedException('Такой email уже существует!');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    return this.create({ ...userData, salt, password: passwordHash });
  }

  async validateUserPassword({ email, password }: IUser) {
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
