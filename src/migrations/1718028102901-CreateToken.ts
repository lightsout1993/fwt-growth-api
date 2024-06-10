import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

import createTable from './utils/createTable';

export class CreateToken1718028102901 implements MigrationInterface {
  name = 'CreateToken1718028102901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = createTable({
      name: 'token',
      columns: [
        {
          name: 'fingerprint',
          type: 'varchar',
        },
        {
          name: 'refreshToken',
          type: 'varchar',
        },
        {
          name: 'userId',
          type: 'int',
        },
      ],
    });

    await queryRunner.createTable(table);

    await queryRunner.createForeignKey(
      'token',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('token');

    const foreignKey = table?.foreignKeys.find((fk) => fk.columnNames.indexOf('userId') !== -1);
    if (foreignKey) await queryRunner.dropForeignKey('token', foreignKey);

    await queryRunner.dropTable('token');
  }
}
