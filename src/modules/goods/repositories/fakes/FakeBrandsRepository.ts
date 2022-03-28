import { Brand } from '@modules/goods/infra/typeorm/entities/Brand'
import {IBrandsRepository} from '../IBrandsRepository'

class FakeBrandsRepository implements IBrandsRepository{
  repository: Brand[] = [];

  async create(name: string): Promise<Brand> {
    const brand = new Brand();

    Object.assign(brand, {name});

    this.repository.push(brand);

    return brand;
  }

  async findByName(name: string): Promise<Brand> {
    return this.repository.find(brand => brand.name === name)
  }
}

export {FakeBrandsRepository}
