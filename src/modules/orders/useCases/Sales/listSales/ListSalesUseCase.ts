import { Sales } from "@modules/orders/infra/typeorm/entities/Sales";
import { ISalesRepository } from "@modules/orders/repositories/ISalesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListSalesUseCase{
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository| any,
  ){}

  async execute(): Promise<Sales[]> {
    const sales = await this.salesRepository.list();

    return sales;
  }
}
