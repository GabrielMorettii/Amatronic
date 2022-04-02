import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteOrderUseCase{
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository | any,
  ){}

  async execute(order_id: string): Promise<void> {
    const existentOrder = await this.ordersRepository.findById(order_id)

    if(!existentOrder){
      throw new AppError('The order was not found!', 404)
    }

    await this.ordersRepository.delete(order_id);
  }
}
