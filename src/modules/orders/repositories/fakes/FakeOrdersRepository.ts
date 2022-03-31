import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
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
}

export {FakeOrdersRepository}
