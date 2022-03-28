import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository"
import AppError from "@shared/errors/AppError";
import { CreateCustomerUseCase } from "../createCustomer/CreateCustomerUseCase"
import { DeleteCustomerUseCase } from "./DeleteCustomerUseCase";

let fakeCustomersRepository: FakeCustomersRepository
let deleteCustomerUseCase: DeleteCustomerUseCase
let createCustomerUseCase: CreateCustomerUseCase;

describe('Delete Customer', ()=>{
  beforeEach(()=>{
    fakeCustomersRepository = new FakeCustomersRepository()
    createCustomerUseCase = new CreateCustomerUseCase(fakeCustomersRepository);
    deleteCustomerUseCase = new DeleteCustomerUseCase(fakeCustomersRepository)
  })

  it('should be able to delete a customer', async ()=>{
    const constumer = await createCustomerUseCase.execute({
      email: 'gabrielteste@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

   await deleteCustomerUseCase.execute(constumer.id)

   const findCostumer = await fakeCustomersRepository.findById(constumer.id);

    expect(findCostumer).toBe(undefined)
  })

  it('should not able able to delete a non-existent customer', async ()=>{
    await expect(deleteCustomerUseCase.execute('123123'))
    .rejects.toEqual(new AppError('Costumer does not exists!', 404))
  })
})
