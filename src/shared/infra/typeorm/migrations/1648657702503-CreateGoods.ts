import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateGoods1648657702503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'goods',
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
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'amount',
            type: 'int'
          },
          {
            name: 'brand_id',
            type: 'uuid'
          },
          {
            name: 'category_id',
            type: 'uuid'
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 6,
            scale: 2
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
        'goods',
        new TableForeignKey({
          name: 'FKGoodBrand',
          referencedTableName: 'brands',
          referencedColumnNames: ['id'],
          columnNames: ['brand_id'],
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        })
      );

      await queryRunner.createForeignKey(
        'goods',
        new TableForeignKey({
          name: 'FKGoodCategory',
          referencedTableName: 'categories',
          referencedColumnNames: ['id'],
          columnNames: ['category_id'],
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('goods', 'FKGoodCategory');
      await queryRunner.dropForeignKey('goods', 'FKGoodBrand');
      await queryRunner.dropTable('goods');
    }

}
