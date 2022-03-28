import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { Order } from "@modules/orders/infra/typeorm/entities/Order";
import { IOrdersRepository } from "../IOrdersRepository";

class FakeOrdersRepository implements IOrdersRepository{
  repository: Order[] = [];

  async create({user_id, total, order_data}: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, {user_id, total, order_data});

    this.repository.push(order);

    return order;
  }
}

export {FakeOrdersRepository}
