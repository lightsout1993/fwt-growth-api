import RoleEnum from './role.enum';

interface UserWithRole {
  role: RoleEnum;
}

export interface RequestWithRole {
  user: UserWithRole;
}
