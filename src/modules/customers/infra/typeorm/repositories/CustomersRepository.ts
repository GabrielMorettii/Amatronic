import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomerDTO";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { getRepository, Repository } from "typeorm";
import { Customer } from "../entities/Customer";

class CustomersRepository implements ICustomersRepository{
  repository: Repository<Customer>;

  constructor(){
    this.repository = getRepository(Customer);
  }

  async create({email,name,password,avatar}: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.repository.create({email,name,password,avatar});

    await this.repository.save(customer);

    return customer;
  }
  async findByEmail(email: string): Promise<Customer> {
    const customerExistent = await this.repository.findOne({email})

    return customerExistent;
  }

}

export {CustomersRepository}
