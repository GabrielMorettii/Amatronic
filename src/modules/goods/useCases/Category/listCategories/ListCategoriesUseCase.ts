import { Category } from "@modules/goods/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/goods/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriesUseCase{
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ){}

  async execute(): Promise<Category[]>{
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export {ListCategoriesUseCase}
