import { FakeBrandsRepository } from "@modules/goods/repositories/fakes/FakeBrandsRepository";
import { CreateBrandUseCase } from "../createBrand/CreateBrandUseCase";
import { ListBrandsUseCase } from "./ListBrandsUseCase"

let listBrandsUseCase: ListBrandsUseCase;
let createBrandUseCase: CreateBrandUseCase;
let fakeBrandsRepository: FakeBrandsRepository

describe('List Brands Use Case', ()=>{
  beforeEach(()=>{
    fakeBrandsRepository = new FakeBrandsRepository();
    listBrandsUseCase = new ListBrandsUseCase(fakeBrandsRepository);
    createBrandUseCase = new CreateBrandUseCase(fakeBrandsRepository);
  })

  it('Should be able to list all the brands', async ()=>{
    await createBrandUseCase.execute('Test Brand')

    const brands = await listBrandsUseCase.execute()

    expect(brands.length).toBe(1);
  })
})
