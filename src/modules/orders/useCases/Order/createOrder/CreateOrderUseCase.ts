import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { ISales } from "@modules/orders/dtos/ICreateOrderDTO";
import { Order } from "@modules/orders/infra/typeorm/entities/Order";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { ISalesRepository } from "@modules/orders/repositories/ISalesRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateOrderUseCase{
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ){}

  async execute(customer_id: string, sales: ISales[]): Promise<Order> {
    const existentCustomer = await this.customersRepository.findById(customer_id)

    if(!existentCustomer){
      throw new AppError('The customer was not found!', 404)
    }

    const total = await this.salesRepository.getTotal(sales);

    if(!total){
      throw new AppError('Some of the sales are not found!', 404)
    }

    const order = await this.ordersRepository.create({customer_id, total, sales})

    return order;
  }
}
