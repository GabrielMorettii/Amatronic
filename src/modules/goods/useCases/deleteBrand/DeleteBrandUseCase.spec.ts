import { FakeBrandsRepository } from "@modules/goods/repositories/fakes/FakeBrandsRepository";
import AppError from "@shared/errors/AppError";
import { CreateBrandUseCase } from "../createBrand/CreateBrandUseCase";
import { DeleteBrandUseCase } from "./DeleteBrandUseCase"

let deleteBrandUseCase: DeleteBrandUseCase;
let createBrandUseCase: CreateBrandUseCase;
let fakeBrandsRepository: FakeBrandsRepository

describe('Delete Brand Use Case', ()=>{
  beforeEach(()=>{
    fakeBrandsRepository = new FakeBrandsRepository();
    createBrandUseCase = new CreateBrandUseCase(fakeBrandsRepository);
    deleteBrandUseCase = new DeleteBrandUseCase(fakeBrandsRepository);
  })

  it('Should be able to delete a brand', async ()=>{
    const brand = await createBrandUseCase.execute('Test Brand')

    await deleteBrandUseCase.execute(brand.id);

    const deletedBrand = await fakeBrandsRepository.findById(brand.id);

    expect(deletedBrand).toBe(undefined)
  })

  it('Should not be able to delete a non-existent brand', async ()=>{
     await expect(
       deleteBrandUseCase.execute('213')
     ).rejects.toEqual(new AppError('The brand was not found!', 404))
  })
})
