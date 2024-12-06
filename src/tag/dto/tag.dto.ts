import { IsInt, IsString, Min } from 'class-validator';

import { identifierError, minError, stringError } from '@/common/validate.messages';

export class TagDto {
  @IsString({ message: stringError() })
  name: string;

  @IsInt({ message: identifierError() })
  @Min(1, { message: minError() })
  topicId: number;

  @IsString({ message: stringError() })
  color: string;
}
