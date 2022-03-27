import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO"
import { IUpdateCustomerDTO } from "../dtos/IUpdateCustomerDTO"
import { Customer } from "../infra/typeorm/entities/Customer"

interface ICustomersRepository{
  create(data: ICreateCustomerDTO): Promise<Customer>
  list(): Promise<Customer[]>
  update(data: IUpdateCustomerDTO): Promise<Customer>
  delete(id: string): Promise<void>
  findByEmail(email: string): Promise<Customer>
  findById(id: string): Promise<Customer>
}

export {ICustomersRepository}
