import { IsString } from 'class-validator';

import { stringError } from '@/common/validate.messages';

export class TopicDto {
  @IsString({ message: stringError() })
  name: string;

  @IsString({ message: stringError() })
  color: string;
}
