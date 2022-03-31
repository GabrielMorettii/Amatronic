import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateGoodImages1648676968464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'good_images',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'good_id',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }))

      await queryRunner.createForeignKey(
        'good_images',
        new TableForeignKey({
          name: 'FKGoodImage',
          referencedTableName: 'goods',
          referencedColumnNames: ['id'],
          columnNames: ['good_id'],
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        })
      );

    }


    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('good_images', 'FKGoodImage');
      await queryRunner.dropTable('good_images');
    }

}
