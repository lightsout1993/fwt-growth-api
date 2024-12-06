import { MigrationInterface, QueryRunner } from 'typeorm';

import createTable from './utils/createTable';

export class CreateTopic1733242632132 implements MigrationInterface {
  name = 'CreateTopic1733242632132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = createTable({
      name: 'topic',
      columns: [
        {
          name: 'name',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'color',
          type: 'varchar',
          isUnique: true,
          isNullable: true,
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('topic');
  }
}
