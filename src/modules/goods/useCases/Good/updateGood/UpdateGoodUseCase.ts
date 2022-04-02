import { IUpdateGoodDTO } from "@modules/goods/dtos/IUpdateGoodDTO";
import { Good } from "@modules/goods/infra/typeorm/entities/Good";
import { IGoodsRepository } from "@modules/goods/repositories/IGoodsRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IBrandsRepository } from "@modules/goods/repositories/IBrandsRepository";
import { ICategoriesRepository } from "@modules/goods/repositories/ICategoriesRepository";

@injectable()
class UpdateGoodsUseCase{
  constructor(
    @inject('GoodsRepository')
    private goodsRepository: IGoodsRepository| any,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository| any,
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository| any,
  ){}

  async execute({id, amount, name, price, description,category_id,brand_id }: IUpdateGoodDTO): Promise<Good>{
    const existentGood = await this.goodsRepository.findById(id);

    if(!existentGood){
      throw new AppError('Good was not found!', 404);
    }

    const inexistentCategory = await this.categoriesRepository.findById(category_id)

    if(!inexistentCategory){
      throw new AppError('The category was not found!', 404)
    }

    const inexistentBrand = await this.brandsRepository.findById(brand_id)

    if(!inexistentBrand){
      throw new AppError('The brand was not found!', 404)
    }

    const good = await this.goodsRepository.update({id, amount, name, price, description,category_id,brand_id})

    return good;
  }
}

export {UpdateGoodsUseCase}
