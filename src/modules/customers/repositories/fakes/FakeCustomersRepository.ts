import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomerDTO";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomersRepository } from "../ICustomersRepository";

class FakeCustomersRepository implements ICustomersRepository{
  repository: Customer[] = []

  async create({email,name,password,avatar}: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, {email,name,password,avatar});

    this.repository.push(customer)

    return customer;
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = this.repository.find(customer => customer.email === email)

    return customer;
  }

  async list(): Promise<Customer[]> {
    return this.repository;
  }
}

export {FakeCustomersRepository}
