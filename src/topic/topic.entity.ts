import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { Tag } from '@/tag/tag.entity';
import { Color } from '@/color/color.entity';
import { BaseEntity } from '@/common/base.entity';

@Entity()
export class Topic extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @OneToMany(() => Tag, (tag) => tag.id)
  tags: Tag[];

  @OneToOne(() => Color, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  color: Color;
}
