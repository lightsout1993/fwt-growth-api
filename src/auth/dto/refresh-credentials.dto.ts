import { IsString } from 'class-validator';

import { stringError } from '@/common/validate.messages';

export class RefreshCredentialsDto {
  @IsString({ message: stringError() })
  fingerprint: string;
}
