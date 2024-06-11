import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { configuration } from './configuration';

export const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
  envFilePath: ['.env', '.env.development', '.env.production'],
});
