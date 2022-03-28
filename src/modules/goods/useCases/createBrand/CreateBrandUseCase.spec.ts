import { FakeBrandsRepository } from "@modules/goods/repositories/fakes/FakeBrandsRepository";
import AppError from "@shared/errors/AppError";
import { CreateBrandUseCase } from "./CreateBrandUseCase"

let createBrandUseCase: CreateBrandUseCase;
let fakeBrandsRepository: FakeBrandsRepository

describe('Create Brand', ()=>{
  beforeEach(()=>{
    fakeBrandsRepository = new FakeBrandsRepository();
    createBrandUseCase = new CreateBrandUseCase(fakeBrandsRepository);
  })

  it('Should be able to create a new brand', async ()=>{
    const brand = await createBrandUseCase.execute('Test Brand')

    expect(brand).toHaveProperty('id');
    expect(brand.name).toEqual('Test Brand')
  })

  it('Should not be able to create a new brand with already existent name', async ()=>{
    await createBrandUseCase.execute('Test Brand')

    await expect(
      createBrandUseCase.execute('Test Brand')
    ).rejects.toEqual(new AppError('The name is already used!'))
  })
})
