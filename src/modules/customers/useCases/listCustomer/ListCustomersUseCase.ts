import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository"
import { inject, injectable } from "tsyringe";

@injectable()
class ListCustomersUseCase{
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository| any
  ){}

  async execute(): Promise<Customer[]>{
    const customers = await this.customersRepository.list();

    return customers;
  }
}

export {ListCustomersUseCase}
