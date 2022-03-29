import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository"
import { CreateCustomerUseCase } from "../createCustomer/CreateCustomerUseCase"
import { ListCustomersUseCase } from "./ListCustomersUseCase"

let fakeCustomersRepository: FakeCustomersRepository
let listCustomersUseCase: ListCustomersUseCase
let createCustomerUseCase: CreateCustomerUseCase;

describe('List Customers Use Case', ()=>{
  beforeEach(()=>{
    fakeCustomersRepository = new FakeCustomersRepository()
    createCustomerUseCase = new CreateCustomerUseCase(fakeCustomersRepository);
    listCustomersUseCase = new ListCustomersUseCase(fakeCustomersRepository)
  })

  it('should be able to list all the customers', async ()=>{
    await createCustomerUseCase.execute({
      email: 'gabrielteste@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

    await createCustomerUseCase.execute({
      email: 'gabrielteste2@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

    const customers = await listCustomersUseCase.execute();

    expect(customers.length).toBe(2);
  })
})
