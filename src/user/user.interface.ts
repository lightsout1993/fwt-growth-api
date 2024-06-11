import { Role } from '@/role/role.enum';

export interface IUser {
  role?: Role;
  salt?: string;
  email: string;
  password: string;
  lastname?: string;
  firstname?: string;
}
