import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';

import { Color } from '@/color/color.entity';

@Injectable()
export class ColorService {
  constructor(@InjectRepository(Color) private colorRepository: Repository<Color>) {}

  async get(hex: string) {
    return this.colorRepository.findOneBy({ hex });
  }

  async create(hex: string) {
    const color = await this.get(hex);

    if (color) throw new ConflictException('Такой цвет уже существует');

    return this.colorRepository.create({ hex });
  }

  async update(id: number, hex: string) {
    const color = await this.get(hex);

    if (color) await this.colorRepository.delete(id);

    return this.colorRepository.create({ hex });
  }

  async remove(id: number) {
    return this.colorRepository.delete(id);
  }
}
