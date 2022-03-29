import { IUpdateCategoryDTO } from '@modules/goods/dtos/IUpdateCategoryDTO';
import { Category } from '@modules/goods/infra/typeorm/entities/Category';
import {ICategoriesRepository} from '../ICategoriesRepository'

class FakeCategoriesRepository implements ICategoriesRepository{
  repository: Category[] = [];

  async create(name: string, description: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, {name, description});

    this.repository.push(category);

    return category;
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.find(category => category.name === name)
  }

  async list(): Promise<Category[]> {
    return this.repository;
  }

  async findById(id: string): Promise<Category> {
     return this.repository.find(category => category.id === id);
  }

  async update({ id, name, description }: IUpdateCategoryDTO): Promise<Category> {
     const category =  await this.findById(id);

     Object.assign(category, {name, description})

     return category;
  }

  async delete(id: string): Promise<void> {
     const indexCategory = this.repository.findIndex(category => category.id === id)

     this.repository.splice(indexCategory, 1)
  }
}

export {FakeCategoriesRepository}
