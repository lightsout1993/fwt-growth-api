import { ConfigModule as NestConfigModule } from '@nestjs/config';

import configuration from './configuration';

const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
  envFilePath: ['.env', '.env.development', '.env.production'],
});

export default ConfigModule;
