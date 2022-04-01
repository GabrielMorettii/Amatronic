import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository";
import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import { FakeOrdersRepository } from "@modules/orders/repositories/fakes/FakeOrdersRepository";
import { FakeSalesRepository } from "@modules/orders/repositories/fakes/FakeSalesRepository";
import AppError from "@shared/errors/AppError";
import { CreateOrderUseCase } from "../createOrder/CreateOrderUseCase";
import { UpdateOrderUseCase } from "./UpdateOrderUseCase";

let fakeGoodsRepository: FakeGoodsRepository
let createOrderUseCase: CreateOrderUseCase;
let fakeOrdersRepository: FakeOrdersRepository;
let updateOrderUseCase: UpdateOrderUseCase;
let fakeCustomersRepository: FakeCustomersRepository
let fakeSalesRepository: FakeSalesRepository;

describe('Update Order Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeCustomersRepository = new FakeCustomersRepository()
    fakeSalesRepository = new FakeSalesRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    updateOrderUseCase = new UpdateOrderUseCase(fakeOrdersRepository, fakeSalesRepository);
    createOrderUseCase = new CreateOrderUseCase(fakeOrdersRepository, fakeCustomersRepository, fakeSalesRepository)
  })

  it('Should be able to update a order', async ()=>{
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

    const saleThree = await fakeSalesRepository.create({
      quantity: 3,
      good
    })

    const orderUpdated = await updateOrderUseCase.execute({
      id: order.id,
      sales: [
        {
          id: saleThree.id
        }
      ]
    })

    expect(orderUpdated.total).toEqual(3000.96);
  })

  it('Should not be able to update a non-existent order', async ()=>{
    await expect(
      updateOrderUseCase.execute({
        id: '2133',
        sales: [
          {
            id: '123312'
          }
        ]
      })
    ).rejects.toEqual(new AppError('The order was not found!', 404))
  })

  it('Should not be able to update a order with invalid sales', async ()=>{
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

    await expect(
      updateOrderUseCase.execute({
        id: order.id,
        sales: [
          {
            id: '123312'
          }
        ]
      })
    ).rejects.toEqual(new AppError('Some of the sales are not found!', 404))
  })
})
