export interface IUserRegister {
  email: string;
  password: string;
}

export interface IUserCreate {
  salt: string;
  email: string;
  password: string;
}
