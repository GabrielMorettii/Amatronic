import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository"
import AppError from "@shared/errors/AppError";
import { CreateCustomerUseCase } from "../createCustomer/CreateCustomerUseCase"
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

let fakeCustomersRepository: FakeCustomersRepository
let updateCustomerUseCase: UpdateCustomerUseCase
let createCustomerUseCase: CreateCustomerUseCase;

describe('Update Customer', ()=>{
  beforeEach(()=>{
    fakeCustomersRepository = new FakeCustomersRepository()
    createCustomerUseCase = new CreateCustomerUseCase(fakeCustomersRepository);
    updateCustomerUseCase = new UpdateCustomerUseCase(fakeCustomersRepository)
  })

  it('should be able to update a customer', async ()=>{
    const constumer = await createCustomerUseCase.execute({
      email: 'gabrielteste@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

    const updatedCustomer = await updateCustomerUseCase.execute({
      id: constumer.id,
      name: 'gabrieltest123',
      email: 'gabrieltest123@gmail.com',
      avatar: 'test'
    })

    expect(constumer.name).toEqual(updatedCustomer.name);
    expect(constumer.email).toEqual(updatedCustomer.email);
    expect(constumer.name).toEqual(updatedCustomer.name);
  })

  it('should not be able to update a customer with invalid id', async ()=>{
    await expect(
      updateCustomerUseCase.execute({
        id: '132231',
        name: 'gabrieltest123',
        email: 'gabrieltest123@gmail.com',
        avatar: 'test'
      })
    ).rejects.toEqual(new AppError('The user does not exists!', 404))
  })

  it('should not be able to update a customer email to an email already taken', async ()=>{
    await createCustomerUseCase.execute({
      email: 'gabrielteste2@gmail.com',
      name: 'gabrieltest2',
      password: '123123',
    })

    const constumer = await createCustomerUseCase.execute({
      email: 'gabrielteste@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

    await expect(
      updateCustomerUseCase.execute({
        id: constumer.id,
        name: 'gabrieltest123',
        email: 'gabrielteste2@gmail.com',
        avatar: 'test'
      })
    ).rejects.toEqual(new AppError('The email is already taken!'))
  })

})
