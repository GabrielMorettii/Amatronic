import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO"
import { Customer } from "../infra/typeorm/entities/Customer"

interface ICustomersRepository{
  create(data: ICreateCustomerDTO): Promise<Customer>
  findByEmail(email: string): Promise<Customer>
}

export {ICustomersRepository}
