import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository";
import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import { FakeOrdersRepository } from "@modules/orders/repositories/fakes/FakeOrdersRepository";
import { FakeSalesRepository } from "@modules/orders/repositories/fakes/FakeSalesRepository";
import AppError from "@shared/errors/AppError";
import { CreateOrderUseCase } from "../createOrder/CreateOrderUseCase";
import { ListOrdersUseCase } from "./ListOrdersUseCase";

let fakeGoodsRepository: FakeGoodsRepository
let listOrdersUseCase: ListOrdersUseCase;
let createOrderUseCase: CreateOrderUseCase
let fakeOrdersRepository: FakeOrdersRepository;
let fakeCustomersRepository: FakeCustomersRepository
let fakeSalesRepository: FakeSalesRepository;

describe('List Orders Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeCustomersRepository = new FakeCustomersRepository()
    fakeSalesRepository = new FakeSalesRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    listOrdersUseCase = new ListOrdersUseCase(fakeOrdersRepository)
    createOrderUseCase = new CreateOrderUseCase(fakeOrdersRepository, fakeCustomersRepository, fakeSalesRepository)
  })

  it('Should be able to list all orders', async ()=>{
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

    await createOrderUseCase.execute(customer.id, [
      {
        id: saleOne.id
      }
    ])

    const allOrders = await listOrdersUseCase.execute();

    expect(allOrders.length).toBe(1);
  })
})
