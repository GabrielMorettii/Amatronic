import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteCustomerUseCase{
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository| any
  ){}
  async execute(id: string): Promise<void>{
    const findCostumer = await this.customersRepository.findById(id);

    if(!findCostumer){
      throw new AppError('Costumer does not exists!', 404)
    }

    await this.customersRepository.delete(id);
  }
}

export {DeleteCustomerUseCase}
