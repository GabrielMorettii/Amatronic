import { IUpdateCustomerDTO } from "@modules/customers/dtos/IUpdateCustomerDTO";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateCustomerUseCase{
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository| any
  ){}

  async execute({id, email,name, avatar}:IUpdateCustomerDTO): Promise<Customer> {
    const existentUserById = await this.customersRepository.findById(id);

    if(!existentUserById){
      throw new AppError('The user does not exists!', 404)
    }

    const existentUserByEmail = await this.customersRepository.findByEmail(email);

    if(existentUserByEmail && (existentUserByEmail.email !== existentUserById.email)){
      throw new AppError('The email is already taken!')
    }

    const customer = await this.customersRepository.update({
      id,
      email,
      name,
      avatar
    })

    return customer;
  }
}

export {UpdateCustomerUseCase}
