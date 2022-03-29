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

}
