import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository";
import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import { FakeOrdersRepository } from "@modules/orders/repositories/fakes/FakeOrdersRepository";
import { FakeSalesRepository } from "@modules/orders/repositories/fakes/FakeSalesRepository";
import AppError from "@shared/errors/AppError";
import { CreateOrderUseCase } from "../createOrder/CreateOrderUseCase";
import { DeleteOrderUseCase } from "./DeleteOrderUseCase";

let fakeGoodsRepository: FakeGoodsRepository
let createOrderUseCase: CreateOrderUseCase;
let deleteOrderUseCase: DeleteOrderUseCase;
let fakeOrdersRepository: FakeOrdersRepository;
let fakeCustomersRepository: FakeCustomersRepository
let fakeSalesRepository: FakeSalesRepository;

describe('Delete Order Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeCustomersRepository = new FakeCustomersRepository()
    fakeSalesRepository = new FakeSalesRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    deleteOrderUseCase = new DeleteOrderUseCase(fakeOrdersRepository);
    createOrderUseCase = new CreateOrderUseCase(fakeOrdersRepository, fakeCustomersRepository, fakeSalesRepository)
  })

  it('Should be able to delete a order', async ()=>{
    const customer = await fakeCustomersRepository.create({
      email: 'gabrielteste@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

    const good = await fakeGoodsRepository.create({
      name: "Iphone X",
      amount: 9,
      price: 1000.32,
      description: "Iphone da 10 geração",
      category_id: '123',
      brand_id:  '123'
    })

    const saleOne = await fakeSalesRepository.create({
      quantity: 5,
      good
    })

    const saleTwo = await fakeSalesRepository.create({
      quantity: 2,
      good
    })


    const order = await createOrderUseCase.execute(customer.id, [
      {
        id: saleOne.id
      },
      {
        id: saleTwo.id
      }
    ])

    await deleteOrderUseCase.execute(order.id);

    const existentOrder = await fakeOrdersRepository.findById(order.id)

    expect(existentOrder).toBe(undefined)
  })

  it('Should not be able to delete a non-existent order', async ()=>{
    await expect(
      deleteOrderUseCase.execute('1212')
    ).rejects.toEqual(new AppError('The order was not found!', 404))
  })
})
