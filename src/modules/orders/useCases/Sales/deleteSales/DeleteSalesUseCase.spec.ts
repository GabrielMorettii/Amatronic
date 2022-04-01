import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import { FakeSalesRepository } from "@modules/orders/repositories/fakes/FakeSalesRepository";
import AppError from "@shared/errors/AppError";
import { CreateSalesUseCase } from "../createSales/CreateSalesUseCase";
import { DeleteSalesUseCase } from "./DeleteSalesUseCase";

let fakeGoodsRepository: FakeGoodsRepository
let createSalesUseCase: CreateSalesUseCase;
let deleteSalesUseCase: DeleteSalesUseCase;
let fakeSalesRepository: FakeSalesRepository;

describe('Delete Sales Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeSalesRepository = new FakeSalesRepository();
    deleteSalesUseCase = new DeleteSalesUseCase(fakeSalesRepository);
    createSalesUseCase = new CreateSalesUseCase(fakeGoodsRepository, fakeSalesRepository)
  })

  it('Should be able to delete a sale', async ()=>{
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

    await deleteSalesUseCase.execute(sale.id);

    const existentSale = await fakeSalesRepository.findById(sale.id);

    expect(existentSale).toEqual(undefined)
  })

  it('Should not be able to delete a non-existent sale', async ()=>{
    await expect(
      deleteSalesUseCase.execute('1123')
    ).rejects.toEqual(new AppError('The sale was not found!', 404))
  })
})
