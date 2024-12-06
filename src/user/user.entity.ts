import { Column, Entity, OneToMany } from 'typeorm';

import { Role } from '@/role/role.enum';
import { Token } from '@/token/token.entity';
import { BaseEntity } from '@/common/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.TECHLEAD,
  })
  role: Role;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  salt: string;

  @Column({ type: 'varchar', nullable: true })
  firstname: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
