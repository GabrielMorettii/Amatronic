import { FakeCategoriesRepository } from "@modules/goods/repositories/fakes/FakeCategoriesRepository";
import AppError from "@shared/errors/AppError";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase"
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let deleteCategoryUseCase: DeleteCategoryUseCase;
let fakeCategoriesRepository: FakeCategoriesRepository

describe('Delete Category Use Case', ()=>{
  beforeEach(()=>{
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
    deleteCategoryUseCase = new DeleteCategoryUseCase(fakeCategoriesRepository);
  })

  it('Should be able to delete a category', async ()=>{
    const category = await createCategoryUseCase.execute('Category Name', 'Category Desc')

    await deleteCategoryUseCase.execute(category.id);

    const findCategory = await fakeCategoriesRepository.findById(category.id)

    expect(findCategory).toBe(undefined);
  })

  it('Should not be able to delete a non-existent category', async ()=>{
    await expect(
      deleteCategoryUseCase.execute('213')
    ).rejects.toEqual(new AppError('The category was not found!', 404))
  })
})
