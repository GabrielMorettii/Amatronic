import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository";
import AppError from "@shared/errors/AppError";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase"

let createCustomerUseCase: CreateCustomerUseCase;
let fakeCustomersRepository: FakeCustomersRepository

describe('Create Customer', ()=>{
  beforeEach(()=>{
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerUseCase = new CreateCustomerUseCase(fakeCustomersRepository);
  })

  it('Should be able to create a new customer', async ()=>{
    const customer = await createCustomerUseCase.execute({
      email: 'gabrielteste@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

    expect(customer).toHaveProperty('id')
  })

  it('Should not be able to create a new customer with an email already taken', async ()=>{
    const customer = await createCustomerUseCase.execute({
      email: 'gabrielteste@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

    await expect(
      createCustomerUseCase.execute({
        email: customer.email,
        name: 'gabrieltest',
        password: '123123',
      })
    ).rejects.toEqual(new AppError('The email already exists'))

  })
})
