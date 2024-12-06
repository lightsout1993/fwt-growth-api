import {
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
} from 'class-validator';

import { Role } from '@/role/role.enum';
import { EMAIL_REGEXP, MIN_PASSWORD_LENGTH } from '@/common/common.constants';
import {
  stringError,
  incorrectError,
  invalidError,
  shortError,
  strongPasswordError,
} from '@/common/validate.messages';

export class AuthCredentialsDto {
  @IsString({ message: stringError() })
  @Matches(EMAIL_REGEXP, { message: invalidError() })
  email: string;

  @IsString({ message: stringError() })
  @MinLength(MIN_PASSWORD_LENGTH, { message: shortError(MIN_PASSWORD_LENGTH) })
  @IsStrongPassword(
    { minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: strongPasswordError },
  )
  password: string;

  @IsString({ message: stringError() })
  fingerprint: string;

  @IsOptional()
  @IsEnum(Role, { message: incorrectError() })
  role?: Role;
}
