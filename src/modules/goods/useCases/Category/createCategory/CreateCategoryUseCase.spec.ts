import { FakeCategoriesRepository } from "@modules/goods/repositories/fakes/FakeCategoriesRepository";
import AppError from "@shared/errors/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let fakeCategoriesRepository: FakeCategoriesRepository

describe('Create Category Use Case', ()=>{
  beforeEach(()=>{
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
  })

  it('Should be able to create a new category', async ()=>{
    const category = await createCategoryUseCase.execute('Category Name', 'Category Desc')

    expect(category).toHaveProperty('id');
    expect(category.name).toEqual('Category Name')
  })

  it('Should not be able to create a new category with already existent name', async ()=>{
    await createCategoryUseCase.execute('Category Name', 'Category Desc')

    await expect(
      createCategoryUseCase.execute('Category Name', 'Category Description')
    ).rejects.toEqual(new AppError('The name is already used!'))
  })
})
