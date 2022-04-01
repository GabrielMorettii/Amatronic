import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { IUpdateOrderDTO } from "@modules/orders/dtos/IUpdateOrderDTO";
import { Order } from "@modules/orders/infra/typeorm/entities/Order";
import { IOrdersRepository } from "../IOrdersRepository";

class FakeOrdersRepository implements IOrdersRepository{
  repository: Order[] = [];

  async create({customer_id, sales, total }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, {customer_id, sales, total});

    this.repository.push(order);

    return order;
  }

  async list(): Promise<Order[]> {
    return this.repository
  }

  async findById(id: string): Promise<Order> {
    return this.repository.find(order => order.id === id);
  }
  async update({id, customer_id,sales, total}: IUpdateOrderDTO): Promise<Order> {
    const order = await this.findById(id);

    Object.assign(order, {customer_id, sales, total});

    return order;
  }

  async delete(id: string): Promise<void> {
    const indexOrder = this.repository.findIndex(Order => Order.id === id)

     this.repository.splice(indexOrder, 1)
  }
}

export {FakeOrdersRepository}
