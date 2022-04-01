import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { IUpdateOrderDTO } from "@modules/orders/dtos/IUpdateOrderDTO";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { getRepository, Repository } from "typeorm";
import { Order } from "../entities/Order";

export class OrdersRepository implements IOrdersRepository{
  repository: Repository<Order>;

  constructor(){
    this.repository = getRepository(Order);
  }

  async create({customer_id, sales, total}: ICreateOrderDTO): Promise<Order> {
    const order = this.repository.create({customer_id, total, sales});

    await this.repository.save(order);

    return order;
  }

  async list(): Promise<Order[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Order> {
    return await this.repository.findOne(id);
  }

  async update({id, customer_id,sales, total}: IUpdateOrderDTO): Promise<Order> {
    const order = this.repository.create({
      id, customer_id,sales, total
    })

    await this.repository.save(order)

    return order;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
