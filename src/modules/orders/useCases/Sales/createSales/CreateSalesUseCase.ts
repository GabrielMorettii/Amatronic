import { IGoodsRepository } from "@modules/goods/repositories/IGoodsRepository";
import { ISalesRepository } from "@modules/orders/repositories/ISalesRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateSalesUseCase{
  constructor(
    @inject('GoodsRepository')
    private goodsRepository: IGoodsRepository,
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ){}

  async execute(good_id: string, quantity: number) {
    const good = await this.goodsRepository.findById(good_id)

    if(!good){
      throw new AppError('The good was not found!', 404)
    }

    if(quantity > good.amount){
      throw new AppError('Out of stock!')
    }

    good.amount -= quantity;
    good.updated_at = new Date(Date.now());

    await this.goodsRepository.create(good)

    const sales = await this.salesRepository.create({
      good,
      quantity
    })

    return sales;
  }
}
