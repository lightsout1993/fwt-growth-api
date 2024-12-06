import { Column, Entity, ManyToOne } from 'typeorm';

import { User } from '@/user/user.entity';
import { BaseEntity } from '@/common/base.entity';

@Entity()
export class Token extends BaseEntity {
  @Column({ type: 'varchar' })
  refreshToken: string;

  @Column({ type: 'varchar' })
  fingerprint: string;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
