import { ConfigService } from '@nestjs/config';

export const jwtFactory = async (configService: ConfigService) => ({
  secret: configService.get('jwt.secret')!,
  signOptions: { expiresIn: configService.get('jwt.expiresIn')! },
});
