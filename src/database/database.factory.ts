import type { ConfigService } from '@nestjs/config';

const databaseFactory = (configService: ConfigService) => configService.get('database');

export default databaseFactory;
