import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import fastifyCookie from '@fastify/cookie';
import { AppModule } from './app.module';

type Adapter = Parameters<typeof NestFactory.create>[1];

const createApp = async <T extends INestApplication>(adapter: Adapter) =>
  NestFactory.create<T>(AppModule, adapter);

const bootstrap = async () => {
  const adapter = new FastifyAdapter();
  const app = await createApp<NestFastifyApplication>(adapter);

  await app.register(fastifyCookie);
  await app.enableCors();

  await app.listen(3000);
};

bootstrap();
