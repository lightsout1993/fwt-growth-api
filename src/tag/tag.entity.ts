import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { Color } from '@/color/color.entity';
import { Topic } from '@/topic/topic.entity';
import { BaseEntity } from '@/common/base.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @ManyToOne(() => Topic, (topic) => topic.id)
  @JoinColumn()
  topic: Topic;

  @OneToOne(() => Color, { cascade: true, eager: true })
  @JoinColumn()
  color: Color;
}
