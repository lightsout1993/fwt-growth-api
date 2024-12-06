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

import { TagDto } from './dto/tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.tagService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(ValidationPipe) tag: TagDto) {
    return this.tagService.create(tag);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body(ValidationPipe) tag: TagDto, @Param('id') id: number) {
    return this.tagService.update({ id, ...tag });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tagService.remove({ id });
  }
}
