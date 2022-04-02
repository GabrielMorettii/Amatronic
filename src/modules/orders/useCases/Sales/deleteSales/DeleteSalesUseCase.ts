import { IGoodsRepository } from "@modules/goods/repositories/IGoodsRepository";
import { ISalesRepository } from "@modules/orders/repositories/ISalesRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteSalesUseCase{
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository| any,
  ){}

  async execute(sales_id: string): Promise<void> {
    const sales = await this.salesRepository.findById(sales_id);

    if(!sales) {
      throw new AppError('The sale was not found!', 404);
    }

    await this.salesRepository.delete(sales_id);
  }
}
