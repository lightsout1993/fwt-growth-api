export interface IDatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  database: string;
  password: string;
  username: string;
}

export interface IJWTConfig {
  secret: string;
  expiresIn: string;
}

export interface IConfig {
  jwt: IJWTConfig;
  database: IDatabaseConfig;
}
