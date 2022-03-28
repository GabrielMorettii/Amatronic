import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrders1648483743330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`
          },
          {
            name: 'customer_id',
            type: 'uuid'
          },
          {
            name: 'total',
            type: 'decimal',
            precision: 8,
            scale: 2
          },
          {
            name: 'order_date',
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
        'orders',
        new TableForeignKey({
          name: 'FKCustomerOrder',
          referencedTableName: 'customers',
          referencedColumnNames: ['id'],
          columnNames: ['customer_id'],
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders', 'FKCustomerOrder')

      await queryRunner.dropTable('orders')
    }

}
