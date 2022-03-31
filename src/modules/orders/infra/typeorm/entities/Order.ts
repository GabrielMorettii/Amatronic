import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { Good } from "@modules/goods/infra/typeorm/entities/Good";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidV4} from 'uuid'
import { Sales } from "./Sales";

@Entity('orders')
class Order{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({name: 'customer_id'})
  customer: Customer

  @Column({
    type: "decimal",
    precision: 8,
    scale: 2
  })
  total: number;

  @OneToMany(()=> Sales, sales=> sales.order)
  @JoinColumn()
  sales: Sales[];

  @Column()
  order_date: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuidV4();
    }
  }
}

export {Order}
