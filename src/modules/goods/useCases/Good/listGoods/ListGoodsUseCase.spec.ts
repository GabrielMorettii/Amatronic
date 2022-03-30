import { FakeBrandsRepository } from "@modules/goods/repositories/fakes/FakeBrandsRepository";
import { FakeCategoriesRepository } from "@modules/goods/repositories/fakes/FakeCategoriesRepository";
import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import { CreateGoodUseCase } from "../createGood/CreateGoodUseCase";
import { ListGoodsUseCase } from "./ListGoodsUseCase";

let createGoodUseCase: CreateGoodUseCase;
let listGoodsUseCase: ListGoodsUseCase;
let fakeGoodsRepository: FakeGoodsRepository
let fakeCategoriesRepository: FakeCategoriesRepository
let fakeBrandsRepository: FakeBrandsRepository

describe('List Goods Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeBrandsRepository = new FakeBrandsRepository();
    createGoodUseCase = new CreateGoodUseCase(fakeGoodsRepository, fakeCategoriesRepository, fakeBrandsRepository);
    listGoodsUseCase = new ListGoodsUseCase(fakeGoodsRepository)
  })

  it('Should be able to create a list all goods', async ()=>{
    const category = await fakeCategoriesRepository.create('Category Name', 'Category Desc')

    const brand = await fakeBrandsRepository.create('Test Brand')

    await createGoodUseCase.execute({
      name: "Iphone X",
      amount: 9,
      price: 1000.32,
      description: "Iphone da 10 geração",
      category_id: `${category.id}`,
      brand_id:  `${brand.id}`
    })

    const goods = await listGoodsUseCase.execute();

    expect(goods.length).toBe(1);
  })
})
