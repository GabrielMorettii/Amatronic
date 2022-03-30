import { FakeBrandsRepository } from "@modules/goods/repositories/fakes/FakeBrandsRepository";
import { FakeCategoriesRepository } from "@modules/goods/repositories/fakes/FakeCategoriesRepository";
import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import AppError from "@shared/errors/AppError";
import { CreateGoodUseCase } from "./CreateGoodUseCase";

let createGoodUseCase: CreateGoodUseCase;
let fakeGoodsRepository: FakeGoodsRepository
let fakeCategoriesRepository: FakeCategoriesRepository
let fakeBrandsRepository: FakeBrandsRepository

describe('Create Good Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeBrandsRepository = new FakeBrandsRepository();
    createGoodUseCase = new CreateGoodUseCase(fakeGoodsRepository, fakeCategoriesRepository, fakeBrandsRepository);
  })

  it('Should be able to create a new good', async ()=>{
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

    expect(good).toHaveProperty('id');
    expect(good.category_id).toEqual(`${category.id}`)
  })

  it('Should not be able to create a new good with already existent name', async ()=>{
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

    await expect(
      createGoodUseCase.execute({
        name: "Iphone X",
        amount: 9,
        price: 1000.32,
        description: "Iphone da 10 geração",
        category_id: "1233",
        brand_id:  "123312"
      })
    ).rejects.toEqual(new AppError('The name is already used!'))
  })

  it('Should not be able to create a new good with non-existent category', async ()=>{
    await expect(
      createGoodUseCase.execute({
        name: "Iphone X",
        amount: 9,
        price: 1000.32,
        description: "Iphone da 10 geração",
        category_id: "1233",
        brand_id:  "123312"
      })
    ).rejects.toEqual(new AppError('The category was not found!', 404))
  })


  it('Should not be able to create a new good with non-existent brand', async ()=>{
    const category = await fakeCategoriesRepository.create('Category Name', 'Category Desc')

    await expect(
      createGoodUseCase.execute({
        name: "Iphone X",
        amount: 9,
        price: 1000.32,
        description: "Iphone da 10 geração",
        category_id: `${category.id}`,
        brand_id:  "123312"
      })
    ).rejects.toEqual(new AppError('The brand was not found!', 404))
  })
})
