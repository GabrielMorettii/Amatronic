import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidV4} from 'uuid'
import { Brand } from "./Brand";
import { Category } from "./Category";
import { GoodImage } from "./GoodImage";

@Entity('goods')
class Good{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column({
    type: "decimal",
    precision: 6,
    scale: 2
  })
  price: number;

  @ManyToOne(()=>Brand)
  @JoinColumn({ name: "brand_id"})
  brand: Brand;

  @Column()
  brand_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id"})
  category: Category;

  @Column()
  category_id: string;

  @OneToMany(() => GoodImage, GoodImage => GoodImage.good)
  good_image: GoodImage[]

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

export {Good}
