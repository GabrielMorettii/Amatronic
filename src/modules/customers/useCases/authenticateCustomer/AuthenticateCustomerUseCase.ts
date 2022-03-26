import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository"
import AppError from "@shared/errors/AppError";
import {compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import {credentials} from '@config/auth'
import { IAuthenticateCustomerDTO } from "@modules/customers/dtos/IAuthenticateCustomerDTO";
import { inject, injectable } from "tsyringe";

interface IReponse{
  customer: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateCustomerUseCase{
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ){}

  async execute({email, password}:IAuthenticateCustomerDTO): Promise<IReponse>{
    const customer = await this.customersRepository.findByEmail(email);

    if(!customer){
      throw new AppError('Invalid credentials!')
    }

    const validPassword = await compare(password, customer.password);

    if(!validPassword){
      throw new AppError('Invalid credentials!')
    }

    const token = sign({}, credentials.tokenSecretKey, {
      subject: customer.id,
      expiresIn: credentials.tokenExpiresIn
    })

    return {
      customer: {
        name: customer.name,
        email: customer.email
      },
      token
    }
  }
}

export {AuthenticateCustomerUseCase}
