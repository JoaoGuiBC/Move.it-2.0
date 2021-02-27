import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1614422915822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'username',
          type: 'varchar'
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'imagePath',
          type: 'varchar',
        },
        {
          name: 'level',
          type: 'integer',
          default: 1,
        },
        {
          name: 'currentExperience',
          type: 'integer',
          default: 0,
        },
        {
          name: 'challengesCompleted',
          type: 'integer',
          default: 0,
        },
      ]
    }));
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
