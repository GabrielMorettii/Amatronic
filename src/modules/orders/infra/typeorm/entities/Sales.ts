import { Good } from "@modules/goods/infra/typeorm/entities/Good";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidV4} from 'uuid'
import { Order } from "./Order";

@Entity('sales')
class Sales{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order=> order.sales)
  @JoinColumn({ name: "order_id"})
  order: Order

  @Column('uuid')
  order_id: string;

  @Column('uuid')
  good_id: string;

  @ManyToOne(() => Good, {eager: true})
  @JoinColumn({name: 'good_id'})
  good: Good

  @Column({
    type: "decimal",
    precision: 6,
    scale: 2
  })
  val_unit: number;

  @Column()
  quantity: number;

  @Column({
    type: "decimal",
    precision: 8,
    scale: 2
  })
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuidV4();
    }
  }
}

export {Sales}
