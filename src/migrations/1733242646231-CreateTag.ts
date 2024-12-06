import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

import createTable from './utils/createTable';

export class CreateTag1733242646231 implements MigrationInterface {
  name = 'CreateTag1733242646231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = createTable({
      name: 'tag',
      columns: [
        {
          name: 'name',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'topicId',
          type: 'int',
        },
      ],
    });

    await queryRunner.createTable(table);

    await queryRunner.createForeignKey(
      'tag',
      new TableForeignKey({
        columnNames: ['topicId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'topic',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tag');

    const foreignKey = table?.foreignKeys.find((fk) => fk.columnNames.indexOf('topicId') !== -1);
    if (foreignKey) await queryRunner.dropForeignKey('tag', foreignKey);

    await queryRunner.dropTable('tag');
  }
}
