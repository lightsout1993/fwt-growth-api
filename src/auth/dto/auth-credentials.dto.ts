import { IsEnum, IsOptional, IsString, Matches, MinLength } from 'class-validator';

import { Role } from '@/role/role.enum';
import {
  isStringError,
  invalidEmailError,
  incorrectUserRoleError,
  minLengthPasswordError,
} from '@/common/validate.messages';
import { EMAIL_REGEXP, MIN_PASSWORD_LENGTH } from '@/common/common.constants';

export class AuthCredentialsDto {
  @IsString({ message: isStringError })
  @Matches(EMAIL_REGEXP, { message: invalidEmailError })
  email: string;

  @IsString({ message: isStringError })
  @MinLength(MIN_PASSWORD_LENGTH, { message: minLengthPasswordError })
  password: string;

  @IsString({ message: isStringError })
  fingerprint: string;

  @IsOptional()
  @IsEnum(Role, { message: incorrectUserRoleError })
  role?: Role;
}
