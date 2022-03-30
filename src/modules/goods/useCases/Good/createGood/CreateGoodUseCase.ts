import { ICreateGoodDTO } from "@modules/goods/dtos/ICreateGoodDTO";
import { Good } from "@modules/goods/infra/typeorm/entities/Good";
import { IBrandsRepository } from "@modules/goods/repositories/IBrandsRepository";
import { ICategoriesRepository } from "@modules/goods/repositories/ICategoriesRepository";
import { IGoodsRepository } from "@modules/goods/repositories/IGoodsRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateGoodUseCase{
  constructor(
    @inject('GoodsRepository')
    private goodsRepository: IGoodsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ){}

  async execute({amount, name, price, description,category_id,brand_id }: ICreateGoodDTO): Promise<Good>{
    const existentName = await this.goodsRepository.findByName(name);

    if(existentName){
      throw new AppError('The name is already used!')
    }

    const inexistentCategory = await this.categoriesRepository.findById(category_id)

    if(!inexistentCategory){
      throw new AppError('The category was not found!', 404)
    }

    const inexistentBrand = await this.brandsRepository.findById(brand_id)

    if(!inexistentBrand){
      throw new AppError('The brand was not found!', 404)
    }

    const good = await this.goodsRepository.create({
      name, amount, price, description,category_id,brand_id
    })

    return good;
  }
}

export {CreateGoodUseCase}
