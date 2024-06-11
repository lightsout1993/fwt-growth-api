import { ConfigService } from '@nestjs/config';

import { jwtFactory } from './jwt.factory';
import { JwtStrategy } from './jwt.strategy';

export const JWTProvider = {
  useFactory: jwtFactory,
  inject: [ConfigService],
  providers: [JwtStrategy],
};
