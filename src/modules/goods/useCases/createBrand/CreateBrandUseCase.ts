import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Brand } from "@modules/goods/infra/typeorm/entities/Brand";
import { IBrandsRepository } from "@modules/goods/repositories/IBrandsRepository";

@injectable()
class CreateBrandUseCase{
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ){}

  async execute(name: string): Promise<Brand>{
    const existentName = await this.brandsRepository.findByName(name);

    if(existentName){
      throw new AppError('The name is already used!')
    }

    const brand = await this.brandsRepository.create(name);

    return brand;
  }
}

export {CreateBrandUseCase}
