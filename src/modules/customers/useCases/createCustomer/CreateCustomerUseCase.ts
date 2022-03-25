import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomerDTO";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import {hash} from 'bcrypt'

@injectable()
class CreateCustomerUseCase{
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ){}

  async execute({email,name,password, avatar}: ICreateCustomerDTO): Promise<Customer>{
    const existentEmail = await this.customersRepository.findByEmail(email)

    if(existentEmail){
      throw new AppError('The email already exists')
    }

    const hashedPassword = await hash(password, 8);

    const customer = await this.customersRepository.create({
      email,
      name,
      password: hashedPassword,
      avatar
    })

    return customer;
  }
}

export {CreateCustomerUseCase}
