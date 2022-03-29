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
}

export {FakeCategoriesRepository}
