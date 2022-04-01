import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { ISales } from "@modules/orders/dtos/ICreateOrderDTO";
import { Order } from "@modules/orders/infra/typeorm/entities/Order";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { ISalesRepository } from "@modules/orders/repositories/ISalesRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListOrdersUseCase{
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ){}

  async execute(): Promise<Order[]> {
    const orders = await this.ordersRepository.list();

    return orders;
  }
}
