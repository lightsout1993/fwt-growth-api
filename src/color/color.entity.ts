import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@/common/base.entity';

@Entity()
export class Color extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  hex: string;
}
