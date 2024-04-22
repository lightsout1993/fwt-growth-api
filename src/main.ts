import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

type Adapter = Parameters<typeof NestFactory.create>[1];

const createApp = async <T extends INestApplication>(adapter: Adapter) =>
  await NestFactory.create<T>(AppModule, adapter);

const bootstrap = async () => {
  const adapter: Adapter = new FastifyAdapter();
  const app: INestApplication = await createApp(adapter);

  await app.listen(3000);
};

bootstrap();
