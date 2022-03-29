import { inject, injectable } from "tsyringe";
import { Brand } from "@modules/goods/infra/typeorm/entities/Brand";
import { ICategoriesRepository } from "@modules/goods/repositories/ICategoriesRepository";
import { IUpdateCategoryDTO } from "@modules/goods/dtos/IUpdateCategoryDTO";
import { Category } from "@modules/goods/infra/typeorm/entities/Category";
import AppError from "@shared/errors/AppError";

@injectable()
class UpdateCategoryUseCase{
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ){}

  async execute({ id, name, description }: IUpdateCategoryDTO): Promise<Category>{
    const existentCategoryById = await this.categoriesRepository.findById(id);

    if(!existentCategoryById){
      throw new AppError('Category does not exists!', 404)
    }

    const existentCategoryByName = await this.categoriesRepository.findByName(name);

    if(existentCategoryByName){
      throw new AppError('Category already exists!')
    }


    const category = await this.categoriesRepository.update({ id, name, description })

    return category;
  }
}

export {UpdateCategoryUseCase}
