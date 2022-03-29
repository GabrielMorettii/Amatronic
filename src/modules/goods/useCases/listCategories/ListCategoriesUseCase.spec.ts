import { FakeCategoriesRepository } from "@modules/goods/repositories/fakes/FakeCategoriesRepository";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase"

let listCategoriesUseCase: ListCategoriesUseCase;
let createCategoryUseCase: CreateCategoryUseCase;
let fakeCategoriesRepository: FakeCategoriesRepository

describe('List Categories Use Case', ()=>{
  beforeEach(()=>{
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategoriesUseCase = new ListCategoriesUseCase(fakeCategoriesRepository);
    createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
  })

  it('Should be able to list all categories', async ()=>{
    await createCategoryUseCase.execute('Category Name', 'Category Desc')

    const categories = await listCategoriesUseCase.execute()

    expect(categories.length).toBe(1);
  })
})
