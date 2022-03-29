import { inject, injectable } from "tsyringe";
import { Brand } from "@modules/goods/infra/typeorm/entities/Brand";
import { IBrandsRepository } from "@modules/goods/repositories/IBrandsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class UpdateBrandUseCase{
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ){}

  async execute(id: string, name: string): Promise<Brand>{
    const existentBrandById = await this.brandsRepository.findById(id);

    if(!existentBrandById){
      throw new AppError('Brand does not exists!', 404)
    }

    const existentBrandByName = await this.brandsRepository.findByName(name);

    if(existentBrandByName){
      throw new AppError('Brand already exists!')
    }

    const brand = await this.brandsRepository.update(id, name)

    return brand;
  }
}

export {UpdateBrandUseCase}
