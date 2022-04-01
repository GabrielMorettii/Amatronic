import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class OrderGoods1648748606470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'sales',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`
          },
          {
            name: 'good_id',
            type: 'uuid'
          },
          {
            name: 'orderId',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'quantity',
            type: 'int'
          },
          {
            name: 'val_unit',
            type: 'decimal',
            precision: 6,
            scale: 2,
          },
          {
            name: 'totalValue',
            type: 'decimal',
            precision: 8,
            scale: 2,
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
        'sales',
        new TableForeignKey({
          name: 'FKGoodsOrder',
          referencedTableName: 'goods',
          referencedColumnNames: ['id'],
          columnNames: ['good_id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        })
      );

      await queryRunner.createForeignKey(
        'sales',
        new TableForeignKey({
          name: 'FKOrderGoods',
          referencedTableName: 'orders',
          referencedColumnNames: ['id'],
          columnNames: ['orderId'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey(
        'sales',
        'FKOrderGoods'
      );

      await queryRunner.dropForeignKey(
        'sales',
        'FKGoodsOrder'
      );
      await queryRunner.dropTable('sales');
    }

}
