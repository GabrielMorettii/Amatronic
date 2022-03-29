import { FakeCategoriesRepository } from "@modules/goods/repositories/fakes/FakeCategoriesRepository";
import AppError from "@shared/errors/AppError";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

let updateCategoryUseCase: UpdateCategoryUseCase;
let createCategoryUseCase: CreateCategoryUseCase;
let fakeCategoriesRepository: FakeCategoriesRepository

describe('Update Category Use Case', ()=>{
  beforeEach(()=>{
    fakeCategoriesRepository = new FakeCategoriesRepository();
    updateCategoryUseCase = new UpdateCategoryUseCase(fakeCategoriesRepository);
    createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
  })

  it('Should be able to update a category', async ()=>{
    const category = await createCategoryUseCase.execute('Test category', 'Test desc')

    const categoryUpdated = await updateCategoryUseCase.execute({
      id: category.id,
      name: 'Category Name',
      description: 'Category Desc',
    });

    expect(categoryUpdated.id).toEqual(category.id);
    expect(category.name).toEqual('Category Name');
  })

  it('Should not be able to update a non-existent category', async ()=>{
    await expect(
      updateCategoryUseCase.execute({
        id: '123',
        name: 'Category Name',
        description: 'Category Desc',
      })
    ).rejects.toEqual(new AppError('Category does not exists!', 404))
  })

  it('Should not be able to update a category if the name already exists', async ()=>{
    await createCategoryUseCase.execute('Test Category', 'Test desc')

    const Category = await createCategoryUseCase.execute('Testing',  'Test desc2')

    await expect(
      updateCategoryUseCase.execute({
        id: Category.id,
        name: 'Test Category'
      })
    ).rejects.toEqual(new AppError('Category already exists!'))

  })
})
