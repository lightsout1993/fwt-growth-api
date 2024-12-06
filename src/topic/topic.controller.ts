import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';

import { TopicDto } from './dto/topic.dto';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.topicService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(ValidationPipe) topic: TopicDto) {
    return this.topicService.create(topic);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body(ValidationPipe) topic: TopicDto) {
    return this.topicService.update({ id, ...topic });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.topicService.remove({ id });
  }
}
