import { IsString } from 'class-validator';

import { isStringError } from '@/common/validate.messages';

export class RefreshCredentialsDto {
  @IsString({ message: isStringError })
  fingerprint: string;
}
