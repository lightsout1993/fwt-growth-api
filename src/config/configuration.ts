import type IConfig from './config.interface';

import databaseConfig from './database.config';

const configuration = (): IConfig => ({
  database: databaseConfig(),
});

export default configuration;
