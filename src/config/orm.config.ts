import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { databaseConfig } from './database.config';

config();

export default new DataSource({
  ...databaseConfig(),
  migrations: [`${__dirname}/../migrations/*.ts`],
});
