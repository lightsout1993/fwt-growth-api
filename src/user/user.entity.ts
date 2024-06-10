import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Role from '@/role/role.enum';
import Token from '@/token/token.entity';
import BaseEntity from '@/common/base.entity';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.DEVELOPER,
  })
  role: Role;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}

export default User;
