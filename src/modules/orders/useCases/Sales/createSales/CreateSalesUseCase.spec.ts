import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
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

  it('Should not be able to create a new sale with invalid good', async ()=>{
    await expect(
      createSalesUseCase.execute(
        '1231',
        5
      )
    ).rejects.toEqual(new AppError('The good was not found!', 404))
  })

  it('Should not be able to create a new sale with good out of stock', async ()=>{
    const good = await fakeGoodsRepository.create({
      name: "Iphone X",
      amount: 9,
      price: 2050.23,
      description: "Iphone da 10 geração",
      category_id: '123',
      brand_id:  '123'
    })


    await expect(
      createSalesUseCase.execute(
        good.id,
        10
      )
    ).rejects.toEqual(new AppError('Out of stock!'))
  })
})
