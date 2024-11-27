import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'now()',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'now()',
    onUpdate: 'now()',
  })
  public updated_at: Date;
}
