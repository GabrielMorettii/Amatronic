import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { Order } from "@modules/orders/infra/typeorm/entities/Order";

// @injectable()
class CreateOrderUseCase{
  constructor(
    // @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    //@inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ){}

  async execute({user_id, total, order_data}: ICreateOrderDTO): Promise<void>{
    const existentUser = await this.customersRepository.findById(user_id);

    if(!existentUser){
      throw new AppError('User not found!', 404)
    }

  }
}

export {CreateOrderUseCase}
