import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import { FakeSalesRepository } from "@modules/orders/repositories/fakes/FakeSalesRepository";
import AppError from "@shared/errors/AppError";
import { CreateSalesUseCase } from "../createSales/CreateSalesUseCase";
import { UpdateSalesUseCase } from "./UpdateSalesUseCase";

let fakeGoodsRepository: FakeGoodsRepository
let createSalesUseCase: CreateSalesUseCase;
let updateSalesUseCase: UpdateSalesUseCase;
let fakeSalesRepository: FakeSalesRepository;

describe('Update Sales Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeSalesRepository = new FakeSalesRepository();
    updateSalesUseCase = new UpdateSalesUseCase(fakeSalesRepository)
    createSalesUseCase = new CreateSalesUseCase(fakeGoodsRepository, fakeSalesRepository)
  })

  it('Should be able to update a sale', async ()=>{
    const good = await fakeGoodsRepository.create({
      name: "Iphone X",
      amount: 9,
      price: 2050.23,
      description: "Iphone da 10 geração",
      category_id: '123',
      brand_id:  '123'
    })

    const {val_unit, id} = await createSalesUseCase.execute(
      good.id,
      5
    )

    const updatedSale = await updateSalesUseCase.execute({
      id,
      val_unit,
      quantity: 3,
    })

    expect(updatedSale.good_id).toEqual(good.id)
    expect(updatedSale.totalValue).toEqual(6150.69);
  })

  it('Should not be able to update a non-existent sale', async ()=>{
    await expect(
      updateSalesUseCase.execute({
        id: '123',
        quantity: 3,
      })
    ).rejects.toEqual(new AppError('The sale was not found', 404))
  })
})
