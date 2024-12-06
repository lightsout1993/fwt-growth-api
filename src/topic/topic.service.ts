import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ColorService } from '@/color/color.service';

import type { ITopicCreate, ITopicDelete, ITopicUpdate } from './topic.types';
import { Topic } from './topic.entity';

@Injectable()
export class TopicService {
  constructor(
    private readonly colorService: ColorService,
    @InjectRepository(Topic) private topicRepository: Repository<Topic>,
  ) {}

  async getAll() {
    return this.topicRepository.find({ relations: ['tags'] });
  }

  async create({ color: hex, name }: ITopicCreate) {
    const color = await this.colorService.create(hex);

    return this.topicRepository.save({ color, name });
  }

  async update({ id, color: hex, name }: ITopicUpdate) {
    const topic = await this.topicRepository.findOneBy({ id });

    if (!topic) throw new NotFoundException('Тема не найдена');

    if (hex) topic.color = await this.colorService.update(topic.color.id, hex);

    return this.topicRepository.update(topic.id, { ...topic, name });
  }

  async remove({ id }: ITopicDelete) {
    await this.topicRepository.delete(id);

    return id;
  }
}
