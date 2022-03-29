import { IUpdateCategoryDTO } from "@modules/goods/dtos/IUpdateCategoryDTO";
import { ICategoriesRepository } from "@modules/goods/repositories/ICategoriesRepository";
import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";

export class CategoriesRepository implements ICategoriesRepository{
  repository: Repository<Category>;

  constructor(){
    this.repository = getRepository(Category);
  }

  async create(name: string, description: string): Promise<Category> {
    const category = this.repository.create({name, description});

    await this.repository.save(category);

    return category;
  }
  async findByName(name: string): Promise<Category> {
    return await this.repository.findOne({name})
  }

  async list(): Promise<Category[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Category> {
    return await this.repository.findOne(id);
  }

  async update({id, name, description}: IUpdateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      id, name, description, updated_at: `${new Date(Date.now())}`
    })

    await this.repository.save(category)

    return category;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }


}
