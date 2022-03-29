import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/goods/repositories/ICategoriesRepository";

@injectable()
class DeleteCategoryUseCase{
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ){}

  async execute(id: string): Promise<void>{
    const existentCategory = await this.categoriesRepository.findById(id);

    if(!existentCategory){
      throw new AppError('The category was not found!', 404)
    }

    await this.categoriesRepository.delete(id);
  }
}

export {DeleteCategoryUseCase}
