import { IUpdateSalesDTO } from "@modules/orders/dtos/IUpdateSalesDTO";
import { Sales } from "@modules/orders/infra/typeorm/entities/Sales";
import { ISalesRepository } from "@modules/orders/repositories/ISalesRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateSalesUseCase{
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ){}

  async execute({id, val_unit, quantity, totalValue}: IUpdateSalesDTO): Promise<Sales> {
    const existentSale = await this.salesRepository.findById(id);

    if(!existentSale){
      throw new AppError('The sale was not found', 404)
    }

    const sale = await this.salesRepository.update({id, val_unit, quantity, totalValue});

    return sale;
  }
}
