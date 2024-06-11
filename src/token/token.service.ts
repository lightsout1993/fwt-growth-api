import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { IToken } from './token.interface';

import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(@InjectRepository(Token) private tokenRepository: Repository<Token>) {}

  async create(id: number, tokenData: IToken) {
    const tokens = await this.tokenRepository.find({ where: { user: { id } } });

    if (tokens.length >= 5) {
      this.tokenRepository.delete({ refreshToken: tokens[0].refreshToken });
    }

    return this.tokenRepository.save({ ...tokenData, user: { id } });
  }

  async check({ fingerprint, refreshToken }: Partial<IToken>) {
    const token = await this.tokenRepository.findOneBy({ refreshToken, fingerprint });

    if (!token) return false;
    if (token.fingerprint !== fingerprint) this.tokenRepository.delete(token);

    return true;
  }

  async update(refreshToken: string, tokenData: IToken) {
    await this.tokenRepository.update({ refreshToken }, tokenData);
  }

  async remove(refreshToken: string) {
    await this.tokenRepository.delete({ refreshToken });
  }
}
