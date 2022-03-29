import { IUpdateCategoryDTO } from "../dtos/IUpdateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

export interface ICategoriesRepository{
  create(name: string, description: string): Promise<Category>
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  findById(id: string): Promise<Category>
  update(data : IUpdateCategoryDTO): Promise<Category>
  delete(id: string): Promise<void>
}
