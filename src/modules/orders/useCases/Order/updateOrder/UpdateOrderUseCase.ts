import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { ISales } from "@modules/orders/dtos/ICreateOrderDTO";
import { IUpdateOrderDTO } from "@modules/orders/dtos/IUpdateOrderDTO";
import { Order } from "@modules/orders/infra/typeorm/entities/Order";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { ISalesRepository } from "@modules/orders/repositories/ISalesRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateOrderUseCase{
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository| any,
    @inject('SalesRepository')
    private salesRepository: ISalesRepository| any,
  ){}

  async execute({id, customer_id,sales}: IUpdateOrderDTO): Promise<Order> {
    const existentOrder = await this.ordersRepository.findById(id)

    if(!existentOrder){
      throw new AppError('The order was not found!', 404)
    }

    const totalValue = await this.salesRepository.getTotal(sales);

    if(!totalValue){
      throw new AppError('Some of the sales are not found!', 404)
    }

    const order = await this.ordersRepository.update({
      id, customer_id,sales, total: totalValue
    })

    return order;
  }
}
