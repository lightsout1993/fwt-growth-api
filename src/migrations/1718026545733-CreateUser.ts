import { MigrationInterface, QueryRunner } from 'typeorm';

import { Role } from '@/role/role.enum';

import createTable from './utils/createTable';

export class CreateUser1718026545733 implements MigrationInterface {
  name = 'CreateUser1718026545733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = createTable({
      name: 'user',
      columns: [
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'firstname',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'lastname',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'salt',
          type: 'varchar',
        },
        {
          name: 'role',
          type: 'enum',
          default: `'${Role.TECHLEAD}'`,
          enum: [Role.MANAGER, Role.TECHLEAD, Role.DEVELOPER],
        },
      ],
    });

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
