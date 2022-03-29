import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Brand } from "@modules/goods/infra/typeorm/entities/Brand";
import { IBrandsRepository } from "@modules/goods/repositories/IBrandsRepository";

@injectable()
class DeleteBrandUseCase{
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ){}

  async execute(id: string): Promise<void>{
    const existentBrand = await this.brandsRepository.findById(id);

    if(!existentBrand){
      throw new AppError('The brand was not found!', 404)
    }

    await this.brandsRepository.delete(id);
  }
}

export {DeleteBrandUseCase}
