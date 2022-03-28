import {Brand} from '../infra/typeorm/entities/Brand'

interface IBrandsRepository{
  create(name: string): Promise<Brand>
  findByName(name: string): Promise<Brand>
  list(): Promise<Brand[]>
}

export {IBrandsRepository}
