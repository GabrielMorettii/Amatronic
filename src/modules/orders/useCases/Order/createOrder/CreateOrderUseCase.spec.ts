import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository";
import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import { FakeOrdersRepository } from "@modules/orders/repositories/fakes/FakeOrdersRepository";
import { FakeSalesRepository } from "@modules/orders/repositories/fakes/FakeSalesRepository";
import AppError from "@shared/errors/AppError";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

let fakeGoodsRepository: FakeGoodsRepository
let createOrderUseCase: CreateOrderUseCase;
let fakeOrdersRepository: FakeOrdersRepository;
let fakeCustomersRepository: FakeCustomersRepository
let fakeSalesRepository: FakeSalesRepository;

describe('Create Order Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeCustomersRepository = new FakeCustomersRepository()
    fakeSalesRepository = new FakeSalesRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    createOrderUseCase = new CreateOrderUseCase(fakeOrdersRepository, fakeCustomersRepository, fakeSalesRepository)
  })

  it('Should be able to create a new order', async ()=>{
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

    expect(order).toHaveProperty("total");
    expect(order).toHaveProperty("id");
    expect(order.customer_id).toEqual(customer.id);
  })

  it('Should not be able to create a new order with invalid customer', async ()=>{
    await expect(
      createOrderUseCase.execute('23123', [
        {
          id: '213'
        },
        {
          id: '213'
        }
      ])
    ).rejects.toEqual(new AppError('The customer was not found!', 404))
  })

  it('Should not be able to create a new order with invalid sale', async ()=>{
    const customer = await fakeCustomersRepository.create({
      email: 'gabrielteste@gmail.com',
      name: 'gabrieltest',
      password: '123123',
    })

    await expect(
      createOrderUseCase.execute(customer.id, [
        {
          id: '213'
        },
        {
          id: '213'
        }
      ])
    ).rejects.toEqual(new AppError('Some of the sales are not found!', 404))
  })
})
