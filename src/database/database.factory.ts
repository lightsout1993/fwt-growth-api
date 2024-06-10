import type { ConfigService } from '@nestjs/config';

const databaseFactory = (configService: ConfigService) => ({
  host: configService.get('database.host'),
  port: configService.get('database.port'),
  type: configService.get('database.type'),
  database: configService.get('database.database'),
  entities: configService.get('database.entities'),
  password: configService.get('database.password'),
  username: configService.get('database.username'),
});

export default databaseFactory;
