import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository";
import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import { FakeOrdersRepository } from "@modules/orders/repositories/fakes/FakeOrdersRepository";
import { FakeSalesRepository } from "@modules/orders/repositories/fakes/FakeSalesRepository";
import AppError from "@shared/errors/AppError";
import { CreateSalesUseCase } from "./CreateSalesUseCase";

let fakeGoodsRepository: FakeGoodsRepository
let createSalesUseCase: CreateSalesUseCase;
let fakeSalesRepository: FakeSalesRepository;

describe('Create Sales Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeSalesRepository = new FakeSalesRepository();
    createSalesUseCase = new CreateSalesUseCase(fakeGoodsRepository, fakeSalesRepository)
  })

  it('Should be able to create a new sale', async ()=>{
    const good = await fakeGoodsRepository.create({
      name: "Iphone X",
      amount: 9,
      price: 2050.23,
      description: "Iphone da 10 geração",
      category_id: '123',
      brand_id:  '123'
    })

    const sale = await createSalesUseCase.execute(
      good.id,
      5
    )

    expect(sale).toHaveProperty("id");
    expect(sale.totalValue).toEqual(10251.15);
    expect(good.amount).toBe(4);
  })
})
