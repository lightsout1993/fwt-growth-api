import { Role } from './role.enum';

interface UserWithRole {
  role: Role;
}

export interface RequestWithRole {
  user: UserWithRole;
}
