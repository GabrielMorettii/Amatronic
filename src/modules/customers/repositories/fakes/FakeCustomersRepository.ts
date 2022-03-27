import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomerDTO";
import { IUpdateCustomerDTO } from "@modules/customers/dtos/IUpdateCustomerDTO";
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

  async findById(id: string): Promise<Customer> {
    const customer = this.repository.find(customer => customer.id === id)

    return customer;
  }

  async update({id, email,name,avatar}: IUpdateCustomerDTO): Promise<Customer> {
    const customer = this.repository.find(customer => customer.id === id)

    Object.assign(customer, {
      id,
      email,
      name,
      avatar,
      updated_at: `${new Date(Date.now())}`
    })

    return customer;
  }

  async delete(id: string): Promise<void> {
    const costumerIndex = this.repository.findIndex(costumer => costumer.id === id);

    this.repository.splice(costumerIndex, 1)
  }

}

export {FakeCustomersRepository}
