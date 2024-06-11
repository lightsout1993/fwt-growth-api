import type { IConfig } from './config.interface';

import { jwtConfig } from './jwt.config';
import { databaseConfig } from './database.config';

export const configuration = (): IConfig => ({
  jwt: jwtConfig(),
  database: databaseConfig(),
});
