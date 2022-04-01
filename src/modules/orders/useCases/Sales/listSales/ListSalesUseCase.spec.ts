import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import { FakeSalesRepository } from "@modules/orders/repositories/fakes/FakeSalesRepository";
import { CreateSalesUseCase } from "../createSales/CreateSalesUseCase";
import { ListSalesUseCase } from "./ListSalesUseCase";

let fakeGoodsRepository: FakeGoodsRepository
let createSalesUseCase: CreateSalesUseCase;
let listSalesUseCase: ListSalesUseCase;
let fakeSalesRepository: FakeSalesRepository;

describe('List Sales Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeSalesRepository = new FakeSalesRepository();
    listSalesUseCase = new ListSalesUseCase(fakeSalesRepository);
    createSalesUseCase = new CreateSalesUseCase(fakeGoodsRepository, fakeSalesRepository)
  })

  it('Should be able to list all sales', async ()=>{
    const good = await fakeGoodsRepository.create({
      name: "Iphone X",
      amount: 9,
      price: 2050.23,
      description: "Iphone da 10 geração",
      category_id: '123',
      brand_id:  '123'
    })

    await createSalesUseCase.execute(
      good.id,
      5
    )

    const sales = await listSalesUseCase.execute();

    expect(sales.length).toBe(1);
  })
})
