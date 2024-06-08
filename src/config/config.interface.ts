export interface IDatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  database: string;
  password: string;
  username: string;
}

interface IConfig {
  database: IDatabaseConfig;
}

export default IConfig;
