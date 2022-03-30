import { FakeBrandsRepository } from "@modules/goods/repositories/fakes/FakeBrandsRepository";
import { FakeCategoriesRepository } from "@modules/goods/repositories/fakes/FakeCategoriesRepository";
import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import AppError from "@shared/errors/AppError";
import { CreateGoodUseCase } from "../createGood/CreateGoodUseCase";
import { DeleteGoodUseCase } from "./DeleteGoodUseCase";

let createGoodUseCase: CreateGoodUseCase;
let deleteGoodUseCase: DeleteGoodUseCase;
let fakeGoodsRepository: FakeGoodsRepository
let fakeCategoriesRepository: FakeCategoriesRepository
let fakeBrandsRepository: FakeBrandsRepository

describe('Delete Good Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeBrandsRepository = new FakeBrandsRepository();
    deleteGoodUseCase = new DeleteGoodUseCase(fakeGoodsRepository)
    createGoodUseCase = new CreateGoodUseCase(fakeGoodsRepository, fakeCategoriesRepository, fakeBrandsRepository);
  })

  it('Should be able to delete a good', async ()=>{
    const category = await fakeCategoriesRepository.create('Category Name', 'Category Desc')

    const brand = await fakeBrandsRepository.create('Test Brand')

    const good = await createGoodUseCase.execute({
      name: "Iphone X",
      amount: 9,
      price: 1000.32,
      description: "Iphone da 10 geração",
      category_id: `${category.id}`,
      brand_id:  `${brand.id}`
    })

    await deleteGoodUseCase.execute(good.id)

    const existentGood = await fakeGoodsRepository.findById(good.id)

    expect(existentGood).toBe(undefined);
  })

  it('Should not be able to delete a non-existent good', async ()=>{
    await expect(
      deleteGoodUseCase.execute('213123')
    ).rejects.toEqual(new  AppError('Good was not found!', 404))
  })
})
