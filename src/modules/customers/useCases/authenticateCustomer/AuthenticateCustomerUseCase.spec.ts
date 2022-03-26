import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository"
import { CreateCustomerUseCase } from "../createCustomer/CreateCustomerUseCase"
import { AuthenticateCustomerUseCase } from "../authenticateCustomer/AuthenticateCustomerUseCase"
import AppError from "@shared/errors/AppError";

let fakeCustomersRepository: FakeCustomersRepository
let createCustomerUseCase: CreateCustomerUseCase;
let authenticateCustomerUseCase: AuthenticateCustomerUseCase

describe('List Customers', ()=>{
  beforeEach(()=>{
    fakeCustomersRepository = new FakeCustomersRepository()
    createCustomerUseCase = new CreateCustomerUseCase(fakeCustomersRepository);
    authenticateCustomerUseCase = new AuthenticateCustomerUseCase(fakeCustomersRepository)
  })

  it('should be able to authenticate an user', async ()=>{
    await createCustomerUseCase.execute({
      email: 'gabrielteste@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

    const {token } = await authenticateCustomerUseCase.execute({
      email: 'gabrielteste@gmail.com',
      password: '123123',
    })

    expect(token).not.toEqual(null);
  })

  it('should not be able to authenticate an user with invalid user credentials', async ()=>{
    await expect(
       authenticateCustomerUseCase.execute({
        email: 'gabrielteste@gmail.com',
        password: '12312',
      })
    ).rejects.toEqual(new AppError('Invalid credentials!'))
  })

  it('should not be able to authenticate an user with invalid password credentials', async ()=>{
    await createCustomerUseCase.execute({
      email: 'gabrielteste@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

    await expect(
       authenticateCustomerUseCase.execute({
        email: 'gabrielteste@gmail.com',
        password: '12312',
      })
    ).rejects.toEqual(new AppError('Invalid credentials!'))
  })
})
