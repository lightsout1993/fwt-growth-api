const databaseConfig = () => ({
  type: 'postgres' as const,
  entities: [`${__dirname}/../entities/*.ts`],
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  username: process.env.DB_USERNAME as string,
  port: parseInt(process.env.DB_PORT!, 10) || 5432,
});

export default databaseConfig;
