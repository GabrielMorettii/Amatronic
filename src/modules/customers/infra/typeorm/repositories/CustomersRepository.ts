import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomerDTO";
import { IUpdateCustomerDTO } from "@modules/customers/dtos/IUpdateCustomerDTO";
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
  async list(): Promise<Customer[]> {
    return await this.repository.find();
  }
  async findById(id: string): Promise<Customer> {
    const customerExistent = await this.repository.findOne(id)

    return customerExistent;
  }

  async update({id, email,name, avatar}: IUpdateCustomerDTO): Promise<Customer> {
    return await this.repository.save({id,email,name, avatar})
  }

}

export {CustomersRepository}
