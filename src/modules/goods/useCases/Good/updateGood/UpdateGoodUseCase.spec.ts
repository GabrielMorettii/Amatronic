import { FakeBrandsRepository } from "@modules/goods/repositories/fakes/FakeBrandsRepository";
import { FakeCategoriesRepository } from "@modules/goods/repositories/fakes/FakeCategoriesRepository";
import { FakeGoodsRepository } from "@modules/goods/repositories/fakes/FakeGoodsRepository";
import AppError from "@shared/errors/AppError";
import { CreateGoodUseCase } from "../createGood/CreateGoodUseCase";
import { UpdateGoodsUseCase } from "./UpdateGoodUseCase";

let createGoodUseCase: CreateGoodUseCase;
let updateGoodUseCase: UpdateGoodsUseCase;
let fakeGoodsRepository: FakeGoodsRepository
let fakeCategoriesRepository: FakeCategoriesRepository
let fakeBrandsRepository: FakeBrandsRepository

describe('Update Good Use Case', ()=>{
  beforeEach(()=>{
    fakeGoodsRepository = new FakeGoodsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeBrandsRepository = new FakeBrandsRepository();
    createGoodUseCase = new CreateGoodUseCase(fakeGoodsRepository, fakeCategoriesRepository, fakeBrandsRepository);
    updateGoodUseCase = new UpdateGoodsUseCase(fakeGoodsRepository, fakeCategoriesRepository, fakeBrandsRepository)
  })

  it('Should be able to update a good', async ()=>{
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

    const goodUpdated = await updateGoodUseCase.execute({
      id: good.id,
      name: "Iphone XX",
      amount: 7,
      price: 2000.99,
      category_id: `${category.id}`,
      brand_id:  `${brand.id}`
    });

    expect(goodUpdated.id).toBe(good.id);
    expect(goodUpdated.amount).toBe(7);
  })

  it('Should not be able to update a non-existent good', async ()=>{
    await expect(
       updateGoodUseCase.execute({
        id: '123',
        name: "Iphone XX",
        amount: 7,
        price: 2000.99,
        category_id: `123133`,
        brand_id:  `123312`
      })
    ).rejects.toEqual(new AppError('Good was not found!', 404))
  })

  it('Should not be able update a good with non-existent category', async ()=>{
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

    await expect(
       updateGoodUseCase.execute({
        id: good.id,
        name: "Iphone XX",
        amount: 7,
        price: 2000.99,
        category_id: `123133`,
        brand_id:  `123312`
      })
    ).rejects.toEqual(new AppError('The category was not found!', 404))
  })

  it('Should not be able update a good with non-existent category', async ()=>{
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

    await expect(
       updateGoodUseCase.execute({
        id: good.id,
        name: "Iphone XX",
        amount: 7,
        price: 2000.99,
        category_id: `${category.id}`,
        brand_id:  `123312`
      })
    ).rejects.toEqual(new AppError('The brand was not found!', 404))
  })
})
