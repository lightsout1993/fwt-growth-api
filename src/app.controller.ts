import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/main')
  getHello(): string {
    return this.appService.getHello();
  }
}
