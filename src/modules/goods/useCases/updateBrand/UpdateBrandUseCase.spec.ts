import { FakeBrandsRepository } from "@modules/goods/repositories/fakes/FakeBrandsRepository";
import AppError from "@shared/errors/AppError";
import { CreateBrandUseCase } from "../createBrand/CreateBrandUseCase";
import { UpdateBrandUseCase } from "./UpdateBrandUseCase"

let updateBrandUseCase: UpdateBrandUseCase;
let createBrandUseCase: CreateBrandUseCase;
let fakeBrandsRepository: FakeBrandsRepository

describe('Update Brand', ()=>{
  beforeEach(()=>{
    fakeBrandsRepository = new FakeBrandsRepository();
    updateBrandUseCase = new UpdateBrandUseCase(fakeBrandsRepository);
    createBrandUseCase = new CreateBrandUseCase(fakeBrandsRepository);
  })

  it('Should be able to update a brand', async ()=>{
    const brand = await createBrandUseCase.execute('Test Brand')

    const brandUpdated = await updateBrandUseCase.execute(brand.id, 'Testing')

    expect(brandUpdated.name).toEqual('Testing');
  })

  it('Should not be able to update a non-existent brand', async ()=>{
    await expect(
      updateBrandUseCase.execute('123', 'Testing')
    ).rejects.toEqual(new AppError('Brand does not exists!', 404))
  })

  it('Should not be able to update a brand if the name already exists', async ()=>{
    await createBrandUseCase.execute('Test Brand')

    const brand = await createBrandUseCase.execute('Testing')

    await expect(
      updateBrandUseCase.execute(brand.id, 'Test Brand')
    ).rejects.toEqual(new AppError('Brand already exists!'))

  })
})
