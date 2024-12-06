import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ColorService } from '@/color/color.service';

import type { ITagCreate, ITagDelete, ITagUpdate } from './tag.types';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    private readonly colorService: ColorService,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
  ) {}

  async getAll() {
    return this.tagRepository.find();
  }

  async create({ color: hex, name, topicId }: ITagCreate) {
    const color = await this.colorService.create(hex);

    return this.tagRepository.save({ color, name, topic: { id: topicId } });
  }

  async update({ id, color: hex, name, topicId }: ITagUpdate) {
    const tag = await this.tagRepository.findOneBy({ id });

    if (!tag) throw new NotFoundException('Тэг не найден');

    if (hex) tag.color = await this.colorService.update(tag.color.id, hex);

    return this.tagRepository.update(tag.id, { ...tag, name, topic: { id: topicId } });
  }

  async remove({ id }: ITagDelete) {
    await this.tagRepository.delete({ id: Equal(id) });

    return id;
  }
}
