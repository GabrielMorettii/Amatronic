import { Category } from "@modules/goods/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/goods/repositories/ICategoriesRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCategoryUseCase{
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ){}

  async execute(name: string, description: string): Promise<Category>{
    const existentName = await this.categoriesRepository.findByName(name);

    if(existentName){
      throw new AppError('The name is already used!')
    }

    const category = await this.categoriesRepository.create(name, description);

    return category;
  }
}

export {CreateCategoryUseCase}
