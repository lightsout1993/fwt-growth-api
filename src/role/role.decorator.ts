import { SetMetadata } from '@nestjs/common';

import { Role } from './role.enum';
import { ROLES_KEY } from './role.constants';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
